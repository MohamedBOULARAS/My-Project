import React from 'react'
import CardItem from './CardItem';
import './Cards.css';

function Cards() {
    return (
        <div className='cards'>
            <h1>Le meilleur logiciel de facturation sur le Web</h1>
            <h3 className='h3'>Facturer et gérer vos clients en toute facilité</h3>
            <div className="cards__container">
                <div className='cards__wrapper'>
                <i class="fas fa-file-invoice-dollar"></i>                
                <h2>Gérer votre facturation</h2>
                <h3>Simple,<br></br> rapide et efficace</h3>
                </div>
                <div className='cards__wrapper'>
                <i class="fas fa-share-square"></i>
                <h2>Envoyer facilement vos factures</h2>
                <h3>Envoyer vos Factures par e-mail<br></br> directement a partir du logiciel</h3>
                </div>
                <div className='cards__wrapper'>
                <i class="fas fa-file-invoice"></i>
                <h2>Gérer les factures de vos fournisseurs</h2>
                <h3 className="frs">Suivez vos fournisseurs <br></br> et minimiser les erreurs </h3>
                </div>
            </div>

            <div className="cards__container">
                <div className='cards__wrapper'>
                <i class="fas fa-shield-alt"></i>
                <h2> Sécurité</h2>
                <h3>Sécurisation de vos accès</h3>
                <h3>Naviguer en toute sécurité</h3>
                </div>
                <div className='cards__wrapper'>
                <i class="fas fa-globe-africa"></i>
                <h2>Mobilité</h2>
                <h3>Travailer dans votre bureau <br></br>a la maison ou en déplacement</h3>
                </div>
                <div className='cards__wrapper'>
                <i class="fas fa-upload"></i>
                <h2>Importer vos données</h2>
                <h3>Importer vos données <br></br> a partir d'un fichier excel </h3>
                </div>
            </div>

        </div>
    )
}

export default Cards;
