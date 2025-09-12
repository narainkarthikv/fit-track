import Hero from '../components/dashboard/Hero';
import Features from '../components/dashboard/Features';
import ProgressShowcase from '../components/dashboard/ProgressShowcase';
import Testimonials from '../components/dashboard/Testimonials';
import Cta from '../components/dashboard/Cta';
import Footer from '../components/dashboard/Footer';

const DashBoard = () => {
  return (
    <>
      <Hero />
      <Features />
      <ProgressShowcase />
      <Testimonials />
      <div id="cta">
        <Cta />
      </div>
      <Footer />
    </>
  );
};

export default DashBoard;
