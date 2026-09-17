import React from 'react';
import { Gem, Necklace, Ring, Sparkles } from 'lucide-react';

const getIconForType = (type) => {
  switch (type) {
    case 'earring':
      return <Sparkles className="w-5 h-5" />;
    case 'necklace':
      return <Necklace className="w-5 h-5" />;
    case 'ring':
      return <Ring className="w-5 h-5" />;
    case 'bangle':
      return <Gem className="w-5 h-5" />;
    default:
      return <Sparkles className="w-5 h-5" />;
  }
};

const ProductSelector = ({ products, selectedProduct, onSelect }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 font-display">
        Select Jewelry
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {products.map((product) => {
          const isSelected = selectedProduct?.id === product.id;
          const Icon = getIconForType(product.type);
          
          return (
            <div
              key={product.id}
              onClick={() => onSelect(product)}
              className={`product-card flex items-center gap-4 ${
                isSelected ? 'active' : ''
              }`}
            >
              {/* Icon / Thumbnail */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isSelected 
                  ? 'bg-gradient-to-br from-roshni-gold/20 to-roshni-gold/5' 
                  : 'bg-gray-100'
              }`}>
                <span className={isSelected ? 'text-roshni-gold' : 'text-gray-500'}>
                  {Icon}
                </span>
              </div>
              
              {/* Product Info */}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-sm">
                  {product.name}
                </h4>
                <p className="text-xs text-gray-500 capitalize">
                  {product.type}
                </p>
              </div>
              
              {/* Price */}
              <div className="text-right">
                <span className="text-sm font-bold text-gray-800">
                  ₹{product.base_price.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSelector;
