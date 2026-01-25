import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

const ProjectCard = ({ project, index, sectionId }) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_0_40px_rgba(255,195,0,0.2)] transition-all duration-300 group w-full flex flex-col h-full"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="relative aspect-[9/16] bg-black group-video">
                {project.videoUrl ? (
                    <VideoPlayer
                        videoUrl={project.videoUrl}
                        sectionId={sectionId}
                        ServiceBadge={
                            <span className="inline-block text-xs text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                                {project.service}
                            </span>
                        }
                    />
                ) : (
                    /* Fallback for no video */
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1F1F1F] to-[#0A0A0A] flex items-center justify-center">
                        <div className="relative z-10 w-16 h-16 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,195,0,0.4)]">
                            <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                        </div>
                        {/* Service Badge for fallback */}
                        <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
                            <span className="inline-block text-xs text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                                {project.service}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Project details below video */}
            <div className="p-5 flex-1 bg-card relative z-20">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                    {project.description}
                </p>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
