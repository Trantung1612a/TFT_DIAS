const BASE_URL = import.meta.env.VITE_API_URL || "/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

export const api = {
  get: (path) => fetch(`${BASE_URL}${path}`, { headers: getHeaders() }).then(handleResponse),
  post: (path, body) =>
    fetch(`${BASE_URL}${path}`, { method: "POST", headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
  put: (path, body) =>
    fetch(`${BASE_URL}${path}`, { method: "PUT", headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
  patch: (path, body) =>
    fetch(`${BASE_URL}${path}`, { method: "PATCH", headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
  delete: (path) =>
    fetch(`${BASE_URL}${path}`, { method: "DELETE", headers: getHeaders() }).then(handleResponse),
};
