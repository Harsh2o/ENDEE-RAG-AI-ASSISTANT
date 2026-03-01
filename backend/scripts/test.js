import axios from "axios";

async function run() {
  try {
    const vector = Array(384).fill(0.5);

    const response = await axios.post(
      "http://localhost:8080/api/v1/index/insert",
      {
        index_name: "agent_memory",   // 👈 IMPORTANT
        ids: ["vec_001"],
        vectors: [vector]
      },
      {
        headers: {
          Authorization: "test-token",
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Insert Success!");
    console.log(response.data);

  } catch (error) {
    console.error("❌ Error occurred:");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

run();
