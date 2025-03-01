"use client";
import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const newsItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80&w=400&h=300',
    title: 'Global CO2 Levels Hit New Record',
    date: 'March 15, 2024',
    excerpt: 'Scientists warn of unprecedented rise in atmospheric carbon dioxide levels...',
    tag: 'Research',
    link: '/news/1',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=400&h=300',
    title: 'Renewable Energy Surpasses Coal',
    date: 'March 14, 2024',
    excerpt: 'Solar and wind power generation reaches historic milestone in energy sector...',
    tag: 'Energy',
    link: '/news/2',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?auto=format&fit=crop&q=80&w=400&h=300',
    title: 'Arctic Ice Reaches Historic Low',
    date: 'March 13, 2024',
    excerpt: 'Satellite data reveals concerning trends in polar ice coverage...',
    tag: 'Arctic',
    link: '/news/3',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&q=80&w=400&h=300',
    title: 'New Climate Policy Announced',
    date: 'March 12, 2024',
    excerpt: 'Major nations agree to strengthen emission reduction targets...',
    tag: 'Policy',
    link: '/news/4',
  },
];

export function NewsSection() {
  const router = useRouter();
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.news-card', {
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center+=100',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = sliderRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.8;
    gsap.to(container, {
      scrollLeft: direction === 'left' ? '-=' + scrollAmount : '+=' + scrollAmount,
      duration: 0.8,
      ease: 'power2.inOut',
    });
  };

  return (
    <section ref={containerRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">Latest Climate News</h2>
          <div className="flex gap-4">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              aria-label="Scroll left through news"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              aria-label="Scroll right through news"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div ref={sliderRef} className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="news-card flex-none w-[350px] sm:w-[300px] md:w-[350px] lg:w-[400px] bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-t-xl" />
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-500">{item.date}</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <button
                  onClick={() => router.push(item.link)}
                  className="text-green-600 font-semibold hover:text-green-700 transition-colors"
                  aria-label={`Read more about ${item.title}`}
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => router.push('/news')}
            className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors"
            aria-label="See all news articles"
          >
            See All News
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
