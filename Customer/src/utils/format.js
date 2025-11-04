export function formatCurrency(n) {
  const num = Number(n) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(num);
}

export function parsePrice(p) {
  if (typeof p === "number") return p;
  if (!p) return 0;
  return Number(p.toString().replace(/[^0-9.]/g, "")) || 0;
}
