"use client";
import Product from "@/components/Product";
import React, { useState } from "react";

const Products = ({ products }) => {
    const [items, setItems] = useState(products);
    const handleDelete = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <div className="space-y-1">
            {items.map((product, index) => (
                <Product
                    key={product.id}
                    item={product}
                    index={index}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default Products;
