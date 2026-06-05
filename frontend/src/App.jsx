import { BrowserRouter, Routes, Route } from "react-router-dom";

import UploadCV from "./pages/UploadCV";
import Profile from "./pages/Profile";
import Resume from "./pages/Resume";
import Jobs from "./pages/Jobs";
import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<UploadCV />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/resume"
          element={<Resume />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;