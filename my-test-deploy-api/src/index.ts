import express from "express";
import productsRouter from "./routes/products";
import "dotenv/config";
import cors from "cors";

const app = express();

const allowedOrigins = "*";

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requests sem origin (como Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn(`🚫 CORS bloqueado para origem: ${origin}`);
      return callback(new Error("CORS não permitido"), false);
    },
    credentials: true, // Se quiser permitir cookies ou auth headers
  })
);

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/products", productsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
