import React from 'react'

function CategoryTab(props) {

    const handleClick = () => {
        props.onClick(props.category.name);
    }

    if (props.category.name === props.selectedCategory) {
        return (
            <div className=" rounded px-2 py-1 cursor-pointer" onClick={handleClick}>
                <img src={props.category.image} className="h-22 w-20" />
        </div>
        )
    }

    return (
        <div className="rounded px-2 py-1 cursor-pointer" onClick={handleClick}>
                <img src={props.category.image} className="h-22 w-20" />
        </div>
    )
}

export default CategoryTab