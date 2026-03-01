import axios from "axios";
import { decode } from "@msgpack/msgpack";
import zlib from "zlib";

const ENDEE_URL = "http://localhost:8080/api/v1";
const AUTH_TOKEN = "test-token";
const INDEX_NAME = "agent_memory";
const DEFAULT_SPACE_TYPE = "cosine";

let indexReady = false;

const headers = {
  Authorization: AUTH_TOKEN,
  "Content-Type": "application/json",
};

async function ensureIndex(dim) {
  if (indexReady) {
    return;
  }

  try {
    await axios.post(
      `${ENDEE_URL}/index/create`,
      {
        index_name: INDEX_NAME,
        dim,
        space_type: DEFAULT_SPACE_TYPE,
      },
      { headers },
    );
    indexReady = true;
  } catch (error) {
    if (error.response?.status === 409) {
      indexReady = true;
      return;
    }
    throw error;
  }
}

function parseMeta(rawMeta) {
  if (!rawMeta) {
    return null;
  }

  let jsonString = "";

  if (typeof rawMeta === "string") {
    jsonString = rawMeta;
  } else if (Array.isArray(rawMeta) || rawMeta instanceof Uint8Array) {
    const buffer = Buffer.from(rawMeta);
    try {
      jsonString = zlib.inflateSync(buffer).toString("utf8");
    } catch {
      jsonString = buffer.toString("utf8");
    }
  } else if (typeof rawMeta === "object") {
    const numericKeys = Object.keys(rawMeta).filter((key) => /^\d+$/.test(key));
    if (numericKeys.length > 0) {
      const orderedBytes = numericKeys
        .map((key) => Number(key))
        .sort((a, b) => a - b)
        .map((index) => rawMeta[String(index)]);
      const buffer = Buffer.from(orderedBytes);
      try {
        jsonString = zlib.inflateSync(buffer).toString("utf8");
      } catch {
        jsonString = buffer.toString("utf8");
      }
    } else {
      return rawMeta;
    }
  } else {
    return rawMeta;
  }

  try {
    return JSON.parse(jsonString);
  } catch {
    return { text: jsonString };
  }
}

/* INSERT VECTOR */
export async function insertVector(id, vector, metadata) {
  await ensureIndex(vector.length);

  const payload = {
    id,
    vector,
    meta: JSON.stringify(metadata ?? {}),
  };

  await axios.post(`${ENDEE_URL}/index/${INDEX_NAME}/vector/insert`, payload, {
    headers,
  });
}

/* SEARCH VECTOR */
export async function searchVector(queryVector, topK = 3) {
  await ensureIndex(queryVector.length);

  const response = await axios.post(
    `${ENDEE_URL}/index/${INDEX_NAME}/search`,
    {
      vector: queryVector,
      k: topK,
    },
    {
      headers: {
        ...headers,
        Accept: "application/msgpack",
      },
      responseType: "arraybuffer",
      transformResponse: [(data) => data],
    },
  );

  const decoded = decode(new Uint8Array(response.data));
  const resultRows = Array.isArray(decoded?.results)
    ? decoded.results
    : Array.isArray(decoded)
      ? decoded
      : [];

  return {
    results: resultRows.map((item) => {
      if (Array.isArray(item)) {
        const [similarity, id, meta, filter, norm, vector] = item;
        return {
          similarity,
          id,
          filter,
          norm,
          vector,
          metadata: parseMeta(meta),
        };
      }

      return {
        ...item,
        metadata: parseMeta(item?.meta),
      };
    }),
  };
}
