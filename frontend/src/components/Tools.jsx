import React from 'react';
import { motion } from 'framer-motion';
import { tools } from '../mock';

const Tools = () => {
  return (
    <section id="tools" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Professional <span className="text-primary">Tools</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Tools don't create stories, we do. But we use the industry's best to execute your vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-primary/20 hover:bg-zinc-900/60 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 text-center flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 mx-auto bg-primary/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:scale-105 transition-all duration-500 p-3 ring-1 ring-white/5 group-hover:ring-primary/20">
                <img
                  src={tool.logoUrl}
                  alt={tool.name}
                  className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ transform: `scale(${tool.scale || 1})` }}
                />
              </div>
              <h3 className="text-sm font-medium text-white/90 mb-1 group-hover:text-primary transition-colors duration-300">
                {tool.name}
              </h3>
              <p className="text-xs text-white/40 group-hover:text-white/50 transition-colors duration-300">
                {tool.category}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-white/50 text-sm">
            Always learning and adapting to the latest editing technologies
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Tools;