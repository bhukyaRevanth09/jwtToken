
import React from "react";
import { useNavigate, useRouteError, isRouteErrorResponse } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();

  let statusCode = "404";
  let title = "Page Not Found";
  let message = "The page you are looking for doesn't exist or may have been moved.";

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;

    if (error.status === 404) {
      title = "Page Not Found";
      message = "The page you are looking for doesn't exist.";
    } else {
      title = "Something Went Wrong";
      message = error.statusText || "An unexpected error occurred.";
    }
  }

  return (
    <div className="error-page">
      <div className="error-card">

        <div className="error-icon">
          !
        </div>

        <p className="error-code">{statusCode}</p>

        <h1>{title}</h1>

        <p className="error-message">
          {message}
        </p>

        <div className="error-actions">
          <button
            className="home-btn"
            onClick={() => navigate("/home/dashboard")}
          >
            Go to Home
          </button>

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
}

export default ErrorPage;

