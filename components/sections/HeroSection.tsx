// app/_components/sections/HeroSection.tsx
'use client';

import { Button } from "@/components/ui/button";
import  {AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { TextAnimate } from "@/components/magicui/text-animate";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
       <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.3}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(ellipse_at_center,white,transparent_100%)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      <div className="container z-10 px-4 text-center">
        <TextAnimate
            animation="blurInUp"
            by="word"
            delay={0.1}
            duration={0.5}
            className="text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl"
            >
            The Foundation of Your Success. Delivered.
        </TextAnimate>
        <p className="mx-auto mt-4 max-w-[700px] text-gray-600 md:text-xl">
          High-quality wholesale cement for major construction projects. Reliable supply, competitive pricing, and on-time delivery.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
            Browse All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            Open a Trade Account
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;