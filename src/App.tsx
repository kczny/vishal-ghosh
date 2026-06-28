import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import FeaturedProjects from './sections/FeaturedProjects';
import ProfessionalImpact from './sections/ProfessionalImpact';
import Contact from './sections/Contact';

export default function App() {
  return (
    <div className="relative">
      <Navigation />
      <Hero />
      <About />
      <FeaturedProjects />
      <ProfessionalImpact />
      <Contact />
    </div>
  );
}
