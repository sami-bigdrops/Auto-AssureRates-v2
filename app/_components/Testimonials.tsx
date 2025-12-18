import { Star, CheckCircle2 } from "lucide-react";

const testimonials = [
    {
        name: "Fernando E.",
        address: "Hamden, Connecticut",
        testimonial: "The service truly made finding the right insurance easy and stress-free. Everything was straightforward and I felt supported from start to finish. I appreciate the genuine help I received throughout.",
        star: 5
    },
    {
        name: "Ankica B.",
        address: "Fairfax County, Virginia",
        testimonial: "I could tell the team really cares about their customers. They answered all my questions with patience and offered honest advice. It’s rare to find such trustworthy service these days.",
        star: 5
    },
    {
        name: "Jaymee H.",
        address: "Lakewood, Colorado",
        testimonial: "I am grateful for how simple and clear the process was. I felt valued as a customer and confident I was making the best choice for my needs. The support felt authentic every step of the way.",
        star: 5
    }
]

export default function Testimonials() {
    return (
        <section className="w-full bg-white py-8 px-3 md:py-12 lg:py-14 xl:px-0">
            <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-between gap-8 md:gap-10 lg:gap-12">
                <div className="w-full max-w-xl mx-auto space-y-3 text-center px-2 md:px-0">
                    <h2 className="text-3xl md:text-4xl font-semibold font-poppins leading-tight">
                        What People Say About{" "}
                        <span className="bg-linear-to-r from-[#00AEEF] to-[#3476DB] bg-clip-text text-transparent font-poppins">
                            AssureRates
                        </span>
                    </h2>
                </div>
                {/* Desktop Grid */}
                <div className='hidden lg:grid grid-cols-3 gap-8 w-full'>
                    {testimonials.map((testimonial, index) => (
                        <article key={index} className='bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex flex-col min-h-[280px]'>
                            <div className='flex items-center gap-1 mb-4'>
                                {[...Array(testimonial.star)].map((_, i) => (
                                    <Star key={i} className='w-4 h-4 fill-[#FFB800] text-[#FFB800]' />
                                ))}
                            </div>
                            <blockquote className='text-gray-800 text-base leading-relaxed mb-6 grow'>
                                &ldquo;{testimonial.testimonial}&rdquo;
                            </blockquote>
                            <footer className='text-sm mt-auto'>
                                <div className='flex items-center gap-2'>
                                    <p className='font-semibold text-gray-900'>{testimonial.name}</p>
                                    <CheckCircle2 className='w-4 h-4 text-[#1ABC9C]' />
                                </div>
                                <p className='text-gray-600'>{testimonial.address}</p>
                            </footer>
                        </article>
                    ))}
                </div>

                {/* Mobile/Tablet Horizontal Scroll */}
                <div className='lg:hidden overflow-x-auto scrollbar-hide w-full'>
                    <div className='flex gap-6 pb-4' style={{ width: 'max-content' }}>
                        {testimonials.map((testimonial, index) => (
                            <article key={index} className='bg-white rounded-lg p-6 shadow-sm border border-gray-200 min-w-[300px] max-w-[350px] shrink-0 flex flex-col min-h-[280px]'>
                                <div className='flex items-center gap-1 mb-4'>
                                    {[...Array(testimonial.star)].map((_, i) => (
                                        <Star key={i} className='w-4 h-4 fill-[#FFB800] text-[#FFB800]' />
                                    ))}
                                </div>
                                <blockquote className='text-gray-800 text-base leading-relaxed mb-6 grow'>
                                    &ldquo;{testimonial.testimonial}&rdquo;
                                </blockquote>
                                <footer className='text-sm mt-auto'>
                                    <div className='flex items-center gap-2'>
                                        <p className='font-semibold text-gray-900'>{testimonial.name}</p>
                                        <CheckCircle2 className='w-4 h-4 text-[#1ABC9C]' />
                                    </div>
                                    <p className='text-gray-600'>{testimonial.address}</p>
                                </footer>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}