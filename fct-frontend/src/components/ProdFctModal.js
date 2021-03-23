import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './ProdFctModal.css'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ProdFctModal({ setFacture, facture }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [prodact, setProdact] = useState([]);
  const [selectedProdact, setSelectedProdact] = useState(null);

  const prodactHandler = (value) => {
    console.log(prodact[value])
    setSelectedProdact(value)
    setPrixTotal(parseInt(quantite) * parseInt(prodact[value].prix_vente))
    setPrixHt(parseInt(quantite) * parseInt(prodact[value].prix_vente))
  };

  //hook modal
  const [quantite, setQuantite] = useState(1);
  const [prixTotal, setPrixTotal] = useState("");
  const [prixRemise, setPrixRemise] = useState(0);
  const [prixHt, setPrixHt] = useState("");

  //get data from modal and passed to fournisseur list
  const quantiteHandler = (e) => {
    setQuantite(parseInt(e.target.value))
    setPrixTotal(parseInt(e.target.value) * parseInt(prodact[selectedProdact].prix_vente))
    setPrixHt(parseInt(e.target.value) * parseInt(prodact[selectedProdact].prix_vente))
  };
  const prixTotalHandler = (e) => {
    setPrixTotal(e.target.value)
  };
  const prixRemiseHandler = (e) => {
    setPrixRemise(e.target.value)
    setPrixHt(prixTotal - parseInt(e.target.value) )
  };
  const prixHtHandler = (e) => {
    setPrixHt(e.target.value)
  };

  const addProduit = (e) => {
    e.preventDefault()
    var newProduit = {
      nom_du_produit: prodact[selectedProdact].nom_du_produit,
      discription: prodact[selectedProdact].discription,
      prix_vente: prodact[selectedProdact].prix_vente,
      prix_remise: prixRemise,
      prix_ht: prixHt,
      prix_total: prixTotal,
      quantite: quantite
    }
    setFacture({...facture, produit: [...facture.produit, newProduit]})
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // get prodact list
  useEffect(async () => {
    var res = await fetch('http://localhost:5000/produit');
    var data = await res.json();
    setProdact(data);
  }, []);

  

  const body = (
    <div className="prodact-modal">
      <div style={{ modalStyle, height: '550px', width: '36vw', marginTop: '6vh', marginLeft: '23vw', borderRadius: '10px', border: 'none', boxShadow: 'black' }} className={classes.paper}>
        <div className="cntt-prodact-modal">
          <div className="cntt-prodact-1">
            <h3 style={{ paddingTop: '30px', paddingLeft: '30px' }} id="simple-modal-title">Produits et Services</h3>
            <FormControl style={{ height: '40px', width: '460px', marginLeft: '20px', marginBottom: '25px' }} variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Produits / services</InputLabel>
              <Select
                native
                onChange={e => prodactHandler(e.target.value)}
                inputProps={{
                  name: 'Produits et Services',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                {prodact.map((prod, index) => (
                  <option key={index} value={index}>{prod.nom_du_produit}</option>
                ))}
              </Select>
            </FormControl>
            <input type="text"
              className="description"
              id="description"
              placeholder="Description"
              value={selectedProdact != null ? prodact[selectedProdact].discription : ""}
              onChange={e => prodactHandler(e.target.value)}
            />
            <div className='pu-q'>
              <NumberFormat 
                prefix={'DZD'}
                thousandSeparator={true}
                type="text"
                readOnly
                value
                className="prix-unitaire"
                id="prix-unitaire"
                placeholder="PU"
                onChange={e => prodactHandler(e.target.value)}
                value={selectedProdact != null ? prodact[selectedProdact].prix_vente : ""}
              />
              <input type="text"
                className="quantite"
                id="quantité"
                placeholder="Quantité"
                onChange={quantiteHandler}
                value={quantite}
              />
            </div>
            <div className="pt-ht">
            <NumberFormat type="text"
                thousandSeparator={true}
                className="prix-total"
                id="prix-total"
                placeholder="Prix Total"
                onChange={prixTotalHandler}
                value={prixTotal}
              />

              <NumberFormat type="text"
                className="prix-remise"
                id="prix-remise"
                placeholder="Prix Remise"
                onChange={prixRemiseHandler}
                value={prixRemise}

              />
              <NumberFormat
                thousandSeparator={true}
                readOnly
                className="prix-ht"
                id="prix-ht"
                placeholder="Prix HT"
                onChange={prixHtHandler}
                value={prixHt}
              />
            </div>
          </div>
        </div>
        <div className="btn-prodact-modal">
          <button className='prodact-enregistrer' onClick={addProduit}>Enregistrer</button>
          <button className='prodact-annuler' onClick={handleClose}>Annuler</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ width: '100%', height: '60px', }}>
        <button style={{ height: '40px', width: '200px', borderRadius: '5px', border: '1px solid rgb(67, 140, 245)', backgroundColor: 'transparent', color: 'rgb(67, 140, 245)', marginBottom: '10px', marginRight: '10px' }} type="button" onClick={handleOpen}>
          AJOUTER UN PRODUIT
      </button>

      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
