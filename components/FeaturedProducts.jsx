import Link from "next/link";
import ProductCard from "./ProductCard";
import { apiUrl } from "../lib/api";

async function getFeaturedProducts() {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(apiUrl("/api/products?featured=true"), {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Featured products API request failed");
      }

      const json = await response.json();
      return Array.isArray(json.data) ? json.data : [];
    } catch (_error) {
      if (attempt === 1) {
        return [];
      }
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }
  }

  return [];
}

export default async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium t-shirts perfect for custom printing
          </p>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-secondary-600 mb-12">
            Featured products are not available right now.
          </div>
        )}

        <div className="text-center">
          <Link href="/shop" className="btn-primary inline-flex">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
