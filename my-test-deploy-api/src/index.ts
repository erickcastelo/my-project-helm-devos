import express from "express";
import productsRouter from "./routes/products";
import "dotenv/config";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*"}));


app.use(express.json());

const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const path = isProduction ? '/app/api' : '';



app.use(`${path}/products`, productsRouter);
app.get(`${path}/health`, (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
