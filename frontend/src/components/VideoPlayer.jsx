import React, { useRef, useState, useEffect, useId } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useAudio } from '../context/AudioContext';
import { motion, AnimatePresence } from 'framer-motion';

const VideoPlayer = ({ videoUrl, poster, ServiceBadge, sectionId = 'global' }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [showMuteHint, setShowMuteHint] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    // Lazy loading
    const { ref: inViewRef, inView } = useInView({
        threshold: 0.5,
        triggerOnce: false
    });

    const playerId = useId();
    const { currentAudioId, requestAudioFocus } = useAudio();

    // Check for tooltip requirement on mount (scoped by sectionId)
    useEffect(() => {
        const tooltipKey = `hasSeenSoundTooltip_${sectionId}`;
        const hasSeenTooltip = localStorage.getItem(tooltipKey);

        if (!hasSeenTooltip) {
            // Show after slight delay
            const timer = setTimeout(() => {
                setShowTooltip(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [sectionId]);

    // Auto-hide tooltip after 5 seconds (increased duration)
    useEffect(() => {
        if (showTooltip) {
            const timer = setTimeout(() => {
                setShowTooltip(false);
                const tooltipKey = `hasSeenSoundTooltip_${sectionId}`;
                localStorage.setItem(tooltipKey, 'true');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showTooltip, sectionId]);

    // Check for mute interaction on mount (for the subtle pulse)
    useEffect(() => {
        const hasInteracted = localStorage.getItem('hasInteractedWithMute');
        if (!hasInteracted) {
            setShowMuteHint(true);
        }
    }, []);

    // Listen for global audio changes
    useEffect(() => {
        if (currentAudioId && currentAudioId !== playerId && !isMuted) {
            setIsMuted(true);
            if (videoRef.current) {
                videoRef.current.muted = true;
            }
        }
    }, [currentAudioId, playerId, isMuted]);

    // Handle inView changes for autoplay/pause
    useEffect(() => {
        if (videoRef.current) {
            if (inView) {
                videoRef.current.play().catch(e => {
                    // Autoplay might be blocked or failed
                    console.log("Autoplay failed", e);
                });
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    }, [inView]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateTime = () => {
            const current = video.currentTime;
            const total = video.duration || 1;
            setProgress((current / total) * 100);
        };

        const updateDuration = () => {
            setDuration(video.duration);
        };

        // Use native play/pause events to keep state in sync
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('loadedmetadata', updateDuration);
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);

        return () => {
            video.removeEventListener('timeupdate', updateTime);
            video.removeEventListener('loadedmetadata', updateDuration);
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
        };
    }, []);

    const togglePlay = (e) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
                // If we are playing and not muted, claim focus
                // If we are playing and muted, we don't disturb others
                if (!isMuted) {
                    requestAudioFocus(playerId);
                }
            }
        }
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        if (showMuteHint) {
            setShowMuteHint(false);
        }
        if (showTooltip) {
            setShowTooltip(false);
            const tooltipKey = `hasSeenSoundTooltip_${sectionId}`;
            localStorage.setItem(tooltipKey, 'true');
        }

        // Persist interaction so animation never runs again
        localStorage.setItem('hasInteractedWithMute', 'true');

        if (videoRef.current) {
            const newMuted = !isMuted;
            videoRef.current.muted = newMuted;
            setIsMuted(newMuted);

            if (!newMuted) {
                requestAudioFocus(playerId);
            }
        }
    };

    const handleSeek = (e) => {
        e.stopPropagation();
        const seekTime = (e.target.value / 100) * (videoRef.current?.duration || 0);
        if (videoRef.current) {
            videoRef.current.currentTime = seekTime;
        }
        setProgress(e.target.value);
    };

    const formatTime = (time) => {
        if (!time) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div
            ref={inViewRef}
            className="relative w-full h-full group/player"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <video
                ref={videoRef}
                poster={poster}
                className="absolute inset-0 w-full h-full object-cover"
                // Only autoplay if in view
                autoPlay={inView}
                loop
                muted={isMuted} // Controlled by React state
                defaultMuted={true}
                playsInline
                preload="none"
                onClick={togglePlay} // Click video to toggle play
            >
                <source src={videoUrl} type="video/mp4" />
            </video>

            {/* Fallback Play Button Overlay (when paused manually) */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,195,0,0.4)] animate-pulse">
                        <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                    </div>
                </div>
            )}

            {/* Custom Controls Overlay */}
            <div
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-12 pb-4 px-5 transition-all duration-300 z-20 ${isHovering || !isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
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

                    {/* Draggable Input (Invisible but interactive) */}
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
                                {formatTime(videoRef.current?.currentTime)} / {formatTime(duration)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Right Mute Button - Visual Cue Only */}
            <div className="absolute top-4 right-4 z-30 flex items-center">
                <AnimatePresence>
                    {showTooltip && (
                        <motion.div
                            initial={{ opacity: 0, x: 10, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="mr-3 relative group/tooltip"
                        >
                            <div className="bg-black/80 backdrop-blur-md border border-primary/50 text-white text-[10px] font-medium px-3 py-1.5 rounded-full shadow-lg flex items-center whitespace-nowrap">
                                <span className="text-primary mr-1.5">●</span>
                                Tap to enable sound
                            </div>
                            {/* Arrow pointing right */}
                            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-primary/50" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={toggleMute}
                    className={`w-10 h-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center hover:bg-primary group/mute shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 ${showMuteHint ? 'animate-[pulse_1.5s_ease-in-out_3]' : ''}`}
                    title={isMuted ? "Unmute" : "Mute"}
                    onAnimationEnd={() => setShowMuteHint(false)}
                >
                    {isMuted ? (
                        <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                        <Volume2 className="w-5 h-5 text-white group-hover/mute:text-primary-foreground" />
                    )}
                </button>
            </div>

            {/* Service Badge (passed purely for display, hidden on interactions) */}
            {!isHovering && ServiceBadge && (
                <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none transition-opacity duration-300">
                    {ServiceBadge}
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
