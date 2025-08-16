import React from 'react'
import './navbar.css';

function Navbar() {
    return (
        <nav className='navbar'>
            <div className="logo">
                <div className="hamburger">
                    <span />
                    <span />
                    <span />
                </div>
                <span>DailyDairy</span>
            </div>
            <div className="middle">
                <div className="links">
                    <ul>
                        <a href='#favourite'><li>Home</li></a>
                        <a href='#favourite'><li>Favourites</li></a>
                    </ul>
                </div>
                <div className="search">
                    <input type='text' placeholder='Search' className='search-bar' />
                </div>
            </div>
            <div className="account">
                <span>AS</span>
            </div>
        </nav>
    )
}

export default Navbar