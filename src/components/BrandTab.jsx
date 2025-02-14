import React from 'react'

function BrandTab(props) {

    const handleClick = () => {
        props.onClick(props.brand.name);
    }

    if (props.brand.name === props.selectedBrand) {
        return (
            <div className=" rounded-lg border border-t-2 border-black px-2 py-1 cursor-pointer" onClick={handleClick}>
                <img src={props.brand.image} className="h-22 w-20"/>
        </div>
        )
    }

    return (
        <div className="rounded px-2 py-1 cursor-pointer" onClick={handleClick}>
                <img src={props.brand.image} className="h-22 w-20" />
        </div>
    )
}

export default BrandTab