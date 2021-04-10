import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    makeStyles,
    Divider,
} from '@material-ui/core';
import {Alert} from "@material-ui/lab";

const Delete = ({deleteOpen, setDeleteOpen, handleDelete}) => {
    return (
        <React.Fragment>
            <Dialog
                    open={deleteOpen}
                    onClose={() => setDeleteOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Delete Match</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            By pressing confirm this tournament will be permanently deleted
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>handleDelete()} color="primary" >
                            Confirm
                        </Button>
                        <Button onClick={() => setDeleteOpen(false)} color="primary" autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
        </React.Fragment>
    )
}

export default Delete
