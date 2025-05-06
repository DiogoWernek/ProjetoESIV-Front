export function formatCPF(cpf: string) {
  return cpf.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formatCNPJ(cnpj: string) {
  return cnpj
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

export function formatPhone(phone: string) {
  return phone.replace(/\D/g, "").replace(/(\d{5})(\d{4})/, "$1-$2");
}

export function formatDateToInput(date: string) {
  const d = new Date(date);
  return d.toISOString().split("T")[0]; // yyyy-mm-dd (para input type="date")
}

export function formatDateToDisplay(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}
