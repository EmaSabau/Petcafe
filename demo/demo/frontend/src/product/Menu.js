import React, { useEffect, useState, useCallback } from 'react';
import axios from '../helper/axios';
import './Menu.css';

// Constants for better maintainability
const PRODUCT_TYPES = {
    ALL: '',
    COFFEE: 'COFFEE',
    TEA: 'TEA',
    DESSERT: 'DESSERT'
};

const MenuPage = () => {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [filters, setFilters] = useState({
        searchQuery: '',
        productType: PRODUCT_TYPES.ALL
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Memoized fetch function to prevent unnecessary recreations
    const fetchAllProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        console.log("Starting to fetch products...");

        try {
            console.log("Making request to /products/getProducts");
            const response = await axios.get("/products");
            console.log("Received response:", response);

            const productsData = response.data || [];
            console.log("Products data:", productsData);

            if (Array.isArray(productsData)) {
                console.log(`Received ${productsData.length} products`);
                setAllProducts(productsData);
                setProducts(productsData);
            } else {
                console.warn("Received data is not an array:", productsData);
                throw new Error("Received data is not an array");
            }
        } catch (err) {
            console.error("Error loading products:", err);
            if (err.response) {
                console.error("Response status:", err.response.status);
                console.error("Response data:", err.response.data);
            }
            setError("Failed to load products. Please try again later.");
            setAllProducts([]);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    }, []);
    // Memoized filter function
    const fetchProductsByType = useCallback(async (type) => {
        if (!type) {
            setProducts(allProducts);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(`products/type/${type}`);
            setProducts(response.data);
        } catch (err) {
            console.error(`Error fetching ${type} products:`, err);
            setError(`Failed to load ${type.toLowerCase()} products.`);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    }, [allProducts]);

    // Memoized search function
    const searchProducts = useCallback(async (name) => {
        if (!name.trim()) {
            // If search is empty, apply current type filter
            if (filters.productType) {
                await fetchProductsByType(filters.productType);
            } else {
                setProducts(allProducts);
            }
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(`products/search`, {
                params: { name: name.trim() }
            });
            setProducts(response.data);
        } catch (err) {
            console.error("Error searching products:", err);
            setError("Search failed. Please try again.");
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    }, [allProducts, fetchProductsByType, filters.productType]);

    // Initial load
    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);

    // Handler for filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handler for type filter clicks
    const handleFilterClick = useCallback((type) => {
        setFilters(prev => ({
            ...prev,
            productType: type,
            searchQuery: '' // Clear search when changing type
        }));
        fetchProductsByType(type);
    }, [fetchProductsByType]);

    // Apply filters (search)
    const applyFilters = useCallback(() => {
        if (filters.searchQuery.trim()) {
            searchProducts(filters.searchQuery);
        } else if (filters.productType) {
            fetchProductsByType(filters.productType);
        } else {
            setProducts(allProducts);
        }
    }, [filters.searchQuery, filters.productType, searchProducts, fetchProductsByType, allProducts]);

    // Handle Enter key in search
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            applyFilters();
        }
    };

    // Render loading state
    if (isLoading && products.length === 0) {
        return (
            <div className="container">
                <div className="loading">Loading menu...</div>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="container">
                <div className="error-message">{error}</div>
                <button
                    className="retry-button"
                    onClick={fetchAllProducts}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 className="menu-title">Our Coffee & Treats Menu</h1>

            {/* Search and filter section */}
            <div className="filter-section">
                <div className="search-container">
                    <input
                        type="text"
                        name="searchQuery"
                        placeholder="Search for a product..."
                        value={filters.searchQuery}
                        onChange={handleFilterChange}
                        onKeyPress={handleKeyPress}
                        className="search-bar"
                        aria-label="Search products"
                    />
                    <button
                        className="search-button"
                        onClick={applyFilters}
                        disabled={isLoading}
                    >
                        Search
                    </button>
                </div>

                <div className="filter-buttons">
                    {Object.entries(PRODUCT_TYPES).map(([key, value]) => (
                        <button
                            key={key}
                            className={`filter-btn ${filters.productType === value ? 'active' : ''}`}
                            onClick={() => handleFilterClick(value)}
                            disabled={isLoading}
                        >
                            {key === 'ALL' ? 'Show All' : key.charAt(0) + key.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product grid */}
            <div className="menu-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="no-products-message">
                        {filters.searchQuery
                            ? `No products found matching "${filters.searchQuery}"`
                            : "No products available at the moment."
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

// Separate component for product card for better readability and reusability
const ProductCard = ({ product }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="menu-card">
            <img
                src={imageError || !product.image ? '/placeholder-food.jpg' : product.image}
                alt={product.name}
                onError={() => setImageError(true)}
                className="product-image"
            />
            <div className="menu-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                    ${product.price ? product.price.toFixed(2) : 'N/A'}
                </div>
                <div className={`product-type ${product.productType ? product.productType.toLowerCase() : ''}`}>
                    {product.productType || 'Unknown'}
                </div>
                {product.description && (
                    <div className="product-description">{product.description}</div>
                )}
            </div>
        </div>
    );
};

export default MenuPage;