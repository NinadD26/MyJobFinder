export default function JobCard({
  job,
  onAnalyze,
  onOptimize
}) {

  const getMatchBadge = (
    score
  ) => {

    if (score >= 70) {
      return (
        <span className="text-green-600 font-bold">
          🔥 {score}% Match
        </span>
      );
    }

    if (score >= 40) {
      return (
        <span className="text-yellow-600 font-bold">
          🟡 {score}% Match
        </span>
      );
    }

    return (
      <span className="text-red-600 font-bold">
        🔴 {score}% Match
      </span>
    );
  };

  return (

    <div
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
        {getMatchBadge(
          job.match_score
        )}
      </div>

      <div className="mt-4">

        <p className="font-semibold">
          Matched Skills
        </p>

        <p className="text-sm text-green-700">

          {job.matched_skills?.length > 0
            ? job.matched_skills.join(", ")
            : "No strong matches found"}

        </p>

      </div>

      <div className="mt-4">

        <p className="font-semibold">
          Missing Skills
        </p>

        <p className="text-sm text-red-600">

          {job.missing_skills?.length > 0
            ? job.missing_skills
                .slice(0, 5)
                .join(", ")
            : "None"}

        </p>

      </div>

      <div className="mt-4">

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

      <div className="mt-4 flex gap-2 flex-wrap">

        <a
          href={job.redirect_url}
          target="_blank"
          rel="noreferrer"
          className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded
          "
        >
          View Job
        </a>

        <button
          onClick={() =>
            onAnalyze(job)
          }
          className="
            bg-green-600
            text-white
            px-4
            py-2
            rounded
          "
        >
          Analyze Match
        </button>

        <button
          onClick={() =>
            onOptimize(job)
          }
          className="
            bg-purple-600
            text-white
            px-4
            py-2
            rounded
          "
        >
          Improve Resume
        </button>

      </div>

    </div>

  );
}