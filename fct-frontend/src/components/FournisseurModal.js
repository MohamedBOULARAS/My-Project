import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
 
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

export default function FournisseurModal({setFournisseur,fournisseur}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  //hook modal
  const [codeFournisseur, setCodeFournisseur] = useState("");
  const [raisonSocial, setRaisonSocial] = useState("");
  const [nomFournisseur, setNomFournisseur] = useState("");
  const [prenomFournisseur, setPrenomFournisseur] = useState("");
  const [emailFournisseur, setEmailFournisseur] = useState("");
  const [tellFournisseur, setTellFournisseur] = useState("");
  const [adresseFournisseur, setAdresseFournisseur] = useState("");
  const [activiteFournisseur, setActiviteFournisseur] = useState("");
  const [nifFournisseur, setNifFournisseur] = useState("");
  const [nisFournisseur, setNisFournisseur] = useState("");
  const [ribFournisseur, setRibFournisseur] = useState("");
  const [rcFournisseur, setRcFournisseur] = useState("");
  const [noteFournisseur, setNoteFournisseur] = useState("");

    //get data from modal and passed to fournisseur list
    const codeFournisseurHandler = (e) => {
      setCodeFournisseur(e.target.value)
    };
    const raisonRaisonSocialHandler = (e) => {
      setRaisonSocial(e.target.value)
    };
    const nomFournisseurHandler = (e) => {
      setNomFournisseur(e.target.value)
    };
    const prenomFournisseurHandler = (e) => {
      setPrenomFournisseur(e.target.value)
    };
    const emailFournisseurHandler = (e) => {
      setEmailFournisseur(e.target.value)
    };
    const tellFournisseurHandler = (e) => {
      setTellFournisseur(e.target.value)
    };
    const adresseFournisseurHandler = (e) => {
      setAdresseFournisseur(e.target.value)
    };
    const activiteFournisseurHandler = (e) => {
      setActiviteFournisseur(e.target.value)
    };
    const nifFournisseurHandler = (e) => {
      setNifFournisseur(e.target.value)
    };
    const nisFournisseurHandler = (e) => {
      setNisFournisseur(e.target.value)
    };
    const ribFournisseurHandler = (e) => {
      setRibFournisseur(e.target.value)
    };
    const rcFournisseurHandler = (e) => {
      setRcFournisseur(e.target.value)
    };
    const noteFournisseurHandler = (e) => {
      setNoteFournisseur(e.target.value)
    };

    const addFournisseur = (e) => {
      e.preventDefault()
      var newFournisseur = {code_fournisseur: codeFournisseur, raison_social: raisonSocial, nom: nomFournisseur, prenom: prenomFournisseur, email: emailFournisseur, tell: tellFournisseur, adresse: adresseFournisseur, activite: activiteFournisseur, nif: nifFournisseur, nis: nisFournisseur, rib: ribFournisseur, rc: rcFournisseur, note: noteFournisseur}
      const requestOptions = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newFournisseur)
      }
      //fetch Post Data
      fetch("http://localhost:5000/fournisseur", requestOptions)
      .then(response => response.json())
      .then((res) => {
        console.log(res)
        setFournisseur([...fournisseur,res.fournisseur], (""))
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
    <div className="fournisseur-modal">
    <div style={{modalStyle, height: '700px', width: '800px', marginTop: '6vh', marginLeft: '23vw', borderRadius: '10px', border: 'none', boxShadow: 'black'}} className={classes.paper}>
      <div className="cntt-fournisseur-modal">
        <div className="cntt-fournisseur-1">
      <h2 style={{paddingTop: '30px', paddingLeft: '30px'}} id="simple-modal-title">Fournisseur</h2>     
      <input type="text"
                        className="code-fournisseur"
                        id="code_fournisseur"
                        placeholder="Code"
                        onChange={codeFournisseurHandler}
                        value={codeFournisseur}
      /> 
      <input type="text"
                        className="Raison-social"
                        id="raisonSocial"
                        placeholder="Raison social"
                        onChange={raisonRaisonSocialHandler}
                        value={raisonSocial}
      /> 
      <input type="text"
                        className="nom-du-fournisseur"
                        id="nomdufournisseur"
                        placeholder="Nom du fournisseur "
                        onChange={nomFournisseurHandler}
                        value={nomFournisseur}
      /> 
       <input type="text"
                        className="prenom-du-fournisseur"
                        id="prenomdufournisseur"
                        placeholder="Prenom du fournisseur"
                        onChange={prenomFournisseurHandler}
                        value={prenomFournisseur}

      /> 
       <input type="text"
                        className="email-fournisseur"
                        id="emailfournisseur"
                        placeholder="e-mail"
                        onChange={emailFournisseurHandler}
                        value={emailFournisseur}
      /> 
             <input type="text"
                        className="tel-fournisseur"
                        id="telfournisseur"
                        placeholder="Numéro de téléphone"
                        onChange={tellFournisseurHandler}
                        value={tellFournisseur}
      /> 
      <input type="text"
                        className="adreese-fournisseur"
                        id="adressefournisseur"
                        placeholder="Adresse du fournisseur "
                        onChange={adresseFournisseurHandler}
                        value={adresseFournisseur}

      /> 
      </div>
      <div className="cntt-fournisseur-2">
      <input type="text"
                        className="activité-fournisseur"
                        id="activitéfournisseur"
                        placeholder="activité du fournisseur "
                        onChange={activiteFournisseurHandler}
                        value={activiteFournisseur}

      />
      <input type="text"
                        className="nif-fournisseur"
                        id="nif-fournisseur"
                        placeholder="NIF"
                        onChange={nifFournisseurHandler}
                        value={nifFournisseur}
                        
      />  
        <input type="text"
                        className="nis-fournisseur"
                        id="nis-fournisseur"
                        placeholder="NIS"
                        onChange={nisFournisseurHandler}
                        value={nisFournisseur}
      />  
         <input type="text"
                        className="rib-fournisseur"
                        id="rib-fournisseur"
                        placeholder="RIB"
                        onChange={ribFournisseurHandler}
                        value={ribFournisseur}
      /> 
        <input type="text"
                        className="rc-fournisseur"
                        id="rc-fournisseur"
                        placeholder="RC"
                        onChange={rcFournisseurHandler}
                        value={rcFournisseur}
      />
         <textarea type="text"
                        className="fournisseur-note"
                        id="note-fournisseur"
                        placeholder="Note"
                        onChange={noteFournisseurHandler}
                        value={noteFournisseur}

      ></textarea>  
      </div> 
      </div>
      <div className="btn-fournisseur-modal">
      <button className='fournisseur-enregistrer' onClick={addFournisseur} onSubmit={addFournisseur}>Enregistrer</button>
      <button className='fournisseur-annuler' onClick={handleClose}>Annuler</button>
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
