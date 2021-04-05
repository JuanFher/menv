import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import router from "./routes";

// cadena de conexion a la base de datos
mongoose.Promise = global.Promise;
const dbUrl = "mongodb://localhost:27017/dbsistema";
mongoose
  .connect(dbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((mongoose) =>
    console.log("Conectando a la base de datos en el puerto 27017")
  )
  .catch((err) => console.log(err));

//codigo para el uso de middlewares
const app = express();
app.use(morgan("dev"));
app.use(cors());

//codigo para usar archivos estaticos en la aplicacion
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//codigo para las rutas de la aplicacion con middleware
app.use("/api", router);

//codigo para la creacion del servidor
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log("server on port " + app.get("port"));
});
