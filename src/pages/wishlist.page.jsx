import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, clearWishlist } from '@/lib/feature/wishlistSlice';
import { Heart, ShoppingCart, ArrowLeft, X, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function WishlistPage() {
  const wishlistItems = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.success('Item removed from wishlist');
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast.success('Wishlist cleared');
  };

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
        </div>
        {wishlistItems.length > 0 && (
          <Button variant="outline" onClick={handleClearWishlist}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Wishlist
          </Button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Save items you love to your wishlist and revisit them anytime.</p>
          <Button asChild>
            <Link to="/">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <Card key={product._id} className="overflow-hidden group">
              <div className="relative">
                <Link to={`/products/${product._id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full aspect-[4/3] object-cover"
                  />
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                  onClick={() => handleRemoveFromWishlist(product._id)}
                >
                  <X className="h-5 w-5 text-gray-700 hover:text-red-500" />
                  <span className="sr-only">Remove from wishlist</span>
                </Button>
              </div>
              <CardContent className="p-4">
                <Link to={`/products/${product._id}`} className="block">
                  <h3 className="font-semibold text-lg truncate mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-xl font-bold">${product.price}</span>
                  </div>
                </Link>
                <div className="mt-4">
                  <Button className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 