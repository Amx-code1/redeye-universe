"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
        x: (e.clientX - centerX) / 18,
        y: (e.clientY - centerY) / 18,
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
    <div
      className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        z-10
        -translate-x-1/2
        -translate-y-1/2
      "
    >
      {/* Outer Aura */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[700px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-red-600/10
          blur-[180px]
        "
      />

      {/* Eye Shape */}

      <div
        className="
          relative
          h-[260px]
          w-[520px]
          overflow-hidden
          rounded-[100%]
          border
          border-red-500/40
          bg-black/20
          backdrop-blur-md
        "
      >
        {/* Top Lid Glow */}

        <div
          className="
            absolute
            left-0
            top-0
            h-1/2
            w-full
            bg-gradient-to-b
            from-red-500/20
            to-transparent
          "
        />

        {/* Bottom Lid Glow */}

        <div
          className="
            absolute
            bottom-0
            left-0
            h-1/2
            w-full
            bg-gradient-to-t
            from-red-500/10
            to-transparent
          "
        />

        {/* Crystal Ring 1 */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-52
            w-52
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-red-500/20
          "
        />

        {/* Crystal Ring 2 */}

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-64
            w-64
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-red-500/10
          "
        />

        {/* Iris */}

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-44
            w-44
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-gradient-to-br
            from-red-300
            via-red-600
            to-red-950
            shadow-[0_0_80px_rgba(239,68,68,0.8)]
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
            h-28
            w-28
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-black
            shadow-[0_0_40px_rgba(0,0,0,0.8)]
            transition-all
            duration-75
          "
        />

        {/* Inner Crystal Core */}

        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-8
            w-8
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-red-500
            blur-md
          "
        />

        {/* Reflection */}

        <div
          className="
            absolute
            left-[54%]
            top-[42%]
            h-6
            w-6
            rounded-full
            bg-white/90
            blur-[1px]
          "
        />
      </div>
    </div>
  );
}