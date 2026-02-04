import { Link } from "react-router-dom";
import "../styles/index.css";

export default function Footer() {
    return (
        <footer className="homepage-footer">
            <div className="footer-wrapper">
                <Link to="/admin" className="footer-link">
                    Admin Access →
                </Link>
            </div>
            <div className="footer-copyright">
        &copy; {new Date().getFullYear()} Palette. All rights reserved.
    </div>
        </footer>
    );
}