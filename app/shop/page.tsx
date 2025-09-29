"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { useAuthStore } from "@/lib/stores/auth";
import { 
  ShoppingBag, 
  Star, 
  Plus, 
  Minus,
  Eye,
  Heart,
  Filter,
  Search,
  Calendar,
  Shield,
  Truck,
  CreditCard,
  X,
  Check,
  AlertTriangle,
  Zap,
  Crown
} from "lucide-react";

// Age Gate Component
const AgeGate = ({ onVerify }: { onVerify: () => void }) => {
  const [birthDate, setBirthDate] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleDateChange = (date: string) => {
    setBirthDate(date);
    
    if (date) {
      const birth = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        setIsValid(age - 1 >= 18);
      } else {
        setIsValid(age >= 18);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8 max-w-md w-full text-center"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-hotpink to-hung flex items-center justify-center">
          <Shield size={32} className="text-white" />
        </div>
        
        <h2 className="text-2xl font-heading font-bold text-white mb-4">
          Age Verification Required
        </h2>
        
        <p className="text-gray-300 mb-6">
          You must be 18+ to access the HOTMESS shop. Please verify your age to continue.
        </p>
        
        <div className="space-y-4">
          <Input
            type="date"
            value={birthDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full"
            max={new Date().toISOString().split('T')[0]}
          />
          
          <Button
            onClick={onVerify}
            disabled={!isValid}
            variant="neon"
            size="lg"
            className="w-full"
          >
            {isValid ? (
              <>
                <Check className="mr-2" size={16} />
                Enter Shop
              </>
            ) : (
              <>
                <AlertTriangle className="mr-2" size={16} />
                Must be 18+
              </>
            )}
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 mt-4">
          Your information is not stored and is only used for age verification.
        </p>
      </motion.div>
    </motion.div>
  );
};

// Shop Data
const categories = ['All', 'Bundles', 'Apparel', 'Accessories', 'Digital', 'Limited'];

const products = [
  {
    id: 1,
    name: 'HUNG Bundle',
    description: 'Complete starter pack: T-shirt, stickers, digital mix pack',
    price: 45.00,
    originalPrice: 60.00,
    category: 'Bundles',
    image: '/api/placeholder/400/400',
    isLimited: true,
    stock: 12,
    rating: 4.9,
    reviews: 127,
    tags: ['Popular', 'Limited Edition']
  },
  {
    id: 2,
    name: 'HOTMESS Logo Tee',
    description: 'Premium cotton blend with embroidered logo',
    price: 25.00,
    category: 'Apparel',
    image: '/api/placeholder/400/400',
    isLimited: false,
    stock: 45,
    rating: 4.7,
    reviews: 89,
    tags: ['Bestseller']
  },
  {
    id: 3,
    name: 'VIP Access Card',
    description: 'Physical NFC card for exclusive events and discounts',
    price: 15.00,
    category: 'Accessories',
    image: '/api/placeholder/400/400',
    isLimited: true,
    stock: 8,
    rating: 5.0,
    reviews: 34,
    tags: ['VIP Only', 'NFC']
  },
  {
    id: 4,
    name: 'Frequency Pack Vol. 1',
    description: 'Exclusive digital mix collection from resident DJs',
    price: 12.00,
    category: 'Digital',
    image: '/api/placeholder/400/400',
    isLimited: false,
    stock: 999,
    rating: 4.8,
    reviews: 203,
    tags: ['Digital', 'High Quality']
  },
  {
    id: 5,
    name: 'HNHMESS Aftercare Kit',
    description: 'Self-care essentials: stickers, tea, recovery guide',
    price: 30.00,
    category: 'Bundles',
    image: '/api/placeholder/400/400',
    isLimited: true,
    stock: 6,
    rating: 4.9,
    reviews: 67,
    tags: ['Aftercare', 'Self-Care']
  },
  {
    id: 6,
    name: 'Neon Snapback',
    description: 'Embroidered snapback cap with reflective details',
    price: 35.00,
    category: 'Accessories',
    image: '/api/placeholder/400/400',
    isLimited: false,
    stock: 23,
    rating: 4.6,
    reviews: 45,
    tags: ['Streetwear']
  }
];

export default function ShopPage() {
  const [ageVerified, setAgeVerified] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    // Check if age was previously verified (in a real app, use secure storage)
    const verified = localStorage.getItem('ageVerified');
    if (verified === 'true') {
      setAgeVerified(true);
    }
  }, []);

  const handleAgeVerify = () => {
    setAgeVerified(true);
    localStorage.setItem('ageVerified', 'true');
  };

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = Object.entries(cart).reduce((total, [productId, quantity]) => {
    const product = products.find(p => p.id === parseInt(productId));
    return total + (product?.price || 0) * quantity;
  }, 0);

  const cartItemCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);

  if (!ageVerified) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <AgeGate onVerify={handleAgeVerify} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-hung/10 via-black to-hotpink/10" />
          <div className="container mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-hotpink to-hung p-1 rounded-full mb-6">
                <ShoppingBag className="text-black ml-3" size={20} />
                <span className="text-black font-semibold mr-3">OFFICIAL STORE</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-hotpink via-hung to-hotpink bg-clip-text text-transparent">
                HOTMESS Store
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                RAW / HUNG / HIGH / SUPER — limited, loud, lethal. 
                Wear the mess. Own the night. Express your frequency.
              </p>

              {/* Quick Stats */}
              <div className="flex justify-center space-x-8 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Truck size={16} />
                  <span>Free shipping over £50</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield size={16} />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap size={16} />
                  <span>{products.filter(p => p.isLimited).length} limited items</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="py-8 px-4 border-b border-gray-800">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "neon" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Sort & Cart */}
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                <Button variant="outline" className="relative">
                  <ShoppingBag size={16} className="mr-2" />
                  Cart ({cartItemCount})
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-hotpink text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-hotpink/50 transition-all duration-300 overflow-hidden">
                    {/* Product Image */}
                    <div className="relative aspect-square bg-gradient-to-br from-hotpink/10 to-hung/10 overflow-hidden">
                      {product.isLimited && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                          LIMITED
                        </div>
                      )}
                      
                      <div className="absolute top-3 right-3 flex space-x-2 z-10">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 bg-black/50 hover:bg-black/70"
                          onClick={() => toggleWishlist(product.id)}
                        >
                          <Heart 
                            size={14} 
                            className={wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-white'} 
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 bg-black/50 hover:bg-black/70"
                        >
                          <Eye size={14} />
                        </Button>
                      </div>

                      {product.originalPrice && (
                        <div className="absolute bottom-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Save £{(product.originalPrice - product.price).toFixed(2)}
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                    </div>

                    <CardContent className="p-4">
                      {/* Product Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-white group-hover:text-hotpink transition-colors">
                            {product.name}
                          </h3>
                          {user?.membership === 'vip' && (
                            <Crown size={14} className="text-hung flex-shrink-0" />
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {product.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-hotpink/20 text-hotpink px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Rating & Stock */}
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Star size={12} className="text-yellow-400 fill-current" />
                            <span>{product.rating}</span>
                            <span>({product.reviews})</span>
                          </div>
                          <span className={product.stock < 10 ? 'text-red-400' : 'text-gray-400'}>
                            {product.stock < 10 ? `Only ${product.stock} left` : `${product.stock} in stock`}
                          </span>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-white">
                            £{product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              £{product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Cart Controls */}
                        {cart[product.id] ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="w-8 h-8"
                                onClick={() => removeFromCart(product.id)}
                              >
                                <Minus size={12} />
                              </Button>
                              <span className="w-8 text-center font-semibold">
                                {cart[product.id]}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="w-8 h-8"
                                onClick={() => addToCart(product.id)}
                              >
                                <Plus size={12} />
                              </Button>
                            </div>
                            <span className="text-sm text-gray-400">
                              £{(product.price * cart[product.id]).toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <Button
                            variant="neon"
                            size="sm"
                            className="w-full"
                            onClick={() => addToCart(product.id)}
                            disabled={product.stock === 0}
                          >
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Search size={64} className="mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </section>

        {/* Cart Summary (if items in cart) */}
        <AnimatePresence>
          {cartItemCount > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-4 right-4 bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-xl p-6 max-w-sm z-40"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Cart Summary</h3>
              <div className="space-y-2 mb-4">
                {Object.entries(cart).map(([productId, quantity]) => {
                  const product = products.find(p => p.id === parseInt(productId));
                  if (!product) return null;
                  
                  return (
                    <div key={productId} className="flex justify-between text-sm">
                      <span className="text-gray-300">
                        {product.name} x{quantity}
                      </span>
                      <span className="text-white">
                        £{(product.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between font-semibold text-white mb-4">
                  <span>Total</span>
                  <span>£{cartTotal.toFixed(2)}</span>
                </div>
                <Button variant="neon" size="sm" className="w-full">
                  <CreditCard className="mr-2" size={16} />
                  Checkout
                </Button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}