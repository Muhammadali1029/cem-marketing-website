// app/_components/sections/CtaSection.tsx
import { ShinyButton } from "@/components/magicui/shiny-button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="w-full py-20 md:py-32 bg-gray-900">
      <div className="container mx-auto text-center px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
          Ready to Lay a Strong Foundation?
        </h2>
        <p className="mx-auto mt-4 max-w-[600px] text-gray-300 md:text-xl">
          Let's discuss your project requirements. Get a competitive, no-obligation quote from our team today.
        </p>
        <div className="mt-8">
          <ShinyButton>
            <span className="flex items-center gap-2">
              Request a Bulk Quote
              <ArrowRight className="h-4 w-4" />
            </span>
          </ShinyButton>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;