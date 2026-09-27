// Real Villa Clover images served locally from public/images/villa for ultra-fast instant loading

export const VILLA_IMAGES = {
  // Hero & Headers (Instant Local Loading)
  hero: '/images/villa/dsc08315-hdr.webp', // Daytime Full Villa View
  aboutHeader: '/images/villa/dsc08686-hdr.webp', // Rooftop Day
  galleryHeader: '/images/villa/dsc09190-hdr.webp', // Twilight Night View
  contactHeader: '/images/villa/dsc09223-hdr.webp', // Evening Lit Villa
  reviewBg: '/images/villa/dsc09298-hdr.webp', // Fairy Lit Rooftop

  // Featured sections
  introExterior: '/images/villa/dsc08276-hdr.webp', // Villa Lawn & Veranda
  contactVillaCard: '/images/villa/dsc09193-hdr.webp', // Night glowing villa
  locationCard: '/images/villa/dsc08392-hdr.webp', // Garden swing
  
  // Bedrooms
  bedroom1: '/images/villa/dsc09012.webp', // Bedroom 1 with wardrobe
  bedroom1Close: '/images/villa/dsc09003.webp', // Bedroom 1 bed
  bedroom2: '/images/villa/dsc08955.webp', // Bedroom 2 with vanity desk
  bedroom2Angle: '/images/villa/dsc08949.webp', // Bedroom 2 alternate

  // Living & Dining & Kitchen
  livingRoom: '/images/villa/dsc08764-hdr.webp', // Full living room
  lounge: '/images/villa/dsc08770-hdr.webp', // Sofa & art
  dining: '/images/villa/dsc08795-hdr.webp', // Dining table
  kitchen: '/images/villa/dsc08932-hdr.webp', // Kitchen
  bathroom: '/images/villa/dsc09094.webp', // Modern bathroom

  // Garden & Outdoors
  gardenSwing: '/images/villa/dsc08392-hdr.webp', // Garden swing
  gardenPath: '/images/villa/dsc08380-hdr.webp', // Tropical garden path
  verandaPath: '/images/villa/dsc08321-hdr.webp', // Veranda view
  frontPorch: '/images/villa/dsc08300-hdr.webp', // Front porch
  nightGarden: '/images/villa/dsc09217-hdr.webp', // Night garden
  rooftopDay: '/images/villa/dsc08686-hdr.webp', // Rooftop day
  rooftopNight: '/images/villa/dsc09298-hdr.webp', // Rooftop night
};

export interface GalleryPhoto {
  url: string;
  alt: string;
  category: 'Exterior' | 'Interior' | 'Garden' | 'Rooftop' | 'Video';
  wide?: boolean;
  isVideo?: boolean;
  videoUrl?: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  // ── VIDEO TOUR (1 Item) ──
  {
    url: '/images/villa/dsc08315-hdr.webp',
    videoUrl: '/video/villa-tour.mp4',
    alt: 'The Villa Clover - Full Villa Video Tour',
    category: 'Video',
    isVideo: true,
  },

  // ── EXTERIOR (10 Unique, Distinct Angles - No Repeating Night Shots) ──
  {
    url: '/images/villa/dsc08315-hdr.webp',
    alt: 'The Villa Clover - Daytime Full Villa View',
    category: 'Exterior',
    wide: true,
  },
  {
    url: '/images/villa/dsc08276-hdr.webp',
    alt: 'Villa Front Lawn & Architectural Veranda',
    category: 'Exterior',
    wide: true,
  },
  {
    url: '/images/villa/dsc08300-hdr.webp',
    alt: 'Front Porch & Welcoming Villa Entrance',
    category: 'Exterior',
  },
  {
    url: '/images/villa/dsc08321-hdr.webp',
    alt: 'Outdoor Veranda Corridor & Shaded Seating',
    category: 'Exterior',
  },
  {
    url: '/images/villa/dsc08333-hdr.webp',
    alt: 'Villa Facade Surrounded by Tropical Greenery',
    category: 'Exterior',
  },
  {
    url: '/images/villa/dsc08342-hdr.webp',
    alt: 'Villa Side Veranda & Garden Walkway',
    category: 'Exterior',
  },
  {
    url: '/images/villa/dsc08348.webp',
    alt: 'Villa Clover Main Entryway & Gate Approach',
    category: 'Exterior',
  },
  {
    url: '/images/villa/dsc09190-hdr.webp',
    alt: 'Villa Clover Twilight View with Golden Ambient Lighting',
    category: 'Exterior',
    wide: true,
  },
  {
    url: '/images/villa/dsc09232-hdr.webp',
    alt: 'Illuminated Veranda & Cozy Night Patio',
    category: 'Exterior',
  },
  {
    url: '/images/villa/dsc09259-hdr.webp',
    alt: 'Private Villa Grounds & Garden Pathway at Dusk',
    category: 'Exterior',
  },

