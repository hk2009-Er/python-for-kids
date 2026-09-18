import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";

import lessonData from "../data/lessonData";

import "./Lesson.css";


class Lesson extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentLesson: 0,
            completed: false
        };
    }


    getTopic() {

        const { slug } = this.props;

        return lessonData.find(
            topic => topic.slug === slug
        );

    }


    nextLesson = () => {

        const topic = this.getTopic();

        if (!topic) {
            return;
        }


        if (
            this.state.currentLesson
            <
            topic.lessons.length - 1
        ) {

            this.setState({
                currentLesson:
                    this.state.currentLesson + 1
            });

        } else {

            this.setState({
                completed: true
            });

        }

    };


    previousLesson = () => {

        if (this.state.currentLesson > 0) {

            this.setState({
                currentLesson:
                    this.state.currentLesson - 1,

                completed: false
            });

        }

    };


    render() {

        const topic = this.getTopic();


        if (!topic) {

            return (

                <div className="lesson-page">

                    <div className="lesson-content">

                        <div className="lesson-card">

                            <h2>
                                Lesson not found 😕
                            </h2>

                            <Link
                                to="/learn"
                                className="lesson-button primary"
                            >
                                Back to Learn
                            </Link>

                        </div>

                    </div>

                </div>

            );

        }


        const lesson =
            topic.lessons[this.state.currentLesson];


        const progress =
            (
                (this.state.currentLesson + 1)
                /
                topic.lessons.length
            ) * 100;


        return (

            <div className="lesson-page">


                {/* HEADER */}

                <section className="lesson-header">

                    <Link
                        to="/learn"
                        className="back-link"
                    >
                        ← Back to Learn
                    </Link>


                    <div className="lesson-title">

                        <span>
                            {topic.icon}
                        </span>


                        <div>

                            <p>
                                {topic.level} • Python
                            </p>

                            <h1>
                                {topic.title}
                            </h1>

                        </div>

                    </div>

                </section>



                {/* CONTENT */}

                <section className="lesson-content">

                    <div className="lesson-card">


                        {/* PROGRESS */}

                        <div className="lesson-progress-info">

                            Lesson{" "}
                            {this.state.currentLesson + 1}
                            {" "}of{" "}
                            {topic.lessons.length}

                        </div>


                        <div className="lesson-progress">

                            <div
                                className="lesson-progress-fill"
                                style={{
                                    width: `${progress}%`
                                }}
                            />

                        </div>



                        {/* LESSON */}

                        <div className="lesson-step">

                            Step {this.state.currentLesson + 1}

                        </div>


                        <h2>
                            {lesson.icon} {lesson.title}
                        </h2>


                        <p className="lesson-explanation">
                            {lesson.explanation}
                        </p>



                        {/* CODE */}

                        <div className="code-box">

                            <div className="code-header">

                                🐍 Python

                            </div>


                            <pre>
                                <code>
                                    {lesson.example}
                                </code>
                            </pre>

                        </div>



                        {/* OUTPUT */}

                        <div className="output-box">

                            <div>
                                ▶ Output
                            </div>


                            <pre>
                                {lesson.output}
                            </pre>

                        </div>



                        {/* POINTS */}

                        <div className="lesson-points">

                            ⭐ Earn {lesson.points} XP

                        </div>



                        {/* COMPLETE */}

                        {this.state.completed && (

                            <div className="lesson-complete">

                                🎉 Amazing!

                                <br />

                                You completed all lessons
                                in this topic!

                            </div>

                        )}



                        {/* CONTROLS */}

                        <div className="lesson-controls">


                            <button
                                className="lesson-button secondary"
                                onClick={this.previousLesson}
                                disabled={
                                    this.state.currentLesson === 0
                                }
                            >
                                ← Previous
                            </button>


                            {!this.state.completed ? (

                                <button
                                    className="lesson-button primary"
                                    onClick={this.nextLesson}
                                >
                                    {this.state.currentLesson
                                        ===
                                        topic.lessons.length - 1
                                        ? "Finish Lesson 🎉"
                                        : "Next Lesson →"
                                    }
                                </button>

                            ) : (

                                <Link
                                    to="/quizzes"
                                    className="lesson-button primary"
                                >
                                    Take Quiz 🧠
                                </Link>

                            )}

                        </div>


                    </div>

                </section>

            </div>

        );
    }
}


/*
    React Router v6 does not provide
    match.params to class components.

    So we use a small wrapper.
*/

function LessonWithParams(props) {

    const params = useParams();

    return (
        <Lesson
            {...props}
            slug={params.slug}
        />
    );

}


export default LessonWithParams;