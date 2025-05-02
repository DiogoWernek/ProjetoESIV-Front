import { Button } from "../../components/button";
import SideBar from "../../components/sideBar";
import {
  Building,
  User,
  UserCheck,
  UserPlus,
  UsersThree,
} from "@phosphor-icons/react";
import * as S from "./styles";
import { Card } from "../../components/cards";
import { CardCliente } from "../../components/cardClient";
import { useState } from "react";

const Home = () => {
  const [sidebarClosed, setSidebarClosed] = useState<"open" | "closed">("open");

  return (
    <S.Container>
      <SideBar closed={sidebarClosed} setClosed={setSidebarClosed} />

      <S.ContentArea closed={sidebarClosed}>
        <div className="wrapper">
          <div className="header">
            <div className="textHeader">
              <h1>Bem-vindo ao cliente viewer!</h1>
              <p>Gerencie seus clientes de forma simples e intuitiva</p>
            </div>

            <Button color="#2662D9" rounded>
              <UserPlus size={24} /> Novo Cliente
            </Button>
          </div>

          <div className="cards">
            <Card number={5} textHeader="Total de clientes">
              <UsersThree size={24} color="#2662D9" />
            </Card>
            <Card number={4} subNumber="de 5" textHeader="Clientes Ativos">
              <UserCheck size={24} color="#2662D9" />
            </Card>
            <Card number={3} textHeader="Empresas">
              <Building size={24} color="#2662D9" />
            </Card>
            <Card number={2} textHeader="Pessoas Físicas">
              <User size={24} color="#2662D9" />
            </Card>
          </div>

          <div className="clients">
            <div className="texts-clients">
              <h2>Clientes Recentes</h2>
              <p>Visualize e gerencie os últimos usuários cadastrados</p>
            </div>
            <div className="cards-clients">
              <CardCliente
                name="Empresa Ltda."
                active={true}
                cnpj="12.1233/2312-3"
                email="Diogo@diogo.com"
                phone="(25) 23324-3244"
                updated_at="23/04/2004"
              />

              <CardCliente
                name="Empresa Ltda."
                active={false}
                cnpj="12.1233/2312-3"
                email="Diogo@diogo.com"
                phone="(25) 23324-3244"
                updated_at="23/04/2004"
              />

              <CardCliente
                name="Empresa Ltda."
                active={true}
                cnpj="12.1233/2312-3"
                email="Diogo@diogo.com"
                phone="(25) 23324-3244"
                updated_at="23/04/2004"
              />

              <CardCliente
                name="Empresa Ltda."
                active={true}
                cnpj="12.1233/2312-3"
                email="Diogo@diogo.com"
                phone="(25) 23324-3244"
                updated_at="23/04/2004"
              />
            </div>

            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              <Button color="#FAFAFA" textColor="black" border="#ECECEE" fs="0.8rem" onClick={() => window.location.href = "/clientes"}>
                Ver todos
              </Button>
            </div>
          </div>
        </div>
      </S.ContentArea>
    </S.Container>
  );
};

export default Home;
