import React, { useState, useEffect, useStylesuseS } from 'react';
import FctClientModal from '../FctClientModal.js';
import Notification from '../Notification.js';
import ConfirmDialog from '../ConfirmDialog.js';
import './FctClient.css';
import axios from 'axios';
import SidBar from '../Sidebar.js';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import NavFCT from '../NavBarFct.js'
import { Button } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import cookie from 'react-cookies'
import { render } from "react-dom";
import { renderToString } from "react-dom/server";
import jsPDF from "jspdf";
import ReactDOM from "react-dom";
import "jspdf-autotable";




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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  
});


const FctClient = () => {
  const [myCookie, setMyCookie] = useState(cookie.loadAll())
  const classes = useStyles();
  // get client
  const [fctClient, setFctClient] = useState([])
  const [open, setOpen] = React.useState(false);
  //recherche
  const [recherche, setRecherche] = useState("")
  //checkbox
  const [checkedItems, setChekedItems] = useState([]);
  const [checked, setChecked] = React.useState(true);
  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //Notification 
  const [notify, setNotify] = useState({isOpen: false, message: "", type: ""});
  //Confirm Dialog
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: "", subTitle: ""});



  const HandleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const HandleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, fctClient.length - page * rowsPerPage);

  //fetch get All Data
  const getfctClientData = async () => {
    try {
      const data = await axios.get("http://localhost:5000/facture") 
      console.log(data.data)
      setFctClient(data.data)
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getfctClientData()
  }, [])

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleCheck = (e, index) => { //checkbox rows
    checkedItems.includes(index) ?
      setChekedItems(checkedItems.filter(item => item !== index))
      : setChekedItems([...checkedItems, index])
  }
  const deleteSelected = async (id) => { //delete client

    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })

    console.log(myCookie)
    axios.delete(`http://localhost:5000/facture/${id}`, {
      headers: {
        'Authorization': myCookie.token
      }
    })
      .then(res => {
        console.log(res)
        setFctClient(fctClient.filter(item => item._id != id))
      })
      .catch(err => console.log(err))
      setNotify({
        isOpen: true,
        message: 'Supprimé avec succès',
        type: 'error'
      })
  }




const handleOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const styles = {
  lineHeight: '0.1',
  fontFamily: "sans-serif",
  border: '2px bold black'

};

// PDF Facture
const Prints = ({facture, produit}) => (
  <body id='facture'>
    
    <div>
    <h2 style={{fontFamily: "sans-serif", fontSize: '15px', marginLeft: '800px', marginTop: "50px"}}>Facture N°{facture.numero_de_facture}</h2>
    <h2 style={{fontFamily: "sans-serif", fontSize: '15px', marginLeft: '800px'}}>Le: {facture.date_de_facture}</h2>
    </div>
    <div class='aywa'>
    <div>
      <h3 style={{fontFamily: "sans-serif", fontSize: '19px', marginTop: "50px", marginLeft: '10px'}}>Sarl Application</h3>
      <p style={{fontFamily: "sans-serif", fontSize: '15px', marginBottom: "-60px", marginLeft: '10px'}}>Adresse: Rue Alger rouiba smalt 16095</p>
      <p style={{fontFamily: "sans-serif", fontSize: '13px', marginBottom: "-60px", marginLeft: '10px'}}>NIF: 45695356264924982568979</p>
      <p style={{fontFamily: "sans-serif", fontSize: '13px', marginBottom: "-60px", marginLeft: '10px'}}>NIS: 8754327894625862558798</p>
      <p style={{fontFamily: "sans-serif", fontSize: '13px', marginBottom: "-60px", marginLeft: '10px'}}>RC: 978675329562042346789</p>
      <p style={{fontFamily: "sans-serif", fontSize: '13px', marginBottom: "-60px", marginLeft: '10px'}}>AI: 8745082420FOSI67</p>
      <p style={{fontFamily: "sans-serif", fontSize: '13px', marginBottom: "-60px", marginLeft: '10px'}}>RIB: 987FKJZGHEou65456789</p>
    </div>
    <div></div>
    <div className="nif">
      <h4 style={{fontFamily: "sans-serif", fontSize: '17px', marginTop: "-560px", marginLeft: '800px'}}>Doit a:</h4>
      <h3 style={{fontFamily: "sans-serif", fontSize: '19px', marginTop: "-60px", marginLeft: '800px'}}>Sarl IBM Algérie</h3>
      <p style={{fontFamily: "sans-serif", fontSize: '13px', marginTop: "-60px", marginLeft: '800px'}}>NIF: 45695356264924982568979</p>
      <p style={{fontFamily: "sans-serif", fontSize: '13px', marginTop: "-60px", marginLeft: '800px'}}>NIS: 8754327894625862558798</p>
      <p style={{fontFamily: "sans-serif", fontSize: '13px', marginTop: "-60px", marginLeft: '800px'}}>RC: 978675329562042346789</p>
      <p style={{fontFamily: "sans-serif", fontSize: '13px', marginTop: "-60px", marginLeft: '800px'}}>AI: 8745082420FOSI67</p>
      <p style={{fontFamily: "sans-serif", fontSize: '13px', marginTop: "-60px", marginLeft: '800px'}}>RIB: 987FKJZGHEou65456789</p>
    </div>
    </div>
    <div style={{}}>
      <h3 style={{fontFamily: "sans-serif", fontSize: '15px', marginTop: "200px", marginLeft: '850px'}}>Remise: {facture.prix_remise}DZD</h3>
      <h3 style={{fontFamily: "sans-serif", fontSize: '15px', marginTop: '-60px', marginLeft: '850px'}}>Prix HT: {facture.prix_ht}DZD</h3>
      <h3 style={{fontFamily: "sans-serif", fontSize: '15px', marginTop: "-60px", marginLeft: '850px'}}>Frais de services: {facture.prix_frais}DZD</h3>
      <h3 style={{fontFamily: "sans-serif", fontSize: '15px', marginTop: "-60px", marginLeft: '850px'}}>Total HT: {facture.prix_total_ht}DZD</h3>
      <h3 style={{fontFamily: "sans-serif", fontSize: '15px', marginTop: "-60px", marginLeft: '850px'}}>TVA{facture.prixTva}: {facture.prix_tva} DZD</h3>
      <h3 style={{fontFamily: "sans-serif", fontSize: '15px', marginTop: "-60px", marginLeft: '850px'}}>Timbre (1%): {facture.prix_timbre} DZD</h3>
      <h3 style={{fontFamily: "sans-serif", fontSize: '16px', marginTop: "-60px", marginLeft: '850px'}}>Net a payé: {facture.prix_ttc} DZD</h3>
    </div>
    <div>
      <p style={{fontSize: '11', marginTop: '100px', position: 'fixed'}}>
        Sarl Application, Rue val d'hudra el Biar Alger 16000 Algérie, 055069873 / 023659865, contact@application.com <br></br>
        www.application.com / Facebook: Application / Instagram: Application
      </p>
    </div>
    


  </body>
);

