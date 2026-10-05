import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "../styles/Auth.css";

function Login() {

    // =====================================================
    // AUTH
    // =====================================================

    const { login } = useAuth();

    // =====================================================
    // NAVIGATION
    // =====================================================

    const navigate = useNavigate();

    // =====================================================
    // FORM STATE
    // =====================================================

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // =====================================================
    // PASSWORD VISIBILITY
    // =====================================================

    const [showPassword, setShowPassword] = useState(false);

    // =====================================================
    // UI STATE
    // =====================================================

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // =====================================================
    // HANDLE LOGIN
    // =====================================================

    async function handleSubmit(e) {

        e.preventDefault();

        // Clear previous error

        setError("");

        // Validate fields

        if (!email.trim() || !password) {

            setError(
                "Please fill in all fields."
            );

            return;
        }

        try {

            // Start loading

            setLoading(true);

            // Send login request to backend

            const result = await login(
                email.trim(),
                password
            );

            // Check whether backend login succeeded

            if (result.success) {

                navigate("/profile");

            } else {

                setError(
                    result.message ||
                    "Invalid email or password."
                );
            }

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            setError(
                error.message ||
                "Unable to login. Please try again."
            );

        } finally {

            // Stop loading

            setLoading(false);
        }
    }

    // =====================================================
    // PAGE
    // =====================================================

    return (

        <div className="auth-container">

            <div className="auth-card">

                {/* =================================================
                    HEADER
                ================================================= */}

                <h1>
                    Welcome Back
                </h1>

                <p className="subtitle">
                    Login to continue shopping.
                </p>

                {/* =================================================
                    ERROR MESSAGE
                ================================================= */}

                {error && (

                    <div className="error">
                        {error}
                    </div>

                )}

                {/* =================================================
                    LOGIN FORM
                ================================================= */}

                <form onSubmit={handleSubmit}>

                    {/* =================================================
                        EMAIL
                    ================================================= */}

                    <div className="form-group">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            disabled={loading}
                            autoComplete="email"
                        />

                    </div>

                    {/* =================================================
                        PASSWORD
                    ================================================= */}

                    <div className="form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="password-box">

                            <input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                disabled={loading}
                                autoComplete="current-password"
                            />

                            <button
                                type="button"
                                className="eye-btn"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >

                                {showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}

                            </button>

                        </div>

                    </div>

                    {/* =================================================
                        FORGOT PASSWORD
                    ================================================= */}

                    <div
                        style={{
                            textAlign: "right",
                            marginBottom: "20px",
                        }}
                    >

                        <Link to="/forgot-password">
                            Forgot Password?
                        </Link>

                    </div>

                    {/* =================================================
                        LOGIN BUTTON
                    ================================================= */}

                    <button
                        className="auth-btn"
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"}

                    </button>

                </form>

                {/* =================================================
                    REGISTER LINK
                ================================================= */}

                <p className="auth-link">

                    Don't have an account?

                    {" "}

                    <Link to="/register">
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;