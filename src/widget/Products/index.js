"use client";
import Product from "@/components/Product";
import React, { useState } from "react";

const Products = () => {
    const [items, setItems] = useState(products);
    const handleDelete = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };
    console.log("first,", items);

    return (
        <div className="space-y-3">
            {items.map((product, index) => (
                <div key={product.id} className="flex items-center gap-1">
                    <Product
                        item={product}
                        index={index}
                        onDelete={handleDelete}
                    />
                </div>
            ))}
        </div>
    );
};

export default Products;
const products = [
    {
        id: 1,
        name: "Amdocal plus 25mg",
        quantity: 1,
        regularPrice: 123,
        actualPrice: 172,
    },
    {
        id: 2,
        name: "Paracetamol 500mg",
        quantity: 2,
        regularPrice: 50,
        actualPrice: 70,
    },
    {
        id: 3,
        name: "Omeprazole 20mg",
        quantity: 1,
        regularPrice: 90,
        actualPrice: 120,
    },
];
