import axios from "axios";

const apiService = axios.create({
  // Before proxying
  // baseURL: 'http://localhost:3020/api'
  // After proxying
  // baseURL: 'http://localhost:3000/api'
  baseURL: "http://localhost:5000/lesson"
});

export const listLessons = async () => {
  try {
    const response = await apiService.get("/viewAllLessons");
    console.log(response);
    const lessons = response.data.lessons;
    return lessons;
  } catch (error) {
    throw error;
  }
};

export const listTeachers = async () => {
  try {
    const response = await apiService.get(`/selectTeacher`);
    console.log("What is the respomse???", response);
    const users = response.data.users;
    return users;
  } catch (error) {
    console.log("What is the respomse???", error);

    throw error;
  }
};

export const loadLesson = async id => {
  try {
    const response = await apiService.get(`/${id}`);
    const lesson = response.data.lesson;
    return lesson;
  } catch (error) {
    throw error;
  }
};

export const editLesson = async (id, lesson) => {
  try {
    await apiService.patch(`/${id}`, lesson);
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

export const createLesson = async lesson => {
  try {
    const response = await apiService.post(`/create`, lesson);
    console.log("SERVICE: ", response);
    return response.data.lesson;
  } catch (error) {
    throw error;
  }
};
