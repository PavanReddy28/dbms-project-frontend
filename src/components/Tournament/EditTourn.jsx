import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    TextField,
    makeStyles,
    Select,
    Chip,
    Input,
    MenuItem,
    Grid,
    Divider
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: 0.5 * theme.spacing(1),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    alert: {
        width: "100%",
        margin: "15px 0px"
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function EditTourn(props) {

    const classes = useStyles();

    const [tourn, setTourn] = useState(null);

    const sports = [
        'Basketball',
        'Football',
        'Cricket',
        'Tennis',
        'Table Tennis',
        'Badminton'
    ]

    useEffect(() => {
        setTourn(props.tournament);
    }, [props.tournament])

    function handleSports(event) {
        // setTourn(previous => {
        //     return {
        //         ...previous,
        //         [e.target.name]: e.target.value
        //     }
        // }
        setTourn(previous => {
            return {
                ...previous,
                [event.target.name]: event.target.value
            }
        })
    }


    return (
        <Dialog
            open={props.editOpen}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Editing Tournament "}</DialogTitle>
            <Divider />
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required={true}
                            id="t_name"
                            name="t_name"
                            label="Tournament name"
                            value={tourn !== null ? tourn.t_name : ""}
                            onChange={(e) => setTourn(previous => {
                                return {
                                    ...previous,
                                    [e.target.name]: e.target.value
                                }
                            })}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
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
                            value={tourn ? tourn.college : ""}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required={true}
                            id="zip"
                            name="zip"
                            label="Zip / Postal code"
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                setTourn(previous => {
                                return {
                                    ...previous,
                                    [e.target.name]: onlyNums
                                }
                            })}}
                            value={tourn ? tourn.zip : ""}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            labelId="indivSports-mutiple-chip-label"
                            id="indivSports-mutiple-chip"
                            name="sports"
                            multiple
                            value={tourn !== null ? tourn.sports : []}
                            onChange={handleSports}
                            input={<Input id="select-indiv-multiple-chip" />}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}>

                            {/* {(tourn !== null) && tourn.sports.map((name) => {
                                return (<MenuItem key={name} value={name} style={getStyles(name, tourn.sport, theme)}>
                                    {name}
                                </MenuItem>)
                            ))} */}
                            {sports.map(sport => {
                                return (
                                    <MenuItem key={sport} value={sport}>
                                        {sport}
                                    </MenuItem>
                                )
                            })}

                        </Select>
                    </Grid>
                </Grid>

            </DialogContent>
            <Divider />

            <DialogActions>
                <Button onClick={() => props.onEdit(tourn)} color="primary" >
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