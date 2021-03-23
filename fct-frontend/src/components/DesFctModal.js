import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './DesFctModal.css'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

export default function ProduitModal({setFacture, facture}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
   

 
  //hook modal
  const [discription, setDiscription] = useState("");
  const [prixHt, setPrixHt] = useState(0);
  const [quantite, setQuantite] = useState(0);
  const [prixTotal, setPrixTotal] = useState(0);
  const [prixRemise, setPrixRemise] = useState(0);
  const [prixTotalHt, setPrixTotalHt] = useState(0);


    //get data from modal and passed to fournisseur list
    const discriptionHandler = (e) => {
      setDiscription(e.target.value)
    };
    const prixHtHandler = (e) => {
      setPrixHt(e.target.value)
    };
    const quantiteHandler = (e) => {
      setQuantite(e.target.value)
    };
    const prixTotalHandler = (e) => {
      setPrixTotal(e.target.value)
    };
    const prixRemiseHandler = (e) => {
        setPrixRemise(e.target.value)
      };
    const prixTotalHtHandler = (e) => {
      setPrixTotalHt(e.target.value)
    };


    const addProduit = (e) => {
      e.preventDefault()
      var newProduit = {discription: discription, prix_ht: prixHt, quantite: quantite, prix_total: prixTotal, prix_remise: prixRemise, prix_total_ht: prixTotalHt}
      const requestOptions = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newProduit)
      }
      //fetch Post Data
      fetch("http://localhost:5000/facture", requestOptions)
      .then(response => response.json())
      .then((res) => {
        console.log(res)
        setFacture([...facture,res.facture], (""))
      })
      setOpen(false);
    }
    
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const body = (
    <div className="des-modal">
    <div style={{modalStyle, height: '550px', width: '36vw', marginTop: '6vh', marginLeft: '23vw', borderRadius: '10px', border: 'none', boxShadow: 'black'}} className={classes.paper}>
      <div className="cntt-des-modal">
        <div className="cntt-des-1">
      <h3 style={{paddingTop: '30px', paddingLeft: '30px'}} id="simple-modal-title">Produits et Services</h3>     
      <input type="text"
                        className="des-description"
                        id="description"
                        placeholder="Description"
                        onChange={discriptionHandler}
                        value={discription}
      /> 
      <div className='pu-q'> 
      <input type="text"
                        className="des-prix-ht"
                        id="prix-ht"
                        placeholder="Prix Ht"
                        onChange={prixHtHandler}
                        value={prixHt}
      /> 
       <input type="text"
                        className="des-quantite"
                        id="quantité"
                        placeholder="Quantité"
                        onChange={quantiteHandler}
                        value={quantite}

      /> 
      </div>
      <div className="pt-ht">
    <input type="text"
                        className="des-prix-total"
                        id="prixTotal"
                        placeholder="Prix Total"
                        onChange={prixTotalHandler}
                        value={prixTotal}

      /> 
      <input type="text"
                        className="des-prix-remise"
                        id="prix-remise"
                        placeholder="Prix Remise"
                        onChange={prixRemiseHandler}
                        value={prixRemise}

      /> 
            <input type="text"
                        className="des-prix-total-ht"
                        id="prix-total-ht"
                        placeholder="Prix Total HT"
                        onChange={prixTotalHtHandler}
                        value={prixTotalHt}


      /> 
      </div>
      </div>
      </div>
      <div className="btn-des-modal">
      <button className='des-enregistrer' onClick={addProduit}>Enregistrer</button>
      <button className='des-annuler' onClick={handleClose}>Annuler</button>
      </div>
    </div>
    </div>
  );

  return (
    <div>
      <div style={{ width: '100%', height: '60px', }}>
      <button style={{ height: '40px', width: '200px', borderRadius: '5px', border: '1px solid rgb(67, 140, 245)', backgroundColor: 'transparent', color: 'rgb(67, 140, 245)', marginBottom: '10px', marginRight: '10px'}} type="button" onClick={handleOpen}>
        AJOUTER UNE DESGNIATION
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
