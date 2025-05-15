'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ShapeProps {
  src: string;
  x: number;
  y: number;
  size: number;
  color: string;
  animate?: boolean;
  onClick?: () => void;
}

const Shape = ({ src, x, y, size, color, animate = false, onClick }: ShapeProps) => {
  const isFaceSmile = src === 'face-smile-svgrepo-com.svg';

  return (
    <motion.div
      initial={animate ? { y: 0, opacity: 0 } : undefined}
      animate={
        animate
          ? {
              y: [0, -15, 0],
              opacity: [0, 1, 1, 1], // fade in at start, then stay visible
            }
          : undefined
      }
      transition={
        animate
          ? {
              y: { duration: 6, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' },
              opacity: { duration: 3, ease: 'easeIn', delay: 0.2 },
            }
          : undefined
      }
      style={{
        position: 'absolute',
        width: size,
        height: size,
        left: x,
        top: y,
        pointerEvents: onClick ? 'auto' : 'none',
        filter: `drop-shadow(0 0 10px ${color})`,
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
    >
      <Image
        src={`/svg/${src}`}
        alt="Floating shape"
        width={size}
        height={size}
        className="w-full h-full object-contain"
        style={{
          filter: isFaceSmile
            ? `hue-rotate(280deg) drop-shadow(0 0 5px ${color}) opacity(0.9)`
            : `hue-rotate(200deg) opacity(0.85)`,
        }}
      />
    </motion.div>
  );
};

const FloatingShapes = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  // Ghost state for escape animation
  const [ghostEscaped, setGhostEscaped] = useState(false);
  // EyeSlash visibility
  const [eyeSlashVisible, setEyeSlashVisible] = useState(true);
  // Lightbulb color toggle
  const [lightOn, setLightOn] = useState(false);
  // Music notes toggle
  const [showNotes, setShowNotes] = useState(false);
  // Radio colors index
  const radioColors = ['#00BFFF', '#FF4500', '#32CD32', '#FFD700', '#FF69B4'];
  const [radioColorIndex, setRadioColorIndex] = useState(0);
  // Cloud drops count
  const [cloudDrops, setCloudDrops] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    setIsMounted(true);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) return null;

  // Angles up shape (static)
  const anglesUp = [
    {
      src: 'angles-up-svgrepo-com.svg',
      x: windowSize.width * 0.9,
      y: windowSize.height,
      size: 70,
      color: '#00BFFF',
    },
  ];

  // Face smiles in violet fading in/out
  const faceSmiles = [
    { src: 'face-smile-svgrepo-com.svg', x: 60, y: 50, size: 70, color: '#8A2BE2' }, // Violet
    { src: 'face-smile-svgrepo-com.svg', x: windowSize.width - 130, y: 60, size: 60, color: '#8A2BE2' },
    { src: 'face-smile-svgrepo-com.svg', x: 10, y: windowSize.height - 130, size: 70, color: '#8A2BE2' },
    { src: 'face-smile-svgrepo-com.svg', x: windowSize.width * 0.2, y: windowSize.height * 0.5, size: 55, color: '#8A2BE2' },
    { src: 'face-smile-svgrepo-com.svg', x: windowSize.width * 0.75, y: windowSize.height * 0.6, size: 70, color: '#8A2BE2' },
    { src: 'face-smile-svgrepo-com.svg', x: 100, y: windowSize.height * 0.75, size: 65, color: '#8A2BE2' },
    { src: 'face-smile-svgrepo-com.svg', x: windowSize.width - 140, y: windowSize.height * 0.8, size: 80, color: '#8A2BE2' },
  ];

  // Left side icons, smaller and in a vertical line with interactions
  const leftLineShapes = [
    {
      src: 'cloud-rain-alt-svgrepo-com.svg',
      x: 20,
      y: 50,
      size: 40,
      color: '#00BFFF',
      onClick: () => setCloudDrops((prev) => Math.min(prev + 3, 20)), // Increase drops on click, max 20
    },
    {
      src: 'eye-slash-svgrepo-com.svg',
      x: 20,
      y: 120,
      size: 40,
      color: '#00BFFF',
      onClick: () => setEyeSlashVisible(false), // Hide on click
    },
    {
      src: 'ghost-svgrepo-com.svg',
      x: 20,
      y: 180,
      size: 40,
      color: '#00BFFF',
      onClick: () => {
        setGhostEscaped(true);
        setTimeout(() => setGhostEscaped(false), 3000);
      }, // Escape animation
    },
    {
      src: 'lightbulb-alt-svgrepo-com.svg',
      x: 20,
      y: 240,
      size: 40,
      color: lightOn ? '#FFFF00' : '#00BFFF', // Yellow if on
      onClick: () => setLightOn((prev) => !prev),
    },
    {
      src: 'music-svgrepo-com.svg',
      x: 20,
      y: 300,
      size: 40,
      color: '#00BFFF',
      onClick: () => setShowNotes((prev) => !prev), // Toggle notes on click
    },
    {
      src: 'radio-svgrepo-com.svg',
      x: 20,
      y: 360,
      size: 40,
      color: radioColors[radioColorIndex],
      onClick: () => setRadioColorIndex((prev) => (prev + 1) % radioColors.length),
    },
  ];

  return (
    <div className="relative w-full h-full pointer-events-none">
      {anglesUp.map((shape, idx) => (
        <Shape key={`anglesUp-${idx}`} {...shape} />
      ))}

      {/* Face smiles with fade in/out animation */}
      {faceSmiles.map((shape, idx) => (
        <motion.div
          key={`faceSmile-${idx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            pointerEvents: 'none',
            filter: `drop-shadow(0 0 10px ${shape.color})`,
          }}
        >
          <Image
            src={`/svg/${shape.src}`}
            alt="Face smile"
            width={shape.size}
            height={shape.size}
            className="w-full h-full object-contain"
            style={{
              filter: `hue-rotate(280deg) drop-shadow(0 0 5px ${shape.color}) opacity(0.9)`,
            }}
          />
        </motion.div>
      ))}

      {/* Left line shapes with interaction */}
      {leftLineShapes.map((shape, idx) => {
        // Special ghost escape animation
        if (shape.src === 'ghost-svgrepo-com.svg' && ghostEscaped) {
          return (
            <motion.div
              key={`leftLine-${idx}`}
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: 300, opacity: 0 }}
              transition={{ duration: 3, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                left: shape.x,
                top: shape.y,
                width: shape.size,
                height: shape.size,
                pointerEvents: 'auto',
                filter: `drop-shadow(0 0 10px ${shape.color})`,
                cursor: 'pointer',
              }}
              onClick={shape.onClick}
            >
              <Image
                src={`/svg/${shape.src}`}
                alt="Ghost"
                width={shape.size}
                height={shape.size}
                className="w-full h-full object-contain"
                style={{ filter: `hue-rotate(200deg) opacity(0.85)` }}
              />
            </motion.div>
          );
        }

        // Eye slash disappears on click
        if (shape.src === 'eye-slash-svgrepo-com.svg' && !eyeSlashVisible) {
          return null;
        }

        // Cloud rain with drops on click
        if (shape.src === 'cloud-rain-alt-svgrepo-com.svg') {
          return (
            <div
              key={`leftLine-${idx}`}
              style={{
                position: 'absolute',
                left: shape.x,
                top: shape.y,
                width: shape.size,
                height: shape.size,
                pointerEvents: 'auto',
                cursor: 'pointer',
                filter: `drop-shadow(0 0 10px ${shape.color})`,
              }}
              onClick={shape.onClick}
            >
              <Image
                src={`/svg/${shape.src}`}
                alt="Cloud Rain"
                width={shape.size}
                height={shape.size}
                className="w-full h-full object-contain"
                style={{ filter: `hue-rotate(200deg) opacity(0.85)` }}
              />
              {/* Render drops as small circles below cloud */}
              <svg
                style={{
                  position: 'absolute',
                  top: shape.size * 0.9,
                  left: shape.size * 0.3,
                  width: shape.size,
                  height: shape.size,
                  pointerEvents: 'none',
                }}
              >
                {[...Array(cloudDrops)].map((_, i) => (
                  <circle
                    key={i}
                    cx={10 + i * 8}
                    cy={10 + (i % 2) * 5}
                    r={2}
                    fill="#00BFFF"
                    opacity={0.7}
                  />
                ))}
              </svg>
            </div>
          );
        }

        // Music notes emerging on click
        if (shape.src === 'music-svgrepo-com.svg') {
          return (
            <div
              key={`leftLine-${idx}`}
              style={{
                position: 'absolute',
                left: shape.x,
                top: shape.y,
                width: shape.size,
                height: shape.size,
                pointerEvents: 'auto',
                cursor: 'pointer',
                filter: `drop-shadow(0 0 10px ${shape.color})`,
              }}
              onClick={shape.onClick}
            >
              <Image
                src={`/svg/${shape.src}`}
                alt="Music"
                width={shape.size}
                height={shape.size}
                className="w-full h-full object-contain"
                style={{ filter: `hue-rotate(200deg) opacity(0.85)` }}
              />
              {showNotes && (
                <motion.div
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: -30, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
                  style={{
                    position: 'absolute',
                    left: shape.size * 0.7,
                    top: shape.size * 0.1,
                    color: '#00BFFF',
                    fontSize: 20,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  🎵
                </motion.div>
              )}
            </div>
          );
        }

        // Radio with changing colors
        if (shape.src === 'radio-svgrepo-com.svg') {
          return (
            <Shape
              key={`leftLine-${idx}`}
              {...shape}
              onClick={shape.onClick}
            />
          );
        }

        // Default shape rendering
        return <Shape key={`leftLine-${idx}`} {...shape} onClick={shape.onClick} />;
      })}
    </div>
  );
};

export default FloatingShapes;
