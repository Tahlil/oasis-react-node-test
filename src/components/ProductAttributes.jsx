import { useState } from "react";

const ProductAttributes = ({ attributes = [], onChange }) => {
  const [selected, setSelected] = useState({});

  const handleSelect = (attrName, value) => {
    const newSelected = { ...selected, [attrName]: value };
    setSelected(newSelected);
    onChange(newSelected);
  };

  if (!attributes.length) return null;

  return (
    <div className="flex flex-col gap-4 my-6">
      {attributes.map((attr) => (
        <div key={attr.name} data-testid={`product-attribute-${attr.name.toLowerCase().replace(/\s+/g, '-')}`}>
          <h4 className="font-bold font-roboto mb-2">{attr.name}:</h4>
          <div className="flex gap-3 flex-wrap">
            {attr.values.map((val, i) => {
              const isActive = selected[attr.name] === val.label;
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(attr.name, val.label)}
                  className={`border-2 min-w-8 min-h-8 ${isActive ? "border-black" : "border-gray-300"}`}
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
  );
};

export default ProductAttributes;