import axios from "axios";

const apiService = axios.create({
  // Before proxying
  // baseURL: 'http://localhost:3020/api'
  // After proxying
  // baseURL: 'http://localhost:3000/api'
  baseURL: "http://localhost:5000/calendar",
  withCredentials: true
});

export const listCalendars = async () =>
  await apiService.get("/viewAllCalendars");

export const loadCalendar = async id => {
  const response = await apiService.get(`/${id}`);
  console.log(response.data);
  return response;
};

export const loadTeacherCalendar = async id =>
  await apiService.get(`/teacher-calendar/${id}`);

export const loadMyCalendar = async () => await apiService.get(`/my-calendar`);

export const editCalendar = async (id, calendar) => {
  try {
    await apiService.patch(`/${id}`, calendar);
  } catch (error) {
    throw error;
  }
};

export const removeCalendar = async id => {
  try {
    await apiService.delete(`/${id}`);
  } catch (error) {
    throw error;
  }
};

export const createCalendar = async calendar => {
  console.log("CALENDAR DAYS ON SERVICE", calendar);
  try {
    const response = await apiService.post(`/create`, { calendar });
    console.log("RESPONSE CALENDAR CREATE", response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};
