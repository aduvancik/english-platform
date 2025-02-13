import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link
        to="/"
        className="text-3xl font-bold mb-4"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        enGo
      </Link>
    </div>
  );
};

export default Logo;
