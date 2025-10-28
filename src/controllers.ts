import { Request, Response } from "express";
import { pool } from "./db";

// este es el controlador para obtener los datos
export const getData = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo datos de BD", error });
  }
};

// este es el controlador para insertar datos
export const postData = async (req: Request, res: Response) => {
  try {
    const { nombre, correo } = req.body;
    await pool.query("INSERT INTO usuarios (nombre, correo) VALUES ($1, $2)", [nombre, correo]);
    res.json({ message: "Datos insertados correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error insertando datos de BD", error });
  }
};