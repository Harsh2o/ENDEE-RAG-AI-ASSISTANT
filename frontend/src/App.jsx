// import { useState } from "react";
// import axios from "axios";

// const API_BASE = "http://localhost:5000";

// function App() {
//   const [storeText, setStoreText] = useState("");
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleStore = async () => {
//     if (!storeText) return alert("Enter text to store");

//     setLoading(true);
//     try {
//       await axios.post(`${API_BASE}/api/store`, {
//         text: storeText,
//       });
//       alert("Stored successfully!");
//       setStoreText("");
//     } catch (err) {
//       console.error(err);
//       alert("Store failed");
//     }
//     setLoading(false);
//   };

//   const handleAsk = async () => {
//     if (!question) return alert("Enter question");

//     setLoading(true);
//     try {
//       const res = await axios.post(`${API_BASE}/api/ask`, {
//         question,
//       });
//       setAnswer(res.data.answer);
//     } catch (err) {
//       console.error(err);
//       alert("Ask failed");
//     }
//     setLoading(false);
//   };

//   return (
//     <div style={{ maxWidth: 800, margin: "40px auto", fontFamily: "Arial" }}>
//       <h1>🧠 RAG AI Assistant</h1>

//       <hr />

//       <h2>Store Knowledge</h2>
//       <textarea
//         rows={5}
//         style={{ width: "100%" }}
//         value={storeText}
//         onChange={(e) => setStoreText(e.target.value)}
//         placeholder="Paste text to store in vector database..."
//       />
//       <br />
//       <button onClick={handleStore} disabled={loading}>
//         {loading ? "Processing..." : "Store"}
//       </button>

//       <hr />

//       <h2>Ask Question</h2>
//       <input
//         type="text"
//         style={{ width: "100%", padding: 8 }}
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//         placeholder="Ask something..."
//       />
//       <br /><br />
//       <button onClick={handleAsk} disabled={loading}>
//         {loading ? "Thinking..." : "Ask"}
//       </button>

//       {answer && (
//         <>
//           <hr />
//           <h2>Answer</h2>
//           <div
//             style={{
//               background: "#f4f4f4",
//               padding: 15,
//               borderRadius: 8,
//             }}
//           >
//             {answer}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import axios from "axios";
import './App.css'; // Assuming you'll create or update a separate CSS file

const API_BASE = "http://localhost:5000";

function App() {
  const [storeText, setStoreText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStore = async () => {
    if (!storeText) return alert("Enter text to store");

    setLoading(true);
    try {
      await axios.post(`${API_BASE}/api/store`, {
        text: storeText,
      });
      alert("Stored successfully!");
      setStoreText("");
    } catch (err) {
      console.error(err);
      alert("Store failed");
    }
    setLoading(false);
  };

  const handleAsk = async () => {
    if (!question) return alert("Enter question");

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/ask`, {
        question,
      });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      alert("Ask failed");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="app-title"> RAG AI Assistant</h1>

      <div className="section">
        <h2>Store Knowledge</h2>
        <textarea
          className="text-area"
          rows={5}
          value={storeText}
          onChange={(e) => setStoreText(e.target.value)}
          placeholder="Paste text to store in vector database..."
        />
        <button className="action-button" onClick={handleStore} disabled={loading}>
          {loading ? "Processing..." : "Store"}
        </button>
      </div>

      <div className="section">
        <h2>Ask Question</h2>
        <input
          type="text"
          className="input-field"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
        />
        <button className="action-button" onClick={handleAsk} disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>

        {answer && (
          <>
            <h2>Answer</h2>
            <div className="answer-box">
              {answer}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
