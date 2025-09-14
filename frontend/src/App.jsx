import React from 'react';
import User from './components/User';
import Relation from './components/Relation';
import RelationVisualizer from './components/RelationVisualizer';
import Header from './components/Header';
import Footer from './components/Footer';
import SampleImage from './assets/images/sampleGraph.svg';
import MainGif from './assets/gif/main.gif';
import MainImage1 from './assets/images/main_1.PNG';
import MainImage2 from './assets/images/main_2.PNG';
import MainImage3 from './assets/images/main_3.PNG';
import MainImage from './assets/images/main.PNG';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex-1 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Hero Section with Main GIF */}
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Relationship Visualizer</h2>
                <div className="flex items-center justify-center mb-6">
                  <img src={MainGif} alt="Relationship Visualizer Demo" className="max-w-full h-auto rounded-lg shadow-lg" />
                </div>
                <p className="text-center text-gray-600 text-lg">
                  Visualize and manage relationships between people with our interactive relationship graph tool
                </p>
              </div>
            </div>

            {/* Sample Graph and Features */}
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sample Relationship Graph</h2>
                <div className="flex items-center justify-center mb-6">
                  <img src={SampleImage} alt="Sample Relationship Graph" className="max-w-full h-auto rounded-lg" />
                </div>

                {/* Feature Images Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                  <div className="text-center">
                    <img src={MainImage1} alt="Feature 1" className="w-full h-32 object-cover rounded-lg mb-2" />
                    <p className="text-sm text-gray-600">Easy User Management</p>
                  </div>
                  <div className="text-center">
                    <img src={MainImage2} alt="Feature 2" className="w-full h-32 object-cover rounded-lg mb-2" />
                    <p className="text-sm text-gray-600">Relationship Mapping</p>
                  </div>
                  <div className="text-center">
                    <img src={MainImage3} alt="Feature 3" className="w-full h-32 object-cover rounded-lg mb-2" />
                    <p className="text-sm text-gray-600">Visual Analytics</p>
                  </div>
                  <div className="text-center">
                    <img src={MainImage} alt="Main Feature" className="w-full h-32 object-cover rounded-lg mb-2" />
                    <p className="text-sm text-gray-600">Interactive Graph</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Relation Visualizer */}
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Interactive Relationship Visualizer</h2>
                <RelationVisualizer />
              </div>
            </div>

            {/* User and Relation Components */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* User Component */}
              <div className="lg:col-span-1">
                <User />
              </div>

              {/* Relation Component */}
              <div className="lg:col-span-3">
                <Relation />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
