import React from 'react';
import { Crown, Heart, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

const Footer = ({ setActiveTab }) => {
  return (
    <footer className="bg-roshni-dark text-white pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-roshni-gold to-[#B8960C] flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold font-display tracking-tight text-white">
                Roshni Creations
              </span>
            </div>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              India's premier luxury haute joaillerie house. Innovating fine jewelry with real-time AR try-on, conflict-free certified diamonds, and master craftsmanship.
            </p>
            <div className="flex items-center gap-2 text-xs text-roshni-gold pt-2">
              <ShieldCheck className="w-4 h-4 text-roshni-gold" />
              <span>100% BIS Hallmarked • IGI/GIA Certified Diamonds</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-bold font-display text-white uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => setActiveTab('collections')} className="hover:text-roshni-gold transition-colors">
                  All Collections
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('collections')} className="hover:text-roshni-gold transition-colors">
                  Solitaire Rings
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('collections')} className="hover:text-roshni-gold transition-colors">
                  Diamond Necklaces
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('collections')} className="hover:text-roshni-gold transition-colors">
                  Earrings & Studs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('collections')} className="hover:text-roshni-gold transition-colors">
                  Stackable Bangles
                </button>
              </li>
            </ul>
          </div>

          {/* Innovation & Studio */}
          <div>
            <h4 className="text-sm font-bold font-display text-white uppercase tracking-wider mb-4">AR Studio</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => setActiveTab('ar-studio')} className="hover:text-roshni-gold transition-colors flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Live AR Camera Try-On
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ar-studio')} className="hover:text-roshni-gold transition-colors">
                  Photo Upload Fitting
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ar-studio')} className="hover:text-roshni-gold transition-colors">
                  Metal Customization (Gold/Rose Gold)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ar-studio')} className="hover:text-roshni-gold transition-colors">
                  Gemstone Selection
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-sm font-bold font-display text-white uppercase tracking-wider mb-4">Roshni Privé</h4>
            <p className="text-xs text-gray-400 mb-3">
              Subscribe to receive private collection previews and bespoke styling invitations.
            </p>
            <div className="flex items-center bg-gray-800 rounded-xl p-1.5 border border-gray-700">
              <Mail className="w-4 h-4 text-gray-400 ml-2" />
              <input 
                type="email" 
                placeholder="Enter email" 
                className="bg-transparent text-xs text-white outline-none w-full px-2"
              />
              <button className="p-2 bg-roshni-gold text-white rounded-lg hover:bg-amber-600 transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Roshni Creations. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-400 cursor-pointer">Shipping & Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
