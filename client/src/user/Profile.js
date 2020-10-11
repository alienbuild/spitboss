import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from "react-router-dom";

// Methods
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./apiUser";

// Material imports
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const Profile = ({match}) => {

    // Styles/Theme
    const useStyles = makeStyles((theme) => ({
        instructions: {
            width: '100%',
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        mainEl: {
            display: 'flex',
            height: '100vh',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        logo: {
            height: theme.spacing(24),
            marginBottom: theme.spacing(2)
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        buttonGroups: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        formControl: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            width: '100%'
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const classes = useStyles();

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    // Init state
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        type: '',
        acceptBattlesFrom: 'everyone',
        acceptCyphersFrom: 'everyone',
        // TODO: Add more as necessary
        error: false,
        success: false
    });

    const {token} = isAuthenticated();

    const { name, email, password, type, acceptBattlesFrom, acceptCyphersFrom, error, success } = values;

    const init = (userId) => {
        read(userId, token)
            .then(data => {
                if (data.error){
                    setValues({...values, error: true})
                } else {
                    setValues({...values, name: data.name, email: data.email})
                }
            })
    };

    // Handle form changes
    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value })
    };

    const handleSwitch = name => e => {
        setValues({ ...values, error: false, [name]: e.target.checked })
    }

    // Handle submit
    const clickSubmit = (e) => {
        e.preventDefault();
        update(match.params.userId, token, {name, email, password})
            .then(data => {
                if(data.error){
                    console.log(data.error);
                } else {
                    updateUser(data, () => {
                        setValues({...values, name: data.name, email: data.email, success: true})
                    })
                }
            })
    };

    // Redirect
    const redirectUser = (success) => {
        if(success){
            return <Redirect to={'/'} />
        }
    };

    // Basics
    const profileUpdateBasics = ( name, email, password ) => (
        <>
            <FormControl variant="outlined" required className={classes.formControl}>
                <TextField
                    margin="normal"
                    variant={"outlined"}
                    label="Stage name / Alias"
                    fullWidth
                    onChange={handleChange('name')}
                    value={name || ""}
                    required
                    autoFocus
                    style={{ marginBottom: '0' }}
                />
                <FormHelperText>What should we call you on this site?</FormHelperText>
            </FormControl>

            <FormControl variant="outlined" required className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Profession</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={type ||"" }
                    onChange={handleChange('type')}
                    label="Account Type"
                    style={{ color: '#FFFFFF'}}
                >
                    <MenuItem value={'guest'}>Guest</MenuItem>
                    <MenuItem value={'mc'}>MC</MenuItem>
                    <MenuItem value={'dj'}>DJ</MenuItem>
                    <MenuItem value={'manager'}>Manager</MenuItem>
                </Select>
                <FormHelperText>We need to know who we're dealing with.</FormHelperText>
            </FormControl>
        </>
    );

    // Settings
    const profileUpdateSettings = () => {
      return(
          <>
              {type === 'mc' ? (
                  <>
                      <FormControl variant="outlined" required className={classes.formControl}>
                          <InputLabel id="accept-battles-from">Who can send you rap battle requests?</InputLabel>
                          <Select
                              labelId="accept-battles-from"
                              id="accept-battles-from"
                              value={acceptBattlesFrom}
                              onChange={handleChange('acceptBattlesFrom')}
                              label="Who can send you rap battle requests?"
                              style={{ color: '#FFFFFF'}}
                          >
                              <MenuItem value={'disable'}>Disable</MenuItem>
                              <MenuItem value={'spitbosses'}>Vetted Spitboss rappers</MenuItem>
                              <MenuItem value={'everyone'}>Everyone</MenuItem>
                          </Select>
                          <FormHelperText>You control who can send you battle rap requests.</FormHelperText>
                      </FormControl>

                      <FormControl variant="outlined" required className={classes.formControl}>
                          <InputLabel id="accept-cyphers-from">Who can send you cypher requests?</InputLabel>
                          <Select
                              labelId="accept-cyphers-from"
                              id="accept-cyphers-from"
                              value={acceptCyphersFrom}
                              onChange={handleChange('acceptCyphersFrom')}
                              label="Who can send you cypher requests?"
                              style={{ color: '#FFFFFF'}}
                          >
                              <MenuItem value={'disable'}>Disable</MenuItem>
                              <MenuItem value={'spitbosses'}>Vetted Spitboss rappers</MenuItem>
                              <MenuItem value={'everyone'}>Everyone</MenuItem>
                          </Select>
                          <FormHelperText>You control who can send you cypher event requests.</FormHelperText>
                      </FormControl>
                  </>
              ) : null}
          </>
      )
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    function getSteps() {
        return ['Account Basics', 'Settings', 'Branding'];
    }

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    profileUpdateBasics(name, email, password)
                );
            case 1:
                return profileUpdateSettings();
            case 2:
                return 'What is an ad group anyways?';
            default:
                return 'Unknown stepIndex';
        }
    }

    return(
        <Container component="main" maxWidth="xs">
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <main className={classes.mainEl}>
                    <Stepper activeStep={activeStep} alternativeLabel className={classes.instructions}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <div style={{ width: '100%'}}>
                            <Typography className={classes.instructions}>All steps completed</Typography>
                            <Button onClick={handleReset}>Reset</Button>
                        </div>
                    ) : (
                        <>
                            {getStepContent(activeStep)}
                            <Grid container>
                                <Grid item xs>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.backButton}
                                    >
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </>
                    )}
                    {redirectUser(success)}
                </main>

            </Grid>
        </Container>
    )

};

export default Profile;