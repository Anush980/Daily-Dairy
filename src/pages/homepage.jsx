import React, { useState } from 'react'
import './homepage.css'

function DailyDiary() {
    const [diary, setDiary] = useState([]);
    const [temp, setTemp] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();
        if (!temp.trim()) return;
        setDiary([...diary, temp]);
        setTemp("");
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
                            <progress value="50" max="100" className='progress-bar'/>
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
                        <button type='sumbit' className='add-button'><span>+</span></button>
                    </form>
                    <ol>
                        {diary.map((diaries, index) => {
                            return <li key={index}>{diaries}</li>
                        })}
                    </ol>

                </div>
                <div className="right-container">
                </div>
            </div>
        </>
    )
}

export default DailyDiary;