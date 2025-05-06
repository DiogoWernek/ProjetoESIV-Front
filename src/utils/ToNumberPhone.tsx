export function formatPhone(ddd: string, phone: string): string {
  const cleanedDDD = ddd.replace(/\D/g, "");
  const cleanedPhone = phone.replace(/\D/g, "");
  const fullNumber = cleanedDDD + cleanedPhone;

  if (fullNumber.length === 10) {
    return fullNumber.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  } else if (fullNumber.length === 11) {
    return fullNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }

  return fullNumber;
}
