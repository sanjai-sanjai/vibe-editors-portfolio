import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { featuredProjects } from '../mock';
import VideoPlayer from './VideoPlayer';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const FeaturedCarousel = () => {
  const swiperRef = useRef(null);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="featured-work" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Featured <span className="text-primary">Work</span>
          </h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.03 } }
            }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            {"Helping creators keep viewers till the last second".split("").map((char, index) => (
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

        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 10,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false
            }}
            speed={700}
            pagination={{
              clickable: true,
              dynamicBullets: true
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 30
              },
              1280: {
                slidesPerView: 2.5,
                spaceBetween: 40
              }
            }}
            className="featured-swiper pb-24"
          >
            {featuredProjects.map((project, index) => (
              <SwiperSlide key={project.id}>
                {project.isCTA ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                    whileHover={{ scale: 1.02 }}
                    className="relative min-h-[500px] h-auto md:h-[600px] w-full rounded-2xl overflow-hidden p-8 flex items-center justify-center group overflow-hidden"
                  >
                    {/* Dark Premium Background */}
                    <div className="absolute inset-0 bg-zinc-950 z-0" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700 z-0" />

                    {/* Animated Border/Glow */}
                    <div className="absolute inset-0 border border-white/10 group-hover:border-primary/30 rounded-2xl transition-colors duration-500 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />

                    <div className="relative z-20 text-center max-w-lg">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                      >
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-lg text-white/70 mb-10 leading-relaxed max-w-md mx-auto">
                          {project.description}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.4, duration: 0.6 }}
                      >
                        <Button
                          onClick={scrollToContact}
                          className="bg-primary text-black hover:bg-primary/90 px-10 py-7 text-lg rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,195,0,0.4)] group relative overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center font-bold tracking-wide">
                            Get in Touch
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    className="bg-card rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(255,195,0,0.3)] transition-all duration-300 group max-w-[300px] mx-auto h-full flex flex-col"
                  >
                    {/* Video Placeholder - 9:16 ratio */}
                    <div className="relative bg-muted aspect-[9/16] flex items-center justify-center group-video">
                      {project.videoUrl ? (
                        <VideoPlayer
                          videoUrl={project.videoUrl}
                          ServiceBadge={
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs text-white/60 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                                {project.duration}
                              </span>
                              <span className="text-xs text-white/60 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                                {project.category}
                              </span>
                            </div>
                          }
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      )}

                      {!project.videoUrl && (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="relative z-10 w-20 h-20 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_30px_rgba(255,195,0,0.6)] group-hover:shadow-[0_0_50px_rgba(255,195,0,0.8)] transition-all duration-300"
                        >
                          <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
                        </motion.div>
                      )}

                      {!project.videoUrl && (
                        <div className="absolute bottom-6 left-6 right-6 z-10">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-white/60 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                              {project.duration}
                            </span>
                            <span className="text-xs text-white/60 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                              {project.category}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-6 flex-1 flex flex-col justify-end">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/60 text-sm mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => swiperRef.current?.swiper.slideNext()}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .featured-swiper .swiper-pagination-bullet {
          background: #fff;
          opacity: 0.3;
          width: 10px;
          height: 10px;
        }
        .featured-swiper .swiper-pagination-bullet-active {
          background: #FFC300;
          opacity: 1;
          width: 30px;
          border-radius: 5px;
        }
        .featured-swiper .swiper-pagination {
          bottom: 0px !important;
        }
      `}</style>
    </section>
  );
};

export default FeaturedCarousel;