import type { Product } from "../types/Product";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/${product.id}`}>
      <div key={product.id} className="product-card">
              <div className="product-image-container">
                {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />) : (
                  <p className="image-placeholder">No Image</p>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.category}</p>
                <div className="product-footer">
                  <span className="product-price">${product.price.toFixed(2)}</span>
                  <button className="product-view-btn">View</button>
                </div>
              </div>
      </div>
    </Link>
  );
}

export default ProductCard;
