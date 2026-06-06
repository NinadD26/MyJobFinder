export default function JobAnalysisModal({
  analysis,
  onClose
}) {

  if (!analysis) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between">

          <h2 className="text-2xl font-bold">
            Job Match Analysis
          </h2>

          <button onClick={onClose}>
            ✕
          </button>

        </div>

        <h3 className="font-bold mt-4">
          Match Score
        </h3>

        <p>{analysis.match_score}%</p>

        <h3 className="font-bold mt-4">
          Strengths
        </h3>

        <ul className="list-disc ml-6">
          {analysis.strengths?.map(
            (item, index) => (
              <li key={index}>
                {item}
              </li>
            )
          )}
        </ul>

        <h3 className="font-bold mt-4">
          Missing Skills
        </h3>

        <ul className="list-disc ml-6">
          {analysis.missing_skills?.map(
            (item, index) => (
              <li key={index}>
                {item}
              </li>
            )
          )}
        </ul>

        <h3 className="font-bold mt-4">
          Recommendations
        </h3>

        <ul className="list-disc ml-6">
          {analysis.recommendations?.map(
            (item, index) => (
              <li key={index}>
                {item}
              </li>
            )
          )}
        </ul>

        <h3 className="font-bold mt-4">
          Interview Tips
        </h3>

        <ul className="list-disc ml-6">
          {analysis.interview_tips?.map(
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