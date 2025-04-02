import axios from "axios";

const createApiInstance = () => {
  return axios.create({
    baseURL: "https://car-rental-api.goit.global/api-docs",
    headers: { "Content-Type": "application/json" },
  });
};

const apiGet = async (endpoint, params = {}) => {
  try {
    const api = createApiInstance();
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    throw new Error(error.message || "API request failed");
  }
};

export { createApiInstance, apiGet };
