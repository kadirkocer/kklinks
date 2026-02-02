import React, { useEffect, useState, useCallback } from 'react';

// Premium SVG Icons with consistent styling
const ICONS = {
  Instagram: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  ),
  Twitter: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Linkedin: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Github: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  Mail: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  ),
  Globe: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Youtube: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

// Social links configuration - equally distributed around circle
const SOCIAL_LINKS = [
  { title: 'Instagram', url: 'https://www.instagram.com/kkadirkkocer/', icon: ICONS.Instagram, color: '#E4405F' },
  { title: 'YouTube', url: 'https://www.youtube.com/@kkadirkocer', icon: ICONS.Youtube, color: '#FF0000' },
  { title: 'LinkedIn', url: 'https://www.linkedin.com/in/kkadirkocer/', icon: ICONS.Linkedin, color: '#0A66C2' },
  { title: 'Website', url: 'https://kadirkocer.com', icon: ICONS.Globe, color: '#00D4FF' },
  { title: 'X', url: 'https://x.com/kkadirkocer', icon: ICONS.Twitter, color: '#FFFFFF' },
  { title: 'GitHub', url: 'https://github.com/kadirkocer', icon: ICONS.Github, color: '#FFFFFF' },
  { title: 'Email', url: 'mailto:kk@kadirkocer.com', icon: ICONS.Mail, color: '#34D399' },
];

export default function ProfileLinks() {
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [centerHovered, setCenterHovered] = useState(false);
  const [dimensions, setDimensions] = useState({
    radius: 140,
    iconSize: 56,
    iconInnerSize: 40,
    centerSize: 160,
  });

  const avatarVideo = `${import.meta.env.BASE_URL}video/kk.mp4`;

  // Calculate responsive dimensions
  const calculateDimensions = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const minDimension = Math.min(vw, vh);

    let radius, iconSize, iconInnerSize, centerSize;

    if (minDimension < 400) {
      // Mobile small
      centerSize = minDimension * 0.28;
      radius = minDimension * 0.25;
      iconSize = minDimension * 0.08;
      iconInnerSize = iconSize * 0.70;
    } else if (minDimension < 600) {
      // Mobile large
      centerSize = minDimension * 0.30;
      radius = minDimension * 0.26;
      iconSize = minDimension * 0.09;
      iconInnerSize = iconSize * 0.72;
    } else if (minDimension < 900) {
      // Tablet
      centerSize = minDimension * 0.26;
      radius = minDimension * 0.24;
      iconSize = minDimension * 0.08;
      iconInnerSize = iconSize * 0.75;
    } else {
      // Desktop
      centerSize = Math.min(200, minDimension * 0.20);
      radius = Math.min(140, minDimension * 0.18);
      iconSize = Math.min(56, minDimension * 0.06);
      iconInnerSize = iconSize * 0.72;
    }

    // Ensure minimum touch target size
    iconSize = Math.max(iconSize, 48);
    iconInnerSize = Math.max(iconSize * 0.70, 36);

    setDimensions({ radius, iconSize, iconInnerSize, centerSize });
  }, []);

  useEffect(() => {
    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);

    // Trigger mount animation
    const timer = setTimeout(() => setMounted(true), 100);

    return () => {
      window.removeEventListener('resize', calculateDimensions);
      clearTimeout(timer);
    };
  }, [calculateDimensions]);

  // Calculate position on circle - equal distribution
  const getPosition = (index, total) => {
    // Start from top (-90 degrees) and distribute evenly
    const angleStep = (2 * Math.PI) / total;
    const angle = -Math.PI / 2 + index * angleStep;
    return {
      x: Math.cos(angle) * dimensions.radius,
      y: Math.sin(angle) * dimensions.radius,
    };
  };

  const { radius, iconSize, iconInnerSize, centerSize } = dimensions;
  const containerSize = (radius + iconSize) * 2 + 40;

  return (
    <div
      className="w-full h-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 70%)',
      }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: containerSize * 1.5,
          height: containerSize * 1.5,
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          animation: 'ambient-glow 8s ease-in-out infinite',
        }}
      />

      {/* Main container */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: containerSize,
          height: containerSize,
          maxWidth: '100vw',
          maxHeight: '100vh',
        }}
      >
        {/* Center Avatar */}
        <div
          className="absolute z-10"
          style={{
            width: centerSize,
            height: centerSize,
            animation: mounted ? 'breathe 6s ease-in-out infinite' : 'none',
          }}
        >
          <div
            className="rounded-full overflow-hidden cursor-pointer w-full h-full"
            style={{
              transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: centerHovered ? 'scale(1.08)' : 'scale(1)',
            }}
            onMouseEnter={() => setCenterHovered(true)}
            onMouseLeave={() => setCenterHovered(false)}
          >
            <video
              src={avatarVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Gradient overlay on hover */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                opacity: centerHovered ? 1 : 0,
              }}
            />
          </div>
        </div>

        {/* Social Links - Orbital Icons */}
        {SOCIAL_LINKS.map((link, index) => {
          const pos = getPosition(index, SOCIAL_LINKS.length);
          const Icon = link.icon;
          const isHovered = hoveredIndex === index;
          const animationDelay = index * 0.8;

          return (
            <div
              key={link.title}
              className="absolute"
              style={{
                width: iconSize,
                height: iconSize,
                left: '50%',
                top: '50%',
                marginLeft: -iconSize / 2,
                marginTop: -iconSize / 2,
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                opacity: mounted ? 1 : 0,
                animation: mounted
                  ? `fade-in-up 0.6s ease-out ${index * 0.1}s backwards`
                  : 'none',
              }}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center group w-full h-full"
                style={{
                  animation: mounted
                    ? `orbital-float ${12 + index * 2}s ease-in-out ${animationDelay}s infinite`
                    : 'none',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
              {/* Icon */}
              <Icon
                style={{
                  width: iconInnerSize,
                  height: iconInnerSize,
                  color: isHovered ? link.color : 'rgba(255,255,255,0.85)',
                  transition: 'all 0.4s ease-out',
                  transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                  filter: isHovered ? `drop-shadow(0 0 8px ${link.color}60)` : 'none',
                }}
              />

              {/* Tooltip */}
              <div
                className="absolute whitespace-nowrap px-3 py-1.5 rounded-lg font-medium text-sm pointer-events-none transition-all duration-300 ease-out"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  color: '#000',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                  ...(pos.y < 0
                    ? { top: `calc(100% + 12px)` }
                    : { bottom: `calc(100% + 12px)` }
                  ),
                  left: '50%',
                  marginLeft: '-50%',
                  transformOrigin: pos.y < 0 ? 'top center' : 'bottom center',
                }}
              >
                {link.title}
                {/* Tooltip arrow */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"
                  style={{
                    ...(pos.y < 0
                      ? { top: '-4px' }
                      : { bottom: '-4px' }
                    ),
                  }}
                />
              </div>
            </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
