export function formatCPF(cpf: string) {
  return cpf.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formatCNPJ(cnpj: string) {
  return cnpj
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

export function formatPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length <= 4) return cleaned;
  if (cleaned.length <= 8) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
  }
  if (cleaned.length <= 9) {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
  }

  return cleaned;
}

export function formatDateToInput(date: string) {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}

export function formatDateToDisplay(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}
