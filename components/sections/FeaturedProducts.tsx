// app/_components/sections/FeaturedProducts.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; 
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Skeleton } from "@/components/ui/skeleton"
import Image from 'next/image';

// Define a type for your product for type safety
type Product = {
  id: string;
  name: string;
  description: string;
  price_per_bag: number;
  image_url: string; // Assuming you have an image_url column
  strength_class: string; // Example: '42.5N'
};

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        // Your provided Supabase query
        const { data, error } = await supabase
          .from('website_products')
          .select('*')
          .limit(3)
          .order('price_per_bag', { ascending: true });
        
        if (error) throw error;
        setFeaturedProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Optionally set an error state here
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <section id="products" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Featured Cement Products</h2>
          <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Top-grade cement solutions, perfect for any structural requirement.
          </p>
        </div>
        <div className="mx-auto mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            // Skeleton loaders for a better UX
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="w-full h-[250px]" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))
          ) : (
            // Render actual product cards
            featuredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <AspectRatio ratio={16 / 9}>
                   <Image
                      src={product.image_url || '/placeholder.svg'} // Use a placeholder if no image
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                </AspectRatio>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span>Strength Class:</span>
                    <span className="font-bold text-gray-900">{product.strength_class}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                    <div className="text-2xl font-bold text-orange-600">
                        ${product.price_per_bag.toFixed(2)}
                        <span className="text-sm font-normal text-gray-500"> / bag</span>
                    </div>
                  <Button className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;