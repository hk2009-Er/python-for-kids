import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CodePuzzle.css";

class CodePuzzle extends Component {
    constructor(props) {
        super(props);

        this.puzzles = [
            {
                id: 1,
                title: "Print Your Name",
                description:
                    "Arrange the Python code to print a name.",
                code: [
                    'print("Python")',
                    'name = "Python"'
                ],
                answer: [
                    'name = "Python"',
                    'print("Python")'
                ],
                hint: "First create the variable, then print it.",
                explanation:
                    "We create the variable first and then use print() to display its value."
            },

            {
                id: 2,
                title: "Create a Greeting",
                description:
                    "Arrange the code to create a friendly greeting.",
                code: [
                    'print("Hello", name)',
                    'name = "Alex"'
                ],
                answer: [
                    'name = "Alex"',
                    'print("Hello", name)'
                ],
                hint: "Python needs to know what name is before printing it.",
                explanation:
                    "The variable must be created before we use it."
            },

            {
                id: 3,
                title: "Add Two Numbers",
                description:
                    "Put the code in the correct order.",
                code: [
                    "result = a + b",
                    "a = 10",
                    "b = 20",
                    "print(result)"
                ],
                answer: [
                    "a = 10",
                    "b = 20",
                    "result = a + b",
                    "print(result)"
                ],
                hint: "Create the numbers before adding them.",
                explanation:
                    "Python executes code from top to bottom, so a and b must exist before calculating result."
            },

            {
                id: 4,
                title: "Make a Decision",
                description:
                    "Arrange the code to check a number.",
                code: [
                    'print("Positive")',
                    "number = 10",
                    "if number > 0:"
                ],
                answer: [
                    "number = 10",
                    "if number > 0:",
                    'print("Positive")'
                ],
                hint: "First create the number, then check it.",
                explanation:
                    "The number is created first, then the if statement checks whether it is greater than zero."
            },

            {
                id: 5,
                title: "Python Loop",
                description:
                    "Arrange the code to print numbers from 1 to 3.",
                code: [
                    "    print(i)",
                    "for i in range(1, 4):"
                ],
                answer: [
                    "for i in range(1, 4):",
                    "    print(i)"
                ],
                hint: "The loop statement comes before the code inside it.",
                explanation:
                    "The for statement starts the loop and the indented print statement runs during each iteration."
            },

            {
                id: 6,
                title: "Create a Function",
                description:
                    "Arrange the code to create and call a function.",
                code: [
                    "greet()",
                    "def greet():",
                    '    print("Hello!")'
                ],
                answer: [
                    "def greet():",
                    '    print("Hello!")',
                    "greet()"
                ],
                hint: "Define the function before calling it.",
                explanation:
                    "Python needs the function definition before the function is called."
            },

            {
                id: 7,
                title: "List Example",
                description:
                    "Create a list and print it.",
                code: [
                    "print(fruits)",
                    'fruits = ["Apple", "Banana", "Mango"]'
                ],
                answer: [
                    'fruits = ["Apple", "Banana", "Mango"]',
                    "print(fruits)"
                ],
                hint: "Create the list before printing it.",
                explanation:
                    "The fruits variable must be assigned before Python can print it."
            },

            {
                id: 8,
                title: "Even or Odd",
                description:
                    "Arrange the code to check whether a number is even.",
                code: [
                    'print("Even")',
                    "if number % 2 == 0:",
                    "number = 8"
                ],
                answer: [
                    "number = 8",
                    "if number % 2 == 0:",
                    'print("Even")'
                ],
                hint: "The number must exist before the condition checks it.",
                explanation:
                    "We first assign the number, then check its remainder using the % operator."
            }
        ];

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

        const shuffledCode = this.shuffleArray([
            ...puzzle.code
        ]);

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

    shuffleArray = (array) => {
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

        const currentPuzzle =
            this.puzzles[this.state?.currentPuzzle || 0];

        if (
            currentPuzzle &&
            shuffled.join("|") ===
                currentPuzzle.answer.join("|")
        ) {
            return this.shuffleArray(array);
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
            currentCode,
            attempts
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