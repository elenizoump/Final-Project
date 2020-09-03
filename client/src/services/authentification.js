import axios from "axios";

const apiAuthenticationService = axios.create({
  baseURL: "/api/auth"
 
});


export const signUp = async data => {
  try {
    const response = await apiAuthenticationService.post(`/sign-up`, data);
    return response.data.user;
  } catch (error) {
    throw error;
  }
};

export const signUpTeacher = async data => {
  try {
    const response = await apiAuthenticationService.post(
      `/sign-up-teacher`,
      data
    );
    return response.data.user;
  } catch (error) {
    throw error;
  }
};


export const load = async id => {
  try {
    const response = await apiAuthenticationService.get(`/student/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateUser = async data =>
  await apiAuthenticationService.patch(`/user`, data);

export const loadUser = async () => await apiAuthenticationService.get(`/user`);

export const signOutUser = async () =>
  await apiAuthenticationService.post(`/sign-out`);

export const signInUser = async data =>
  await apiAuthenticationService.post(`/sign-in`, data);

export const signUpUser = async data =>
  await apiAuthenticationService.post(`/sign-up`, data);

//loading teacher
export const teacher = async id => {
  try {
    const response = await apiAuthenticationService.get(`/teacher/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//loading teachers
export const teacherList = async () => {
  try {
    const response = await apiAuthenticationService.get("teacher/list");
    console.log(response);
    const lessons = response.data.lessons;
    return lessons;
  } catch (error) {
    throw error;
  }
};
