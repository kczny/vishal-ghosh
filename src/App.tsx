import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import ForecastingEngine from './sections/ForecastingEngine';
import FeaturedProjects from './sections/FeaturedProjects';
import ProfessionalImpact from './sections/ProfessionalImpact';
import Contact from './sections/Contact';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  return (
    <div className="relative">
      <ScrollProgress />
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <ForecastingEngine />
      <FeaturedProjects />
      <ProfessionalImpact />
      <Contact />
    </div>
  );
}
