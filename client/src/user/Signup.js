import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';

// Spitboss Logo
import SpitbossLogo from '../assets/images/spitboss.svg';

// Methods
import {getUser} from "../actions/userActions";
import {useDispatch} from "react-redux";
import {authenticate, signin, signup} from "../auth";

// Sub components
import Facebook from "../auth/Facebook";
import Google from "../auth/Google";

// Material imports
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Twitter from "../auth/Twitter";


const Signup = () => {

    // Styles/Theme
    const useStyles = makeStyles((theme) => ({
        mainEl: {
            display: 'flex',
            height: '100vh',
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
            width: '100%'
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const classes = useStyles();

    // Ready dispatch
    const dispatch = useDispatch();

    // Init state
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        success: false
    });
    const [userId, setUserId] = useState();

    // Handle form field changes
    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        });
    };

    // Inform Signin.js of social login responses
    const informParent = response => {
        // TODO: Destructure the response and match redux with current normal login saved state.
        //dispatch(getUser(response.profileObj.name));
        authenticate(response, () => {
            setValues({...values, redirectToReferrer: true})
        });
    }

    const {email, password, success, error} = values;

    // Handle form submit
    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: false});
        signup({email, password})
            .then(data => {
                if (data.error){
                    setValues({...values, error: data.error, success: false})
                } else {
                    signin({email, password})
                        .then(signinData => {
                            if (signinData.error){
                                setValues({...values, loading: false})
                            } else {
                                setUserId(signinData.user._id);
                                console.log('User id is:', userId);
                                dispatch(getUser(signinData));
                                authenticate(signinData, () => {
                                    setValues({...values, email: '', password: '', error: '', success: true})
                                });
                            }
                        })
                }
            })
    };

    // Signup form markup
    const signUpForm = () => (
        <form className={`signup__form`}>
            {/*<TextField*/}
            {/*    margin="normal"*/}
            {/*    variant={"outlined"}*/}
            {/*    label="Name"*/}
            {/*    fullWidth*/}
            {/*    onChange={handleChange('name')}*/}
            {/*    value={name}*/}
            {/*    required*/}
            {/*    autoFocus*/}
            {/*/>*/}
            <TextField
                margin="normal"
                variant={"outlined"}
                label="Email"
                type={`email`}
                fullWidth
                onChange={handleChange('email')}
                value={email}
                required
            />
            <TextField
                margin="normal"
                variant={"outlined"}
                label="Password"
                type={`password`}
                fullWidth
                onChange={handleChange('password')}
                value={password}
                required
                autoComplete="current-password"
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                className={classes.submit}
                onClick={(e) => clickSubmit(e)}>
                Sign up
            </Button>
        </form>
    );

    // Handle errors
    const showError = () => (
        <div className="alert alert-danger signup__alert" style={{display: error ? '' : 'none'}}>{error}</div>
    );

    // Handle redirect on successful login
    const redirectUser = () => {
        if (success){
            return <Redirect to={`/profile/complete/${userId}`} />;
        }
    };

    // Social Login
    const socialLogin = (informParent) => (
        <ButtonGroup className={classes.buttonGroups} aria-label="outlined primary button group">
            <Facebook informParent={informParent} />
            <Google informParent={informParent} />
            <Twitter />
        </ButtonGroup>
    );

    return(
        <Container component="main" maxWidth="xs">
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item>
                    <main className={classes.mainEl}>
                        {showError()}
                        <img src={SpitbossLogo} alt="Spitboss Logo" className={classes.logo}/>
                        <Typography
                            variant={`h4`}
                            color={`textPrimary`}
                            gutterBottom
                        >
                            Sign up
                        </Typography>
                        <Typography
                            variant={`subtitle1`}
                            color={`textSecondary`}
                            style={{
                                textAlign: 'center'
                            }}
                        >
                            Alright you're free to sign up, but you'll need to prove yourself to become a boss.
                        </Typography>

                        {signUpForm()}

                        <Grid container justify="flex-end" alignItems="flex-end">
                            <Grid item>
                                <Link href={`/signin`} variant="body2" color={`primary`}>
                                    {"Already have an account? Login"}
                                </Link>
                            </Grid>
                        </Grid>

                        <Divider variant="middle" style={{ margin: '20px auto', width:'100%' }}/>
                        {socialLogin(informParent)}
                        {redirectUser()}
                    </main>
                </Grid>
            </Grid>
        </Container>
    )
};

export default Signup;