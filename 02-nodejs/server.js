import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor okk!");
});

//show users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
});

//create user
app.post("/users", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(200).json(user);
});

//edit user
app.put("/users/:id", async (req, res) => {
  const user = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const user = await prisma.user.update({
    where: { id },
    data: updates,
  });

  res.status(201).json(user);
});

app.listen(3000);
