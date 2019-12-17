import axios from 'axios';

const apiAuthenticationService = axios.create({
  baseURL: "http://localhost:5000/homework",
  withCredentials: true
});


export const list = async () => {
  try {
    const response = await apiAuthenticationService.get('/homeworkList');
    const homeworks = response.data.homeworks;
    return homeworks;
  } catch (error) {
    throw error;
  }
};


export const edit = async (id, homework) => {
  try {
    await apiAuthenticationService.patch(`/${id}/edit`, homework);
  } catch (error) {
    throw error;
  }
};

export const create = async homework => {
  const data = new FormData();
  data.append('content', homework.content);
  data.append('image', homework.image);
  try {
    console.log(data)
    const response = await apiAuthenticationService.post(`/homework`, data);
    return response.data.homework;
  } catch (error) {
    console.log(error)
    throw error;
  }
};