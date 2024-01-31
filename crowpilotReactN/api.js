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
  