import { Request, Response } from "express";
import { pool } from "./db";

// GET todos los animales
export const getAnimales = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM animales ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error obteniendo animales:", error);
    res.status(500).json({ message: "Error obteniendo animales", error });
  }
};

// POST nuevo animal
export const postAnimal = async (req: Request, res: Response) => {
  try {
    const { nombre, especie, edad, propietario, telefono } = req.body;
    console.log("Datos recibidos:", { nombre, especie, edad, propietario, telefono });

    if (!nombre || !especie || isNaN(edad) || !propietario || !telefono) {
      return res.status(400).json({ message: "Datos incompletos o inválidos" });
    }

    const result = await pool.query(
      "INSERT INTO animales (nombre, especie, edad, propietario, telefono) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nombre, especie, edad, propietario, telefono]
    );

    console.log("Animal insertado:", result.rows[0]);
    res.json({ message: "Animal registrado correctamente", animal: result.rows[0] });
  } catch (error) {
    console.error("Error insertando animal:", error);
    res.status(500).json({ message: "Error insertando animal", error });
  }
};
