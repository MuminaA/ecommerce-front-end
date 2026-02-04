import { useCart } from "../hooks/CartHook";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    return (
        <header className="homepage-header">
            <div className="header-wrapper">
                <Link to="/" className="header-logo">
                    Palette 🎨
                </Link>
                <nav className="header-nav">
                    <button className="header-cart-btn">
                        {cartCount > 0 && (
                            <Link to="/cart">Cart ({cartCount})</Link>
                        )} {cartCount === 0 && (
                            <Link to="/cart">Cart</Link>
                        )}
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;