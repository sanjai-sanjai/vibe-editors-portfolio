import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import MagicButton from './ui/magic-button';
import { Play, ArrowRight } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const easeInOut = (t) => {
      return t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const heroHeight = hero.offsetHeight;

      // Optimization: Only animate while hero is visible or easing out
      if (scrollTop > heroHeight) return;

      let progress = scrollTop / heroHeight;
      progress = Math.min(Math.max(progress, 0), 1);

      const eased = easeInOut(progress);

      // Move background position based on eased progress
      // Initial position 0% 50%, Moves to 100% 50%
      hero.style.backgroundPosition = `${eased * 100}% 50%`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-scroll-gradient pt-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Grid Pattern with Spotlight */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #444 1px, transparent 1px),
              linear-gradient(to bottom, #444 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
            WebkitMaskImage: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`
          }}
        />

        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary rounded-full opacity-10 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary rounded-full opacity-10 blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Video background placeholder - space for future video */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full" style={{ background: 'linear-gradient(rgba(11,11,11,0.85), rgba(11,11,11,0.95))' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <motion.button
            onClick={() => scrollToSection('services')}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-6 cursor-pointer hover:bg-white/10 transition-colors duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Play className="w-4 h-4 text-primary" fill="currentColor" />
            <span className="text-sm text-white/80 font-medium">Storytelling Video Editor</span>
          </motion.button>

          <div className="relative z-50 isolation-isolate pointer-events-none">
            <h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] tracking-tight overflow-visible pointer-events-auto"
              style={{ WebkitFontSmoothing: 'antialiased', textRendering: 'optimizeLegibility' }}
            >
              <span className="inline-block bg-gradient-to-r from-white via-gray-200 to-white bg-[length:200%_auto] bg-clip-text text-transparent transition-all duration-700 ease-in-out hover:bg-right hover:tracking-wide cursor-default hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                Transforming Raw Footage
              </span>
              <br />
              <span className="relative z-50 inline-block bg-gradient-to-r from-primary via-yellow-200 to-primary bg-[length:200%_auto] bg-clip-text text-transparent transition-all duration-700 ease-in-out hover:bg-right hover:tracking-wide cursor-default py-2">
                Into Engaging Stories
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop losing viewers to poor pacing. We turn raw footage into high-retention assets that grow your channel and brand.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <MagicButton
              onClick={() => scrollToSection('featured-work')}
              className="w-full sm:w-auto min-w-[200px]"
            >
              View Client Work
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </MagicButton>

            <MagicButton
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto min-w-[200px]"
            >
              Get Your Video Edited
            </MagicButton>
          </div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.03, delayChildren: 0.5 } }
            }}
            className="text-white/40 text-sm font-medium tracking-wide relative -top-[5px]"
          >
            {"Worked with 20+ creators across different niches".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;