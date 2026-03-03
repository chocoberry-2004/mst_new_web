import express from "express";
import dotenv from "dotenv";
import publicRoutes from "./routes/publicRoutes.js";
// import { fileURLToPath } from "url";
const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(express.urlencoded());
app.use(express.json());
dotenv.config();

const port = process.env.PORT;

app.use("/api/", publicRoutes);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
