export function buildWhatsAppUrl(message: string) {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  if (!phoneNumber) {
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
