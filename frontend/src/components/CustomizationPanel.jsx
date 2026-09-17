import React from 'react';
import { Check, DollarSign } from 'lucide-react';

const METAL_OPTIONS = [
  { id: 'gold', name: 'Gold', color: 'gold' },
  { id: 'rosegold', name: 'Rose Gold', color: 'rosegold' },
  { id: 'silver', name: 'Silver', color: 'silver' }
];

const STONE_OPTIONS = [
  { id: 'diamond', name: 'Diamond', color: 'diamond' },
  { id: 'emerald', name: 'Emerald', color: 'emerald' },
  { id: 'ruby', name: 'Ruby', color: 'ruby' },
  { id: 'sapphire', name: 'Sapphire', color: 'sapphire' }
];

const CustomizationPanel = ({ 
  customization, 
  onUpdate,
  calculatedPrice,
  selectedProduct,
  onSave,
  hasCapture
}) => {
  if (!selectedProduct) return null;

  const handleSizeChange = (e) => {
    onUpdate('size', parseInt(e.target.value));
  };

  const handleDesignChange = (design) => {
    onUpdate('design', design);
  };

  const variants = selectedProduct.variants || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold font-display text-gray-800 mb-2">
          Customize Your {selectedProduct.name}
        </h2>
        <p className="text-gray-500 text-sm">
          Personalize every detail and see it in real-time
        </p>
      </div>

      {/* Metal Selection */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
          Choose Metal
        </h3>
        <div className="flex gap-4">
          {METAL_OPTIONS.map((metal) => (
            <button
              key={metal.id}
              onClick={() => onUpdate('metal', metal.id)}
              className="flex flex-col items-center gap-2"
            >
              <div 
                className={`metal-swatch ${metal.color} ${
                  customization.metal === metal.id ? 'active' : ''
                }`}
              />
              <span className={`text-xs font-medium ${
                customization.metal === metal.id 
                  ? 'text-gray-800' 
                  : 'text-gray-500'
              }`}>
                {metal.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Stone Selection */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
          Select Stone
        </h3>
        <div className="flex gap-3">
          {STONE_OPTIONS.map((stone) => (
            <button
              key={stone.id}
              onClick={() => onUpdate('stone', stone.id)}
              className="flex flex-col items-center gap-2"
            >
              <div 
                className={`stone-swatch ${stone.color} ${
                  customization.stone === stone.id ? 'active' : ''
                }`}
              />
              <span className={`text-xs font-medium ${
                customization.stone === stone.id 
                  ? 'text-gray-800' 
                  : 'text-gray-500'
              }`}>
                {stone.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Size Slider */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Adjust Size
          </h3>
          <span className="text-sm font-medium text-roshni-gold">
            {customization.size}%
          </span>
        </div>
        <input
          type="range"
          min="30"
          max="100"
          value={customization.size}
          onChange={handleSizeChange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Smaller</span>
          <span>Larger</span>
        </div>
      </div>

      {/* Design Variants */}
      {variants.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
            Design Style
          </h3>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => (
              <button
                key={variant}
                onClick={() => handleDesignChange(variant)}
                className={`design-variant ${
                  customization.design === variant ? 'active' : ''
                }`}
              >
                {variant.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Display */}
      <div className="glass p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600 text-sm">Total Price</span>
          <div className="flex items-center gap-1 text-2xl font-bold text-gray-800">
            <DollarSign className="w-6 h-6 text-roshni-gold" />
            <span>₹{calculatedPrice.toLocaleString()}</span>
          </div>
        </div>
        
        {/* Price breakdown */}
        <div className="text-xs text-gray-500 space-y-1 mb-4">
          <div className="flex justify-between">
            <span>Base Price</span>
            <span>₹{selectedProduct.base_price.toLocaleString()}</span>
          </div>
          {customization.metal !== 'gold' && (
            <div className="flex justify-between">
              <span className="capitalize">{customization.metal}</span>
              <span className={selectedProduct.materials.find(m => m.name === customization.metal)?.price >= 0 ? 'text-green-600' : 'text-red-500'}>
                {selectedProduct.materials.find(m => m.name === customization.metal)?.price >= 0 ? '+' : ''}
                ₹{selectedProduct.materials.find(m => m.name === customization.metal)?.price.toLocaleString()}
              </span>
            </div>
          )}
          {customization.stone !== 'diamond' && (
            <div className="flex justify-between">
              <span className="capitalize">{customization.stone}</span>
              <span className={selectedProduct.stones.find(s => s.name === customization.stone)?.price >= 0 ? 'text-green-600' : 'text-red-500'}>
                {selectedProduct.stones.find(s => s.name === customization.stone)?.price >= 0 ? '+' : ''}
                ₹{selectedProduct.stones.find(s => s.name === customization.stone)?.price.toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Size Adjustment</span>
            <span>{(customization.size - 50) > 0 ? '+' : ''}{customization.size - 50}%</span>
          </div>
        </div>

        {/* Action Buttons */}
        <button
          onClick={onSave}
          disabled={!hasCapture}
          className={`w-full py-4 rounded-xl font-semibold transition-all duration-300
            flex items-center justify-center gap-2
            ${hasCapture 
              ? 'btn-primary' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          <Check className="w-5 h-5" />
          {hasCapture ? 'Save Configuration' : 'Capture First to Save'}
        </button>
        
        {hasCapture && (
          <p className="text-xs text-center text-gray-500 mt-3">
            Your customized design is ready to be saved!
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomizationPanel;
