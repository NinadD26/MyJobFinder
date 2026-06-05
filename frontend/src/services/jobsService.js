import axios from "axios";
import API_BASE_URL from "../config/config";

export const getJobs = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/jobs/recommendations`
  );

  return response.data;
};