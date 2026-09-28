import React, { Component } from "react";
import { Link } from "react-router-dom";
import puzzleData from "../data/puzzleData";
import "./CodePuzzle.css";

class CodePuzzle extends Component {
    constructor(props) {
        super(props);

        this.puzzles = puzzleData;

        this.state = {
            currentPuzzle: 0,

            currentCode: [],

            selectedIndex: null,

            score: 0,

            xp: 0,

            lives: 3,

            hints: 2,

            attempts: 0,

            solved: 0,

            message: "",

            messageType: "",

            showHint: false,

            finished: false,

            gameOver: false
        };
    }

    componentDidMount() {
        this.loadPuzzle(0);
    }

    // =====================================================
    // LOAD PUZZLE
    // =====================================================

    loadPuzzle = (index) => {
        const puzzle = this.puzzles[index];

        const shuffledCode = this.shuffleArray(
            [...puzzle.code],
            puzzle
        );

        this.setState({
            currentPuzzle: index,

            currentCode: shuffledCode,

            selectedIndex: null,

            message: "",

            messageType: "",

            showHint: false
        });
    };

    // =====================================================
    // SHUFFLE
    // =====================================================

    shuffleArray = (array, puzzle) => {
        const shuffled = [...array];

        for (
            let i = shuffled.length - 1;
            i > 0;
            i--
        ) {
            const j = Math.floor(
                Math.random() * (i + 1)
            );

            [
                shuffled[i],
                shuffled[j]
            ] = [
                shuffled[j],
                shuffled[i]
            ];
        }

        // Make sure the puzzle isn't already solved
        if (
            puzzle &&
            shuffled.join("|") ===
                puzzle.answer.join("|")
        ) {
            return this.shuffleArray(array, puzzle);
        }

        return shuffled;
    };

    // =====================================================
    // SELECT CODE BLOCK
    // =====================================================

    selectBlock = (index) => {
        const {
            selectedIndex,
            currentCode
        } = this.state;

        if (selectedIndex === null) {
            this.setState({
                selectedIndex: index
            });

            return;
        }

        if (selectedIndex === index) {
            this.setState({
                selectedIndex: null
            });

            return;
        }

        const newCode = [...currentCode];

        const temp =
            newCode[selectedIndex];

        newCode[selectedIndex] =
            newCode[index];

        newCode[index] = temp;

        this.setState({
            currentCode: newCode,

            selectedIndex: null,

            message: "",

            messageType: ""
        });
    };

    // =====================================================
    // MOVE BLOCK UP
    // =====================================================

    moveUp = (index) => {
        if (index === 0) {
            return;
        }

        const newCode = [
            ...this.state.currentCode
        ];

        [
            newCode[index - 1],
            newCode[index]
        ] = [
            newCode[index],
            newCode[index - 1]
        ];

        this.setState({
            currentCode: newCode,

            selectedIndex: null
        });
    };

    // =====================================================
    // MOVE BLOCK DOWN
    // =====================================================

    moveDown = (index) => {
        const {
            currentCode
        } = this.state;

        if (
            index ===
            currentCode.length - 1
        ) {
            return;
        }

        const newCode = [
            ...currentCode
        ];

        [
            newCode[index],
            newCode[index + 1]
        ] = [
            newCode[index + 1],
            newCode[index]
        ];

        this.setState({
            currentCode: newCode,

            selectedIndex: null
        });
    };

    // =====================================================
    // CHECK ANSWER
    // =====================================================

    checkAnswer = () => {
        const {
            currentPuzzle,
            currentCode
        } = this.state;

        const puzzle =
            this.puzzles[currentPuzzle];

        const correct =
            currentCode.join("|") ===
            puzzle.answer.join("|");

        if (correct) {
            this.setState((prevState) => ({
                score:
                    prevState.score + 100,

                xp:
                    prevState.xp + 25,

                solved:
                    prevState.solved + 1,

                attempts:
                    prevState.attempts + 1,

                message:
                    "🎉 Correct! Amazing coding!",

                messageType:
                    "success"
            }));

            return;
        }

        this.setState((prevState) => {
            const newLives =
                prevState.lives - 1;

            return {
                lives: newLives,

                attempts:
                    prevState.attempts + 1,

                message:
                    newLives <= 0
                        ? "💥 Out of lives!"
                        : "❌ Not quite! Try again.",

                messageType:
                    "error",

                gameOver:
                    newLives <= 0
            };
        });
    };

    // =====================================================
    // NEXT PUZZLE
    // =====================================================

