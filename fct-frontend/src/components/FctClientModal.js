import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Notification from './Notification.js';
import ProdFctModal from './ProdFctModal.js';
import DesFctModal from './DesFctModal.js';
import ConfirmDialog from './ConfirmDialog.js';
import './FctClientModal.css'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import axios from 'axios';
import { Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import NumberFormat from 'react-number-format';

//table import
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';


//table parametre
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

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

//Style
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
  //date
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  table: {
    minWidth: 700,
  },
}));

export default function FctClientModal({setFctClient, fctClient}) {
  const classes = useStyles();

  const [age, setAge] = React.useState('');
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  //date
  const [selectedDate, setSelectedDate] = React.useState(new Date(''));

  //hook modal
  const [facture, setFacture] = useState({
    numero_de_facture: 0,
    type_facture:  "",
    date_de_facture: "",
    discription: "",
    date_envoi: "",
    date_echeance: "",
    numero_bc: "",
    note: "",
    prix_ht: 0,
    quantite: 0,
    prix_total: 0,
    prix_remise: 0,
    prix_total_ht: 0,
    prix_frais: 0,
    prix_tva: 0,
    prix_timbre: 0,
    prix_ttc: 0,
    user_id: "6043a4b052bee653f2aa5f06",
    produit:  [],
    clients: [],
    is_FCT_fournisseur: { type: Boolean, required: false },
  });
//Modal hook
  const [numFacture, setNumFacture] = useState("");
  const [typeFacture, setTypeFacture] = useState(1);
  const [dateFacture, setDateFacture] = useState(new Date());
  const [quantite, setQuantite] = useState("");
  const [dateEnvoi, setDateEnvoi] = useState(new Date());
  const [dateEcheance, setDateEcheance] = useState(new Date());
  const [numeroBc, setNumeroBc] = useState("");
  const [noteFacture, setNoteFacture] = useState("");
  const [prixHt, setPrixHt] = useState("");
  const [prixRemise, setPrixRemise] = useState("");
  const [prixFrais, setPrixFrais] = useState("");
  const [prixTva, setPrixTva] = useState("");
  const [prixTimbre, setPrixTimbre] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [prixTtc, setPrixTtc] = useState("");
  const [prixTotalHt, setPrixTotalHt] = useState(0);
  const [client, setClient] = useState([]);
  const [selectedClient, setSelectedClient] = useState([]);
  const [produit, setProduit] = useState([]);
  const [selectedProduit, setSelectedProduit] = useState([]);

  //Notification-------
const [notify, setNotify] = useState({isOpen: false, message: "", type: ""});
//Confirm Dialog-----------
const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: "", subTitle: ""});

  //get data from modal and passed to facture list 
    const factureHandler = (e) => {
        setFacture(e.target.value)
      };
    const numFactureHandler = (e) => {
      setNumFacture(e.target.value)
    };
    const typeFactureHandler = (e) => {
      console.log(e.target.value)
      setTypeFacture(e.target.value)
    };
    const dateFactureHandler = (e) => {
      console.log(e.target.value)
      setDateFacture(e.target.value)
    };
    const clientHandler = (value) => {
      console.log(client[value])
      setSelectedClient(value)
    };
    const quantiteHandler = (e) => {
        setQuantite(e.target.value)
      };
    const dateEnvoiHandler = (e) => {
      setDateEnvoi(e.target.value)
      console.log(e.target.value)

    };
    const dateEcheanceHandler = (e) => {
      setDateEcheance(e.target.value)
      console.log(e.target.value)

    };
    const numeroBcHandler = (e) => {
      setNumeroBc(e.target.value)
    };
    const noteFactureHandler = (e) => {
        setNoteFacture(e.target.value)
      };
    const prixHtHandler = (e) => {
        setPrixHt(e.target.value)
      };
    const prixRemiseHandler = (e) => {
        setPrixRemise(e.target.value)
      };
    const prixFraisHandler = (e) => {
        setPrixFrais(e.target.value)
        console.log(prixHt)
        setPrixTotalHt(prixHt + (e.target.value != '' ? parseInt(e.target.value) : 0))
      };
    const prixTvaHandler = (e) => {
        setPrixTva(e.target.value)
        var result = parseInt(((prixTotalHt * e.target.value) / 100)) + parseInt(prixTotalHt)
        setPrixTtc(result)
      };
    const prixTimbreHandler = (e) => {
        // setPrixTimbre()
        setIsChecked(!isChecked)
        var resultat = (((parseInt(prixTotalHt) * parseInt(prixTva)) * 0.01) + parseInt(prixTotalHt) ) * 0.01
        if(!isChecked) {
          setPrixTimbre(resultat)
          setPrixTtc(prixTtc +resultat)
        }else {
          setPrixTimbre(0)
          setPrixTtc(prixTtc - resultat)
        }
      };
    const prixTtcHandler = (e) => {
        setPrixTtc(e.target.value)
      };
    const produithandler = (value) => {
      setSelectedProduit(value)
    };
      
    //Add facture--------------
     const addFctClient = (e) => {
      e.preventDefault()
      var newFctClient = {
          numero_de_facture: numFacture,
          type_facture: typeFacture,
          clients:[{ raison_social : client[selectedClient].raison_social }],
          date_de_facture: dateFacture,
          quantite: quantite,
          date_envoi: dateEnvoi,
          date_echeance: dateEcheance,
          numero_bc: numeroBc,
          note: noteFacture,
          prix_ht: prixHt,
          prix_remise: prixRemise,
          prix_frais: prixFrais,
          prix_total_ht: prixTotalHt,
          prix_tva: (prixTotalHt * prixTva) / 100,
          prix_timbre: prixTimbre,
          prix_ttc: prixTtc,
          produit: facture.produit,
      }
      
      const requestOptions = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newFctClient)
      }
      //fetch Post Data
      fetch("http://localhost:5000/facture", requestOptions)
      .then(response => response.json())
      .then((res) => {
        console.log(res)
        setFctClient([...fctClient,res.fctClient], (""))
      })
      setOpen(false);
      
     console.log(newFctClient)
    }

    //fetch client list--------------
    useEffect(async () =>{
      var res = await fetch('http://localhost:5000/client');
      var data = await res.json();
      setClient(data);
    }, []);

    //add prodact-------------------
    useEffect(() => {
      if(facture.produit.length != 0)
      {
        var res = 0
        facture.produit.forEach(el => res += el.prix_ht)
        setPrixHt(res)
        var res2 = 0
        facture.produit.forEach(el => res2 += parseInt(el.prix_remise))
        setPrixRemise(res2)
        setPrixTotalHt((res) + prixFrais) // -res 2 --> si en calcule la remise depuis les totaux
      }
      // setPrixHt(facture.produit.reduce((acc, el) => acc.prix_ht + el.prix_ht).prix_ht)
    }, [facture])

