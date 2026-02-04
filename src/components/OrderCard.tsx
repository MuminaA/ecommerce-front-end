import type { Product } from "../types/Product";
import "../styles/OrderCard.css";

interface ProductCardProps {
    product: Product;
}

function OrderCard({ product }: ProductCardProps) {
    return (
        <div className="order-card">
            <div id="order-card-details">
                <img src={product.imageUrl} alt={product.name} id="product-img" />
                <div>
                    <h3 id="product-name">{product.name}</h3>
                    <p id="product-category">{product.category}</p>
                    <p id="product-price">Price: ${product.price.toFixed(2)}</p>
                </div>
            </div>
            <div className="order-card-actions">
                <button id="remove-item-button">x</button>
                <div>
                    <button id="add-item-button">+</button>
                    <div id="product-quantity">1</div>
                    <button id="sub-item-button">-</button>
                </div>
            </div>
        </div>
    );
}

export default OrderCard;