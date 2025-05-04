import { useEffect, useState } from "react";
import SideBar from "../../components/sideBar";
import * as S from "./styles";
import { Button } from "../../components/button";
import { UserPlus } from "@phosphor-icons/react";
import { Search } from "../../components/search";
import { api } from "../../services/api";
import { CardCliente } from "../../components/cardClient";
import { toCNPJorCPF } from "../../utils/ToCNPJ";
import { formatPhone } from "../../utils/ToNumberPhone";
import { toDATE } from "../../utils/ToDATE";
import { useNavigate } from "react-router";

export function Clients() {
  const [sidebarClosed, setSidebarClosed] = useState<"open" | "closed">("open");
  const [companies, setCompanies] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [allCompanies, setAllCompanies] = useState<any[]>([]);

  const navigate = useNavigate()

  const getCompanies = async () => {
    try {
      const response = await api.get("/companies");
      const data = response.data;
      setCompanies(data);
      setAllCompanies(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClientClick = (id: string) => {
    navigate(`/cliente/${id}`);
  };  

  useEffect(() => {
    getCompanies();
  }, []);

  useEffect(() => {
    const filtered = allCompanies.filter((company) =>
      company.companyFantasyName.toLowerCase().includes(search.toLowerCase())
    );
    setCompanies(filtered);
  }, [search, allCompanies]);

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
          <div
            className="texts-clients"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <h1>Clientes</h1>
              <p>Gerencie todos os seus clientes.</p>
            </div>
            <Button color="#2662D9" rounded={true}>
              <UserPlus size={24} />
              Novo Cliente
            </Button>
          </div>

          <div className="search-clients">
            <Search
              placeholder="Buscar por nome"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="cards-clients">
            {companies.map((company, index) => (
              <CardCliente
                key={index}
                name={company.companyFantasyName}
                active={company.isActive}
                cnpj={toCNPJorCPF(company.cnpj)}
                email={company.companyEmail}
                phone={formatPhone(
                  company.companyPhoneCode,
                  company.companyPhone
                )}
                updated_at={toDATE(company.companyBirthDate)}
                onClick={() => handleClientClick(company.id)}
              />
            ))}
          </div>
        </div>
      </S.ContentArea>
    </S.Container>
  );
}
