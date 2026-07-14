import { api } from "./api.service";

export const originService = {
  getAll:  (params = {}) => api.get(`/origins?${new URLSearchParams(params)}`),
  getById: (id)          => api.get(`/origins/${id}`),
};
