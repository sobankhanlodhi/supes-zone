'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { products, faqs } from '@/lib/data';
import { useCart } from '@/contexts/cart-context';

export default function HomePage() {
    const { addItem } = useCart();
    const [currentSlide, setCurrentSlide] = useState(0);

    const bestSellers = products.filter(product => product.isBestSeller);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % bestSellers.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [bestSellers.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % bestSellers.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + bestSellers.length) % bestSellers.length);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <section className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                    Premium Supplements
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Fuel your fitness journey with our scientifically-backed, high-quality supplements
                </p>
                <Link href="/products">
                    <Button size="lg" className="text-lg px-8 py-3">
                        Shop Now
                    </Button>
                </Link>
            </section>

            {/* Best Sellers Carousel */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8">Best Sellers</h2>
                <div className="relative max-w-4xl mx-auto">
                    <div className="overflow-hidden rounded-lg">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {bestSellers.map((product) => (
                                <div key={product.id} className="w-full flex-shrink-0">
                                    <Card className="mx-4">
                                        <CardHeader>
                                            <div className="relative h-64 mb-4">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover rounded-lg"
                                                />
                                            </div>
                                            <CardTitle>{product.name}</CardTitle>
                                            <CardDescription>{product.description}</CardDescription>
                                        </CardHeader>
                                        <CardFooter className="flex justify-between items-center">
                                            <span className="text-2xl font-bold">${product.price}</span>
                                            <div className="space-x-2">
                                                <Link href={`/products/${product.id}`}>
                                                    <Button variant="outline">View Details</Button>
                                                </Link>
                                                <Button onClick={() => addItem(product)}>
                                                    Add to Cart
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2"
                        onClick={prevSlide}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={nextSlide}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                    <div className="flex justify-center mt-4 space-x-2">
                        {bestSellers.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-primary' : 'bg-gray-300'
                                    }`}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                            <AccordionTrigger className="text-left">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent>
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </div>
    );
}