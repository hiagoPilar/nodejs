import express from "express";

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  response.send("ok, deu bom!");
});

app.listen(3001);
