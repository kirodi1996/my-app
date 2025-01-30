import { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-blue-600 text-white p-4 fixed top-0 w-full shadow-lg z-50">
     <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">NewsApp</Link>
      
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          )}
      </button>
      <ul className={`md:flex space-x-6 absolute md:static bg-blue-600 w-full md:w-auto left-0 top-16 md:top-auto transition-transform ${isOpen ? "block" : "hidden"}`}>
        <li><Link to="/" className="block py-2 px-4">Home</Link></li>
        <li><Link to="/settings" className="block py-2 px-4">Settings</Link></li>
      </ul>
    </div>
  </nav>
  );
};

export default Navbar;
