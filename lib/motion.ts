import { useReducedMotion } from "framer-motion";

// Custom premium easings inspired by Apple and Stripe
export const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1]; // Ultra-smooth ease-out
export const EASE_IN_OUT: [number, number, number, number] = [0.76, 0, 0.24, 1];

// Shared Transition Presets
export const transitionPresets = {
  slow: { duration: 0.8, ease: EASE_PREMIUM },
  medium: { duration: 0.5, ease: EASE_PREMIUM },
  fast: { duration: 0.3, ease: EASE_PREMIUM },
};

// Reusable Framer Motion Entrance Variants
export const motionVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: EASE_PREMIUM,
        delay: custom,
      },
    }),
  },
  
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: EASE_PREMIUM,
        delay: custom,
      },
    }),
  },

  scaleIn: {
    hidden: { opacity: 0, scale: 0.97 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: EASE_PREMIUM,
        delay: custom,
      },
    }),
  },

  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

// Custom Hook to audit accessibility settings
export function useMotionSettings() {
  const reducedMotion = useReducedMotion();
  
  // Disable scale/y shifts for accessibility users
  const getVariants = (type: keyof typeof motionVariants) => {
    if (reducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } },
      };
    }
    return motionVariants[type];
  };

  return { reducedMotion, getVariants };
}
