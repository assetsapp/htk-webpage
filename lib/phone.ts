/**
 * Validación de teléfono compartida entre el formulario y /api/leads.
 * Acepta separadores comunes (espacios, guiones, paréntesis, punto) y un
 * prefijo internacional opcional. Exige 10 dígitos (formato nacional MX)
 * y tolera hasta 15, el máximo de E.164 con lada de país.
 */
export function isValidPhone(value: string | undefined | null): boolean {
  if (!value) return false;
  if (/[^\d\s+().-]/.test(value)) return false;
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}
