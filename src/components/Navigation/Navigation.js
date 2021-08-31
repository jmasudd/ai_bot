import React from "react";

const Navigation = ({ rchange, isdn }) => {
  if (isdn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          className="f3 link dim black underline pa3 pointer"
          onClick={() => rchange("signin")}
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          className="f3 link dim black underline pa3 pointer"
          onClick={() => rchange("signin")}
        >
          Sign In
        </p>
        <p
          className="f3 link dim black underline pa3 pointer"
          onClick={() => rchange("register")}
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
