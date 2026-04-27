import ProductCard from "../../components/ProductCard";
import { apiUrl } from "../../lib/api";

export const metadata = {
  title: "Shop - Vastraa",
  description: "Browse our collection of premium t-shirts for custom printing",
};

async function getProducts() {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(apiUrl("/api/products"), { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Products API request failed");
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

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Shop Our Collection
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            Discover premium quality t-shirts perfect for your custom designs
          </p>
        </div>
      </div>

      <div className="container-custom py-16">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-secondary-600">
            Products are temporarily unavailable. Please try again shortly.
          </div>
        )}
      </div>
    </div>
  );
}
