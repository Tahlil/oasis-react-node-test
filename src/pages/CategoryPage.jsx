import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [categoryData, setCategoryData] = useState({ categoryName: "", products: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/categories/${categoryId}`)
      .then(res => res.json())
      .then(data => {
        setCategoryData({ categoryName: data.categoryName, products: data.products });
        setLoading(false);
      })
      .catch(err => {
        setError('Error loading products');
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <section className="py-10">
      <div className="container">
        {loading ? (
          <Spinner loading={loading} />
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : !categoryData.products.length ? (
          <p className="text-center text-gray-500">No products available in this category</p>
        ) : (
          <>
            <h1 className="text-4xl mb-5 uppercase">{categoryData.categoryName}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categoryData.products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CategoryPage;