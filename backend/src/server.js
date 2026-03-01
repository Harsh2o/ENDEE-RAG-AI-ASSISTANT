import * as dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 5000;

console.log("🔥 SERVER STARTER BOOTING...");

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
