import React, { Component } from "react";

import "./About.css";


class About extends Component {

    render() {

        return (

            <div className="about-page">

                {/* HERO */}

                <section className="about-hero">

                    <div className="about-logo">
                        🐍
                    </div>

                    <h1>
                        About PythonKids
                    </h1>

                    <p>
                        Making Python learning fun,
                        simple and exciting for kids! 🌟
                    </p>

                </section>


                {/* CONTENT */}

                <section className="about-content">


                    <div className="about-card">

                        <div className="about-card-icon">
                            💡
                        </div>

                        <h2>
                            Why PythonKids?
                        </h2>

                        <p>
                            Learning programming doesn't have
                            to be difficult or boring.
                        </p>

                        <p>
                            PythonKids is designed to introduce
                            children to programming through
                            stories, games, quizzes, challenges
                            and creative projects.
                        </p>

                    </div>


                    <div className="about-card">

                        <div className="about-card-icon">
                            🎮
                        </div>

                        <h2>
                            Learn Through Play
                        </h2>

                        <p>
                            Kids can learn concepts and then
                            immediately practice them through
                            interactive activities and games.
                        </p>

                    </div>


                    <div className="about-card">

                        <div className="about-card-icon">
                            🚀
                        </div>

                        <h2>
                            Build Real Projects
                        </h2>

                        <p>
                            Instead of only reading theory,
                            students can use Python to build
                            games, calculators, quizzes and
                            other fun projects.
                        </p>

                    </div>


                    {/* VALUES */}

                    <div className="about-values">

                        <h2>
                            🌟 Our Learning Philosophy
                        </h2>


                        <div className="values-grid">

                            <div>
                                <span>🧠</span>
                                <h3>Understand</h3>
                                <p>
                                    Learn concepts in simple language.
                                </p>
                            </div>


                            <div>
                                <span>🎮</span>
                                <h3>Practice</h3>
                                <p>
                                    Learn through interactive challenges.
                                </p>
                            </div>


                            <div>
                                <span>🛠️</span>
                                <h3>Create</h3>
                                <p>
                                    Build your own Python projects.
                                </p>
                            </div>


                            <div>
                                <span>🏆</span>
                                <h3>Celebrate</h3>
                                <p>
                                    Earn achievements and keep improving.
                                </p>
                            </div>

                        </div>

                    </div>

                </section>

            </div>
        );
    }
}


export default About;