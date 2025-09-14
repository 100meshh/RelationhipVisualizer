import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuButtonPressedHandler = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div className="relative w-full bg-gradient-to-r from-blue-600 to-purple-600">
      <div className={`px-4 text-white max-w-7xl mx-auto ${isMenuOpen ? 'bg-black bg-opacity-50' : 'bg-transparent'
        }`}>
        <div className="flex items-center justify-between h-24">
          <h1 className="text-2xl font-bold text-white">Relationship Visualizer</h1>
          <div className="hidden md:flex space-x-6 font-bold text-xl">
            <a href="#" className="hover:text-blue-200 transition-colors">About</a>
          </div>
          <div className="md:hidden">
            {isMenuOpen ? (
              <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
                onClick={onMenuButtonPressedHandler}
              >
                <path
                  d="M17.778.808l1.414 1.414L11.414 10l7.778 7.778-1.414 1.414L10 11.414l-7.778 7.778-1.414-1.414L8.586 10 .808 2.222 2.222.808 10 8.586 17.778.808z"
                  fill="#FFF"
                  fillRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
                onClick={onMenuButtonPressedHandler}
              >
                <g fill="#000" fillRule="evenodd">
                  <path d="M0 0h24v2H0zM0 7h24v2H0zM0 14h24v2H0z" />
                </g>
              </svg>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            {!isMenuOpen ? (
              <div className="text-center">
                <p className="border-2 border-white px-6 py-8 lg:py-6 font-light uppercase text-2xl lg:text-3xl leading-tight tracking-wide text-white">
                  Find the Degree of separation in a relation graph
                </p>
              </div>
            ) : (
              <div className="flex flex-col space-y-6 text-2xl uppercase tracking-widest">
                <a href="#" className="hover:text-blue-200 transition-colors">About</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
