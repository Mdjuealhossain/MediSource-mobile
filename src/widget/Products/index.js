"use client";
import { useState } from "react";

import Product from "@/components/Product";

const Products = ({ products, isshowap }) => {
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
                    isshowap={isshowap}
                />
            ))}
        </div>
    );
};

export default Products;
