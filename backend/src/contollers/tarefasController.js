import { pool } from "../db/connection.js";

export const getTarefas = async (req, res) => {
  try {
    const connection = await pool;
    const result = await connection
      .request()
      .query(
        "SELECT id, titulo, descricao, concluida FROM tarefas WHERE ativo = 1 ORDER BY id DESC",
      );
    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const getTarefaById = async (req, res) => {
  try {
    const { id } = req.params;
    const idNumber = Number(id);

    if (isNaN(idNumber)) {
      return res.status(400).json({ message: "Id Inválido." });
    }

    const connection = await pool;
    const result = await connection
      .request()
      .input("id", idNumber)
      .query("SELECT * FROM tarefas WHERE id = @id AND ativo = 1 ");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }

    return res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error("Erro ao buscar tarefa por id", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const createTarefa = async (req, res) => {
  try {
    const { titulo, descricao } = req.body;

    if (!titulo) {
      return res.status(400).json({ message: "Título é obrigatório" });
    }

    const connection = await pool;
    const result = await connection
      .request()
      .input("titulo", titulo)
      .input("descricao", descricao)
      .query(
        "INSERT INTO tarefas (titulo, descricao, concluida, ativo) OUTPUT INSERTED.*  VALUES (@titulo, @descricao, 0, 1)",
      );
    return res.status(201).json(result.recordset[0]);
  } catch (error) {
    console.error("Erro ao criar tarefa", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const updateTarefa = async (req, res) => {
  try {
    const { id } = req.params;

    const { titulo, concluida } = req.body;

    const idNumber = Number(id);

    if (isNaN(idNumber)) {
      return res.status(400).json({ message: "Id inválido" });
    }

    if (typeof concluida !== "boolean") {
      return res
        .status(400)
        .json({ message: "concluida deve ser true ou false" });
    }

    const connection = await pool;

    const result = await connection
      .request()
      .input("id", idNumber)
      .input("titulo", titulo)
      .input("concluida", concluida)
      .query(
        "UPDATE tarefas SET titulo= @titulo, concluida = @concluida OUTPUT INSERTED.* WHERE id= @id AND ativo = 1",
      );
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    } else {
      return res.status(200).json(result.recordset[0]);
    }
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const deleteTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const idNumber = Number(id);

    if (isNaN(idNumber)) {
      return res.status(400).json({ message: "Id inválido!" });
    }

    const connection = await pool;

    const result = await connection
      .request()
      .input("id", idNumber)
      .query(
        "UPDATE tarefas SET ativo = 0 OUTPUT INSERTED.* WHERE id = @id AND ativo = 1",
      );

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    return res.status(200).json({
      message: "Tarefa deletada com sucesso",
      tarefa: result.recordset[0],
    });
  } catch (error) {
    console.error("Erro ao deletar tarefa", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};
