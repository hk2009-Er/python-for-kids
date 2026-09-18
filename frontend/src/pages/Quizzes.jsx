import React, { Component } from "react";
import { Link } from "react-router-dom";

import lessonData from "../data/lessonData";

import "./Quizzes.css";

class Quizzes extends Component {

    render() {

        return (

            <div className="quizzes-page">

                {/* HERO */}

                <section className="quiz-hero">

                    <div className="quiz-hero-icon">
                        🧠
                    </div>

                    <h1>
                        Python Quizzes
                    </h1>

                    <p>
                        Test your Python skills and earn XP!
                    </p>

                </section>


                {/* QUIZ LIST */}

                <section className="quiz-content">

                    <div className="quiz-section-title">

                        <span>
                            🎯
                        </span>

                        <div>
                            <h2>
                                Choose a Quiz
                            </h2>

                            <p>
                                Pick a topic and challenge yourself!
                            </p>
                        </div>

                    </div>


                    <div className="quiz-grid">

                        {lessonData.map(topic => (

                            <div
                                className="quiz-card"
                                key={topic.id}
                            >

                                <div className="quiz-card-top">

                                    <div className="quiz-topic-icon">
                                        {topic.icon}
                                    </div>

                                    <span className="quiz-level">
                                        {topic.level}
                                    </span>

                                </div>


                                <h3>
                                    {topic.title}
                                </h3>


                                <p>
                                    {topic.description}
                                </p>


                                <div className="quiz-info">

                                    <span>
                                        ❓ {topic.quiz.length} Questions
                                    </span>

                                    <span>
                                        ⭐ {topic.quiz.length * 10} XP
                                    </span>

                                </div>


                                <Link
                                    to={`/quiz/${topic.slug}`}
                                    className="start-quiz-button"
                                >
                                    Start Quiz 🚀
                                </Link>

                            </div>

                        ))}

                    </div>

                </section>

            </div>

        );
    }
}

export default Quizzes;