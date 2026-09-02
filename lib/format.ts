export function formatNumber(value?: number | null, digits = 2): string {
  if (value === null || value === undefined) return "—";
  return value.toLocaleString("ja-JP", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function formatChange(value?: number | null, digits = 2): string {
  if (value === null || value === undefined) return "—";
  const sign = value >= 0 ? "+" : "";
  return `${sign}${formatNumber(value, digits)}`;
}

export function formatPercent(value?: number | null): string {
  if (value === null || value === undefined) return "—";
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function formatPrice(value?: number | null, currency?: string | null): string {
  if (value === null || value === undefined) return "—";
  const symbol = currency === "USD" ? "$" : currency === "JPY" ? "¥" : "";
  return `${symbol}${formatNumber(value, 2)}`;
}

export function formatMarketCap(value?: number | null): string {
  if (value === null || value === undefined) return "—";
  if (value >= 1e12) return `${(value / 1e12).toFixed(2)}兆`;
  if (value >= 1e8) return `${(value / 1e8).toFixed(1)}億`;
  return formatNumber(value, 0);
}

export function changeColorClass(percent?: number | null): string {
  if (percent === null || percent === undefined) return "text-muted";
  return percent >= 0 ? "text-gain" : "text-loss";
}

export function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric", weekday: "short" });
}
