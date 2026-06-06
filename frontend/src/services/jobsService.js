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

export const analyzeMatch = async (
  job
) => {

  const response = await axios.post(
    `${API_BASE_URL}/jobs/analyze`,
    job
  );

  return response.data;
};

export const optimizeResume = async (
  job
) => {

  const response = await axios.post(
    `${API_BASE_URL}/jobs/optimize-resume`,
    job
  );

  return response.data;
};