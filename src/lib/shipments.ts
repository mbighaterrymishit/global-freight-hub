export const STATUSES = [
  "shipment_created",
  "picked_up",
  "in_transit",
  "out_for_delivery",
  "delivered",
] as const;

export const SERVICE_TYPES = ["air", "sea", "road"] as const;

export const PAYMENT_MODES = ["cash", "bank_transfer", "credit_card", "paypal", "wire", "cod"] as const;

export function genTrackingNumber() {
  const n = Math.floor(10000000 + Math.random() * 89999999);
  return `ICD-${n}`;
}

export function statusLabel(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
