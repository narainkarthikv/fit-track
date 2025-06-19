import React from 'react';
import Hero from '../components/dashboard/Hero';
import Features from '../components/dashboard/Features';
import ProgressShowcase from '../components/dashboard/ProgressShowcase';
import Testimonials from '../components/dashboard/Testimonials';
import CTA from '../components/dashboard/CTA';
import Footer from '../components/dashboard/Footer';

const DashBoard = () => {
  return (
    <>
      <Hero />
      <Features />
      <ProgressShowcase />
      <Testimonials />
      <div id="cta">
        <CTA />
      </div>
      <Footer />
    </>
  );
};

export default DashBoard;
