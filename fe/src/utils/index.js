export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

export const formatCurrency = (amount, locale = "vi-VN", currency = "VND") => {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
};

export const truncate = (str, length = 100) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export const getInitials = (name) => {
  if (!name) return "";
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
};
