export const metadata = {
  title: "About Us - Vastraa",
  description: "Learn about Vastraa's mission to provide premium custom t-shirt printing services",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">About Vastraa</h1>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            Your trusted partner for premium custom t-shirt printing
          </p>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Our Story</h2>
            <p className="text-secondary-700 leading-relaxed mb-4">
              Founded in 2024, Vastraa began with a simple mission: to make high-quality custom t&apos;shirt
              printing accessible to everyone. We believe that everyone should have the opportunity to
              express their creativity through unique, personalized apparel.
            </p>
            <p className="text-secondary-700 leading-relaxed">
              Today, we&apos;ve grown to serve thousands of customers across India, from individual creators
              to large businesses, helping them bring their designs to life with premium quality printing
              and exceptional customer service.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Our Mission</h2>
            <p className="text-secondary-700 leading-relaxed">
              To empower creativity by providing the best custom t-shirt printing experience. We&apos;re
              committed to quality, sustainability, and customer satisfaction in everything we do.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">Why Choose Vastraa?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Premium Quality</h3>
                <p className="text-secondary-600">
                  We use only the finest fabrics and state-of-the-art printing technology to ensure
                  your designs look amazing and last long.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Fast Delivery</h3>
                <p className="text-secondary-600">
                  Most orders are printed and shipped within 2-3 business days, so you get your
                  custom t&apos;shirts when you need them.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Affordable Pricing</h3>
                <p className="text-secondary-600">
                  Quality doesn&apos;t have to be expensive. We offer competitive pricing without
                  compromising on quality.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Expert Support</h3>
                <p className="text-secondary-600">
                  Our team is here to help you every step of the way, from design to delivery.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
