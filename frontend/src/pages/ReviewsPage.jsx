import React, { useState, useMemo } from 'react';
import { Star, CheckCircle2, ThumbsUp, MessageSquarePlus, Filter, X, Sparkles, Check } from 'lucide-react';

const ReviewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // New review form state
  const [newReview, setNewReview] = useState({
    name: '',
    location: '',
    rating: 5,
    product: 'Classic Diamond Stud',
    comment: ''
  });

  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      name: 'Ananya Roy',
      location: 'Mumbai',
      date: 'September 12, 2026',
      rating: 5,
      category: 'ar-experience',
      product: 'Classic Diamond Solitaire Pendant',
      comment: 'The Live AR Virtual Try-On is unreal! I was hesitant to buy a diamond pendant online, but seeing it on my camera sealed the deal. The tracking accurate on my neck.',
      verified: true,
      helpfulCount: 24
    },
    {
      id: 2,
      name: 'Priya Sharma',
      location: 'New Delhi',
      date: 'September 5, 2026',
      rating: 5,
      category: 'rings',
      product: 'Royal Band Solitaire Ring',
      comment: 'The craftsmanship of Roshni Creations is unmatched. Customizing the emerald stone and rose gold finish in real-time was an amazing experience. Received hallmarked certificates.',
      verified: true,
      helpfulCount: 18
    },
    {
      id: 3,
      name: 'Kavita Patel',
      location: 'Bengaluru',
      date: 'August 28, 2026',
      rating: 5,
      category: 'bangles',
      product: 'Stackable Bangle Set',
      comment: 'Super smooth hand tracking for testing bangles and rings. Received the package in 3 days with BIS hallmark certificates. 10/10 luxury service.',
      verified: true,
      helpfulCount: 31
    },
    {
      id: 4,
      name: 'Dr. Meera Nambiar',
      location: 'Chennai',
      date: 'August 19, 2026',
      rating: 5,
      category: 'earrings',
      product: 'Classic Diamond Stud Earrings',
      comment: 'Ordered for my anniversary. The 18K Yellow Gold with brilliant diamond cut sparkles so beautifully. The AR fitting matched the real product size perfectly!',
      verified: true,
      helpfulCount: 12
    },
    {
      id: 5,
      name: 'Rohan & Sanya Verma',
      location: 'Hyderabad',
      date: 'August 10, 2026',
      rating: 5,
      category: 'rings',
      product: 'Eternity Solitaire Ring',
      comment: 'Bought our engagement ring after trying 4 different design variants in the AR Studio. Concierge support was super helpful throughout.',
      verified: true,
      helpfulCount: 45
    }
  ]);

  const categories = [
    { id: 'all', label: 'All Reviews (2,450)' },
    { id: 'ar-experience', label: 'AR Fitting Experience' },
    { id: 'rings', label: 'Rings & Bands' },
    { id: 'earrings', label: 'Earrings' },
    { id: 'bangles', label: 'Bangles & Bracelets' },
  ];

  const filteredReviews = useMemo(() => {
    if (selectedCategory === 'all') return reviewsList;
    return reviewsList.filter(r => r.category === selectedCategory);
  }, [reviewsList, selectedCategory]);

  const handleAddHelpful = (id) => {
    setReviewsList(prev => prev.map(r => r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const created = {
      id: Date.now(),
      name: newReview.name,
      location: newReview.location || 'India',
      date: 'Just now',
      rating: newReview.rating,
      category: 'all',
      product: newReview.product,
      comment: newReview.comment,
      verified: true,
      helpfulCount: 0
    };

    setReviewsList([created, ...reviewsList]);
    setShowReviewModal(false);
    setSubmittedMessage(true);
    setNewReview({ name: '', location: '', rating: 5, product: 'Classic Diamond Stud', comment: '' });

    setTimeout(() => {
      setSubmittedMessage(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#FDF8F3] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-roshni-gold/10 border border-roshni-gold/30 text-roshni-dark text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-roshni-gold" />
            <span>Verified Client Feedback</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-gray-900 tracking-tight">
            Client Reviews & <span className="gold-text">Testimonials</span>
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Read real experiences from clients who customized and purchased certified fine jewelry at Roshni Creations.
          </p>
        </div>

        {/* Rating Overview Box */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-4 text-center md:border-r md:border-gray-100 pr-0 md:pr-8 space-y-2">
            <span className="text-5xl font-extrabold font-display text-gray-900 block">4.9</span>
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-gray-500 font-medium">Based on 2,450+ Verified Client Reviews</p>
          </div>

          <div className="md:col-span-5 space-y-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-12 text-gray-600 font-medium">5 Stars</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[94%]" />
              </div>
              <span className="w-8 text-gray-400 text-right">94%</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-12 text-gray-600 font-medium">4 Stars</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[5%]" />
              </div>
              <span className="w-8 text-gray-400 text-right">5%</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-12 text-gray-600 font-medium">3 Stars</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[1%]" />
              </div>
              <span className="w-8 text-gray-400 text-right">1%</span>
            </div>
          </div>

          <div className="md:col-span-3 text-center md:text-right">
            <button
              onClick={() => setShowReviewModal(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-roshni-dark hover:bg-gray-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mx-auto md:ml-auto"
            >
              <MessageSquarePlus className="w-4 h-4 text-roshni-gold" />
              <span>Write a Review</span>
            </button>
          </div>

        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-roshni-gold text-white border-roshni-gold shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-roshni-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Reviews List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredReviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400">{rev.date}</span>
                </div>

                <h4 className="text-xs font-bold text-roshni-gold uppercase tracking-wider">
                  Item: {rev.product}
                </h4>

                <p className="text-sm text-gray-700 leading-relaxed font-normal">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-gray-900 text-sm font-display">{rev.name}</span>
                    {rev.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600" title="Verified Buyer" />
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{rev.location}</span>
                </div>

                <button
                  onClick={() => handleAddHelpful(rev.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs transition-colors border border-gray-200"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({rev.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Submission Success Banner */}
      {submittedMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in border border-green-700">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-xs">Review Submitted!</h4>
            <p className="text-[11px] text-green-200">Thank you for sharing your feedback.</p>
          </div>
        </div>
      )}

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-gray-100 relative space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-bold font-display text-gray-900">Write a Review</h3>
                <p className="text-xs text-gray-500">Share your experience with Roshni Creations</p>
              </div>
              <button 
                onClick={() => setShowReviewModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Sen"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs outline-none focus:border-roshni-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">City / Location</label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai"
                  value={newReview.location}
                  onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs outline-none focus:border-roshni-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="p-1"
                    >
                      <Star className={`w-6 h-6 ${star <= newReview.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Review *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about the quality, AR try-on fitting, or customer service..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs outline-none focus:border-roshni-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-roshni-gold text-white font-bold text-xs hover:bg-amber-600 transition-colors shadow"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ReviewsPage;
