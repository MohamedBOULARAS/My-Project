import { Dialog, DialogTitle, DialogActions, DialogContent, Typography, Button, makeStyles, IconButton } from '@material-ui/core'
import React from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles(theme => ({

    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
        width: '500px',
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    DialogActions: {
        justifyContent: 'center'
    },

    titleIcon: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.light,
        '&:hover': {
            color: theme.palette.error.dark,

            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '6rem',
        }
    }
}))

export default function ConfirmDialog(props) {
    const { confirmDialog, setConfirmDialog } = props;
    const classes = useStyles()
    

    return (
        <Dialog open= {confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
            <IconButton disableRipple className={classes.titleIcon}>
                    <DeleteForeverIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button
                style={{ height: '40px', width: '90px', border: 'none', backgroundColor: 'rgb(70, 140, 245)', borderRadius: '4px', color: 'white', marginTop: '30px'}}
                text= "No"
                color="default"
                onClick={() => setConfirmDialog({...confirmDialog, isOpen: false})}>Non</Button>
                <Button
                style={{ marginRight: '8vw', height: '40px', width: '90px', border: 'none', backgroundColor: 'rgb(244, 74, 44)', borderRadius: '4px', color: 'white', marginTop: '30px'}}
                text= "Oui"
                color="secondary"
                onClick={confirmDialog.onConfirm}>Oui</Button>
            </DialogActions>
        </Dialog>
    )
}



