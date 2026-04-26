"use client";

import { FiStar } from "react-icons/fi";
import { useState } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Event Organizer",
      image: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      text: "Ordered 50 custom t&apos;shirts for our college fest. The quality was outstanding and delivery was on time. Highly recommend Vastraa!",
    },
    {
      name: "Priya Patel",
      role: "Small Business Owner",
      image: "https://i.pravatar.cc/150?img=45",
      rating: 5,
      text: "The printing quality is exceptional! I&apos;ve ordered multiple times for my brand merchandise. Customer service is also very responsive.",
    },
    {
      name: "Amit Kumar",
      role: "Fitness Enthusiast",
      image: "https://i.pravatar.cc/150?img=33",
      rating: 5,
      text: "Love the fabric quality and the prints are vibrant. Perfect for my gym wear collection. Will definitely order again!",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-secondary-700 mb-6 leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-secondary-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-secondary-600">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
