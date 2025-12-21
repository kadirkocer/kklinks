import React, { useEffect, useMemo, useState } from 'react';

const ICONS = {
  Instagram: (props) => (
    <svg viewBox="0 0 24 24" fill="black" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  ),
  Twitter: (props) => (
    <svg viewBox="0 0 24 24" fill="black" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 8v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83" />
    </svg>
  ),
  Linkedin: (props) => (
    <svg viewBox="0 0 24 24" fill="black" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Github: (props) => (
    <svg viewBox="0 0 24 24" fill="black" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.34-3.37-1.34a2.65 2.65 0 0 0-1.11-1.47c-.91-.63.07-.62.07-.62a2.1 2.1 0 0 1 1.54 1.04a2.14 2.14 0 0 0 2.92.83a2.14 2.14 0 0 1 .64-1.34c-2.22-.25-4.56-1.11-4.56-4.93a3.86 3.86 0 0 1 1.03-2.67a3.57 3.57 0 0 1 .1-2.63s.84-.27 2.75 1.02a9.41 9.41 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02a3.57 3.57 0 0 1 .1 2.63a3.86 3.86 0 0 1 1.03 2.67c0 3.83-2.34 4.67-4.57 4.92a2.39 2.39 0 0 1 .68 1.86v2.76" />
    </svg>
  ),
  Mail: (props) => (
    <svg viewBox="0 0 24 24" fill="black" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  ),
  Globe: (props) => (
    <svg viewBox="0 0 24 24" fill="black" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10a15.3 15.3 0 0 1-4 10a15.3 15.3 0 0 1-4-10a15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Youtube: (props) => (
    <svg viewBox="0 0 24 24" fill="black" stroke="white" strokeWidth="1.5" aria-hidden="true" {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8a3 3 0 0 0 2.1 2.1C4.4 20.5 12 20.5 12 20.5s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  ),
};

export default function ProfileLinks() {
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [radius, setRadius] = useState(200);
  const [iconSize, setIconSize] = useState(80);
  const [centerSize, setCenterSize] = useState(224);
  const [iconInnerSize, setIconInnerSize] = useState(40);
  const [centerHovered, setCenterHovered] = useState(false);
  const avatarVideo = `${import.meta.env.BASE_URL}video/kk.MOV`;

  useEffect(() => {
    const onResize = () => {
      const minSide = Math.min(window.innerWidth, window.innerHeight);

      // Calculate all sizes based on screen size
      let r, iSize, cSize, iiSize;

      if (minSide < 400) {
        // Very small screens (mobile portrait)
        r = Math.floor(minSide * 0.25);
        iSize = Math.max(44, Math.floor(minSide * 0.12)); // Min 44px for touch
        cSize = Math.floor(minSide * 0.35);
        iiSize = Math.floor(iSize * 0.45);
      } else if (minSide < 600) {
        // Small screens (mobile landscape, small tablets)
        r = Math.floor(minSide * 0.28);
        iSize = Math.floor(minSide * 0.13);
        cSize = Math.floor(minSide * 0.38);
        iiSize = Math.floor(iSize * 0.5);
      } else if (minSide < 900) {
        // Medium screens (tablets)
        r = Math.floor(minSide * 0.30);
        iSize = Math.floor(minSide * 0.11);
        cSize = Math.floor(minSide * 0.32);
        iiSize = Math.floor(iSize * 0.5);
      } else {
        // Large screens (desktop)
        r = Math.min(260, Math.floor(minSide * 0.28));
        iSize = 80;
        cSize = 224;
        iiSize = 40;
      }

      setRadius(r);
      setIconSize(iSize);
      setCenterSize(cSize);
      setIconInnerSize(iiSize);
    };
    onResize();
    window.addEventListener('resize', onResize);
    setMounted(true);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const links = useMemo(
    () => [
      { title: 'Instagram', url: 'https://www.instagram.com/kkadirkkocer/', icon: ICONS.Instagram, angle: 0, duration: 15 },
      { title: 'YouTube', url: 'https://www.youtube.com/@kkadirkocer', icon: ICONS.Youtube, angle: 51, duration: 21 },
      { title: 'LinkedIn', url: 'https://www.linkedin.com/in/kkadirkocer/', icon: ICONS.Linkedin, angle: 102, duration: 20 },
      { title: 'Website', url: 'https://kadirkocer.com', icon: ICONS.Globe, angle: 153, duration: 17 },
      { title: 'X (Twitter)', url: 'https://x.com/kkadirkocer', icon: ICONS.Twitter, angle: 204, duration: 18 },
      { title: 'GitHub', url: 'https://github.com/kadirkocer', icon: ICONS.Github, angle: 255, duration: 16 },
      { title: 'Email', url: 'mailto:kk@kadirkocer.com', icon: ICONS.Mail, angle: 306, duration: 19 },
    ],
    []
  );

  const getPosition = (angle, rad) => {
    const radian = (angle * Math.PI) / 180;
    return { x: Math.cos(radian) * rad, y: Math.sin(radian) * rad };
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden relative">
      <div className="relative z-10 flex items-center justify-center" style={{
        width: Math.min(radius * 2 + centerSize + 80, window.innerWidth - 32),
        height: Math.min(radius * 2 + centerSize + 80, window.innerHeight - 32)
      }}>
        <div
          className={`absolute rounded-full overflow-hidden animate-center-move transition-all duration-500 ${
            centerHovered ? 'scale-110 shadow-[0_0_80px_30px_rgba(255,255,255,0.8)]' : 'scale-100 shadow-[0_0_40px_10px_rgba(255,255,255,0.4)]'
          }`}
          style={{
            width: centerSize,
            height: centerSize,
          }}
          onMouseEnter={() => setCenterHovered(true)}
          onMouseLeave={() => setCenterHovered(false)}
        >
          <video src={avatarVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
        </div>

        {links.map((link, i) => {
          const pos = getPosition(link.angle, radius);
          const Icon = link.icon;
          const isHovered = hoveredIndex === i;

          return (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute group"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                width: iconSize,
                height: iconSize,
                minWidth: '44px',
                minHeight: '44px',
                opacity: mounted ? 1 : 0,
                transition: `opacity 0.6s ease ${i * 0.1}s`,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`w-full h-full rounded-full bg-black flex items-center justify-center border-2 border-white transition-all duration-500 relative overflow-hidden ${
                  isHovered ? 'scale-125 shadow-[0_0_80px_30px_rgba(255,255,255,0.8)]' : 'scale-100 shadow-[0_0_40px_10px_rgba(255,255,255,0.4)]'
                }`}
                style={{ animation: mounted ? `float ${link.duration}s ease-in-out infinite` : 'none', animationDelay: `${i * 0.2}s` }}
              >
                <div className={`transition-all duration-500 ${isHovered ? 'scale-110 brightness-200' : 'scale-100 brightness-100'}`}>
                  <Icon
                    style={{ width: iconInnerSize, height: iconInnerSize }}
                    className="text-white transition-all duration-300 relative z-10"
                  />
                </div>
              </div>
              <div
                className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-black px-3 py-1.5 rounded-lg font-medium shadow-lg transition-all duration-200 border border-white ${
                  isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
                style={{
                  fontSize: Math.max(12, Math.floor(iconSize * 0.18)),
                  bottom: pos.y < 0 ? 'auto' : `${-iconSize * 0.35}px`,
                  top: pos.y < 0 ? `${-iconSize * 0.35}px` : 'auto',
                }}
              >
                {link.title}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-white"
                  style={{
                    top: pos.y < 0 ? 'auto' : '-4px',
                    bottom: pos.y < 0 ? '-4px' : 'auto',
                    borderWidth: pos.y < 0 ? '0 1px 1px 0' : '1px 0 0 1px',
                  }}
                />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
