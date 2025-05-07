import { useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router";
import { api } from "../../services/api";

export function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.get("/users", {
        params: { userName, password },
      });

      if (res.data.length > 0) {
        const user = res.data[0];

        localStorage.setItem("userId", user.id);      // salva o ID do usuário
        localStorage.setItem("name", user.userName);  // salva o nome do usuário

        navigate("/dashboard");
      } else {
        alert("Credenciais inválidas.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login.");
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
