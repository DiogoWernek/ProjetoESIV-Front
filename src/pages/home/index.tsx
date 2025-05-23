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
import { ModalClient } from "../../components/modalCliente";

const Home = () => {
  const [sidebarClosed, setSidebarClosed] = useState<"open" | "closed">("open");
  const [companies, setCompanies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalClients, setTotalClients] = useState(0);
  const [totalActives, setTotalActives] = useState(0);
  const [totalLegalEntity, setTotalLegalEntity] = useState(0);
  const [totalNaturalPerson, setTotalNaturalPerson] = useState(0);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleClientClick = (client: any) => {
    setSelectedClient(client);
    setIsModalOpen(true);
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

            <Button color="#2662D9" rounded={true} onClick={() => window.location.href = "/novo-cliente"}>
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
                  name={company.FantasyName}
                  active={company.isActive}
                  cnpj={toCNPJorCPF(company.cnpj)}
                  email={company.Email}
                  phone={formatPhone(company.PhoneCode, company.Phone)}
                  updated_at={toDATE(company.BirthDate)}
                  onClick={() => handleClientClick(company)}
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

        {isModalOpen && (
          <ModalClient
            client={selectedClient}
            onClose={() => setIsModalOpen(false)}
            onDeleted={getComapanies}
          />

        )}

      </S.ContentArea>
    </S.Container>
  );
};

export default Home;
