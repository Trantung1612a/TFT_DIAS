import { api } from "./api.service";

export const classService = {
  getAll:  (params = {}) => api.get(`/classes?${new URLSearchParams(params)}`),
  getById: (id)          => api.get(`/classes/${id}`),
};
