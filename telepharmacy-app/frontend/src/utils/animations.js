// animations.js
// Utility functions for consistent animations across the application

// Framer Motion animation variants
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const fadeInUp = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const scaleIn = {
  hidden: { 
    scale: 0.8, 
    opacity: 0 
  },
  show: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "backOut"
    }
  }
};

export const slideInLeft = {
  hidden: { 
    x: -50, 
    opacity: 0 
  },
  show: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const slideInRight = {
  hidden: { 
    x: 50, 
    opacity: 0 
  },
  show: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// CSS animation classes
export const cssAnimations = {
  fadeIn: 'animate-fadeIn',
  fadeInUp: 'animate-fadeInUp',
  fadeInDown: 'animate-fadeInDown',
  slideInLeft: 'animate-slideInLeft',
  slideInRight: 'animate-slideInRight',
  scaleIn: 'animate-scaleIn',
  bounce: 'animate-bounce',
  pulse: 'animate-pulse'
};

// Animation durations
export const durations = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8
};

// Easing functions
export const easings = {
  easeIn: "easeIn",
  easeOut: "easeOut",
  easeInOut: "easeInOut",
  backOut: "backOut",
  anticipate: "anticipate"
};