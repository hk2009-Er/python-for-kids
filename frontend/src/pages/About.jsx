import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/InfoPages.css";

class About extends Component {
    render() {
        return (
            <div className="info-page">

                <div className="info-hero">
                    <div className="info-hero-icon">🐍</div>

                    <h1>About Python for Kids</h1>

                    <p>
                        Learn Python in a fun, simple and interactive way!
                    </p>
                </div>

                <div className="info-container">

                    <section className="info-card">
                        <div className="info-card-icon">🚀</div>

                        <div>
                            <h2>Our Mission</h2>

                            <p>
                                Python for Kids is designed to make programming
                                easier and more enjoyable for beginners.
                            </p>

                            <p>
                                Our goal is to help learners understand Python
                                concepts through simple explanations, examples,
                                exercises, quizzes and interactive games.
                            </p>
                        </div>
                    </section>

                    <section className="info-card">
                        <div className="info-card-icon">📚</div>

                        <div>
                            <h2>What You Can Learn</h2>

                            <ul className="info-list">
                                <li>🐍 Python Basics</li>
                                <li>📦 Variables</li>
                                <li>🔢 Data Types</li>
                                <li>➕ Operators</li>
                                <li>🤔 If / Else</li>
                                <li>🔁 Loops</li>
                                <li>📝 Lists</li>
                                <li>⚙️ Functions</li>
                            </ul>
                        </div>
                    </section>

                    <section className="info-card">
                        <div className="info-card-icon">🎮</div>

                        <div>
                            <h2>Learn Through Games</h2>

                            <p>
                                Learning programming doesn't have to be boring!
                            </p>

                            <p>
                                Try our interactive Python games and coding
                                puzzles to practice programming concepts while
                                having fun.
                            </p>

                            <Link to="/games" className="info-button">
                                🎮 Explore Games
                            </Link>
                        </div>
                    </section>

                    <section className="info-card">
                        <div className="info-card-icon">🧠</div>

                        <div>
                            <h2>Practice & Quizzes</h2>

                            <p>
                                After learning a topic, test your knowledge
                                with interactive quizzes and practice
                                activities.
                            </p>

                            <Link to="/quizzes" className="info-button">
                                🧠 Take a Quiz
                            </Link>
                        </div>
                    </section>

                    <section className="info-card info-highlight">
                        <div className="info-card-icon">🌟</div>

                        <div>
                            <h2>Our Vision</h2>

                            <p>
                                We want to create a friendly learning space
                                where beginners can build programming
                                knowledge step by step and develop problem
                                solving skills.
                            </p>
                        </div>
                    </section>

                </div>

            </div>
        );
    }
}

export default About;