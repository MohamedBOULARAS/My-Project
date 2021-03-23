import React from 'react'
import './TarifCard.css';
import '../App.css';
import { red } from '@material-ui/core/colors';

 function TarifCard() {
    return (
        <body className="body">
        <div className="pricing-table">
            <div className="pricing-card">
                <h3 className="pricing-card-header">Starter</h3>
                <div className="price"><sup>DZD</sup>20 000<span>/Année</span></div>
                <ul>
                    <li>Facturation client</li>
                    <li>Facturation fournisseurs</li>
                    <li>Gestion des utilisateurs</li>
                    <li>Importation des fichier Excel</li>
                    <li>Envoi des factures par e-mail</li>
                    <li>Création de devis et proforma</li>
                    <li>Facture d'avoir</li>
                    <li>Cachet et signature</li>
                    <li>Support technique 6/7</li>
                    <li>2 Utillisateurs</li>
                    <li>5 Go de stockage</li>
                </ul>
                <button className="link-btn">Contactez nous</button>
            </div>
        </div>

        <div className="pricing-table">
            <div className="pricing-card">
                <h3 className="pricing-card-header">Start Up</h3>
                <div className="price"><sup>DZD</sup>30 000<span>/Année</span></div>
                <ul>
                    <li>Facturation client</li>
                    <li>Facturation fournisseurs</li>
                    <li>Gestion des utilisateurs</li>
                    <li>Importation des fichier Excel</li>
                    <li>Envoi des factures par e-mail</li>
                    <li>Création de devis et proforma</li>
                    <li>Facture d'avoir</li>
                    <li>Cachet et signature</li>
                    <li>Support technique 6/7</li>
                    <li>4 Utillisateurs</li>
                    <li>8 Go de stockage</li>
                </ul>
                <button className="link-btn">Contactez nous</button>
            </div>
        </div>

        <div className="pricing-table">
            <div className="pricing-card">
                <h3 className="pricing-card-header">Business</h3>
                <div className="price"><sup>DA</sup>40 000<span>/Année</span></div>
                <ul>
                    <li>Facturation client</li>
                    <li>Facturation fournisseurs</li>
                    <li>Gestion des utilisateurs</li>
                    <li>Importation des fichier Excel</li>
                    <li>Envoi des factures par e-mail</li>
                    <li>Création de devis et proforma</li>
                    <li>Facture d'avoir</li>
                    <li>Cachet et signature</li>
                    <li>Gestion des paiements</li>
                    <li>gestion de la trésorerie</li>
                    <li>gestion des soldes</li>
                    <li>Support technique 6/7</li>
                    <li>8 Utillisateurs</li>
                    <li>12 Go de stockage</li>
                </ul>
                <button className="link-btn">Contactez nous</button>
            </div>
        </div>

        <div className="pricing-table">
            <div className="pricing-card">
                <h3 className="pricing-card-header">Entreprise</h3>
                <div className="price"><span><strong>Ilimité</strong></span></div>
                <ul>
                    <li>Facturation client</li>
                    <li>Facturation fournisseurs</li>
                    <li>Gestion des utilisateurs</li>
                    <li>Importation des fichier Excel</li>
                    <li>Envoi des factures par e-mail</li>
                    <li>Création de devis et proforma</li>
                    <li>Facture d'avoir</li>
                    <li>Cachet et signature</li>
                    <li>Gestion des paiements</li>
                    <li>gestion de la trésorerie</li>
                    <li>gestion des soldes</li>
                    <li>Support technique 6/7</li>
                    <li>Nombres d'utillisateurs ilimité</li>
                    <li>Stockage ilimité</li>
                </ul>
                <button className="link-btn">Contactez nous</button>
            </div>
        </div>

        

        </body>
    );
};

export default TarifCard;
