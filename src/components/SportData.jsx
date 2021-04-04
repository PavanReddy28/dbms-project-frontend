import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Input, InputLabel, MenuItem, FormControl, FormControlLabel, Select, Typography, Grid, Checkbox, Chip, Button } from '@material-ui/core';
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
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

const sportsList = {
    teamSports: [
        'Basketball',
        'Football',
        'Cricket'
    ],
    indivSports: [
        'Tennis',
        'Table Tennis',
        'Badminton'
    ]
};

function getStyles(name, sport, theme) {
    return {
        fontWeight:
        sport.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}


const SportData = ({ sports, onAdd, handleNext, handleBack }) => {

    const classes = useStyles();
    const theme = useTheme();

    const [teamSport, setTeamSport] = React.useState(sports.teamSport? sports.teamSport : []);
    const [indivSport, setIndivSport] = React.useState(sports.indivSport? sports.indivSport : []);

    const [incomplete,setIncomplete] = React.useState(false);
  
    const handleTeamChange = (event) => {
        setTeamSport(event.target.value);
    };

    const handleIndivChange = (event) => {
        setIndivSport(event.target.value);
    };

    const onSubmit = (e) => {    
        if(teamSport.length===0 && indivSport.length===0)
        {
            setIncomplete(true);
            return 
        }
        onAdd({teamSport, indivSport});
        handleNext();
      };

      const onhSubmit = (e) => {
        onAdd({teamSport, indivSport});
        handleBack();
      };
    
    
    return (
        <React.Fragment>
        <Grid item xs={12} lg={12}>
            {incomplete && <Alert className={classes.alert} severity="error">Please select at least one sport</Alert>}
        </Grid>
            <Typography variant="h6" gutterBottom>
                Select the sports to be played
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="teamSports">Team</InputLabel>
                        <Select
                            labelId="teamSports-mutiple-chip-label"
                            id="teamSports-mutiple-chip"
                            multiple
                            value={teamSport}
                            onChange={handleTeamChange}
                            input={<Input id="select-team-multiple-chip" />}
                            renderValue={(selected) => (
                                    <div className={classes.chips}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} className={classes.chip} />
                                        ))}
                                    </div>
                                )}
                            MenuProps={MenuProps}>

                            {sportsList.teamSports.map((name) => (
                                <MenuItem key={name} value={name} style={getStyles(name, teamSport, theme)}>
                                    {name}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="indivSports">Individual</InputLabel>
                        <Select
                            labelId="indivSports-mutiple-chip-label"
                            id="indivSports-mutiple-chip"
                            multiple
                            value={indivSport}
                            onChange={handleIndivChange}
                            input={<Input id="select-indiv-multiple-chip" />}
                            renderValue={(selected) => (
                                    <div className={classes.chips}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} className={classes.chip} />
                                        ))}
                                    </div>
                                )}
                            MenuProps={MenuProps}>

                            {sportsList.indivSports.map((name) => (
                                <MenuItem key={name} value={name} style={getStyles(name, indivSport, theme)}>
                                    {name}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>          
                </Grid>
                
                <div className={classes.buttons}>
                    <Button onClick={onhSubmit} className={classes.button}>
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onSubmit}
                        className={classes.button}>
                        Next
                    </Button>
                </div>
            </Grid>
        </React.Fragment>
    );
}

export default SportData