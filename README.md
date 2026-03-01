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
https://github.com/user-attachments/assets/f82fce2a-478f-4eaa-8a5c-36a266aefb46



## ⚙️ Setup Instructions

Before you begin, ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v16 or higher)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Must be actively running)
* [Ollama](https://ollama.com/) (For running local LLMs)

### 1. Clone the Repository
Clone the project to your local machine and navigate into the directory:
```bash
git clone https://github.com/Harsh2o/ENDEE-RAG-AI-ASSISTANT.git
cd ENDEE-RAG-AI-ASSISTANT
```

### 2. Start External Services (Database & LLM)
This application requires the Endee vector database and Ollama to be running before starting the servers.

* **Start Docker Desktop:** Ensure the Docker daemon is running.
* **Start Endee Vector Database:** Ensure your Endee container is running and accessible on port `8080`.
* **Start Ollama:** Start the Ollama server (accessible on port `11434`) and ensure your Llama model is pulled.

### 3. Install Dependencies
Install the required Node packages for the root project, as well as the frontend and backend.
```bash
npm install
```
*(Note: If required by your folder structure, navigate to the `/frontend` and `/backend` folders to run `npm install` inside them as well).*

### 4. Run the Application
Start both the backend and frontend development servers concurrently:
```bash
npm run dev
```
* The **Backend** server will start on `http://localhost:5000`
* The **Frontend** Vite application will start on `http://localhost:5174` (port may vary based on availability)

### 5. Usage
1. Open your browser and navigate to the frontend URL (e.g., `http://localhost:5174`).
2. **Store Knowledge:** Input text or documents into the interface to save them into the Endee vector database locally.
3. **Ask Questions:** Ask questions through the chat interface. The backend will retrieve related context from Endee and generate a precise answer using the local Llama model.

