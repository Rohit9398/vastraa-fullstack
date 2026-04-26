"use client";

import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart, FiHeart, FiStar } from "react-icons/fi";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="card overflow-hidden group">
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {discount}% OFF
            </div>
          )}
          {product.bestseller && (
            <div className="absolute top-4 right-4 bg-secondary-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
              BESTSELLER
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-secondary-900 hover:text-primary-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <button
            onClick={handleWishlist}
            className="flex-shrink-0 ml-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiHeart
              className={`w-5 h-5 ${
                isWishlisted ? "fill-primary-600 text-primary-600" : "text-secondary-600"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <FiStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-secondary-900 ml-1">
              {product.rating}
            </span>
          </div>
          <span className="text-sm text-secondary-500">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-secondary-900">
            ₹{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-secondary-500 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        <Link
          href={`/product/${product.id}`}
          className="w-full btn-primary justify-center text-sm"
        >
          <FiShoppingCart className="w-4 h-4" />
          Add to Cart
        </Link>
      </div>
    </div>
  );
}
