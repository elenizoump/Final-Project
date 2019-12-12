import axios from "axios";

const apiAuthenticationService = axios.create({
  baseURL: "/api/authentication"
});

export const signIn = async data => {
  try {
    const response = await apiAuthenticationService.post(`/sign-in`, data);
    return response.data.user;
  } catch (error) {
    throw error;
  }
};

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

export const signOut = async () => {
  try {
    await apiAuthenticationService.post(`/sign-out`);
  } catch (error) {
    throw error;
  }
};

export const load = async id => {
  try {
    const response = await apiAuthenticationService.get(`/${id}`);
    const user = response.data.user;
    return user;
  } catch (error) {
    throw error;
  }
};
