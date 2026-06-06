import { useEffect, useState } from "react";
import { getJobs } from "../services/jobsService";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] =
    useState("Remote");

  useEffect(() => {
    loadJobs();
  }, [location]);

  const loadJobs = async () => {
    try {
      setLoading(true);

      const data = await getJobs(
        location
      );

      console.log("Jobs:", data);

      setJobs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        Recommended Jobs
      </h1>

      {/* Location Filter */}

      <div className="mb-6">

        <label className="block mb-2 font-medium">
          Location
        </label>

        <select
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          className="
            border
            rounded
            p-2
          "
        >
          <option value="Remote">
            Remote
          </option>

          <option value="Mumbai">
            Mumbai
          </option>

          <option value="Pune">
            Pune
          </option>

          <option value="Kolhapur">
            Kolhapur
          </option>

        </select>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {jobs.map((job, index) => (

          <div
            key={index}
            className="
              bg-white
              rounded-xl
              shadow-md
              p-6
            "
          >

            <h2 className="text-xl font-bold mb-2">
              {job.title}
            </h2>

            <p className="text-gray-700">
              {job.company}
            </p>

            <p className="text-gray-600">
              {job.location}
            </p>

            <div className="mt-3">

              <p>
                Min Salary:
                {" "}
                {job.salary_min
                  ? `₹${job.salary_min}`
                  : "Not Available"}
              </p>

              <p>
                Max Salary:
                {" "}
                {job.salary_max
                  ? `₹${job.salary_max}`
                  : "Not Available"}
              </p>

            </div>

            <a
              href={job.redirect_url}
              target="_blank"
              rel="noreferrer"
              className="
                inline-block
                mt-4
                bg-blue-600
                text-white
                px-4
                py-2
                rounded
                hover:bg-blue-700
              "
            >
              View Job
            </a>

          </div>

        ))}

      </div>

    </div>
  );
}