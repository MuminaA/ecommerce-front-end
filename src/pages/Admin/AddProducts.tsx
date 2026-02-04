import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import "../../styles/AdminPages.css";
import API_BASE_URL from "../../config";

export default function AddProducts() {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    size: "",
  });

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
        image: fileUrl
      }));

      console.log('Image uploaded successfully:', fileUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stockQuantity: parseInt(formData.stock, 10),
      category: formData.category,
      imageUrl: formData.image,
      size: formData.size
    };

    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        navigate("/admin/products");
      } else {
        console.error("Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        {/* Back Button */}
        <Link to="/admin/products" className="back-link">
          ← Back
        </Link>

        <h1 className="page-title">Add New Product</h1>

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
                  ) : formData.image ? (
                    <img src={formData.image} alt="Preview" className="image-preview" />
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
                  <label htmlFor="stock" className="form-label">
                    Stock <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
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
            <button type="submit" form="product-form" className="btn btn-primary">
              Save Product
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