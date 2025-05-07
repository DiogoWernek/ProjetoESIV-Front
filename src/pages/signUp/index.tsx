import { useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router";
import { api } from "../../services/api";

export function SignUp() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/users", { userName, password });
      alert("Usuário criado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Erro ao criar usuário.");
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
