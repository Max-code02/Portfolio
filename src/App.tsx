/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Globe, Sparkles } from 'lucide-react';
import { MagneticButton } from './components/MagneticButton';
import { ProjectsModal } from './components/ProjectsModal';
import { PROJECTS } from './data/projects';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rawMouse, setRawMouse] = useState({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  
  // Card-specific interactive glare coordinates
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardGlare, setCardGlare] = useState({
    x: 0,
    y: 0,
    xPct: 50,
    yPct: 50,
    angle: 135,
    opacity: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 3D Rotation Values for screen parallax
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });

      // Raw Pixels for custom cursor tracking
      setRawMouse({ x: e.clientX, y: e.clientY });

      // Compute Holo-Glare coordinates relative to card
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const cardX = e.clientX - rect.left;
        const cardY = e.clientY - rect.top;
        const xPct = Math.max(0, Math.min(100, (cardX / rect.width) * 100));
        const yPct = Math.max(0, Math.min(100, (cardY / rect.height) * 100));

        // Calculate angle from card center to cursor
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rad = Math.atan2(cardY - centerY, cardX - centerX);
        const deg = (rad * 180) / Math.PI + 90;

        const isInsideOrNear =
          e.clientX >= rect.left - 50 &&
          e.clientX <= rect.right + 50 &&
          e.clientY >= rect.top - 50 &&
          e.clientY <= rect.bottom + 50;

        setCardGlare({
          x: cardX,
          y: cardY,
          xPct,
          yPct,
          angle: deg,
          opacity: isInsideOrNear ? 0.9 : 0,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#030303] text-white font-sans antialiased flex items-center justify-center p-4 sm:p-8 cursor-none selection:bg-[#00ffd5]/20 selection:text-white">
      
      {/* 1. Infinite Background Marquee Layer */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none flex flex-col justify-between py-10 overflow-hidden text-[#00ffd5] font-black text-6xl md:text-[10rem] tracking-tighter uppercase select-none">
        <div className="marquee-wrapper">
          <span className="px-8">MAX & BLOCK // CREATIVE DEVELOPERS // </span>
          <span className="px-8">MAX & BLOCK // CREATIVE DEVELOPERS // </span>
          <span className="px-8">MAX & BLOCK // CREATIVE DEVELOPERS // </span>
        </div>
        <div className="marquee-wrapper" style={{ animationDirection: 'reverse', animationDuration: '40s' }}>
          <span className="px-8">CODE TOGETHER // ADVANCED CSS // </span>
          <span className="px-8">CODE TOGETHER // ADVANCED CSS // </span>
          <span className="px-8">CODE TOGETHER // ADVANCED CSS // </span>
        </div>
      </div>

      {/* 2. Custom Cursor / Dynamic Magnet Trail */}
      <div 
        className={`fixed top-0 left-0 rounded-full border border-[#00ffd5] pointer-events-none z-50 mix-blend-difference transition-all duration-100 ease-out flex items-center justify-center ${
          cursorHovered ? 'w-14 h-14 bg-[#00ffd5]/10 border-2' : 'w-8 h-8'
        }`}
        style={{ 
          transform: `translate(${rawMouse.x - (cursorHovered ? 28 : 16)}px, ${rawMouse.y - (cursorHovered ? 28 : 16)}px)` 
        }}
      >
        {cursorHovered && (
          <div className="w-1.5 h-1.5 rounded-full bg-[#00ffd5] animate-ping" />
        )}
      </div>
      <div 
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#ff00c8] pointer-events-none z-50 transition-transform duration-200 ease-out"
        style={{ transform: `translate(${rawMouse.x - 4}px, ${rawMouse.y - 4}px)` }}
      />
      
      {/* 3. Liquid Blob Morphing Orbs */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-transform duration-[200ms] ease-out will-change-transform"
        style={{ transform: `translate(${mousePos.x * -50}px, ${mousePos.y * -50}px)` }}
      >
        <div className="absolute top-[10%] left-[15%] w-[40rem] h-[40rem] bg-[#00ffd5]/10 mix-blend-screen blur-[100px] liquid-blob" />
        <div className="absolute bottom-[5%] right-[15%] w-[45rem] h-[45rem] bg-[#ff00c8]/10 mix-blend-screen blur-[120px] liquid-blob" style={{ animationDelay: '-4s' }} />
      </div>

      {/* 4. The Glassmorphic 3D Card Container with Holo Glare */}
      <div className="relative z-10 perspective-[2000px] w-full max-w-5xl">
        <div
          ref={cardRef}
          className="glass-card glow-card w-full rounded-[2.5rem] sm:rounded-[3rem] p-10 sm:p-16 preserve-3d transition-transform duration-200 ease-out will-change-transform flex flex-col items-center text-center"
          style={{ 
            transform: `rotateX(${mousePos.y * 14}deg) rotateY(${mousePos.x * -14}deg)`,
            '--card-mouse-x': `${cardGlare.x}px`,
            '--card-mouse-y': `${cardGlare.y}px`,
            '--card-mouse-x-pct': `${cardGlare.xPct}%`,
            '--card-mouse-y-pct': `${cardGlare.yPct}%`,
            '--glare-angle': `${cardGlare.angle}deg`,
            '--glare-opacity': cardGlare.opacity,
          } as React.CSSProperties}
        >
          {/* Ultra-subtle Micro Specular Pin-Light Reflection */}
          <div className="micro-glare" />
          
          {/* 3D Extruding & Filling Typography Title */}
          <div className="translate-z-40 mb-10 mt-2 relative z-10 cursor-default">
            <h1 className="text-6xl sm:text-8xl md:text-[8rem] font-black tracking-tighter text-extrude text-outline relative z-10 group">
              MAX & BLOCK
            </h1>
          </div>

          {/* Professional Subtitle with translate-Z depth */}
          <div className="translate-z-30 mb-16 w-full flex flex-col items-center z-10 cursor-default">
            <p className="text-zinc-400 max-w-2xl mx-auto text-xl sm:text-2xl font-medium leading-relaxed tracking-wide">
              A collaborative portfolio. Every project, design, and line of code showcased here is built by the two of us as a unified team.
            </p>
          </div>

          {/* Action Links with Glowing Magnetic Pull Buttons */}
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center translate-z-40 w-full z-10 mt-2">
            
            {/* Magnetic GitHub Button */}
            <MagneticButton
              href="https://github.com/Max-code02" 
              target="_blank" 
              rel="noreferrer" 
              className="w-full md:w-auto group"
              strength={0.38}
              onHoverChange={setCursorHovered}
            >
              <Github className="w-8 h-8 transition-transform duration-500 group-hover:-translate-y-1" />
              <span className="font-bold text-xl tracking-wide">
                @Max-code02
              </span>
            </MagneticButton>

            {/* Magnetic Websites Button */}
            <MagneticButton
              onClick={() => setIsProjectsModalOpen(true)}
              className="w-full md:w-auto group"
              strength={0.38}
              onHoverChange={setCursorHovered}
            >
              <Globe className="w-8 h-8 transition-transform duration-500 group-hover:rotate-12" />
              <div className="flex flex-col items-start text-left">
                <span className="font-bold text-xl tracking-wide flex items-center gap-2">
                  Our Websites
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#00ffd5]/20 text-[#00ffd5] border border-[#00ffd5]/40">
                    {PROJECTS.length}
                  </span>
                </span>
              </div>
              <ExternalLink className="w-6 h-6 ml-2 opacity-40 group-hover:opacity-100 transition-opacity" />
            </MagneticButton>

          </div>
        </div>
      </div>

      {/* 5. Projects Showcase Modal */}
      <ProjectsModal
        isOpen={isProjectsModalOpen}
        onClose={() => setIsProjectsModalOpen(false)}
        onHoverChange={setCursorHovered}
      />
    </div>
  );
}