    nextPuzzle = () => {
        const {
            currentPuzzle
        } = this.state;

        const next =
            currentPuzzle + 1;

        if (next >= this.puzzles.length) {
            this.setState({
                finished: true
            });

            return;
        }

        this.loadPuzzle(next);
    };

    // =====================================================
    // HINT
    // =====================================================

    useHint = () => {
        const {
            hints,
            currentPuzzle
        } = this.state;

        if (hints <= 0) {
            this.setState({
                message:
                    "💡 You have no hints left!",
                messageType:
                    "warning"
            });

            return;
        }

        const puzzle =
            this.puzzles[currentPuzzle];

        this.setState((prevState) => ({
            hints:
                prevState.hints - 1,

            showHint: true,

            score:
                Math.max(
                    prevState.score - 25,
                    0
                ),

            message:
                `💡 Hint: ${puzzle.hint}`,

            messageType:
                "hint"
        }));
    };

    // =====================================================
    // RESTART
    // =====================================================

    restartGame = () => {
        this.setState({
            currentPuzzle: 0,

            currentCode: [],

            selectedIndex: null,

            score: 0,

            xp: 0,

            lives: 3,

            hints: 2,

            attempts: 0,

            solved: 0,

            message: "",

            messageType: "",

            showHint: false,

            finished: false,

            gameOver: false
        }, () => {
            this.loadPuzzle(0);
        });
    };

    // =====================================================
    // RENDER CODE BLOCK
    // =====================================================

    renderCodeBlock = (
        code,
        index
    ) => {
        const {
            selectedIndex
        } = this.state;

        const selected =
            selectedIndex === index;

        return (
            <div
                key={`${code}-${index}`}
                className={
                    selected
                        ? "code-block selected"
                        : "code-block"
                }
            >
                <button
                    className="code-block-main"
                    onClick={() =>
                        this.selectBlock(index)
                    }
                >
                    <span className="code-number">
                        {index + 1}
                    </span>

                    <code>
                        {code}
                    </code>
                </button>

                <div className="code-block-arrows">

                    <button
                        onClick={() =>
                            this.moveUp(index)
                        }
                        disabled={
                            index === 0
                        }
                        title="Move up"
                    >
                        ▲
                    </button>

                    <button
                        onClick={() =>
                            this.moveDown(index)
                        }
                        disabled={
                            index ===
                            this.state
                                .currentCode
                                .length -
                                1
                        }
                        title="Move down"
                    >
                        ▼
                    </button>

                </div>
            </div>
        );
    };

    // =====================================================
    // RESULT SCREEN
    // =====================================================

