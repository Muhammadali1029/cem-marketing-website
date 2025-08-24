// app/_components/sections/FeaturesSection.tsx
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Truck, Award, ShieldCheck, Users } from "lucide-react";

const features = [
  {
    icon: <Truck className="h-10 w-10 text-orange-600" />,
    title: "Reliable & On-Time Delivery",
    description: "Our logistics network ensures your cement arrives on schedule, every time, keeping your project on track.",
  },
  {
    icon: <Award className="h-10 w-10 text-orange-600" />,
    title: "Superior Quality Assurance",
    description: "We provide only certified, high-strength cement that meets and exceeds all industry standards for performance.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-orange-600" />,
    title: "Competitive Bulk Pricing",
    description: "Benefit from our scale with transparent, competitive pricing for bulk orders, maximizing your project's budget.",
  },
  {
    icon: <Users className="h-10 w-10 text-orange-600" />,
    title: "Dedicated Expert Support",
    description: "Our experienced team is available to provide technical advice and support for all your construction needs.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-700">
            Why Choose Us
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            The Partner You Can Build On
          </h2>
          <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We're more than a supplier; we're a partner invested in the success of your project.
          </p>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="pt-2">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;