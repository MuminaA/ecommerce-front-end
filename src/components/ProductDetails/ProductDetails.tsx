import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../../types/Product";

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
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <p>Stock: {product.stockQuantity}</p>
        </div>
    )
}

export default ProductDetails;