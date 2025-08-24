// app/_components/layout/Footer.tsx
import { Building2, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-6 py-12">
        <div className="space-y-4">
          <a href="#" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-xl text-white">CementCo</span>
          </a>
          <p className="text-sm">Your foundation for a solid future.</p>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm hover:text-white">Home</a></li>
            <li><a href="#products" className="text-sm hover:text-white">Products</a></li>
            <li><a href="#about" className="text-sm hover:text-white">About Us</a></li>
            <li><a href="#" className="text-sm hover:text-white">Trade Account</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm hover:text-white">Terms of Service</a></li>
            <li><a href="#" className="text-sm hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="text-sm hover:text-white">Shipping Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-orange-500" />
              <span>0800 123 4567</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-orange-500" />
              <span>sales@cementco.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CementCo Wholesale. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;