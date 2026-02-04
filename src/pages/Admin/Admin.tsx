import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Admin.css";
import API_BASE_URL from "../../config";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Admin() {
    const [username, setUsername] = useState("");
    const [showUsername, setShowUsername] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${API_BASE_URL}/admin/verify-admin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
            });

            const data = await response.json();

            if (data.isAdmin) {
                // Store username in sessionStorage
                sessionStorage.setItem("adminUser", username);
                // Redirect to admin dashboard
                navigate("/admin/products");
            } else {
                setError("Access denied. Admin privileges required.");
            }
        } catch (err) {
            console.error("Admin verification error:", err);
            setError("Failed to verify admin access");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-box">
                <div className="login-header">
                    <h1 className="login-title">Admin Access</h1>
                    <p className="login-subtitle">Enter admin username</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            Admin Username
                        </label>
                        <div className="input-with-toggle">
                            <input
                                type={showUsername ? "text" : "password"}
                                id="username"
                                placeholder="Enter admin username..."
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-input"
                                required
                                disabled={loading}
                                autoComplete="username"
                            />
                            <button
                                type="button"
                                className="toggle-visibility"
                                onClick={() => setShowUsername((prev) => !prev)}
                                aria-label={showUsername ? "Show username" : "Hide username"}
                                aria-pressed={showUsername}
                                disabled={loading}
                            >
                                {showUsername ? <FaEye /> : <FaEyeSlash /> }
                            </button>
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? "Verifying..." : "Access Dashboard"}
                    </button>
                </form>

                <div className="login-footer">
                    <Link to="/" className="back-to-home">
                        ← Back to Home
                    </Link>
                </div>
            </div>

            <div className="login-background"></div>
        </div>
    );
}

export default Admin;
