import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
  strength?: number;
  onHoverChange?: (isHovered: boolean) => void;
}

export function MagneticButton({
  href,
  onClick,
  target,
  rel,
  className = '',
  children,
  strength = 0.35,
  onHoverChange,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
    onHoverChange?.(false);
  };

  const content = (
    <div
      className="spin-inner px-8 py-5 flex items-center justify-center gap-4 text-zinc-300 group-hover:text-white"
      style={{
        transform: `translate3d(${position.x * 0.3}px, ${position.y * 0.3}px, 0)`,
        transition: isHovered
          ? 'transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)'
          : 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
    >
      {children}
    </div>
  );

  const containerStyles: React.CSSProperties = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: isHovered
      ? 'transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)'
      : 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  };

  if (href) {
    return (
      <div
        ref={btnRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`spin-border block select-none ${className}`}
        style={containerStyles}
      >
        <a
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className="w-full h-full block cursor-none"
        >
          {content}
        </a>
      </div>
    );
  }

  return (
    <div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role="button"
      tabIndex={0}
      className={`spin-border block select-none cursor-none ${className}`}
      style={containerStyles}
    >
      {content}
    </div>
  );
}
