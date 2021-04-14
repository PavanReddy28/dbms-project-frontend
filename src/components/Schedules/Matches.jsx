import React, { useState, useEffect } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    makeStyles,
    Divider,
    Grid,
    TextField,
    Select,
    MenuItem,
    Typography
} from '@material-ui/core';
import { Alert } from "@material-ui/lab";

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

const Matches = ({ type, data, setData, editOpen, sport, onCloseCancel, onClose }) => {

    const classes = useStyles()
    const [result, setResult] = useState(data.data ? data.data : {})
    const [teamName, setTeamName] = useState(() => {
        if (data.data !== null && data.data) {
            console.log(data.data.winner_id === data.m.team1.team_id ? data.m.team1.teamName : data.m.team2.teamName)
            return data.data.winner_id === data.m.team1.team_id ? data.m.team1.teamName : data.m.team2.teamName
        }
    })
    const [cScores1, setCScores1] = useState({})
    const [cScores2, setCScores2] = useState({})
    const [nScores1, setNScores1] = useState([])
    const [nScores2, setNScores2] = useState([])
    const [nScores3, setNScores3] = useState([])
    const [incomplete, setIncomplete] = useState(false)

    useEffect(() => {
        if (data.data !== null && data.data) {
            console.log(data.data.winner_id === data.m.team1.team_id ? data.m.team1.teamName : data.m.team2.teamName)
            setTeamName(data.data.winner_id === data.m.team1.team_id ? data.m.team1.teamName : data.m.team2.teamName)
            if (sport === 'Cricket') {
                setResult(data.data)
            }
            else if (sport === 'Tennis' || sport === 'Badminton' || sport === 'Table Tennis') {
                setResult(data.data)
                console.log(result)
            }
            else if (sport === 'Football' || sport === 'Basketball' || sport === 'Hockey') {
                setResult(data.data)
            }
        }

    }, [data, sport, result])

    const chooseDisplay = () => {
        console.log(data)
        //console.log('Enter', sport, type)
        if (type === 'edit') {
            if (data.data) {
                if (data.data.sportName === sport && result) {
                    //setResult(data.data)
                    //setTeamName(data.data.winner_id===data.m.team1.team_id?data.m.team1.teamName:data.m.team2.teamName)
                    if (sport === 'Cricket') {
                        return (
                            <React.Fragment>
                                <Grid>
                                    <Typography variant="h5" gutterBottom>
                                        Winner
                            </Typography>
                                </Grid>
                                <Select
                                    required={true}
                                    id="sport1"
                                    name="sport1"
                                    label="Team Sport"
                                    value={teamName}
                                    onChange={(e) => {
                                        setTeamName(e.target.value)
                                        setResult(previous => {
                                            return {
                                                ...previous,
                                                winner_id: data.m.team1.teamName === e.target.value ?
                                                    data.m.team1.team_id : data.m.team2.team_id
                                            }
                                        })
                                    }}
                                >
                                    <MenuItem value={data.m.team1.teamName}>
                                        {data.m.team1.teamName}
                                    </MenuItem>
                                    <MenuItem value={data.m.team2.teamName}>
                                        {data.m.team2.teamName}
                                    </MenuItem>
                                </Select>
                                <Grid>
                                    <Typography variant="h5" gutterBottom>
                                        Match Data
                            </Typography>
                                </Grid>
                                <Grid>
                                    <Typography variant="h6" gutterBottom>
                                        {data.m.team1.teamName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required={true}
                                        id="t1"
                                        name="t1"
                                        label='Runs'
                                        value={result.t1Innings ? result.t1Innings.runs : ''}
                                        onChange={(e) => setResult(previous => {
                                            const val = { ...previous }
                                            return {
                                                ...previous,
                                                't1Innings': { 'runs': e.target.value, 'wickets': val.t1Innings.wickets }
                                            }
                                        })}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required={true}
                                        id="t11"
                                        name="t11"
                                        label='Wickets'
                                        type='Number'
                                        value={result.t1Innings ? result.t1Innings.wickets : ''}
                                        onChange={(e) => setResult(previous => {
                                            const val = { ...previous }
                                            return {
                                                ...previous,
                                                't1Innings': { 'wickets': e.target.value, 'runs': val.t1Innings.runs }
                                            }
                                        })}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid>
                                    <Typography variant="h6" gutterBottom>
                                        {data.m.team2.teamName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required={true}
                                        id="t2"
                                        name="t2"
                                        label="Runs"
                                        value={result.t2Innings ? result.t2Innings.runs : ''}
                                        onChange={(e) => setResult(previous => {
                                            const val = { ...previous }
                                            return {
                                                ...previous,
                                                't2Innings': { 'runs': e.target.value, 'wickets': val.t2Innings.wickets }
                                            }
                                        })}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required={true}
                                        id="t21"
                                        name="t21"
                                        label="Wickets"
                                        value={result.t2Innings ? result.t2Innings.wickets : ''}
                                        onChange={(e) => setResult(previous => {
                                            const val = { ...previous }
                                            return {
                                                ...previous,
                                                't2Innings': { 'wickets': e.target.value, 'runs': val.t2Innings.runs }
                                            }
                                        })}
                                        fullWidth
                                    />
                                </Grid>
                            </React.Fragment>
                        )
                    }
                    else if (sport === 'Football' || sport === 'Basketball' || sport === 'Hockey') {
                        console.log(data.data.winner_id === data.m.team1.team_id ? data.m.team1.teamName : data.m.team2.teamName)
                        console.log('TEAM', teamName, data)
                        console.log(result)
                        //setIncomplete(false)
                        return (
                            <React.Fragment>
                                <Grid>
                                    <Typography variant="h5" gutterBottom>
                                        Winner
                            </Typography>
                                </Grid>
                                <Select
                                    required={true}
                                    id="sport1"
                                    name="sport1"
                                    label="Team Sport"
                                    value={teamName}
                                    onChange={(e) => {
                                        setTeamName(e.target.value)
                                        setResult(previous => {
                                            return {
                                                ...previous,
                                                winner_id: data.m.team1.teamName === e.target.value ?
                                                    data.m.team1.team_id : data.m.team2.team_id
                                            }
                                        })
                                    }}
                                >
                                    <MenuItem value={data.m.team1.teamName}>
                                        {data.m.team1.teamName}
                                    </MenuItem>
                                    <MenuItem value={data.m.team2.teamName} >
                                        {data.m.team2.teamName}
                                    </MenuItem>
                                </Select>
                                <Grid>
                                    <Typography variant="h5" gutterBottom>
                                        Scores
                            </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required={true}
                                        id="t1"
                                        name="t1"
                                        type='Number'
                                        value={result ? result.t1score : ''}
                                        label={data.m.team1.teamName}
                                        onChange={(e) => setResult(previous => {
                                            return {
                                                ...previous,
                                                't1score': e.target.value
                                            }
                                        })}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required={true}
                                        id="t2"
                                        name="t2"
                                        value={result ? result.t2score : ''}
                                        label={data.m.team2.teamName}
                                        onChange={(e) => setResult(previous => {
                                            return {
                                                ...previous,
                                                't2score': e.target.value
                                            }
                                        })}
                                        fullWidth
                                    />
                                </Grid>
                            </React.Fragment>
                        )
                    }
                    else if (sport === 'Tennis' || sport === 'Badminton' || sport === 'Table Tennis') {
                        console.log(data.data.winner_id === data.m.team1.team_id ? data.m.team1.teamName : data.m.team2.teamName)
                        return (<React.Fragment>
                            <Grid>
                                <Typography variant="h5" gutterBottom>
                                    Winner
                            </Typography>
                            </Grid>
                            <Select
                                required={true}
                                id="sport1"
                                name="sport1"
                                label="Team Sport"
                                value={teamName}
                                onChange={(e) => {
                                    setTeamName(e.target.value)
                                    setResult(previous => {
                                        return {
                                            ...previous,
                                            winner_id: data.m.team1.teamName === e.target.value ?
                                                data.m.team1.team_id : data.m.team2.team_id
                                        }
                                    })
                                }}
                            >
                                <MenuItem value={data.m.team1.teamName}>
                                    {data.m.team1.teamName}
                                </MenuItem>
                                <MenuItem value={data.m.team2.teamName} >
                                    {data.m.team2.teamName}
                                </MenuItem>
                            </Select>
                            <Grid>
                                <Typography variant="h5" gutterBottom>
                                    Scores
                            </Typography>
                            </Grid>
                            <Grid>
                                <Typography variant="h6" gutterBottom>
                                    Set 1
                            </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required={true}
                                    id="t1"
                                    name="set1.team"
                                    label={data.m.team1.teamName}
                                    value={result.set1 ? result.set1.team1 : ''}
                                    onChange={(e) => setResult(previous => {
                                        const val = { ...previous }
                                        console.log(val, 'val')
                                        return { ...previous, 'set1': { 'team1': e.target.value, 'team2': val.set1.team2 } }
                                    })}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required={true}
                                    id="t2"
                                    name="t2"
                                    label={data.m.team2.teamName}
                                    value={result.set1 ? result.set1.team2 : ''}
                                    onChange={(e) => setResult(previous => {
                                        const val = { ...previous }
                                        console.log(val, 'val')
                                        return { ...previous, 'set1': { 'team2': e.target.value, 'team1': val.set1.team1 } }
                                    })}
                                    fullWidth
                                />
                            </Grid>
                            <Grid>
                                <Typography variant="h6" gutterBottom>
                                    Set 2
                            </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required={true}
                                    id="t11"
                                    name="t11"
                                    label={data.m.team1.teamName}
                                    value={result.set2 ? result.set2.team1 : ''}
                                    onChange={(e) => setResult(previous => {
                                        const val = { ...previous }
                                        console.log(val, 'val')
                                        return { ...previous, 'set2': { 'team1': e.target.value, 'team2': val.set2.team2 } }
                                    })}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required={true}
                                    id="t21"
                                    name="t21"
                                    label={data.m.team2.teamName}
                                    value={result.set2 ? result.set2.team2 : ''}
                                    onChange={(e) => setResult(previous => {
                                        const val = { ...previous }
                                        console.log(val, 'val')
                                        return { ...previous, 'set2': { 'team2': e.target.value, 'team1': val.set2.team1 } }
                                    })}
                                    fullWidth
                                />
                            </Grid>
                            <Grid>
                                <Typography variant="h6" gutterBottom>
                                    Set 3
                            </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="t13"
                                    name="t13"
                                    label={data.m.team1.teamName}
                                    value={result.set3 ? result.set3.team1 : ''}
                                    onChange={(e) => setResult(previous => {
                                        const val = { ...previous }
                                        console.log(val, 'val')
                                        return { ...previous, 'set3': { 'team1': e.target.value, 'team2': val.set3.team2 } }
                                    })}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="t23"
                                    name="t23"
                                    label={data.m.team2.teamName}
                                    value={result.set3 ? result.set3.team2 : ''}
                                    onChange={(e) => setResult(previous => {
                                        const val = { ...previous }
                                        console.log(val, 'val')
                                        return { ...previous, 'set3': { 'team2': e.target.value, 'team1': val.set3.team1 } }
                                    })}
                                    fullWidth
                                />
                            </Grid>
                        </React.Fragment>)
                    }
                }
            }
        }
        else {
            console.log('Enter', sport, type)
            if (sport === 'Cricket') {
                return (
                    <React.Fragment>
                        <Grid>
                            <Typography variant="h5" gutterBottom>
                                Winner
                            </Typography>
                        </Grid>
                        <Select
                            required={true}
                            id="sport1"
                            name="sport1"
                            label="Team Sport"
                            defaultValue=''
                            value={teamName}
                            onChange={(e) => {
                                setTeamName(e.target.value)
                                setResult(previous => {
                                    return {
                                        ...previous,
                                        winner_id: data.m.team1.teamName === e.target.value ?
                                            data.m.team1.team_id : data.m.team2.team_id
                                    }
                                })
                            }}
                        >
                            <MenuItem value={data.m.team1.teamName}>
                                {data.m.team1.teamName}
                            </MenuItem>
                            <MenuItem value={data.m.team2.teamName}>
                                {data.m.team2.teamName}
                            </MenuItem>
                        </Select>
                        <Grid>
                            <Typography variant="h5" gutterBottom>
                                Mathc Data
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography variant="h6" gutterBottom>
                                {data.m.team1.teamName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required={true}
                                id="t1"
                                name="t1"
                                label='Runs'
                                onChange={(e) => setCScores1(previous => {
                                    return {
                                        ...previous,
                                        'runs': e.target.value
                                    }
                                })}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required={true}
                                id="t11"
                                name="t11"
                                label='Wickets'
                                onChange={(e) => setCScores1(previous => {
                                    return {
                                        ...previous,
                                        'wickets': e.target.value
                                    }
                                })}
                                fullWidth
                            />
                        </Grid>
                        <Grid>
                            <Typography variant="h6" gutterBottom>
                                {data.m.team2.teamName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required={true}
                                id="t2"
                                name="t2"
                                label="Runs"
                                onChange={(e) => setCScores2(previous => {
                                    return {
                                        ...previous,
                                        'runs': e.target.value
                                    }
                                })}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required={true}
                                id="t21"
                                name="t21"
                                label="Wickets"
                                onChange={(e) => setCScores2(previous => {
                                    return {
                                        ...previous,
                                        'wickets': e.target.value
                                    }
                                })}
                                fullWidth
                            />
                        </Grid>
                    </React.Fragment>
                )
            }
            else if (sport === 'Football' || sport === 'Basketball' || sport === 'Hockey') {
                console.log('TEAM')
                return (
                    <React.Fragment>
                        <Grid>
                            <Typography variant="h5" gutterBottom>
                                Winner
                            </Typography>
                        </Grid>
                        <Select
                            required={true}
                            id="sport1"
                            name="sport1"
                            label="Team Sport"
                            defaultValue=''
                            value={teamName}
                            onChange={(e) => {
                                setTeamName(e.target.value)
                                setResult(previous => {
                                    return {
                                        ...previous,
                                        winner_id: data.m.team1.teamName === e.target.value ?
                                            data.m.team1.team_id : data.m.team2.team_id
                                    }
                                })
                            }}
                        >
                            <MenuItem value={data.m.team1.teamName}>
                                {data.m.team1.teamName}
                            </MenuItem>
                            <MenuItem value={data.m.team2.teamName} >
                                {data.m.team2.teamName}
                            </MenuItem>
                        </Select>
                        <Grid>
                            <Typography variant="h5" gutterBottom>
                                Scores
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required={true}
                                id="t1"
                                name="t1"
                                label={data.m.team1.teamName}
                                onChange={(e) => setResult(previous => {
                                    return {
                                        ...previous,
                                        't1Score': e.target.value
                                    }
                                })}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required={true}
                                id="t2"
                                name="t2"
                                label={data.m.team2.teamName}
                                onChange={(e) => setResult(previous => {
                                    return {
                                        ...previous,
                                        't2Score': e.target.value
                                    }
                                })}
                                fullWidth
                            />
                        </Grid>
                    </React.Fragment>
                )
            }
            else if (sport === 'Tennis' || sport === 'Badminton' || sport === 'Table Tennis') {
                return (<React.Fragment>
                    <Grid>
                        <Typography variant="h5" gutterBottom>
                            Winner
                            </Typography>
                    </Grid>
                    <Select
                        required={true}
                        id="sport1"
                        name="sport1"
                        label="Team Sport"
                        defaultValue=''
                        value={teamName}
                        onChange={(e) => {
                            setTeamName(e.target.value)
                            setResult(previous => {
                                return {
                                    ...previous,
                                    winner_id: data.m.team1.teamName === e.target.value ?
                                        data.m.team1.team_id : data.m.team2.team_id
                                }
                            })
                        }}
                    >
                        <MenuItem value={data.m.team1.teamName}>
                            {data.m.team1.teamName}
                        </MenuItem>
                        <MenuItem value={data.m.team2.teamName} >
                            {data.m.team2.teamName}
                        </MenuItem>
                    </Select>
                    <Grid>
                        <Typography variant="h5" gutterBottom>
                            Scores
                            </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="h6" gutterBottom>
                            Set 1
                            </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required={true}
                            id="t1"
                            name="t1"
                            label={data.m.team1.teamName}
                            onChange={(e) => setNScores1(previous => {
                                return { ...previous, 'team1': e.target.value }
                            })}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required={true}
                            id="t2"
                            name="t2"
                            label={data.m.team2.teamName}
                            onChange={(e) => setNScores1(previous => {
                                return { ...previous, 'team2': e.target.value }
                            })}
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <Typography variant="h6" gutterBottom>
                            Set 2
                            </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required={true}
                            id="t11"
                            name="t11"
                            label={data.m.team1.teamName}
                            onChange={(e) => setNScores2(previous => {
                                return { ...previous, 'team1': e.target.value }
                            })}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required={true}
                            id="t21"
                            name="t21"
                            label={data.m.team2.teamName}
                            onChange={(e) => setNScores2(previous => {
                                return { ...previous, 'team2': e.target.value }
                            })}
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <Typography variant="h6" gutterBottom>
                            Set 3
                            </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="t13"
                            name="t13"
                            label={data.m.team1.teamName}
                            onChange={(e) => setNScores3(previous => {
                                return { ...previous, 'team1': e.target.value }
                            })}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="t23"
                            name="t23"
                            label={data.m.team2.teamName}
                            onChange={(e) => setNScores3(previous => {
                                return { ...previous, 'team2': e.target.value }
                            })}
                            fullWidth
                        />
                    </Grid>
                </React.Fragment>)
            }
        }
    }

    return (
        <Dialog
            open={editOpen}
            onClose={() => onClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{`${type === 'add' ? 'Add' : 'Edit'} Match`}</DialogTitle>
            <Divider />
            <Grid item xs={12} lg={12}>
                {incomplete && <Alert className={classes.alert} severity="error">Please fill all fields.</Alert>}
            </Grid>
            <Divider />
            <DialogContent>
                {chooseDisplay()}
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={() => {
                    setIncomplete(false)
                    onCloseCancel()
                }}
                    color="primary" autoFocus>
                    Cancel
                </Button>
                <Button onClick={() => {
                    if (type === 'add') {
                        if (sport === 'Tennis' || sport === 'Badminton' || sport === 'Table Tennis') {
                            if (!result || !nScores1 || !nScores2 || !nScores3) {
                                setIncomplete(true)
                                return
                            }
                            setIncomplete(false)
                            onClose(result, sport, type, { 'set1': nScores1, 'set2': nScores2, 'set3': nScores3 })
                        }
                        else if (sport === 'Cricket') {
                            if (!result || !cScores1 || !cScores2) {
                                setIncomplete(true)
                                return
                            }
                            setIncomplete(false)
                            onClose(result, sport, type, { 't1Innings': cScores1, 't2Innings': cScores2 })
                        }
                        else {
                            if (!result.winner_id || !result.t1Score || !result.t2Score) {
                                setIncomplete(true)
                                return
                            }
                            setIncomplete(false)
                            onClose(result, sport, type, {})
                        }
                    }
                    else {
                        if (sport === 'Tennis' || sport === 'Badminton' || sport === 'Table Tennis') {
                            if (!result.winner_id || !result.set1 || !result.set2) {
                                setIncomplete(true)
                                return
                            }
                            setIncomplete(false)
                            onClose(result, sport, type, { 'set1': nScores1, 'set2': nScores2, 'set3': nScores3 })
                        }
                        else if (sport === 'Cricket') {
                            if (!result.winner_id || !result.t1Innings || !result.t2Innings) {
                                setIncomplete(true)
                                return
                            }
                            setIncomplete(false)
                            onClose(result, sport, type, { 't1Innings': cScores1, 't2Innings': cScores2 })
                        }
                        else {
                            if (!result.winner_id || !result.t1score || !result.t2score) {
                                setIncomplete(true)
                                return
                            }
                            setIncomplete(false)
                            onClose(result, sport, type, {})
                        }
                    }
                }}
                    color="primary" autoFocus>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Matches
