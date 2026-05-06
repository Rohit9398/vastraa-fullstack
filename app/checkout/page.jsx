"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../store/cartStore";
import { apiUrl } from "../../lib/api";
import { toast } from "react-toastify";
import { getAuthToken } from "../../lib/authClient";

const initialAddress = {
  fullName: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();

  const subtotal = getTotalPrice();
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const [senderAddress, setSenderAddress] = useState(initialAddress);
  const [receiverAddress, setReceiverAddress] = useState(initialAddress);
  const [receiptEmail, setReceiptEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const updateAddress = (type, field, value) => {
    if (type === "sender") {
      setSenderAddress((prev) => ({ ...prev, [field]: value }));
      return;
    }

    setReceiverAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    try {
      setIsSubmitting(true);
      const token = getAuthToken();

      if (!token) {
        toast.error("Please login to place your order");
        router.push("/login");
        return;
      }

      const response = await fetch(apiUrl("/api/orders"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items,
          subtotal,
          tax,
          total,
          senderAddress,
          receiverAddress,
          receiptEmail,
        }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        if (response.status === 401) {
          toast.error("Session expired, please login again");
          router.push("/login");
          return;
        }
        throw new Error(json.message || "Could not place order");
      }

      if (json.receipt?.sent) {
        toast.success("Order placed and receipt sent to email");
      } else if (json.receipt?.status === "queued") {
        toast.success("Order placed. Receipt email is being sent.");
      } else {
        toast.success("Order placed. Receipt email not sent.");
      }

      setOrderInfo({
        orderId: json.data?.id,
        receiptSent: Boolean(json.receipt?.sent),
        receiptStatus: json.receipt?.status || "",
        receiptReason: json.receipt?.reason || "",
      });
      clearCart();
    } catch (error) {
      toast.error(error.message || "Checkout failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  if (items.length === 0 && !orderInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
        <div className="text-center bg-white rounded-xl shadow-md p-8 max-w-lg mx-4">
          <h1 className="text-3xl font-bold text-secondary-900 mb-3">Your cart is empty</h1>
          <p className="text-secondary-600 mb-6">
            Add products first, then complete sender and receiver details at checkout.
          </p>
          <Link href="/shop" className="btn-primary inline-flex">
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  if (orderInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-xl mx-4 w-full">
          <h1 className="text-3xl font-bold text-secondary-900 mb-3">Order Placed</h1>
          <p className="text-secondary-700 mb-2">
            Order ID: <span className="font-semibold">{orderInfo.orderId}</span>
          </p>
          <p className="text-secondary-700 mb-6">
            {orderInfo.receiptSent
              ? "Receipt has been sent to your email."
              : orderInfo.receiptStatus === "queued"
              ? "Receipt email is being sent. Please also check spam or promotions."
              : `Order created. Receipt email not sent: ${orderInfo.receiptReason}`}
          </p>
          <Link href="/shop" className="btn-primary inline-flex">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const addressFields = [
    { key: "fullName", label: "Full Name", required: true },
    { key: "phone", label: "Phone", required: true },
    { key: "line1", label: "Address Line 1", required: true },
    { key: "line2", label: "Address Line 2", required: false },
    { key: "city", label: "City", required: true },
    { key: "state", label: "State", required: true },
    { key: "pincode", label: "Pincode", required: true },
    { key: "country", label: "Country", required: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-secondary-900 mb-2">
            Checkout
          </h1>
          <p className="text-secondary-600">
            Add sender and receiver address, then place your order.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">Sender Address</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {addressFields.map((field) => (
                  <div key={`sender-${field.key}`}>
                    <label className="block text-sm font-semibold text-secondary-900 mb-2">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={senderAddress[field.key]}
                      onChange={(event) =>
                        updateAddress("sender", field.key, event.target.value)
                      }
                      className="input-field"
                      required={field.required}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">Receiver Address</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {addressFields.map((field) => (
                  <div key={`receiver-${field.key}`}>
                    <label className="block text-sm font-semibold text-secondary-900 mb-2">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={receiverAddress[field.key]}
                      onChange={(event) =>
                        updateAddress("receiver", field.key, event.target.value)
                      }
                      className="input-field"
                      required={field.required}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">Receipt Email</h2>
              <label className="block text-sm font-semibold text-secondary-900 mb-2">
                Email where full receipt should be sent
              </label>
              <input
                type="email"
                value={receiptEmail}
                onChange={(event) => setReceiptEmail(event.target.value)}
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-secondary-700">
                  <span>Items</span>
                  <span>{itemCount}</span>
                </div>
                <div className="flex justify-between text-secondary-700">
                  <span>Subtotal</span>
                  <span>Rs {subtotal}</span>
                </div>
                <div className="flex justify-between text-secondary-700">
                  <span>Tax (18%)</span>
                  <span>Rs {tax}</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-xl font-bold text-secondary-900">
                  <span>Total</span>
                  <span>Rs {total}</span>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>
              <Link href="/cart" className="btn-outline w-full justify-center mt-3">
                Back to Cart
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
