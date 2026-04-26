import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 lg:pr-8">
            <div className="inline-block">
              <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">
                Premium Quality Printing
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-secondary-900 leading-tight">
              Design Your
              <span className="text-primary-600"> Dream</span>
              <br />
              T-Shirt Today
            </h1>
            <p className="text-xl text-secondary-600 leading-relaxed">
              Create custom printed t-shirts with premium quality fabric and vibrant designs. 
              Fast delivery, affordable prices, and unlimited creativity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/shop" className="btn-primary justify-center">
                Shop Now
                <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/custom-design" className="btn-outline justify-center">
                Custom Design
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-secondary-900">10K+</div>
                <div className="text-sm text-secondary-600">Happy Customers</div>
              </div>
              <div className="w-px h-12 bg-secondary-300"></div>
              <div>
                <div className="text-3xl font-bold text-secondary-900">50K+</div>
                <div className="text-sm text-secondary-600">Orders Delivered</div>
              </div>
              <div className="w-px h-12 bg-secondary-300"></div>
              <div>
                <div className="text-3xl font-bold text-secondary-900">4.9★</div>
                <div className="text-sm text-secondary-600">Customer Rating</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80"
                alt="Custom T-Shirts"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
