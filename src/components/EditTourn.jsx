import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContentText,
    DialogTitle,
    DialogContent,
    TextField,
    useStyles
} from '@material-ui/core';

function EditTourn(props) {
    const [tourn, setTourn] = useState(null);

    useEffect(() => {
        setTourn(props.tournament)
    }, [props.tournament])

    return (
        <Dialog
            open={props.editOpen}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Editing Tournament "}</DialogTitle>
            <DialogContent>
                <TextField
                    required={true}
                    id="t_name"
                    name="t_name"
                    label="Tournament name"
                    value={tourn !== null? tourn.t_name:""}
                    onChange={(e) => setTourn(previous => {
                        return {
                            ...previous,
                            [e.target.name]: e.target.value
                        }
                    })}
                    fullWidth
                />

                <TextField
                    required={true}
                    id="college"
                    name="college"
                    label="College/Organizer"
                    onChange={(e) => setTourn(previous => {
                        return {
                            ...previous,
                            [e.target.name]: e.target.value
                        }
                    })}
                    value={tourn?tourn.college:""}
                    fullWidth
                />
                <TextField
                    required={true}
                    id="address"
                    name="address"
                    label="Address"
                    onChange={(e) => setTourn(previous => {
                        return {
                            ...previous,
                            [e.target.name]: e.target.value
                        }
                    })}
                    value={tourn ? tourn.address : ""}
                    fullWidth
                    autoComplete="shipping address-line1"
                />
                <TextField
                    required={true}
                    id="city"
                    name="city"
                    label="City"
                    onChange={(e) => setTourn(previous => {
                        return {
                            ...previous,
                            [e.target.name]: e.target.value
                        }
                    })}
                    value={tourn ? tourn.city : ""}
                    fullWidth
                    autoComplete="shipping address-level2"
                />
                <TextField
                    required={true}
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    onChange={(e) => setTourn(previous => {
                        return {
                            ...previous,
                            [e.target.name]: e.target.value
                        }
                    })}
                    value={tourn ? tourn.region : ""}
                    fullWidth
                />
                <TextField
                    required={true}
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    onChange={(e) => setTourn(previous => {
                        return {
                            ...previous,
                            [e.target.name]: e.target.value
                        }
                    })}
                    value={tourn ? tourn.zip : ""}
                    fullWidth
                />
                <TextField
                    required={true}
                    id="country"
                    name="country"
                    label="Country"
                    onChange={(e) => setTourn(previous => {
                        return {
                            ...previous,
                            [e.target.name]: e.target.value
                        }
                    })}
                    value={tourn ? tourn.country : ""}
                    fullWidth
                    autoComplete="shipping country"
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={() => props.onEdit(tourn)} color="secondary" >
                    Confirm
          </Button>
                <Button onClick={props.onClose} color="primary" autoFocus>
                    Cancel
          </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditTourn;