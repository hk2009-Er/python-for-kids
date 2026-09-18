import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";

import lessonData from "../data/lessonData";

import "./Quiz.css";


class Quiz extends Component {

    constructor(props) {
        super(props);

        this.state = {

            currentQuestion: 0,

            selectedAnswer: null,

            showAnswer: false,

            score: 0,

            finished: false

        };
    }


    getTopic = () => {

        return lessonData.find(
            topic => topic.slug === this.props.slug
        );

    };


    handleAnswer = (answerIndex) => {

        if (this.state.showAnswer) {
            return;
        }


        const topic = this.getTopic();

        const question =
            topic.quiz[this.state.currentQuestion];


        const correct =
            answerIndex === question.answer;


        this.setState({

            selectedAnswer: answerIndex,

            showAnswer: true,

            score: correct
                ? this.state.score + 1
                : this.state.score

        });

    };


    nextQuestion = () => {

        const topic = this.getTopic();


        if (
            this.state.currentQuestion
            <
            topic.quiz.length - 1
        ) {

            this.setState({

                currentQuestion:
                    this.state.currentQuestion + 1,

                selectedAnswer: null,

                showAnswer: false

            });

        } else {

            this.setState({
                finished: true
            });

        }

    };


    restartQuiz = () => {

        this.setState({

            currentQuestion: 0,

            selectedAnswer: null,

            showAnswer: false,

            score: 0,

            finished: false

        });

    };


    renderResult = (topic) => {

        const total = topic.quiz.length;

        const score = this.state.score;

        const percentage =
            Math.round((score / total) * 100);


        let message = "";

        let emoji = "";


        if (percentage === 100) {

            emoji = "🏆";
            message = "Perfect Score!";

        } else if (percentage >= 70) {

            emoji = "🎉";
            message = "Great Job!";

        } else if (percentage >= 50) {

            emoji = "😊";
            message = "Good Try!";

        } else {

            emoji = "💪";
            message = "Keep Practicing!";

        }


        return (

            <div className="quiz-result">

                <div className="result-emoji">
                    {emoji}
                </div>


                <h1>
                    {message}
                </h1>


                <p className="result-subtitle">
                    You completed the {topic.title} quiz!
                </p>


                <div className="score-circle">

                    <strong>
                        {score}
                    </strong>

                    <span>
                        / {total}
                    </span>

                </div>


                <div className="percentage">
                    {percentage}% Correct
                </div>


                <div className="xp-earned">
                    ⭐ You earned {score * 10} XP
                </div>


                <div className="result-buttons">

                    <button
                        className="retry-button"
                        onClick={this.restartQuiz}
                    >
                        🔄 Try Again
                    </button>


                    <Link
                        to="/quizzes"
                        className="back-quizzes-button"
                    >
                        ← All Quizzes
                    </Link>

                </div>

            </div>

        );

    };


    render() {

        const topic = this.getTopic();


        if (!topic) {

            return (

                <div className="quiz-page">

                    <div className="quiz-not-found">

                        <h2>
                            Quiz not found 😕
                        </h2>

                        <Link to="/quizzes">
                            Back to Quizzes
                        </Link>

                    </div>

                </div>

            );

        }


        if (this.state.finished) {

            return (

                <div className="quiz-page">

                    {this.renderResult(topic)}

                </div>

            );

        }


        const question =
            topic.quiz[this.state.currentQuestion];


        const progress =
            (
                (this.state.currentQuestion + 1)
                /
                topic.quiz.length
            ) * 100;


        return (

            <div className="quiz-page">


                {/* HEADER */}

                <div className="quiz-playing-header">

                    <Link
                        to="/quizzes"
                        className="quiz-back"
                    >
                        ← Quizzes
                    </Link>


                    <div className="quiz-topic-name">

                        {topic.icon} {topic.title}

                    </div>


                    <div className="quiz-score">

                        ⭐ {this.state.score}

                    </div>

                </div>



                {/* QUIZ */}

                <main className="quiz-playing-content">


                    {/* PROGRESS */}

                    <div className="question-info">

                        <span>
                            Question{" "}
                            {this.state.currentQuestion + 1}
                            {" "}of{" "}
                            {topic.quiz.length}
                        </span>

                    </div>


                    <div className="question-progress">

                        <div
                            className="question-progress-fill"
                            style={{
                                width: `${progress}%`
                            }}
                        />

                    </div>



                    {/* QUESTION CARD */}

                    <div className="question-card">


                        <div className="question-number">

                            Question{" "}
                            {this.state.currentQuestion + 1}

                        </div>


                        <h1>
                            {question.question}
                        </h1>


                        {/* OPTIONS */}

                        <div className="quiz-options">

                            {question.options.map(
                                (option, index) => {

                                    let className =
                                        "quiz-option";


                                    if (
                                        this.state.showAnswer
                                        &&
                                        index === question.answer
                                    ) {

                                        className +=
                                            " correct";

                                    }


                                    if (
                                        this.state.showAnswer
                                        &&
                                        index ===
                                        this.state.selectedAnswer
                                        &&
                                        index !== question.answer
                                    ) {

                                        className +=
                                            " incorrect";

                                    }


                                    return (

                                        <button
                                            key={index}
                                            className={className}
                                            onClick={() =>
                                                this.handleAnswer(index)
                                            }
                                            disabled={
                                                this.state.showAnswer
                                            }
                                        >

                                            <span className="option-letter">

                                                {String.fromCharCode(
                                                    65 + index
                                                )}

                                            </span>


                                            <span>
                                                {option}
                                            </span>


                                            {this.state.showAnswer
                                                &&
                                                index === question.answer
                                                &&
                                                <span>
                                                    ✅
                                                </span>
                                            }


                                            {this.state.showAnswer
                                                &&
                                                index === this.state.selectedAnswer
                                                &&
                                                index !== question.answer
                                                &&
                                                <span>
                                                    ❌
                                                </span>
                                            }

                                        </button>

                                    );

                                }
                            )}

                        </div>



                        {/* EXPLANATION */}

                        {this.state.showAnswer && (

                            <div
                                className={
                                    this.state.selectedAnswer
                                    === question.answer
                                        ? "answer-feedback correct-feedback"
                                        : "answer-feedback incorrect-feedback"
                                }
                            >

                                <strong>

                                    {this.state.selectedAnswer
                                    === question.answer
                                        ? "🎉 Correct!"
                                        : "💡 Not quite!"
                                    }

                                </strong>


                                <p>
                                    {question.explanation}
                                </p>

                            </div>

                        )}



                        {/* NEXT */}

                        {this.state.showAnswer && (

                            <button
                                className="next-question-button"
                                onClick={this.nextQuestion}
                            >

                                {this.state.currentQuestion
                                    === topic.quiz.length - 1
                                    ? "See My Score 🏆"
                                    : "Next Question →"
                                }

                            </button>

                        )}

                    </div>

                </main>

            </div>

        );

    }
}


/*
    React Router v6 wrapper
*/

function QuizWithParams(props) {

    const params = useParams();

    return (
        <Quiz
            {...props}
            slug={params.slug}
        />
    );

}


export default QuizWithParams;