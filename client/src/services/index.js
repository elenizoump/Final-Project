import axios from "axios";

const apiAuthenticationService = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true
});

export const listTeachers = async () =>
  await apiAuthenticationService.get(`/viewAllTeachers`);
