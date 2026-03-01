import express from "express";
import {
  storeDocument,
  askQuestion,
  debugSearch,
} from "../controllers/apiController.js";

const router = express.Router();

router.post("/store", storeDocument);
router.post("/ask", askQuestion);
router.get("/debug-search", debugSearch);

export default router;
