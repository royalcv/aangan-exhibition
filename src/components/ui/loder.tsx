import React from "react";
import aanganLogo from "@/assets/aangan-logo.png"; // make sure the path is correct

const Loader: React.FC = () => {
  const loaderContainerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  const loaderStyle: React.CSSProperties = {
    border: "8px solid #f3f3f3",
    borderTop: "8px solid #3498db",
    borderRadius: "50%",
    width: "80px",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "spin 1s linear infinite",
  };

  const logoStyle: React.CSSProperties = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "contain",
  };

  return (
    <div style={loaderContainerStyle}>
      <div style={loaderStyle}>
        <img src={aanganLogo} alt="Aangan Logo" style={logoStyle} />
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
