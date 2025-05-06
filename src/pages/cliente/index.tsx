import { useState } from "react";
import SideBar from "../../components/sideBar";
import * as S from "./styles";
import { ArrowLeft } from "@phosphor-icons/react";
import { Input } from "../../components/input";
import { useNavigate } from "react-router";

export function Cliente() {
  const [sidebarClosed, setSidebarClosed] = useState<"open" | "closed">("open");

  const navigate = useNavigate();

  return (
    <S.Container>
      <SideBar closed={sidebarClosed} setClosed={setSidebarClosed} />

      <S.ContentArea closed={sidebarClosed}>
        <div
          className="wrapper"
          style={{
            width: "100%",
            maxWidth: "85%",
            gap: "2rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="back-button">
            <a
              style={{ gap: "0.3rem", display: "flex", alignItems: "center" }}
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={16} /> Voltar
            </a>
            <h1>Editar usuário</h1>
          </div>

          <div className="form">
            <form>
              <Input />
            </form>
          </div>
        </div>
      </S.ContentArea>
    </S.Container>
  );
}
