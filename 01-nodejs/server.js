//importando uma biblioteca
import express from "express";
import cors from "cors";
import pkg from "@prisma/client";
const { PrismaClient } = pkg; //database

//preciso avisar que quero usar essa biblioteca, variavel app passa o express como uma funcao, dentro do app tem acesso a tudo que tem no express
const app = express();
const prisma = new PrismaClient();
//assim o cors libera acesso total as paginas, se for restringir o acesso é preciso passar o endereço da pagina dentro da funcao
app.use(cors());

//por padrao o express nao usa json, entao temos que chamar
app.use(express.json());

//criar uma rota que devolve alguma coisa
//get: listar | post:criar | put:editar varios | patch: editar um | delete: deletar
//rotas precisam de duas coisas: Método HTTP e Endereço

// 2. listar users | query params
app.get("/users", async (request, response) => {
  const users = await prisma.user.findMany();

  response.status(200).json(users); //lista usuarios
});

// 1. criar user | body params
app.post("/users", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(user);
});

// 3. editar user | route params
app.put("/users/:id", async (req, res) => {
  await prisma.user.update({
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

// 4. apagar user
app.delete("/users/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "User deleted!" });
});

app.listen(3000); //porta que o server vai rodar
