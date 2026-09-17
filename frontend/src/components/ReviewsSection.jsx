import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';

const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: 'Ananya Roy',
      role: 'Verified Purchaser',
      location: 'Mumbai',
      rating: 5,
      comment: 'The Live AR Virtual Try-On is unreal! I was hesitant to buy a diamond pendant online, but seeing it on my camera sealed the deal. Fast delivery too!',
      product: 'Solitaire Pendant (18K Gold)'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Verified Purchaser',
      location: 'Delhi',
      rating: 5,
      comment: 'The craftsmanship of Roshni Creations is unmatched. Customizing the emerald stone and rose gold finish in real-time was an amazing experience.',
      product: 'Royal Band Ring'
    },
    {
      id: 3,
      name: 'Kavita Patel',
      role: 'Verified Purchaser',
      location: 'Bengaluru',
      rating: 5,
      comment: 'Super smooth hand tracking for testing bangles and rings. Received the package with BIS hallmark certificates. 10/10 luxury service.',
      product: 'Stackable Bangle Set'
    }
  ];

  return (
    <section id="reviews" className="py-16 bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-roshni-gold uppercase tracking-widest block mb-2">
            Client Testimonials
          </span>
          <h2 className="text-3xl font-bold font-display text-gray-900 tracking-tight">
            Loved by Connoisseurs Worldwide
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Discover why over 2,400+ clients trust Roshni Creations for their finest jewelry pieces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div 
              key={rev.id}
              className="p-6 rounded-3xl bg-roshni-cream/30 border border-gray-100 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-gray-700 italic leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm font-display">{rev.name}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500">
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                    <span>{rev.role} • {rev.location}</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-roshni-gold bg-roshni-gold/10 px-2 py-1 rounded-md">
                  {rev.product}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;
