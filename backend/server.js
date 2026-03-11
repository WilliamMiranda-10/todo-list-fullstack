import express from "express";
import dotenv from "dotenv";
import "./src/db/connection.js";
import tarefasRoutes from "./src/routes/tarefasRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tarefas", tarefasRoutes);

app.get("/", (req, res) => {
  res.send("Api rodando!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta ", PORT);
});
