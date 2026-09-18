 
import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import lessonData from "../data/lessonData";
import "./Game.css";
import SnakeGame from "./SnakeGame";
import CodePuzzle from "./CodePuzzle";

class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentQuestion: 0,
            selectedAnswer: null,
            showAnswer: false,
            score: 0,
            lives: 3,
            finished: false,
            xp: 0
        };
    }


    getGameInfo = () => {

        const gameId = this.props.gameId;

        const games = {
            "python-snake": {
                title: "Python Snake",
                icon: "🐍",
                description: "Answer correctly and help your snake grow!",
                theme: "snake"
            },

            "code-puzzle": {
                title: "Code Puzzle",
                icon: "🧩",
                description: "Solve Python questions and complete the puzzle!",
                theme: "puzzle"
            },

            "python-catch": {
                title: "Python Catch",
                icon: "🎯",
                description: "Catch the correct Python answer!",
                theme: "catch"
            },

            "space-python": {
                title: "Space Python",
                icon: "🚀",
                description: "Answer correctly and fly your rocket through space!",
                theme: "space"
            },

            "code-runner": {
                title: "Code Runner",
                icon: "🏃",
                description: "Run through Python challenges and collect XP!",
                theme: "runner"
            }
        };

        return games[gameId];
    };


    getQuestions = () => {

        const questions = [];

        lessonData.forEach((topic) => {

            if (topic.quiz) {

                topic.quiz.forEach((question) => {

                    questions.push({
                        ...question,
                        topic: topic.title,
                        topicIcon: topic.icon
                    });

                });

            }

        });

        return questions;
    };


    handleAnswer = (index) => {

        if (this.state.showAnswer) {
            return;
        }

        const questions = this.getQuestions();

        const question =
            questions[this.state.currentQuestion];

        const correct =
            index === question.answer;

        this.setState({
            selectedAnswer: index,
            showAnswer: true,
            score: correct
                ? this.state.score + 1
                : this.state.score,
            lives: correct
                ? this.state.lives
                : Math.max(this.state.lives - 1, 0),
            xp: correct
                ? this.state.xp + 10
                : this.state.xp
        });
    };


    nextQuestion = () => {

        const questions = this.getQuestions();

        const next =
            this.state.currentQuestion + 1;

        if (
            next >= questions.length ||
            this.state.lives <= 0
        ) {

            this.setState({
                finished: true
            });

            return;
        }

        this.setState({
            currentQuestion: next,
            selectedAnswer: null,
            showAnswer: false
        });
    };


    restartGame = () => {

        this.setState({
            currentQuestion: 0,
            selectedAnswer: null,
            showAnswer: false,
            score: 0,
            lives: 3,
            finished: false,
            xp: 0
        });
    };


    getResultMessage = (percentage) => {

        if (percentage === 100) {
            return {
                emoji: "🏆",
                title: "Python Master!",
                text: "Amazing! You answered every question correctly!"
            };
        }

        if (percentage >= 70) {
            return {
                emoji: "🎉",
                title: "Great Job!",
                text: "You're becoming a Python superstar!"
            };
        }

        if (percentage >= 40) {
            return {
                emoji: "🚀",
                title: "Good Work!",
                text: "Keep practicing and you'll get even better!"
            };
        }

        return {
            emoji: "💪",
            title: "Keep Practicing!",
            text: "Don't give up. Every mistake helps you learn!"
        };
    };


    renderGame() {

        const game = this.getGameInfo();

        const questions = this.getQuestions();

        const question =
            questions[this.state.currentQuestion];

        if (!question) {
            return null;
        }

        const progress =
            ((this.state.currentQuestion + 1) /
                questions.length) *
            100;


        return (
            <div className={`game-screen ${game.theme}`}>

                {/* HEADER */}

                <div className="game-header">

                    <Link
                        to="/games"
                        className="game-back-button"
                    >
                        ← Games
                    </Link>


                    <div className="game-title">

                        <span className="game-title-icon">
                            {game.icon}
                        </span>

                        <div>
                            <h1>{game.title}</h1>

                            <p>
                                {game.description}
                            </p>
                        </div>

                    </div>


                    <div className="game-stats-bar">

                        <div className="game-stat-box">
                            ❤️ {this.state.lives}
                        </div>

                        <div className="game-stat-box">
                            ⭐ {this.state.xp} XP
                        </div>

                        <div className="game-stat-box">
                            🏆 {this.state.score}
                        </div>

                    </div>

                </div>


                {/* PROGRESS */}

                <div className="game-progress-container">

                    <div className="game-progress-top">

                        <span>
                            Question{" "}
                            {this.state.currentQuestion + 1}
                            {" "}
                            of{" "}
                            {questions.length}
                        </span>

                        <span>
                            {Math.round(progress)}%
                        </span>

                    </div>


                    <div className="game-progress">

                        <div
                            className="game-progress-fill"
                            style={{
                                width: `${progress}%`
                            }}
                        />

                    </div>

                </div>


                {/* QUESTION */}

                <div className="game-question-card">

                    <div className="question-topic">

                        {question.topicIcon}

                        <span>
                            {question.topic}
                        </span>

                    </div>


                    <h2>
                        {question.question}
                    </h2>


                    <div className="game-options">

                        {question.options.map(
                            (option, index) => {

                                let optionClass =
                                    "game-option";

                                if (
                                    this.state.showAnswer
                                ) {

                                    if (
                                        index ===
                                        question.answer
                                    ) {
                                        optionClass +=
                                            " correct";
                                    }

                                    else if (
                                        index ===
                                        this.state.selectedAnswer
                                    ) {
                                        optionClass +=
                                            " incorrect";
                                    }
                                }


                                return (
                                    <button
                                        key={index}
                                        className={optionClass}
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

                                    </button>
                                );

                            }
                        )}

                    </div>


                    {/* FEEDBACK */}

                    {this.state.showAnswer && (

                        <div
                            className={
                                this.state.selectedAnswer ===
                                question.answer
                                    ? "game-feedback correct-feedback"
                                    : "game-feedback incorrect-feedback"
                            }
                        >

                            <div className="feedback-icon">

                                {this.state.selectedAnswer ===
                                question.answer
                                    ? "🎉"
                                    : "💡"}

                            </div>


                            <div>

                                <strong>

                                    {this.state.selectedAnswer ===
                                    question.answer
                                        ? "Correct!"
                                        : "Not quite!"}

                                </strong>


                                <p>
                                    {question.explanation}
                                </p>

                            </div>

                        </div>

                    )}


                    {/* NEXT */}

                    {this.state.showAnswer && (

                        <button
                            className="next-question-button"
                            onClick={this.nextQuestion}
                        >

                            {this.state.currentQuestion + 1 >=
                            questions.length ||
                            this.state.lives <= 0
                                ? "See Results 🏆"
                                : "Next Question →"}

                        </button>

                    )}

                </div>


                {/* TIP */}

                <div className="game-tip">

                    💡 <strong>Python Tip:</strong>

                    <span>
                        Read the question carefully before
                        choosing your answer!
                    </span>

                </div>

            </div>
        );
    }


    renderResult() {

        const questions = this.getQuestions();

        const percentage =
            Math.round(
                (this.state.score / questions.length) *
                100
            );

        const result =
            this.getResultMessage(percentage);


        return (
            <div className="game-result-page">

                <div className="game-result-card">

                    <div className="result-emoji">
                        {result.emoji}
                    </div>


                    <h1>
                        {result.title}
                    </h1>


                    <p className="result-text">
                        {result.text}
                    </p>


                    <div className="result-score">

                        <span>
                            Your Score
                        </span>

                        <strong>
                            {this.state.score}
                            {" / "}
                            {questions.length}
                        </strong>

                    </div>


                    <div className="result-percentage">
                        {percentage}%
                    </div>


                    <div className="result-rewards">

                        <div>
                            ⭐
                            <strong>
                                {this.state.xp}
                            </strong>
                            <span>XP Earned</span>
                        </div>


                        <div>
                            🏆
                            <strong>
                                {this.state.score}
                            </strong>
                            <span>Correct</span>
                        </div>


                        <div>
                            ❤️
                            <strong>
                                {this.state.lives}
                            </strong>
                            <span>Lives Left</span>
                        </div>

                    </div>


                    <div className="result-buttons">

                        <button
                            className="play-again-button"
                            onClick={this.restartGame}
                        >
                            🔄 Play Again
                        </button>


                        <Link
                            to="/games"
                            className="all-games-button"
                        >
                            🎮 All Games
                        </Link>


                        <Link
                            to="/learn"
                            className="learn-button"
                        >
                            📚 Continue Learning
                        </Link>

                    </div>

                </div>

            </div>
        );
    }


    render() {

     if (this.props.gameId === "python-snake") {
        return <SnakeGame />;
        }
    if (this.props.gameId === "code-puzzle") {
            return <CodePuzzle />;
        }
        const game = this.getGameInfo();

        if (!game) {

            return (
                <div className="game-not-found">

                    <div>
                        <span>😕</span>

                        <h1>
                            Game Not Found
                        </h1>

                        <p>
                            We couldn't find that game.
                        </p>

                        <Link to="/games">
                            ← Back to Games
                        </Link>
                    </div>

                </div>
            );
        }


        if (this.state.finished) {
            return this.renderResult();
        }


        return this.renderGame();
    }
}


/*
    React Router v6 wrapper.

    URL:
    /game/python-snake

    useParams() gives:
    {
        gameId: "python-snake"
    }
*/

function GameWithParams() {

    const { gameId } = useParams();

    return (
        <Game gameId={gameId} />
    );
}


export default GameWithParams;
