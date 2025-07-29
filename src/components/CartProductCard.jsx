import { useDispatch } from "react-redux";
import { decrementQty, incrementQty } from "../store/cartSlice";

const CartProductCard = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div key={item.productId} className="flex justify-between gap-2 mb-5">
      <div className="w-[70%] flex justify-between gap-2">
        <div className="flex flex-col gap-2">
          <p className="text-xl">{item.product.name}</p>
          <p className="font-bold">${item.product.price}</p>
          <div className="flex flex-col gap-2 my-3">
            {item.product.attributes?.map((attr) => (
              <div
                key={attr.name}
                data-testid={`cart-item-attribute-${attr.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <h4 className="font-bold text-sm mb-1">{attr.name}:</h4>
                <div className="flex flex-wrap gap-2">
                  {attr.values.map((val, i) => {
                    const isSelected = item.selectedAttributes[attr.name] === val.label;
                    return (
                      <button
                        key={i}
                        className={`border-2 min-w-8 min-h-8 ${isSelected ? "border-black" : "border-gray-300"}`}
                        data-testid={`product-attribute-${attr.name.toLowerCase().replace(/\s+/g, '-')}-${val.label}`}
                      >
                        {val.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between items-center text-xl">
          <button
            className="border-1 border-black w-8 h-8 cursor-pointer"
            onClick={() => dispatch(incrementQty(item.productId))}
            data-testid="cart-item-amount-increase"
          >
            +
          </button>
          <p data-testid="cart-item-amount">{item.quantity}</p>
          <button
            className="border-1 border-black w-8 h-8 cursor-pointer"
            onClick={() => dispatch(decrementQty(item.productId))}
            data-testid="cart-item-amount-decrease"
          >
            -
          </button>
        </div>
      </div>
      <div className="w-[30%]">
        <img src={item.product.image} className="w-full" alt={item.product.name} />
      </div>
    </div>
  );
};

export default CartProductCard;