import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { contactInfo } from '../mock';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary rounded-full opacity-5 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary rounded-full opacity-5 blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Contact for Similar Edits
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Let's turn your raw footage into a compelling story that captivates your audience
          </p>
          <p className="text-primary/80 font-medium mt-4">
            Quick replies. Clear pricing. Professional delivery.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Phone */}
            <a
              href={`tel:${contactInfo.phone}`}
              className="group relative overflow-hidden bg-card rounded-3xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,195,0,0.15)] flex items-center"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full group-hover:bg-primary/20 transition-all duration-500" />

              <div className="relative z-10 mr-6">
                <div className="w-20 h-20 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
                  <img
                    src={contactInfo.visuals.phone}
                    alt="Phone"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">Phone</h3>
                <p className="text-white/60 font-medium">{contactInfo.phone}</p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contactInfo.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-card rounded-3xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,195,0,0.15)] flex items-center"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full group-hover:bg-primary/20 transition-all duration-500" />

              <div className="relative z-10 mr-6">
                <div className="w-20 h-20 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
                  <img
                    src={contactInfo.visuals.email}
                    alt="Email"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">Email</h3>
                <p className="text-white/60 font-medium break-all">{contactInfo.email}</p>
              </div>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LinkedIn */}
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-card rounded-3xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,195,0,0.15)] flex items-center"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full group-hover:bg-primary/20 transition-all duration-500" />

              <div className="relative z-10 mr-6">
                <div className="w-20 h-20 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
                  <img
                    src={contactInfo.visuals.linkedin}
                    alt="LinkedIn"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">LinkedIn</h3>
                <div className="flex items-center text-white/40 text-sm group-hover:text-primary transition-colors">
                  <span>Connect</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>

            {/* Instagram */}
            <a
              href={contactInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-card rounded-3xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,195,0,0.15)] flex items-center"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full group-hover:bg-primary/20 transition-all duration-500" />

              <div className="relative z-10 mr-6">
                <div className="w-20 h-20 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
                  <img
                    src={contactInfo.visuals.instagram}
                    alt="Instagram"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">Instagram</h3>
                <div className="flex items-center text-white/40 text-sm group-hover:text-primary transition-colors">
                  <span>Follow</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 pt-8 border-t border-white/5 text-center"
          >
            <Button
              onClick={() => window.location.href = 'tel:7810044095'}
              className="bg-primary hover:bg-[#FFB703] text-primary-foreground px-10 py-6 text-lg rounded-full min-h-[60px] transition-all duration-300 cta-glow hover:scale-105 group"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;