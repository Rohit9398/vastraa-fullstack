import { FiShoppingBag, FiEdit3, FiTruck, FiSmile } from "react-icons/fi";

export default function HowItWorks() {
  const steps = [
    {
      icon: FiShoppingBag,
      title: "Choose Your Style",
      description: "Browse our collection and select your favorite t-shirt style, color, and size.",
    },
    {
      icon: FiEdit3,
      title: "Customize Design",
      description: "Upload your design or use our design tool to create something unique.",
    },
    {
      icon: FiTruck,
      title: "Fast Delivery",
      description: "We print and ship your order within 2-3 business days to your doorstep.",
    },
    {
      icon: FiSmile,
      title: "Enjoy & Share",
      description: "Wear your custom creation with pride and share it with the world!",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Get your custom t-shirt in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg z-10">
                {index + 1}
              </div>

              {/* Card */}
              <div className="pt-12 pb-8 px-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-secondary-600">
                  {step.description}
                </p>
              </div>

              {/* Connector Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-primary-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
