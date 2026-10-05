import { Link } from "react-router-dom";

import "../styles/Auth.css";

function ForgotPassword() {
  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>Forgot Password</h1>

        <p className="subtitle">
          Password reset is not implemented in this
          static project.
        </p>

        <div className="info-box">
          Entering an email won't send a reset
          message because this is a frontend-only
          demonstration.
        </div>

        <Link
          className="auth-btn-link"
          to="/login"
        >
          Back to Login
        </Link>

      </div>

    </div>
  );
}

export default ForgotPassword;