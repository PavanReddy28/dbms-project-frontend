import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Input, InputLabel, MenuItem, FormControl, FormControlLabel, Select, Typography, Grid, Checkbox, Chip } from '@material-ui/core'

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

const sports = {
    teamSports: [
        'Basketball',
        'Football',
        'Soccer',
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

const SportData = () => {

    const classes = useStyles();
    const theme = useTheme();
    const [teamSport, setTeamSport] = React.useState([]);
    const [indivSport, setIndivSport] = React.useState([]);
  
    const handleTeamChange = (event) => {
        setTeamSport(event.target.value);
    };

    const handleIndivChange = (event) => {
        setIndivSport(event.target.value);
    };
    
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Sports Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="teamSports">Team Sports</InputLabel>
                        <Select
                            labelId="teamSports-mutiple-chip-label"
                            id="teamSports-mutiple-chip"
                            multiple
                            value={teamSport}
                            onChange={handleTeamChange}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                    <div className={classes.chips}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} className={classes.chip} />
                                        ))}
                                    </div>
                                )}
                            MenuProps={MenuProps}>

                            {sports.teamSports.map((name) => (
                                <MenuItem key={name} value={name} style={getStyles(name, teamSport, theme)}>
                                    {name}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="indivSports">Team Sports</InputLabel>
                        <Select
                            labelId="indivSports-mutiple-chip-label"
                            id="indivSports-mutiple-chip"
                            multiple
                            value={indivSport}
                            onChange={handleIndivChange}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                    <div className={classes.chips}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} className={classes.chip} />
                                        ))}
                                    </div>
                                )}
                            MenuProps={MenuProps}>

                            {sports.indivSports.map((name) => (
                                <MenuItem key={name} value={name} style={getStyles(name, indivSport, theme)}>
                                    {name}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>          
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="primary" name="saveSports" value="yes" />}
                        label="Remember Sport details for next time"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default SportData