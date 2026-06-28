import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import ByTheNumbers from './sections/ByTheNumbers';
import FeaturedWork from './sections/FeaturedWork';
import AlsoWork from './sections/AlsoWork';
import HowIWork from './sections/HowIWork';
import About from './sections/About';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  return (
    <div className="relative bg-cream">
      <ScrollProgress />
      <Navigation />
      <Hero />
      <ByTheNumbers />
      <FeaturedWork />
      <AlsoWork />
      <HowIWork />
      <About />
      <Experience />
      <Contact />
    </div>
  );
}
