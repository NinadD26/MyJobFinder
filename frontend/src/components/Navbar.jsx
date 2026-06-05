import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4">

      <div className="flex gap-6">

        <Link to="/">
          Upload CV
        </Link>

        <Link to="/profile">
          Profile
        </Link>

        <Link to="/resume">
          Resume
        </Link>

        <Link to="/jobs">
          Jobs
        </Link>

      </div>

    </nav>
  );
}