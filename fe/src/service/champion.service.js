import { api } from "./api.service";

export const championService = {
  getAll:   (params = {}) => api.get(`/champions?${new URLSearchParams(params)}`),
  getById:  (id)          => api.get(`/champions/${id}`),
};
