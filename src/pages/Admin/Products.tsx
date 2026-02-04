import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import "../../styles/AdminPages.css";
import API_BASE_URL from "../../config";

interface Product {
    id: number;
    name: string;
    price: number;
    stockQuantity: number;
    imageUrl: string;
}

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/products`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div className="loading">Loading...</div>;

    const deleteProduct = async (productId: number) => {
        try {
            const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setProducts(products.filter(product => product.id !== productId));
            } else {
                console.error("Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }

    return (
        <AdminLayout>
            <div className="admin-page">
                {/* Header */}
                <div className="page-header">
                    <h1 className="page-title">Products</h1>
                    <Link to="/admin/products/new" className="btn-add">
                        + Add Product
                    </Link>
                </div>

                {/* Alert */}
                <div className="alert alert-info">
                    <span>🔒</span>
                    Role-based access: Admin only
                </div>

                {/* Products Table */}
                <div className="table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        {product.imageUrl ? (
                                            <img src={product.imageUrl} alt={product.name} className="product-thumb" />
                                        ) : (
                                            <div className="product-thumb-placeholder">No Image</div>
                                        )}
                                    </td>
                                    <td>{product.name}</td>
                                    <td>${(product.price ?? 0).toFixed(2)}</td>
                                    <td>{product.stockQuantity}</td>
                                    <td className="actions-cell">
                                        <Link className="btn-icon btn-edit" to={`/admin/products/${product.id}/edit`}>
                                            <span>✏️</span>
                                        </Link>
                                        <button className="btn-icon btn-delete" title="Delete" onClick={() => deleteProduct(product.id)}>
                                            <span>🗑️</span>
                                        </button>
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