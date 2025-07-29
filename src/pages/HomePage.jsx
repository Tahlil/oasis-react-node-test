import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        setError('Error loading products');
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-10">
      <div className="container">
        <h1 className="text-4xl mb-5">ALL</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loading ? (
            <Spinner loading={loading} />
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : !products.length ? (
            <p className="text-center text-gray-500">No products available</p>
          ) : (
            products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePage;