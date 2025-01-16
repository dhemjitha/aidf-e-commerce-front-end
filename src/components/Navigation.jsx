import React from 'react'
import { Button } from './ui/button'

function Navigation() {
    return (
        <nav className="z-10 bg-black flex items-center justify-between text-white px-8 py-4">
            <div className="flex items-center space-x-8">
                <a href="/" className="text-2xl font-bold">
                    ShopZoneAI
                </a>
                <div className="hidden md:flex space-x-6">
                    Home
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <Button variant="ghost">
                    Login
                </Button>
                <Button>
                    Sign Up
                </Button>
            </div>

        </nav>
    )
}

export default Navigation