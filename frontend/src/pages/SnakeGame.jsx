import React, { Component } from "react";
import { Link } from "react-router-dom";
import lessonData from "../data/lessonData";
import "./SnakeGame.css";

class SnakeGame extends Component {
    constructor(props) {
        super(props);

        this.boardSize = 18;

        this.state = {
            questions: this.getQuestions(),

            currentQuestion: 0,

            snake: [
                { x: 5, y: 5 },
                { x: 4, y: 5 },
                { x: 3, y: 5 }
            ],

            food: {
                x: 10,
                y: 5
            },

            direction: "RIGHT",
            nextDirection: "RIGHT",

            score: 0,
            xp: 0,
            lives: 3,

            selectedAnswer: null,
            answered: false,

            gameOver: false,
            finished: false,

            started: false
        };
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);

        if (this.gameInterval) {
            clearInterval(this.gameInterval);
        }
    }

    // -----------------------------------------
    // GET ALL QUIZ QUESTIONS
    // -----------------------------------------

    getQuestions = () => {
        const questions = [];

        lessonData.forEach((topic) => {
            if (topic.quiz && topic.quiz.length > 0) {
                topic.quiz.forEach((quiz) => {
                    questions.push({
                        ...quiz,
                        topic: topic.title,
                        topicIcon: topic.icon
                    });
                });
            }
        });

        return questions;
    };

    // -----------------------------------------
    // START GAME
    // -----------------------------------------

    startGame = () => {
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
        }

        this.setState(
            {
                started: true
            },
            () => {
                this.gameInterval = setInterval(
                    this.moveSnake,
                    180
                );
            }
        );
    };

    // -----------------------------------------
    // KEYBOARD CONTROLS
    // -----------------------------------------

    handleKeyDown = (event) => {
        const key = event.key;

        if (
            key === "ArrowUp" ||
            key === "ArrowDown" ||
            key === "ArrowLeft" ||
            key === "ArrowRight"
        ) {
            event.preventDefault();
        }

        if (key === "ArrowUp") {
            this.changeDirection("UP");
        }

        if (key === "ArrowDown") {
            this.changeDirection("DOWN");
        }

        if (key === "ArrowLeft") {
            this.changeDirection("LEFT");
        }

        if (key === "ArrowRight") {
            this.changeDirection("RIGHT");
        }

        if (key === " " && !this.state.started) {
            this.startGame();
        }
    };

    // -----------------------------------------
    // CHANGE DIRECTION
    // -----------------------------------------

    changeDirection = (newDirection) => {
        const { direction, started, gameOver, finished } = this.state;

        if (!started || gameOver || finished) {
            return;
        }

        // Prevent snake from going directly backwards

        if (
            direction === "UP" &&
            newDirection === "DOWN"
        ) {
            return;
        }

        if (
            direction === "DOWN" &&
            newDirection === "UP"
        ) {
            return;
        }

        if (
            direction === "LEFT" &&
            newDirection === "RIGHT"
        ) {
            return;
        }

        if (
            direction === "RIGHT" &&
            newDirection === "LEFT"
        ) {
            return;
        }

        this.setState({
            nextDirection: newDirection
        });
    };

    // -----------------------------------------
    // MOVE SNAKE
    // -----------------------------------------

    moveSnake = () => {
        const {
            snake,
            food,
            nextDirection,
            gameOver,
            finished
        } = this.state;

        if (gameOver || finished) {
            return;
        }

        const head = snake[0];

        let newHead = {
            x: head.x,
            y: head.y
        };

        // Move based on direction

        if (nextDirection === "UP") {
            newHead.y -= 1;
        }

        if (nextDirection === "DOWN") {
            newHead.y += 1;
        }

        if (nextDirection === "LEFT") {
            newHead.x -= 1;
        }

        if (nextDirection === "RIGHT") {
            newHead.x += 1;
        }

        // -----------------------------------------
        // WALL COLLISION
        // -----------------------------------------

        if (
            newHead.x < 0 ||
            newHead.x >= this.boardSize ||
            newHead.y < 0 ||
            newHead.y >= this.boardSize
        ) {
            this.handleCollision();
            return;
        }

        // -----------------------------------------
        // SELF COLLISION
        // -----------------------------------------

        const hitSelf = snake.some(
            (segment) =>
                segment.x === newHead.x &&
                segment.y === newHead.y
        );

        if (hitSelf) {
            this.handleCollision();
            return;
        }

        // -----------------------------------------
        // CHECK FOOD
        // -----------------------------------------

        const ateFood =
            newHead.x === food.x &&
            newHead.y === food.y;

        let newSnake;

        if (ateFood) {
            // Add new head WITHOUT removing tail
            // This makes the snake grow.

            newSnake = [
                newHead,
                ...snake
            ];
        } else {
            // Normal movement
            newSnake = [
                newHead,
                ...snake.slice(0, -1)
            ];
        }

        // -----------------------------------------
        // UPDATE STATE
        // -----------------------------------------

        this.setState({
            snake: newSnake,
            direction: nextDirection
        });

        // -----------------------------------------
        // FOOD EATEN
        // -----------------------------------------

        if (ateFood) {
            this.handleFoodEaten(newSnake);
        }
    };

    // -----------------------------------------
    // FOOD EATEN
    // -----------------------------------------

    handleFoodEaten = (snake) => {
        const {
            score,
            xp
        } = this.state;

        this.setState({
            food: this.generateFood(snake),
            score: score + 10,
            xp: xp + 10
        });
    };

    // -----------------------------------------
    // COLLISION
    // -----------------------------------------

    handleCollision = () => {
        const {
            lives
        } = this.state;

        const remainingLives = lives - 1;

        if (remainingLives <= 0) {
            if (this.gameInterval) {
                clearInterval(this.gameInterval);
            }

            this.setState({
                lives: 0,
                gameOver: true
            });

            return;
        }

        // Reset snake position after collision

        this.setState({
            lives: remainingLives,

            snake: [
                { x: 5, y: 5 },
                { x: 4, y: 5 },
                { x: 3, y: 5 }
            ],

            direction: "RIGHT",
            nextDirection: "RIGHT"
        });
    };

    // -----------------------------------------
    // GENERATE FOOD
    // -----------------------------------------

    generateFood = (snake = this.state.snake) => {
        let food;

        let positionAvailable = false;

        while (!positionAvailable) {
            food = {
                x: Math.floor(
                    Math.random() * this.boardSize
                ),

                y: Math.floor(
                    Math.random() * this.boardSize
                )
            };

            positionAvailable = !snake.some(
                (segment) =>
                    segment.x === food.x &&
                    segment.y === food.y
            );
        }

        return food;
    };

    // -----------------------------------------
    // QUIZ ANSWER
    // -----------------------------------------

    handleAnswer = (index) => {
        const {
            answered,
            currentQuestion,
            questions
        } = this.state;

        if (answered) {
            return;
        }

        const question = questions[currentQuestion];

        const correct =
            index === question.answer;

        if (correct) {
            this.setState((prevState) => ({
                selectedAnswer: index,
                answered: true,
                score: prevState.score + 10,
                xp: prevState.xp + 10
            }));

            // Grow snake immediately after
            // correct answer.

            this.growSnake();

        } else {
            this.setState((prevState) => ({
                selectedAnswer: index,
                answered: true,
                lives: Math.max(
                    prevState.lives - 1,
                    0
                )
            }));
        }
    };

    // -----------------------------------------
    // GROW SNAKE
    // -----------------------------------------

    growSnake = () => {
        this.setState((prevState) => {
            const snake = [
                ...prevState.snake
            ];

            const tail =
                snake[snake.length - 1];

            // Add new segment at tail

            snake.push({
                x: tail.x,
                y: tail.y
            });

            return {
                snake
            };
        });
    };

    // -----------------------------------------
    // NEXT QUESTION
    // -----------------------------------------

    nextQuestion = () => {
        const {
            currentQuestion,
            questions
        } = this.state;

        if (
            currentQuestion >=
            questions.length - 1
        ) {
            if (this.gameInterval) {
                clearInterval(
                    this.gameInterval
                );
            }

            this.setState({
                finished: true
            });

            return;
        }

        this.setState({
            currentQuestion:
                currentQuestion + 1,

            selectedAnswer: null,
            answered: false
        });
    };

    // -----------------------------------------
    // RESTART GAME
    // -----------------------------------------

    restartGame = () => {
        if (this.gameInterval) {
            clearInterval(
                this.gameInterval
            );
        }

        this.setState(
            {
                currentQuestion: 0,

                snake: [
                    { x: 5, y: 5 },
                    { x: 4, y: 5 },
                    { x: 3, y: 5 }
                ],

                food: {
                    x: 10,
                    y: 5
                },

                direction: "RIGHT",
                nextDirection: "RIGHT",

                score: 0,
                xp: 0,
                lives: 3,

                selectedAnswer: null,
                answered: false,

                gameOver: false,
                finished: false,

                started: false
            }
        );
    };

    // -----------------------------------------
    // RENDER BOARD
    // -----------------------------------------

    renderBoard = () => {
        const {
            snake,
            food
        } = this.state;

        const cells = [];

        for (
            let y = 0;
            y < this.boardSize;
            y++
        ) {
            for (
                let x = 0;
                x < this.boardSize;
                x++
            ) {
                const snakeIndex =
                    snake.findIndex(
                        (segment) =>
                            segment.x === x &&
                            segment.y === y
                    );

                const isSnake =
                    snakeIndex !== -1;

                const isHead =
                    snakeIndex === 0;

                const isFood =
                    food.x === x &&
                    food.y === y;

                let className =
                    "snake-cell";

                if (isSnake) {
                    className +=
                        " snake-body";
                }

                if (isHead) {
                    className +=
                        " snake-head";
                }

                if (isFood) {
                    className +=
                        " snake-food";
                }

                cells.push(
                    <div
                        key={`${x}-${y}`}
                        className={className}
                    >
                        {isHead && "🐍"}

                        {isFood && !isSnake && "🍎"}
                    </div>
                );
            }
        }

        return cells;
    };

    // -----------------------------------------
    // RENDER START SCREEN
    // -----------------------------------------

    renderStartScreen = () => {
        return (
            <div className="snake-overlay">
                <div className="snake-start-card">

                    <div className="snake-big-icon">
                        🐍
                    </div>

                    <h1>
                        Python Snake
                    </h1>

                    <p>
                        Answer Python questions
                        correctly and grow your
                        snake!
                    </p>

                    <div className="snake-rules">

                        <div>
                            🧠 Answer correctly
                        </div>

                        <div>
                            🐍 Grow your snake
                        </div>

                        <div>
                            🍎 Eat the apples
                        </div>

                        <div>
                            ❤️ You have 3 lives
                        </div>

                    </div>

                    <button
                        className="snake-start-btn"
                        onClick={
                            this.startGame
                        }
                    >
                        🚀 Start Game
                    </button>

                    <p className="snake-keyboard-help">
                        Use ⬆️ ⬇️ ⬅️ ➡️
                        to move
                    </p>

                </div>
            </div>
        );
    };

    // -----------------------------------------
    // RENDER RESULT
    // -----------------------------------------

    renderResult = () => {
        const {
            score,
            xp,
            snake,
            lives,
            questions
        } = this.state;

        const maxScore =
            questions.length * 10;

        const percentage =
            maxScore > 0
                ? Math.round(
                      (score /
                          maxScore) *
                          100
                  )
                : 0;

        return (
            <div className="snake-result">

                <div className="result-icon">
                    🏆
                </div>

                <h1>
                    Great Job! 🎉
                </h1>

                <p>
                    You completed Python Snake!
                </p>

                <div className="result-stats">

                    <div className="result-stat">
                        <span>⭐</span>
                        <strong>
                            {score}
                        </strong>
                        <small>
                            Score
                        </small>
                    </div>

                    <div className="result-stat">
                        <span>💎</span>
                        <strong>
                            {xp}
                        </strong>
                        <small>
                            XP
                        </small>
                    </div>

                    <div className="result-stat">
                        <span>🐍</span>
                        <strong>
                            {snake.length}
                        </strong>
                        <small>
                            Snake Size
                        </small>
                    </div>

                    <div className="result-stat">
                        <span>❤️</span>
                        <strong>
                            {lives}
                        </strong>
                        <small>
                            Lives Left
                        </small>
                    </div>

                </div>

                <div className="result-progress">

                    <div
                        className="result-progress-fill"
                        style={{
                            width: `${percentage}%`
                        }}
                    />

                </div>

                <p>
                    You scored{" "}
                    <strong>
                        {percentage}%
                    </strong>
                </p>

                <div className="result-buttons">

                    <button
                        onClick={
                            this.restartGame
                        }
                    >
                        🔄 Play Again
                    </button>

                    <Link to="/games">
                        🎮 All Games
                    </Link>

                    <Link to="/quizzes">
                        🧠 Quizzes
                    </Link>

                </div>

            </div>
        );
    };

    // -----------------------------------------
    // RENDER GAME OVER
    // -----------------------------------------

    renderGameOver = () => {
        const {
            score,
            snake,
            lives
        } = this.state;

        return (
            <div className="snake-overlay">

                <div className="snake-gameover-card">

                    <div className="gameover-icon">
                        💥
                    </div>

                    <h1>
                        Game Over!
                    </h1>

                    <p>
                        Your snake had a
                        little adventure! 🐍
                    </p>

                    <div className="gameover-stats">

                        <div>
                            ⭐ {score}
                        </div>

                        <div>
                            🐍 {snake.length}
                        </div>

                        <div>
                            ❤️ {lives}
                        </div>

                    </div>

                    <button
                        onClick={
                            this.restartGame
                        }
                    >
                        🔄 Try Again
                    </button>

                    <Link to="/games">
                        🎮 Back to Games
                    </Link>

                </div>

            </div>
        );
    };

    // -----------------------------------------
    // RENDER DIRECTION CONTROLS
    // -----------------------------------------

    renderControls = () => {
        return (
            <div className="snake-controls">

                <button
                    onClick={() =>
                        this.changeDirection(
                            "UP"
                        )
                    }
                >
                    ⬆️
                </button>

                <div className="control-row">

                    <button
                        onClick={() =>
                            this.changeDirection(
                                "LEFT"
                            )
                        }
                    >
                        ⬅️
                    </button>

                    <button
                        onClick={() =>
                            this.changeDirection(
                                "DOWN"
                            )
                        }
                    >
                        ⬇️
                    </button>

                    <button
                        onClick={() =>
                            this.changeDirection(
                                "RIGHT"
                            )
                        }
                    >
                        ➡️
                    </button>

                </div>

            </div>
        );
    };

    // -----------------------------------------
    // MAIN RENDER
    // -----------------------------------------

    render() {
        const {
            questions,
            currentQuestion,
            snake,
            food,
            score,
            xp,
            lives,
            selectedAnswer,
            answered,
            gameOver,
            finished,
            started
        } = this.state;

        if (finished) {
            return (
                <div className="snake-page">
                    {this.renderResult()}
                </div>
            );
        }

        if (gameOver) {
            return (
                <div className="snake-page">
                    {this.renderGameOver()}
                </div>
            );
        }

        const question =
            questions[currentQuestion];

        if (!question) {
            return (
                <div className="snake-page">
                    <div className="snake-error">
                        No quiz questions found.
                    </div>
                </div>
            );
        }

        return (
            <div className="snake-page">

                {/* HEADER */}

                <header className="snake-header">

                    <div className="snake-header-left">

                        <Link
                            to="/games"
                            className="snake-back"
                        >
                            ← Games
                        </Link>

                        <h1>
                            🐍 Python Snake
                        </h1>

                    </div>

                    <div className="snake-stats">

                        <div className="snake-stat">
                            ⭐ {score}
                        </div>

                        <div className="snake-stat">
                            💎 {xp} XP
                        </div>

                        <div className="snake-stat">
                            🐍 {snake.length}
                        </div>

                        <div className="snake-stat">
                            {"❤️".repeat(lives)}
                        </div>

                    </div>

                </header>

                {/* GAME CONTENT */}

                <main className="snake-content">

                    <section className="snake-board-section">

                        <div className="snake-board">

                            {this.renderBoard()}

                        </div>

                        <p className="snake-instruction">
                            🎮 Use arrow keys to
                            move your snake
                        </p>

                        {started &&
                            this.renderControls()}

                    </section>

                    {/* QUESTION */}

                    <section className="snake-question-section">

                        <div className="question-topic">

                            {question.topicIcon}{" "}
                            {question.topic}

                        </div>

                        <div className="question-number">
                            Question{" "}
                            {currentQuestion + 1}{" "}
                            of{" "}
                            {questions.length}
                        </div>

                        <h2>
                            {question.question}
                        </h2>

                        <div className="snake-options">

                            {question.options.map(
                                (option, index) => {

                                    const isSelected =
                                        selectedAnswer ===
                                        index;

                                    const isCorrect =
                                        index ===
                                        question.answer;

                                    let optionClass =
                                        "snake-option";

                                    if (
                                        answered &&
                                        isCorrect
                                    ) {
                                        optionClass +=
                                            " correct";
                                    }

                                    if (
                                        answered &&
                                        isSelected &&
                                        !isCorrect
                                    ) {
                                        optionClass +=
                                            " wrong";
                                    }

                                    return (
                                        <button
                                            key={index}
                                            className={
                                                optionClass
                                            }
                                            onClick={() =>
                                                this.handleAnswer(
                                                    index
                                                )
                                            }
                                            disabled={
                                                answered
                                            }
                                        >
                                            <span>
                                                {String.fromCharCode(
                                                    65 +
                                                        index
                                                )}
                                            </span>

                                            {option}
                                        </button>
                                    );
                                }
                            )}

                        </div>

                        {/* FEEDBACK */}

                        {answered && (
                            <div
                                className={
                                    selectedAnswer ===
                                    question.answer
                                        ? "snake-feedback correct-feedback"
                                        : "snake-feedback wrong-feedback"
                                }
                            >

                                {selectedAnswer ===
                                question.answer ? (
                                    <>
                                        <strong>
                                            🎉 Correct!
                                        </strong>

                                        <p>
                                            Your snake
                                            grew! 🐍
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <strong>
                                            ❌ Not quite!
                                        </strong>

                                        <p>
                                            {
                                                question.explanation
                                            }
                                        </p>
                                    </>
                                )}

                            </div>
                        )}

                        {/* NEXT BUTTON */}

                        {answered && (
                            <button
                                className="next-question-btn"
                                onClick={
                                    this.nextQuestion
                                }
                            >
                                {currentQuestion <
                                questions.length -
                                    1
                                    ? "Next Question →"
                                    : "Finish Game 🏆"}
                            </button>
                        )}

                    </section>

                </main>

                {/* START OVERLAY */}

                {!started &&
                    this.renderStartScreen()}

            </div>
        );
    }
}

export default SnakeGame;