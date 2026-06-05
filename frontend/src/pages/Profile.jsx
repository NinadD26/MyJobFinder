import { useEffect, useState } from "react";
import { getLatestProfile } from "../services/profileService";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getLatestProfile();

      console.log("PROFILE DATA:", data);

      setProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!profile) {
    return <div className="p-6">No profile found</div>;
  }

  const parsed = profile.parsed_profile || {};

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">
        Candidate Profile
      </h1>

      <div className="bg-white shadow rounded-lg p-8">

        <div className="mb-6">
          <h3 className="font-semibold text-gray-700">
            Full Name
          </h3>

          <p className="text-lg">
            {parsed.full_name}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-700">
            Current Job Title
          </h3>

          <p className="text-lg">
            {parsed.current_job_title}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-700">
            Years of Experience
          </h3>

          <p className="text-lg">
            {parsed.years_of_experience}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-700">
            Resume Filename
          </h3>

          <p className="text-lg">
            {profile.filename}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-3">
            Technical Skills
          </h3>

          <div className="flex flex-wrap gap-2">

            {parsed.technical_skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}