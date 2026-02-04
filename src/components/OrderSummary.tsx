import { useCart } from "../hooks/CartHook";
import "../styles/OrderSummary.css";

interface OrderSummaryProps {
    buttonText: string;
    onButtonClick?: () => void;
    buttonType?: "button" | "submit";
}

function OrderSummary({ buttonText, onButtonClick, buttonType = "button" }: OrderSummaryProps) {
    const shipping = 5.0;
    const { getCartTotal } = useCart();
    const { cart } = useCart();

    return (
        <div className="order-summary">
            <h2>Order Summary</h2>

            <div className="summary-items">
                {cart.length === 0 ? (
                    <p className="empty-message">Your cart is empty</p>
                ) : (
                    <>
                        <div className="summary-breakdown">
                            <div className="summary-row">
                                <span>Subtotal:</span>
                                <span>${getCartTotal().toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping:</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax:</span>
                                <span>${(getCartTotal() * 0.04).toFixed(2)}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total:</span>
                                <span>${(getCartTotal() + shipping + getCartTotal() * 0.04).toFixed(2)}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <button
                type={buttonType}
                className="order-summary-btn"
                onClick={onButtonClick}
                disabled={cart.length === 0}
            >
                {buttonText}
            </button>
        </div>
    )
}

export default OrderSummary;