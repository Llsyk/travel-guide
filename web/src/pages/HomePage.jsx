import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Eye, BookOpen, Headphones, ArrowRight, Compass, Map, ChevronLeft, ChevronRight, Languages } from 'lucide-react';
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
  
  // 1. Language State
  const [lang, setLang] = React.useState('en');
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // 2. Translation Object for Home Page static text
  const langData = {
    en: {
      heroTag: 'The Digital Gateway to Myanmar',
      heroTitle1: 'Explore the',
      heroTitle2: 'Unexplored.',
      heroBtn: 'Start Your Journey',
      featTitle: 'Featured Destinations',
      featSub: `Swipe to explore ${locations.length} architectural marvels.`,
      tour360Badge: 'Immersive Experience',
      tour360Title: '360° Aerial Horizon',
      dragInstruction: 'Drag to explore surroundings'
    },
    my: {
      heroTag: 'မြန်မာနိုင်ငံ၏ ဒစ်ဂျစ်တယ် တံခါးပေါက်',
      heroTitle1: 'မရောက်ဖူးသေးသော နေရာများကို',
      heroTitle2: 'ရှာဖွေပါ။',
      heroBtn: 'ခရီးစဉ် စတင်မည်',
      featTitle: 'ထူးခြားသော နေရာများ',
      featSub: `ဗိသုကာ လက်ရာမွန် ${locations.length} ခုကို လေ့လာပါ။`,
      tour360Badge: 'အပြည့်အဝကြည့်ရှုခံစားရန်',
      tour360Title: '၃၆၀ ဒီဂရီ ဝေဟင်မြင်ကွင်း',
      dragInstruction: 'ပတ်ဝန်းကျင်ကို လှည့်လည်ကြည့်ရှုပါ'
    }
  };

  const features = [
    { 
      icon: Compass, 
      title: lang === 'en' ? 'Tourist Tour' : 'ခရီးသွား လမ်းညွှန်', 
      description: lang === 'en' ? 'Start an autonomous guided journey through the nearest routes of 11 historic temples.' : 'သမိုင်းဝင် ဘုရား ၁၁ ဆူသို့ အလိုအလျောက် လမ်းညွှန်စနစ်ဖြင့် သွားရောက်ပါ။', 
      color: 'bg-amber-500/10 text-amber-600',
      path: '/launcher'
    },
    { 
      icon: BookOpen, 
      title: lang === 'en' ? 'Rich Heritage' : 'ကြွယ်ဝသော အမွေအနှစ်', 
      description: lang === 'en' ? 'Uncover centuries of history through curated cultural stories.' : 'ယဉ်ကျေးမှု ဆိုင်ရာ သမိုင်းကြောင်းများကို လေ့လာ ရှာဖွေပါ။', 
      color: 'bg-emerald-500/10 text-emerald-600',
      path: '/explore' 
    },
    { 
      icon: Headphones, 
      title: lang === 'en' ? 'Spatial Audio' : 'အသံဖြင့် နားဆင်မှု', 
      description: lang === 'en' ? 'Experience the atmosphere with site-specific sounds.' : 'နေရာဒေသ အလိုက် သဘာဝ အသံများဖြင့် ခံစားကြည့်ရှုပါ။', 
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

      {/* 3. Added font-pyidaungsu class conditionally for Myanmar text rendering */}
      <div className={`min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-amber-200 ${lang === 'my' ? 'font-pyidaungsu' : ''}`}>
        <Navbar />

        {/* Language Switcher (Floating) */}
        <div className="fixed top-24 right-8 z-[1001] flex flex-col gap-2">
          {['en', 'my'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`w-10 h-10 rounded-full font-bold text-xs shadow-lg transition-all border-2 ${
                lang === l ? 'bg-amber-500 border-white text-white' : 'bg-white border-amber-500 text-amber-500'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

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
              <span className="inline-block py-1 px-3 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium tracking-widest uppercase">
                {langData[lang].heroTag}
              </span>
              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                {langData[lang].heroTitle1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">{langData[lang].heroTitle2}</span>
              </h1>
              <button onClick={() => navigate('/explore')} className="group px-10 py-5 bg-white text-slate-900 font-bold rounded-full hover:scale-105 transition-all flex items-center gap-3 mx-auto shadow-2xl">
                {langData[lang].heroBtn} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* --- DESTINATIONS SLIDER SECTION --- */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 italic font-serif">{langData[lang].featTitle}</h2>
                <p className="text-slate-400 text-lg font-light">{langData[lang].featSub}</p>
              </div>
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
              navigation={{ prevEl: '.swiper-prev-btn', nextEl: '.swiper-next-btn' }}
              pagination={{ clickable: true, dynamicBullets: true }}
              breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
              className="pb-20 !overflow-visible"
            >
              {locations.map((loc) => (
                <SwiperSlide key={loc.id}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    onClick={() => navigate(`/location/${loc.id}`)}
                    className="group cursor-pointer relative h-[550px] w-full rounded-[3rem] overflow-hidden shadow-2xl bg-slate-900 border border-white/5"
                  >
                    <div className="absolute inset-0 z-0">
                      <img src={loc.thumbnail} className="w-full h-full object-cover blur-2xl opacity-30 scale-125" alt="" />
                    </div>
                    <div className="relative z-10 w-full h-[60%] p-8">
                      <div className="w-full h-full rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10">
                        <img src={loc.thumbnail} className="w-full h-full object-contain p-2 transition-transform duration-1000 group-hover:scale-110" alt={loc.name} />
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-20" />
                    <div className="absolute bottom-10 left-10 right-10 z-30">
                      <p className="text-amber-500 font-black text-[10px] uppercase tracking-[0.3em] mb-3">
                        {lang === 'my' ? (loc.taglineMy || loc.tagline) : loc.tagline}
                      </p>
                      <h4 className="text-3xl font-serif font-bold text-white mb-6 leading-tight">
                        {lang === 'my' ? (loc.nameMy || loc.name) : loc.name}
                      </h4>
                      <div className="flex items-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest bg-amber-600/20 px-4 py-2 rounded-full border border-amber-500/30 backdrop-blur-md">
                          {lang === 'en' ? 'Explore Now' : 'အသေးစိတ်ကြည့်မည်'} <ArrowRight className="w-4 h-4 text-amber-500" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* --- 360 VIRTUAL TOUR SECTION --- */}
        <section className="bg-[#1a1a1a] py-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
              <div className="text-left">
                <div className="flex items-center gap-3 mb-4">
                  <Compass className="w-6 h-6 text-amber-500 animate-spin-slow" />
                  <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-xs">
                    {langData[lang].tour360Badge}
                  </span>
                </div>
                <h2 className="text-5xl font-serif text-white">
                  {langData[lang].tour360Title}
                </h2>
              </div>
              <div className="text-slate-400 text-sm italic">
                Courtesy of <a href="https://www.airpano.com/" target="_blank" rel="noreferrer" className="text-amber-500 hover:underline">AirPano.ru</a>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-white/5"
            >
              <iframe 
                title="360 Virtual Tour"
                width="100%" 
                height="100%" 
                src="https://www.airpano.com/embed.php?3D=bagan-myanmar" 
                frameBorder="0" 
                scrolling="no" 
                allowFullScreen
                className="grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              ></iframe>

              <div className="absolute top-6 right-6 pointer-events-none group-hover:opacity-0 transition-opacity bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <p className="text-white text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  {langData[lang].dragInstruction}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- Features Bento --- */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div 
                key={i} 
                onClick={() => navigate(f.path)}
                className="p-10 rounded-[3rem] bg-white border border-slate-100 hover:shadow-2xl transition-all cursor-pointer group"
              >
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