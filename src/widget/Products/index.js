"use client";
import { useState, useEffect } from "react";

import Product from "@/components/Product";

const Products = ({ products = [], isshowap, storPurchase, type, IsAdd, isSpecial }) => {
    console.log("products---", products);
    return (
        <div className="space-y-2">
            {products.map((product, index) => (
                <Product storPurchase={storPurchase} key={product.product_id} item={product} index={index} type={type} IsAdd={IsAdd} isSpecial={isSpecial} />
            ))}
        </div>
    );
};

export default Products;
