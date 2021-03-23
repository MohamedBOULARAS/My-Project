import '../../App.css';
import Caroussel from '../Caroussel';
import React from 'react';
import Cards from '../Cards';
import Footer from '../Footer';
import NavBar from '../Navbar.js'



function Home() {
    return (
        <>
        <NavBar />
        <Caroussel />
        <Cards />
        <Footer />
        </>
    );
};
export default Home;