import { useState } from "react";
import { uploadCV } from "../services/cvService";

function UploadCV() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a PDF file");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const result = await uploadCV(selectedFile);

      console.log(result);

      setMessage("Resume uploaded successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">

        <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
          MyJobFinder
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Upload your resume and build your professional profile
        </p>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center">

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="mb-4"
          />

          <p className="text-gray-500">
            Supported format: PDF
          </p>

          {selectedFile && (
            <div className="mt-4">
              <p className="text-green-600 font-semibold">
                Selected:
              </p>
              <p>{selectedFile.name}</p>
            </div>
          )}

        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg disabled:bg-gray-400"
        >
          {loading ? "Uploading..." : "Upload CV"}
        </button>

        {message && (
          <div className="mt-4 text-center font-semibold">
            {message}
          </div>
        )}

      </div>
    </div>
  );
}

export default UploadCV;