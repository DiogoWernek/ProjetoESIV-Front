import { useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router";
import { api } from "../../services/api";
import { Store } from "react-notifications-component";

export function SignUp() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const checkUserNameExists = async (userName: string) => {
    try {
      const response = await api.get("/users");
      const users = response.data;

      const userExists = users.some((user: { userName: string }) => user.userName === userName);
      return userExists;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return false;
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const userExists = await checkUserNameExists(userName);

    if (userExists) {
      Store.addNotification({
        title: "Erro!",
        message: "Esse nome de usuário já está em uso. Tente outro.",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      })
      return;
    }

    try {
      await api.post("/users", { userName, password });
      Store.addNotification({
        title: "Sucesso!",
        message: "Usuário criado com sucesso!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      })
      navigate("/");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      Store.addNotification({
        title: "Erro!",
        message: "Erro ao criar usuário.",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      })
    }
  };

  return (
    <S.AuthContainer>
      <S.FormCard onSubmit={handleRegister}>
        <h1>Criar Conta</h1>
        <input
          type="text"
          placeholder="Seu Nome"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
        <span onClick={() => navigate("/")}>Voltar para login</span>
      </S.FormCard>
    </S.AuthContainer>
  );
}
