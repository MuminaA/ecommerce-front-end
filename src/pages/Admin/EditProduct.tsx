import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import "../../styles/AdminPages.css";
import type { Product } from "../../types/Product";
import API_BASE_URL from "../../config";


export default function EditProduct() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        category: "",
        imageUrl: "",
        size: "",
    });

    useEffect(() => {
        if (id) {
            fetchProduct(Number(id))
        }
    }, [id]);

    const fetchProduct = async (productId: number) => {
        try {
            const response = await fetch(`${API_BASE_URL}/products/${productId}`);
            if (response.ok) {
                const data = await response.json();
                setFormData({
                    name: data.name,
                    description: data.description,
                    price: data.price.toString(),
                    stockQuantity: data.stockQuantity.toString(),
                    category: data.category,
                    imageUrl: data.imageUrl,
                    size: data.size
                });
            } else {
                setError("Failed to load product. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching product:", error);
            setError("Error loading product. Please check your connection.");
        } finally {
            setLoading(false);
        }
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);

        try {
            // Step 1: Get presigned URL from backend
            const presignedResponse = await fetch(`${API_BASE_URL}/api/s3/presigned-url`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fileName: file.name,
                    fileType: file.type
                }),
            });

            if (!presignedResponse.ok) {
                throw new Error('Failed to get presigned URL');
            }

            const { presignedUrl, fileUrl } = await presignedResponse.json();

            // Step 2: Upload file directly to S3 using presigned URL
            const uploadResponse = await fetch(presignedUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': file.type,
                },
                body: file,
            });

            if (!uploadResponse.ok) {
                throw new Error('Failed to upload to S3');
            }

            // Step 3: Store the S3 URL in form data
            setFormData((prev) => ({
                ...prev,
                imageUrl: fileUrl
            }));

            console.log('Image uploaded successfully:', fileUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
            setError('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) {
            setError("Product ID not found.");
            return;
        }

        if (!formData.name.trim()) {
            setError("Product name is required.");
            return;
        }

        if (!formData.description.trim()) {
            setError("Product description is required.");
            return;
        }

        if (parseFloat(formData.price) <= 0) {
            setError("Price must be greater than 0.");
            return;
        }

        if (parseInt(formData.stockQuantity, 10) < 0) {
            setError("Stock quantity cannot be negative.");
            return;
        }

        if (id) {
            updateProduct(Number(id), {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                stockQuantity: parseInt(formData.stockQuantity, 10),
                category: formData.category,
                imageUrl: formData.imageUrl,
                size: formData.size
            });
        }
    }

    const updateProduct = async (productId: number, updatedData: Partial<Product>) => {
        setSubmitting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            if (response.ok) {
                navigate("/admin/products");
            } else {
                setError("Failed to update product. Please try again.");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            setError("Error updating product. Please check your connection.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <AdminLayout>
            <div className="admin-page">
                {/* Back Button */}
                <Link to="/admin/products" className="back-link">
                    ← Back
                </Link>

                <h1 className="page-title">Edit Product</h1>

                {/* Error Alert */}
                {error && (
                    <div className="alert alert-error">
                        <span>❌</span>
                        {error}
                    </div>
                )}

                {/* Form Container */}
                <div className="form-container">
                    <form onSubmit={handleSubmit} id="product-form" className="product-form">
                        {/* Left Column - Image Upload */}
                        <div className="form-column">
                            <div className="image-upload-box">
                                <h3 className="form-label">Image Upload</h3>
                                <div className="upload-area">
                                    {uploading ? (
                                        <p className="upload-text">Uploading...</p>
                                    ) : formData.imageUrl ? (
                                        <img src={formData.imageUrl} alt="Preview" className="image-preview" />
                                    ) : (
                                        <>
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                                <path
                                                    d="M20 10V30M10 20H30"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <p className="upload-text">Drop image or browse</p>
                                        </>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: "none" }}
                                    id="image-input"
                                    disabled={uploading}
                                />
                                <button
                                    type="button"
                                    className="btn btn-browse"
                                    onClick={() => document.getElementById("image-input")?.click()}
                                    disabled={uploading}
                                >
                                    {uploading ? "Uploading..." : "Browse"}
                                </button>
                                <p className="upload-helper">Upload to AWS S3</p>
                            </div>
                        </div>

                        {/* Right Column - Form Fields */}
                        <div className="form-column">
                            {/* Name */}
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">
                                    Name <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Product name"
                                    className="form-input"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="form-group">
                                <label htmlFor="description" className="form-label">
                                    Description <span className="required">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Product description"
                                    className="form-textarea"
                                    rows={4}
                                    required
                                />
                            </div>

                            {/* Price and Stock */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="price" className="form-label">
                                        Price <span className="required">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        className="form-input"
                                        step="0.01"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="stockQuantity" className="form-label">
                                        Stock <span className="required">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="stockQuantity"
                                        name="stockQuantity"
                                        value={formData.stockQuantity}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Category and Size */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="category" className="form-label">
                                        Category <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        placeholder="Product category"
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="size" className="form-label">
                                        Size <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="size"
                                        name="size"
                                        value={formData.size}
                                        onChange={handleInputChange}
                                        placeholder="Product size"
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="divider"></div>
                    <div className="save-cancel-btn">
                        {/* Save Button */}
                        <button type="submit" form="product-form" className="btn btn-primary" disabled={uploading || submitting}>
                            {submitting ? "Saving..." : "Save Product"}
                        </button>
                        {/* Cancel Button */}
                        <Link to="/admin/products" className="btn btn-secondary">
                            Cancel
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}