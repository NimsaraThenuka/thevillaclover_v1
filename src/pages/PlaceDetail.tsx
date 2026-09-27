import { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useSEO } from '../hooks/useSEO';
import { NEARBY_PLACES, NearbyPlace } from '../data/nearbyPlaces';
import { VILLA_IMAGES } from '../data/villaImages';
import WhatsAppIcon from '../components/WhatsAppIcon';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Check,
  Compass,
  Sparkles,
  Phone,
  Calendar,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface PlaceDetailProps {
  placeId: string | null;
  onNavigate: (page: string, extra?: string) => void;
}

export default function PlaceDetail({ placeId, onNavigate }: PlaceDetailProps) {
  useScrollReveal();

  // Find the selected place, fallback to Galle Fort if not found
  const place: NearbyPlace =
    NEARBY_PLACES.find((p) => p.id === placeId) || NEARBY_PLACES[0];

  useSEO({
    title: `${place.title} Galle Travel Guide & Nearby Stay | The Villa Clover`,
    description: `${place.desc} Located just ${place.distance} (${place.driveTime}) from The Villa Clover private 2-bedroom villa sanctuary in Galle.`,
    keywords: `${place.title}, ${place.title} galle, things to do in galle, places to visit near the villa clover, ${place.tag}, galle sri lanka travel guide, villa near ${place.title}`,
    canonicalUrl: `https://thevillaclover.com/?page=place-detail&id=${place.id}`,
    ogImage: place.image,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [placeId]);

  // Other recommendations (excluding current place)
  const otherPlaces = NEARBY_PLACES.filter((p) => p.id !== place.id);

  const handleBookNow = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    onNavigate('booking');
  };

  const whatsappMessage = encodeURIComponent(
    `Hello! I am planning to visit ${place.title} in Galle and would like to inquire about booking The Villa Clover.`
  );

  return (
    <div className="page-enter bg-[#fdfcf9] min-h-screen">
      {/* ── TOP BACK BAR & BREADCRUMB ── */}
      <div className="pt-24 pb-4 px-4 sm:px-6 lg:px-12 border-b border-slate-200/70 bg-white/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('home', 'explore-galle')}
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#1e3a5f] hover:text-amber-700 transition-colors cursor-pointer group"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </button>

          <div
            className="hidden sm:flex items-center gap-2 text-xs text-gray-500"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span
              onClick={() => onNavigate('home', 'explore-galle')}
              className="hover:text-[#0d1b2a] cursor-pointer"
            >
              Home
            </span>
            <span>/</span>
            <span
              onClick={() => onNavigate('home', 'explore-galle')}
              className="hover:text-[#0d1b2a] cursor-pointer"
            >
              Explore Galle
            </span>
            <span>/</span>
            <span className="font-semibold text-[#0d1b2a] truncate max-w-[200px]">
              {place.title}
            </span>
          </div>

          <button
            onClick={handleBookNow}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold tracking-wider uppercase bg-[#0d1b2a] text-[#c9a96e] hover:bg-[#1e3a5f] transition-all rounded-xs shadow-xs"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Book Villa
          </button>
        </div>
      </div>

      {/* ── HERO BANNER ── */}
      <section className="relative px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-72 sm:h-96 md:h-[480px] rounded-xs overflow-hidden shadow-xl">
            <img
              src={place.image}
              alt={place.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a] via-[#0d1b2a]/40 to-black/20" />

            {/* Floating Top Tag */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
              <span className="px-3 py-1.5 text-[11px] sm:text-xs font-semibold tracking-widest uppercase bg-[#0d1b2a]/90 backdrop-blur-md text-[#c9a96e] border border-[#c9a96e]/40 rounded-xs shadow-md">
                {place.tag}
              </span>
            </div>

            {/* Bottom Hero Content */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 text-white">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-3 text-xs sm:text-sm font-medium text-amber-300">
                <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                  <MapPin className="w-3.5 h-3.5 text-[#c9a96e]" />
                  {place.distance} from The Villa Clover
                </span>
                <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                  <Clock className="w-3.5 h-3.5 text-[#c9a96e]" />
                  {place.driveTime} drive
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                  fontWeight: 400,
                  lineHeight: 1.1,
                  color: 'white',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                }}
              >
                {place.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT & BOOKING CTA GRID ── */}
      <section className="px-4 sm:px-6 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT: IN-DEPTH DETAILS (8 COLS) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <div className="bg-white p-6 sm:p-9 rounded-xs border border-slate-200/80 shadow-xs">
              <p className="section-label mb-3">About This Attraction</p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '2rem',
                  color: '#0d1b2a',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}
              >
                Destination Overview
              </h2>
              <div className="gold-divider mb-6" />

              <div
                className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {place.fullDesc.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white p-6 sm:p-9 rounded-xs border border-slate-200/80 shadow-xs">
              <p className="section-label mb-3">What You Will Experience</p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.9rem',
                  color: '#0d1b2a',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}
              >
                Key Highlights
              </h2>
              <div className="gold-divider mb-6" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {place.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xs bg-[#f8f5f0] border border-amber-900/10"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#1e3a5f] text-[#c9a96e] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span
                      className="text-xs sm:text-sm font-medium text-gray-800 leading-snug"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Guide & Insider Tips */}
            <div className="bg-white p-6 sm:p-9 rounded-xs border border-slate-200/80 shadow-xs">
              <p className="section-label mb-3">Visitor Guide</p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.9rem',
                  color: '#0d1b2a',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}
              >
                Plan Your Visit
              </h2>
              <div className="gold-divider mb-6" />

              <div className="space-y-5 text-sm sm:text-[15px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                <div className="flex items-start gap-3.5 p-4 rounded-xs bg-slate-50 border border-slate-200/70">
                  <Clock className="w-5 h-5 text-[#c9a96e] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#0d1b2a] mb-1">Best Time to Visit:</p>
                    <p className="text-gray-600 leading-relaxed">{place.bestTime}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xs bg-slate-50 border border-slate-200/70">
                  <Sparkles className="w-5 h-5 text-[#c9a96e] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#0d1b2a] mb-1">Local Travel Tip:</p>
                    <p className="text-gray-600 leading-relaxed">{place.travelTips}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xs bg-slate-50 border border-slate-200/70">
                  <Compass className="w-5 h-5 text-[#c9a96e] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#0d1b2a] mb-1">Getting There from Villa Clover:</p>
                    <p className="text-gray-600 leading-relaxed">{place.routeInfo}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: STICKY LUXURY BOOKING CARD (4 COLS) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div
              className="p-6 sm:p-8 rounded-xs text-white shadow-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #0d1b2a 0%, #1a3048 100%)',
                border: '1px solid rgba(201,169,110,0.3)',
              }}
            >
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a96e]/10 rounded-full blur-2xl pointer-events-none" />

              <p className="text-[11px] font-semibold tracking-widest uppercase text-amber-300 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Your Galle Haven
              </p>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.9rem',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  marginBottom: '0.75rem',
                  color: 'white',
                }}
              >
                Stay at The Villa Clover
              </h3>

              <div className="flex items-center gap-2 text-xs text-amber-200/90 mb-6 bg-black/30 p-2.5 rounded-xs border border-white/10" style={{ fontFamily: 'Inter, sans-serif' }}>
                <MapPin className="w-4 h-4 text-[#c9a96e] shrink-0" />
                <span>Only <strong>{place.distance}</strong> from {place.title}</span>
              </div>

              <div className="space-y-2.5 mb-8 text-xs sm:text-sm text-white/80" style={{ fontFamily: 'Inter, sans-serif' }}>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#c9a96e] shrink-0" />
                  <span>2 Queen Bed Suites (Master with AC)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#c9a96e] shrink-0" />
                  <span>Scenic Rooftop with Fairy Lights & Sunbeds</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#c9a96e] shrink-0" />
                  <span>Full Kitchen & Washing Machine</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#c9a96e] shrink-0" />
                  <span>Garden Swing & Free High-Speed WiFi</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#c9a96e] shrink-0" />
                  <span>Airport Hire (Katunayake / CMB) on Request</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBookNow}
                  className="w-full btn-gold text-center block text-sm font-semibold tracking-wider uppercase py-3.5 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                >
                  Book Your Stay Now
                </button>

                <a
                  href={`https://wa.me/94774384915?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium text-xs sm:text-sm rounded-xs transition-colors shadow-md"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <WhatsAppIcon className="w-5 h-5 text-white fill-current shrink-0" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href="tel:+94774384915"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white/90 text-xs sm:text-sm rounded-xs transition-colors border border-white/15"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call +94 77 438 4915</span>
                </a>
              </div>
            </div>

            {/* Quick Villa Photo Preview Card */}
            <div className="bg-white p-5 rounded-xs border border-slate-200/80 shadow-xs">
              <div className="aspect-[16/10] overflow-hidden rounded-xs mb-3">
                <img
                  src={VILLA_IMAGES.hero}
                  alt="The Villa Clover"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-xs text-gray-500 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                Private luxury 2-bedroom villa with rooftop and garden in Galle.
              </p>
              <button
                onClick={() => onNavigate('about')}
                className="text-xs font-semibold text-[#1e3a5f] hover:text-amber-700 flex items-center gap-1 transition-colors cursor-pointer"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span>View Full Villa Amenities</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPLORE MORE NEARBY DESTINATIONS ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-[#f4efe6] border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Discover More</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                fontWeight: 400,
                color: '#0d1b2a',
              }}
            >
              Other Nearby Attractions in Galle
            </h2>
            <div className="gold-divider mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPlaces.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('place-detail', item.id)}
                className="bg-white rounded-xs border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase bg-[#0d1b2a]/85 backdrop-blur-md text-[#c9a96e] border border-[#c9a96e]/30 rounded-xs">
                      {item.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/75 backdrop-blur-md text-white rounded-full text-xs font-medium border border-white/20">
                    <MapPin className="w-3.5 h-3.5 text-[#c9a96e]" />
                    <span>{item.distance}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '1.35rem',
                        color: '#0d1b2a',
                        fontWeight: 600,
                        marginBottom: '0.5rem',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#1e3a5f] font-semibold group-hover:text-amber-700 transition-colors">
                    <span>View Details</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
