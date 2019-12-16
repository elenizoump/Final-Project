// import axios from "axios";

// const apiService = axios.create({
//   // Before proxying
//   // baseURL: 'http://localhost:3020/api'
//   // After proxying
//   // baseURL: 'http://localhost:3000/api'
//   baseURL: "http://localhost:5000"
// });
// export const listTeachers = async () => {
//   try {
//     const response = await apiService.get(`/selectTeacher`);
//     console.log("What is the respomse???", response);
//     const users = response.data.users;
//     return users;
//   } catch (error) {
//     console.log("What is the respomse???", error);

//     throw error;
//   }
// };
