import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Eye, BookOpen, Headphones, ArrowRight, Compass, Map, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

// --- Swiper Imports ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { locations } from '../data/locations.js';

const HomePage = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

 const features = [
    { 
      icon: Compass, 
      title: 'Tourist Tour', 
      description: 'Start an autonomous guided journey through the nearest routes of 11 historic temples.', 
      color: 'bg-amber-500/10 text-amber-600',
      path: '/launcher' // This should match your Route path for TempleLauncher.jsx
    },
    { 
      icon: BookOpen, 
      title: 'Rich Heritage', 
      description: 'Uncover centuries of history through curated cultural stories.', 
      color: 'bg-emerald-500/10 text-emerald-600',
      path: '/explore' 
    },
    { 
      icon: Headphones, 
      title: 'Spatial Audio', 
      description: 'Experience the atmosphere with site-specific sounds.', 
      color: 'bg-blue-500/10 text-blue-600',
      path: '/explore'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Myanmar Explorer | Journey Through the Golden Land</title>
      </Helmet>

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-amber-500 z-[3000] origin-left" style={{ scaleX }} />

      <div className="min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-amber-200">
        <Navbar />

        {/* --- Hero Section --- */}
        <section className="relative h-[90vh] flex items-center justify-center px-4 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.img initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }}
              src="https://images.unsplash.com/photo-1597811815557-1ecd3f88fc6c" 
              className="w-full h-full object-cover" alt="Bagan Myanmar"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-[#FAFAFA]" />
          </div>
          <div className="relative z-10 text-center max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-block py-1 px-3 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium tracking-widest uppercase">The Digital Gateway to Myanmar</span>
              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">Unexplored.</span>
              </h1>
              <button onClick={() => navigate('/explore')} className="group px-10 py-5 bg-white text-slate-900 font-bold rounded-full hover:scale-105 transition-all flex items-center gap-3 mx-auto shadow-2xl">
                Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* --- DESTINATIONS SLIDER SECTION --- */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 italic font-serif">Featured Destinations</h2>
                <p className="text-slate-400 text-lg font-light">Swipe to explore {locations.length} architectural marvels.</p>
              </div>
              
              {/* Custom Navigation Buttons */}
              <div className="flex gap-4">
                <button className="swiper-prev-btn p-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button className="swiper-next-btn p-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                prevEl: '.swiper-prev-btn',
                nextEl: '.swiper-next-btn',
              }}
              pagination={{ clickable: true, dynamicBullets: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="pb-20 !overflow-visible"
            >
              {locations.map((loc) => (
                <SwiperSlide key={loc.id}>
                  <motion.div 
                    whileHover={{ y: -10 }}
                    onClick={() => navigate(`/location/${loc.id}`)}
                    className="group cursor-pointer relative h-[550px] rounded-[3rem] overflow-hidden shadow-2xl bg-slate-800"
                  >
                    <img src={loc.thumbnail} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={loc.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                    <div className="absolute bottom-10 left-10 right-10">
                      <p className="text-amber-400 font-bold text-xs uppercase tracking-[0.2em] mb-2">{loc.tagline}</p>
                      <h4 className="text-3xl font-bold mb-4 tracking-tight">{loc.name}</h4>
                      <div className="flex items-center gap-2 text-white/60 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        View Details <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* --- Features Bento --- */}
        {/* --- Features Bento --- */}
<section className="py-24 max-w-7xl mx-auto px-6">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {features.map((f, i) => (
      <div 
        key={i} 
        onClick={() => navigate(f.path)}
        className="p-10 rounded-[3rem] bg-white border border-slate-100 hover:shadow-2xl transition-all cursor-pointer group"
      >
        {/* FIX HERE: Change s.icon to f.icon */}
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 ${f.color}`}>
          <f.icon className="w-8 h-8" /> 
        </div>
        
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          {f.title} 
          <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </h3>
        <p className="text-slate-500 leading-relaxed font-light">{f.description}</p>
      </div>
    ))}
  </div>
</section>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;