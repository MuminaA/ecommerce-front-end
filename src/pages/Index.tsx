import { useEffect, useState } from 'react';
import type { Product } from '../types/Product';
import ProductCard from "../components/ProductCard";
import '../styles/Index.css';
import Header from '../components/Navbar';
import Footer from '../components/Footer';
import API_BASE_URL from "../config";

function Index() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const productsPerPage = 8;

    useEffect(() => {
        fetch(`${API_BASE_URL}/products`)
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

    // Calculate pagination
    const totalPages = Math.ceil(products.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (loading) return <div className='loading'>Loading...</div>;
    if (error) return <div className='loading'>Error: {error}</div>;

    return (
        <div className="homepage-container">
            {/* Header */}
            <Header />
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-wrapper">
                    <h1 className="hero-title">Welcome to Palette</h1>
                    <p className="hero-subtitle">Discover unique printed artwork</p>
                </div>
            </section>
            {/* Product Grid */}
            <main className="products-section">
                <div className="products-grid">
                    {currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="pagination-section">
                    <button className="pagination-btn" onClick={handlePreviousPage} disabled={currentPage === 1}>
                        <svg
                            className="pagination-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        PREVIOUS
                    </button>

                    <span className="pagination-info">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button 
                        className="pagination-btn"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        NEXT
                        <svg
                            className="pagination-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Index;