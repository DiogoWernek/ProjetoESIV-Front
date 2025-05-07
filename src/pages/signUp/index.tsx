import { useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router";
import { api } from "../../services/api";

export function SignUp() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  // Função para verificar se o nome de usuário já existe
  const checkUserNameExists = async (userName: string) => {
    try {
      const response = await api.get(`/users/exists/${userName}`);
      return response.data.exists;  // Supondo que a API retorne um campo "exists"
    } catch (error) {
      console.error("Erro ao verificar nome de usuário:", error);
      return false;  // Em caso de erro, assumimos que o nome de usuário não existe
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se o nome de usuário já existe
    const userExists = await checkUserNameExists(userName);

    if (userExists) {
      alert("Esse nome de usuário já está em uso. Tente outro.");
      return;  // Não prosseguir com o cadastro se o nome de usuário já existir
    }

    try {
      await api.post("/users", { userName, password });
      alert("Usuário criado com sucesso!");
      navigate("/");  // Redireciona para a página de login após o cadastro
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
