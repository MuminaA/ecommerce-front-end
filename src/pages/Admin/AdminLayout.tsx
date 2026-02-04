import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/AdminLayout.css";

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="admin-container">
            {/* Top Nav */}
            <nav className="admin-nav">
                <div className="admin-nav-left">
                    <h1 className="admin-title">Pallete - Admin</h1>
                </div>
                <div className="admin-nav-right">
                    <span className="admin-user">Admin: Halima</span>
                    <Link to="/" className="admin-link">
                        Store
                    </Link>
                    <button
                        onClick={() => {
                            sessionStorage.removeItem("adminUser");
                            window.location.href = "/admin";
                        }}
                        className="admin-link logout-btn"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="admin-wrapper">
                {/* Sidebar */}
                <aside className="admin-sidebar">
                    <Link
                        to="/admin/products"
                        className={`sidebar-item ${isActive("/admin/products") ? "active" : ""}`}
                    >
                        <span>📦</span>
                        Products
                    </Link>
                    <Link
                        to="/admin/orders"
                        className={`sidebar-item ${isActive("/admin/orders") ? "active" : ""}`}
                    >
                        <span>📋</span>
                        Orders
                    </Link>
                </aside>

                {/* Main Content */}
                <main className="admin-content">
                    {children}
                </main>
            </div>
        </div>
    );
}