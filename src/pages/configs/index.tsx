import { useState } from "react";
import SideBar from "../../components/sideBar";
import * as S from "./styles";
import { Input } from "../../components/input";
import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import { api } from "../../services/api";
import { Store } from "react-notifications-component";

export function Configuracoes() {
  const [sidebarClosed, setSidebarClosed] = useState<"open" | "closed">("open");
  const [userName, setUserName] = useState(localStorage.getItem("name") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      Store.addNotification({
        title: "Erro!",
        message: "ID do usuário não encontrado.",
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
      return;
    }

    if (password && password !== confirmPassword) {
      Store.addNotification({
        title: "Erro!",
        message: "As senhas não coincidem.",
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
      return;
    }

    try {
      await api.put(`/users/${userId}`, {
        userName,
        ...(password ? { password } : {}),
      });

      localStorage.setItem("name", userName);
      Store.addNotification({
        title: "Sucesso!",
        message: "Dados atualizados com sucesso!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      Store.addNotification({
        title: "Erro!",
        message: "Erro ao atualizar os dados.",
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
    }
  };

  return (
    <S.Container>
      <SideBar closed={sidebarClosed} setClosed={setSidebarClosed} />

      <S.ContentArea closed={sidebarClosed}>
        <div className="wrapper">
          <div className="back-button">
            <a onClick={() => navigate(-1)}>
              <ArrowLeft size={16} /> Voltar
            </a>
            <h1>Configurações</h1>
          </div>

          <S.Card>
            <form onSubmit={handleSubmit}>
              <S.Grid>
                <Input
                  label="Nome"
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />

                <Input
                  label="Nova senha"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Input
                  label="Confirmar nova senha"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </S.Grid>

              <S.Button type="submit">Salvar alterações</S.Button>
            </form>
          </S.Card>
        </div>
      </S.ContentArea>
    </S.Container>
  );
}
