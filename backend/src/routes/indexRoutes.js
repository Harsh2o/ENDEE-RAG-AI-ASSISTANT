import express from "express";
import { getRoot } from "../controllers/apiController.js";

const router = express.Router();

router.get("/", getRoot);

export default router;
