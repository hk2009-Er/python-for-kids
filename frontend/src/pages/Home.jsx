import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Home.css";


class Home extends Component {

    render() {

        return (
            <div className="home-page">

                {/* ================================
                    HERO SECTION
                ================================= */}

                <section className="home-hero">

                    <div className="hero-content">

                        <div className="hero-text">

                            <div className="welcome-badge">
                                🐍 Welcome, Python Explorer!
                            </div>

                            <h1>
                                Learn Python
                                <span> the Fun Way! 🚀</span>
                            </h1>

                            <p>
                                Explore Python through interactive
                                lessons, fun games, exciting quizzes
                                and creative projects.
                            </p>

                            <div className="hero-buttons">

                                <Link
                                    to="/learn"
                                    className="primary-button"
                                >
                                    🚀 Start Learning
                                </Link>

                                <Link
                                    to="/games"
                                    className="secondary-button"
                                >
                                    🎮 Play Games
                                </Link>

                            </div>

                        </div>


                        <div className="hero-mascot">

                            <div className="mascot-circle">
                                🐍
                            </div>

                            <div className="floating-card card-one">
                                ⭐ +10 XP
                            </div>

                            <div className="floating-card card-two">
                                🏆 Quiz Master
                            </div>

                            <div className="floating-card card-three">
                                💡 Keep Learning!
                            </div>

                        </div>

                    </div>

                </section>


                {/* ================================
                    FEATURES
                ================================= */}

                <section className="home-features">

                    <div className="home-section-heading">

                        <span>✨</span>

                        <h2>
                            Learning Python Has Never Been This Fun!
                        </h2>

                        <p>
                            Choose how you want to learn today.
                        </p>

                    </div>


                    <div className="feature-grid">

                        <Link
                            to="/learn"
                            className="feature-card"
                        >

                            <div className="feature-icon">
                                📚
                            </div>

                            <h3>
                                Learn
                            </h3>

                            <p>
                                Discover Python concepts with
                                simple explanations and examples.
                            </p>

                            <span className="feature-link">
                                Start Learning →
                            </span>

                        </Link>


                        <Link
                            to="/games"
                            className="feature-card"
                        >

                            <div className="feature-icon">
                                🎮
                            </div>

                            <h3>
                                Games
                            </h3>

                            <p>
                                Practice your Python skills while
                                playing fun coding games.
                            </p>

                            <span className="feature-link">
                                Play Now →
                            </span>

                        </Link>


                        <Link
                            to="/quizzes"
                            className="feature-card"
                        >

                            <div className="feature-icon">
                                🧠
                            </div>

                            <h3>
                                Quizzes
                            </h3>

                            <p>
                                Test your knowledge and earn
                                points by answering questions.
                            </p>

                            <span className="feature-link">
                                Take Quiz →
                            </span>

                        </Link>


                        <Link
                            to="/projects"
                            className="feature-card"
                        >

                            <div className="feature-icon">
                                🚀
                            </div>

                            <h3>
                                Projects
                            </h3>

                            <p>
                                Build cool Python projects and
                                turn your ideas into reality.
                            </p>

                            <span className="feature-link">
                                Explore Projects →
                            </span>

                        </Link>

                    </div>

                </section>


                {/* ================================
                    PYTHON JOURNEY
                ================================= */}

                <section className="python-journey">

                    <div className="home-section-heading">

                        <span>🗺️</span>

                        <h2>
                            Your Python Adventure
                        </h2>

                        <p>
                            Follow your journey from beginner
                            to Python explorer.
                        </p>

                    </div>


                    <div className="journey">

                        <div className="journey-step">

                            <div className="journey-icon">
                                🐣
                            </div>

                            <h3>
                                Beginner
                            </h3>

                            <p>
                                Learn the basics
                            </p>

                        </div>


                        <div className="journey-line"></div>


                        <div className="journey-step">

                            <div className="journey-icon">
                                🐍
                            </div>

                            <h3>
                                Coder
                            </h3>

                            <p>
                                Write Python programs
                            </p>

                        </div>


                        <div className="journey-line"></div>


                        <div className="journey-step">

                            <div className="journey-icon">
                                🧙
                            </div>

                            <h3>
                                Python Master
                            </h3>

                            <p>
                                Build awesome projects
                            </p>

                        </div>

                    </div>

                </section>


                {/* ================================
                    CTA
                ================================= */}

                <section className="home-cta">

                    <div>

                        <h2>
                            Ready for your Python adventure? 🐍
                        </h2>

                        <p>
                            Pick a lesson and start coding!
                        </p>

                        <Link
                            to="/learn"
                            className="cta-button"
                        >
                            Let's Go! 🚀
                        </Link>

                    </div>

                </section>

            </div>
        );
    }
}


export default Home;