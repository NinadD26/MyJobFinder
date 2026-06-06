export default function ResumeOptimizationModal({
  optimization,
  onClose
}) {

  if (!optimization) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between">

          <h2 className="text-2xl font-bold">
            Resume Optimization
          </h2>

          <button onClick={onClose}>
            ✕
          </button>

        </div>

        <h3 className="font-bold mt-4">
          ATS Score
        </h3>

        <p>
          {optimization.ats_score}
        </p>

        <h3 className="font-bold mt-4">
          Missing Keywords
        </h3>

        <ul className="list-disc ml-6">
          {optimization.missing_keywords?.map(
            (item, index) => (
              <li key={index}>
                {item}
              </li>
            )
          )}
        </ul>

        <h3 className="font-bold mt-4">
          Optimized Summary
        </h3>

        <p>
          {optimization.optimized_summary}
        </p>

        <h3 className="font-bold mt-4">
          Resume Improvements
        </h3>

        <ul className="list-disc ml-6">
          {optimization.resume_improvements?.map(
            (item, index) => (
              <li key={index}>
                {item}
              </li>
            )
          )}
        </ul>

        <h3 className="font-bold mt-4">
          Interview Focus
        </h3>

        <ul className="list-disc ml-6">
          {optimization.interview_focus?.map(
            (item, index) => (
              <li key={index}>
                {item}
              </li>
            )
          )}
        </ul>

      </div>

    </div>

  );
}