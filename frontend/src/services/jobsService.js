import axios from "axios";
import API_BASE_URL from "../config/config";

export const getJobs = async (
  location = "Remote"
) => {

  const response = await axios.get(
    `${API_BASE_URL}/jobs/recommendations`,
    {
      params: {
        location,
      },
    }
  );

  return response.data;
};