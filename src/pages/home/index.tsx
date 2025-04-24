import { Button } from "../../components/button";
import SideBar from "../../components/sideBar";
import { Gear, UserPlus } from "@phosphor-icons/react";
import * as S from "./styles";
import { Card } from "../../components/cards";

const Home = () => {
  return (
    <S.Container>
      <SideBar />

      <S.ContentArea>
        <div className="wrapper">
          <div className="header">
            <div className="textHeader">
              <h1>Bem-vindo ao cliente viewer!</h1>
              <p>Gerencie seus clientes de forma simples e intuitiva</p>
            </div>

            <Button color="#2662D9">
              <UserPlus size={24} /> Novo Cliente
            </Button>
          </div>

          <div className="cards">
            <Card number={5} textHeader="Total de clientes"><Gear size={24} color="#2662D9" /></Card>
          </div>
        </div>
      </S.ContentArea>
    </S.Container>
  );
};

export default Home;
