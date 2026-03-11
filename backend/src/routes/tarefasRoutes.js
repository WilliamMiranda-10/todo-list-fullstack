import express from "express";
import {
  getTarefas,
  createTarefa,
  updateTarefa,
  deleteTarefa,
  getTarefaById,
} from "../contollers/tarefasController.js";

const router = express.Router();

router.get("/", getTarefas);
router.post("/", createTarefa);
router.put("/:id", updateTarefa);
router.delete("/:id", deleteTarefa);
router.get("/:id", getTarefaById);

export default router;
