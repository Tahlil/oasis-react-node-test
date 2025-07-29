import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductAttributes from "../components/ProductAttributes";
import ImageCarousel from "../components/ImageCarousel";
import { addToCart, openCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import Spinner from "../components/Spinner";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [selectedAttributes, setSelectedAttributes] = useState({});

  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          setError(data.error);
        } else {
          setProduct(data.product);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Error loading product');
        setLoading(false);
      });
  }, [productId]);

  const allAttributesSelected = product?.attributes?.length
    ? product.attributes.every((attr) => selectedAttributes[attr.name])
    : true;

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <section>
      <div className="container">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="py-10">
            <div className="flex flex-col md:flex-row gap-10 justify-between">
              <div
                className="w-full md:w-[60%] flex flex-col md:flex-row justify-between gap-5"
                data-testid="product-gallery"
              >
                <ImageCarousel gallery={[product.image]} />
              </div>
              <div className="w-full md:w-[40%]">
                <h1 className="text-4xl font-raleway font-semibold mb-5">{product.name}</h1>
                <ProductAttributes
                  attributes={product.attributes || []}
                  onChange={setSelectedAttributes}
                />
                <div>
                  <h3 className="text-xl font-roboto font-semibold">Price:</h3>
                  <p className="font-raleway text-2xl font-bold mb-5">${product.price}</p>
                </div>
                {product.inStock && (
                  <button
                    disabled={product.attributes?.length > 0 && !allAttributesSelected}
                    className={`px-6 py-3 rounded w-full uppercase ${
                      product.attributes?.length > 0 && !allAttributesSelected
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-[#6ed388] cursor-pointer"
                    }`}
                    onClick={() => {
                      dispatch(
                        addToCart({
                          productId: product.id,
                          selectedAttributes,
                          quantity: 1,
                          product,
                        })
                      );
                      dispatch(openCart());
                    }}
                    data-testid="add-to-cart"
                  >
                    Add to Cart
                  </button>
                )}
                <div className="font-roboto my-5" data-testid="product-description">
                  {product.description}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetailsPage;