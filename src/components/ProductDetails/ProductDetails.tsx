import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../../types/Product";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data: Product) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="details-container">
      <img src={product.imageUrl} alt={product.name} className="product-img" />
      <div className="product-details">
        <h1 className="product-name">{product.name}</h1>
        <p className="price">${product.price}</p>
        <p className="description"><span>Description: </span>{product.description}</p>
        <p className="category"><span>Category: </span>{product.category}</p>
        <p className="size"><span>Size: </span>{product.size}</p>
        <p className="stock"><span>Stock: </span>{product.stockQuantity}</p>
      </div>
    </div>
  );
}

export default ProductDetails;
