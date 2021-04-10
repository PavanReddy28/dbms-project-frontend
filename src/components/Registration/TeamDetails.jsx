import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { TextField, IconButton, Typography, Grid, Button } from '@material-ui/core';
import {Alert} from "@material-ui/lab";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
    textFields : {
        margin: theme.spacing(2)
    },
    text : {
        marginRight : theme.spacing(5)
    },
    add : {
        marginRight : theme.spacing(3)
    },
    formControl: {
        margin: theme.spacing(2),
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


const TeamDetails = ({ playerData, TeamNum, onAdd, handleNext, handleBack }) => {

    const classes = useStyles();

    const [players, setPlayers] = React.useState(playerData.length!==0? playerData: [{fname:'', lname:'', age:''}]);
    const [incomplete,setIncomplete] = React.useState(false);

    const onSubmit = (e) => {  
        //console.log(players.length, parseInt(TeamNum.num_players), players.length===parseInt(TeamNum.num_players))
        if(players.length!==parseInt(TeamNum.num_players)-1)
        {
            setIncomplete(true);
            return 
        }
        onAdd(players);
        handleNext();
      };

      const onhSubmit = (e) => {
        onAdd(players);
        handleBack(0);
      };    

    const handleChange = (index, e) => {
        const values = [...players];
        values[index][e.target.name] = e.target.value;
        setPlayers(values);
    }

    const onHandleAdd = () => {
        setPlayers([...players, {fname:'', lname:'', age:''}]);
    }

    const onHandleRemove = (index) => {
        const values = [...players];
        values.splice(index, 1);
        if(values.length===0)
        {
            setPlayers([{fname:'', lname:'', age:''}]);
        }
        else
        {
            setPlayers(values);
        }
        
    }
    
    return (
        <React.Fragment>
        <Grid item xs={12} lg={12}>
            {incomplete && <Alert className={classes.alert} severity="error">Please fill all {TeamNum.num_players} Team Member details.</Alert>}
        </Grid>
            <Typography variant="h6" gutterBottom>
                Add Team Members
            </Typography>
            <Grid container spacing={3}>
                <form className={classes.formControl}>
                {
                    players.map((player, index) => {
                        return (
                        <div key={index} className={classes.textFields}>
                            
                            <Typography variant="h6" gutterBottom className={classes.title}>
                            Player {index+1}
                            </Typography>
                            
                            <TextField
                                required={true}
                                id="fname"
                                name="fname"
                                label="First Name"
                                onChange={e => handleChange(index, e)}
                                value={player.fname}
                                className={classes.text}
                            />
                            <TextField
                                required={true}
                                id="lname"
                                name="lname"
                                label="Last Name"
                                onChange={(e) => handleChange(index, e)}
                                value={player.lname}
                                
                            />
                            <TextField 
                            required={true}
                            id="age" 
                            name="age" 
                            label="Age" 
                            onChange={e => handleChange(index, e)}
                            value={player.age}
                            className={classes.add}
                            />
                            <IconButton onClick = {() => onHandleRemove(index)}>
                                <RemoveIcon />
                            </IconButton>
                            <IconButton onClick = {() => onHandleAdd()}>
                                <AddIcon />
                            </IconButton>
                        </div>
                        )
                    })
                }     
                </form>           
                <div className={classes.buttons}>
                    <Button 
                        onClick={onhSubmit} 
                        className={classes.button}>
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

export default TeamDetails