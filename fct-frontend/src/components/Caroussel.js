import React from 'react'
import './Caroussel.css';
import '../App.css';
import { Button } from './Button';

 function Caroussel() {
    return (
        <div className="caroussel-container">
              <video className='video-video' src='../videos/video-4.mp4' autoPlay loop muted /> 
              <h2 className='title'>Logiciel de facturation en ligne</h2> 
              <p className='txt'>Facturez plus vite<br></br>
              et en toute sécurité</p>
              <h3 className='bio'>On vous propose le logiciel de facturation qui 
                  <br></br>
                  aide les chefs d’entreprises et les
                  <br></br>
                  commerçants à gérer leurs 
                  
                  factures et pas que.
              </h3>
            <div className="caroussel-btn">
              <Button
              className="btn-1"
              buttonStyle='btn--outline'
              buttonSize='btn--large'
              >
                  Mon Compte
              </Button>
              <Button
              className="btn-2"
              buttonStyle='btn--primary'
              buttonSize='btn--large'
              >
                  VIDEO
                  <i className="far fa-play-circle"></i>
              </Button>
          </div>
        </div>
    );
};

export default Caroussel;