    renderResult = () => {
        const {
            score,
            xp,
            solved,
            attempts
        } = this.state;

        const percentage =
            Math.round(
                (solved /
                    this.puzzles.length) *
                    100
            );

        return (
            <div className="code-puzzle-result">

                <div className="puzzle-result-icon">
                    🏆
                </div>

                <h1>
                    Puzzle Master! 🎉
                </h1>

                <p>
                    You completed all the
                    Python code puzzles!
                </p>

                <div className="puzzle-result-stats">

                    <div>
                        <span>⭐</span>
                        <strong>
                            {score}
                        </strong>
                        <small>
                            Score
                        </small>
                    </div>

                    <div>
                        <span>💎</span>
                        <strong>
                            {xp}
                        </strong>
                        <small>
                            XP
                        </small>
                    </div>

                    <div>
                        <span>🧩</span>
                        <strong>
                            {solved}
                        </strong>
                        <small>
                            Solved
                        </small>
                    </div>

                    <div>
                        <span>🎯</span>
                        <strong>
                            {attempts}
                        </strong>
                        <small>
                            Attempts
                        </small>
                    </div>

                </div>

                <div className="puzzle-percentage">
                    {percentage}%
                </div>

                <p className="result-message">
                    Keep practicing and
                    become a Python expert! 🐍
                </p>

                <div className="puzzle-result-buttons">

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

    // =====================================================
    // GAME OVER
    // =====================================================

    renderGameOver = () => {
        const {
            score,
            solved
        } = this.state;

        return (
            <div className="code-puzzle-overlay">

                <div className="code-gameover-card">

                    <div className="gameover-icon">
                        💥
                    </div>

                    <h1>
                        Game Over!
                    </h1>

                    <p>
                        Don't worry! Every
                        programmer makes mistakes.
                        💻
                    </p>

                    <div className="gameover-info">

                        <div>
                            ⭐ {score}
                        </div>

                        <div>
                            🧩 {solved}
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

    // =====================================================
    // MAIN RENDER
    // =====================================================

    render() {
        const {
            currentPuzzle,
            currentCode,
            selectedIndex,
            score,
            xp,
            lives,
            hints,
            message,
            messageType,
            finished,
            gameOver
        } = this.state;

        if (finished) {
            return (
                <div className="code-puzzle-page">
                    {this.renderResult()}
                </div>
            );
        }

        if (gameOver) {
            return (
                <div className="code-puzzle-page">
                    {this.renderGameOver()}
                </div>
            );
        }

        const puzzle =
            this.puzzles[currentPuzzle];

        return (
            <div className="code-puzzle-page">

                {/* HEADER */}

                <header className="code-puzzle-header">

                    <div className="code-puzzle-header-left">

                        <Link
                            to="/games"
                            className="code-puzzle-back"
                        >
                            ← Games
                        </Link>

                        <h1>
                            🧩 Code Puzzle
                        </h1>

                    </div>

                    <div className="code-puzzle-stats">

                        <div className="puzzle-stat">
                            ⭐ {score}
                        </div>

                        <div className="puzzle-stat">
                            💎 {xp} XP
                        </div>

                        <div className="puzzle-stat">
                            ❤️ {"❤️".repeat(lives)}
                        </div>

                        <div className="puzzle-stat">
                            💡 {hints}
                        </div>

                    </div>

                </header>

                {/* PROGRESS */}

                <div className="puzzle-progress-container">

                    <div className="puzzle-progress-text">
                        Puzzle{" "}
                        {currentPuzzle + 1}
                        {" "}
                        of{" "}
                        {this.puzzles.length}
                    </div>

                    <div className="puzzle-progress">

                        <div
                            className="puzzle-progress-fill"
                            style={{
                                width: `${
                                    ((currentPuzzle + 1) /
                                        this.puzzles.length) *
                                    100
                                }%`
                            }}
                        />

                    </div>

                </div>

                {/* MAIN */}

                <main className="code-puzzle-content">

                    {/* LEFT */}

                    <section className="puzzle-info">

                        <div className="puzzle-icon">
                            🧩
                        </div>

                        <div className="puzzle-level">
                            PYTHON PUZZLE
                        </div>

                        <h2>
                            {puzzle.title}
                        </h2>

                        <p>
                            {puzzle.description}
                        </p>

                        <div className="puzzle-tip">

                            <span>
                                💡
                            </span>

                            <div>
                                <strong>
                                    How to play
                                </strong>

                                <p>
                                    Click a code block
                                    and then another
                                    block to swap them.
                                    You can also use
                                    the ▲ ▼ buttons.
                                </p>
                            </div>

                        </div>

                        <button
                            className="hint-button"
                            onClick={
                                this.useHint
                            }
                            disabled={
                                hints <= 0
                            }
                        >
                            💡 Get Hint
                            {" "}
                            ({hints} left)
                        </button>

                    </section>

                    {/* RIGHT */}

                    <section className="puzzle-workspace">

                        <div className="workspace-header">

                            <div>
                                <span>
                                    🐍
                                </span>

                                <strong>
                                    Arrange the code
                                </strong>
                            </div>

                            <span className="drag-text">
                                Click to swap
                            </span>

                        </div>

                        <div className="code-blocks">

                            {currentCode.map(
                                (
                                    code,
                                    index
                                ) =>
                                    this.renderCodeBlock(
                                        code,
                                        index
                                    )
                            )}

                        </div>

                        {selectedIndex !== null && (
                            <div className="selection-message">
                                ✨ Now click another
                                block to swap them!
                            </div>
                        )}

                        {/* FEEDBACK */}

                        {message && (
                            <div
                                className={`puzzle-message ${messageType}`}
                            >
                                {message}
                            </div>
                        )}

                        {/* EXPLANATION */}

                        {messageType ===
                            "success" && (
                            <div className="puzzle-explanation">

                                <strong>
                                    🧠 Why?
                                </strong>

                                <p>
                                    {
                                        puzzle.explanation
                                    }
                                </p>

                            </div>
                        )}

                        {/* BUTTONS */}

                        <div className="puzzle-actions">

                            {messageType !==
                                "success" && (
                                <button
                                    className="check-button"
                                    onClick={
                                        this.checkAnswer
                                    }
                                >
                                    ✅ Check Answer
                                </button>
                            )}

                            {messageType ===
                                "success" && (
                                <button
                                    className="next-puzzle-button"
                                    onClick={
                                        this.nextPuzzle
                                    }
                                >
                                    {currentPuzzle <
                                    this.puzzles.length -
                                        1
                                        ? "Next Puzzle →"
                                        : "Finish Game 🏆"}
                                </button>
                            )}

                        </div>

                    </section>

                </main>

            </div>
        );
    }
}

export default CodePuzzle;