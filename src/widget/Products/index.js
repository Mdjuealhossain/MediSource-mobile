"use client";
import { useState, useEffect } from "react";

import Product from "@/components/Product";

const Products = ({ products, isshowap, storPurchase, type }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(products || []);
    }, [products]);

    const handleDelete = (id) => {
        setItems((prevItems) =>
            prevItems.filter((item) => item.product_id !== id)
        );
    };

    if (!Array.isArray(items)) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-2">
            {items.map((product, index) => (
                <Product
                    storPurchase={storPurchase}
                    key={product.product_id}
                    item={product}
                    index={index}
                    onDelete={handleDelete}
                    isshowap={isshowap}
                    type={type}
                />
            ))}
        </div>
    );
};

export default Products;
