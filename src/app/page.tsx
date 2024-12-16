import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Study from "./Study";
import Services from "./Services";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Home() {
  return (
    <React.StrictMode>
      <div>
        <Navbar/>
        <Hero/>
        <Study/>
        <Services/>
        <Contact/>
        <Footer/>
      </div>
    </React.StrictMode>
  );
}