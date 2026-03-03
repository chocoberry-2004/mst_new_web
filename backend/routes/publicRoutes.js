import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello world");
});

router.get("/test", (req, res) => {
  console.log("TESTing");
  res.status(200).send("testing");
});

export default router;
