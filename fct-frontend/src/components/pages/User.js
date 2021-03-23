import React, { useState, useEffect, useStylesuseS } from 'react';
import UserModal from '../UserModal.js';
import UserModalUp from '../UserModalUp.js';
import Notification from '../Notification.js';
import ConfirmDialog from '../ConfirmDialog.js';
import './User.css';
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
import cookie from 'react-cookies';
import jsPDF from "jspdf";
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



const User = () => {
  const [myCookie, setMyCookie] = useState(cookie.loadAll())
  const classes = useStyles();
  // get client
  const [user, setUser] = useState([])
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
    rowsPerPage - Math.min(rowsPerPage, user.length - page * rowsPerPage);

  //fetch get All Data
  const getUserData = async () => {
    try {
      const data = await axios.get("http://localhost:5000/register") 
      console.log(data.data)
      setUser(data.data)
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleCheck = (e, index) => { //checkbox rows
    checkedItems.includes(index) ?
      setChekedItems(checkedItems.filter(item => item !== index))
      : setChekedItems([...checkedItems, index])
  }

  //delete user
  const deleteSelected = async (id) => { 

    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })

    console.log(myCookie)
    axios.delete(`http://localhost:5000/register/${id}`, {
      headers: {
        'Authorization': myCookie.token
      }
    })
      .then(res => {
        console.log(res)
        setUser(user.filter(item => item._id != id))
      })
      .catch(err => console.log(err))

      setNotify({
        isOpen: true,
        message: 'Supprimé avec succès',
        type: 'error'
      })

  }

  const updateData = async (id) => {
    axios.put(`http://localhost:5000/register/${id}`, {
      headers: {
        'Authorization': myCookie.token
      }
    })
    .then(response => response.json())
    .then((res) => {
      console.log(res)
      var newArray = user
      var index = newArray.findIndex(x => x.id == id)
      newArray[index] = res.user
      setUser([...newArray])
    })
    setOpen(true);
  }


const handleOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

//export PDF
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
    "La liste des utillisateurs",
    105 * 2.83,
    20 * 2.83,
    null,
    null,
    "center"
  );

  
  // set back fontStyle to normal
  //doc.setFontStyle("normal");

  // Table
  const userCol = ["Code", "Utillisateur", "e-mail", "Nom"];

  const userRows = user.map(u => {
    const row = [u.code_user, u.username, u.email, u.tell, u.firstname];
    return row;
  });

  // const startY = 10 * 2.83;
  const startY = 30 * 2.83;
  doc.autoTable(userCol, userRows, {
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

  doc.save("Liste des utillisateurs.pdf");
};

  return (
    <>
      <NavFCT />
      <Notification notify= {notify} setNotify = {setNotify} />
      <div className='user-page'>
        <div className='sidebar'>
          <SidBar />
        </div>
        <div className='user-cntt'>
          <h2 className='user-titre'>Utilisateurs</h2>
          <div className='user-div-recherche'>
            <input type="text"
              className="user-Recherche"
              id="REcherche"
              placeholder="Recherche"
              onChange={(e) => {
                setRecherche(e.target.value);
              }}
            />
            <div className='user-btns'>
               <button className='user-btn-imprimer' onClick={print}>Imprimer</button>
            </div>
          </div>

          <div>
            <UserModal user={user} setUser={setUser} />
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
                    <StyledTableCell style={{ fontSize: '17px', backgroundColor: 'rgb(255, 255, 255)', color: 'black' }}>Code</StyledTableCell>
                    <StyledTableCell style={{ fontSize: '17px', backgroundColor: 'rgb(255, 255, 255)', color: 'black' }}>Utilisateur</StyledTableCell>
                    <StyledTableCell style={{ fontSize: '17px', backgroundColor: 'rgb(255, 255, 255)', color: 'black' }}>e-mail</StyledTableCell>
                    <StyledTableCell style={{ fontSize: '17px', backgroundColor: 'rgb(255, 255, 255)', color: 'black' }}>nom</StyledTableCell>
                    <StyledTableCell style={{ fontSize: '17px', backgroundColor: 'rgb(255, 255, 255)', color: 'black' }}>Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                  {user.filter(item => { //recherche
                    if (recherche == "") {
                      return item
                    } else if (
                        item.username.toLowerCase().includes(recherche.toLowerCase())
                     || item.email.toLowerCase().includes(recherche.toLowerCase()) 
                     || item.code_user?.toString().toLowerCase().includes(recherche.toLowerCase())) {
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
                            />
                          </StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px medium grey' }} component="th" scope="row">
                            {item.code_user}
                          </StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px medium grey' }} component="th" scope="row">
                            {item.username}
                          </StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px medium grey' }} component="th" scope="row">
                            {item.email}
                          </StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px medium grey' }} component="th" scope="row">
                            {item.firstname}
                          </StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: 'rgb(255, 255, 255)', border: '1px medium grey'}} component="th" scope="row">
                          <div style={{display: 'flex', flexDirection: 'row'}}>
                          <UserModalUp allUsers={user} user={user.find(el => el._id == item._id)} setUser={setUser} />
                            <Button  
                            onClick={ () => {
                             setConfirmDialog({
                                isOpen: true,
                                title: "Vous ete sur de vouloir supprimer cette utillisateur ?",
                                subTitle: "Si vous cliquer sur OUI, vous allez supprimer l'utillisateur !",
                                onConfirm: () => { deleteSelected(item._id) }
                              })
                              //() => deleteSelected(item._id)
                            }}><i  class="fas fa-trash-alt"></i></Button>
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
                count={user.length}
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

export default User;