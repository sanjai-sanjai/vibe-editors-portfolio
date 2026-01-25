import React from 'react';
import { motion } from 'framer-motion';
import { clientProjects } from '../mock';
import ProjectCard from './ProjectCard';

const ProjectsGrid = () => {

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Client <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Diverse projects showcasing versatility across different content types and platforms
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {clientProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} sectionId="projects" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;