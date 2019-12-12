import axios from "axios";

const apiService = axios.create({
  // Before proxying
  // baseURL: 'http://localhost:3020/api'
  // After proxying
  // baseURL: 'http://localhost:3000/api'
  baseURL: "/lesson"
});

export const list = async () => {
  try {
    const response = await apiService.get("/list");
    const lessons = response.data.lessons;
    return lessons;
  } catch (error) {
    throw error;
  }
};

export const load = async id => {
  try {
    const response = await apiService.get(`/${id}`);
    const lesson = response.data.lesson;
    return lesson;
  } catch (error) {
    throw error;
  }
};

export const edit = async (id, lesson) => {
  try {
    await apiService.patch(`/${id}`, lesson);
  } catch (error) {
    throw error;
  }
};

export const remove = async id => {
  try {
    await apiService.delete(`/${id}`);
  } catch (error) {
    throw error;
  }
};

export const create = async lesson => {
  try {
    const response = await apiService.post(`/create`, data);
    return response.data.lesson;
  } catch (error) {
    throw error;
  }
};
