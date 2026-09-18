import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

class Footer extends Component {

    render() {
        return (
            <footer className="site-footer">

                <div className="footer-container">

                    <div className="footer-brand">

                        <div className="footer-logo">
                            🐍
                        </div>

                        <div>
                            <h2>Python for Kids</h2>

                            <p>
                                Learn Python through lessons,
                                quizzes, exercises and games.
                            </p>
                        </div>

                    </div>

                    <div className="footer-section">

                        <h3>Learn</h3>

                        <Link to="/learn">
                            📚 Learn Python
                        </Link>

                        <Link to="/quizzes">
                            🧠 Quizzes
                        </Link>

                        <Link to="/games">
                            🎮 Games
                        </Link>

                    </div>

                    <div className="footer-section">

                        <h3>Website</h3>

                        <Link to="/about">
                            ℹ️ About Us
                        </Link>

                        <Link to="/contact">
                            📩 Contact
                        </Link>

                        <Link to="/privacy">
                            🔒 Privacy Policy
                        </Link>

                        <Link to="/terms">
                            📜 Terms & Conditions
                        </Link>

                    </div>

                </div>

                <div className="footer-bottom">

                    <p>
                        © {new Date().getFullYear()} Python for Kids.
                        All rights reserved.
                    </p>

                </div>

            </footer>
        );
    }
}

export default Footer;