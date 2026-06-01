"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: `${(i * 4) % 100}%`,
  top: `${(i * 7) % 100}%`,
  duration: 8 + (i % 5),
}));

export default function FloatingParticles() {
  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            opacity: 0.2,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
          }}
          style={{
            left: particle.left,
            top: particle.top,
          }}
          className="absolute h-2 w-2 rounded-full bg-red-500"
        />
      ))}
    </>
  );
}