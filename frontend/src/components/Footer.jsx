import React from 'react';
import { Phone, Mail, Linkedin, Instagram, ArrowRight, Twitter, Youtube } from 'lucide-react';
import { contactInfo } from '../mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand */}
          <div className="space-y-6">
            <img
              src="/assets/images/editverse-logo-v2.png"
              alt="EDITVERSE"
              className="h-[55px] w-auto object-contain"
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Transforming raw footage into cinematic masterpieces. We tell stories that captivate, engage, and inspire.
            </p>
            <div className="flex gap-4">
              <SocialLink href={contactInfo.linkedin} icon={Linkedin} label="LinkedIn" />
              <SocialLink href={contactInfo.instagram} icon={Instagram} label="Instagram" />
              <SocialLink href={`mailto:${contactInfo.email}`} icon={Mail} label="Email" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <FooterLink href="#home">Home</FooterLink>
              <FooterLink href="#tools">Tools</FooterLink>
              <FooterLink href="#work">Featured Work</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-4">
              <li className="text-white/60 text-sm">Video Editing</li>
              <li className="text-white/60 text-sm">Color Grading</li>
              <li className="text-white/60 text-sm">Sound Design</li>
              <li className="text-white/60 text-sm">Motion Graphics</li>
            </ul>
          </div>

          {/* Column 4: CTA */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Ready to Start?</h3>
            <p className="text-white/60 text-sm mb-6">
              Let's create something amazing together. Reach out to discuss your next project.
            </p>
            <a
              href="tel:7810044095"
              className="inline-flex items-center justify-center w-full bg-primary hover:bg-[#FFB703] text-primary-foreground px-6 py-3 rounded-lg transition-all duration-300 group font-medium cta-glow"
            >
              Get Your Video Edited
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} EDITVERSE. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/70 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
  </a>
);

const FooterLink = ({ href, children }) => (
  <li>
    <a
      href={href}
      className="text-white/60 hover:text-primary text-sm transition-colors flex items-center gap-2 group"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      {children}
    </a>
  </li>
);

export default Footer;