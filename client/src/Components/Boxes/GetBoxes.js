import React, {useEffect, useState} from "react";
import { Redirect } from 'react-router'
import {getSpitboxRooms} from "../Spitbox/apiSpitbox";
import CreateBoxes from "./Create/CreateBoxes";
import Default from "../../layouts/default/Default";
import {useDispatch, useSelector} from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const GetBoxes = () => {

    const useStyles = makeStyles((theme) => ({
        Card: {
            display: 'flex',
            marginBottom: '20px'
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        heading3: {
            color: '#fff',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2)
        },
        content: {
            flex: '1 0 auto',
        },
        dateBox: {
            background: 'red',
            width: '151px',
            display: 'block'
        },
        cover: {
            width: 151,
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            marginTop: theme.spacing(3),
        },
    }));
    const classes = useStyles();

    // Ready dispatch
    const dispatch = useDispatch();

    // Grab state from redux store
    const activated = useSelector(state => state.user.user.user.activated);

    // Init state
    const [spitboxes, setSpitboxes] = useState([]);
    const [redirectUser, setRedirectUser] = useState(false);
    const [spitboxId, setSpitboxId] = useState();

    useEffect(() => {

        // Grab the list of spitboxes
        getSpitboxRooms()
            .then(res => {
                setSpitboxes(res);
            })
            .catch(err => console.log('Error: ', err));

    },[]);

    const handleJoin = (boxId) => {
        console.log('Handling join.');
        setSpitboxId(boxId);
        setRedirectUser(true);
    };

    return (
        <Default title={`Spitboxes`}>
            {redirectUser ? <Redirect
                to={{
                    pathname: `/spitbox/${spitboxId}`,
                    state: { referrer: 'something' }
                }}
            /> : null }
            {/*<Link to={`/spitbox/boxes/create`}>Create Spitbox</Link>*/}
            <h3 className={classes.heading3}>Upcoming events</h3>
            <Grid
                direction="row"
                container
                spacing={2}>
                    {spitboxes.map((box) => (
                        <Grid item>
                            <Card key={box._id} className={classes.Card}>
                                <div className={classes.dateBox}></div>
                                {box.coverImage ?  <CardMedia
                                    className={classes.cover}
                                    image="https://fakeimg.pl/500x100/"
                                    title={box.description}
                                /> : null}
                                <div className={classes.details}>
                                    <CardContent className={classes.content}>
                                        <Typography component="h5" variant="h5">
                                            {box.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            {box.description}
                                        </Typography>
                                        <div className={classes.controls}>
                                            <Button onClick={e => handleJoin(box._id)} size={"small"} variant="contained" color="primary">Join</Button>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        </Grid>
                    ))}
            </Grid>

            <CreateBoxes />
        </Default>
    )
}

export default GetBoxes;


{/*id: {box._id}*/}
{/*<br/>*/}
{/*name: {box.name}*/}
{/*<br/>*/}
{/*description: {box.description}*/}
{/*<br/>*/}
{/*participants: {box.participants}*/}
{/*<br/>*/}
{/*mode: {box.mode}*/}
{/*<br/>*/}
{/*<button onClick={e => handleJoin(box._id)}>Join</button>*/}