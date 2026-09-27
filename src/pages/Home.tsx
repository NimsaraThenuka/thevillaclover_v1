import { useEffect, useState, useCallback, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { VILLA_IMAGES } from '../data/villaImages';
import { NEARBY_PLACES } from '../data/nearbyPlaces';
import {
  Car,
  Wifi,
  Plane,
  Users,
  Wind,
  Trees,
  ShieldCheck,
  Sunrise,
  Star,
  MapPin,
  Home as HomeIcon,
  HeartHandshake,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
  Compass,
  Sparkles,
} from 'lucide-react';
import VillaVideoPlayer from '../components/VillaVideoPlayer';

interface HomeProps {
  onNavigate: (page: string, extra?: string) => void;
  scrollToSection?: string | null;
}

const reviews = [
  {
    quote: "Our family had a wonderful stay. It's a beautiful, peaceful and comfortable place, perfect for a family getaway. The villa was very clean and well maintained, with everything we needed for a relaxing stay.",
    author: 'Kalana',
    country: 'Australia · August 2026',
  },
  {
    quote: "An absolute oasis in Galle! The rooftop at sunset was magical, and the peaceful morning with birds singing made our Sri Lanka holiday truly unforgettable. Ganidu was an exceptional host.",
    author: 'Sophie & Liam',
    country: 'United Kingdom · November 2026',
  },
  {
    quote: "Spotless modern villa with fantastic air conditioning, super fast WiFi, and a fully equipped kitchen. Just 10 minutes to Galle Fort by tuk-tuk. Outstanding value, peace, and serenity.",
    author: 'Alexander Weber',
    country: 'Germany · January 2026',
  },
  {
    quote: "We loved the tropical garden and the swing by the water. The bedrooms were spacious with luxurious beds, and having the entire private property to ourselves gave us complete peace of mind.",
    author: 'Elena Rostova',
    country: 'Russia · February 2026',
  },
  {
    quote: "Perfect 10/10 experience. Sparkling clean, stylish interior design, and delicious hot tea upon arrival. The rooftop lounge with fairy lights in the evening is pure romance.",
    author: 'Matteo Rossi',
    country: 'Italy · December 2025',
  },
  {
    quote: "Travelled with our family, and everyone fell in love with The Villa Clover. Safe, quiet, beautifully furnished, and top-tier Sri Lankan hospitality. We will definitely come back!",
    author: 'Priya & Rohan',
    country: 'India · October 2025',
  },
];

const amenities = [
  { icon: Car, label: 'Free Parking' },
  { icon: Wifi, label: 'Free WiFi' },
  { icon: Plane, label: 'Airport Hire' },
  { icon: Users, label: 'Family Rooms' },
  { icon: Wind, label: '1 AC & 1 Non-AC Room' },
  { icon: Trees, label: 'Garden & Rooftop' },
  { icon: ShieldCheck, label: 'Safety Lockers' },
  { icon: Sunrise, label: 'Lush Garden View' },
];

export default function Home({ onNavigate, scrollToSection }: HomeProps) {
  useScrollReveal();
  const [currentReview, setCurrentReview] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (scrollToSection) {
      const timer = setTimeout(() => {
        const el = document.getElementById(scrollToSection);
        if (el) {
          const yOffset = -85;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [scrollToSection]);

  const changeReview = useCallback((newIndex: number) => {
    setCurrentReview(newIndex);
  }, []);

  const nextReview = useCallback(() => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  }, []);

  const prevReview = useCallback(() => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextReview();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextReview]);

  // ── NEARBY PLACES MULTI-CARD CAROUSEL ──
  const [placesIndex, setPlacesIndex] = useState(0);
  const [visiblePlacesCount, setVisiblePlacesCount] = useState(3);
  const [isPlacesPaused, setIsPlacesPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisiblePlacesCount(1);
      } else if (width < 1024) {
        setVisiblePlacesCount(2);
      } else {
        setVisiblePlacesCount(3);
      }
    };
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const maxPlacesIndex = Math.max(0, NEARBY_PLACES.length - visiblePlacesCount);

  const nextPlace = useCallback(() => {
    setPlacesIndex((prev) => (prev >= maxPlacesIndex ? 0 : prev + 1));
  }, [maxPlacesIndex]);

  const prevPlace = useCallback(() => {
    setPlacesIndex((prev) => (prev <= 0 ? maxPlacesIndex : prev - 1));
  }, [maxPlacesIndex]);

  // Automatic smooth advance with guaranteed loop
  useEffect(() => {
    if (isPlacesPaused) return;

    const interval = setInterval(() => {
      nextPlace();
    }, 3800);

    return () => clearInterval(interval);
  }, [isPlacesPaused, nextPlace]);

  const handleNav = (page: string, extra?: string) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    onNavigate(page, extra);
  };

  return (
    <div className="page-enter">
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-between pt-22 sm:pt-28 pb-5 sm:pb-8 px-4 sm:px-6 overflow-hidden"
        style={{
          background: '#0d1b2a',
          clipPath: 'inset(0)',
        }}
      >
        {/* Background image - Fixed Parallax Window (Image stays fixed while content scrolls over it smoothly) */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('${VILLA_IMAGES.hero}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            filter: 'brightness(0.65)',
            willChange: 'transform',
          }}
        />
        {/* Gradient overlays - Fixed to remain synchronized with background */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(13,27,42,0.65) 0%, rgba(13,27,42,0.42) 40%, rgba(13,27,42,0.8) 100%)',
          }}
        />
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(13,27,42,0.45) 100%)',
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 text-center w-full max-w-4xl mx-auto my-auto pt-1 sm:pt-4 md:pt-6 px-3 flex flex-col items-center">
          <p
            className="section-label mb-2 sm:mb-3 md:mb-4 text-[11px] sm:text-xs md:text-sm tracking-[0.25em] md:tracking-[0.3em]"
            style={{ color: '#c9a96e' }}
          >
            Galle, Sri Lanka
          </p>

          <h1
            className="hero-title mb-2.5 sm:mb-4 md:mb-5 max-w-full px-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.35rem, 6.5vw, 6.2rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            The <br className="sm:hidden" />Villa Clover
          </h1>

          <div className="gold-divider mx-auto mb-2.5 sm:mb-4 md:mb-6" style={{ width: '45px' }} />

          <p
            className="text-amber-200/95 mb-2 sm:mb-2.5 md:mb-3 text-xs sm:text-sm md:text-base font-light tracking-[0.12em] uppercase max-w-full px-2"
            style={{
              fontFamily: 'Inter, sans-serif',
            }}
          >
            The entire place is yours
          </p>

          <p
            className="text-white/80 mb-4 sm:mb-6 md:mb-8 max-w-sm sm:max-w-lg mx-auto text-xs sm:text-sm md:text-[15px] leading-relaxed px-2 font-light"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            A private 2-bedroom luxury villa offering modern comfort, lush gardens, and authentic Sri Lankan hospitality in peaceful Galle.
          </p>

          {/* Action Buttons - Perfectly balanced & never cropped on mobile */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center items-center w-full max-w-[240px] sm:max-w-none mx-auto">
            <button
              onClick={() => handleNav('booking')}
              className="btn-gold w-full sm:w-auto text-xs py-2.5 px-6 sm:py-3.5 sm:px-9"
            >
              Book Your Stay
            </button>
            <button
              onClick={() => handleNav('gallery')}
              className="btn-outline w-full sm:w-auto text-xs py-2.5 px-6 sm:py-3.5 sm:px-9"
            >
              View Gallery
            </button>
          </div>

          {/* Rating badge - Compact & Centered */}
          <div
            className="mt-3.5 sm:mt-8 inline-flex items-center gap-3 sm:gap-4 px-3.5 py-1.5 sm:px-7 sm:py-3 rounded-sm max-w-[280px] sm:max-w-none"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(201,169,110,0.3)',
            }}
          >
            <div className="text-center">
              <p className="font-semibold text-lg sm:text-2xl md:text-[2rem] text-[#c9a96e] leading-none" style={{ fontFamily: "Inter, sans-serif" }}>10.0</p>
              <p className="text-white/60 text-[9px] sm:text-xs tracking-widest uppercase mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>Exceptional</p>
            </div>
            <div className="h-6 sm:h-9 md:h-10" style={{ width: '1px', background: 'rgba(201,169,110,0.3)' }} />
            <div className="text-left">
              <p className="text-white text-xs sm:text-sm font-medium leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>Top-rated villa</p>
              <p className="text-white/50 text-[10px] sm:text-xs mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>Verified guest reviews</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator - Responsive: Mobile Touch Animation vs PC Mouse Animation */}
        <button
          onClick={() => {
            const el = document.getElementById('amenities-section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="relative z-20 mt-2 sm:mt-6 mb-12 sm:mb-2 flex flex-col items-center gap-1 sm:gap-1.5 group cursor-pointer text-amber-300/80 hover:text-amber-300 transition-all duration-300 select-none"
          aria-label="Scroll down to explore"
        >
          {/* Mobile View Scroll Indicator (< md) */}
          <div className="flex md:hidden flex-col items-center gap-1">
            <span
              className="text-[9.5px] font-medium tracking-[0.2em] uppercase text-white/75 group-hover:text-amber-300 transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Scroll to Explore
            </span>
            <div className="w-6 h-6 rounded-full border border-amber-300/50 bg-amber-300/10 backdrop-blur-xs flex items-center justify-center shadow-[0_0_15px_rgba(201,169,110,0.25)] group-hover:border-amber-300 group-hover:bg-amber-300/20 transition-all">
              <ChevronDown className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
            </div>
          </div>

          {/* Desktop / PC View Scroll Indicator (>= md) - Exact Mouse Wheel */}
          <div className="hidden md:flex flex-col items-center gap-1.5">
            <span
              className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/70 group-hover:text-amber-300 transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Scroll to Explore
            </span>
            <div className="w-5 h-8 rounded-full border border-amber-300/50 flex items-start justify-center p-1 backdrop-blur-xs bg-white/5 shadow-[0_0_15px_rgba(201,169,110,0.15)] group-hover:border-amber-300 group-hover:shadow-[0_0_20px_rgba(201,169,110,0.3)] transition-all">
              <div className="w-1 h-2 rounded-full bg-amber-300 animate-scroll-wheel" />
            </div>
            <ChevronDown className="w-4 h-4 text-amber-300/70 -mt-0.5 animate-bounce group-hover:text-amber-300 transition-colors" />
          </div>
        </button>
      </section>

      {/* ── AMENITIES BAR ── */}
      <section id="amenities-section" style={{ background: '#0d1b2a', borderBottom: '1px solid rgba(201,169,110,0.15)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
            {amenities.map((a, i) => {
              const IconComponent = a.icon;
              return (
                <div
                  key={a.label}
                  className={`reveal delay-${Math.min(i * 100, 600)} flex flex-col items-center gap-2.5 text-center`}
                >
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-amber-300 bg-white/5 border border-amber-300/20 shadow-sm">
                    <IconComponent className="w-5 h-5 text-amber-300" />
                  </div>
                  <p className="text-white/70 text-xs tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {a.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INTRO ABOUT ── */}
      <section className="py-28 px-6 lg:px-12" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <p className="section-label mb-5">About The Villa</p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                  fontWeight: 400,
                  color: '#0d1b2a',
                  lineHeight: 1.15,
                  marginBottom: '1.5rem',
                }}
              >
                Where Comfort Meets<br />
                <em>Sri Lankan Warmth</em>
              </h2>
              <div className="gold-divider mb-8" />
              <p className="text-gray-600 leading-relaxed mb-5" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                The Villa Clover in Galle offers a scenic rooftop and a lush garden. Guests can relax in the outdoor spaces, enjoy sunbeds and a hammock, and experience free WiFi throughout the property.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                The villa features two bedrooms and a living room. Both bedrooms include queen beds, safety lockers, iron & iron board, and washing machine access, with sunbeds and a hammock in the garden. Bedroom 1 is equipped with air conditioning, while Bedroom 2 is a non-AC room  perfect for families, couples, or small groups seeking a quiet retreat.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-10">
                {[
                  { label: 'Two Queen Beds', sub: '2 comfortable bedrooms' },
                  { label: 'Galle Fort', sub: '2.8 km to Galle Fort' },
                  { label: 'Private Villa', sub: 'Entire place is yours' },
                  { label: 'Jungle Beach & Rumassala', sub: '2.8 km away' },
                ].map((stat) => (
                  <div key={stat.label} className="border-l-2 pl-4" style={{ borderColor: '#c9a96e' }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: '#0d1b2a', fontWeight: 500 }}>
                      {stat.label}
                    </p>
                    <p className="text-gray-400 text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{stat.sub}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => handleNav('about')} className="btn-primary">
                Discover More
              </button>
            </div>

            <div className="reveal-right relative">
              <div className="img-zoom" style={{ borderRadius: '2px' }}>
                <img
                  src={VILLA_IMAGES.introExterior}
                  alt="The Villa Clover garden and veranda"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-64 sm:h-80 md:h-[420px] lg:h-[500px] object-cover"
                />
              </div>
              {/* Floating card */}
              <div
                className="absolute -bottom-8 -left-8 p-6 hidden lg:block"
                style={{
                  background: '#0d1b2a',
                  border: '1px solid rgba(201,169,110,0.3)',
                  minWidth: '220px',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
                  <span className="font-semibold" style={{ fontFamily: "Inter, sans-serif", fontSize: '1.7rem', color: 'white' }}>10.0</span>
                </div>
                <p className="text-white/80 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  "Beautiful, peaceful and comfortable place"
                </p>
                <p className="text-white/40 text-xs mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>— Kalana, Australia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <section className="py-28 px-6 lg:px-12" style={{ background: '#f8f5f0' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="section-label mb-4">Visual Journey</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 400,
                color: '#0d1b2a',
                lineHeight: 1.2,
              }}
            >
              Experience The Villa Clover
            </h2>
            <div className="gold-divider mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                url: VILLA_IMAGES.rooftopNight,
                alt: 'Rooftop night lounge',
                span: 'col-span-2 lg:col-span-2 lg:row-span-2',
                heightClass: 'h-56 sm:h-72 lg:h-full lg:min-h-[490px]',
              },
              {
                url: VILLA_IMAGES.bedroom1,
                alt: 'Master bedroom with teak furniture',
                span: 'col-span-1',
                heightClass: 'h-36 sm:h-48 lg:h-[235px]',
              },
              {
                url: VILLA_IMAGES.livingRoom,
                alt: 'Air conditioned living room',
                span: 'col-span-1',
                heightClass: 'h-36 sm:h-48 lg:h-[235px]',
              },
              {
                url: VILLA_IMAGES.kitchen,
                alt: 'Fully equipped modern kitchen',
                span: 'col-span-1',
                heightClass: 'h-36 sm:h-48 lg:h-[235px]',
              },
              {
                url: VILLA_IMAGES.gardenSwing,
                alt: 'Tropical garden swing',
                span: 'col-span-1',
                heightClass: 'h-36 sm:h-48 lg:h-[235px]',
              },
            ].map((img, i) => (
              <div
                key={img.url}
                onClick={() => handleNav('gallery')}
                className={`gallery-item img-zoom reveal-scale delay-${Math.min(i * 100, 400)} ${img.span} ${img.heightClass} cursor-pointer rounded-xs overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300`}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <button onClick={() => handleNav('gallery')} className="btn-primary">
              View Full Gallery
            </button>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="py-28 px-6 lg:px-12" style={{ background: '#0d1b2a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="section-label mb-4">Why Choose Us</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 400,
                color: 'white',
              }}
            >
              Property Highlights
            </h2>
            <div className="gold-divider mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: 'Perfect Location',
                desc: 'Set in a peaceful residential neighbourhood, 10 minutes from historic Galle Fort and 15 minutes from stunning Unawatuna beach.',
              },
              {
                icon: HomeIcon,
                title: 'Entire Villa is Yours',
                desc: 'Enjoy full privacy in your 2-bedroom sanctuary with scenic rooftop, lush tropical garden, sunbed, and hammock  exclusively yours.',
              },
              {
                icon: HeartHandshake,
                title: 'Personalised Hospitality',
                desc: 'From warm check-ins with hot tea to local transport tips and insider Galle recommendations  Ganidu and the team ensure a seamless stay.',
              },
            ].map((item, i) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.title}
                  className={`amenity-card reveal delay-${i * 200} p-8`}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(201,169,110,0.2)',
                  }}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-amber-300 bg-amber-300/10 border border-amber-300/20 mb-6">
                    <IconComponent className="w-6 h-6 text-amber-300" />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.5rem',
                      color: '#c9a96e',
                      fontWeight: 500,
                      marginBottom: '1rem',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-white/65 leading-relaxed text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GUEST REVIEW SLIDER ── */}
      <section
        className="py-24 px-6 lg:px-12 relative overflow-hidden"
        style={{ background: '#1e3a5f' }}
      >
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url('${VILLA_IMAGES.reviewBg}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center reveal">
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '4rem',
              color: '#c9a96e',
              lineHeight: 0.8,
              marginBottom: '2rem',
              opacity: 0.6,
            }}
          >
            "
          </div>

          {/* Stable Review Container - Zero Layout Shift Across Mobile & Desktop */}
          <div className="grid grid-cols-1 items-center justify-items-center w-full min-h-[220px] sm:min-h-[180px] md:min-h-[150px]">
            {reviews.map((rev, idx) => {
              const isActive = currentReview === idx;
              return (
                <div
                  key={idx}
                  className={`col-start-1 row-start-1 w-full flex flex-col justify-center items-center transition-all duration-500 ease-out ${
                    isActive
                      ? 'opacity-100 scale-100 pointer-events-auto z-10'
                      : 'opacity-0 scale-[0.98] pointer-events-none invisible z-0'
                  }`}
                  aria-hidden={!isActive}
                >
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 'clamp(1.15rem, 2.8vw, 1.7rem)',
                      color: 'white',
                      fontWeight: 300,
                      lineHeight: 1.6,
                      fontStyle: 'italic',
                      marginBottom: '1.75rem',
                    }}
                  >
                    {rev.quote}
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div
                      className="w-8 sm:w-10 h-px"
                      style={{ background: 'rgba(201,169,110,0.5)' }}
                    />
                    <div className="text-center">
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: '#c9a96e' }}>
                        {rev.author}
                      </p>
                      <p className="text-white/50 text-[11px] sm:text-xs tracking-widest uppercase mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {rev.country}
                      </p>
                    </div>
                    <div
                      className="w-8 sm:w-10 h-px"
                      style={{ background: 'rgba(201,169,110,0.5)' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-1.5 mt-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} className="w-5 h-5 text-amber-300 fill-amber-300" />
            ))}
          </div>

          {/* Controls: Prev / Next / Dots */}
          <div className="flex items-center justify-center gap-5 mt-8">
            <button
              onClick={prevReview}
              className="p-2 rounded-full border border-white/20 text-white/70 hover:text-amber-300 hover:border-amber-300/60 transition-all cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => changeReview(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${currentReview === idx ? 'w-6 bg-amber-300' : 'w-1.5 bg-white/30 hover:bg-white/60'
                    }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="p-2 rounded-full border border-white/20 text-white/70 hover:text-amber-300 hover:border-amber-300/60 transition-all cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── NEARBY ATTRACTIONS & EXPERIENCES (Interactive Moving Places Slider) ── */}
      <section
        id="explore-galle"
        className="py-20 sm:py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden scroll-mt-24"
        style={{ background: '#f8f5f0' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6 reveal">
            <div>
              <p className="section-label mb-2 sm:mb-3">Prime Location</p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                  fontWeight: 400,
                  color: '#0d1b2a',
                  lineHeight: 1.15,
                }}
              >
                Explore Galle & The Coast
              </h2>
              <div className="gold-divider mt-3 sm:mt-4 mb-3 sm:mb-4" />
              <p className="text-gray-600 max-w-xl text-xs sm:text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                UNESCO Heritage ramparts, hidden jungle bays, world-class surf points, and coastal landmarks located just minutes from The Villa Clover.
              </p>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center justify-end gap-2.5 sm:gap-3 self-end shrink-0">
              <button
                onClick={prevPlace}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#0d1b2a]/20 bg-white text-[#0d1b2a] hover:bg-[#0d1b2a] hover:text-[#c9a96e] hover:border-[#0d1b2a] flex items-center justify-center transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
                aria-label="Previous places"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextPlace}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#0d1b2a]/20 bg-white text-[#0d1b2a] hover:bg-[#0d1b2a] hover:text-[#c9a96e] hover:border-[#0d1b2a] flex items-center justify-center transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
                aria-label="Next places"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Full-Card Multi-Item Carousel (Zero Cropping, Guaranteed Loop) */}
          <div
            onMouseEnter={() => setIsPlacesPaused(true)}
            onMouseLeave={() => setIsPlacesPaused(false)}
            onTouchStart={(e) => {
              setIsPlacesPaused(true);
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              setIsPlacesPaused(false);
              if (touchStartX.current !== null) {
                const diff = touchStartX.current - e.changedTouches[0].clientX;
                if (diff > 45) nextPlace();
                else if (diff < -45) prevPlace();
                touchStartX.current = null;
              }
            }}
            className="relative overflow-hidden w-full py-2 -mx-2.5 sm:-mx-3"
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${placesIndex * (100 / visiblePlacesCount)}%)`,
              }}
            >
              {NEARBY_PLACES.map((place) => (
                <div
                  key={place.id}
                  style={{ width: `${100 / visiblePlacesCount}%` }}
                  className="shrink-0 px-2.5 sm:px-3 flex flex-col"
                >
                  <div
                    onClick={() => handleNav('place-detail', place.id)}
                    className="h-full flex flex-col justify-between bg-white rounded-xs border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Image & Floating Badges */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={place.image}
                        alt={place.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />

                      {/* Tag Badge */}
                      <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase bg-[#0d1b2a]/85 backdrop-blur-md text-[#c9a96e] border border-[#c9a96e]/30 rounded-xs">
                          {place.tag}
                        </span>
                      </div>

                      {/* Distance & Time Pill */}
                      <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 bg-black/75 backdrop-blur-md text-white rounded-full text-[11px] sm:text-xs font-medium border border-white/20">
                        <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c9a96e]" />
                        <span>{place.distance}</span>
                        <span className="text-white/40">·</span>
                        <span className="text-white/80">{place.driveTime}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6 flex flex-col justify-between flex-1">
                      <div>
                        <h3
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 'clamp(1.25rem, 2.5vw, 1.45rem)',
                            color: '#0d1b2a',
                            fontWeight: 600,
                            marginBottom: '0.4rem',
                          }}
                        >
                          {place.title}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {place.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs text-slate-500 font-medium gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <span className="flex items-center gap-1 sm:gap-1.5 text-amber-800 whitespace-nowrap shrink-0">
                          <Compass className="w-3.5 h-3.5 text-[#c9a96e] shrink-0" />
                          <span>From Villa Clover</span>
                        </span>
                        <span className="text-[#1e3a5f] font-semibold whitespace-nowrap shrink-0 flex items-center gap-1 group-hover:text-amber-700 transition-colors">
                          <span>Discover</span>
                          <span className="text-amber-600 font-bold">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-1 sm:gap-1.5 mt-6 sm:mt-8 flex-wrap px-4">
            {Array.from({ length: maxPlacesIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPlacesIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  placesIndex === idx ? 'w-5 sm:w-7 bg-[#1e3a5f]' : 'w-1.5 sm:w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── BESPOKE VILLA SERVICES ── */}
      <section className="py-24 px-6 lg:px-12" style={{ background: '#0d1b2a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="section-label mb-4">Bespoke Hospitality</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 400,
                color: 'white',
              }}
            >
              Curated Guest Services
            </h2>
            <div className="gold-divider mx-auto mt-6 mb-4" />
            <p className="text-white/60 max-w-xl mx-auto text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              We ensure every detail of your vacation is effortless and tailored to your desires.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Plane,
                title: 'Airport Hire & Transfers',
                desc: 'Comfortable air-conditioned private van or car transfers directly from Bandaranaike International Airport (Katunayake / CMB) or local pickup.',
              },
              {
                icon: UtensilsCrossed,
                title: 'Private Kitchen',
                desc: 'Fully equipped self-catering kitchen with refrigerator, stovetop, microwave, cookware, and dining space.',
              },
              {
                icon: Sparkles,
                title: 'Rooftop Sundowners',
                desc: 'Enjoy ambient evening fairy lights, private dining setups, and refreshing breezes on your private rooftop.',
              },
              {
                icon: Compass,
                title: 'Local Tours & Tuk-Tuks',
                desc: 'Trusted on-call tuk-tuk drivers and personalized local recommendations for dining, shopping, and hidden gems.',
              },
            ].map((srv, i) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.title}
                  className={`reveal delay-${i * 150} p-8 flex flex-col`}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(201,169,110,0.2)',
                    borderRadius: '2px',
                  }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-amber-300 bg-amber-300/10 border border-amber-300/25 mb-6">
                    <Icon className="w-5 h-5 text-amber-300" />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.35rem',
                      color: '#ffffff',
                      fontWeight: 500,
                      marginBottom: '0.75rem',
                    }}
                  >
                    {srv.title}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {srv.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VILLA VIDEO TOUR ── */}
      <section className="py-20 px-6 lg:px-12" style={{ background: '#ffffff' }}>
        <div className="max-w-5xl mx-auto">
          <VillaVideoPlayer
            badge="Video Tour"
            title="Villa Video Tour"
            subtitle="Take a short walkthrough of The Villa Clover  our garden, rooftop, and living spaces."
            darkTheme={false}
          />
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-24 px-6 lg:px-12" style={{ background: '#f8f5f0' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14 reveal">
            <p className="section-label mb-4">Everything You Need To Know</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 400,
                color: '#0d1b2a',
              }}
            >
              Frequently Asked Questions
            </h2>
            <div className="gold-divider mx-auto mt-6" />
          </div>

          <div className="flex flex-col gap-4 reveal">
            {[
              {
                q: 'What is the check-in and check-out schedule?',
                a: 'Check-in is from 14:00 to 18:00 (please inform us of your expected arrival time in advance), and check-out is by 11:00. Early check-in or late check-out can be arranged based on availability.',
              },
              {
                q: 'How does payment and prepayment work?',
                a: 'No advance prepayment is required. The Villa Clover accepts cash or bank transfer payments upon arrival at the property, making your booking completely flexible.',
              },
              {
                q: 'Are pets allowed at the villa?',
                a: 'Pets are not allowed at The Villa Clover in order to maintain a clean, serene, and allergen-free environment for all our guests.',
              },
              {
                q: 'What amenities and kitchen facilities are included?',
                a: 'You enjoy the entire private 2-bedroom villa featuring Bedroom 1 with air conditioning, Bedroom 2 (non-AC), comfortable queen beds, safety lockers, complimentary high-speed WiFi, scenic rooftop, sunbeds, hammock, fully equipped kitchen (refrigerator, stove, electric kettle, cookware), washing machine, iron and iron board, hot water showers, private parking, and airport hire on request.',
              },
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '2px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-4 py-3.5 sm:px-6 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer"
                  >
                    <span
                      className="text-[0.95rem] sm:text-[1.1rem] md:text-[1.25rem] font-semibold leading-snug"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: isOpen ? '#c9a96e' : '#0d1b2a',
                      }}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-amber-500' : 'text-gray-400'
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      className="px-4 pb-4 sm:px-6 sm:pb-6 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3 sm:pt-4"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section
        className="py-24 px-6 lg:px-12 text-center"
        style={{ background: '#ffffff' }}
      >
        <div className="max-w-2xl mx-auto reveal">
          <p className="section-label mb-5">Ready to Experience It?</p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              color: '#0d1b2a',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
            }}
          >
            Begin Your Stay at<br />The Villa Clover
          </h2>
          <div className="gold-divider mx-auto mb-8" />
          <p className="text-gray-500 mb-10 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
            Perfect for a 1-night stay or an extended getaway. No prepayment needed , pay via cash or bank transfer. Pets are not allowed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => handleNav('booking')} className="btn-primary">
              Book Your Stay Now
            </button>
            <button onClick={() => handleNav('about')} className="btn-outline" style={{ borderColor: '#1e3a5f', color: '#1e3a5f' }}>
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
