import { generateEmbedding } from "../src/services/embeddingService.js";
import { insertVector } from "../src/services/endeeService.js";

const runTest = async () => {
  const text = "Backend development roadmap for beginners";

  const embedding = await generateEmbedding(text);

  const result = await insertVector("vec1", embedding, {
    text: text,
  });

  console.log("Insert result:", result);
};

runTest();
