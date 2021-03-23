import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './ProduitModal.css'
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

export default function ProduitModal({setProduit,produit}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  //hook modal
  const [codeProduit, setCodeProduit] = useState("");
  const [nomProduit, setNomProduit] = useState("");
  const [discription, setDiscription] = useState("");
  const [prixAchat, setPrixAchat] = useState("");
  const [prixVente, setPrixVente] = useState("");
  const [note, setNote] = useState("");


    //get data from modal and passed to fournisseur list
    const codeProduitHandler = (e) => {
      setCodeProduit(e.target.value)
    };
    const nomProduitHandler = (e) => {
      setNomProduit(e.target.value)
    };
    const discriptionHandler = (e) => {
      setDiscription(e.target.value)
    };
    const prixAchatHandler = (e) => {
      setPrixAchat(e.target.value)
    };
    const prixVenteHandler = (e) => {
        setPrixVente(e.target.value)
      };
    const noteHandler = (e) => {
      setNote(e.target.value)
    };


    const addProduit = (e) => {
      e.preventDefault()
      var newProduit = {code_produit: codeProduit, nom_du_produit: nomProduit, discription: discription, prix_achat: prixAchat, prix_vente: prixVente, note: note}
      const requestOptions = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newProduit)
      }
      //fetch Post Data
      fetch("http://localhost:5000/produit", requestOptions)
      .then(response => response.json())
      .then((res) => {
        console.log(res)
        setProduit([...produit,res.produit], (""))
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
    <div className="produit-modal">
    <div style={{modalStyle, height: '600px', width: '600px', marginTop: '7vh', marginLeft: '30vw', borderRadius: '10px', border: 'none', boxShadow: 'black'}} className={classes.paper}>
      <h2 style={{paddingTop: '30px', paddingLeft: '30px'}} id="simple-modal-title">Produits et Services</h2>     
      <div className="all-input">
      <div className="input-1">
      <input type="text"
                        className="code-produit"
                        id="code_produit"
                        placeholder="Code"
                        onChange={codeProduitHandler}
                        value={codeProduit}
      /> 
      <input type="text"
                        className="nom-produit"
                        id="nomProduit"
                        placeholder="Produit / Service"
                        onChange={nomProduitHandler}
                        value={nomProduit}
      /> 
      </div>
      <div className="input-2">
      <textarea type="text"
                        className="discription-produit"
                        id="discription"
                        placeholder="Discription"
                        onChange={discriptionHandler}
                        value={discription}
      /> 
      </div>
      <div className="input-3">
      <input type="text"
                        className="prix-achat"
                        id="prixAchat"
                        placeholder="Prix d'achat"
                        onChange={prixAchatHandler}
                        value={prixAchat}
      />
      <input type="text"
                        className="prix-vente"
                        id="prixVente"
                        placeholder="Prix de vente"
                        onChange={prixVenteHandler}
                        value={prixVente}
      /> 
       </div>
      <textarea type="text"
                        className="note-produit"
                        id="noteProduit"
                        placeholder="note"
                        onChange={noteHandler}
                        value={note}

      />
     
      </div>
      <div className="btn-produit-modal">
      <button className='produit-enregistrer' onClick={addProduit} onSubmit={addProduit}>Enregistrer</button>
      <button className='produit-annuler' onClick={handleClose}>Annuler</button>
      </div>
    </div>
    </div>
  );

  return (
    <div>
      <div style={{ width: '100%', height: '60px', backgroundColor: 'rgb(67, 140, 245)'}}>
      <button style={{ height: '40px', width: '100px', borderRadius: '5px', border: '1px solid white', backgroundColor: 'transparent', color: 'white', marginBottom: '10px', marginTop: '10px', marginLeft: '15px'}} type="button" onClick={handleOpen}>
        AJOUTER
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
