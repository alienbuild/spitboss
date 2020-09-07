import React, {useEffect} from "react";

const Timer = ({startBattle, time}) => {

    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = 10;
    const ALERT_THRESHOLD = 5;

    const COLOR_CODES = {
        info: {
            class: "info"
        },
        warning: {
            class: "warning",
            threshold: WARNING_THRESHOLD
        },
        alert: {
            class: "danger",
            threshold: ALERT_THRESHOLD
        }
    };

    const TIME_LIMIT = 120;
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;
    let timerInterval = null;
    let remainingPathClass = COLOR_CODES.info.class;

    function onTimesUp() {
        clearInterval(timerInterval);
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            document.getElementById("base-timer-label").innerHTML = formatTime(
                timeLeft
            );
            setCircleDasharray();
            setRemainingPathColor(timeLeft);

            if (timeLeft === 0) {
                onTimesUp();
            }
        }, 1000);
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }

    function setRemainingPathColor(timeLeft) {
        const { alert, warning, info } = COLOR_CODES;
        const label_text = document.getElementById('base-timer-label');
        const pathRemaining = document.getElementById('base-timer-path-remaining');
        if (timeLeft <= alert.threshold) {
            label_text.classList.remove(warning.class);
            label_text.classList.add(alert.class);
            pathRemaining.classList.remove(warning.class);
            pathRemaining.classList.add(alert.class);
        } else if (timeLeft <= warning.threshold) {
            label_text.classList.remove(info.class);
            label_text.classList.add(warning.class);
            pathRemaining.classList.remove(info.class);
            pathRemaining.classList.add(warning.class);
        }
    }

    function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
        const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
    }

    return(
        <button onClick={(e) => startTimer()} className="base-timer">
            <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className="base-timer__circle">
                    <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                    <path
                        id="base-timer-path-remaining"
                        stroke-dasharray="283"
                        className={`base-timer__path-remaining ${remainingPathClass}`}
                        d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
                    ></path>
                </g>
            </svg>
            <span id="base-timer-label" className="base-timer__label">{formatTime(
                timeLeft
            )}</span>
        </button>
    )
};

export default Timer;