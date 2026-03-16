"use client";

import { useState } from "react";
import Image from "next/image";
import SectionLabel from "./SectionLabel";

export default function LiveSet() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 max-w-4xl mx-auto">
      <SectionLabel>Madism Live Set</SectionLabel>
      <div className="relative aspect-video w-full overflow-hidden">
        {playing ? (
          <iframe
            src="https://www.youtube.com/embed/nls0oRHc3hk?autoplay=1"
            title="Madism Live Set"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full cursor-pointer group"
          >
            <Image
              src="/images/madism_youtube_thumbnail.PNG"
              alt="Madism @ Skylab Bangkok - Full DJ Live Set"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-colors">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] border-l-black ml-1" />
              </div>
            </div>
          </button>
        )}
      </div>
    </section>
  );
}
