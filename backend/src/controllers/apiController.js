import { generateEmbedding } from "../services/embeddingService.js";
import { insertVector, searchVector } from "../services/endeeService.js";
import { generateAnswer } from "../services/llmService.js";
import { splitIntoChunks } from "../services/chunkService.js";
import { compressContext } from "../services/contextCompressionService.js";
import { v4 as uuidv4 } from "uuid";

export const getRoot = (req, res) => {
  res.send("Server is ACTIVE 🚀");
};

export const storeDocument = async (req, res) => {
  console.log("🔥 STORE API HIT");

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    console.log("📦 Incoming text length:", text.length);

    const chunks = splitIntoChunks(text);
    console.log("✂ Chunks created:", chunks.length);

    let storedCount = 0;

    for (const chunk of chunks) {
      const embedding = await generateEmbedding(chunk);
      const id = uuidv4();

      await insertVector(id, embedding, { text: chunk });
      storedCount++;
    }

    console.log("✅ Vectors stored:", storedCount);

    res.json({
      message: "Stored successfully with chunking",
      chunksCreated: chunks.length,
      vectorsStored: storedCount,
    });
  } catch (error) {
    console.error("❌ STORE ERROR:", error);
    res.status(500).json({ error: "Store failed" });
  }
};

export const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "'question' is required" });
    }

    console.log("❓ Question:", question);

    const queryEmbedding = await generateEmbedding(question);

    // Retrieve top 3 matches from Endee
    const searchResults = await searchVector(queryEmbedding, 3);

    const matches = (searchResults.results ?? []).sort(
      (a, b) => (b?.similarity ?? 0) - (a?.similarity ?? 0),
    );

    console.log("🔎 Matches found:", matches.length);

    // Compress context intelligently
    const { compressedContext, stats } = compressContext(matches, question, {
      maxContextTokens: 700,
      maxChunkTokens: 180,
    });

    console.log("🗜 Context compression stats:", stats);
    console.log("📚 Final context length:", compressedContext.length);

    const answer = await generateAnswer(compressedContext, question);

    res.json({ answer });
  } catch (error) {
    console.error("❌ ASK ERROR:", error);
    res.status(500).json({ error: "Ask failed" });
  }
};

export const debugSearch = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    console.log("🛠 DEBUG SEARCH:", query);

    const queryEmbedding = await generateEmbedding(query);

    const searchResults = await searchVector(queryEmbedding, 5);

    const rawMatches = searchResults.results ?? [];

    const rankedResults = rawMatches
      .map((match) => ({
        similarity: match.similarity ?? match.score ?? 0,
        preview: match.metadata?.text?.slice(0, 120),
      }))
      .sort((a, b) => b.similarity - a.similarity);

    const selectedAfterFiltering = rankedResults.slice(0, 3);

    res.json({
      query,
      totalMatches: rawMatches.length,
      rankedResults,
      selectedAfterFiltering,
    });
  } catch (error) {
    console.error("❌ DEBUG SEARCH ERROR:", error);
    res.status(500).json({ error: "Debug search failed" });
  }
};
