import React from 'react';
import Navbar from '../components/Home/Navbar';
import Hero from '../components/Home/Hero';
import WhyBMSCEEventManagement from '../components/Home/WhyBMSCEEventManagement';
import Features from '../components/Home/Features';
import EventsHighlight from '../components/Home/EventsHighlight';
import Testimonials from '../components/Home/Testimonials';
import Footer from '../components/Home/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      <Hero />
      <WhyBMSCEEventManagement />
      <Features />
      <EventsHighlight />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;