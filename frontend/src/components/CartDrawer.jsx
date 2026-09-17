import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0; // Free Insured Shipping
  const tax = Math.round(subtotal * 0.03); // 3% GST
  const grandTotal = subtotal + tax + shipping;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCheckedOut(true);
    }, 1500);
  };

  const handleCloseConfirmation = () => {
    setIsCheckedOut(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-roshni-cream/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-roshni-gold/10 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-roshni-gold" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-display text-gray-900">Your Shopping Bag</h2>
                <p className="text-xs text-gray-500">{cartItems.length} item{cartItems.length === 1 ? '' : 's'}</p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          {isCheckedOut ? (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold font-display text-gray-900 mb-2">Order Confirmed!</h3>
              <p className="text-sm text-gray-600 mb-6">
                Thank you for choosing Roshni Creations. Your bespoke jewelry is being handcrafted with precision.
              </p>
              <div className="bg-gray-50 rounded-2xl p-4 w-full text-left text-xs space-y-2 mb-6 border border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-500">Order ID:</span>
                  <span className="font-mono font-bold text-gray-800">#RC-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Paid:</span>
                  <span className="font-bold text-gray-900">₹{grandTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery:</span>
                  <span className="text-green-600 font-semibold">Free Insured Express (3-5 days)</span>
                </div>
              </div>
              <button
                onClick={handleCloseConfirmation}
                className="btn-primary w-full py-3 text-sm font-bold"
              >
                Continue Shopping
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">Your bag is empty</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-xs">
                Explore our fine jewelry collection or customize pieces in Virtual AR.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 rounded-xl bg-roshni-dark text-white text-xs font-bold hover:bg-gray-800 transition-colors"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            <>
              {/* Item list */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.map((item, index) => (
                  <div 
                    key={`${item.id}-${index}`}
                    className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 relative group"
                  >
                    {/* Item thumbnail */}
                    <div className="w-20 h-20 rounded-xl bg-amber-50 flex items-center justify-center text-roshni-gold shrink-0 border border-amber-200/50">
                      <ShoppingBag className="w-8 h-8 text-roshni-gold" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-900 text-sm font-display">{item.name}</h4>
                        <button 
                          onClick={() => onRemoveItem(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-gray-500 mt-0.5 capitalize">
                        {item.customization ? `${item.customization.metal} • ${item.customization.stone}` : item.type}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-extrabold text-gray-900 text-sm">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>

                        <div className="flex items-center border border-gray-200 bg-white rounded-lg">
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="p-1.5 text-gray-500 hover:text-gray-900"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-gray-800">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="p-1.5 text-gray-500 hover:text-gray-900"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary & Checkout Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated GST (3%):</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Insured Shipping:</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Grand Total:</span>
                    <span className="text-base text-roshni-gold font-display">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-roshni-gold to-[#B8960C] text-white font-bold text-sm shadow-lg shadow-roshni-gold/20 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                  <span>256-Bit Encrypted Secure Checkout</span>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
