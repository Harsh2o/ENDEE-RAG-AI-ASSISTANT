import axios from "axios";

const OLLAMA_BASE_URL = "http://localhost:11434";
const DEFAULT_MODEL = process.env.OLLAMA_MODEL || "llama3";

/* -------------------- BUILD PROMPT -------------------- */

function buildPrompt(context, question) {
  return `
You are a helpful AI assistant.
Answer the question strictly using the context below.
If the answer is not in the context, say "I don't know based on the provided information."

Context:
${context || "No relevant context found."}

Question:
${question}

Answer:
`;
}

/* -------------------- LIST AVAILABLE MODELS -------------------- */

async function listModels() {
  try {
    const response = await axios.get(`${OLLAMA_BASE_URL}/api/tags`);
    return response.data?.models?.map((m) => m.name) || [];
  } catch (err) {
    console.error("❌ Could not connect to Ollama.");
    return [];
  }
}

/* -------------------- GENERATE TEXT -------------------- */

async function generateWithModel(model, prompt) {
  const response = await axios.post(`${OLLAMA_BASE_URL}/api/generate`, {
    model,
    prompt,
    stream: false,
  });

  return response.data.response;
}

/* -------------------- MAIN FUNCTION -------------------- */

export async function generateAnswer(context, question) {
  const prompt = buildPrompt(context, question);

  try {
    // Try default model first
    return await generateWithModel(DEFAULT_MODEL, prompt);
  } catch (error) {
    console.warn("⚠ Default model not available. Checking installed models...");

    const availableModels = await listModels();

    // Filter out embedding models
    const chatModel = availableModels.find(
      (model) => !model.toLowerCase().includes("embed")
    );

    if (chatModel) {
      console.log(`✅ Using fallback model: ${chatModel}`);
      return await generateWithModel(chatModel, prompt);
    }

    // If no chat model found
    return `I found relevant memory but no chat model is installed in Ollama.

Installed models: ${availableModels.length > 0 ? availableModels.join(", ") : "None"}

Please run:
ollama pull llama3

Then restart your server.`;
  }
}