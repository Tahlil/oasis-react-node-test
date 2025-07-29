import { useQuery } from "@apollo/client";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { GET_CATEGORY_PRODUCTS } from "../graphql/queries";
import Spinner from "../components/Spinner";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { loading, error, data } = useQuery(GET_CATEGORY_PRODUCTS, {
    variables: { categoryId: categoryId },
  });
  if (error) return <div className="text-center text-red-500">Error! {error.message}</div>;
  return (
    <section className="py-10">
      <div className="container">
        {loading ? (
          <Spinner loading={loading} />
        ) : !data || !data.productsByCategory || !data.productsByCategory.products || data.productsByCategory.products.length === 0 ? (
          <p className="text-center text-gray-500">No products available in this category</p>
        ) : (
          <>
            <h1 className="text-4xl mb-5 uppercase">{data.productsByCategory.categoryName}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.productsByCategory.products.map((product) => (
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