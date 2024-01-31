import axios from "axios";

const request = axios.create({
    baseURL: "https://crowpilot.onrender.com/api",
  });

export const getAllPhotos = async () => {
    try {
      const response = await request.get(`/photos`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

export const getUser = async (username) => {
  try {
    const response = await request.get(`/users/${username}`)
    return response.data;
  } catch(err) {
    console.log(err)
  }
}

export const getUserPhotos = async (username) => {
  try {
    const response = await request.get(`/photos/${username}`)
    return response.data;
  } catch (err) {
    console.log(err)
  }
}
  