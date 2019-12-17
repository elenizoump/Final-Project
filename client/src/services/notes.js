import axios from 'axios';

const apiAuthenticationService = axios.create({
  baseURL: "http://localhost:5000/notes",
  withCredentials: true
});


export const list = async () => {
  try {
    const response = await apiAuthenticationService.get('/list');
    const notes = response.data.notes;
    return notes;
  } catch (error) {
    throw error;
  }
};

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

export const create = async note => {
  const data = new FormData();
  data.append('content', note.content);
  data.append('image', note.image);
  try {
    console.log(data)
    const response = await apiAuthenticationService.post(`/create`, data);
    return response.data.note;
  } catch (error) {
    console.log(error)
    throw error;
  }
};