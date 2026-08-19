'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { RiTwitterXLine } from 'react-icons/ri';
import { motion, Variants } from 'framer-motion';

type Mode = 'light' | 'dark';

interface Testimonial {
  image?: string;
  name?: string;
  jobtitle?: string;
  text?: string;
  audio?: string;
  social?: string;
}

interface ComponentProps {
  mode: Mode;
  testimonials: Testimonial[];
}

const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

const NUM_BARS = 30;
// Round to 2 decimals so the SSR string and the client string are byte-identical.
// Math.sin isn't bit-identical across JS engines (Node vs mobile Safari/Chrome),
// so the raw float would differ in its low digits and trip a hydration mismatch.
const waveHeights = Array.from(
  { length: NUM_BARS },
  (_, i) => Math.round((seededRandom(i + 1) * 20 + 5) * 100) / 100
);
const waveVariants: Variants[] = Array.from({ length: NUM_BARS }, (_, i) => ({
  initial: {
    scaleY: 1.5,
    transition: { duration: 0.5 },
  },
  animate: {
    scaleY: [1, seededRandom(i + 100) * 1.2 + 1, 1],
    transition: {
      duration: seededRandom(i + 200) * 0.5 + 0.5,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: seededRandom(i + 300) * 0.5,
    },
  },
}));

export const Component: React.FC<ComponentProps> = ({ mode, testimonials }) => {
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);
  const [audioElements, setAudioElements] = useState<(HTMLAudioElement | null)[]>([]);

  // Circular scroller: render the list three times and keep the viewport
  // parked in the middle copy so scrolling either way loops seamlessly.
  const scrollRef = useRef<HTMLDivElement>(null);
  const segmentRef = useRef(0);
  const loopItems = [...testimonials, ...testimonials, ...testimonials];
  const drag = useRef({ down: false, startX: 0, startScroll: 0 });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || testimonials.length === 0) return;

    // Exact width of one copy, measured from layout so the wrap jump lands on
    // pixel-identical content (scrollWidth/3 drifts on sub-pixels and jitters).
    const measure = () => {
      const first = el.children[0] as HTMLElement | undefined;
      const nextCopy = el.children[testimonials.length] as HTMLElement | undefined;
      if (first && nextCopy) segmentRef.current = nextCopy.offsetLeft - first.offsetLeft;
    };

    const recenter = () => {
      measure();
      if (segmentRef.current > 0) el.scrollLeft = segmentRef.current;
    };
    const id = window.setTimeout(recenter, 0);

    const onScroll = () => {
      const seg = segmentRef.current;
      if (seg <= 0) return;
      let delta = 0;
      if (el.scrollLeft < seg * 0.5) delta = seg;
      else if (el.scrollLeft > seg * 1.5) delta = -seg;
      if (delta) {
        el.scrollLeft += delta;
        // Keep an in-progress drag consistent so it doesn't snap back.
        if (drag.current.down) drag.current.startScroll += delta;
      }
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);

    return () => {
      window.clearTimeout(id);
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, [testimonials.length]);

  // Drag-to-scroll for mouse users (touch/trackpad scroll natively).
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const el = scrollRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.down) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };

  const endDrag = () => {
    drag.current.down = false;
  };

  useEffect(() => {

    const elements: (HTMLAudioElement | null)[] = [];
    testimonials.forEach((testimonial) => {
      if (testimonial.audio) {
        const audio = new Audio(`/audio/${testimonial.audio}`);
        audio.addEventListener('ended', handleAudioEnded);
        elements.push(audio);
      } else {
        elements.push(null);
      }
    });
    setAudioElements(elements);

    
    return () => {
      elements.forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.removeEventListener('ended', handleAudioEnded);
        }
      });
    };
  }, [testimonials]);

  const handlePlay = (index: number) => {
    if (currentPlayingIndex !== null && currentPlayingIndex !== index) {
      stopAudio(currentPlayingIndex);
    }

    const audio = audioElements[index];
    if (audio) {
      audio.play().catch((error) => console.error('Audio playback error:', error));
      setCurrentPlayingIndex(index);
    }
  };

  const stopAudio = (index: number) => {
    const audio = audioElements[index];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setCurrentPlayingIndex(null);
    }
  };

  const handlePause = (index: number) => {
    stopAudio(index);
  };

  const handleAudioEnded = () => {
    setCurrentPlayingIndex(null);
  };

  const openInNewTab = (url: string) => {
    const win = window.open(url, '_blank');
    if (win) {
      win.focus();
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center pt-5">
        <div className="flex flex-col gap-5 mb-8">
          <span className="text-center text-4xl">Read what people are saying</span>
          <span className="text-center text-slate-300">
            Dummy feedback from virtual customers <br /> using our component library.
          </span>
        </div>
      </div>
      <div className="relative">
        <div
          ref={scrollRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="no-scrollbar flex cursor-grab gap-5 overflow-x-auto px-5 pb-4 active:cursor-grabbing"
        >
          {loopItems.map((testimonial, i) => {
            const index = i % testimonials.length;
            return (
            <div
              key={i}
              className={`${
                mode === 'dark' ? 'bg-black' : 'bg-white'
              } flex flex-col border border-zinc-400 w-80 h-[340px] rounded-2xl p-5 relative shrink-0 overflow-hidden`}>
              <div onClick={() => openInNewTab(testimonial.social || '')} className="absolute top-5 right-5">
                <RiTwitterXLine
                  className={`${mode === 'dark' ? 'text-white' : 'text-slate-800'} cursor-pointer`}
                  size={20}
                />
              </div>
              <div className="flex items-center">
                <Image
                  src={testimonial.image || 'https://via.placeholder.com/50'}
                  alt="profile"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="flex flex-col pl-4">
                  <span className={`${mode === 'dark' ? 'text-white' : 'text-black'}`}>{testimonial.name}</span>
                  <span className={`${mode === 'dark' ? 'text-zinc-300' : 'text-zinc-600'} text-sm`}>
                    {testimonial.jobtitle}
                  </span>
                </div>
              </div>
              <div className={`mt-5 mb-1 line-clamp-4 ${mode === 'dark' ? 'text-slate-200' : 'text-black'}`}>
                {testimonial.text}
              </div>
              <div className={`${mode === 'dark'? 'bg-zinc-200' : 'bg-slate-100'}  w-full h-12 mt-auto shrink-0 rounded-lg flex justify-between items-center p-2 relative`}>
                {currentPlayingIndex !== index ? (
                  <span onClick={() => handlePlay(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${mode === 'dark'? 'text-zinc-900' : 'text-slate-600'} size-10 `}>
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                      />
                    </svg>
                  </span>
                ) : (
                  <span onClick={() => handlePause(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${mode === 'dark'? 'text-zinc-900' : 'text-slate-600'} size-10 `}>
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z"
                      />
                    </svg>
                  </span>
                )}
                <div className="flex">
                  {waveVariants.map((variant, i) => (
                    <motion.div
                      key={i}
                      className={`${mode === 'dark'? 'bg-zinc-900' : 'bg-slate-600'}`}
                      style={{
                        width: '3px',
                        height: `${waveHeights[i]}px`,
                        margin: '0 2px',
                        borderRadius: '2px',
                      }}
                      variants={variant}
                      initial="initial"
                      animate={currentPlayingIndex === index ? 'animate' : 'initial'}
                    />
                  ))}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
