import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { TextField, InputLabel, FormControl, Typography, Grid, Button } from '@material-ui/core';
import {Alert} from "@material-ui/lab";

/*
createUI(){
     return this.state.values.map((el, i) => 
         <div key={i}>
    	    <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} />
    	    <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
         </div>          
     )
  }

  handleChange(i, event) {
     let values = [...this.state.values];
     values[i] = event.target.value;
     this.setState({ values });
  }
  
  addClick(){
    this.setState(prevState => ({ values: [...prevState.values, '']}))
  }
  
  removeClick(i){
     let values = [...this.state.values];
     values.splice(i,1);
     this.setState({ values });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.values.join(', '));
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          {this.createUI()}        
          <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
          <input type="submit" value="Submit" />
      </form>
    );
  }
*/

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

function getStyles(name, sport, theme) {
    return {
        fontWeight:
        sport.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}


const TeamDetails = ({ playerData, TeamNum, onAdd, handleNext, handleBack }) => {

    const classes = useStyles();
    const theme = useTheme();

    const [players, setPlayers] = React.useState(playerData.players? playerData.players : []);
    const [incomplete,setIncomplete] = React.useState(false);
  
    // const handlePlayerchange = (event) => {
    //     setTeam( previous => {
    //         return [{
    //             ...previous,
    //             [e.target.name]: e.target.value
    //         }]
    //         })
    // };

    const onSubmit = (e) => {    
        if(players.length===0)
        {
            setIncomplete(true);
            return 
        }
        onAdd({players});
        handleNext();
      };

      const onhSubmit = (e) => {
        onAdd({players});
        handleBack();
      };

      const playerRender = (i) => {

        const ind = parseInt(i);

        return (
            <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="player">Player {i}</InputLabel>
                    <Grid item xs={5}>
                    <TextField
                        required={true}
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        onChange={(e) => {  
                            setPlayers(e.target.value)
                        }}
                        value={players[ind].firstName?players[ind].firstName:""}
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={5}>
                    <TextField
                        required={true}
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        onChange={(e) => {  
                            setPlayers(e.target.value)
                        }}
                        value={players[ind].lastName?players[ind].lastName:""}
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={2} align='center'>
                    <TextField 
                    required={true}
                    id="age" 
                    name="age" 
                    label="Age" 
                    onChange={(e) => {  
                        setPlayers(e.target.value)
                    }}
                    value={players[ind].age?players[ind].age:""}
                    fullWidth 
                    />
                    </Grid>
                </FormControl>
            </Grid>
        )       
    }
    
    
    return (
        <React.Fragment>
        <Grid item xs={12} lg={12}>
            {incomplete && <Alert className={classes.alert} severity="error">Please fill all player details.</Alert>}
        </Grid>
            <Typography variant="h6" gutterBottom>
                Add Team Members
            </Typography>
            <Grid container spacing={3}>
                {()=>{
                    const ind=parseInt(TeamNum);
                    while(ind>0)
                    {
                        playerRender(ind)
                    }
                }
                }                
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

export default TeamDetails