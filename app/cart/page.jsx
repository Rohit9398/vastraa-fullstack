"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "../../store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";
import { getAuthUser } from "../../lib/authClient";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Boolean(getAuthUser()));
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
        <div className="text-center">
          <FiShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">Your Cart is Empty</h1>
          <p className="text-secondary-600 mb-8">Add some awesome t-shirts to get started!</p>
          <Link href="/shop" className="btn-primary inline-flex">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container-custom">
        <h1 className="text-4xl font-display font-bold text-secondary-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="card p-6">
                <div className="flex gap-6">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-secondary-900 mb-2">
                      {item.name}
                    </h3>
                    <div className="flex gap-4 text-sm text-secondary-600 mb-3">
                      <span>Size: {item.size}</span>
                      <span>Color: {item.color}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.color, Math.max(1, item.quantity - 1))
                          }
                          className="w-8 h-8 border border-gray-300 rounded hover:border-primary-600 transition-colors"
                        >
                          -
                        </button>
                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.color, item.quantity + 1)
                          }
                          className="w-8 h-8 border border-gray-300 rounded hover:border-primary-600 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-secondary-900">
                          ₹{item.price * item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            removeItem(item.id, item.size, item.color);
                            toast.success("Item removed from cart");
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                clearCart();
                toast.success("Cart cleared");
              }}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-secondary-700">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-secondary-700">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-secondary-700">
                  <span>Tax (18%)</span>
                  <span>₹{Math.round(getTotalPrice() * 0.18)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold text-secondary-900">
                    <span>Total</span>
                    <span>₹{Math.round(getTotalPrice() * 1.18)}</span>
                  </div>
                </div>
              </div>

              <Link
                href={isLoggedIn ? "/checkout" : "/login"}
                className="btn-primary w-full justify-center mb-4"
              >
                Proceed to Checkout
              </Link>

              <Link href="/shop" className="btn-outline w-full justify-center">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
