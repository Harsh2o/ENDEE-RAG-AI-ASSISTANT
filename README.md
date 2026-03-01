# Endee RAG AI Assistant

A production-ready Retrieval-Augmented Generation (RAG) system built using:

- Node.js (Backend)
- React (Frontend)
- Ollama (LLM + Embeddings)
- Endee (Vector Database)

---

## 🚀 Project Overview

This project demonstrates a fully functional AI assistant powered by semantic search and vector retrieval.

The system allows users to:

1. Store large knowledge text into a vector database
2. Automatically chunk and embed the text
3. Retrieve relevant context using semantic similarity
4. Generate accurate answers using a local LLM (Ollama)

This simulates real-world AI assistant architecture used in modern production systems.

---

## 🧠 Problem Statement

Large Language Models (LLMs) do not retain persistent memory.  
This project solves that problem using:

- Vector embeddings
- Efficient similarity search
- Context compression
- Retrieval-Augmented Generation (RAG)

---

## 🏗 System Architecture

User → React UI → Node Backend →  
Embedding (Ollama) → Store in Endee →  
Query → Semantic Search → Context Compression → LLM → Response

---

## 🔎 How Endee Is Used

Endee acts as the vector database.

Workflow:
- Text is split into chunks
- Each chunk is converted into embeddings
- Embeddings are stored in Endee
- During queries, similarity search retrieves top relevant chunks
- Context is passed to LLM for final answer generation

Endee enables:
- Fast semantic retrieval
- Scalable memory storage
- Efficient vector indexing

---

## 🛠 Tech Stack

Backend:
- Node.js
- Express.js
- Axios
- UUID

Frontend:
- React
- CSS

AI:
- Ollama (llama3 + nomic-embed-text)
- Endee vector database

---
## 🎬 Demo Video

![Watch Demo Video]([doc/ui.png](https://drive.google.com/file/d/1vtzZUDkG47fw9prMk9946hXgUTodbiHd/view?usp=sharing))



## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Harsh2o/ENDEE-RAG-AI-ASSISTANT.git
cd ENDEE-RAG-AI-ASSISTANT






