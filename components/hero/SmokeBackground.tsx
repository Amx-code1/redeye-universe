"use client";

import { motion } from "framer-motion";

export default function SmokeBackground() {
  return (
    <>
      <motion.div
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
        }}
        className="
          absolute
          h-[900px]
          w-[900px]
          rounded-full
          bg-red-700/10
          blur-[200px]
        "
      />

      <motion.div
        animate={{
          x: [100, -100, 100],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
        className="
          absolute
          right-0
          h-[700px]
          w-[700px]
          rounded-full
          bg-red-500/10
          blur-[160px]
        "
      />
    </>
  );
}