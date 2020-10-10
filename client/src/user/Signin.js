import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Spitboss Logo
import SpitbossLogo from '../assets/images/spitboss.svg';

// Layout and method imports
import { signin, authenticate, isAuthenticated } from "../auth";
import {removeAlert, setAlert} from "../actions/alert";

// Sub Components
import {getUser} from "../actions/userActions";
import Google from "../auth/Google";
import Facebook from "../auth/Facebook";
import Twitter from "../auth/Twitter";

// Material imports
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const Signin = () => {

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
        }
    }));
    const classes = useStyles();

    // Ready dispatch
    const dispatch = useDispatch();
    const alerts = useSelector(state => state.alerts);

    // Init state
    const [open, setOpen] = React.useState(true); // State for snackbox/alerts

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    // Handle form field changes
    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        });
    };

    const { email, password, error, loading, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    // Inform Signin.js of social login responses
    const informParent = response => {
        // TODO: Destructre the response and match redux with current normal login saved state.
        //dispatch(getUser(response.profileObj.name));
        authenticate(response, () => {
            setValues({...values, redirectToReferrer: true})
        });
    }

    // Handle form submit
    const clickSubmit = (e) => {
        e.preventDefault();
        dispatch(removeAlert(alert.id));
        setValues({...values, error: false, loading: true});
        signin({email, password})
            .then(data => {
                if (data.error){
                    dispatch(setAlert(data.error, 'danger'));
                    setValues({...values, loading: false})
                } else {
                    dispatch(getUser(data));
                    authenticate(data, () => {
                        setValues({...values, redirectToReferrer: true})
                    });
                }
            })
    };

    // Signin form markup
    const signUpForm = () => (
        <>
            <form className={`signin__form`}>
                <TextField
                    margin="normal"
                    variant={"outlined"}
                    label="Email"
                    fullWidth
                    onChange={handleChange('email')}
                    value={email}
                    required
                    autoFocus
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
                    Login
                </Button>
            </form>
            {showLoading()}
        </>
    );

    // Handle success
    const showLoading = () => (
        loading && (<div className="alert alert-info">Loading...</div>)
    );

    // Handle redirect on successful login
    const redirectUser = () => {
        if (isAuthenticated()){
            return <Redirect to="/spitbox" />;
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
                        {alerts !== null && alerts.length > 0 && alerts.map((alert) => (
                            <div key={alert.id}>
                                <Snackbar
                                    open={open}
                                >
                                    <Alert severity="error" variant="filled" >{alert.msg}</Alert>
                                </Snackbar>
                            </div>
                        ))}
                        <img src={SpitbossLogo} alt="Spitboss Logo" className={classes.logo}/>
                        <Typography
                            variant={`h4`}
                            color={`textPrimary`}
                            gutterBottom
                        >
                            Welcome to Spitboss
                        </Typography>
                        <Typography
                            variant={`subheading1`}
                            color={`textSecondary`}
                        >
                            Hold up, where's your credentials at?
                        </Typography>

                        {signUpForm()}

                        <Grid container>
                            <Grid item xs>
                                <Link href={"/auth/password/forgot"} variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href={`/signup`} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>

                        <Divider variant="middle" style={{ marginTop: '20px', background: 'none' }}/>
                        {socialLogin(informParent)}

                        {redirectUser()}
                    </main>
                </Grid>
            </Grid>
        </Container>
    )
};

export default Signin;