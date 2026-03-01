import { generateEmbedding } from "../src/services/embeddingService.js";

const runTest = async () => {
  const embedding = await generateEmbedding("Backend development roadmap");

  console.log("Vector length:", embedding.length);
};

runTest();
