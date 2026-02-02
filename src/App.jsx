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

// PGP Public Key
const PGP_PUBLIC_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----

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
FNj6dvg=
=hMnB
-----END PGP PUBLIC KEY BLOCK-----`;

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
  const [copied, setCopied] = useState(false);
  const [dimensions, setDimensions] = useState({
    radius: 140,
    iconSize: 56,
    iconInnerSize: 40,
    centerSize: 160,
  });
  const videoRef = React.useRef(null);

  const avatarVideo = `${import.meta.env.BASE_URL}video/kk.mp4`;

  // Calculate responsive dimensions
  const calculateDimensions = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const minDimension = Math.min(vw, vh);

    let radius, iconSize, iconInnerSize, centerSize;

    if (minDimension < 400) {
      // Mobile small - Video daha büyük, ikonlar daha küçük
      centerSize = minDimension * 0.38;  // 0.28 → 0.38 (daha büyük video)
      radius = minDimension * 0.32;      // 0.25 → 0.32 (daha geniş orbit)
      iconSize = minDimension * 0.12;    // 0.08 → 0.12
      iconInnerSize = iconSize * 0.60;   // 0.70 → 0.60 (ikon içi daha küçük)
    } else if (minDimension < 600) {
      // Mobile large
      centerSize = minDimension * 0.35;  // 0.30 → 0.35
      radius = minDimension * 0.30;      // 0.26 → 0.30
      iconSize = minDimension * 0.11;    // 0.09 → 0.11
      iconInnerSize = iconSize * 0.62;   // 0.72 → 0.62
    } else if (minDimension < 900) {
      // Tablet
      centerSize = minDimension * 0.28;  // 0.26 → 0.28
      radius = minDimension * 0.26;      // 0.24 → 0.26
      iconSize = minDimension * 0.10;    // 0.08 → 0.10
      iconInnerSize = iconSize * 0.65;   // 0.75 → 0.65
    } else {
      // Desktop
      centerSize = Math.min(200, minDimension * 0.20);
      radius = Math.min(140, minDimension * 0.18);
      iconSize = Math.min(56, minDimension * 0.06);
      iconInnerSize = iconSize * 0.72;
    }

    // Minimum touch target - mobilde daha küçük tolerans
    iconSize = Math.max(iconSize, 42);  // 48 → 42
    iconInnerSize = Math.max(iconSize * 0.60, 28);  // 0.70, 36 → 0.60, 28

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

  // Force video autoplay on mobile
  useEffect(() => {
    if (videoRef.current) {
      const playVideo = async () => {
        try {
          await videoRef.current.play();
        } catch (err) {
          console.log('Autoplay prevented:', err);
        }
      };
      playVideo();
    }
  }, []);

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

  // Copy PGP key to clipboard
  const copyPGP = async () => {
    try {
      await navigator.clipboard.writeText(PGP_PUBLIC_KEY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy PGP key:', err);
    }
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
            onClick={copyPGP}
          >
            <video
              ref={videoRef}
              src={avatarVideo}
              muted
              loop
              autoPlay
              playsInline
              webkit-playsinline="true"
              preload="auto"
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

          {/* Copy notification */}
          <div
            className="absolute pointer-events-none transition-all duration-300"
            style={{
              bottom: '-60px',
              left: '50%',
              transform: `translateX(-50%) ${copied ? 'translateY(0)' : 'translateY(-10px)'}`,
              opacity: copied ? 1 : 0,
              background: 'rgba(255,255,255,0.95)',
              color: '#000',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            PGP Key Copied!
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
