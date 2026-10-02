import React, { Component } from "react";
import { Link } from "react-router-dom";

import lessonData from "../data/lessonData";

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
                    LEARNING PATH
                ================================= */}

                <section className="home-path">

                    <div className="home-section-heading">

                        <h2>
                            The Python Learning Path 🗺️
                        </h2>

                        <p>
                            {lessonData.length} topics that take you from
                            your very first print() to building your own
                            classes. Each topic has short lessons, practice
                            exercises you can run in your browser, and a quiz.
                        </p>

                    </div>

                    <ol className="home-path-list">

                        {lessonData.map((topic, index) => (

                            <li key={topic.slug} className="home-path-item">

                                <span className="home-path-step">
                                    {index + 1}
                                </span>

                                <div>

                                    <h3>
                                        <Link to={`/lesson/${topic.slug}`}>
                                            {topic.icon} {topic.title}
                                        </Link>
                                        <span className="home-path-level">
                                            {topic.level}
                                        </span>
                                    </h3>

                                    <p>
                                        {topic.description}
                                    </p>

                                </div>

                            </li>

                        ))}

                    </ol>

                </section>


                {/* ================================
                    PARENTS & TEACHERS FAQ
                ================================= */}

                <section className="home-faq">

                    <div className="home-section-heading">

                        <h2>
                            For Parents and Teachers 👪
                        </h2>

                        <p>
                            Answers to the questions we hear most often.
                        </p>

                    </div>

                    <div className="home-faq-list">

                        <div className="home-faq-item">
                            <h3>What age is Python for Kids made for?</h3>
                            <p>
                                The lessons are written for children aged
                                about 8 to 14 who can read short paragraphs on
                                their own. Younger children can follow along
                                with an adult, and older beginners use the
                                site too because every idea is explained from
                                the start.
                            </p>
                        </div>

                        <div className="home-faq-item">
                            <h3>Do we need to install anything?</h3>
                            <p>
                                No. Lessons, quizzes and games work in any
                                modern web browser, and the exercises run real
                                Python code right on the page. Only the Turtle
                                Drawing topic suggests a free desktop editor
                                such as Thonny or IDLE, because drawing
                                windows can't open inside a browser.
                            </p>
                        </div>

                        <div className="home-faq-item">
                            <h3>Is it free? Does my child need an account?</h3>
                            <p>
                                Everything is free and there are no accounts
                                or sign-ups. Progress such as finished lessons
                                and quiz scores is saved only in your own
                                browser, so nothing about your child is sent
                                to us. The site is supported by advertising,
                                which is described in our
                                {" "}<Link to="/privacy">Privacy Policy</Link>.
                            </p>
                        </div>

                        <div className="home-faq-item">
                            <h3>In what order should my child learn?</h3>
                            <p>
                                Follow the learning path above from top to
                                bottom. Each topic only uses ideas from the
                                topics before it. After a topic, try its
                                exercises and quiz, then use what you learned
                                in one of the step-by-step
                                {" "}<Link to="/projects">projects</Link>, like a
                                number guessing game or a chatbot.
                            </p>
                        </div>

                        <div className="home-faq-item">
                            <h3>Can teachers use this in class?</h3>
                            <p>
                                Yes. Each topic works as a short lesson with a
                                ready-made quiz at the end, and the coding
                                games are a fun way to review at the end of a
                                class. If you have suggestions, we'd love to
                                hear them on our
                                {" "}<Link to="/contact">Contact page</Link>.
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