
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home'
import Login from './components/pages/Login';
import Entreprise from './components/pages/Entreprise';
import User from './components/pages/User';
import Client from './components/pages/Client';
import Fournisseur from './components/pages/Fournisseur';
import Produit from './components/pages/Produit';
import Tableaudebord from './components/pages/Tableaudebord';
import FctClient from './components/pages/FctClient';




function App() {
    return (
        <>
          <Router>
          <Switch>
           <Route path='/tableau' exact component={Tableaudebord} />
            <Route path='/' exact component={Home} />
            <Route path='/sign-up' exact component={Login} />
            <Route path='/entreprise' exact component={Entreprise} />
            <Route path='/user' exact component={User} />
            <Route path='/client' exact component={Client} />
            <Route path='/fournisseur' exact component={Fournisseur} />
            <Route path='/produit' exact component={Produit} />
            <Route path='/factureclient' exact component={FctClient} />
          </Switch>
          </Router>
        </>
      );

}

export default App;


