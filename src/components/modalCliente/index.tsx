import { toCNPJorCPF } from "../../utils/ToCNPJ";
import { toDATE } from "../../utils/ToDATE";
import { formatPhone } from "../../utils/ToNumberPhone";
import { Button } from "../button";
import { useNavigate } from "react-router";
import { api } from "../../services/api";
import { Store } from "react-notifications-component";

export const ModalClient = ({
  client,
  onClose,
  onDeleted,
}: {
  client: any;
  onClose: () => void;
  onDeleted: () => void;
}) => {

  const navigate = useNavigate();

  if (!client) return null;

  const handleEdit = () => {
    navigate(`/cliente/${client.id}`);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/companies/${client.id}`);

      Store.addNotification({
        title: "Sucesso",
        message: "Cliente Excluído sucesso!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });

      onDeleted();
      onClose();
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      Store.addNotification({
        title: "Erro!",
        message: "Erro ao tentar excluir o cliente, tente novamente.",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      padding: "1rem",
    }}>
      <div style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "700px",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        fontFamily: "Arial, sans-serif"
      }}>
        <h2 style={{ marginBottom: "1.5rem", fontSize: "1.4rem", color: "#333" }}>
          Informações do Cliente
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.95rem", color: "#444" }}>
          <p><strong>ID:</strong> {client.id}</p>
          <p><strong>Nome Fantasia:</strong> {client.FantasyName}</p>
          <p><strong>Razão Social (LegalName):</strong> {client.LegalName}</p>
          <p><strong>CNPJ:</strong> {toCNPJorCPF(client.cnpj)}</p>
          <p><strong>Loja Nº:</strong> {client.StoreIdNumber}</p>
          <p><strong>Tipo:</strong> {
            client.Type === 'f' ? 'Consumidor final' :
              client.Type === 'l' ? 'Produtor rural' :
                client.Type === 'r' ? 'Revendedor' :
                  client.Type === 's' ? 'Solidário' :
                    client.Type === 'x' ? 'Exportação' :
                      client.Type === 'matriz' ? 'Matriz' :
                        'Tipo desconhecido'
          }</p>
          <p><strong>Email:</strong> {client.Email}</p>
          <p><strong>Telefone:</strong> {formatPhone(client.PhoneCode, client.Phone)}</p>
          <p><strong>Data de Nascimento:</strong> {toDATE(client.BirthDate)}</p>
          <p><strong>Site:</strong> {client.HomePage}</p>
          <p><strong>CEP:</strong> {client.CEP}</p>
          <p><strong>Rua:</strong> {client.AddressStreet}</p>
          <p><strong>Bairro:</strong> {client.AddressDistrict}</p>
          <p><strong>Cidade:</strong> {client.City}</p>
          <p><strong>Estado:</strong> {client.State}</p>
          <p><strong>Região:</strong> {client.Region}</p>
          <p><strong>País (Descrição):</strong> {client.CountryDescription}</p>
          <p><strong>País (ID):</strong> {client.CountryId}</p>
          <p><strong>Está Ativo:</strong> {client.isActive === false ? "Não" : "Sim"}</p>
        </div>

        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between", gap: "1rem" }}>
          <Button onClick={onClose} color="#777" fs="0.85rem">
            Fechar
          </Button>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Button onClick={handleEdit} color="#2662D9" fs="0.85rem">
              Editar
            </Button>
            <Button onClick={handleDelete} color="#D92626" fs="0.85rem">
              Excluir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
