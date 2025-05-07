import { useState, useEffect } from "react";
import { Input } from "../../components/input";
import * as S from "./styles";
import { ArrowLeft, Building, User } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import { api } from "../../services/api";
import SideBar from "../../components/sideBar";
import {
  formatCNPJ,
  formatCPF,
  formatPhone,
} from "../../utils/Formatters";

export function NewClient() {
  const [sidebarClosed, setSidebarClosed] = useState<"open" | "closed">("open");
  const [formData, setFormData] = useState({
    FantasyName: "",
    cnpj: "",
    AddressStreet: "",
    AddressDistrict: "",
    LegalName: "",
    StoreIdNumber: 0,
    Type: "f",
    CEP: "",
    State: "",
    CityCode: "",
    City: "",
    Region: "",
    CountryDescription: "",
    CountryId: "",
    PhoneCode: "",
    Phone: "",
    BirthDate: "",
    HomePage: "",
    Email: "",
    isActive: true,
  });
  const [activeTab, setActiveTab] = useState<"dados" | "endereco">("dados");
  const navigate = useNavigate();

  const unmask = (value: string) => value.replace(/\D/g, "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    let rawValue = value;

    if (name === "cnpj") {
      rawValue = unmask(value);
      rawValue = formData.Type === "f" ? rawValue.slice(0, 11) : rawValue.slice(0, 14);
    }

    if (name === "Phone") rawValue = unmask(value).slice(0, 9);
    if (name === "PhoneCode") rawValue = unmask(value).slice(0, 2);
    if (name === "CEP") rawValue = unmask(value).slice(0, 8);
    if (name === "CityCode") rawValue = unmask(value).slice(0, 7);
    if (name === "CountryId") rawValue = unmask(value).slice(0, 3);

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : rawValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/companies", formData);
      alert("Cliente criado com sucesso!");
      navigate("/clientes");
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      alert("Erro ao criar cliente.");
    }
  };

  useEffect(() => {
    const fetchAddressFromCEP = async () => {
      if (formData.CEP.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${formData.CEP}/json/`);
          const data = await response.json();
          if (data.erro) return;

          setFormData((prev) => ({
            ...prev,
            AddressStreet: data.logradouro || "",
            AddressDistrict: data.bairro || "",
            City: data.localidade || "",
            State: data.uf || "",
          }));
        } catch (error) {
          console.error("Erro ao buscar o CEP:", error);
        }
      }
    };

    fetchAddressFromCEP();
  }, [formData.CEP]);

  return (
    <S.Container>
      <SideBar closed={sidebarClosed} setClosed={setSidebarClosed} />
      <S.ContentArea closed={sidebarClosed}>
        <div className="wrapper">
          <div className="back-button">
            <a onClick={() => navigate(-1)}>
              <ArrowLeft size={16} /> Voltar
            </a>
            <h1>Novo Cliente</h1>
          </div>

          <S.Card>
            <S.Tabs>
              <button
                className={activeTab === "dados" ? "active" : ""}
                onClick={() => setActiveTab("dados")}
              >
                Dados básicos
              </button>
              <button
                className={activeTab === "endereco" ? "active" : ""}
                onClick={() => setActiveTab("endereco")}
              >
                Endereço
              </button>
            </S.Tabs>

            <form onSubmit={handleSubmit}>
              {activeTab === "dados" && (
                <>
                  <S.RadioGroup>
                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          name="Type"
                          value="f"
                          checked={formData.Type === "f"}
                          onChange={handleChange}
                        />
                        <User size={20} />
                        Pessoa Física
                      </label>
                    </div>
                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          name="Type"
                          value="r"
                          checked={formData.Type === "r"}
                          onChange={handleChange}
                        />
                        <Building size={20} />
                        Pessoa Jurídica
                      </label>
                    </div>
                  </S.RadioGroup>

                  <S.Grid>
                    <Input
                      label={formData.Type === "f" ? "Nome completo" : "Nome fantasia"}
                      name="FantasyName"
                      value={formData.FantasyName}
                      onChange={handleChange}
                    />
                    <Input
                      label={formData.Type === "f" ? "CPF" : "CNPJ"}
                      name="cnpj"
                      value={
                        formData.Type === "f"
                          ? formatCPF(formData.cnpj)
                          : formatCNPJ(formData.cnpj)
                      }
                      maxLength={formData.Type === "f" ? 14 : 18}
                      onChange={handleChange}
                    />
                    <Input label="Email" name="Email" value={formData.Email} onChange={handleChange} />
                    <Input
                      label="Código de área (DDD)"
                      name="PhoneCode"
                      value={formData.PhoneCode}
                      onChange={handleChange}
                    />
                    <Input
                      label="Telefone"
                      name="Phone"
                      value={formatPhone(formData.Phone)}
                      onChange={handleChange}
                    />
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <label style={{
                        fontSize: "0.875rem",
                        color: "#5c5c5c",
                        fontWeight: 700,
                      }}>
                        Data de {formData.Type === "f" ? "Nascimento" : "Fundação"}
                      </label>
                      <input
                        type="date"
                        name="BirthDate"
                        value={formData.BirthDate}
                        onChange={handleChange}
                        style={{
                          padding: "0.5rem",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                          height: "46px",
                        }}
                      />
                    </div>
                    <Input label="Página inicial" name="HomePage" value={formData.HomePage} onChange={handleChange} />
                  </S.Grid>

                  <S.StatusSwitch>
                    <div className="switch-container">
                      <div style={{ display: "flex", gap: "0.2rem", flexDirection: "column" }}>
                        <span>Status</span>
                        <p>Cliente ativo no sistema</p>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="isActive"
                          checked={formData.isActive}
                          onChange={handleChange}
                        />
                        <span className="slider" />
                      </label>
                    </div>
                  </S.StatusSwitch>
                </>
              )}

              {activeTab === "endereco" && (
                <S.Grid>
                  <Input label="CEP" name="CEP" value={formData.CEP} onChange={handleChange} />
                  <Input label="Rua" name="AddressStreet" value={formData.AddressStreet} onChange={handleChange} />
                  <Input label="Bairro" name="AddressDistrict" value={formData.AddressDistrict} onChange={handleChange} />
                  <Input label="Cidade" name="City" value={formData.City} onChange={handleChange} />
                  <Input label="Código da cidade" name="CityCode" value={formData.CityCode} onChange={handleChange} />
                  <Input label="Estado" name="State" value={formData.State} onChange={handleChange} />
                  <Input label="Região" name="Region" value={formData.Region} onChange={handleChange} />
                  <Input label="País" name="CountryDescription" value={formData.CountryDescription} onChange={handleChange} />
                  <Input label="ID do País" name="CountryId" value={formData.CountryId} onChange={handleChange} />
                </S.Grid>
              )}

              <S.Button type="submit">Criar</S.Button>
            </form>
          </S.Card>
        </div>
      </S.ContentArea>
    </S.Container>
  );
}
