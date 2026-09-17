// Real Villa Clover images served locally from public/images/villa for ultra-fast instant loading

export const VILLA_IMAGES = {
  // Hero & Headers (Instant Local Loading)
  hero: '/images/villa/dsc08315-hdr.webp', // Daytime Full Villa View
  aboutHeader: '/images/villa/dsc08686-hdr.webp', // Rooftop Sun Terrace Day
  galleryHeader: '/images/villa/dsc09190-hdr.webp', // Twilight Night View
  contactHeader: '/images/villa/dsc09223-hdr.webp', // Evening Lit Villa
  reviewBg: '/images/villa/dsc09298-hdr.webp', // Fairy Lit Rooftop

  // Featured sections
  introExterior: '/images/villa/dsc08276-hdr.webp', // Villa Lawn & Veranda
  contactVillaCard: '/images/villa/dsc09193-hdr.webp', // Night glowing villa
  locationCard: '/images/villa/dsc08392-hdr.webp', // Garden swing & lake

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
  gardenSwing: '/images/villa/dsc08392-hdr.webp', // Garden swing & lake view
  gardenPath: '/images/villa/dsc08380-hdr.webp', // Tropical garden path
  verandaPath: '/images/villa/dsc08321-hdr.webp', // Veranda view
  frontPorch: '/images/villa/dsc08300-hdr.webp', // Front porch
  nightGarden: '/images/villa/dsc09217-hdr.webp', // Night garden
  rooftopDay: '/images/villa/dsc08686-hdr.webp', // Rooftop terrace day
  rooftopNight: '/images/villa/dsc09298-hdr.webp', // Rooftop terrace night
};