const prt = (id) => {
  const string = renderToString(<Prints facture={fctClient.find(el => el._id == id)} />);
  const pdf = new jsPDF("p", "mm", "a4");
  pdf.addImage(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGaaLSM0dkOWaJ1NseGhAMp049j9PlZQe-AA&usqp=CAU",
    "JPEG",
    2 * 2.83,
    4 * 2.83,
    20 * 2.83,
    10 * 2.83
  );

  const prodCol = ["Designation", "PU", "Q", "PT"];

  const prodRows =  fctClient.find(el => el._id == id).produit.map(p => {
    const row = [p.discription, p.prix_vente, p.quantite, p.prix_total];
    return row;
  });

  // const startY = 10 * 2.83;
  const startY = 50 * 2.83;
  pdf.autoTable(prodCol, prodRows, {
    // startY: 180 * 2.83,
    startY,
    theme: "grid",
    styles: {
      fontSize: 11
    }
  });

  pdf.text(
    "",
    22 * 2.83,
    pdf.autoTable.previous.finalY + 22 // we can use doc.autoTable.previous to get previous table data
  );

  pdf.fromHTML(string);
  pdf.save("Facture.pdf");
};

//export PDF list des facture
const print = () => {
  // Create a new jsPDF instance
  const doc = new jsPDF("p", "pt", "a4"); // default values

  // set font
  doc.setFont("helvetica", "bold");

  // font size
  doc.setFontSize(20);

  // title, centered around x
  // doc.text(text, x, y, flags, angle, align);
  doc.text(
    "La liste des Factures", 
    105 * 2.83,
    20 * 2.83,
    null,
    null,
    "center"
  );
  // set back fontStyle to normal
  //doc.setFontStyle("normal");

  // Table
  const fctclientCol = ["N° Facture", "Date Facture", "Prix HT", "Remise", "Prix TTC"];

  const fctclientRows =  fctClient.map(c => {
    const row = [c.numero_de_facture, c.date_de_facture, c.prix_ht, c.prix_remise, c.prix_ttc];
    return row;
  });

  // const startY = 10 * 2.83;
  const startY = 30 * 2.83;
  doc.autoTable(fctclientCol, fctclientRows, {
    // startY: 180 * 2.83,
    startY,
    theme: "striped",
    styles: {
      fontSize: 11
    }
  });

  doc.text(
    "",
    22 * 2.83,
    doc.autoTable.previous.finalY + 22 // we can use doc.autoTable.previous to get previous table data
  );

  doc.save("Liste des factures.pdf");
};


  return (
    <>
      <NavFCT />
      <Notification notify= {notify} setNotify = {setNotify} />
      <div className='fctclient-page'>
        <div className='sidebar'>
          <SidBar />
        </div>
        <div className='fctclient-cntt'>
          <h3 className='fctclient-titre'>Facture Clients</h3>
          <div className='div-recherche-fctclient'>
            <input type="text"
              className="fctclient-Recherche"
              id="REcherche"
              placeholder="Recherche"
              onChange={(e) => {
                setRecherche(e.target.value);
              }}
            />
            <div className='fctclient-btns'>
              <button className='fctclient-btn-imprimer' onClick={print}>Imprimer</button>
            </div>
          </div>

          <div>
            <FctClientModal fctClient={fctClient} setFctClient={setFctClient} />
          </div>
          <div>
            <TableContainer style={{ backgroundColor: 'rgb(255, 255, 255)' }} component={Paper}>
              <Table style={{ backgroundColor: 'rgb(255, 255, 255)' }} className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <Checkbox
                      style={{ marginLeft: '15px', marginTop: '7px' }}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <StyledTableCell style={{ fontSize: '17px', backgroundColor: 'rgb(255, 255, 255)', color: 'black' }}>N° Facture</StyledTableCell>
                    <StyledTableCell style={{ fontSize: '17px', backgroundColor: 'rgb(255, 255, 255)', color: 'black' }}>Date Facture</StyledTableCell>
                    <StyledTableCell style={{ fontSize: '17px', backgroundColor: 'rgb(255, 255, 255)', color: 'black' }}>Date d'envoi</StyledTableCell>
                    <StyledTableCell style={{ fontSize: '17px', backgroundColor: 'rgb(255, 255, 255)', color: 'black' }}>Date d'échéance</StyledTableCell>
                    <StyledTableCell style={{ fontSize: '17px', backgroundColor: 'rgb(255, 255, 255)', color: 'black' }}>Prix HT</StyledTableCell>
                    <StyledTableCell style={{ fontSize: '17px', backgroundColor: 'rgb(255, 255, 255)', color: 'black' }}>Remise</StyledTableCell>
                    <StyledTableCell style={{ fontSize: '17px', backgroundColor: 'rgb(255, 255, 255)', color: 'black' }}>Prix TTC</StyledTableCell>
                    <StyledTableCell style={{ fontSize: '17px', backgroundColor: 'rgb(255, 255, 255)', color: 'black' }}>Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  
                  {fctClient.filter((item) => { //recherche
                    if (recherche == "") {
                      return item
                    } else if (
                      item.date_de_facture.toLowerCase().includes(recherche.toLowerCase())
                      || item.prix_ttc?.toString().toLowerCase().includes(recherche.toLowerCase())
                      || item.numero_de_facture?.toString().toLowerCase().includes(recherche.toLowerCase())) { 
                      return item
                    }
                  })
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) //pagination
                    .map((item) => { //création de tableau
                      return (
                        <StyledTableRow>
                          <StyledTableCell style={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px medium grey' }} component="th" scope="row">
                            <Checkbox
                              checked={checkedItems.includes(item._id)}
                              onChange={e => handleCheck(e, item._id)}
                              color="primary"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                            >Timbre</Checkbox>
                          </StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px medium grey' }} component="th" scope="row">
                            {item.numero_de_facture}
                          </StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px medium grey' }} component="th" scope="row">
                            {item.date_de_facture}
                          </StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px medium grey' }} component="th" scope="row">
                            {item.date_envoi}
                          </StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px medium grey' }} component="th" scope="row">
                            {item.date_echeance}
                          </StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px medium grey' }} component="th" scope="row">
                            {item.prix_ht}
                          </StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px medium grey' }} component="th" scope="row">
                            {item.prix_remise}
                          </StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px medium grey' }} component="th" scope="row">
                            {item.prix_ttc}
                          </StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px medium grey'}} component="th" scope="row">
                            <div style={{ display: 'flex', flexDirection: 'row'}}>
                            <Button  onClick={handleOpen}><i class="fas fa-pen"></i></Button>
                            <Button  
                            onClick={ () => {
                             setConfirmDialog({
                                isOpen: true,
                                title: "Vous ete sur de vouloir supprimer cette facture ?",
                                subTitle: "Si vous cliquer sur OUI, vous allez supprimer la facture !",
                                onConfirm: () => { deleteSelected(item._id) }
                              })
                            }}><i  class="fas fa-trash-alt"></i></Button>                           
                            <Button onClick={() => prt(item._id)}><i class="fas fa-print"></i></Button>
                            </div>
                          </StyledTableCell>
                          
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                component="div"
                count={fctClient.length}
                page={page}
                onChangePage={HandleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={HandleChangeRowsPerPage}
              />
            </TableContainer>
            <ConfirmDialog confirmDialog={confirmDialog}  setConfirmDialog={setConfirmDialog}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default FctClient;

