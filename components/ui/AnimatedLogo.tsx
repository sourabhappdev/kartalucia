"use client";

export default function AnimatedLogo() {
  return (
    <div className="relative flex h-24 w-24 items-center justify-center md:h-32 md:w-32">
      <style>{`
        .animated-logo-crack {
          position: absolute;
          width: 10%;
          aspect-ratio: 1;
          background-color: #fef3fc;
          clip-path: polygon(
            50% 0%,
            61% 35%,
            98% 35%,
            68% 57%,
            79% 91%,
            50% 70%,
            21% 91%,
            32% 57%,
            2% 35%,
            39% 35%
          );
          animation: animated-logo-rotate 6s infinite linear;
        }
        .animated-logo-crack2 {
          width: 12%;
          animation-delay: 1s;
        }
        .animated-logo-crack3 {
          width: 14%;
          animation-delay: 1.5s;
        }
        .animated-logo-crack4 {
          width: 16%;
          animation-delay: 2s;
        }
        .animated-logo-crack5 {
          width: 18%;
          animation-delay: 2.5s;
        }
        @keyframes animated-logo-rotate {
          to {
            rotate: 360deg;
          }
        }
      `}</style>
      <div className="animated-logo-crack" />
      <div className="animated-logo-crack animated-logo-crack2" />
      <div className="animated-logo-crack animated-logo-crack3" />
      <div className="animated-logo-crack animated-logo-crack4" />
      <div className="animated-logo-crack animated-logo-crack5" />
    </div>
  );
}
