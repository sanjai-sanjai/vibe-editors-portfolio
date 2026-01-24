import React from 'react';
import { motion } from 'framer-motion';
import { Film, Youtube, Smartphone, Zap, Music, Palette } from 'lucide-react';
import { services } from '../mock';

const iconMap = {
  Film: Film,
  Youtube: Youtube,
  Smartphone: Smartphone,
  Zap: Zap,
  Music: Music,
  Palette: Palette
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            What <span className="text-primary">We Do</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Professional video editing services tailored to your content goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-card rounded-2xl p-8 border border-white/5 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <IconComponent className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;