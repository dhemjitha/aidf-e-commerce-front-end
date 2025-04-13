import React from 'react'
import { Button } from './ui/button'
import { Info, Star } from 'lucide-react'
import { Link } from 'react-router'

function ProductCard(props) {
    
    const isFromSearch = props.isFromSearch === true;

    return (
        <Link
            to={`/products/${props.product._id}`}
            key={props.product._id}
            className="block group relative"
        >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <img
                    src={props.product.image}
                    alt={props.product.name}
                    className="object-cover w-full h-full absolute transition-transform group-hover:scale-105"
                />
                {isFromSearch && props.confidence !== undefined && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        {(props.confidence * 100).toFixed(2)}% match
                    </div>
                )}

            </div>

            <div className="mt-3 space-y-2">
                <h3 className="font-semibold text-lg">{props.product.name}</h3>
                <div className="flex items-center text-muted-foreground">
                    <Info className="h-4 w-4 mr-1" />
                    <span>{props.product.brand}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">{props.product?.rating ?? "No Ratings"}</span>
                    <span className="text-muted-foreground">
                        ({props.product.reviews?.toLocaleString() ?? "No"} Reviews)
                    </span>
                </div>
                <div className="flex items-baseline space-x-2">
                    <span className="text-xl font-bold">${props.product.price}</span>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard