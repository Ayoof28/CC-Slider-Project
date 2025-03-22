import React from 'react';
import { ParallaxSlider } from './components/ParallaxSlider';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="w-full max-w-[1920px] mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center"></h1>
        <ParallaxSlider />
      </div>
    </div>
  );
}

export default App;