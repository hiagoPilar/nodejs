import express from "express";
import userRoutes from "./routes/users.js";

const app = express();

app.use(express.json());
app.use("./api", userRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API de Usuários funcionando!",
    endpoints: {
      "GET /api/users": "Lista todos os usuários",
      "GET /api/users/:id": "Obtém um usuário pelo ID",
      "POST /api/users": "Cria um novo usuário",
      "PUT /api/users/:id": "Atualiza um usuário",
      "DELETE /api/users/:id": "Remove um usuário",
    },
  });
});
