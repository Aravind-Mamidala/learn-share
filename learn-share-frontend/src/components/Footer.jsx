import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaCcVisa, FaCcMastercard, FaCcAmazonPay, FaGooglePay } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-8 sm:pt-10 pb-4 sm:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Learn & Share</h2>
          <p className="text-gray-400 text-xs sm:text-sm mb-4">
            Your ultimate learning platform to explore Programming, AI, Web Development and more.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-blue-500"><FaFacebook size={22} /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter size={22} /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram size={22} /></a>
            <a href="#" className="hover:text-blue-700"><FaLinkedin size={22} /></a>
          </div>
        </div>

        {/* Popular Categories */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Popular Categories</h3>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <li><a href="#" className="hover:text-white">Programming Languages</a></li>
            <li><a href="#" className="hover:text-white">Web Development</a></li>
            <li><a href="#" className="hover:text-white">AI & Machine Learning</a></li>
            <li><a href="#" className="hover:text-white">Data Science</a></li>
            <li><a href="#" className="hover:text-white">Cyber Security</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Customer Support</h3>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <li><a href="#" className="hover:text-white">Help & FAQs</a></li>
            <li><a href="#" className="hover:text-white">Refund Policy</a></li>
            <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Stay Updated</h3>
          <p className="text-gray-400 text-xs sm:text-sm mb-3">Subscribe to our newsletter for the latest courses and offers.</p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 sm:p-2 rounded-md sm:rounded-l-md sm:rounded-r-none w-full text-black text-sm sm:text-base"
            />
            <button className="bg-blue-600 px-4 py-2 sm:py-2 rounded-md sm:rounded-r-md hover:bg-blue-700 text-sm sm:text-base whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-gray-700 mt-6 pt-4 flex flex-col sm:flex-row justify-between items-center px-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Learn & Share. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-3 sm:mt-0">
          <FaCcVisa size={30} />
          <FaCcMastercard size={30} />
          <FaCcAmazonPay size={30} />
          <FaGooglePay size={30} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
