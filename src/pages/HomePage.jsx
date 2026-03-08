import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Eye, BookOpen, Headphones, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import LocationCard from '../components/LocationCard.jsx';
import { locations } from '../data/locations.js';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Eye,
      title: '360° View',
      description: 'Immerse yourself in stunning 360-degree panoramic views of Myanmar\'s most iconic locations.'
    },
    {
      icon: BookOpen,
      title: 'Historical Insights',
      description: 'Discover rich historical context and fascinating stories behind each destination.'
    },
    {
      icon: Headphones,
      title: 'Smart Audio Guide',
      description: 'Listen to expertly narrated audio guides that bring each location to life.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Helmet>
        <title>Myanmar Explorer - Discover Beautiful Places Around Myanmar</title>
        <meta name="description" content="Explore Myanmar's most iconic destinations through immersive 360° views, historical insights, and smart audio guides. Discover Bagan, Shwedagon Pagoda, Inle Lake, and more." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />

        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1597811815557-1ecd3f88fc6c"
              alt="Myanmar landscape"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
          </div>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Discover Beautiful Places Around Myanmar
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Embark on a virtual journey through Myanmar's most breathtaking destinations, from ancient temples to serene lakes.
            </p>
            <button
              onClick={() => navigate('/explore')}
              className="bg-accent hover:bg-accent/90 text-white font-semibold py-4 px-8 rounded-xl flex items-center space-x-2 mx-auto transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <span>Start Exploring</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </section>

        {/* Featured Destinations Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Featured Destinations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore Myanmar's most iconic landmarks and hidden gems
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {locations.slice(0, 6).map((location) => (
              <motion.div key={location.id} variants={itemVariants}>
                <LocationCard location={location} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Why Explore With Us Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Why Explore With Us
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience Myanmar like never before with our innovative features
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;