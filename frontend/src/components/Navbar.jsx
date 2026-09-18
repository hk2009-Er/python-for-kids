import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";


class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false
        };
    }


    toggleMenu = () => {

        this.setState({
            menuOpen: !this.state.menuOpen
        });

    };


    closeMenu = () => {

        this.setState({
            menuOpen: false
        });

    };


    render() {

        const { menuOpen } = this.state;


        return (

            <header className="navbar">

                <div className="navbar-container">


                    {/* ================================
                        LOGO
                    ================================= */}

                    <NavLink
                        to="/"
                        className="navbar-logo"
                        onClick={this.closeMenu}
                    >

                        <span className="logo-python">
                             <img
        src="/python-logo.png"
        alt="Python for Kids logo"
    />
                        </span>

                        <span className="logo-text">
                            Python For
                            <span>Kids</span>
                        </span>

                    </NavLink>


                    {/* ================================
                        MOBILE MENU BUTTON
                    ================================= */}

                    <button
                        className={`menu-toggle ${
                            menuOpen ? "active" : ""
                        }`}
                        onClick={this.toggleMenu}
                        aria-label="Toggle navigation"
                    >

                        <span></span>
                        <span></span>
                        <span></span>

                    </button>


                    {/* ================================
                        NAVIGATION
                    ================================= */}

                    <nav
                        className={`navbar-menu ${
                            menuOpen ? "open" : ""
                        }`}
                    >


                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `nav-link ${
                                    isActive ? "active" : ""
                                }`
                            }
                            onClick={this.closeMenu}
                        >

                            <span>🏠</span>

                            Home

                        </NavLink>


                        <NavLink
                            to="/learn"
                            className={({ isActive }) =>
                                `nav-link ${
                                    isActive ? "active" : ""
                                }`
                            }
                            onClick={this.closeMenu}
                        >

                            <span>📚</span>

                            Learn

                        </NavLink>


                        <NavLink
                            to="/exercises"
                            className={({ isActive }) =>
                                `nav-link ${
                                    isActive ? "active" : ""
                                }`
                            }
                            onClick={this.closeMenu}
                        >

                            <span>🧩</span>

                            Exercises

                        </NavLink>


                        <NavLink
                            to="/quizzes"
                            className={({ isActive }) =>
                                `nav-link ${
                                    isActive ? "active" : ""
                                }`
                            }
                            onClick={this.closeMenu}
                        >

                            <span>🧠</span>

                            Quizzes

                        </NavLink>


                        <NavLink
                            to="/projects"
                            className={({ isActive }) =>
                                `nav-link ${
                                    isActive ? "active" : ""
                                }`
                            }
                            onClick={this.closeMenu}
                        >

                            <span>🚀</span>

                            Projects

                        </NavLink>


                        {/* ================================
                            PLAY BUTTON
                        ================================= */}

                        <NavLink
                            to="/games"
                            className="play-button"
                            onClick={this.closeMenu}
                        >

                            🎮

                            <span>
                                Play
                            </span>

                        </NavLink>


                    </nav>

                </div>

            </header>

        );

    }

}


export default Navbar;