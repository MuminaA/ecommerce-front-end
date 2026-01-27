import type { Product } from "../../types/Product";
import { Link } from "react-router-dom";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="product-card">
        <img src={`${product.imageUrl}`} alt={product.name} />
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.category}</p>
        <div className="price-button">
          <p id="price">${product.price}</p>
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
