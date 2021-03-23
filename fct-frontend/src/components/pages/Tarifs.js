import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import NavBar from '../Navbar.js'
import TarifCaroussel from '../tarifcaroussel.js'
import TarifCard from '../TarifCard.js'


export default function Tarifs() {
  return (
    <>
    <NavBar />
    <TarifCaroussel />
    <TarifCard />
    <Footer />
    </>
);
}