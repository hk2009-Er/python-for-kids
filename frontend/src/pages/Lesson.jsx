import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";

import lessonData from "../data/lessonData";

import {
    runPython,
    getPythonStatus,
    onPythonStatusChange
} from "../utils/pythonRunner";

import {
    isTopicCompleted,
    markTopicCompleted
} from "../utils/progress";

import "./Lesson.css";


class Lesson extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentLesson: 0,
            completed: false,
            alreadyCompleted: false,
            xpEarned: 0,
            running: false,
            runResult: null,
            pythonStatus: getPythonStatus()
        };
    }


    componentDidMount() {

        this.mounted = true;

        // Read saved progress after hydration so the prerendered HTML matches.
        if (isTopicCompleted(this.props.slug)) {
            // oxlint-disable-next-line react/no-did-mount-set-state -- read browser-only storage after hydration
            this.setState({ alreadyCompleted: true });
        }

        this.unsubscribe = onPythonStatusChange(status => {
            if (this.mounted) {
                this.setState({ pythonStatus: status });
            }
        });
    }


    componentWillUnmount() {

        this.mounted = false;

        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }


    canRunExample(code) {

        return Boolean(code) &&
            !/import\s+turtle|from\s+turtle\s+import/.test(code) &&
            !/\binput\s*\(/.test(code);
    }


    runExample = async () => {

        const topic = this.getTopic();

        if (!topic || this.state.running) {
            return;
        }

        const lessonIndex = this.state.currentLesson;
        const lesson = topic.lessons[lessonIndex];

        this.setState({ running: true, runResult: null });

        const result = await runPython(lesson.example);

        if (!this.mounted) {
            return;
        }

        if (this.state.currentLesson !== lessonIndex ||
            this.getTopic() !== topic) {
            this.setState({ running: false });
            return;
        }

        this.setState({ running: false, runResult: result });
    };


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
                    this.state.currentLesson + 1,

                runResult: null
            });

        } else {

            const totalPoints = topic.lessons.reduce(
                (sum, l) => sum + (Number(l.points) || 0),
                0
            );

            const firstTime = markTopicCompleted(topic.slug, totalPoints);

            this.setState({
                completed: true,
                alreadyCompleted: true,
                xpEarned: firstTime ? totalPoints : 0
            });

        }

    };


    goToLesson = (index) => {

        this.setState({
            currentLesson: index,
            completed: false,
            runResult: null
        });

        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

    };


    previousLesson = () => {

        if (this.state.currentLesson > 0) {

            this.setState({
                currentLesson:
                    this.state.currentLesson - 1,

                completed: false,

                runResult: null
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


        const firstExercise =
            (topic.exercises || [])[0] || null;


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

                                {this.state.alreadyCompleted && (
                                    <span className="lesson-completed-badge">
                                        ✅ Completed
                                    </span>
                                )}
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

                                <span>🐍 Python</span>

                                {this.canRunExample(lesson.example) && (

                                    <button
                                        className="try-it-button"
                                        onClick={this.runExample}
                                        disabled={this.state.running}
                                    >
                                        {this.state.running ? "Running..." : "▶ Try it"}
                                    </button>

                                )}

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
                                {this.state.runResult && !this.state.running && (
                                    <span className="output-live"> • ran for real! 🐍</span>
                                )}
                            </div>


                            {this.state.running ? (

                                <pre className="output-status">
                                    {this.state.pythonStatus === "loading"
                                        ? "Warming up Python... 🐍"
                                        : "Running..."}
                                </pre>

                            ) : this.state.runResult ? (

                                <>
                                    {(this.state.runResult.stdout ||
                                        !this.state.runResult.error) && (
                                        <pre>
                                            {this.state.runResult.stdout ||
                                                "(nothing was printed)"}
                                        </pre>
                                    )}

                                    {this.state.runResult.error && (
                                        <pre className="output-error">
                                            🐛 {this.state.runResult.error}
                                        </pre>
                                    )}
                                </>

                            ) : (

                                <pre>
                                    {lesson.output}
                                </pre>

                            )}

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

                                {this.state.xpEarned > 0 && (
                                    <>
                                        <br />
                                        ⭐ +{this.state.xpEarned} XP
                                    </>
                                )}

                                {firstExercise && (
                                    <div className="lesson-complete-links">
                                        <Link
                                            to={`/exercise/${firstExercise.id}`}
                                            className="lesson-button secondary"
                                        >
                                            🧩 Practice exercises
                                        </Link>
                                    </div>
                                )}

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
                                    to={
                                        topic.quiz && topic.quiz.length
                                            ? `/quiz/${topic.slug}`
                                            : "/quizzes"
                                    }
                                    className="lesson-button primary"
                                >
                                    Take Quiz 🧠
                                </Link>

                            )}

                        </div>


                        {firstExercise && !this.state.completed && (

                            <div className="lesson-practice">

                                🧩 Want to practice?{" "}

                                <Link to={`/exercise/${firstExercise.id}`}>
                                    Try the {topic.title} exercises →
                                </Link>

                            </div>

                        )}


                    </div>

                </section>


                {/* TOPIC SUMMARY: every step on one page, for review */}

                <section className="lesson-summary">

                    <h2>
                        📚 Everything in {topic.title}
                    </h2>

                    <p className="lesson-summary-intro">
                        {topic.description} Here is every step in this
                        topic in one place, so you can review what you
                        learned or jump straight to a step.
                    </p>

                    <ol className="lesson-summary-list">

                        {topic.lessons.map((step, index) => (

                            <li
                                key={step.id}
                                className={
                                    index === this.state.currentLesson
                                        ? "lesson-summary-item current"
                                        : "lesson-summary-item"
                                }
                            >

                                <div className="lesson-summary-head">

                                    <h3>
                                        {step.icon} {step.title}
                                    </h3>

                                    <button
                                        type="button"
                                        className="lesson-summary-go"
                                        onClick={() => this.goToLesson(index)}
                                    >
                                        {index === this.state.currentLesson
                                            ? "You are here"
                                            : `Go to step ${index + 1} →`}
                                    </button>

                                </div>

                                <p>
                                    {step.explanation}
                                </p>

                                <pre className="lesson-summary-code">
                                    <code>{step.example}</code>
                                </pre>

                            </li>

                        ))}

                    </ol>

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
            key={params.slug}
            slug={params.slug}
        />
    );

}


export default LessonWithParams;