import express from "express";
const router = express.Router();

let users = [
  { id: 1, name: "Ana", email: "ana@email.com" },
  { id: 2, name: "João", email: "joao@email.com" },
];

let nextId = 3;

//list users
router.get("/users", (req, res) => {
  console.log("Listing every users:");
  res.json({
    message: "Lista de usuários",
    total: users.length,
    data: users,
  });
});

//get user by id
router.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado",
      error: `Usuário com ID ${id} não existe`,
    });
  }

  console.log(`Buscando usuário ID: ${id}`);
  res.json({
    message: "Usuário encontrado",
    data: user,
  });
});

//create a new user
router.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Dados inválidos",
      error: "Nome e email são obrigatórios",
    });
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({
      message: "Email já cadastrado",
      error: `O email ${email} já está em uso`,
    });
  }

  const newUser = {
    id: nextId++,
    name,
    email,
  };

  users.push(newUser);

  console.log(`Novo usuário criado: ${name} (${email})`);
  res.status(201).json({
    message: "Usuário criado com sucesso",
    data: newUser,
  });
});

//atualiza user
router.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "Usuário não encontrado",
      error: `Usuário com ID ${id} não existe`,
    });
  }

  if (!name || !email) {
    return res.status(400).json({
      message: "Dados inválidos",
      error: "Nome e email são obrigatórios",
    });
  }

  users[userIndex] = { id, name, email };

  console.log(`Usuário atualizado: ${name} (${email})`);
  res.json({
    message: "Usuário atualizado com sucesso",
    data: users[userIndex],
  });
});

//del user
router.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "Usuário não encontrado",
      error: `Usuário com ID ${id} não existe`,
    });
  }

  const deletedUser = users[userIndex];
  users.splice(userIndex, 1);

  console.log(`Usuário removido: ${deletedUser.name}`);
  res.json({
    message: "Usuário removido com sucesso",
    data: deletedUser,
  });
});

export default router;
