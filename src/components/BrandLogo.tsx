import React from 'react';

interface BrandLogoProps {
  id: string;
  className?: string;
}

export default function BrandLogo({ id, className = "" }: BrandLogoProps) {
  const normalizedId = id.toLowerCase().trim();

  // Wrapper with refined premium styling
  const wrap = (svg: React.ReactNode, bgColor = "rgba(15,22,41,0.9)", lightBg = false) => (
    <span
      className={`inline-flex items-center justify-center w-10 h-10 rounded-2xl flex-shrink-0 transition-all duration-200 hover:scale-105 ${className}`}
      style={{
        background: bgColor,
        border: '1px solid rgba(30, 42, 69, 0.7)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      {svg}
    </span>
  );

  switch (normalizedId) {

    /* ── MUSIC ── */
    case 'spotify':
      return wrap(
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#1DB954]" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.894-.98-.336.075-.668-.135-.744-.47-.077-.337.135-.668.47-.745 3.856-.88 7.15-.502 9.82.13.297.18.388.566.208.86zm1.224-2.72c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.077-1.182-.413.125-.847-.107-.972-.52-.125-.413.108-.847.52-.972 3.67-1.114 8.24-.57 11.343 1.34.368.228.488.708.26 1.075zm.105-2.81c-3.26-1.937-8.636-2.115-11.75-1.17-.5.152-.103.9-.152 1.4-.152.5-.9.102-1.4-.152-3.535-1.07-9.47-.853-13.12 1.345-.45.26-.1.85.09 1.3z"/>
        </svg>,
        "rgba(10,16,10,0.95)"
      );

    case 'youtube-music':
    case 'yt-music':
      return wrap(
        <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#FF0000" />
          <circle cx="12" cy="12" r="7.5" fill="none" stroke="white" strokeWidth="1.5" />
          <polygon points="10,8.5 17,12 10,15.5" fill="white" />
        </svg>,
        "rgba(20,0,0,0.95)"
      );

    case 'apple-music':
      return wrap(
        <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="am-g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FC3C44" />
              <stop offset="100%" stopColor="#FF6D73" />
            </linearGradient>
          </defs>
          <rect width="24" height="24" rx="5.5" fill="url(#am-g)" />
          <path d="M16.5 7.5v5.3c0 1.8-1.2 2.7-2.7 2.7s-2.7-.9-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .7.1 1 .2V8.8l-5 1.1v4.9c0 1.8-1.2 2.7-2.7 2.7S4.5 16.6 4.5 14.8s1.2-2.7 2.7-2.7c.3 0 .7.1 1 .2V8.5L16.5 6v1.5z" fill="white" />
        </svg>,
        "rgba(20,5,5,0.95)"
      );

    case 'jiosaavn':
    case 'saavn':
      return wrap(
        <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#2BC87C" />
          <path d="M8.5 16.5c1.9 0 3.5-1.6 3.5-3.5V7.5h3.5v-2h-5.5v7c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5c.3 0 .6.1.8.2v-2c-.3-.1-.5-.2-.8-.2-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5z" fill="white" />
        </svg>,
        "rgba(5,20,10,0.95)"
      );

    case 'gaana':
      return wrap(
        <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#E72C30" />
          <path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6h-6V9h8c0-3.3-2.7-6-6-6z" fill="white" />
        </svg>,
        "rgba(20,5,5,0.95)"
      );

    /* ── STREAMING ── */
    case 'netflix':
      return wrap(
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#E50914]" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 2h4l4.5 11.5V2h4.5v20h-4L10 10.5V22H5.5V2z"/>
        </svg>,
        "rgba(20,2,2,0.95)"
      );

    case 'prime-video':
    case 'prime':
      return wrap(
        <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="5" fill="#00A8E0" />
          <path d="M3.5 14.5c2.5 1.5 5.5 2.5 8.5 2.5s6-1 8.5-2.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <polygon points="8.5,7 8.5,14 15.5,10.5" fill="white" />
        </svg>,
        "rgba(0,15,25,0.95)"
      );

    case 'disney-hotstar':
    case 'hotstar':
      return wrap(
        <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="5" fill="#0A1128" />
          <path d="M12 3.5l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6L12 3.5z" fill="#00E5FF" />
          <text x="12" y="21" textAnchor="middle" fill="#00A8E0" fontSize="5" fontWeight="bold" fontFamily="sans-serif">HOTSTAR</text>
        </svg>,
        "rgba(2,5,20,0.95)"
      );

    case 'sonyliv':
    case 'sony':
      return wrap(
        <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="5" fill="#111" />
          <text x="12" y="15" dominantBaseline="middle" textAnchor="middle" fill="#0078D7" fontSize="7" fontWeight="bold" fontFamily="sans-serif">SONY</text>
          <text x="12" y="20" dominantBaseline="middle" textAnchor="middle" fill="#FFC107" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif">LIV</text>
        </svg>,
        "rgba(5,5,10,0.95)"
      );

    case 'zee5':
      return wrap(
        <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="5" fill="#8E24AA" />
          <text x="12" y="15" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">ZEE5</text>
        </svg>,
        "rgba(15,5,20,0.95)"
      );

    case 'apple-tv':
    case 'apple-tv-plus':
      return wrap(
        <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="5" fill="#1C1C1E" />
          <text x="12" y="11" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">Apple</text>
          <text x="12" y="18" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif">TV+</text>
        </svg>,
        "rgba(10,10,12,0.95)"
      );

    /* ── FOOD / DELIVERY ── */
    case 'swiggy-one':
    case 'swiggy':
      return wrap(
        <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#FC8019" />
          <path d="M12 5c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 12c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" fill="white" />
          <circle cx="12" cy="12" r="2" fill="white" />
        </svg>,
        "rgba(20,10,0,0.95)"
      );

    case 'zomato-gold':
    case 'zomato':
      return wrap(
        <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#E23744" />
          <path d="M12 6.5c-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5 5.5-2.5 5.5-5.5-2.5-5.5-5.5-5.5zm0 9c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" fill="white" />
          <text x="12" y="22" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold" fontFamily="sans-serif">ZOMATO</text>
        </svg>,
        "rgba(22,3,4,0.95)"
      );

    case 'blinkit-pass':
    case 'blinkit':
      return wrap(
        <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="5" fill="#F4C430" />
          <path d="M7 17c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7 15h10c.8 0 1.5-.5 1.8-1.2l2.5-5.8H4.9L4 5H2v2h1.5l3.5 8H7z" fill="#1A1A1A" />
        </svg>,
        "rgba(20,16,0,0.95)"
      );

    /* ── DESIGN TOOLS ── */
    case 'adobe-cc':
    case 'adobe':
      return wrap(
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#FF0000]" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.7 2h7.8v20h-7.8zm-5.4 0H1.5v20h7.8zm2.7 6.4L17 19.3h-3.2l-1.8-4.4H8.4L6.6 19.3H3.4L8.4 8.4z"/>
        </svg>,
        "rgba(20,0,0,0.95)"
      );

    case 'figma':
      return wrap(
        <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2c-2.209 0-4 1.791-4 4s1.791 4 4 4h4V2H8z" fill="#F24E1E" />
          <path d="M8 10c-2.209 0-4 1.791-4 4s1.791 4 4 4h4v-8H8z" fill="#A259FF" />
          <path d="M12 18v4c0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4h-4z" fill="#0ACF83" />
          <path d="M16 2c-2.209 0-4 1.791-4 4v4h4c2.209 0 4-1.791 4-4s-1.791-4-4-4z" fill="#FF7262" />
          <path d="M12 10h4c2.209 0 4 1.791 4 4s-1.791 4-4 4h-4v-8z" fill="#1ABCFE" />
        </svg>,
        "rgba(5,5,5,0.95)"
      );

    /* ── DEV / PRODUCTIVITY ── */
    case 'github':
      return wrap(
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>,
        "rgba(5,5,8,0.95)"
      );

    case 'linkedin-learning':
    case 'linkedin':
      return wrap(
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#0A66C2]" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>,
        "rgba(0,10,20,0.95)"
      );

    default:
      // Fallback: generic plan icon with HPH brand colors
      return wrap(
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fallback-g" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="9" stroke="url(#fallback-g)" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="5.5" stroke="url(#fallback-g)" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2" fill="url(#fallback-g)" />
        </svg>,
        "rgba(10,15,30,0.95)"
      );
  }
}
