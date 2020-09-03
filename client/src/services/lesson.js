import axios from "axios";

const apiService = axios.create({
  baseURL: "/api/lesson"
  
});

export const listLessons = async () => await apiService.get("/viewAllLessons");

export const loadLesson = async id => await apiService.get(`/lesson/${id}`);

export const updateStatus = async id => await apiService.patch(`/lesson/${id}`);

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
