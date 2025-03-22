import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=1920&h=1080&q=80",
    title: "Nature's Beauty",
    description: "Discover the wonders of nature",
    direction: "right"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&w=1920&h=1080&q=80",
    title: "Mountain Peaks",
    description: "Reach new heights",
    direction: "top"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=1920&h=1080&q=80",
    title: "Nature's Beauty",
    description: "Discover the wonders of nature",
    direction: "botam"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&w=1920&h=1080&q=80",
    title: "Mountain Peaks",
    description: "Reach new heights",
    direction: "left"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=1920&h=1080&q=80",
    title: "Nature's Beauty",
    description: "Discover the wonders of nature",
    direction: "top"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&w=1920&h=1080&q=80",
    title: "Mountain Peaks",
    description: "Reach new heights",
    direction: "botam"
  },
 ];

export const ParallaxSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const getSlideVariants = (slideIndex: number) => {
    const variants = {
      left: {
        enter: { x: 1000, opacity: 0 },
        center: { x: 0, y: 0, opacity: 1 },
        exit: { x: -1000, opacity: 0 }
      },
      right: {
        enter: { x: -1000, opacity: 0 },
        center: { x: 0, y: 0, opacity: 1 },
        exit: { x: 1000, opacity: 0 }
      },
      top: {
        enter: { y: 1000, opacity: 0 },
        center: { x: 0, y: 0, opacity: 1 },
        exit: { y: -1000, opacity: 0 }
      },
      bottom: {
        enter: { y: -1000, opacity: 0 },
        center: { x: 0, y: 0, opacity: 1 },
        exit: { y: 1000, opacity: 0 }
      }
    };

    return variants[slides[slideIndex].direction as keyof typeof variants];
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + slides.length) % slides.length);
  };

  const nextSlide = () => paginate(1);
  const prevSlide = () => paginate(-1);

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl bg-black">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={getSlideVariants(currentIndex)}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 200, damping: 25, duration: 0.3 },
            y: { type: "spring", stiffness: 200, damping: 25, duration: 0.3 },
            opacity: { duration: 0.3 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="relative w-full h-full">
            <motion.img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              className="absolute inset-0 w-full h-full object-cover object-center"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent text-white"
            >
              <motion.h2 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2"
              >
                {slides[currentIndex].title}
              </motion.h2>
              <motion.p 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="text-xl md:text-2xl lg:text-3xl"
              >
                {slides[currentIndex].description}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.button
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 md:p-4 rounded-full backdrop-blur-sm transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
      </motion.button>
      <motion.button
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 md:p-4 rounded-full backdrop-blur-sm transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
      </motion.button>

      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};