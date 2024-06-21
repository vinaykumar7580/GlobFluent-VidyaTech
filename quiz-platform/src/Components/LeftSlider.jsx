import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LeftSlider = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSlider = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button 
        onClick={toggleSlider} 
        className="p-2 bg-blue-500 text-white rounded-full flex justify-center items-center gap-1"
      >
       <FaBars />
       <span>Menu</span>
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white p-4 transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={toggleSlider}
          className="absolute top-4 right-4 px-2 py-2 bg-blue-500 font-bold text-white rounded-full"
        >
          <FaTimes />
        </button>
        <h2 className="text-xl mb-4">Pages</h2>
         <div className='text-md font-bold bg-blue-500 mt-6 px-6 py-2 rounded-md'>
          <Link to="/user-dashboard"><p>Dashboard</p></Link>
         </div>
      </div>
    </div>
  );
};

export default LeftSlider;
