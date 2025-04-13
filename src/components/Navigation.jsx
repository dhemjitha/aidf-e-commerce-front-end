import React, { useState } from 'react'
import { Button } from './ui/button'
import { Heart, Menu, X } from 'lucide-react'
import { Link } from 'react-router';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { useSelector } from 'react-redux';
import { cn } from '@/lib/utils';

function Navigation() {

    const [isOpen, setIsOpen] = useState(false);
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const wishlistCount = wishlistItems.length;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav className="z-10 bg-black flex items-center justify-between text-white px-8 py-4">
            <div className="flex items-center space-x-8">
                <Link to="/" className="text-2xl font-bold">
                    ShopZoneAI
                </Link>

                <div className="hidden md:flex space-x-6">
                    <Link to="/">Home</Link>
                </div>
            </div>

            <div className="md:hidden">
                <button onClick={toggleMenu}>
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
                <Button variant="ghost" className="relative rounded-full">
                    <Link to="/wishlist" className="flex items-center">
                        <Heart className={cn("h-5 w-5", wishlistCount > 0 && "fill-red-500 text-red-500")} />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>
                </Button>
                <SignedOut>
                    <Button variant="ghost">
                        <Link to="/sign-in">Log In</Link>
                    </Button>
                    <Button>
                        <Link to="/sign-up">Sign Up</Link>
                    </Button>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                    <Button>
                        <Link to="/account">My Account</Link>
                    </Button>
                </SignedIn>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden absolute top-16 left-0 right-0 flex flex-col bg-black p-4 z-50">
                    <Link to="/" onClick={toggleMenu} className="hover:text-gray-400 flex items-center justify-center py-3">
                        Home
                    </Link>

                    <Button variant="ghost" className="relative rounded-full" onClick={toggleMenu}>
                    <Link to="/wishlist" className="flex items-center">
                        <span className="text-white">Wishlist</span> <Heart className={cn("h-5 w-5 ml-2", wishlistCount > 0 && "fill-red-500 text-red-500")} />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>
                </Button>

                    <SignedOut>
                        <Button variant="ghost" asChild className="mb-3" onClick={toggleMenu}>
                            <Link to="/sign-in">Log In</Link>
                        </Button>
                        <Button asChild onClick={toggleMenu}>
                            <Link to="/sign-up">Sign Up</Link>
                        </Button>
                    </SignedOut>
                    <SignedIn>
                        <UserButton appearance={{
                            elements: {
                                rootBox: "w-full items-center justify-center flex mt-4 mb-4"
                            }
                        }} />
                        <Button asChild onClick={toggleMenu}>
                            <Link to="/account">My Account</Link>
                        </Button>
                    </SignedIn>
                </div>
            )}

        </nav>
    )
}

export default Navigation