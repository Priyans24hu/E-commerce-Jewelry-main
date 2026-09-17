import React, { useState, useMemo } from 'react';
import { Eye, ShoppingBag, Sparkles, Filter, Gem, Crown, Disc, Star } from 'lucide-react';

const ProductGrid = ({ products, onSelectProductForAR, onAddToCart, searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMetalFilter, setSelectedMetalFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'earring', label: 'Earrings' },
    { id: 'necklace', label: 'Necklaces' },
    { id: 'ring', label: 'Rings' },
    { id: 'bangle', label: 'Bangles' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.type === selectedCategory;
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const getCategoryIcon = (type) => {
    switch (type) {
      case 'earring': return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'necklace': return <Crown className="w-5 h-5 text-amber-500" />;
      case 'ring': return <Disc className="w-5 h-5 text-amber-500" />;
      case 'bangle': return <Gem className="w-5 h-5 text-amber-500" />;
      default: return <Sparkles className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <section id="collections" className="py-16 bg-gradient-to-b from-amber-50/20 via-white to-roshni-cream/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-roshni-gold uppercase tracking-widest block mb-2">
            Signature Collections
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 tracking-tight">
            Discover Exceptional Fine Jewelry
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            Handcrafted with ethically sourced gemstones & 18K solid gold. Try any piece live in Virtual AR.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                selectedCategory === cat.id
                  ? 'bg-roshni-dark text-white border-roshni-dark shadow-md scale-105'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-roshni-gold hover:text-roshni-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-xl mx-auto">
            <Gem className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">No jewelry items found</h3>
            <p className="text-xs text-gray-500 mt-1">Try adjusting your search query or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl p-5 border border-gray-100 hover:border-roshni-gold/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Icon Container */}
                  <div className="relative w-full h-56 rounded-2xl bg-gradient-to-br from-amber-50/60 via-rose-50/40 to-amber-100/30 flex items-center justify-center overflow-hidden mb-5 border border-amber-100/50 group-hover:scale-[1.02] transition-transform">
                    
                    {/* Category Icon Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                      {getCategoryIcon(product.type)}
                      <span className="text-[11px] font-semibold text-gray-700 capitalize">
                        {product.type}
                      </span>
                    </div>

                    {/* Popularity Badge */}
                    <div className="absolute top-3 right-3 bg-roshni-gold/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Best Seller</span>
                    </div>

                    {/* Central Jewelry Illustration */}
                    <div className="w-20 h-20 rounded-full bg-white/90 shadow-lg flex items-center justify-center border-2 border-roshni-gold/30">
                      {getCategoryIcon(product.type)}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold font-display text-gray-900 group-hover:text-roshni-gold transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Price and Metal Swatches */}
                    <div className="pt-2 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-400 block font-medium">Starting from</span>
                        <span className="text-lg font-extrabold text-gray-900 font-display">
                          ₹{product.base_price.toLocaleString()}
                        </span>
                      </div>

                      {/* Metals Preview */}
                      <div className="flex items-center gap-1">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#D4AF37] border border-white shadow-xs" title="Gold" />
                        <span className="w-3.5 h-3.5 rounded-full bg-[#B76E79] border border-white shadow-xs" title="Rose Gold" />
                        <span className="w-3.5 h-3.5 rounded-full bg-[#C0C0C0] border border-white shadow-xs" title="Silver" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectProductForAR(product)}
                    className="w-full py-2.5 px-3 rounded-xl bg-roshni-gold/10 hover:bg-roshni-gold text-roshni-dark hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-roshni-gold/30"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Try in AR</span>
                  </button>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full py-2.5 px-3 rounded-xl bg-roshni-dark hover:bg-gray-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-roshni-gold" />
                    <span>Add to Bag</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ProductGrid;
