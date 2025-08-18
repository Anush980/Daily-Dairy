import React, { useState, useEffect } from 'react'
import './homepage.css'
import Time from '../components/time/Time';

function DailyDiary() {
    const [diary, setDiary] = useState([]);
    const [temp, setTemp] = useState("");
    const [progress, setProgress] = useState(10);

    useEffect(() => {
        fetch("http://localhost:5001/api")
            .then(res => res.json())
            .then(data => setDiary(data))
            .catch(err => alert(err))
    },[]);

    async function submitHandler(e){
        e.preventDefault();
        if (!temp.trim()) return;
        // setDiary([...diary, temp]);
        // setTemp("");
        try {
            const res = await fetch("http://localhost:5001/api", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text:temp })
            });
            if (!res.ok) throw new Error("Failed to connect to create entry");

            const result = await res.json();
            // setDiary(prev=>[...prev,result]);
            setDiary(result.entries);
            setTemp("");

        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className="main-container">
                <div className="left-container">
                    <div className="task-container">
                        <div className="left-task-container">
                            <span>Tasks Done</span>
                            <p>Lets get it done!</p>
                            <div className="progress-container">
                                <progress value={progress} max="100" className='progress-bar' />
                            </div>
                        </div>
                        <div className="right-task-container">
                            <div className="circle-container">
                                <span>1/3</span>
                            </div>
                        </div>

                    </div>
                    <form onSubmit={submitHandler} className='input-form'>
                        <input type='text' value={temp} onChange={(e) => setTemp(e.target.value)} placeholder='Whats your goal for today...' className='todo-add' />
                        <button type='submit' className='add-button'><span>+</span></button>
                    </form>
                    <ol>
                        {diary.map((entry, index) => {
                            return <li key={index} className="list">{entry.text}<button>Edit</button><button>Delete</button></li>
                        })}
                    </ol>

                </div>
                <div className="right-container">
                    <Time />
                </div>
            </div>
        </>
    )
}

export default DailyDiary;