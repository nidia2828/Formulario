import express from "express";
import cors from "cors";
import path from "path";
import { router } from "./routes";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rutas API
app.use("/api", router);

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
