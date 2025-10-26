import React, { useEffect, useMemo, useState } from 'react';

const ICONS = {
  Instagram: (props) => (
    <svg viewBox="0 0 24 24" fill="black" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <circle cx="17.5" cy="6.5" r="1"/>
    </svg>
  ),
  Twitter: (props) => (
    <svg viewBox="0 0 24 24" fill="black" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 8v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83"/>
    </svg>
  ),
  Linkedin: (props) => (
    <svg viewBox="0 0 24 24" fill="black" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  Github: (props) => (
    <svg viewBox="0 0 24 24" fill="black" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.34-3.37-1.34a2.65 2.65 0 0 0-1.11-1.47c-.91-.63.07-.62.07-.62a2.1 2.1 0 0 1 1.54 1.04a2.14 2.14 0 0 0 2.92.83a2.14 2.14 0 0 1 .64-1.34c-2.22-.25-4.56-1.11-4.56-4.93a3.86 3.86 0 0 1 1.03-2.67a3.57 3.57 0 0 1 .1-2.63s.84-.27 2.75 1.02a9.41 9.41 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02a3.57 3.57 0 0 1 .1 2.63a3.86 3.86 0 0 1 1.03 2.67c0 3.83-2.34 4.67-4.57 4.92a2.39 2.39 0 0 1 .68 1.86v2.76"/>
    </svg>
  ),
  Mail: (props) => (
    <svg viewBox="0 0 24 24" fill="black" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <path d="M22 6l-10 7L2 6"/>
    </svg>
  ),
  Globe: (props) => (
    <svg viewBox="0 0 24 24" fill="black" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10a15.3 15.3 0 0 1-4 10a15.3 15.3 0 0 1-4-10a15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Youtube: (props) => (
    <svg viewBox="0 0 24 24" fill="black" stroke="white" strokeWidth="1.5" aria-hidden="true" {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8a3 3 0 0 0 2.1 2.1C4.4 20.5 12 20.5 12 20.5s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
    </svg>
  ),
};

export default function ProfileLinks() {
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [radius, setRadius] = useState(200);
  const [centerHovered, setCenterHovered] = useState(false);
  const bubbleSize = 80;
  const centerSize = 224;

  useEffect(() => {
    const onResize = () => {
      const minSide = Math.min(window.innerWidth, window.innerHeight);
      const r = Math.max(150, Math.min(260, Math.floor(minSide * 0.28)));
      setRadius(r);
    };
    onResize();
    window.addEventListener('resize', onResize);
    setMounted(true);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const links = useMemo(() => ([
    { title: 'Instagram', url: 'https://instagram.com/kullaniciadi', icon: ICONS.Instagram, angle: 0, duration: 15 },
    { title: 'Twitter', url: 'https://twitter.com/kullaniciadi', icon: ICONS.Twitter, angle: 51, duration: 18 },
    { title: 'LinkedIn', url: 'https://linkedin.com/in/kullaniciadi', icon: ICONS.Linkedin, angle: 102, duration: 20 },
    { title: 'GitHub', url: 'https://github.com/kullaniciadi', icon: ICONS.Github, angle: 153, duration: 16 },
    { title: 'Email', url: 'mailto:your.email@example.com', icon: ICONS.Mail, angle: 204, duration: 19 },
    { title: 'Website', url: 'https://yourwebsite.com', icon: ICONS.Globe, angle: 255, duration: 17 },
    { title: 'YouTube', url: 'https://youtube.com/@kullaniciadi', icon: ICONS.Youtube, angle: 306, duration: 21 },
  ]), []);

  const getPosition = (angle, rad) => {
    const radian = (angle * Math.PI) / 180;
    return { x: Math.cos(radian) * rad, y: Math.sin(radian) * rad };
  };

  const driveId = '1X4hN1aXn2aiPl5HQDsNPXWgmTNHqolQW';
  const driveDirect = `https://drive.google.com/uc?export=download&id=${driveId}`;
  const drivePreview = `https://drive.google.com/file/d/${driveId}/preview`;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 overflow-hidden relative">
      <div className="relative z-10 flex items-center justify-center" style={{ width: radius * 2 + centerSize, height: radius * 2 + centerSize }}>
        <div
          className={`absolute w-56 h-56 rounded-full bg-black flex items-center justify-center border-4 border-white animate-center-move transition-all duration-500 ${
            centerHovered ? 'scale-110 shadow-[0_0_80px_30px_rgba(255,255,255,0.8)]' : 'scale-100 shadow-[0_0_40px_10px_rgba(255,255,255,0.4)]'
          }`}
          onMouseEnter={() => setCenterHovered(true)}
          onMouseLeave={() => setCenterHovered(false)}
        >
          <div className={`w-40 h-40 rounded-full overflow-hidden border-2 border-white transition-all duration-500 ${centerHovered ? 'scale-110' : 'scale-100'}`}>
            <video src={driveDirect} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            <noscript>
              <iframe src={drivePreview} className="w-full h-full" allow="autoplay" />
            </noscript>
          </div>
        </div>

        {links.map((link, i) => {
          const pos = getPosition(link.angle, radius);
          const Icon = link.icon;
          const isHovered = hoveredIndex === i;

          return (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="absolute group"
              style={{ left: '50%', top: '50%', transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`, width: 80, height: 80, opacity: mounted ? 1 : 0, transition: `opacity 0.6s ease ${i * 0.1}s` }}
              onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`w-full h-full rounded-full bg-black flex items-center justify-center border-2 border-white transition-all duration-500 relative overflow-hidden ${
                  isHovered ? 'scale-125 shadow-[0_0_80px_30px_rgba(255,255,255,0.8)]' : 'scale-100 shadow-[0_0_40px_10px_rgba(255,255,255,0.4)]'
                }`}
                style={{ animation: mounted ? `float ${link.duration}s ease-in-out infinite` : 'none', animationDelay: `${i * 0.2}s` }}
              >
                <div className={`transition-all duration-500 ${isHovered ? 'scale-110 brightness-200' : 'scale-100 brightness-100'}`}>
                  <Icon className="w-10 h-10 text-white transition-all duration-300 relative z-10" />
                </div>
              </div>
              <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-black px-3 py-1 rounded-lg text-sm font-medium shadow-md transition-all duration-200 border border-white ${
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
              }`}>{link.title}</div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
