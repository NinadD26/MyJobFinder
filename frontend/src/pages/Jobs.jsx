import { useEffect, useState } from "react";

import {
  getJobs,
  analyzeMatch,
  optimizeResume
} from "../services/jobsService";

import JobCard from "../components/JobCard";
import JobAnalysisModal from "../components/JobAnalysisModal";
import ResumeOptimizationModal from "../components/ResumeOptimizationModal";

export default function Jobs() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] =
    useState("Remote");

  const [analyzing, setAnalyzing] =
    useState(false);

  const [optimizing, setOptimizing] =
    useState(false);

  const [analysis, setAnalysis] =
    useState(null);

  const [optimization, setOptimization] =
    useState(null);

  const [showAnalysisModal,
    setShowAnalysisModal] =
    useState(false);

  const [showOptimizationModal,
    setShowOptimizationModal] =
    useState(false);

  useEffect(() => {
    loadJobs(location);
  }, [location]);

  const loadJobs = async (
    selectedLocation
  ) => {

    try {

      setLoading(true);

      const data = await getJobs(
        selectedLocation
      );

      setJobs(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const handleAnalyze = async (
    job
  ) => {

    try {

      setAnalyzing(true);

      const result =
        await analyzeMatch(job);

      setAnalysis(result);

      setShowAnalysisModal(true);

    } catch (error) {

      console.error(
        "Analyze Error:",
        error
      );

    } finally {

      setAnalyzing(false);

    }
  };

  const handleOptimize = async (
    job
  ) => {

    try {

      setOptimizing(true);

      const result =
        await optimizeResume(job);

      setOptimization(result);

      setShowOptimizationModal(true);

    } catch (error) {

      console.error(
        "Optimization Error:",
        error
      );

    } finally {

      setOptimizing(false);

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

      <div className="mb-8">

        <label className="block mb-2 font-medium">
          Location
        </label>

        <select
          value={location}
          onChange={(e) =>
            setLocation(
              e.target.value
            )
          }
          className="
            border
            rounded
            px-3
            py-2
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

      {
        analyzing && (

          <div
            className="
              mb-4
              p-4
              rounded
              bg-yellow-100
            "
          >
            Analyzing job match...
          </div>

        )
      }

      {
        optimizing && (

          <div
            className="
              mb-4
              p-4
              rounded
              bg-purple-100
            "
          >
            Optimizing resume...
          </div>

        )
      }

      <div
        className="
          grid
          md:grid-cols-2
          gap-6
        "
      >

        {jobs.map(
          (
            job,
            index
          ) => (

            <JobCard
              key={index}
              job={job}
              onAnalyze={
                handleAnalyze
              }
              onOptimize={
                handleOptimize
              }
            />

          )
        )}

      </div>

      {
        showAnalysisModal &&
        analysis && (

          <JobAnalysisModal
            analysis={analysis}
            onClose={() =>
              setShowAnalysisModal(
                false
              )
            }
          />

        )
      }

      {
        showOptimizationModal &&
        optimization && (

          <ResumeOptimizationModal
            optimization={
              optimization
            }
            onClose={() =>
              setShowOptimizationModal(
                false
              )
            }
          />

        )
      }

    </div>

  );
}