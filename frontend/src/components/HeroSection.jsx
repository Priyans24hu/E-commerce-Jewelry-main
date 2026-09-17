import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Award, Eye, Gem } from 'lucide-react';

const HeroSection = ({ onLaunchAR, onExploreCollections }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-roshni-cream/50 to-amber-50/20 pt-8 pb-16 lg:pt-12 lg:pb-24">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-roshni-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-roshni-gold/10 border border-roshni-gold/30 text-roshni-dark text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-roshni-gold" />
              <span>Next-Gen AR Virtual Try-On Studio</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-gray-900 tracking-tight leading-[1.15]">
              Crafted for Elegance, Experienced in{' '}
              <span className="gold-text">Augmented Reality</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Step into the future of luxury shopping. Try on real-time 3D diamond rings, handcrafted gold necklaces, custom bangles, and earrings using your live camera or photo.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onLaunchAR}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-roshni-gold to-[#B8960C] text-white font-bold text-base shadow-xl shadow-roshni-gold/25 hover:scale-105 transition-transform flex items-center justify-center gap-3 group"
              >
                <Eye className="w-5 h-5 group-hover:animate-bounce" />
                <span>Launch AR Try-On Studio</span>
                <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCollections}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-gray-900 font-semibold text-base border-2 border-gray-200 hover:border-roshni-gold hover:text-roshni-gold transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Gem className="w-5 h-5 text-roshni-gold" />
                <span>Explore Collections</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-gray-200/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <span className="text-2xl font-bold text-gray-900 font-display block">4.9 ★</span>
                <span className="text-xs text-gray-500 font-medium">2,400+ Verified Reviews</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900 font-display block">100%</span>
                <span className="text-xs text-gray-500 font-medium">BIS Hallmarked Gold</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900 font-display block">Real-Time</span>
                <span className="text-xs text-gray-500 font-medium">MediaPipe Face & Hand AR</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="glass p-6 rounded-3xl shadow-2xl border border-white/60 relative overflow-hidden group">
              
              {/* Product Badge Overlay */}
              <div className="absolute top-8 left-8 z-20 bg-roshni-dark/90 text-white backdrop-blur px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-roshni-gold" />
                <span>Featured Signature Piece</span>
              </div>

              {/* Decorative Luxury Visual */}
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 via-rose-50 to-amber-50 flex flex-col items-center justify-center p-8 text-center border border-amber-200/50">
                <div className="w-24 h-24 rounded-full bg-white/80 backdrop-blur shadow-xl flex items-center justify-center mb-4 border-2 border-roshni-gold/40 group-hover:scale-110 transition-transform">
                  <Gem className="w-12 h-12 text-roshni-gold" />
                </div>
                <h3 className="text-2xl font-bold font-display text-gray-900 mb-2">
                  Classic Diamond Solitaire
                </h3>
                <p className="text-sm text-gray-600 max-w-xs mb-4">
                  18K Yellow Gold with Certified VVS1 Brilliant Cut Diamond
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-extrabold text-gray-900 font-display">₹4,500</span>
                  <span className="text-xs text-gray-400 line-through">₹5,200</span>
                </div>
              </div>

              {/* Quick Try-On Banner overlay */}
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-roshni-dark to-gray-900 text-white flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold">Want to see how it looks on you?</h4>
                  <p className="text-xs text-gray-400">Instant Virtual Fitting in seconds</p>
                </div>
                <button
                  onClick={onLaunchAR}
                  className="px-4 py-2 text-xs font-bold bg-roshni-gold text-white rounded-lg hover:bg-amber-600 transition-colors shadow"
                >
                  Try Now
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Feature Highlights Bar */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-roshni-gold shrink-0">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Real-Time AR Overlay</h4>
              <p className="text-xs text-gray-500">Instant face & hand tracking</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-roshni-gold shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Certified Hallmark</h4>
              <p className="text-xs text-gray-500">Authentic certified gemstones</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-roshni-gold shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Insured Express Shipping</h4>
              <p className="text-xs text-gray-500">Free door-to-door delivery</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-roshni-gold shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Lifetime Warranty</h4>
              <p className="text-xs text-gray-500">Cleaning & size adjustments</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
