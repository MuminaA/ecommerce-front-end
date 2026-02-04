import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Product } from "../types/Product";
import "../styles/ProductDetails.css";
import Header from "../components/Navbar";
import { useCart } from "../hooks/CartHook";
import API_BASE_URL from "../config";


function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data: Product) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product, quantity);
    setAddedToCart(true);
    setQuantity(1); // Reset quantity to 1 after adding to cart

    // Reset "added" message after 2 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!product) return <p className="loading">Product not found</p>;

  return (
    <div className="product-details-page">
      {/* Navbar */}
      <Header />
      {/* Main Content */}
      <div className="product-details-container">
        <div className="back-link-wrapper">
          <Link to="/" className="back-link">
            ← Back to Catalog
          </Link>
        </div>
        <div className="product-content">
          {/* Product Image */}
          <div className="product-image-section">
            <img src={product.imageUrl} alt={product.name} className="product-main-image" />
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price-details">${product.price.toFixed(2)}</p>

            <div className="product-description-box">
              <h3 className="description-label">Description:</h3>
              <p className="description-text">{product.description}</p>
            </div>

            <div className="product-meta">
              <div className="meta-row">
                <span className="meta-label">Size:</span>
                <span className="meta-value">{product.size}</span>
              </div>
              
              <div className="meta-divider"></div>
              
              <div className="meta-row">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{product.category}</span>
              </div>
              
              <div className="meta-divider"></div>
              
              <div className="meta-row">
                <span className="meta-label">Stock</span>
                <span className="meta-value stock-value">In stock ({product.stockQuantity})</span>
              </div>
            </div>
            <button 
              className="add-to-cart-btn" 
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            {addedToCart && (
              <p className="success-message">✓ Added to cart!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
