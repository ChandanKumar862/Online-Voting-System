// Formatter utilities for UI display

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  } catch {
    return dateString;
  }
};

export const formatDateTime = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return dateString;
  }
};

export const formatNumber = (num) => {
  if (num === undefined || num === null) return "0";
  return new Intl.NumberFormat("en-IN").format(num);
};

export const formatPercentage = (value, total) => {
  if (!total || total === 0) return "0%";
  const pct = ((value / total) * 100).toFixed(1);
  return `${pct}%`;
};

export const getStatusBadgeColor = (status) => {
  switch (status?.toLowerCase()) {
    case "ongoing":
    case "active":
      return "bg-emerald-100 text-emerald-800 border-emerald-300";
    case "upcoming":
    case "pending":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "completed":
    case "verified":
    case "approved":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "cancelled":
    case "inactive":
    case "rejected":
      return "bg-rose-100 text-rose-800 border-rose-300";
    default:
      return "bg-slate-100 text-slate-800 border-slate-300";
  }
};
