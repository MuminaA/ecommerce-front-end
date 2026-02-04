import { useState } from "react";
import OrderSummary from "../components/OrderSummary";
import "../styles/Checkout.css";
import API_BASE_URL from "../config";

import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/CartHook";

function Checkout() {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        shippingAddress: '',
        phoneNumber: '',
        city: '',
        state: '',
        zip: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Check if cart is empty
        if (cart.length === 0) {
            setError('Your cart is empty');
            setLoading(false);
            return;
        }

        // Format cart items for backend
        const orderItems = cart.map(item => ({
            // product: { id: item.product.id },
            productId: item.product.id,
            quantity: item.quantity,
        }));

        const orderData = {
            ...formData,
            orderItems: orderItems,
        };
        try {
            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {

                // Calculate totals
                const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
                const shipping = 5.0; // Flat rate shipping
                const tax = parseFloat((subtotal * 0.04).toFixed(2));
                const total = parseFloat((subtotal + shipping + tax).toFixed(2));

                clearCart(); // Clear cart after successful order
                navigate("/order-confirmation", {
                    state: {
                        orderDetails: {
                            orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
                            email: formData.customerEmail,
                            firstName: formData.customerName.split(' ')[0],
                            lastName: formData.customerName.split(' ')[1] || '',
                            address: formData.shippingAddress,
                            city: formData.city,
                            state: formData.state,
                            zip: formData.zip,
                            items: cart.map(item => ({
                                id: item.product.id,
                                name: item.product.name,
                                price: item.product.price,
                                quantity: item.quantity
                            })),
                            subtotal: parseFloat(subtotal.toFixed(2)),
                            shipping: shipping,
                            tax: tax,
                            total: total,
                            date: new Date().toLocaleDateString()
                        }
                    }
                });
            } else {
                setError('Failed to place order. Please try again.');
            }
        } catch (err) {
            console.error('Error placing order:', err);
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Placing your order...</div>;
    if (error) return <div className="checkout-error">Error: {error}</div>;

    return (
        <div className="checkout-container">
            <div className="checkout-wrapper">
                {/* Header */}
                <div className="checkout-header">
                    <Link to="/" className="checkout-back-link">
                        ← Back to Shop
                    </Link>
                    <h1 className="checkout-title">Checkout</h1>
                    <p className="checkout-subtitle">
                        No Payment processing - orders saved for manual fulfillment
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="checkout-form">
                    {/* Left Column - Contact & Shipping */}
                    <div className="checkout-left">
                        {/* Contact Information */}
                        <div className="checkout-card">
                            <h2 className="checkout-card-title">Contact Information</h2>
                            <div className="checkout-form-group">
                                <label htmlFor="fullName" className="checkout-label">
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.customerName}
                                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                    required
                                    className="checkout-input"
                                />
                                <label htmlFor="email" className="checkout-label">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.customerEmail}
                                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                                    required
                                    className="checkout-input"
                                />
                                <label htmlFor="phone" className="checkout-label">
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="(123) 456-7890"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    required
                                    className="checkout-input"
                                />
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="checkout-card">
                            <h2 className="checkout-card-title">Shipping Address</h2>
                            <div className="checkout-form-group">

                                <div className="checkout-form-group">
                                    <label htmlFor="address" className="checkout-label">
                                        Address
                                    </label>
                                    <input
                                        id="address"
                                        name="address"
                                        placeholder="123 Main St"
                                        value={formData.shippingAddress}
                                        onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                                        required
                                        className="checkout-input"
                                    />
                                </div>

                                <div className="checkout-input-row-3">
                                    <div className="checkout-form-group">
                                        <label htmlFor="city" className="checkout-label">
                                            City
                                        </label>
                                        <input
                                            id="city"
                                            name="city"
                                            placeholder="New York"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            required
                                            className="checkout-input"
                                        />
                                    </div>
                                    <div className="checkout-form-group">
                                        <label htmlFor="state" className="checkout-label">
                                            State
                                        </label>
                                        <input
                                            id="state"
                                            name="state"
                                            placeholder="NY"
                                            value={formData.state}
                                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                            required
                                            className="checkout-input"
                                        />
                                    </div>
                                    <div className="checkout-form-group">
                                        <label htmlFor="zip" className="checkout-label">
                                            ZIP Code
                                        </label>
                                        <input
                                            id="zip"
                                            name="zip"
                                            placeholder="10001"
                                            value={formData.zip}
                                            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                            required
                                            className="checkout-input"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="checkout-right">
                        <OrderSummary
                            buttonText="Complete Order"
                            buttonType="submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Checkout;
