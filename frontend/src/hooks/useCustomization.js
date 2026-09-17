import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const useCustomization = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customization, setCustomization] = useState({
    metal: 'gold',
    stone: 'diamond',
    size: 50,
    design: 'classic'
  });
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedCustomizations, setSavedCustomizations] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE}/products`);
        setProducts(response.data);
        if (response.data.length > 0) {
          setSelectedProduct(response.data[0]);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate price when customization changes
  useEffect(() => {
    if (!selectedProduct) return;

    const calculatePrice = async () => {
      try {
        const response = await axios.post(`${API_BASE}/calculate-price`, {
          product_id: selectedProduct.id,
          metal: customization.metal,
          stone: customization.stone,
          size: customization.size
        });
        
        setCalculatedPrice(response.data.total_price);
      } catch (err) {
        // Fallback to local calculation if API fails
        const material = selectedProduct.materials.find(m => m.name === customization.metal);
        const stone = selectedProduct.stones.find(s => s.name === customization.stone);
        
        const metalPrice = material?.price || 0;
        const stonePrice = stone?.price || 0;
        const sizeMultiplier = 1 + (customization.size - 50) * 0.01;
        
        const totalPrice = Math.round((selectedProduct.base_price + metalPrice + stonePrice) * sizeMultiplier);
        setCalculatedPrice(totalPrice);
      }
    };

    calculatePrice();
  }, [selectedProduct, customization]);

  const updateCustomization = useCallback((key, value) => {
    setCustomization(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const selectProduct = useCallback((product) => {
    setSelectedProduct(product);
    // Reset customization to defaults for new product type
    setCustomization({
      metal: 'gold',
      stone: 'diamond',
      size: 50,
      design: product.variants?.[0] || 'classic'
    });
  }, []);

  const saveCustomization = useCallback(async (capturedImage = null) => {
    if (!selectedProduct) return null;

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE}/customization/save`, {
        product_id: selectedProduct.id,
        metal: customization.metal,
        stone: customization.stone,
        size: customization.size,
        design: customization.design,
        total_price: calculatedPrice,
        captured_image: capturedImage
      });

      setSavedCustomizations(prev => [response.data.customization, ...prev]);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  }, [selectedProduct, customization, calculatedPrice]);

  const loadSavedCustomizations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/customizations`);
      setSavedCustomizations(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const loadCustomization = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/customization/${id}`);
      const saved = response.data;
      
      // Find and select the product
      const product = products.find(p => p.id === saved.product_id);
      if (product) {
        setSelectedProduct(product);
        setCustomization({
          metal: saved.metal,
          stone: saved.stone,
          size: saved.size,
          design: saved.design
        });
      }
      
      setLoading(false);
      return saved;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  }, [products]);

  const getFeedbackMessage = useCallback(() => {
    const messages = [];
    
    if (customization.metal === 'gold' && customization.stone === 'diamond') {
      messages.push({ text: 'Classic elegance - always in style ✨', type: 'trending' });
    }
    
    if (customization.size > 70) {
      messages.push({ text: 'Bold statement piece - stunning choice! 💎', type: 'positive' });
    }
    
    if (customization.metal === 'rosegold') {
      messages.push({ text: 'Rose gold is trending this season 🔥', type: 'trending' });
    }
    
    if (calculatedPrice > 5000) {
      messages.push({ text: 'Luxury piece - investment in timeless beauty', type: 'luxury' });
    }
    
    if (messages.length === 0) {
      messages.push({ text: 'This looks perfect on you ✨', type: 'positive' });
    }
    
    return messages[Math.floor(Math.random() * messages.length)];
  }, [customization, calculatedPrice]);

  return {
    products,
    selectedProduct,
    customization,
    calculatedPrice,
    loading,
    error,
    savedCustomizations,
    selectProduct,
    updateCustomization,
    saveCustomization,
    loadCustomization,
    loadSavedCustomizations,
    getFeedbackMessage
  };
};

export default useCustomization;
