import React from 'react';

//CSS:
import './style/Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar-container">
            <h4 className="navbar-container__h4">Where is the world?</h4>
            <div className="navbar-mode-container">
                <i class="gg-moon"></i>
                <p className="navbar-mode-container__p">Dark Mode</p>
            </div>
        </div>
    )
}

export default Navbar;
