import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';

const GameAnnouncer = ({ socket }) => {
    console.log('GA socket is: ', socket);

    // Grab state from redux store
    const username = useSelector(state => state.user.user.user.name);
    console.log('Redux data is: ', username);

    // Init state
    const [battleParams, setBattleParams] = useState({
        start: false,
        text: 'Round 1'
    });
    const [battleTimer, setBattleTimer] = useState({
        started: false,
        count: 0
    });

    useEffect(() => {

    },[]);

    if (socket.current){
        socket.current.on('startBattle', (result) => {
            console.log('Received event to start battle');
            // Update the counter
            setBattleTimer({
                started: true,
                count: result.result
            });
            if (result.result){
                startTimer()
            }
        });
    }


    // Event: Start Battle
    // Event Request: Start battle
    const startBattle = (e) => {
        e.preventDefault();
        console.log('Starting battle');
        socket.current.emit('startBattle');
    };
    // Timer
    const startTimer = () => {
        let counter = 30;
        const timer = document.getElementById('timer');
        const startBattleRap = setInterval(() => {
            timer.innerHTML = counter;
            counter--;
            if(counter <= 4){
                timer.style.color = 'red'
            }
            if(counter < 0){
                clearInterval(startBattleRap);
                socket.current.emit('startVote');
            }
        }, 1000)
    };

    return(
        <>
            <div className="battle-button">
                <button id="timer" onClick={startBattle}>30</button>
            </div>
            <div className="announcer-overlay">
                <div className="announcer">{battleParams.text}</div>
            </div>
        </>
    )
};

export default GameAnnouncer;