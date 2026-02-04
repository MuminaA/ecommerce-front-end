import { Link, useLocation } from "react-router-dom";
import "../styles/OrderConfirmation.css";
import type { OrderDetails } from "../types/OrderDetails";

export default function OrderConfirmation() {
    const location = useLocation();
    const orderDetails: OrderDetails | null = location.state?.orderDetails || null;

    if (!orderDetails) {
        return (
            <div className="confirmation-container">
                <div className="confirmation-wrapper">
                    <div className="confirmation-empty">
                        <h1>No Order Found</h1>
                        <p>Please complete checkout to see your order confirmation.</p>
                        <Link to="/checkout" className="confirmation-btn">
                            Go to Checkout
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="confirmation-container">
            <div className="confirmation-wrapper">
                {/* Header */}
                <div className="confirmation-header">
                    <Link to="/" className="confirmation-back-link">
                        ← Back to Shop
                    </Link>
                    <h1 className="confirmation-title">Order Confirmed!</h1>
                    <p className="confirmation-subtitle">
                        Thank you for your purchase. We've sent a confirmation email.
                    </p>
                </div>

                <div className="confirmation-content">
                    {/* Success Card */}
                    <div className="confirmation-success-card">
                        <div className="success-icon">✓</div>
                        <h2 className="success-title">Order Successful</h2>
                        <p className="order-number">Order #{orderDetails.orderNumber}</p>
                        <p className="order-date">{orderDetails.date}</p>
                    </div>

                    {/* Main Grid */}
                    <div className="confirmation-grid">
                        {/* Left Column - Shipping & Contact Info */}
                        <div className="confirmation-left">
                            {/* Shipping Address */}
                            <div className="confirmation-card">
                                <h3 className="confirmation-card-title">Shipping Address</h3>
                                <div className="confirmation-card-content">
                                    <p className="shipping-name">
                                        {orderDetails.firstName} {orderDetails.lastName}
                                    </p>
                                    <p className="shipping-address">{orderDetails.address}</p>
                                    <p className="shipping-address">
                                        {orderDetails.city}, {orderDetails.state} {orderDetails.zip}
                                    </p>
                                    <p className="shipping-email">Email: {orderDetails.email}</p>
                                    <p className="shipping-estimate">
                                        Estimated Delivery: 5-7 Business Days
                                    </p>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="confirmation-card">
                                <h3 className="confirmation-card-title">Payment Method</h3>
                                <div className="confirmation-card-content">
                                    <p className="payment-method">Manual Fulfillment</p>
                                    <p className="payment-note">
                                        No payment processing - order saved for manual fulfillment
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="confirmation-right">
                            <div className="confirmation-summary">
                                <h3 className="confirmation-summary-title">Order Summary</h3>

                                {/* Items */}
                                <div className="confirmation-items">
                                    {orderDetails.items.map((item) => (
                                        <div key={item.id} className="confirmation-item">
                                            <div className="confirmation-item-details">
                                                <p className="confirmation-item-name">{item.name}</p>
                                                <p className="confirmation-item-qty">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <p className="confirmation-item-price">
                                                ${item.price.toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Breakdown */}
                                <div className="confirmation-breakdown">
                                    <div className="confirmation-breakdown-row">
                                        <p className="confirmation-breakdown-label">Subtotal:</p>
                                        <p className="confirmation-breakdown-value">
                                            ${orderDetails.subtotal.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="confirmation-breakdown-row">
                                        <p className="confirmation-breakdown-label">Shipping:</p>
                                        <p className="confirmation-breakdown-value">
                                            ${orderDetails.shipping.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="confirmation-breakdown-row">
                                        <p className="confirmation-breakdown-label">Tax:</p>
                                        <p className="confirmation-breakdown-value">
                                            ${orderDetails.tax.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="confirmation-total-row">
                                        <p>Total:</p>
                                        <p>${orderDetails.total.toFixed(2)}</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="confirmation-actions">
                                    <Link to="/" className="confirmation-btn confirmation-btn-primary">
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}