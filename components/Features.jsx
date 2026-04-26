import { FiTruck, FiDollarSign, FiHeadphones, FiAward } from "react-icons/fi";

export default function Features() {
  const features = [
    {
      icon: FiTruck,
      title: "Free Shipping",
      description: "Free shipping on orders over ₹999",
    },
    {
      icon: FiDollarSign,
      title: "Best Prices",
      description: "Competitive pricing with quality guarantee",
    },
    {
      icon: FiHeadphones,
      title: "24/7 Support",
      description: "Round the clock customer assistance",
    },
    {
      icon: FiAward,
      title: "Premium Quality",
      description: "100% quality assurance on all products",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-secondary-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
