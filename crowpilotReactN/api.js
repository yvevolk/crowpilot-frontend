import axios from "axios";
import { Alert } from "react-native";
const request = axios.create({
  baseURL: "https://crowpilot.onrender.com/api",
});

export const getAirportInfo = async (IATAcode) => {
  try {
    const response = await axios.get(`https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/airports-code@public/records?select=coordinates&where=column_1%20%3D%20%22${IATAcode}%22&limit=20`)
    return response
  } catch (err) {
    console.log("Airport not in database", "error :", err)
  }
};
export const getTimeZone = async (lat, long) => {
  try {
    const response = await axios.get(`https://timeapi.io/api/TimeZone/coordinate?latitude=${lat}&longitude=${long}`)
    return response
  } catch (err) {
    console.log(err)
  }
}
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
    const response = await request.get(`/users/${username}/photos`)
    return response.data;
  } catch (err) {
    console.log(err)
  }
}

export const patchUserProfile = async (newInfo, username) => {
  try {
    const response = await request.patch(`/users/${username}`, newInfo)
    return response.data;
  } catch(err) {
    console.log(err)
  }
}

export const postPicture = async (data) => {
  try {
    await request.post("/photos", data)
    Alert.alert("", "Photo has been submitted successfully.", [
      {
        text: "Roger."
      }
    ])
  } catch (err) {
      console.error("Error fetching data: ", err);
      Alert.alert("", `${err}`, [
      {
          text: "Roger."
      }
      ])
  }
}