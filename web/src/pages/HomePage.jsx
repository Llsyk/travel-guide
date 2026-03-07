import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Eye, BookOpen, Headphones, ArrowRight, Compass, Map } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { locations } from '../data/locations.js';

const HomePage = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const features = [
    {
      icon: Eye,
      title: '360° Immersion',
      description: 'Step inside the golden pagodas with high-definition panoramic virtual tours.',
      color: 'bg-blue-500/10 text-blue-600'
    },
    {
      icon: BookOpen,
      title: 'Rich Heritage',
      description: 'Uncover centuries of history through curated architectural and cultural stories.',
      color: 'bg-emerald-500/10 text-emerald-600'
    },
    {
      icon: Headphones,
      title: 'Spatial Audio',
      description: 'Experience the atmosphere with site-specific sounds and expert narration.',
      color: 'bg-amber-500/10 text-amber-600'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Myanmar Explorer | Journey Through the Golden Land</title>
      </Helmet>

      {/* Reading Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-amber-500 z-[3000] origin-left" style={{ scaleX }} />

      <div className="min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-amber-200">
        <Navbar />

        {/* --- Hero Section --- */}
        <section className="relative h-[90vh] flex items-center justify-center px-4 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src="https://images.unsplash.com/photo-1597811815557-1ecd3f88fc6c" 
              className="w-full h-full object-cover"
              alt="Bagan Myanmar"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-[#FAFAFA]" />
          </div>

          <div className="relative z-10 text-center max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <span className="inline-block py-1 px-3 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium tracking-widest uppercase">
                The Digital Gateway to Myanmar
              </span>
              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">Unexplored.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
                A premium virtual experience through the heart of Southeast Asia’s most mysterious landscapes.
              </p>
              <button
                onClick={() => navigate('/explore')}
                className="group px-10 py-5 bg-white text-slate-900 font-bold rounded-full hover:scale-105 transition-all flex items-center gap-3 mx-auto shadow-2xl"
              >
                Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* --- Destinations Grid (Using your data) --- */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Destinations</h2>
                <p className="text-slate-400 text-lg font-light">Experience the architectural marvels of the Golden Land.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locations.map((loc) => (
                <motion.div 
                  key={loc.id} 
                  whileHover={{ y: -10 }}
                  // CLICK ACTION: Navigate to the detail page using the ID
                  onClick={() => navigate(`/location/${loc.id}`)}
                  className="group cursor-pointer relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl"
                >
                  {/* BACKGROUND IMAGE - Corrected to 'thumbnail' based on your data */}
                  <img 
                    src={loc.thumbnail} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={loc.name} 
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1548013146-72479768bada'; }} // Fallback
                  />
                  
                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* CONTENT */}
                  <div className="absolute bottom-10 left-10 right-10">
                    <p className="text-amber-400 font-bold text-xs uppercase tracking-[0.2em] mb-2">{loc.tagline}</p>
                    <h4 className="text-3xl font-bold mb-4 tracking-tight">{loc.name}</h4>
                    <div className="h-1 w-0 group-hover:w-full bg-amber-500 transition-all duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Features Bento --- */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="p-10 rounded-[3rem] bg-white border border-slate-100 hover:shadow-2xl transition-all">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${f.color}`}>
                  <f.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-light">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="py-24 px-6 mb-20">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-amber-500 to-orange-600 rounded-[3.5rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-5xl font-black mb-6">Ready to begin?</h2>
              <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">Start your virtual journey through Myanmar's most breathtaking destinations today.</p>
              <button 
                onClick={() => navigate('/explore')}
                className="px-12 py-5 bg-slate-950 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl"
              >
                Launch Map Explorer
              </button>
            </div>
            <Map className="absolute -bottom-10 -right-10 w-64 h-64 text-white/10 rotate-12" />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;