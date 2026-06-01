"use client";

import { useEffect, useState } from "react";

export default function Eye() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      setPosition({
        x: (e.clientX - centerX) / 40,
        y: (e.clientY - centerY) / 40,
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMove
      );
  }, []);

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

      {/* Eye */}

      <div
        className="
          relative
          h-[260px]
          w-[520px]
          rounded-full
          border
          border-red-500/40
          backdrop-blur
        "
      >

        {/* Iris */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-40
            w-40
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-red-700
            blur-md
          "
        />

        {/* Pupil */}

        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-24
            w-24
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-black
            transition-all
            duration-75
          "
        />

        {/* Reflection */}

        <div
          className="
            absolute
            left-[52%]
            top-[42%]
            h-6
            w-6
            rounded-full
            bg-white/80
          "
        />

      </div>

    </div>
  );
}