import express from "express";
import { getAdminStatus } from "../controllers/alldataController.js"; // ← यहाँ `.js` लगाना ज़रूरी है ES Modules में

const router = express.Router();

// Route: /api/admin/status
router.get("/status", getAdminStatus);

export default router;
