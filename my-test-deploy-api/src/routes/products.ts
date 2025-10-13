import { Router } from "express";
import { db } from "../db";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name, price FROM products");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
});

export default router;
