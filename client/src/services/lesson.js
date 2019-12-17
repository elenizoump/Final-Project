import axios from "axios";

const apiService = axios.create({
  // Before proxying
  // baseURL: 'http://localhost:3020/api'
  // After proxying
  // baseURL: 'http://localhost:3000/api'
  baseURL: "http://localhost:5000/lesson",
  withCredentials: true
});

export const listLessons = async () => await apiService.get("/viewAllLessons");

export const loadLesson = async id => await apiService.get(`/lesson/${id}`);

export const editLesson = async (id, lesson) => {
  try {
    await apiService.patch(`/${id}`, lesson);
  } catch (error) {
    throw error;
  }
};

export const addComment = async (id, comment) => {
  try {
  await apiService.patch(`/comments/${id}`, comment);
  } catch (error) {
    throw error;
  }
};

export const removeLesson = async id => {
  try {
    await apiService.delete(`/${id}`);
  } catch (error) {
    throw error;
  }
};

export const createLesson = async lesson =>
  await apiService.post(`/create`, lesson);
