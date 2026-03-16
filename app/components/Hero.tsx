"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const scrollY = window.scrollY;
      const opacity = Math.max(1 - scrollY / 500, 0);
      const translateY = scrollY * -0.3;
      contentRef.current.style.opacity = String(opacity);
      contentRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero.jpg"
        alt="Madism performing live"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-6">
        {/* Wordmark logo */}
        <Image
          src="/images/madism-logo-white.png"
          alt="MADISM"
          width={600}
          height={120}
          className="mx-auto mb-6 w-[280px] md:w-[400px] lg:w-[520px] h-auto"
        />

        {/* Tagline */}
        <p className="text-[#999999] text-sm md:text-base tracking-[0.15em] uppercase mb-2">
          Mad About Life · Mad About Music · Mad About You
        </p>

        {/* Availability line */}
        <p className="text-[#999999] text-xs md:text-sm tracking-wide mb-10">
          Available for Bookings Worldwide
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/downloads/Madism_EPK_V5.pdf"
            download
            className="border border-white text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
          >
            Download EPK
          </a>
          {/* TODO: Confirm booking email */}
          <a
            href="mailto:bookings@madism.com"
            className="bg-white text-black px-8 py-3 text-sm uppercase tracking-wider hover:bg-[#999999] transition-colors"
          >
            Contact Email
          </a>
        </div>
      </div>
    </section>
  );
}
