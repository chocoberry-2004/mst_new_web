import express from "express";
import dotenv from "dotenv";
const app = express();

app.use(express.urlencoded());
app.use(express.json());
dotenv.config();

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
