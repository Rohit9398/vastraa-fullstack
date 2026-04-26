"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FiShoppingCart, FiHeart, FiStar, FiCheck } from "react-icons/fi";
import { useCartStore } from "../../../store/cartStore";
import { toast } from "react-toastify";
import { apiUrl } from "../../../lib/api";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    let isCancelled = false;

    async function fetchProduct() {
      if (!params?.id) return;

      setIsLoading(true);
      setLoadError("");

      try {
        const response = await fetch(apiUrl(`/api/products/${params.id}`));

        if (!response.ok) {
          throw new Error("Failed to load product");
        }

        const json = await response.json();

        if (!isCancelled) {
          setProduct(json.data || null);
          setSelectedSize("");
          setSelectedColor("");
          setQuantity(1);
          setSelectedImage(0);
        }
      } catch (_error) {
        if (!isCancelled) {
          setProduct(null);
          setLoadError("We could not load this product right now.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      isCancelled = true;
    };
  }, [params?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-secondary-600">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">Product Not Found</h1>
          {loadError && <p className="text-secondary-600 mb-4">{loadError}</p>}
          <button onClick={() => router.push("/shop")} className="btn-primary">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });

    toast.success("Added to cart!");
  };

  const productImages =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
              <Image
                src={productImages[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-primary-600" : "border-gray-200"
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <FiStar className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-lg font-medium text-secondary-900 ml-1">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-secondary-600">({product.reviews} reviews)</span>
                </div>
              </div>
              <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                <FiHeart className="w-6 h-6 text-secondary-600" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold text-secondary-900">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-secondary-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-secondary-700 mb-8 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-secondary-900 mb-3">
                Select Size
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? "border-primary-600 bg-primary-50 text-primary-700"
                        : "border-gray-300 hover:border-primary-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-secondary-900 mb-3">
                Select Color
              </label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${
                      selectedColor === color
                        ? "border-primary-600 bg-primary-50 text-primary-700"
                        : "border-gray-300 hover:border-primary-300"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-secondary-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-primary-600 transition-colors"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-primary-600 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button onClick={handleAddToCart} className="btn-primary w-full justify-center mb-4">
              <FiShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>

            {/* Features */}
            <div className="bg-gray-100 rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <FiCheck className="w-5 h-5 text-primary-600" />
                <span className="text-secondary-700">Premium quality fabric</span>
              </div>
              <div className="flex items-center gap-3">
                <FiCheck className="w-5 h-5 text-primary-600" />
                <span className="text-secondary-700">Perfect for custom printing</span>
              </div>
              <div className="flex items-center gap-3">
                <FiCheck className="w-5 h-5 text-primary-600" />
                <span className="text-secondary-700">Fast delivery within 2-3 days</span>
              </div>
              <div className="flex items-center gap-3">
                <FiCheck className="w-5 h-5 text-primary-600" />
                <span className="text-secondary-700">30-day return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
