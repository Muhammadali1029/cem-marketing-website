// app/_components/sections/TestimonialsSection.tsx
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "CementCo is our go-to supplier. Their delivery is always on schedule, which is critical for our large-scale projects. Unbeatable reliability.",
    name: "John Carter",
    company: "BuildRight Construction",
  },
  {
    quote: "The quality of the cement is consistently high, and their bulk pricing has significantly improved our project margins. Highly recommended.",
    name: "Sarah Evans",
    company: "Apex Infrastructure",
  },
  {
    quote: "From quotation to delivery, the process is seamless. The team is professional and always ready to help with technical specifications.",
    name: "Mike Chen",
    company: "Urban Foundations Ltd.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl mb-12">
          Trusted by Industry Leaders
        </h2>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col aspect-square items-start justify-center p-6">
                      <p className="text-lg font-normal text-gray-700 mb-4">
                        &quot;{testimonial.quote}&quot;
                      </p>
                      <span className="font-semibold text-gray-900">{testimonial.name}</span>
                      <span className="text-sm text-orange-600">{testimonial.company}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;