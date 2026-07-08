import React from 'react';

interface BrandLogoProps {
  id: string;
  className?: string;
}

export default function BrandLogo({ id, className = "" }: BrandLogoProps) {
  const normalizedId = id.toLowerCase();

  // Common wrapper styling for consistent sizing and padding
  const wrapperClass = `inline-flex items-center justify-center w-10 h-10 p-2 rounded-xl bg-slate-900/60 border border-border/60 backdrop-blur-md shadow-premium-glass hover:border-teal/30 transition-colors ${className}`;

  switch (normalizedId) {
    case 'spotify':
      return (
        <span className={wrapperClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#1DB954]" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.894-.98-.336.075-.668-.135-.744-.47-.077-.337.135-.668.47-.745 3.856-.88 7.15-.502 9.82.13.297.18.388.566.208.86zm1.224-2.72c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.077-1.182-.413.125-.847-.107-.972-.52-.125-.413.108-.847.52-.972 3.67-1.114 8.24-.57 11.343 1.34.368.228.488.708.26 1.075zm.105-2.81c-3.26-1.937-8.636-2.115-11.75-1.17-.5.15-.1.9-.15 1.4-.152.5-.9.1-1.4.15-3.535-1.07-9.47-.853-13.12 1.345-.45.26-.1.85.09 1.3-.26.45-.85.09-1.3-.09z"/>
          </svg>
        </span>
      );

    case 'youtube-music':
    case 'yt-music':
      return (
        <span className={wrapperClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#FF0000" />
            <circle cx="12" cy="12" r="8" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <polygon points="10,8.5 16,12 10,15.5" fill="#FFFFFF" />
          </svg>
        </span>
      );

    case 'apple-music':
      return (
        <span className={wrapperClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="apple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FA233B" />
                <stop offset="100%" stopColor="#FB5C74" />
              </linearGradient>
            </defs>
            <rect width="24" height="24" rx="5" fill="url(#apple-grad)" />
            <path d="M16.5 7.5v5.3c0 1.8-1.2 2.7-2.7 2.7s-2.7-.9-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .7.1 1 .2V8.8l-5 1.1v4.9c0 1.8-1.2 2.7-2.7 2.7S4.5 16.6 4.5 14.8s1.2-2.7 2.7-2.7c.3 0 .7.1 1 .2V8.5L16.5 6v1.5z" fill="#FFFFFF" />
          </svg>
        </span>
      );

    case 'netflix':
      return (
        <span className={wrapperClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#E50914]" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 2h4l4.5 11.5V2h4.5v20h-4L10 10.5V22H5.5V2z"/>
          </svg>
        </span>
      );

    case 'prime-video':
    case 'prime':
      return (
        <span className={wrapperClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.2 16.2c-2.4 0-4.4-1.2-5.4-3.1.2-.1.5-.2.7-.3.8 1.4 2.4 2.3 4.2 2.3 1.9 0 3.5-.9 4.3-2.3.2.1.5.2.7.3-1 1.9-3 3.1-5.5 3.1zM5 11h14v2H5v-2z" fill="#00A8E8" />
          </svg>
        </span>
      );

    case 'disney-hotstar':
    case 'hotstar':
      return (
        <span className={wrapperClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="5" fill="#0A1128" />
            <path d="M12 3.5l1.8 3.6 4 1.1-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-1.1L12 3.5z" fill="#00E5FF" />
          </svg>
        </span>
      );

    case 'adobe-cc':
    case 'adobe':
      return (
        <span className={wrapperClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#FF0000]" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.7 2h7.8v20h-7.8zm-5.4 0H1.5v20h7.8zm2.7 6.4L17 19.3h-3.2l-1.8-4.4H8.4L6.6 19.3H3.4L8.4 8.4z"/>
          </svg>
        </span>
      );

    case 'figma':
      return (
        <span className={wrapperClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2c-2.209 0-4 1.791-4 4s1.791 4 4 4h4V2H8zm0 8c-2.209 0-4 1.791-4 4s1.791 4 4 4h4v-8H8zm8-8c-2.209 0-4 1.791-4 4v4h4c2.209 0 4-1.791 4-4s-1.791-4-4-4zm-4 8h4c2.209 0 4 1.791 4 4s-1.791 4-4 4h-4v-8zm0 8v4c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4h4z" fill="#1ABCFE" />
            <path d="M8 2c-2.209 0-4 1.791-4 4s1.791 4 4 4h4V2H8z" fill="#F24E1E" />
            <path d="M8 10c-2.209 0-4 1.791-4 4s1.791 4 4 4h4v-8H8z" fill="#A259FF" />
            <path d="M16 2c-2.209 0-4 1.791-4 4v4h4c2.209 0 4-1.791 4-4s-1.791-4-4-4z" fill="#FF7262" />
            <path d="M12 18h4c2.209 0 4-1.791 4-4s-1.791-4-4-4h-4v8z" fill="#0ACF83" />
          </svg>
        </span>
      );

    case 'github':
      return (
        <span className={wrapperClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        </span>
      );

    case 'linkedin-learning':
    case 'linkedin':
      return (
        <span className={wrapperClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#0A66C2]" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </span>
      );

    case 'apple-tv':
    case 'apple-tv-plus':
      return (
        <span className={wrapperClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="5" fill="#1A1A1A" />
            <path d="M12 5.5c-1.3 0-2.4.9-2.4 2.2 0 1.2 1 2 2.4 2 1.3 0 2.4-.8 2.4-2 0-1.3-1.1-2.2-2.4-2.2zm-4.5 4h9v1h-9v-1zm1.5 2.5c-.8 0-1.5.7-1.5 1.5v3h6v-3c0-.8-.7-1.5-1.5-1.5h-3z" fill="#FFFFFF" />
          </svg>
        </span>
      );

    case 'swiggy-one':
    case 'swiggy':
      return (
        <span className={wrapperClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#FC8019]" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.8 4.2C17.5 2.8 15.6 2 13.5 2c-3.1 0-5.8 1.8-7.1 4.5-.4.8-.6 1.8-.6 2.8 0 1.3.4 2.5 1.1 3.5l1.2-1.2c-.5-.7-.8-1.5-.8-2.3 0-2.4 2-4.4 4.4-4.4 1.7 0 3.2.9 4 2.4.3.5.4 1.1.4 1.7 0 2.1-1.5 3.9-3.5 4.3l.9 2.5c2.9-.6 5-3.1 5-6.2-.1-2-.9-3.9-2.3-5.3zM9.3 11c-1 .6-1.7 1.6-1.7 2.8 0 1.5 1 2.8 2.5 3.2L9.2 19c-2.3-.6-3.9-2.6-3.9-5 0-1 .3-1.9.9-2.7L9.3 11z"/>
          </svg>
        </span>
      );

    case 'zomato-gold':
    case 'zomato':
      return (
        <span className={wrapperClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#E23744]" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </span>
      );

    case 'jiosaavn':
    case 'saavn':
      return (
        <span className={wrapperClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#2BC87C]" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" />
            <path d="M8.5 16.5c1.9 0 3.5-1.6 3.5-3.5V7.5h3.5v-2h-5.5v7c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5c.3 0 .6.1.8.2v-2c-.3-.1-.5-.2-.8-.2-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5z" fill="#FFFFFF" />
          </svg>
        </span>
      );

    case 'gaana':
      return (
        <span className={wrapperClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#E72C30" />
            <path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6h-6V9h8c0-3.3-2.7-6-6-6z" fill="#FFFFFF" />
          </svg>
        </span>
      );

    case 'sonyliv':
    case 'sony':
      return (
        <span className={wrapperClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#E50914]" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="5" fill="#111" />
            <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fill="#FFC107" fontSize="8" fontWeight="bold" fontFamily="monospace">LIV</text>
          </svg>
        </span>
      );

    case 'zee5':
      return (
        <span className={wrapperClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="5" fill="#8E24AA" />
            <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fill="#FFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif">ZEE5</text>
          </svg>
        </span>
      );

    case 'blinkit-pass':
    case 'blinkit':
      return (
        <span className={wrapperClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="5" fill="#F4C430" />
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7 16h10c.8 0 1.5-.5 1.8-1.2l3-6.8c.3-.8-.3-1.6-1.1-1.6H5.2L4.3 4H1v2h2.3l3.6 7.6L5.5 16h1.5z" fill="#000" />
          </svg>
        </span>
      );

    default:
      // Fallback music/general service icon
      return (
        <span className={wrapperClass}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-teal" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2zm4 8h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
        </span>
      );
  }
}
