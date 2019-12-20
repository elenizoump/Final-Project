import axios from "axios";

const apiAuthenticationService = axios.create({
  baseURL: "/api/notes"
  //withCredentials: true
});

export const list = async receiver =>
  await apiAuthenticationService.get(`/list/${receiver}`);

export const load = async id => {
  try {
    const response = await apiAuthenticationService.get(`/${id}`);
    const note = response.data.note;
    return note;
  } catch (error) {
    throw error;
  }
};

export const edit = async (id, note) => {
  try {
    await apiAuthenticationService.patch(`/${id}/edit`, note);
  } catch (error) {
    throw error;
  }
};

export const remove = async id => {
  try {
    await apiAuthenticationService.delete(`/${id}`);
  } catch (error) {
    throw error;
  }
};

export const create = async (note, receiver) => {
  const data = {
    content: note.content,
    receiver
  };
  try {
    const response = await apiAuthenticationService.post(`/create`, data);
    return response.data.note;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
