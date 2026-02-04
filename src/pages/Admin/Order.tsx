import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import "../../styles/AdminPages.css";
import API_BASE_URL from "../../config";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  phoneNumber: string;
  totalAmount: number;
  orderDate: string;
  status: "pending" | "complete";
  orderItems: {
    id: string;
    quantity: number;
    priceAtPurchase: number;
  }[];
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      if (response.ok) {
        const data = await response.json()
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (orderId: string, newStatus: "pending" | "complete") => {

    // update local state immediately
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));


    // Save to backend
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const responseData = await response.json(); //
      console.log('PATCH response:', response.status, responseData); // Add logging

      if (!response.ok) {
        console.error('Failed to update order status:', responseData); //
        // revert on error
        fetchOrders();
        alert('Failed to update order status'); //
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      // revert on error
      fetchOrders();
      alert('Error updating order status');
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-page">
          <h1 className="page-title">Order Management</h1>
          <p>Loading orders...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-page">
        {/* Header */}
        <h1 className="page-title">Order Management</h1>

        {/* Alert */}
        <div className="alert alert-warning">
          <span>⚠️</span>
          Orders for manual fulfillment - No payment processing
        </div>

        {/* Orders Table */}
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.customerEmail}</td>
                  <td>${Number(order.totalAmount.toFixed(2))}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>
                    <select
                      className={`badge status-select status-${order.status}`}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as "pending" | "complete")}>
                      <option value="pending">Pending</option>
                      <option value="complete">Complete</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}