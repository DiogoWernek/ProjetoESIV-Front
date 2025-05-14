import { useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router";
import { api } from "../../services/api";
import { Store } from "react-notifications-component";

export function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        userName,
        password,
      });

      const token = res.data.token;
      const name = res.data.userName;

      localStorage.setItem("token", token);
      localStorage.setItem("name", name);

      navigate("/dashboard");

    } catch (error) {
      Store.addNotification({
        title: "Erro!",
        message: "Nome ou senha inválidos.",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <S.AuthContainer>
      <S.FormCard onSubmit={handleLogin}>
        <h1>Login</h1>
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
        <button type="submit">Entrar</button>
        <span onClick={() => navigate("/signup")}>Criar conta</span>
      </S.FormCard>
    </S.AuthContainer>
  );
}
