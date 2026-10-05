import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "../styles/Auth.css";

function Register() {

    // =====================================================
    // AUTH
    // =====================================================

    const { register } = useAuth();


    // =====================================================
    // NAVIGATION
    // =====================================================

    const navigate = useNavigate();


    // =====================================================
    // FORM STATE
    // =====================================================

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    // =====================================================
    // PASSWORD VISIBILITY
    // =====================================================

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);


    // =====================================================
    // UI STATE
    // =====================================================

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // =====================================================
    // PASSWORD STRENGTH
    // =====================================================

    function getPasswordStrength(password) {

        if (password.length === 0) {
            return "";
        }

        if (password.length < 6) {
            return "Weak";
        }

        if (password.length < 10) {
            return "Medium";
        }

        return "Strong";
    }


    // =====================================================
    // HANDLE REGISTER
    // =====================================================

    async function handleSubmit(e) {

        e.preventDefault();

        // Clear previous error
        setError("");


        // =================================================
        // VALIDATE REQUIRED FIELDS
        // =================================================

        if (
            !name.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {

            setError(
                "Please fill in all fields."
            );

            return;
        }


        // =================================================
        // PASSWORD LENGTH
        // =================================================

        if (password.length < 6) {

            setError(
                "Password must be at least 6 characters."
            );

            return;
        }


        // =================================================
        // CONFIRM PASSWORD
        // =================================================

        if (password !== confirmPassword) {

            setError(
                "Passwords do not match."
            );

            return;
        }


        // =================================================
        // REGISTER WITH BACKEND
        // =================================================

        try {

            setLoading(true);


            await register({

                name: name.trim(),

                email: email.trim(),

                password: password

            });


            // =================================================
            // REGISTRATION SUCCESSFUL
            // =================================================

            navigate("/profile");


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );


            setError(
                error.message ||
                "Registration failed. Please try again."
            );


        } finally {

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
                    Create Account
                </h1>

                <p className="subtitle">
                    Join Elegant Curtains today.
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
                    REGISTER FORM
                ================================================= */}

                <form onSubmit={handleSubmit}>


                    {/* =================================================
                        FULL NAME
                    ================================================= */}

                    <div className="form-group">

                        <label htmlFor="name">
                            Full Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            disabled={loading}
                            autoComplete="name"
                        />

                    </div>


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
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                disabled={loading}
                                autoComplete="new-password"
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


                        {/* =================================================
                            PASSWORD STRENGTH
                        ================================================= */}

                        {password && (

                            <div
                                className={
                                    `password-strength ${getPasswordStrength(
                                        password
                                    ).toLowerCase()}`
                                }
                            >

                                Password Strength:{" "}

                                {getPasswordStrength(
                                    password
                                )}

                            </div>

                        )}

                    </div>


                    {/* =================================================
                        CONFIRM PASSWORD
                    ================================================= */}

                    <div className="form-group">

                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>


                        <div className="password-box">

                            <input
                                id="confirmPassword"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                                disabled={loading}
                                autoComplete="new-password"
                            />


                            <button
                                type="button"
                                className="eye-btn"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide confirm password"
                                        : "Show confirm password"
                                }
                            >

                                {showConfirmPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}

                            </button>

                        </div>

                    </div>


                    {/* =================================================
                        REGISTER BUTTON
                    ================================================= */}

                    <button
                        className="auth-btn"
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Account..."
                            : "Register"
                        }

                    </button>


                </form>


                {/* =================================================
                    LOGIN LINK
                ================================================= */}

                <p className="auth-link">

                    Already have an account?

                    {" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>


            </div>

        </div>

    );
}


export default Register;