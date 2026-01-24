import React from "react";
import "./App.css";
import { AudioProvider } from "./context/AudioContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedCarousel from "./components/FeaturedCarousel";
import BeforeAfter from "./components/BeforeAfter";
import ProjectsGrid from "./components/ProjectsGrid";
import Services from "./components/Services";
import Tools from "./components/Tools";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <AudioProvider>
      <div className="App bg-background min-h-screen">
        <Navbar />
        <Hero />
        <FeaturedCarousel />
        <BeforeAfter />
        <ProjectsGrid />
        <Services />
        <Tools />
        <Contact />
        <Footer />
      </div>
    </AudioProvider>
  );
}

export default App;
