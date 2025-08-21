'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star, Zap, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
        <div>
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                            UNLEASH YOUR
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                                POTENTIAL
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Premium supplements engineered for champions. Science-backed formulas to fuel your transformation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/products">
                                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                                    Shop Now
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-200 bg-transparent">
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-orange-500/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-red-500/20 rounded-full animate-bounce"></div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SupesZone?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We're committed to delivering the highest quality supplements with proven results
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center group">
                            <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors duration-300">
                                <Shield className="h-10 w-10 text-orange-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Tested</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Every product undergoes rigorous third-party testing for purity, potency, and safety
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors duration-300">
                                <Zap className="h-10 w-10 text-orange-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Science-Backed</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Formulated with clinically researched ingredients at effective dosages
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors duration-300">
                                <Award className="h-10 w-10 text-orange-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Quality</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Made in FDA-registered facilities with the highest manufacturing standards
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Best Sellers Carousel */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Best Sellers</h2>
                        <p className="text-xl text-gray-600">Our most popular products trusted by thousands</p>
                    </div>

                    <div className="relative max-w-6xl mx-auto">
                        <div className="overflow-hidden rounded-2xl shadow-2xl">
                            <div
                                className="flex transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {bestSellers.map((product) => (
                                    <div key={product.id} className="w-full flex-shrink-0">
                                        <div className="bg-gradient-to-br from-white to-gray-50 p-8 md:p-12">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                                <div className="relative h-80 lg:h-96">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover rounded-xl shadow-lg"
                                                    />
                                                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                        Best Seller
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <div>
                                                        <h3 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h3>
                                                        <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className="h-5 w-5 fill-orange-400 text-orange-400" />
                                                        ))}
                                                        <span className="text-gray-600 ml-2">(4.9/5 from 1,234 reviews)</span>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                                                        <div className="space-x-3">
                                                            <Link href={`/products/${product.id}`}>
                                                                <Button variant="outline" size="lg" className="rounded-full">
                                                                    View Details
                                                                </Button>
                                                            </Link>
                                                            <Button
                                                                size="lg"
                                                                onClick={() => addItem(product)}
                                                                className="bg-orange-500 hover:bg-orange-600 rounded-full px-8"
                                                            >
                                                                Add to Cart
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full w-12 h-12"
                            onClick={prevSlide}
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full w-12 h-12"
                            onClick={nextSlide}
                        >
                            <ChevronRight className="h-6 w-6" />
                        </Button>

                        <div className="flex justify-center mt-8 space-x-3">
                            {bestSellers.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-4 h-4 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-orange-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    onClick={() => setCurrentSlide(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                            <p className="text-xl text-gray-600">Get answers to common questions about our products</p>
                        </div>

                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {faqs.map((faq) => (
                                <AccordionItem key={faq.id} value={faq.id} className="bg-white rounded-lg shadow-sm border-0">
                                    <AccordionTrigger className="text-left px-6 py-4 hover:no-underline hover:bg-gray-50 rounded-lg font-semibold text-lg">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>
        </div>
    );
}