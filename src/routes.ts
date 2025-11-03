import express from "express";
import { getAnimales, postAnimal } from "./controllers";

export const router = express.Router();

// Rutas de animales
router.get("/animales", getAnimales);
router.post("/animales", postAnimal);
