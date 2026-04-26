import ProductCard from "../../components/ProductCard";
import { apiUrl } from "../../lib/api";

export const metadata = {
  title: "Shop - Vastraa",
  description: "Browse our collection of premium t-shirts for custom printing",
};

async function getProducts() {
  try {
    const response = await fetch(apiUrl("/api/products"), {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return [];
    }

    const json = await response.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (_error) {
    return [];
  }
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
