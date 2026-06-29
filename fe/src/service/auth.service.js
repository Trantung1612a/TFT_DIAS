import { api } from "./api.service";

export const authService = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getProfile: () => api.get("/auth/profile"),
  sendOTP: (email) => api.post("/auth/send-otp", { email }),
  verifyOTP: (data) => api.post("/auth/verify-otp", data),
};
