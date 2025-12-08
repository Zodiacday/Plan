/**
 * The Plug Dude Design System
 * Brutalist / Minimal aesthetic with mathematical precision
 */

export const designSystem = {
  // SPACING SCALE (multiples of 8px for mathematical rhythm)
  spacing: {
    xs: '8px',    // 0.5rem / 2 Tailwind
    sm: '16px',   // 1rem / 4 Tailwind
    md: '24px',   // 1.5rem / 6 Tailwind
    lg: '32px',   // 2rem / 8 Tailwind
    xl: '48px',   // 3rem / 12 Tailwind
    '2xl': '64px', // 4rem / 16 Tailwind
    '3xl': '96px', // 6rem / 24 Tailwind
  },

  // TYPOGRAPHY SCALE (strict hierarchy)
  typography: {
    // Display (hero sections only)
    hero: {
      mobile: 'text-5xl',    // 48px
      tablet: 'text-6xl',    // 60px
      desktop: 'text-8xl',   // 96px
    },
    // Headings
    h1: {
      mobile: 'text-3xl',    // 30px
      desktop: 'text-5xl',   // 48px
    },
    h2: {
      mobile: 'text-2xl',    // 24px
      desktop: 'text-3xl',   // 30px
    },
    h3: {
      mobile: 'text-lg',     // 18px
      desktop: 'text-xl',    // 20px
    },
    // Body
    body: {
      large: 'text-lg',      // 18px
      base: 'text-base',     // 16px
      small: 'text-sm',      // 14px
      tiny: 'text-xs',       // 12px
    },
  },

  // COLOR SYSTEM (brutalist B&W with opacity layers)
  colors: {
    // Main colors
    background: '#000000',
    foreground: '#FFFFFF',
    
    // Opacity layers (for borders, backgrounds)
    layers: {
      subtle: 'white/5',     // Very subtle dividers
      light: 'white/10',     // Standard borders/dividers
      medium: 'white/20',    // Input borders
      strong: 'white/30',    // Focus states
    },
    
    // Text hierarchy
    text: {
      primary: 'text-white',
      secondary: 'text-muted',  // Uses Tailwind config
      tertiary: 'text-white/60',
    },
  },

  // BORDERS (consistent treatment)
  borders: {
    // Thickness
    thin: 'border',          // 1px
    thick: 'border-2',       // 2px
    
    // Common patterns
    divider: 'border-t border-white/10',
    card: 'border-b border-white/5',
    input: 'border-2 border-white/30',
    button: 'border-2 border-white',
    
    // L-shaped (signature style)
    lShaped: {
      bottom: 'absolute bottom-0 left-0 right-0 h-px bg-white/10',
      right: 'absolute bottom-0 right-0 top-0 w-px bg-white/10',
    },
  },

  // TOUCH TARGETS (accessibility)
  minTouchTarget: 'min-h-[44px]', // 44px minimum for mobile

  // HOVER STATES (consistent interactions)
  hover: {
    background: 'hover:bg-white/5',
    text: 'hover:text-gray-300',
    border: 'group-hover:bg-white/30',
    button: 'hover:bg-white hover:text-black',
  },

  // TRANSITIONS (smooth & consistent)
  transition: 'transition-colors', // 150ms default

  // COMPONENT SPACING (section rhythm)
  sections: {
    // Vertical padding for major sections
    small: 'py-16',          // 64px mobile
    medium: 'py-16 md:py-24', // 64px → 96px
    large: 'py-16 md:py-32',  // 64px → 128px
  },

  // GRID GAPS (content spacing)
  gaps: {
    tight: 'gap-4',          // 16px
    normal: 'gap-8',         // 32px
    loose: 'gap-12',         // 48px
  },
};

// AUDIT FINDINGS
export const auditFindings = {
  spacing: {
    issues: [
      'Mixed py-16, py-24, py-32 without clear pattern',
      'gap-8, gap-12, gap-20 inconsistent',
      'Some sections py-20, others py-12',
    ],
    fix: 'Use only spacing.sections values (py-16, py-16 md:py-24, py-16 md:py-32)',
  },
  
  typography: {
    issues: [
      'Hero jumps text-5xl → 6xl → 7xl → 8xl (too many steps)',
      'Headers mix text-3xl/4xl/5xl randomly',
      'Body text inconsistent (text-base vs text-lg)',
    ],
    fix: 'Strict hierarchy: hero (5xl/6xl/8xl), h1 (3xl/5xl), h2 (2xl/3xl), body (base/lg)',
  },
  
  borders: {
    issues: [
      'Mix of border-white/10, border-white/20, border-white/30',
      'L-shaped on main cards, simple borders on compact cards',
      'SearchAndFilter uses border-white/20, everywhere else white/10',
    ],
    fix: 'Dividers=white/10, Inputs=white/30, Cards use L-shaped consistently',
  },
  
  colors: {
    issues: [
      'Some use text-muted, others text-white/60 or text-gray-300',
      'Inconsistent hover states (some bg-white/5, some opacity changes)',
    ],
    fix: 'Only use text-white, text-muted, hover:bg-white/5',
  },
  
  components: {
    issues: [
      'ToolCard full size, CompactToolCard minimal - visual disconnect',
      'CategoryCard has description, CompactCategoryCard doesn\'t',
      'SearchAndFilter has rounded corners, everything else sharp',
    ],
    fix: 'All compact cards share visual language, remove rounded corners from SearchAndFilter',
  },
};