  // ── INTERIOR (24 Unique Photos - 1 Per Specific Angle) ──
  // Living & Lounge
  {
    url: '/images/villa/dsc08764-hdr.webp',
    alt: 'Spacious Modern Living Room with Comfortable Lounge',
    category: 'Interior',
    wide: true,
  },
  {
    url: '/images/villa/dsc08753-hdr.webp',
    alt: 'Living Room Seating Area & Teak Furnishings',
    category: 'Interior',
  },
  {
    url: '/images/villa/dsc08770-hdr.webp',
    alt: 'Modern Sofa Lounge with Contemporary Sri Lankan Art',
    category: 'Interior',
  },
  {
    url: '/images/villa/dsc08783-hdr.webp',
    alt: 'Open-Plan Living Hall & High Ceiling Design',
    category: 'Interior',
  },
  // Dining & Kitchen
  {
    url: '/images/villa/dsc08795-hdr.webp',
    alt: 'Dining Hall with Solid Wood Dining Table',
    category: 'Interior',
    wide: true,
  },
  {
    url: '/images/villa/dsc08820.webp',
    alt: 'Dining Table Setup with Elegant Tableware',
    category: 'Interior',
  },
  {
    url: '/images/villa/dsc08874.webp',
    alt: 'Fully Equipped Kitchen with Refrigerator & Gas Cooker',
    category: 'Interior',
  },
  {
    url: '/images/villa/dsc08889.webp',
    alt: 'Modern Kitchen Countertops & Preparation Area',
    category: 'Interior',
  },
  {
    url: '/images/villa/dsc08908-hdr.webp',
    alt: 'Open Flow Dining & Fully Equipped Modern Kitchen',
    category: 'Interior',
  },
  {
    url: '/images/villa/dsc08932-hdr.webp',
    alt: 'Kitchen Cookware, Coffee Maker & Appliances',
    category: 'Interior',
  },
  // Bedroom 1 (AC Master Suite)
  {
    url: '/images/villa/dsc09012.webp',
    alt: 'Bedroom 1 (AC) - Luxury Queen Bed with Built-in Wardrobe',
    category: 'Interior',
    wide: true,
  },
  {
    url: '/images/villa/dsc09003.webp',
    alt: 'Bedroom 1 (AC) - Plush Queen Bed with Fresh Linen',
    category: 'Interior',
  },
  {
    url: '/images/villa/dsc09015.webp',
    alt: 'Bedroom 1 (AC) - Bedside Lighting & Reading Corner',
    category: 'Interior',
  },
  {
    url: '/images/villa/dsc09027.webp',
    alt: 'Bedroom 1 (AC) - Spacious Room Layout with Air Conditioning',
    category: 'Interior',
  },
  {
    url: '/images/villa/dsc09046.webp',
    alt: 'Bedroom 1 (AC) - Contemporary Minimalist Bedroom Decor',
    category: 'Interior',
  },
  // Bedroom 2 (Queen Bed)
  {
    url: '/images/villa/dsc08955.webp',
    alt: 'Bedroom 2 - Queen Bed with Vanity Mirror & Dressing Table',
    category: 'Interior',
    wide: true,
  },
  {
    url: '/images/villa/dsc08949.webp',
    alt: 'Bedroom 2 - Comfortable Queen Bed Setup with Crisp Linens',
    category: 'Interior',
  },
  {
    url: '/images/villa/dsc08967.webp',
    alt: 'Bedroom 2 - Ambient Room Lighting & Garden Breeze Windows',
    category: 'Interior',
  },
  {
    url: '/images/villa/dsc08985.webp',
    alt: 'Bedroom 2 - Cozy Bedroom Corner & Ample Storage',
    category: 'Interior',
  },
  // Bathrooms
  {
    url: '/images/villa/dsc09094.webp',
    alt: 'En-suite Bathroom with Modern Walk-in Rain Shower',
    category: 'Interior',
  },
  {
    url: '/images/villa/dsc09103.webp',
    alt: 'Contemporary Bathroom Vanity Mirror & Granite Basin',
    category: 'Interior',
  },
  {
    url: '/images/villa/dsc09125.webp',
    alt: 'Clean Modern Bathroom Fixtures & Fresh Bath Linens',
    category: 'Interior',
  },
  {
    url: '/images/villa/dsc09143.webp',
    alt: 'Sleek Ceramic Wash Basin & Polished Chrome Faucets',
    category: 'Interior',
  },
  {
    url: '/images/villa/dsc09160.webp',
    alt: 'Modern Bathroom Amenities & Rainfall Shower Detail',
    category: 'Interior',
  },

