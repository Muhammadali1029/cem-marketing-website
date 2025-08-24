// app/_components/layout/Navbar.tsx
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-orange-600" />
          <span className="font-bold text-xl text-gray-900">CementCo</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#products" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">Products</a>
          <a href="#about" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">Why Us</a>
          <a href="#contact" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">Contact</a>
        </nav>
        <Button className="bg-orange-600 hover:bg-orange-700">
          Get a Bulk Quote
        </Button>
      </div>
    </header>
  );
};

export default Navbar;