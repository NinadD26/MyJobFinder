import axios from "axios";
import API_BASE_URL from "../config/config";

export const getLatestProfile = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/cv/latest-profile`
  );

  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await axios.put(
    `${API_BASE_URL}/cv/update-profile`,
    profileData
  );

  return response.data;
};