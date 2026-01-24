import React, { useState, useRef, useEffect, useCallback, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Volume2, VolumeX, ChevronsLeftRight, ChevronLeft, ChevronRight } from 'lucide-react';
import beforeVideo from '../assets/comparison/before.mp4';
import afterVideo from '../assets/comparison/after.mp4';
import sliderHandleImage from '../assets/comparison/slider-handle.png';
import { useAudio } from '../context/AudioContext';

const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isMuted, setIsMuted] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const containerRef = useRef(null);
  const beforeVideoRef = useRef(null);
  const afterVideoRef = useRef(null);

  const playerId = useId();
  const { currentAudioId, requestAudioFocus } = useAudio();

  // Listen for global audio changes
  useEffect(() => {
    if (currentAudioId && currentAudioId !== playerId && !isMuted) {
      setIsMuted(true);
    }
  }, [currentAudioId, playerId, isMuted]);

  const handleMove = useCallback((clientX) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  }, []);

  const onMouseDown = () => setIsDragging(true);
  const onMouseUp = () => setIsDragging(false);
  const onMouseMove = (e) => {
    if (isDragging) handleMove(e.clientX);
  };

  const onTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const [showHint, setShowHint] = useState(false);
  const hasTriggeredHint = useRef(false);

  // Auto-hide hint timer
  useEffect(() => {
    if (showHint) {
      const timer = setTimeout(() => setShowHint(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showHint]);

  const onInteractionStart = () => setShowHint(false);

  useEffect(() => {
    if (isDragging) {
      onInteractionStart();
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('mousemove', onMouseMove);
    }
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isDragging, handleMove]);

  const toggleMute = (e) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    if (!newMuted) {
      requestAudioFocus(playerId);
    }
  };

  // Sync videos ensures they stay aligned
  useEffect(() => {
    const sync = setInterval(() => {
      const v1 = beforeVideoRef.current;
      const v2 = afterVideoRef.current;
      if (v1 && v2 && Math.abs(v1.currentTime - v2.currentTime) > 0.1) {
        v2.currentTime = v1.currentTime;
      }
    }, 1000);
    return () => clearInterval(sync);
  }, []);

  const handleError = () => {
    setVideoError("Unable to load comparison videos.");
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            See the <span className="text-primary">Transformation</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Drag the slider to compare raw footage vs. the final edit
          </p>
        </motion.div>

        {/* Update container to trigger hint */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onViewportEnter={() => {
            if (!hasTriggeredHint.current) {
              setShowHint(true);
              hasTriggeredHint.current = true;
            }
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-sm mx-auto"
        >
          <div className="bg-card rounded-2xl p-4 shadow-2xl">
            <div
              ref={containerRef}
              className="relative rounded-xl overflow-hidden aspect-[9/16] cursor-ew-resize group select-none"
              onTouchMove={onTouchMove}
            >
              {videoError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white">
                  <AlertCircle className="w-12 h-12 text-red-500 mb-2" />
                  <p>{videoError}</p>
                </div>
              ) : (
                <>
                  {/* Before Video (Background) */}
                  <video
                    ref={beforeVideoRef}
                    src={beforeVideo}
                    className="absolute inset-0 w-full h-full object-cover"
                    loop
                    muted={isMuted}
                    autoPlay
                    playsInline
                    onError={handleError}
                  />

                  {/* After Video (Foreground - Clipped) */}
                  <video
                    ref={afterVideoRef}
                    src={afterVideo}
                    className="absolute inset-0 w-full h-full object-cover"
                    loop
                    muted={isMuted}
                    autoPlay
                    playsInline
                    style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                    onError={handleError}
                  />

                  {/* Slider Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize z-20 shadow-[0_0_10px_rgba(255,195,0,0.5)]"
                    style={{ left: `${sliderPosition}%` }}
                    onMouseDown={(e) => { onMouseDown(); onInteractionStart(); }}
                    onTouchStart={(e) => { onMouseDown(); onInteractionStart(); }}
                  >
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center cursor-ew-resize border-4 border-black shadow-[0_0_20px_rgba(255,195,0,0.6)] hover:scale-110 transition-transform ${showHint ? 'animate-pulse ring-4 ring-primary/30' : ''}`}>
                      <ChevronsLeftRight className="w-6 h-6 text-black" />

                      {/* Drag Hint Arrows */}
                      <AnimatePresence>
                        {showHint && (
                          <>
                            <motion.div
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: [0, 1, 0], x: [10, 25, 30] }}
                              exit={{ opacity: 0 }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                              className="absolute left-full top-1/2 -translate-y-1/2 text-primary drop-shadow-md pointer-events-none"
                            >
                              <ChevronRight size={28} strokeWidth={3} />
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: [0, 1, 0], x: [-10, -25, -30] }}
                              exit={{ opacity: 0 }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                              className="absolute right-full top-1/2 -translate-y-1/2 text-primary drop-shadow-md pointer-events-none"
                            >
                              <ChevronLeft size={28} strokeWidth={3} />
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Labels */}
                  <div
                    onClick={() => setSliderPosition(100)}
                    className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium z-10 cursor-pointer hover:bg-black/80 transition-colors select-none"
                  >
                    Before
                  </div>
                  <div
                    onClick={() => setSliderPosition(0)}
                    className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-medium z-10 cursor-pointer hover:bg-primary transition-colors select-none"
                  >
                    After
                  </div>

                  {/* Mute Button - Top Right */}
                  <button
                    onClick={toggleMute}
                    className="absolute top-16 right-4 z-30 p-2.5 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md transition-all border border-white/10 hover:scale-105"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </>
              )}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div
                onClick={() => setSliderPosition(100)}
                className="bg-muted rounded-lg p-4 cursor-pointer hover:bg-white/5 transition-colors group"
              >
                <p className="text-white/40 text-xs mb-1 group-hover:text-white/60">Before</p>
                <p className="text-white text-sm">Raw Footage</p>
              </div>
              <div
                onClick={() => setSliderPosition(0)}
                className="bg-primary/10 border border-primary/20 rounded-lg p-4 cursor-pointer hover:bg-primary/20 transition-colors group"
              >
                <p className="text-primary text-xs mb-1 group-hover:text-primary/80">After</p>
                <p className="text-white text-sm">Polished Edit</p>
              </div>
            </div>
          </div>
        </motion.div >
      </div >
    </section >
  );
};

export default BeforeAfter;