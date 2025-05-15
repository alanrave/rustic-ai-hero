'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ShapeProps {
  src: string;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
  scale: number;
}

const Shape = ({ src, initialX, initialY, duration, delay, scale }: ShapeProps) => {
  return (
    <motion.div
      initial={{ x: initialX, y: initialY, scale: scale, opacity: 0.7 }}
      animate={{
        x: [initialX, initialX + Math.random() * 30 - 15, initialX],
        y: [initialY, initialY + Math.random() * 30 - 15, initialY],
        opacity: [0.7, 0.9, 0.7],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay: delay,
      }}
      className="absolute pointer-events-none"
      style={{ width: `${scale * 100}px`, height: `${scale * 100}px` }}
    >
      <Image
        src={`/svg/${src}`}
        alt="Floating shape"
        width={scale * 100}
        height={scale * 100}
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};

const FloatingShapes = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    setIsMounted(true);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) return null;

  // Define shapes with responsive positioning
  const shapes = [
  {
    src: 'angles-up-svgrepo-com.svg',
    initialX: windowSize.width * 0.90,
    initialY: windowSize.height * 0.43,
    duration: 7,
    delay: 0.0,
    scale: 0.3,
  },
  {
    src: 'christmas-candle-svgrepo-com.svg',
    initialX: windowSize.width * 0.36,
    initialY: windowSize.height * 0.50,
    duration: 8,
    delay: 0.8,
    scale: 0.6,
  },
  {
    src: 'cloud-rain-alt-svgrepo-com.svg',
    initialX: windowSize.width * 0.44,
    initialY: windowSize.height * 0.23,
    duration: 9,
    delay: 0.6,
    scale: 0.8,
  },
  {
    src: 'eye-slash-svgrepo-com.svg',
    initialX: windowSize.width * 0.88,
    initialY: windowSize.height * 0.83,
    duration: 8,
    delay: 0.9,
    scale: 0.5,
  },
  {
    src: 'face-smile-svgrepo-com.svg',
    initialX: windowSize.width * 0.65,
    initialY: windowSize.height * 0.02,
    duration: 7,
    delay: 0.8,
    scale: 0.4,
  },
  {
    src: 'ghost-svgrepo-com.svg',
    initialX: windowSize.width * 0.47,
    initialY: windowSize.height * 0.93,
    duration: 7,
    delay: 0.9,
    scale: 0.6,
  },
  {
    src: 'lightbulb-alt-svgrepo-com.svg',
    initialX: windowSize.width * 0.85,
    initialY: windowSize.height * 0.90,
    duration: 7,
    delay: 0.9,
    scale: 0.5,
  },
  {
    src: 'music-svgrepo-com.svg',
    initialX: windowSize.width * 0.15,
    initialY: windowSize.height * 0.07,
    duration: 8,
    delay: 0.8,
    scale: 0.7,
  },
  {
    src: 'radio-svgrepo-com.svg',
    initialX: windowSize.width * 0.47,
    initialY: windowSize.height * 0.61,
    duration: 9,
    delay: 0.1,
    scale: 0.5,
  }
];
  return (
    <div className="shapes-container">
      {shapes.map((shape, index) => (
        <Shape
          key={index}
          src={shape.src}
          initialX={shape.initialX}
          initialY={shape.initialY}
          duration={shape.duration}
          delay={shape.delay}
          scale={shape.scale}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;