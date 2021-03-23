import React from 'react';
import { Snackbar, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';



const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(12),
    }
}))

function Notification(props) {
 
    const {notify, setNotify} = props;

    const classes = useStyles()

    const handleClose = (event, reason) => {
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
        style={{height: '20px'}}
        className={classes.root}
        open= {notify.isOpen}
        autoHideDuration= {7000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
        onClose={handleClose}
        >
            <Alert severity={notify.type} onClose={handleClose} >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification;
