import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectBD from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoute.js";
import cors from "cors";
import path from "path";
import {fileURLToPath} from "url";

// config env
dotenv.config();

// database connection
connectBD();

// esModule fix
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./Client/build")));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./Client/build/index.html"));
});

// Port
const PORT = process.env.PORT;

// Listening to port
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`.cyan);
});
