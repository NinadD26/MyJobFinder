import API_BASE_URL from "../config/config";

export const uploadCV = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/cv/upload-cv`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return await response.json();
};