import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-display font-bold text-primary-500 mb-4">
              Vastraa
            </h3>
            <p className="text-gray-300 mb-6">
              Premium custom t-shirt printing service. High-quality prints, fast delivery, and endless design possibilities.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-secondary-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-secondary-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-secondary-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-secondary-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-secondary-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-primary-500 transition-colors">About Us</Link></li>
              <li><Link href="/shop" className="text-gray-300 hover:text-primary-500 transition-colors">Shop</Link></li>
              <li><Link href="/custom-design" className="text-gray-300 hover:text-primary-500 transition-colors">Custom Design</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-primary-500 transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-primary-500 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="/shipping" className="text-gray-300 hover:text-primary-500 transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-primary-500 transition-colors">Returns</Link></li>
              <li><Link href="/size-guide" className="text-gray-300 hover:text-primary-500 transition-colors">Size Guide</Link></li>
              <li><Link href="/track-order" className="text-gray-300 hover:text-primary-500 transition-colors">Track Order</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-primary-500 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <strong>Phone:</strong><br />
                <a href="tel:+919876543210" className="hover:text-primary-500 transition-colors">+91 98765 43210</a>
              </li>
              <li>
                <strong>Email:</strong><br />
                <a href="mailto:support@vastraa.com" className="hover:text-primary-500 transition-colors">support@vastraa.com</a>
              </li>
              <li>
                <strong>Address:</strong><br />
                123 Fashion Street, Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-secondary-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Vastraa. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/terms" className="hover:text-primary-500 transition-colors">Terms & Conditions</Link>
              <Link href="/privacy" className="hover:text-primary-500 transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
