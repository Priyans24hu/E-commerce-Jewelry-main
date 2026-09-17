import React from 'react';
import { Crown, ShieldCheck, MapPin, Phone, Mail, Award, Gem, Clock, Sparkles, Heart } from 'lucide-react';

const AboutPage = () => {
  const boutiques = [
    {
      city: 'Mumbai Flagship Boutique',
      address: '42, Maker Chambers VI, Nariman Point',
      pincode: 'Mumbai, Maharashtra - 400021',
      phone: '+91 (022) 6789-9000',
      hours: 'Mon - Sat: 10:30 AM - 8:00 PM',
      type: 'Flagship Store & AR Experience Lounge'
    },
    {
      city: 'New Delhi Luxury Quarter',
      address: '15, Khan Market, High Street',
      pincode: 'New Delhi - 110003',
      phone: '+91 (011) 4567-8910',
      hours: 'Mon - Sun: 11:00 AM - 8:30 PM',
      type: 'Haute Joaillerie Salon'
    },
    {
      city: 'Bengaluru Indiranagar Studio',
      address: '88, 100 Feet Road, Indiranagar',
      pincode: 'Bengaluru, Karnataka - 560038',
      phone: '+91 (080) 3344-5566',
      hours: 'Tue - Sun: 10:30 AM - 7:30 PM',
      type: 'Bespoke Design & AR Fitting Center'
    }
  ];

  const milestones = [
    { year: '2018', title: 'Heritage Origins', desc: 'Founded in Jaipur & Mumbai as a private bespoke jewelry atelier.' },
    { year: '2021', title: 'Sustainable Gold Initiative', desc: 'Committed to 100% certified conflict-free diamonds and recycled gold.' },
    { year: '2023', title: 'AR Innovation Launch', desc: 'Introduced India\'s first real-time MediaPipe 3D Virtual Try-On experience.' },
    { year: '2026', title: 'Global Recognition', desc: 'Serving luxury connoisseurs across 35+ countries with insured express delivery.' }
  ];

  return (
    <div className="min-h-screen bg-[#FDF8F3] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-roshni-gold/10 border border-roshni-gold/30 text-roshni-dark text-xs font-semibold">
            <Crown className="w-4 h-4 text-roshni-gold" />
            <span>The Roshni Creations Legacy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-gray-900 tracking-tight">
            Where Heritage Craftsmanship Meets <span className="gold-text">AR Technology</span>
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Founded with a vision to redefine fine jewelry buying, Roshni Creations blends royal Indian goldsmith traditions with cutting-edge 3D augmented reality so you can try on perfection anywhere in the world.
          </p>
        </div>

        {/* Brand Story & Founder's Vision */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-roshni-gold uppercase tracking-widest block">
              Our Vision & Craft
            </span>
            <h2 className="text-3xl font-bold font-display text-gray-900">
              Timeless Jewelry for the Modern Connoisseur
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Every piece of jewelry at Roshni Creations is handcrafted by master artisans with decades of heritage expertise. From conflict-free VVS1 diamonds to 18K hallmarked solid gold, we maintain strict quality standards while pioneering digital virtual fittings.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-roshni-gold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">100% BIS Hallmarked</h4>
                  <p className="text-[11px] text-gray-500">Certified Gold & Platinum</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-roshni-gold">
                  <Gem className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Ethical Gemstones</h4>
                  <p className="text-[11px] text-gray-500">IGI & GIA Certified</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl bg-gradient-to-br from-amber-100 via-rose-50 to-amber-50 p-8 border border-amber-200/60 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white shadow-md mx-auto flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-roshni-gold" />
            </div>
            <blockquote className="text-sm text-gray-800 italic font-display">
              "Jewelry is not merely an ornament; it is an emotion preserved in gold and light. Our Virtual AR Studio ensures every client finds their exact signature style with total confidence."
            </blockquote>
            <div>
              <h4 className="font-bold text-gray-900 text-sm font-display">Roshni K. Singhania</h4>
              <p className="text-xs text-roshni-gold font-semibold uppercase tracking-wider">Founder & Master Creative Director</p>
            </div>
          </div>
        </div>

        {/* Milestones / Timeline */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold font-display text-gray-900">Our Journey & Milestones</h2>
            <p className="text-xs text-gray-500 mt-1">From a private workshop to India's leading AR jewelry house</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:border-roshni-gold/40 transition-all">
                <span className="text-2xl font-extrabold text-roshni-gold font-display block mb-2">{m.year}</span>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{m.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Physical Flagship Boutiques & Addresses */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-roshni-gold uppercase tracking-widest block mb-1">
              Visit Us in Person
            </span>
            <h2 className="text-3xl font-bold font-display text-gray-900">
              Our Flagship Boutiques & Experience Lounges
            </h2>
            <p className="text-xs text-gray-500 mt-2">
              Book a private appointment or walk in for complimentary ultrasonic cleaning and AR custom fittings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {boutiques.map((b, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-roshni-gold/10 flex items-center justify-center text-roshni-gold">
                    <MapPin className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-roshni-gold uppercase tracking-wider block mb-1">
                      {b.type}
                    </span>
                    <h3 className="text-lg font-bold font-display text-gray-900">{b.city}</h3>
                  </div>

                  <div className="space-y-2 text-xs text-gray-600">
                    <p className="font-medium text-gray-800">{b.address}</p>
                    <p className="text-gray-500">{b.pincode}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4 text-roshni-gold" />
                    <span>{b.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{b.hours}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Concierge & Contact Box */}
        <div className="bg-roshni-dark text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold font-display text-white">Have a Bespoke Design Request?</h3>
            <p className="text-xs text-gray-400 max-w-md">
              Our master jewelry consultants are available for virtual video appointments or custom design consultation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              href="mailto:concierge@roshnicreations.com"
              className="px-6 py-3 rounded-xl bg-roshni-gold text-white font-bold text-xs hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 shadow"
            >
              <Mail className="w-4 h-4" />
              <span>Email Concierge</span>
            </a>

            <a 
              href="tel:+912267899000"
              className="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold text-xs hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 (022) 6789-9000</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
