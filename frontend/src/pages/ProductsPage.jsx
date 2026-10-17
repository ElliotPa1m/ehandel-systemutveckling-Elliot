
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { host } from "../variables";
import Navbar from "../components/Navbar";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slow, setSlow] = useState(false);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  const { addToCart } = useCart();

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    setLoading(true);
    setError(false);
    setSlow(false);

    const slowTimer = setTimeout(() => {
      if (!cancelled) setSlow(true);
    }, 8000);

    const timeout = setTimeout(() => {
      controller.abort();
    }, 90000);

    async function fetchProducts() {
      try {
        const res = await fetch(`${host}/api/products`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid products response");
        }

        if (!cancelled) {
          setProducts(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(true);
        }
      } finally {
        clearTimeout(slowTimer);
        clearTimeout(timeout);

        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(slowTimer);
      clearTimeout(timeout);
    };
  }, [retry]);

  return (
    <div>
      <Navbar />

      {loading ? (
        <div className="products-status">
          <div className="products-spinner" />

          <h2>
            {slow
              ? "We're getting ready!"
              : "Loading products..."}
          </h2>

          <p>
            {slow
              ? "Our demo is waking up. This can take up to a minute."
              : "Please wait while we fetch the products."}
          </p>
        </div>
      ) : error ? (
        <div className="products-status">
          <h2>Oops! Something went wrong</h2>

          <p>
            The server may be waking up or temporarily
            unavailable. Please try again in a moment.
          </p>

          <button
            className="retry-btn"
            onClick={() => setRetry(n => n + 1)}
          >
            Try again
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="products-status">
          <h2>No products available</h2>
          <p>There are currently no products to display.</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <div className="product-card" key={product._id}>
              <img
                src={product.imageUrl}
                alt={product.name}
              />

              <h2>{product.name}</h2>
              <p>${product.price}/hour</p>

              <div className="card-buttons">
                <Link
                  className="details-link"
                  to={`/products/${product._id}`}
                >
                  View details
                </Link>

                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
