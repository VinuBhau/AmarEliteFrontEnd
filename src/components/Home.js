import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./About";
import Information from "./Information";
import Contact from "./Contact";
import LoginPage from "./LoginPage";
import Test from "./Test";
import axios from "axios";
import { FaHome, FaInfoCircle, FaPhone, FaSignInAlt, FaBars } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa"; // Import the building icon


function Home({ setLoginStatus, setUserType, oid, setOid, setUsername }) {
  const [apartmentName, setApartmentname] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://amarelitebackend.onrender.com/api/getAptname")
      .then((response) => {
        setApartmentname(response.data[0].Apartmentname);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-900 text-white"> {/* Dark background */}
        <nav className="bg-gray-800 shadow-md"> {/* Darker nav */}
          <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-8"> {/* Adjusted padding */}
            <h1 className="text-3xl font-semibold tracking-wider text-blue-400 font-custom-font">
              {apartmentName} Apartment Management
            </h1>
            <button className="lg:hidden text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}> {/* Improved button styling */}
              <FaBars className="h-6 w-6" />
            </button>
            <div className="hidden lg:flex space-x-8 text-lg font-medium">
              <NavigationLinks />
            </div>
          </div>
          {isMenuOpen && (
            <div className="lg:hidden bg-gray-700 text-white p-4"> {/* Darker dropdown */}
              <NavigationLinks />
            </div>
          )}
        </nav>

        <div className="flex-grow p-8 bg-gray-100"> {/* Darker content area */}
          <Routes>
            <Route path="/home" element={<Test />} />
            <Route path="/about" element={<About />} />
            <Route path="/information" element={<Information />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/login"
              element={
                <LoginPage
                  setLoginStatus={setLoginStatus}
                  setUserType={setUserType}
                  setOid={setOid}
                  oid={oid}
                  setUsername={setUsername}
                />
              }
            />
          </Routes>
        </div>

        <footer className="bg-gray-800 text-center py-6 mt-8"> {/* Darker footer */}
          <p className="text-sm text-gray-400"> {/* Slightly lighter text */}
            &copy; {new Date().getFullYear()} {apartmentName}. All rights reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
}

function NavigationLinks() {
  return (
    <>
      <Link
        to="/home"
        className="text-gray-300 hover:text-white transition duration-300 flex items-center space-x-2" // Improved link styling
      >
        <FaHome className="h-5 w-5" /> {/* Icon size */}
        <span>Home</span>
      </Link>
      <Link
        to="/about"
        className="text-gray-300 hover:text-white transition duration-300 flex items-center space-x-2"
      >
        <FaInfoCircle className="h-5 w-5" />
        <span>About</span>
      </Link>
      <Link
        to="/information"
        className="text-gray-300 hover:text-white transition duration-300 flex items-center space-x-2"
      >
        <FaBuilding className="h-5 w-5" /> {/* Replaced FaInfoCircle with FaBuilding */}
        <span>Information</span>
      </Link>
      <Link
        to="/contact"
        className="text-gray-300 hover:text-white transition duration-300 flex items-center space-x-2"
      >
        <FaPhone className="h-5 w-5" />
        <span>Contact</span>
      </Link>
      <Link
        to="/login"
        className="text-gray-300 hover:text-white transition duration-300 flex items-center space-x-2"
      >
        <FaSignInAlt className="h-5 w-5" />
        <span>Login</span>
      </Link>
    </>
  );
}

export default Home;
