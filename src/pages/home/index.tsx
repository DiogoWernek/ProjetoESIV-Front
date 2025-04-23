import { Button } from "../../components/button";
import SideBar from "../../components/sideBar";
import { UserPlus } from "@phosphor-icons/react";
import * as S from "./styles";

const Home = () => {
  return (
    <S.Container>
      <SideBar />

      <S.ContentArea>
        <div className="header">
          <div className="textHeader">
            <h1>Bem-vindo ao cliente viewer!</h1>
            <p>Gerencie seus clientes de forma simples e intuitiva</p>
          </div>
          
          <Button color="#2662D9"><UserPlus size={24} /> Novo Cliente</Button>
        </div>
      </S.ContentArea>
    </S.Container>
  );
};

export default Home;
