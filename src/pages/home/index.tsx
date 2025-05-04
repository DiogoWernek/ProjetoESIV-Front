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
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { toCNPJorCPF } from "../../utils/ToCNPJ";
import { toDATE } from "../../utils/ToDATE";
import { Loading } from "../Loading";
import { formatPhone } from "../../utils/ToNumberPhone";
import { useNavigate } from "react-router";

const Home = () => {
  const [sidebarClosed, setSidebarClosed] = useState<"open" | "closed">("open");
  const [companies, setCompanies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalClients, setTotalClients] = useState(0);
  const [totalActives, setTotalActives] = useState(0);
  const [totalLegalEntity, setTotalLegalEntity] = useState(0);
  const [totalNaturalPerson, setTotalNaturalPerson] = useState(0);

  const getComapanies = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/companies");
      const data = response.data;

      setCompanies(data);
      setTotalClients(data.length);

      const activeClients = data.filter((company: any) => company.isActive);
      setTotalActives(activeClients.length);

      const isCNPJ = (value: string) => value.replace(/\D/g, "").length === 14;
      const isCPF = (value: string) => value.replace(/\D/g, "").length === 11;

      const totalLegalEntity = data.filter((company: any) => isCNPJ(company.cnpj)).length;
      const totalNaturalPerson = data.filter((company: any) => isCPF(company.cnpj)).length;

      setTotalLegalEntity(totalLegalEntity);
      setTotalNaturalPerson(totalNaturalPerson);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  const navigate = useNavigate()

  const handleClientClick = (id: string) => {
    navigate(`/cliente/${id}`);
  };  

  useEffect(() => {
    getComapanies();
  }, [])

  if (isLoading) {
    return <Loading />
  }

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

            <Button color="#2662D9" rounded={true}>
              <UserPlus size={24} /> Novo Cliente
            </Button>
          </div>

          <div className="cards">
            <Card number={totalClients} textHeader="Total de clientes">
              <UsersThree size={24} color="#2662D9" />
            </Card>
            <Card number={totalActives} subNumber={`de ${totalClients}`} textHeader="Clientes Ativos">
              <UserCheck size={24} color="#2662D9" />
            </Card>
            <Card number={totalLegalEntity} textHeader="Empresas">
              <Building size={24} color="#2662D9" />
            </Card>
            <Card number={totalNaturalPerson} textHeader="Pessoas Físicas">
              <User size={24} color="#2662D9" />
            </Card>
          </div>

          <div className="clients">
            <div className="texts-clients">
              <h2>Clientes Recentes</h2>
              <p>Visualize e gerencie os últimos usuários cadastrados</p>
            </div>
            <div className="cards-clients">
              {companies.slice(0, 4).map((company, index) => (

                <CardCliente
                  key={index}
                  name={company.companyFantasyName}
                  active={company.isActive}
                  cnpj={toCNPJorCPF(company.cnpj)}
                  email={company.companyEmail}
                  phone={formatPhone(company.companyPhoneCode, company.companyPhone)}
                  updated_at={toDATE(company.companyBirthDate)}
                  onClick={() => handleClientClick(company.id)}
                />

              ))}
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
