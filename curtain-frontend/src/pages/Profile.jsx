import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Profile.css";

const API_URL = "http://localhost:5000/api/auth";

function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                // No token means the user is not authenticated
                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await fetch(`${API_URL}/profile`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load profile"
                    );
                }

                setProfile(data.user);
            } catch (error) {
                console.error("Profile error:", error);

                setError(error.message);

                // If token is invalid or expired,
                // log the user out and return to login
                if (
                    error.message.includes("Not authorized") ||
                    error.message.includes("token") ||
                    error.message.includes("Token")
                ) {
                    logout();
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate, logout]);

    // Loading state
    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-container">
                    <h2>Loading Profile...</h2>
                    <p>Please wait while we retrieve your profile.</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error && !profile) {
        return (
            <div className="profile-page">
                <div className="profile-container">
                    <h2>Unable to Load Profile</h2>
                    <p>{error}</p>

                    <button onClick={() => navigate("/login")}>
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-container">

                <div className="profile-header">
                    <h1>My Profile</h1>
                    <p>Manage your Elegant Curtains account.</p>
                </div>

                <div className="profile-card">

                    <div className="profile-avatar">
                        {profile?.name
                            ? profile.name.charAt(0).toUpperCase()
                            : "U"}
                    </div>

                    <div className="profile-info">

                        <div className="profile-field">
                            <span className="profile-label">
                                Full Name
                            </span>

                            <span className="profile-value">
                                {profile?.name || user?.name || "N/A"}
                            </span>
                        </div>

                        <div className="profile-field">
                            <span className="profile-label">
                                Email Address
                            </span>

                            <span className="profile-value">
                                {profile?.email || user?.email || "N/A"}
                            </span>
                        </div>

                        <div className="profile-field">
                            <span className="profile-label">
                                Account ID
                            </span>

                            <span className="profile-value">
                                {profile?._id || "N/A"}
                            </span>
                        </div>

                        <div className="profile-field">
                            <span className="profile-label">
                                Account Created
                            </span>

                            <span className="profile-value">
                                {profile?.createdAt
                                    ? new Date(
                                          profile.createdAt
                                      ).toLocaleDateString()
                                    : "N/A"}
                            </span>
                        </div>

                    </div>

                </div>

                <div className="profile-actions">

                    <button
                        className="profile-button"
                        onClick={() => navigate("/orders")}
                    >
                        My Orders
                    </button>

                    <button
                        className="profile-button logout-button"
                        onClick={() => {
                            logout();
                            navigate("/login");
                        }}
                    >
                        Logout
                    </button>

                </div>

            </div>
        </div>
    );
}

export default Profile;