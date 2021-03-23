//Require tools
const express = require ('express');
const mongoose = require ('mongoose'); 
const bodyParser = require ('body-parser');
require("dotenv").config()
const cors = require('cors');
//Routers import
const entrepriseRoutes = require('./routes/entreprise');
const userRoutes = require('./routes/user');
const clientRoutes = require('./routes/client');
const factureRoutes = require('./routes/facture');
const produitRoutes = require('./routes/produit');
const fournisseurRoutes = require('./routes/fournisseur');
//Modals Export
//const ProdFCT = require('./Modals/ProdFCTModal');

//Express App
const app = express();

//DB Connection
const uri = process.env.DB_URI;
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected Database");
});

//Body-Parser
app.use(bodyParser.json());

//CROS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

 
app.use(cors({origin: '*',}))

//-------Entreprises----
  app.use('/entreprise', entrepriseRoutes);
  
//---------User---------
  app.use('/register', userRoutes);

//-------Clients--------
  app.use('/client', clientRoutes);

//-------Fournisseur----
app.use('/fournisseur', fournisseurRoutes);

//-------Facture-------
  app.use('/facture', factureRoutes);

//-------Product------
  app.use('/produit', produitRoutes);

//--------ProdFCT-----
  //app.use('/prodfct', prodfctRoutes);



//Port Listen 5000
app.listen(5000,function(req,res){
    console.log("Server is started");
    });


