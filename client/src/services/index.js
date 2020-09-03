import axios from "axios";

const apiAuthenticationService = axios.create({
  baseURL: "/api"
});

export const listTeachers = async () =>
  await apiAuthenticationService.get(`/teachers`);

export const loadTeacher = async teacherId =>
  await apiAuthenticationService.get(`/teachers/${teacherId}/view`);
