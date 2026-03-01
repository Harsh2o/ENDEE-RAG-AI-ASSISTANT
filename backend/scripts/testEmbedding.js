import openai from "../src/services/openaiService.js";

const runTest = async () => {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: "Backend development roadmap",
  });

  console.log(response.data[0].embedding.length);
};

runTest();
