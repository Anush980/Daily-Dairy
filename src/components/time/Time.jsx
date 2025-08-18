import React, { useState, useEffect } from 'react'
import './time.css';

function Time() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());

        }, 1000);
        return () => clearInterval(interval)
    }, []);
    return (
        <div className="time-container">
            {time.toLocaleTimeString()}
        </div>
    )
}

export default Time;