  // ── GARDEN (9 Unique Photos - 1 Per Feature) ──
  {
    url: '/images/villa/dsc08365-hdr.webp',
    alt: 'Green Lawn & Mature Coconut Palms at Villa Clover',
    category: 'Garden',
    wide: true,
  },
  {
    url: '/images/villa/dsc08380-hdr.webp',
    alt: 'Stone Garden Pathway Winding through Tropical Greenery',
    category: 'Garden',
  },
  {
    url: '/images/villa/dsc08392-hdr.webp',
    alt: 'Relaxing Garden Swing Hanging Under Shady Trees',
    category: 'Garden',
    wide: true,
  },
  {
    url: '/images/villa/dsc08411-hdr.webp',
    alt: 'Sunlit Private Garden Surrounded by Exotic Flora',
    category: 'Garden',
  },
  {
    url: '/images/villa/dsc08423-hdr.webp',
    alt: 'Peaceful Garden Corner & Tropical Tree Canopy',
    category: 'Garden',
  },
  {
    url: '/images/villa/dsc08441-hdr.webp',
    alt: 'Vibrant Tropical Garden Blooms & Foliage',
    category: 'Garden',
  },
  {
    url: '/images/villa/dsc08480-hdr.webp',
    alt: 'Tropical Palm Fronds & Landscaped Garden Details',
    category: 'Garden',
  },
  {
    url: '/images/villa/dsc08535-hdr.webp',
    alt: 'Serene Nature Pathway Surrounding the Villa Grounds',
    category: 'Garden',
  },
  {
    url: '/images/villa/dsc08557-hdr.webp',
    alt: 'Private Tropical Garden Perimeter & Calming Oasis',
    category: 'Garden',
  },

  // ── ROOFTOP (7 Unique Angles - Only 1 Night Fairy Light Shot) ──
  {
    url: '/images/villa/dsc08686-hdr.webp',
    alt: 'Spacious Rooftop Sun Terrace with Open Sky Views',
    category: 'Rooftop',
    wide: true,
  },
  {
    url: '/images/villa/dsc08680.webp',
    alt: 'Panoramic Rooftop Relaxation Area Overlooking Nature',
    category: 'Rooftop',
  },
  {
    url: '/images/villa/dsc08717.webp',
    alt: 'Rooftop Lounge Seating for Morning Coffee & Yoga',
    category: 'Rooftop',
  },
  {
    url: '/images/villa/dsc08728-hdr.webp',
    alt: 'Rooftop Terrace with Surrounding Green Tree Canopy',
    category: 'Rooftop',
  },
  {
    url: '/images/villa/dsc08746-hdr.webp',
    alt: 'Upper Rooftop Terrace & Staircase Access',
    category: 'Rooftop',
  },
  {
    url: '/images/villa/dsc09298-hdr.webp',
    alt: 'Enchanting Rooftop Under Warm Evening Fairy Lights',
    category: 'Rooftop',
    wide: true,
  },
  {
    url: '/images/villa/dsc09390.webp',
    alt: 'Rooftop Twilight Perspective Overlooking Green Canopy',
    category: 'Rooftop',
  },
];
