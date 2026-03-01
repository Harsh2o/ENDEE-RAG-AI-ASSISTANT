const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "of",
  "on",
  "or",
  "that",
  "the",
  "this",
  "to",
  "was",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "with",
  "you",
]);

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function estimateTokens(text) {
  return Math.ceil(String(text || "").length / 4);
}

function extractKeywords(question) {
  return normalizeText(question)
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
}

function scoreByKeywords(text, keywords) {
  if (keywords.length === 0) {
    return 0;
  }

  const lower = normalizeText(text);
  let hits = 0;
  for (const keyword of keywords) {
    if (lower.includes(keyword)) {
      hits += 1;
    }
  }
  return hits / keywords.length;
}

function compressChunk(text, keywords, maxChunkTokens) {
  const safeText = String(text || "").trim();
  if (!safeText) {
    return "";
  }

  if (estimateTokens(safeText) <= maxChunkTokens) {
    return safeText;
  }

  const sentences = safeText
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  if (sentences.length <= 1) {
    return safeText.slice(0, maxChunkTokens * 4);
  }

  const ranked = sentences
    .map((sentence) => ({
      sentence,
      score: scoreByKeywords(sentence, keywords) + Math.min(sentence.length, 200) / 1000,
    }))
    .sort((a, b) => b.score - a.score);

  const selected = [];
  let usedTokens = 0;

  for (const item of ranked) {
    const sentenceTokens = estimateTokens(item.sentence);
    if (usedTokens + sentenceTokens > maxChunkTokens) {
      continue;
    }
    selected.push(item.sentence);
    usedTokens += sentenceTokens;
  }

  if (selected.length === 0) {
    return safeText.slice(0, maxChunkTokens * 4);
  }

  return selected.join(" ");
}

export function compressContext(matches, question, options = {}) {
  const maxContextTokens = options.maxContextTokens ?? 700;
  const maxChunkTokens = options.maxChunkTokens ?? 180;

  const keywords = extractKeywords(question);
  const seen = new Set();

  const rows = (matches || [])
    .map((match) => {
      const text = match?.metadata?.text;
      const similarity = Number(match?.similarity ?? 0);
      return { text, similarity };
    })
    .filter((row) => row.text && typeof row.text === "string")
    .filter((row) => {
      const key = normalizeText(row.text);
      if (!key || seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    })
    .sort((a, b) => b.similarity - a.similarity);

  const scored = rows
    .map((row) => {
      const compressedText = compressChunk(row.text, keywords, maxChunkTokens);
      return {
        text: compressedText,
        rankScore: row.similarity + scoreByKeywords(compressedText, keywords),
      };
    })
    .filter((row) => row.text)
    .sort((a, b) => b.rankScore - a.rankScore);

  let tokenCount = 0;
  const selected = [];

  for (const row of scored) {
    const nextCost = estimateTokens(row.text);
    if (tokenCount + nextCost > maxContextTokens) {
      continue;
    }
    selected.push(row.text);
    tokenCount += nextCost;
  }

  const compressedContext = selected.join("\n\n---\n\n");

  return {
    compressedContext,
    stats: {
      originalChunks: rows.length,
      selectedChunks: selected.length,
      estimatedTokens: tokenCount,
      maxContextTokens,
    },
  };
}
