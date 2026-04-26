export const metadata = {
  title: "Custom Design - Vastraa",
  description: "Create your own custom t-shirt design",
};

export default function CustomDesignPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Custom Design Tool</h1>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            Create your unique t-shirt design
          </p>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto bg-white p-12 rounded-xl shadow-md text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">Coming Soon!</h2>
          <p className="text-secondary-600 mb-8">
            Our custom design tool is under development. Contact us for custom orders.
          </p>
        </div>
      </div>
    </div>
  );
}
