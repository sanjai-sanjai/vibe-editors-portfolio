import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsLeftRight, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const containerRef = useRef(null);
  const beforeVideoRef = useRef(null);
  const afterVideoRef = useRef(null);

  // Lazy loading
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false
  });

  // Video URLs
  const beforeUrl = "https://res.cloudinary.com/dntyusnxe/video/upload/portfolio_beforeee_kwd58k.mp4";
  const afterUrl = "https://res.cloudinary.com/dntyusnxe/video/upload/transformation_v62ft3.mp4";

  const handleMove = useCallback((clientX) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  }, []);

  const onMouseDown = useCallback(() => setIsDragging(true), []);
  const onMouseUp = useCallback(() => setIsDragging(false), []);
  const onMouseMove = useCallback((e) => {
    if (isDragging) handleMove(e.clientX);
  }, [isDragging, handleMove]);

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

  const onInteractionStart = useCallback(() => setShowHint(false), []);

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
  }, [isDragging, onInteractionStart, onMouseUp, onMouseMove]);

  // Video Control Logic
  const togglePlay = useCallback(() => {
    const v1 = beforeVideoRef.current;
    const v2 = afterVideoRef.current;

    if (v1 && v2) {
      if (isPlaying) {
        v1.pause();
        v2.pause();
      } else {
        v1.play();
        v2.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const toggleMute = useCallback((e) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (beforeVideoRef.current) beforeVideoRef.current.muted = newMuted;
    if (afterVideoRef.current) afterVideoRef.current.muted = newMuted;
  }, [isMuted]);

  const handleSeek = (e) => {
    const seekTime = (Number(e.target.value) / 100) * duration;
    if (beforeVideoRef.current) beforeVideoRef.current.currentTime = seekTime;
    if (afterVideoRef.current) afterVideoRef.current.currentTime = seekTime;
    setProgress(Number(e.target.value));
  };

  // Sync Videos
  useEffect(() => {
    const v1 = beforeVideoRef.current;
    const v2 = afterVideoRef.current;

    const syncInterval = setInterval(() => {
      if (!v1 || !v2) return;

      // Update progress
      if (!v1.paused) {
        const current = v1.currentTime;
        const total = v1.duration || 1;
        setProgress((current / total) * 100);
        setDuration(v1.duration);
      }

      // Sync playback
      if (Math.abs(v1.currentTime - v2.currentTime) > 0.1) {
        v2.currentTime = v1.currentTime;
      }
      if (v1.paused !== v2.paused) {
        if (v1.paused) v2.pause();
        else v2.play();
      }
    }, 100);

    return () => clearInterval(syncInterval);
  }, []);

  // Autoplay when in view
  useEffect(() => {
    if (beforeVideoRef.current && afterVideoRef.current) {
      if (inView) {
        beforeVideoRef.current.play().catch(() => { });
        afterVideoRef.current.play().catch(() => { });
        setIsPlaying(true);
      } else {
        beforeVideoRef.current.pause();
        afterVideoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [inView]);


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

        {/* Video Container */}
        <motion.div
          ref={inViewRef}
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
          className="w-full max-w-sm mx-auto group/video"
        >
          <div className="bg-card rounded-2xl p-4 shadow-2xl relative">
            <div
              ref={containerRef}
              className="relative rounded-xl overflow-hidden aspect-[9/16] cursor-ew-resize group select-none"
              onTouchMove={onTouchMove}
            >
              {/* Before Video (Background) */}
              <video
                ref={beforeVideoRef}
                src={beforeUrl}
                className="absolute inset-0 w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
              />

              {/* After Video (Foreground - Clipped) */}
              <video
                ref={afterVideoRef}
                src={afterUrl}
                className="absolute inset-0 w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                style={{
                  clipPath: `inset(0 0 0 ${sliderPosition}%)`
                }}
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

              {/* Top Right Mute Button */}
              <button
                onClick={toggleMute}
                className="absolute top-16 right-4 z-30 w-10 h-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center hover:bg-primary group/mute shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white group-hover/mute:text-primary-foreground" />
                )}
              </button>

              {/* Custom Controls Overlay */}
              <div
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-12 pb-4 px-5 transition-all duration-300 z-30 ${isPlaying ? 'opacity-0 translate-y-4 group-hover/video:opacity-100 group-hover/video:translate-y-0' : 'opacity-100 translate-y-0'}`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modern Slider / Playhead */}
                <div className="relative w-full h-4 flex items-center mb-3 group/slider">
                  {/* Background Track */}
                  <div className="absolute left-0 right-0 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Draggable Input */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={progress}
                    onChange={handleSeek}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />

                  {/* Drag Thumb (Visual Only) */}
                  <div
                    className="absolute h-3 w-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,195,0,0.8)] pointer-events-none transition-all duration-100 ease-linear group-hover/slider:scale-125 group-hover/slider:h-4 group-hover/slider:w-4"
                    style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
                  />
                </div>

                {/* Control Buttons Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlay}
                      className="p-2 rounded-full hover:bg-white/10 text-white transition-all transform hover:scale-110 active:scale-95"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
                    </button>

                    <div className="flex flex-col">
                      <span className="text-xs text-white/90 font-medium font-mono tracking-wider">
                        {Math.floor(duration * (progress / 100) / 60)}:{String(Math.floor(duration * (progress / 100) % 60)).padStart(2, '0')} / {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

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