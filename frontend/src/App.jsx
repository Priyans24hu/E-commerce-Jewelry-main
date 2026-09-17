import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import TryOnPage from './pages/TryOnPage';
import AboutPage from './pages/AboutPage';
import ReviewsPage from './pages/ReviewsPage';
import ReviewsSection from './components/ReviewsSection';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import useCustomization from './hooks/useCustomization';

function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'collections', 'ar-studio', 'about', 'reviews'
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [preselectedProductForAR, setPreselectedProductForAR] = useState(null);

  const { products, selectProduct } = useCustomization();

  // Add item to shopping cart drawer
  const handleAddToCart = useCallback((product, customization = null, price = null) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id && 
        (!customization || (item.customization?.metal === customization.metal && item.customization?.stone === customization.stone)));
      
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          type: product.type,
          price: price || product.base_price,
          customization: customization,
          quantity: 1
        }
      ];
    });

    setIsCartOpen(true);
  }, []);

  // Update cart item quantity
  const handleUpdateCartQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].quantity = newQuantity;
      return updated;
    });
  };

  // Remove cart item
  const handleRemoveCartItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Launch AR Studio pre-loaded with selected product
  const handleLaunchARForProduct = (product) => {
    if (product) {
      selectProduct(product);
      setPreselectedProductForAR(product);
    }
    setActiveTab('ar-studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreCollections = () => {
    setActiveTab('collections');
    const el = document.getElementById('collections');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF8F3] text-gray-900 font-sans antialiased selection:bg-roshni-gold selection:text-white">
      
      {/* Website Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLaunchAR={() => handleLaunchARForProduct(null)}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {activeTab === 'ar-studio' ? (
          <div className="animate-fade-in">
            {/* Direct AR Try-On Studio Page */}
            <div className="bg-roshni-dark text-white py-4 px-4 text-center border-b border-gray-800">
              <span className="text-xs font-semibold text-roshni-gold uppercase tracking-widest">
                ✨ Virtual Try-On Studio Active • Camera Access Recommended
              </span>
            </div>
            <TryOnPage preselectedProduct={preselectedProductForAR} />
          </div>
        ) : activeTab === 'about' ? (
          <div className="animate-fade-in">
            <AboutPage />
          </div>
        ) : activeTab === 'reviews' ? (
          <div className="animate-fade-in">
            <ReviewsPage />
          </div>
        ) : (
          <div>
            {/* Home / Collections Full E-Commerce Store View */}
            {activeTab === 'home' && (
              <HeroSection
                onLaunchAR={() => handleLaunchARForProduct(null)}
                onExploreCollections={handleExploreCollections}
              />
            )}

            {/* Product Collections Grid */}
            <ProductGrid
              products={products}
              onSelectProductForAR={handleLaunchARForProduct}
              onAddToCart={(prod) => handleAddToCart(prod)}
              searchQuery={searchQuery}
            />

            {/* Customer Reviews Section */}
            <ReviewsSection />
          </div>
        )}
      </main>

      {/* Shopping Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Website Footer */}
      <Footer setActiveTab={handleTabChange} />
    </div>
  );
}

export default App;