export interface GalleryPhoto {
  url: string;
  alt: string;
  category: 'Exterior' | 'Interior' | 'Garden' | 'Terrace' | 'Video';
  wide?: boolean;
  isVideo?: boolean;
  videoUrl?: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    url: '/images/villa/dsc08315-hdr.webp',
    videoUrl: '/video/villa-tour.mp4',
    alt: 'The Villa Clover - Villa Video Tour',
    category: 'Video',
    isVideo: true,
  },
  {
    "url": "/images/villa/dsc08276-hdr.webp",
    "alt": "Villa Clover Exterior & Entrance",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08279-hdr.webp",
    "alt": "Villa Clover Exterior & Entrance",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08283-hdr.webp",
    "alt": "Villa Clover Exterior & Entrance",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08291-hdr.webp",
    "alt": "Villa Clover Exterior & Entrance",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08294-hdr.webp",
    "alt": "Villa Clover Exterior & Entrance",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08297-hdr.webp",
    "alt": "Villa Clover Exterior & Entrance",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08300-hdr.webp",
    "alt": "Villa Clover Exterior & Entrance",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08303-hdr.webp",
    "alt": "Villa Clover Exterior & Entrance",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08315-hdr.webp",
    "alt": "Villa Clover Exterior & Entrance",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08321-hdr.webp",
    "alt": "Villa Clover Exterior & Entrance",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08327-hdr.webp",
    "alt": "Villa Clover Exterior & Entrance",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08333-hdr.webp",
    "alt": "Villa Clover Exterior & Entrance",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08342-hdr.webp",
    "alt": "Villa Clover Exterior & Entrance",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08348.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08353-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08354-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08360-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08365-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08371-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08372-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08372.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08380-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08384-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08389-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08392-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08396-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08399-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08404-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08405-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08408-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08411-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08416-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08419-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08423-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08426-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08429-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08432-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08441-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08453-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08468-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08480-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08491-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08494-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08535-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08536-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08551-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08557-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08560-hdr.webp",
    "alt": "Lush Tropical Garden & Lake View",
    "category": "Garden",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08680.webp",
    "alt": "Rooftop Sun Deck & Views",
    "category": "Terrace",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08683.webp",
    "alt": "Rooftop Sun Deck & Views",
    "category": "Terrace",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08686-hdr.webp",
    "alt": "Rooftop Sun Deck & Views",
    "category": "Terrace",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08687.webp",
    "alt": "Rooftop Sun Deck & Views",
    "category": "Terrace",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08717.webp",
    "alt": "Rooftop Sun Deck & Views",
    "category": "Terrace",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08725.webp",
    "alt": "Rooftop Sun Deck & Views",
    "category": "Terrace",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08728-hdr.webp",
    "alt": "Rooftop Sun Deck & Views",
    "category": "Terrace",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08728.webp",
    "alt": "Rooftop Sun Deck & Views",
    "category": "Terrace",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08735.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08737.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08746-hdr.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08746.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08753-hdr.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08755-hdr.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08764-hdr.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08770-hdr.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08774-hdr.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08783-hdr.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08786-hdr.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08795-hdr.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08799-hdr.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08805-hdr.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08814.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08817.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08820.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08823.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08826.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08832.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08835.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08871.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08874.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08877.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08880.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08889.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08898.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08904.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08908-hdr.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08932-hdr.webp",
    "alt": "Living Room, Dining & Modern Kitchen",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08943.webp",
    "alt": "Bedroom 2 Suite with AC",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08946.webp",
    "alt": "Bedroom 2 Suite with AC",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08949.webp",
    "alt": "Bedroom 2 Suite with AC",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08952.webp",
    "alt": "Bedroom 2 Suite with AC",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08955.webp",
    "alt": "Bedroom 2 Suite with AC",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08958.webp",
    "alt": "Bedroom 2 Suite with AC",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08961.webp",
    "alt": "Bedroom 2 Suite with AC",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08964.webp",
    "alt": "Bedroom 2 Suite with AC",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08967.webp",
    "alt": "Bedroom 2 Suite with AC",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08979.webp",
    "alt": "Bedroom 2 Suite with AC",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08982.webp",
    "alt": "Bedroom 2 Suite with AC",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08985.webp",
    "alt": "Bedroom 2 Suite with AC",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc08994.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09003.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09006.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09012.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09015.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09018.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09021.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09027.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09030.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09033.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09043.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09046.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09049.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09055.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09058.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09061.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09064.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09067.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09070.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09073.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09076.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09079.webp",
    "alt": "Master Bedroom 1 & Wardrobe",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09094.webp",
    "alt": "Modern Ensuite Bathroom & Amenities",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09097.webp",
    "alt": "Modern Ensuite Bathroom & Amenities",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09103.webp",
    "alt": "Modern Ensuite Bathroom & Amenities",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09119.webp",
    "alt": "Modern Ensuite Bathroom & Amenities",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09125.webp",
    "alt": "Modern Ensuite Bathroom & Amenities",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09143.webp",
    "alt": "Modern Ensuite Bathroom & Amenities",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09148.webp",
    "alt": "Modern Ensuite Bathroom & Amenities",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09151.webp",
    "alt": "Modern Ensuite Bathroom & Amenities",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09154.webp",
    "alt": "Modern Ensuite Bathroom & Amenities",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09160.webp",
    "alt": "Modern Ensuite Bathroom & Amenities",
    "category": "Interior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09190-hdr.webp",
    "alt": "Villa Twilight & Night Lighting",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09193-hdr.webp",
    "alt": "Villa Twilight & Night Lighting",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09194.webp",
    "alt": "Villa Twilight & Night Lighting",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09211-hdr.webp",
    "alt": "Villa Twilight & Night Lighting",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09217-hdr.webp",
    "alt": "Villa Twilight & Night Lighting",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09223-hdr.webp",
    "alt": "Villa Twilight & Night Lighting",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09232-hdr.webp",
    "alt": "Villa Twilight & Night Lighting",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09237.webp",
    "alt": "Villa Twilight & Night Lighting",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09246.webp",
    "alt": "Villa Twilight & Night Lighting",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09255.webp",
    "alt": "Villa Twilight & Night Lighting",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09259-hdr.webp",
    "alt": "Villa Twilight & Night Lighting",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09276.webp",
    "alt": "Villa Twilight & Night Lighting",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09282.webp",
    "alt": "Villa Twilight & Night Lighting",
    "category": "Exterior",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09298-hdr.webp",
    "alt": "Rooftop Lounge Night & Fairy Lights",
    "category": "Terrace",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09300.webp",
    "alt": "Rooftop Lounge Night & Fairy Lights",
    "category": "Terrace",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09303.webp",
    "alt": "Rooftop Lounge Night & Fairy Lights",
    "category": "Terrace",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09315.webp",
    "alt": "Rooftop Lounge Night & Fairy Lights",
    "category": "Terrace",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09324.webp",
    "alt": "Rooftop Lounge Night & Fairy Lights",
    "category": "Terrace",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09333.webp",
    "alt": "Rooftop Lounge Night & Fairy Lights",
    "category": "Terrace",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09339.webp",
    "alt": "Rooftop Lounge Night & Fairy Lights",
    "category": "Terrace",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09390.webp",
    "alt": "Rooftop Lounge Night & Fairy Lights",
    "category": "Terrace",
    "wide": true
  },
  {
    "url": "/images/villa/dsc09393.webp",
    "alt": "Rooftop Lounge Night & Fairy Lights",
    "category": "Terrace",
    "wide": true
  }
];
