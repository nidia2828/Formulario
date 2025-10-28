import express from "express";
import cors from "cors";
import path from "path";
import { router } from "./routes";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); //para leer JSON en las peticiones
app.use(express.urlencoded({extended : true})); //para leer l=datos de formularios

//Ruta de archivos est [aticos]
app.use(express.static(path.resolve(__dirname, "public")));
//Rutas
app.use("/api", router);
//servidor escuchando
app.listen(PORT, ()=> {
    console.log ( `servidos corriendo en http://localhost:${PORT}`)
});
