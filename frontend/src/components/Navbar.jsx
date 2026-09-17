import React, { useState } from 'react';
import { Crown, Heart, ShoppingBag, Search, Sparkles, Menu, X } from 'lucide-react';

const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  cartCount, 
  onOpenCart, 
  searchQuery, 
  setSearchQuery,
  onLaunchAR
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'collections', label: 'Collections' },
    { id: 'ar-studio', label: 'Virtual AR Studio', isAR: true },
    { id: 'about', label: 'About Us' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-roshni-dark text-white text-xs py-2 px-4 text-center font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-roshni-gold animate-pulse" />
          <span>Complimentary Insured Shipping Worldwide • Free 3D Virtual AR Styling • 100% Certified Diamonds</span>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo */}
            <div 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-roshni-gold to-[#B8960C] 
                              flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold font-display text-gray-900 tracking-tight block">
                  Roshni Creations
                </span>
                <span className="text-[10px] text-roshni-gold font-semibold uppercase tracking-widest block -mt-1">
                  Haute Joaillerie
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    if (link.isAR && onLaunchAR) onLaunchAR();
                  }}
                  className={`relative py-2 text-sm font-medium transition-colors ${
                    activeTab === link.id ? 'text-roshni-gold font-semibold' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.isAR && (
                      <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-gradient-to-r from-roshni-gold to-amber-500 text-white rounded-full shadow-sm animate-pulse">
                        Live AR
                      </span>
                    )}
                  </span>
                  {activeTab === link.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-roshni-gold rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search Toggle */}
              <div className="relative">
                {showSearch ? (
                  <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5">
                    <Search className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Search jewelry..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-sm text-gray-800 outline-none w-36 sm:w-48"
                      autoFocus
                    />
                    <button onClick={() => setShowSearch(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowSearch(true)}
                    className="p-2.5 text-gray-600 hover:text-roshni-gold rounded-full hover:bg-gray-100 transition-colors"
                    title="Search catalog"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Wishlist Button */}
              <button 
                onClick={() => setActiveTab('collections')}
                className="hidden sm:flex p-2.5 text-gray-600 hover:text-roshni-gold rounded-full hover:bg-gray-100 transition-colors relative"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>

              {/* Shopping Cart Drawer Trigger */}
              <button
                onClick={onOpenCart}
                className="p-2.5 bg-roshni-dark text-white rounded-full hover:bg-gray-800 transition-all shadow-md flex items-center gap-2 px-4 relative"
              >
                <ShoppingBag className="w-4 h-4 text-roshni-gold" />
                <span className="text-xs font-semibold hidden sm:inline">Bag</span>
                {cartCount > 0 && (
                  <span className="w-5 h-5 bg-roshni-gold text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-roshni-dark">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                  if (link.isAR && onLaunchAR) onLaunchAR();
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                  activeTab === link.id ? 'bg-roshni-gold/10 text-roshni-gold font-bold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{link.label}</span>
                {link.isAR && (
                  <span className="px-2.5 py-0.5 text-xs font-bold bg-roshni-gold text-white rounded-full">
                    AR Try-On
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
