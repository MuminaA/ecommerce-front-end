import { useCart } from "../hooks/CartHook";
import "../styles/Cart.css";
import { Link } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";
import type { CartItem } from "../context/CartContextType";

function Cart() {
    const { cart, removeFromCart, updateQuantity } = useCart();

    if (cart.length === 0) {
        return (
            <div className="cart-page">
                <div className="cart-container">
                    <Link to="/" className="cart-back-link">
                        ← Back to Shop
                    </Link>
                    <div className="empty-cart">
                        <h2>Your cart is empty</h2>
                        <p>Add some beautiful artwork to get started!</p>
                        <Link to="/" className="continue-shopping-btn">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    function handleProceedToCheckout(): void {
        const checkoutUrl = "/checkout";
        window.location.href = checkoutUrl; // Redirect to checkout page
    }

    return (
        <div className="cart-page">
            <Link to="/" className="cart-back-link">
                ← Back to Shop
            </Link>
            <h1 className="cart-title">Shopping Cart</h1>

            <div className="cart-content">
                {/* Cart Items */}
                <div className="cart-items-section">
                    {cart.map((item: CartItem) => (
                        <div key={item.product.id} className="cart-item-card">
                            <div className="item-image-wrapper">
                                <img
                                    src={item.product.imageUrl}
                                    alt={item.product.name}
                                    className="item-image"
                                />
                            </div>

                            <div className="item-details-wrapper">
                                <h3 className="item-name">{item.product.name}</h3>
                                <p className="item-category">{item.product.category}, {item.product.size}</p>
                                <p className="item-price">${item.product.price.toFixed(2)}</p>
                            </div>

                            <div className="item-controls">
                                <div className="item-quantity">
                                    <button
                                        className="qty-btn"
                                        onClick={() =>
                                            updateQuantity(item.product.id, item.quantity - 1)
                                        }
                                    >
                                        −
                                    </button>
                                    <span className="qty-value">{item.quantity}</span>
                                    <button
                                        className="qty-btn"
                                        onClick={() =>
                                            updateQuantity(item.product.id, item.quantity + 1)
                                        }
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    className="item-remove"
                                    onClick={() => removeFromCart(item.product.id)}
                                    aria-label="Remove item"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary Sidebar */}
                <aside className="order-summary-sidebar">
                    <OrderSummary
                        buttonText="Proceed to Checkout"
                        onButtonClick={handleProceedToCheckout}
                    />
                </aside>
            </div>
        </div>
    );
}

export default Cart;