// open modal------------
  const handleOpen = () => {
    setOpen(true);
  };

  //close modal----------
  const handleClose = () => {
    setOpen(false);
  };

  //date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

    //delete prodact--------------------
    const deleteSelected = async (id) => { 

      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
      })
      axios.delete(`http://localhost:5000/facture/${id}`, {
      })
        .then(res => {
          console.log(res)
          setFacture(facture.filter(item => item._id != id))
        })
        .catch(err => console.log(err))
  
        setNotify({
          isOpen: true,
          message: 'Supprimé avec succès',
          type: 'error'
        })
    }
  
  const body = (
    <div style={{modalStyle, height: '95vh', width: '1400px', marginTop: '2vh', marginLeft: '6vw', borderRadius: '10px', border: 'none', boxShadow: 'black'}} className={classes.paper}>
      <Notification notify= {notify} setNotify = {setNotify} />
      <h2 style={{paddingTop: '5px', paddingLeft: '30px', marginBottom: '-30px'}} id="simple-modal-title">Facture</h2> 
      <div className="typefct-ttcfct">
      <div className="fctclient-info-1">
          <div className="typefct-datefct">
      <FormControl style={{height: '40px', width: '200px'}}  variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Type de facture</InputLabel>
          <Select
            native
            value={typeFacture}
            onChange={typeFactureHandler}
            label="Type de facture"
            inputProps={{
              name: 'Type de facture',
              id: 'outlined-age-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value={1}>Facture de vente</option>
            <option value={2}>Facture d'avoir</option>

          </Select>
        </FormControl>  
        <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Date de la facture"
        type="date"
        Value={dateFacture}
        onChange={dateFactureHandler}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
       </form>
       </div>
       <div className="nfct-clientfct">
         <input type="text"
                        className="num-fctclient"
                        id="num-fctclient"
                        placeholder="N° de facture"
                        onChange={numFactureHandler}
                        value={numFacture}
        /> 
        <FormControl style={{height: '30px', width: '420px', marginLeft: '0px'}}  variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Client</InputLabel>
          <Select
            native
            value={selectedClient}
            onChange={e => clientHandler(e.target.value)}
            label="Client"
            inputProps={{
              name: 'client',
              id: 'outlined-age-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            {client.map((clients, index) => (
            <option key={index} value={index}>{clients.raison_social}</option>
            ))}
          </Select>
        </FormControl> 
        </div>
        </div> 
        <div className="fctclient-info-2">
       <div className="envoi-echeance">
      <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Date d'envoi"
        type="date"
        Value={dateEnvoi}
        onChange={dateEnvoiHandler}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
       </form>

        <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Date d'écheance"
        type="date"
        Value={dateEcheance}
        onChange={dateEcheanceHandler}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
       </form>
       </div>
       <div className="bc-note">
        <input type="text"
                        className="numBC"
                        id="numBc"
                        placeholder="numéro de bon de commande"
                        onChange={numeroBcHandler}
                        value={numeroBc}
                        style={{height: '50px', width: '210px', border: '2px solid rgb(192, 190, 190)', borderRadius: '5px', marginTop: '10px', paddingLeft: '10px'}}
        /> 
        <input type="text"
                        className="notefctclient"
                        id="notefctclient"
                        placeholder="note"
                        onChange={noteFactureHandler}
                        value={noteFacture}
        /> 
        </div>
        </div>  
        <div className="fctclient-info-3">
        <div className="ht-ttc">
        <div className="ht-totalht">
                <NumberFormat 
                        thousandSeparator={true}
                        readOnly
                        className="prixht"
                        id="prixht"
                        placeholder="Prix HT"
                        onChange={prixHtHandler}
                        value={prixHt}
                        style={{height: '40px', width: '200px', border: '2px solid rgb(192, 190, 190)', borderRadius: '5px', marginTop: '5px', paddingLeft: '10px'}}
                /> 
                <NumberFormat 
                        thousandSeparator={true}
                        readOnly
                        className="remise"
                        id="remise"
                        placeholder="Remise"
                        onChange={prixRemiseHandler}
                        value={prixRemise}
                        style={{height: '40px', width: '200px', border: '2px solid rgb(192, 190, 190)', borderRadius: '5px', marginTop: '5px', paddingLeft: '10px'}}

                /> 
                <NumberFormat 
                        className="frais"
                        id="frais"
                        placeholder="Frais de services"
                        onChange={prixFraisHandler}
                        value={prixFrais}
                        style={{height: '40px', width: '200px', border: '2px solid rgb(192, 190, 190)', borderRadius: '5px', marginTop: '5px', paddingLeft: '10px'}}
                /> 
                <NumberFormat 
                        thousandSeparator={true}
                        readOnly
                        className="Totalht"
                        id="totalht"
                        placeholder="Total HT"
                        onChange={(e) => setPrixTotalHt(e.target.value)}
                        value={prixTotalHt}
                        style={{height: '40px', width: '200px', border: '2px solid rgb(192, 190, 190)', borderRadius: '5px', marginTop: '5px', paddingLeft: '10px'}}

                /> 
        </div>
        <div className="tva-ttc">
        <FormControl   variant="outlined" className={classes.formControl}>
        <InputLabel  htmlFor="outlined-age-native-simple">TVA</InputLabel>
          <Select
            style={{height: '40px', width: '200px', marginRight: '40px', marginTop: '-5px'}}
            native
            onChange={prixTvaHandler}
            value={prixTva}
            label="TVA"
            inputProps={{
              name: 'TVA',
              id: 'outlined-age-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value={0}>Non soumis a la TVA</option>
            <option value={19}>19 %</option>
            <option value={9}>9 %</option>
          </Select>
        </FormControl> 
        <NumberFormat 
                        thousandSeparator={true}
                        readOnly
                        className="Montant TVA"
                        id="Montant TVA"
                        placeholder="Montant TVA"
                        onChange={(e) => setPrixTva(e.target.value)}
                        value={(prixTotalHt * prixTva) / 100}
                        style={{height: '40px', width: '200px', border: '2px solid rgb(192, 190, 190)', borderRadius: '5px', marginTop: '-4px', marginLeft: "6px", paddingLeft: '10px'}}
                /> 
        <div className="timbre-ttc">
        <Checkbox
        label={'Timbre'}
          style={{marginRight: '230px', marginTop: '6px', color: 'rgb(70, 140, 245)'}}
          className="tmbr"
          onChange={prixTimbreHandler}
          checked={isChecked}
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        <NumberFormat 
                        thousandSeparator={true}
                        readOnly
                        className="Montant Timbre"
                        id="Montant Timbre"
                        placeholder="Droit de timbre (1%)"
                        onChange={(e) => setPrixTimbre(e.target.value)}
                        value={prixTimbre}
                        style={{height: '40px', width: '160px', border: '2px solid rgb(192, 190, 190)', borderRadius: '5px', marginTop: '-41px', marginLeft: "45px", paddingLeft: '10px'}}

                />         <NumberFormat 
           thousandSeparator={true}
           readOnly
           className="ttc"
           id="ttc"
           placeholder="Total TTC"
           onChange={prixTtcHandler}
           value={prixTtc}
           style={{height: '40px', width: '200px', border: '2px solid rgb(192, 190, 190)', borderRadius: '5px', marginTop: '5px', paddingLeft: '10px', marginLeft: '5px'}}
         /> 
        </div>
        </div>
        </div>
        </div>
        </div>
        <div className="fct-prod-modal">
        <div className="fct-prod-modal-1">
        <ProdFctModal facture={facture} setFacture={setFacture} />
        </div>
        <div className="fct-prod-modal-2">
        <DesFctModal produit={facture} setProduit={setFacture} />
        </div>
        </div>
        <div className="prodact-table">
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ fontSize: '17px', backgroundColor: 'rgb(255, 255, 255)', color: 'black' }} align="left">Designation</StyledTableCell>
            <StyledTableCell style={{ fontSize: '17px', backgroundColor: 'rgb(255, 255, 255)', color: 'black' }} align="left">PU</StyledTableCell>
            <StyledTableCell style={{ fontSize: '17px', backgroundColor: 'rgb(255, 255, 255)', color: 'black' }} align="left">Quantité</StyledTableCell>
            <StyledTableCell style={{ fontSize: '17px', backgroundColor: 'rgb(255, 255, 255)', color: 'black' }} align="left">PT</StyledTableCell>
            <StyledTableCell style={{ fontSize: '17px', backgroundColor: 'rgb(255, 255, 255)', color: 'black' }}>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {facture.produit
          .map((item) => (
            <StyledTableRow>
                          <StyledTableCell style={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px medium grey' }} component="th" scope="row">
                          {item.nom_du_produit}, {item.discription}
                          </StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px medium grey' }} component="th" scope="row" housandSeparator={true}>
                            {item.prix_vente}  
                          </StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px medium grey' }} component="th" scope="row">
                            {item.quantite}
                          </StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px medium grey' }} component="th" scope="row">
                            {item.prix_ht}
                          </StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px medium grey'}} component="th" scope="row">
                            <Button  onClick={handleOpen}><i class="fas fa-pen"></i></Button>
                            <Button  
                            onClick={ () => {
                             setConfirmDialog({
                                isOpen: true,
                                title: "Vous ete sur de vouloir supprimer ce produit / services ?",
                                subTitle: "Si vous cliquer sur OUI, vous allez supprimer le produit / services !",
                                onConfirm: () => { deleteSelected(item._id) }
                              })
                              //() => deleteSelected(item._id)
                            }}><i  class="fas fa-trash-alt"></i></Button>
                          </StyledTableCell>
             </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
        </div>

      <div className="btn-fct-client-modal">
      <button className='fct-client-enregistrer' onClick={addFctClient} onSubmit={addFctClient}>Enregistrer</button>
      <button className='fct-client-annuler' onClick={handleClose}>Annuler</button>
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
      <ConfirmDialog confirmDialog={confirmDialog}  setConfirmDialog={setConfirmDialog}/>
    </div>
  );
}
