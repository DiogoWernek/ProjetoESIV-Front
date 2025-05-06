export function toCNPJorCPF(value: string = ""): string {
  if (!value) return "";

  const cleaned = value.replace(/\D/g, "");

  if (cleaned.length === 11) {
    return cleaned.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
      "$1.$2.$3-$4"
    );
  } else if (cleaned.length === 14) {
    return cleaned.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
  }

  return cleaned;
}
