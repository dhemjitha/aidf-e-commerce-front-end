import React from 'react'
import { Button } from './ui/button'
import { Info, Star } from 'lucide-react'

function ProductCard(props) {
    return (

        <div
            // to={`/hotel/${props.hotel._id}`}
            key={props.product._id}
            className="block group relative"
        >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <img
                    src={props.product.image}
                    alt={props.product.name}
                    className="object-cover w-full h-full absolute transition-transform group-hover:scale-105"
                />
            </div>

            <div className="mt-3 space-y-2">
                <h3 className="font-semibold text-lg">{props.product.name}</h3>
                <div className="flex items-center text-muted-foreground">
                    <Info className="h-4 w-4 mr-1" />
                    <span>{props.product.category}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">{props.product.rating}</span>
                    <span className="text-muted-foreground">
                        ({props.product.reviews.toLocaleString()} Reviews)
                    </span>
                </div>
                <div className="flex items-baseline space-x-2">
                    <span className="text-xl font-bold">${props.product.price}</span>
                </div>
            </div>

        </div>

    )
}

export default ProductCard