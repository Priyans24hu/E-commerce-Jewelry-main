import React, { useState, useCallback, useEffect } from 'react';
import { Crown, Heart, ShoppingBag, CheckCircle, Download, Share2, X } from 'lucide-react';
import Camera from '../components/Camera';
import ProductSelector from '../components/ProductSelector';
import CustomizationPanel from '../components/CustomizationPanel';
import useCustomization from '../hooks/useCustomization';

const TryOnPage = () => {
  const {
    products,
    selectedProduct,
    customization,
    calculatedPrice,
    loading,
    selectProduct,
    updateCustomization,
    saveCustomization,
    getFeedbackMessage
  } = useCustomization();

  const [faceData, setFaceData] = useState(null);
  const [handData, setHandData] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [savedConfirmation, setSavedConfirmation] = useState(false);

  // Update feedback message when customization changes
  useEffect(() => {
    const message = getFeedbackMessage();
    setFeedbackMessage(message);
    
    // Clear message after 4 seconds
    const timer = setTimeout(() => {
      setFeedbackMessage(null);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [customization, calculatedPrice, getFeedbackMessage]);

  const handleCapture = useCallback((imageData) => {
    setCapturedImage(imageData);
    
    // Flash effect
    const flash = document.getElementById('flash-overlay');
    if (flash) {
      flash.classList.add('active');
      setTimeout(() => {
        flash.classList.remove('active');
      }, 150);
    }
  }, []);

  const handleSave = async () => {
    if (!capturedImage) return;
    
    const result = await saveCustomization(capturedImage);
    if (result) {
      setSavedConfirmation(true);
      setTimeout(() => {
        setSavedConfirmation(false);
      }, 3000);
    }
  };

  const handleDownload = () => {
    if (!capturedImage) return;
    
    const link = document.createElement('a');
    link.href = capturedImage;
    link.download = `roshni-creations-${selectedProduct?.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
    link.click();
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-roshni-gold/20 border-t-roshni-gold rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Roshni Creations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-roshni-gold to-roshni-gold/70 
                            flex items-center justify-center shadow-lg">
              <Crown className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display text-gray-800">
                Roshni Creations
              </h1>
              <p className="text-sm text-gray-500">AR Jewelry Try-On Experience</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow relative">
              <ShoppingBag className="w-5 h-5 text-gray-600" />
              {capturedImage && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-roshni-gold rounded-full text-white text-xs flex items-center justify-center">
                  1
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Camera / AR View */}
          <div className="space-y-4">
            <Camera
              selectedProduct={selectedProduct}
              customization={customization}
              onCapture={handleCapture}
              faceData={faceData}
              handData={handData}
              onFaceData={setFaceData}
              onHandData={setHandData}
              feedbackMessage={feedbackMessage}
            />

            {/* Captured Image Preview */}
            {capturedImage && (
              <div className="glass p-4 rounded-2xl animate-fade-in">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-800">Captured Design</h4>
                  <button 
                    onClick={() => setCapturedImage(null)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src={capturedImage} 
                    alt="Captured design"
                    className="w-full h-auto rounded-xl"
                  />
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <button
                      onClick={handleDownload}
                      className="p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <Download className="w-4 h-4 text-gray-700" />
                    </button>
                    <button className="p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:bg-white transition-colors">
                      <Share2 className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Customization Panel */}
          <div className="lg:pl-4">
            <div className="glass p-6 lg:p-8 rounded-3xl sticky top-8">
              <ProductSelector
                products={products}
                selectedProduct={selectedProduct}
                onSelect={selectProduct}
              />

              {selectedProduct && (
                <CustomizationPanel
                  customization={customization}
                  onUpdate={updateCustomization}
                  calculatedPrice={calculatedPrice}
                  selectedProduct={selectedProduct}
                  onSave={handleSave}
                  hasCapture={!!capturedImage}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-roshni-gold" />
            <span className="font-semibold text-gray-800">Roshni Creations</span>
          </div>
          <p className="text-sm text-gray-500">
            Premium AR Jewelry Experience • Crafted with precision
          </p>
        </div>
      </footer>

      {/* Saved Confirmation Modal */}
      {savedConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="glass px-8 py-6 rounded-2xl shadow-2xl animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Configuration Saved!</h4>
                <p className="text-sm text-gray-500">
                  Your custom design has been saved successfully
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TryOnPage;
