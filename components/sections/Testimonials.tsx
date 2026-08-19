"use client";

import { Component } from "@/components/ui/voice-testimonial";

const testimonials = [
  {
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Ethan Smith",
    jobtitle: "Software Engineer",
    text: "This component library is incredibly versatile. It saved me hours of development time. The voice testimonials are a brilliant addition!",
    social: "https://twitter.com/ethansmithdev",
  },
  {
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Olivia Chen",
    jobtitle: "Product Manager",
    text: "The seamless integration and intuitive design of these components are truly impressive. Our users love the new audio testimonials!",
    social: "https://twitter.com/oliviachenpm",
  },
  {
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Liam Johnson",
    jobtitle: "UX Designer",
    text: "As a UX designer, I appreciate the attention to detail. The audio feature adds a new dimension to testimonials, making them more engaging.",
    social: "https://twitter.com/liamjohnsonux",
  },
  {
    image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Ava Martinez",
    jobtitle: "Marketing Specialist",
    text: "This library is a game-changer for our marketing efforts. The voice testimonials have significantly boosted our conversion rates!",
    social: "https://twitter.com/avamarketing",
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a6dd7228f2d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Noah Williams",
    jobtitle: "Full Stack Developer",
    text: "Developing with these components is a breeze. The documentation is clear, and the audio testimonials offer a unique user experience.",
    social: "https://twitter.com/noahwdev",
  },
  {
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Sophia Brown",
    jobtitle: "Content Creator",
    text: "The voice testimonial component is fantastic! It makes our content more dynamic and engaging. Highly recommend it to others.",
    social: "https://twitter.com/sophiacreates",
  },
  {
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "James Davis",
    jobtitle: "Startup Founder",
    text: "As a startup, efficiency is key. This component library provides high-quality, ready-to-use solutions. The audio testimonials are a standout.",
    social: "https://twitter.com/jamesdfounder",
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Benjamin Miller",
    jobtitle: "Backend Engineer",
    text: "Solid components and excellent performance. The voice testimonials integrate smoothly and provide a rich user experience.",
    social: "https://twitter.com/benmillerdev",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{ background: "var(--canvas)", paddingTop: "var(--section-gap)" }}
    >
      <Component
        mode="dark"
        testimonials={testimonials.map((t) => ({ ...t, audio: "test.wav" }))}
      />
    </section>
  );
}
