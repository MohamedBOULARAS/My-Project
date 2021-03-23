import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './UserModal.css'
import cookie from 'react-cookies'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './UserModal.css';


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

export default function UserModal({setUser,user}) {
  const classes = useStyles();

  //cookie
  const [myCookie, setMyCookie] = useState(cookie.loadAll())

  const [age, setAge] = React.useState('');
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  //hook modal
  const [codeUser, setCodeUSer] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [entreprise, setEntreprise] = useState([]);
  const [selectedEntreprise, setSelectedEntreprise] = useState([]);



    //get data from modal and passed to fournisseur list
    const codeUserHandler = (e) => {
      setCodeUSer(e.target.value)
    };
    const userNameHandler = (e) => {
      setUserName(e.target.value)
    };
    const firstNameHandler = (e) => {
      setFirstName(e.target.value)
    };
    const lastNameHandler = (e) => {
      setLastName(e.target.value)
    };
    const userEmailHandler = (e) => {
      setUserEmail(e.target.value)
    };
    const userPasswordHandler = (e) => {
      setUserPassword(e.target.value)
    };
    const entrepriseHandler = (value) => {
      console.log(entreprise[value])
      setSelectedEntreprise(value)
    };




    const addUser = (e) => {
      e.preventDefault()
      var newUser = {code_user: codeUser, username: userName, firstname: firstName, lastname: lastName, email: userEmail, password: userPassword, entr:[{ raison_social : entreprise[selectedEntreprise].raison_social }]}
      console.log({selectedEntreprise})
      const requestOptions = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': myCookie.token
          },
          body: JSON.stringify(newUser)
      }
      //fetch Post Data
      fetch("http://localhost:5000/register/signup", requestOptions)
      .then(response => response.json())
      .then((res) => {
        console.log(res)
        setUser([...user,res.user], (""))
      })
      setOpen(false);

    }

    useEffect(async () => {
      var res = await fetch('http://localhost:5000/entreprise');
      var data = await res.json();
      setEntreprise(data);
    }, []);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const body = (
    <div className="user-modal">
    <div style={{modalStyle, height: '550px', width: '650px', marginTop: '6vh', marginLeft: '23vw', borderRadius: '10px', border: 'none', boxShadow: 'black'}} className={classes.paper}>
      <div className="cntt-user-modal">
      <h2 style={{paddingTop: '30px', paddingLeft: '30px'}} id="simple-modal-title">Utilisateur</h2>
      <div className="all-ligne">
      <div className="ligne-1">
      <input type="text"
                        className="code-user"
                        id="code_user"
                        placeholder="Code"
                        onChange={codeUserHandler}
                        value={codeUser}
      /> 
      <input type="text"
                        className="userName"
                        id="userName"
                        placeholder="User Name"
                        onChange={userNameHandler}
                        value={userName}
      /> 
      </div>
      <div className="ligne-2">
      <input type="text"
                        className="user-first-name"
                        id="user-first-name"
                        placeholder="Nom  "
                        onChange={firstNameHandler}
                        value={firstName}
      /> 
       <input type="text"
                        className="user-last-name"
                        id="userLastName"
                        placeholder="Prénom"
                        onChange={lastNameHandler}
                        value={lastName}
      /> 
      </div>
      <div className="ligne-3">
      <input type="text"
                        className="user-email"
                        id="tuserEmail"
                        placeholder="e-mail"
                        onChange={userEmailHandler}
                        value={userEmail}
      /> 
      <input type="text"
                        className="user-password"
                        id="userPassword"
                        placeholder="Mot de passe "
                        onChange={userPasswordHandler}
                        value={userPassword}
      /> 
      </div>
      <div className="ligne-4">
      <FormControl style={{height: '50px', width: '250px', marginLeft: '30px'}}  variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="outlined-age-native-simple">Entreprise</InputLabel>
        <Select
           native
           value={selectedEntreprise}
           onChange={e => entrepriseHandler(e.target.value)}
           label="Entreprise"
           inputProps={{
             name: 'entreprise',
             id: 'outlined-age-native-simple',
            }}
        >
        <option aria-label="None" value="" />
          {entreprise.map((entr, index) => (
        <option key={index} value={index}>{entr.raison_social}</option>
          ))}
       </Select>
       </FormControl> 

       <FormControl style={{height: '50px', width: '250px', borderColor: 'rgb(70, 140, 245)', marginLeft: '10px'}} variant="outlined" className={classes.formControl}>
       <InputLabel htmlFor="outlined-age-native-simple">Role</InputLabel>
         <Select
           native
           value={age}
           onChange={handleChange}
           label="Role"
           inputProps={{
           name: 'role',
           id: 'outlined-age-native-simple',
           }}
          >
          <option aria-label="None" value="" />
          <option value={10}>Super admin</option>
          <option value={20}>Admin</option>
          <option value={30}>User</option>
         </Select>
       </FormControl> 
      </div>
      </div>
      </div>
      <div className="bt-user-modal">
      <button className='user-enregistrer' onClick={addUser} onSubmit={addUser}>Enregistrer</button>
      <button className='user-annuler' onClick={handleClose}>Annuler</button>
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
