import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function Admin() {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:5000/admin/verify-admin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
            });

            const data = await response.json();

            if (data.isAdmin) {
                // Store username in sessionStorage
                sessionStorage.setItem("adminUser", username);
                // Redirect to admin dashboard
                navigate("/admin/dashboard");
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
        <div className="admin-login">
            <div className="admin-header">
                <h2>Admin Access</h2>
                <p>Enter admin username</p>
            </div>
            <section className="admin-form">
                <form onSubmit={handleLogin}>
                    <div className="username-input">
                        <label htmlFor="username">Admin Username:</label>
                        <input
                            type="text"
                            placeholder="Enter admin username..."
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Verifying..." : "Access Dashboard"}
                    </button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </section>
        </div>
    );
}

export default Admin;
