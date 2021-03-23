import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './EntrepriseModal.css'
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

export default function EntrepriseModal({setEntreprise,entreprise}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  //hook modal
  const [codeEntreprise, setCodeEntreprise] = useState("");
  const [raisonSocial, setRaisonSocial] = useState("");
  const [typeEntreprise, setTypeEntreprise] = useState("");
  const [emailEntreprise, setEmailEntreprise] = useState("");
  const [tellEntreprise, setTellEntreprise] = useState("");
  const [adresseEntreprise, setAdresseEntreprise] = useState("");
  const [activiteEntreprise, setActiviteEntreprise] = useState("");

    //get data from modal and passed to fournisseur list
    const codeEntrepriseHandler = (e) => {
      setCodeEntreprise(e.target.value)
    };
    const raisonRaisonSocialHandler = (e) => {
      setRaisonSocial(e.target.value)
    };
    const typeEntrepriseHandler = (e) => {
      setTypeEntreprise(e.target.value)
    };
    const emailEntrepriseHandler = (e) => {
      setEmailEntreprise(e.target.value)
    };
    const tellEntrepriseHandler = (e) => {
      setTellEntreprise(e.target.value)
    };
    const adresseEntrepriseHandler = (e) => {
      setAdresseEntreprise(e.target.value)
    };
    const activiteEntrepriseHandler = (e) => {
      setActiviteEntreprise(e.target.value)
    };

    const addEntreprise = (e) => {
      e.preventDefault()
      var newEntreprise = {code_entreprise: codeEntreprise, raison_social: raisonSocial, type_entreprise: typeEntreprise, email: emailEntreprise, tell: tellEntreprise, adresse: adresseEntreprise, activite: activiteEntreprise}
      const requestOptions = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newEntreprise)
      }
      //fetch Post Data
      fetch("http://localhost:5000/entreprise", requestOptions)
      .then(response => response.json())
      .then((res) => {
        console.log(res)
        setEntreprise([...entreprise,res.entreprise], (""))
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
    <div className="entreprise-modal">
    <div style={{modalStyle, height: '500px', width: '600px', marginTop: '17vh', marginLeft: '31vw', borderRadius: '10px', border: 'none', boxShadow: 'black'}} className={classes.paper}>
      <div className="cntt-entreprise-modal">
      <h2 style={{paddingTop: '30px', paddingLeft: '30px'}} id="simple-modal-title">Entreprise</h2>   
      <div className="all-input">
      <div className="input-1">
      <input type="text"
                        className="code-entreprise"
                        id="code_entreprise"
                        placeholder="Code"
                        onChange={codeEntrepriseHandler}
                        value={codeEntreprise}
      /> 
      <input type="text"
                        className="raison-social"
                        id="raisonSocial"
                        placeholder="Raison social"
                        onChange={raisonRaisonSocialHandler}
                        value={raisonSocial}
      /> 
      </div>
      <div className="input-2">
      <input type="text"
                        className="type-entreprise"
                        id="typed'entreprise"
                        placeholder="Type d'entreprise "
                        onChange={typeEntrepriseHandler}
                        value={typeEntreprise}
      /> 
       <input type="text"
                        className="email-entreprise"
                        id="emailentreprise"
                        placeholder="e-mail"
                        onChange={emailEntrepriseHandler}
                        value={emailEntreprise}
      /> 
      </div>
      <div className="input-3">
      <input type="text"
                        className="tel-entreprise"
                        id="telEntreprise"
                        placeholder="Numéro de téléphone"
                        onChange={tellEntrepriseHandler}
                        value={tellEntreprise}
      /> 
      <input type="text"
                        className="adreese-entreprise"
                        id="adresseEntreprise"
                        placeholder="Adresse de l'entreprise "
                        onChange={adresseEntrepriseHandler}
                        value={adresseEntreprise}

      /> 
      </div>
      <div className="input-4">
      <input type="text"
                        className="activité-entreprise"
                        id="ActivitéEntreprise"
                        placeholder="Activité de l'entreprise "
                        onChange={activiteEntrepriseHandler}
                        value={activiteEntreprise}

      /> 
      </div>  
      </div> 
      </div>
      <div className="btn-entreprise-modal">
      <button className='entreprise-enregistrer' onClick={addEntreprise} onSubmit={addEntreprise}>Enregistrer</button>
      <button className='entreprise-annuler' onClick={handleClose}>Annuler</button>
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
