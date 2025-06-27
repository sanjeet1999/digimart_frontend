import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-cyan-700 text-white py-6 w-full mt-auto">
      <div className="w-full px-8 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} DigiMart. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;