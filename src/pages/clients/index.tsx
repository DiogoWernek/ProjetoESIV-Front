import { useState } from "react";
import SideBar from "../../components/sideBar";
import * as S from "./styles";
import { Button } from "../../components/button";
import { UserPlus } from "@phosphor-icons/react";

export function Clients() {
  const [sidebarClosed, setSidebarClosed] = useState<"open" | "closed">("open");

  return (
    <S.Container>
      <SideBar closed={sidebarClosed} setClosed={setSidebarClosed} />

      <S.ContentArea closed={sidebarClosed}>
        <div className="wrapper" style={{ width: '100%', maxWidth: "85%" }}>

        <div className="texts-clients" style={{ width: '100%', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{display: 'flex', flexDirection: "column", gap: "0.5rem" }}>
            <h1>Clientes</h1>
            <p>Gerencie todos os seus clientes.</p>
          </div>
          <Button color="#2662D9" rounded>
            <UserPlus size={24} />Novo Cliente
          </Button>
        </div>

        <div className="search-clients">

        </div>

        <div className="cards-clients">
          
        </div>
        
        </div>
      </S.ContentArea>
    </S.Container>
  );
}
