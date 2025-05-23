import { useEffect, useState } from "react";
import { Input } from "../../components/input";
import * as S from "./styles";
import { ArrowLeft, Building, User } from "@phosphor-icons/react";
import { useNavigate, useParams } from "react-router";
import { api } from "../../services/api";
import SideBar from "../../components/sideBar";
import {
  formatCNPJ,
  formatCPF,
  formatDateToInput,
  formatPhone,
} from "../../utils/Formatters";
import { Store } from "react-notifications-component";

interface Company {
  id: string;
  FantasyName: string;
  cnpj: string;
  AddressStreet: string;
  AddressDistrict: string;
  LegalName: string;
  StoreIdNumber: number;
  Type: string;
  CEP: string;
  State: string;
  CityCode: string;
  City: string;
  Region: string;
  CountryDescription: string;
  CountryId: string;
  PhoneCode: string;
  Phone: string;
  BirthDate: string;
  HomePage: string;
  Email: string;
  isActive: boolean;
}

export function Cliente() {
  const [sidebarClosed, setSidebarClosed] = useState<"open" | "closed">("open");
  const [formData, setFormData] = useState<Company | null>(null);
  const [activeTab, setActiveTab] = useState<"dados" | "endereco">("dados");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    api.get(`/companies/${id}`).then((res) => {
      setFormData(res.data);
    });
  }, [id]);

  const unmask = (value: string) => value.replace(/\D/g, "");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.checked;


    let rawValue = value;

    if (name === "cnpj") {
      rawValue = unmask(value);
      if (formData?.Type === "f") rawValue = rawValue.slice(0, 11);
      if (formData?.Type === "r") rawValue = rawValue.slice(0, 14);
    }

    if (name === "Phone") rawValue = unmask(value).slice(0, 9);
    if (name === "PhoneCode") rawValue = unmask(value).slice(0, 2);
    if (name === "CEP") rawValue = unmask(value).slice(0, 8);
    if (name === "CityCode") rawValue = unmask(value).slice(0, 7);
    if (name === "CountryId") rawValue = unmask(value).slice(0, 3);
    if (name === "BirthDate") rawValue = value;

    setFormData((prev) =>
      prev
        ? { ...prev, [name]: type === "checkbox" ? checked : rawValue }
        : null
    );
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    const requiredFields = [
      { field: formData.CEP, name: "CEP" },
      { field: formData.cnpj, name: "CNPJ/CPF" },
      { field: formData.AddressDistrict, name: "Bairro" },
      { field: formData.Type, name: "Tipo de Pessoa (Física ou Jurídica)" },
      { field: formData.StoreIdNumber, name: "Tipo de Cliente" },
    ];

    const missing = requiredFields.find((f) =>
      typeof f.field === "string"
        ? f.field.trim() === ""
        : f.field === null || f.field === undefined
    );

    if (missing) {
      Store.addNotification({
        title: "Campo obrigatório!",
        message: `Preencha o campo: ${missing.name}`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: { duration: 5000, onScreen: true },
      });
      return;
    }

    try {
      await api.put(`/companies/${id}`, formData);
      Store.addNotification({
        title: "Sucesso!",
        message: "Dados atualizados com sucesso.",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: { duration: 5000, onScreen: true },
      });
      navigate("/clientes");
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
      Store.addNotification({
        title: "Erro!",
        message: "Erro ao tentar atualizar os dados, tente novamente.",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: { duration: 5000, onScreen: true },
      });
    }
  };



  useEffect(() => {
    const fetchAddressFromCEP = async () => {
      if (formData?.CEP && formData.CEP.length === 8) {
        try {
          const response = await fetch(
            `https://viacep.com.br/ws/${formData.CEP}/json/`
          );
          const data = await response.json();

          if (data.erro) {
            console.warn("CEP não encontrado.");
            return;
          }

          setFormData((prev) =>
            prev
              ? {
                ...prev,
                AddressStreet: data.logradouro || "",
                AddressDistrict: data.bairro || "",
                City: data.localidade || "",
                State: data.uf || "",
              }
              : null
          );
        } catch (error) {
          console.error("Erro ao buscar o CEP:", error);
        }
      }
    };

    fetchAddressFromCEP();
  }, [formData?.CEP]);

  return (
    <S.Container>
      <SideBar closed={sidebarClosed} setClosed={setSidebarClosed} />

      <S.ContentArea closed={sidebarClosed}>
        <div className="wrapper">
          <div className="back-button">
            <a onClick={() => navigate(-1)}>
              <ArrowLeft size={16} /> Voltar
            </a>
            <h1>Editar Cliente</h1>
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

            {formData && (
              <form onSubmit={handleSubmit}>
                {activeTab === "dados" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
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
                        label="Código da Loja"
                        name="StoreIdNumber"
                        type="number"
                        value={formData.StoreIdNumber}
                        onChange={handleChange}
                      />

                      <Input
                        label={
                          formData.Type === "f"
                            ? "Nome Completo"
                            : "Nome Fantasia"
                        }
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

                      <Input
                        label="Email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                      />

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

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.4rem",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "0.875rem",
                            color: "#5c5c5c",
                            fontWeight: 700,
                          }}
                        >
                          Data de{" "}
                          {formData.Type === "f" ? "Nascimento" : "Fundação"}
                        </label>
                        <input
                          type="date"
                          name="BirthDate"
                          value={formatDateToInput(formData.BirthDate)}
                          onChange={handleChange}
                          style={{
                            padding: "0.5rem",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            height: "46px",
                          }}
                        />
                      </div>
                      <Input
                        label="Página inicial"
                        name="HomePage"
                        value={formData.HomePage}
                        onChange={handleChange}
                      />

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <label
                          style={{
                            fontSize: "0.875rem",
                            color: "#5c5c5c",
                            fontWeight: 700,
                          }}
                          htmlFor="Type"
                        >
                          Tipo de Cliente
                        </label>
                        <S.StyledSelect
                          name="Type"
                          id="Type"
                          value={formData.Type}
                          onChange={handleChange}
                        >
                          <option value="">Selecione um tipo</option>
                          <option value="f">Consumidor final</option>
                          <option value="l">Produtor rural</option>
                          <option value="r">Revendedor</option>
                          <option value="s">Solidário</option>
                          <option value="x">Exportação</option>
                          <option value="matriz">Matriz</option>
                        </S.StyledSelect>
                      </div>


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
                  </div>
                )}

                {activeTab === "endereco" && (
                  <S.Grid>
                    <Input
                      label="CEP"
                      name="CEP"
                      value={formData.CEP}
                      onChange={handleChange}
                    />
                    <Input
                      label="Rua"
                      name="AddressStreet"
                      value={formData.AddressStreet}
                      onChange={handleChange}
                    />
                    <Input
                      label="Bairro"
                      name="AddressDistrict"
                      value={formData.AddressDistrict}
                      onChange={handleChange}
                    />
                    <Input
                      label="Cidade"
                      name="City"
                      value={formData.City}
                      onChange={handleChange}
                    />
                    <Input
                      label="Código da cidade"
                      name="CityCode"
                      value={formData.CityCode}
                      onChange={handleChange}
                    />
                    <Input
                      label="Estado"
                      name="State"
                      value={formData.State}
                      onChange={handleChange}
                    />
                    <Input
                      label="Região"
                      name="Region"
                      value={formData.Region}
                      onChange={handleChange}
                    />
                    <Input
                      label="País"
                      name="CountryDescription"
                      value={formData.CountryDescription}
                      onChange={handleChange}
                    />
                    <Input
                      label="ID do País"
                      name="CountryId"
                      value={formData.CountryId}
                      onChange={handleChange}
                    />
                  </S.Grid>
                )}

                <S.Button type="submit">Salvar</S.Button>
              </form>
            )}
          </S.Card>
        </div>
      </S.ContentArea>
    </S.Container>
  );
}
