import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import cart from "../assets/cart.png";
import CartOverlay from "./CartOverlay";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart, closeCart } from "../store/cartSlice";
import { useState, useEffect } from "react";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive ? "text-primary uppercase border-b-2 border-primary py-5" : "uppercase py-5";
  const [activeLink, setActiveLink] = useState("all");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const cartItems = useSelector((state) => state.cart.items);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load categories');
        setLoading(false);
      });
  }, []);

  const handleLinkClick = (category) => {
    setActiveLink(category);
  };

  return (
    <>
      {isCartOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/30 z-40"
          onClick={() => dispatch(closeCart())}
        />
      )}
      <nav className="font-raleway relative z-50 bg-white">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-4">
              {/* <NavLink
                to="/all"
                className={linkClass}
                data-testid={`${activeLink === "all" ? "active-category-link" : "category-link"}`}
                onClick={() => handleLinkClick("all")}
              >
                ALL
              </NavLink> */}
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">Error loading categories</p>
              ) : !categories.length ? (
                <p className="text-gray-500">No categories available</p>
              ) : (
                categories.map((category) => (
                  <NavLink
                    to={`/${category.id}`}
                    className={linkClass}
                    key={category.id}
                    data-testid={`${activeLink === category.name ? "active-category-link" : "category-link"}`}
                    onClick={() => handleLinkClick(category.name)}
                  >
                    {category.name}
                  </NavLink>
                ))
              )}
            </div>
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={logo} alt="logo" />
            </NavLink>
            <div className="flex items-center justify-center gap-4">
              <button
                className="cursor-pointer relative"
                onClick={() => dispatch(toggleCart())}
                data-testid="cart-btn"
              >
                <img src={cart} alt="cart" className="w-6" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                )}
              </button>
              <CartOverlay isCartOpen={isCartOpen} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;