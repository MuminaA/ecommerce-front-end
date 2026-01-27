import { useEffect, useState } from 'react';
import type { Product } from '../../types/Product';
import ProductCard from "../ProductCard/ProductCard";
import './Products.css';

function ProductList() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    fetch("http://localhost:5000/products")
        .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        return response.json();
        })
        .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
        })
        .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
    <div className="product-grid">
        {products.map((product) => (
        <ProductCard key={product.id} product={product} />
        ))}
    </div>
    )
}

export default ProductList