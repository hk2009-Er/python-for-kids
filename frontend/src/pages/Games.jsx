 
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Games.css";

class Games extends Component {
    games = [
        {
            id: "python-snake",
            title: "Python Snake",
            icon: "🐍",
            description:
                "Answer Python questions correctly and help your snake grow!",
            difficulty: "Beginner",
            colorClass: "game-green",
            action: "Play Snake"
        },
        {
            id: "code-puzzle",
            title: "Code Puzzle",
            icon: "🧩",
            description:
                "Arrange Python code blocks in the correct order and build working programs.",
            difficulty: "Beginner",
            colorClass: "game-purple",
            action: "Solve Puzzle"
        },
        {
            id: "python-catch",
            title: "Python Catch",
            icon: "🎯",
            description:
                "Catch the correct answer before the timer runs out!",
            difficulty: "Beginner",
            colorClass: "game-blue",
            action: "Start Game"
        },
        {
            id: "space-python",
            title: "Space Python",
            icon: "🚀",
            description:
                "Answer Python questions to launch your rocket through space.",
            difficulty: "Intermediate",
            colorClass: "game-orange",
            action: "Launch Rocket"
        },
        {
            id: "code-runner",
            title: "Code Runner",
            icon: "🏃",
            description:
                "Run through coding challenges and collect points along the way.",
            difficulty: "Intermediate",
            colorClass: "game-pink",
            action: "Start Running"
        }
    ];

    render() {
        return (
            <div className="games-page">

                {/* HERO */}
                <section className="games-hero">

                    <div className="games-hero-content">

                        <div className="games-emoji">
                            🎮
                        </div>

                        <div>
                            <h1>
                                Python <span>Game Zone</span>
                            </h1>

                            <p>
                                Learn Python by playing fun and interactive games!
                            </p>
                        </div>

                    </div>

                    <div className="games-stats">

                        <div className="game-stat">
                            <span>🎮</span>
                            <strong>5</strong>
                            <small>Games</small>
                        </div>

                        <div className="game-stat">
                            <span>⭐</span>
                            <strong>XP</strong>
                            <small>Earn Rewards</small>
                        </div>

                        <div className="game-stat">
                            <span>🏆</span>
                            <strong>∞</strong>
                            <small>Challenges</small>
                        </div>

                    </div>

                </section>


                {/* GAME GRID */}
                <section className="games-section">

                    <div className="section-heading">

                        <div>
                            <h2>Choose Your Game 🎮</h2>

                            <p>
                                Practice Python while having fun!
                            </p>
                        </div>

                    </div>


                    <div className="games-grid">

                        {this.games.map((game) => (

                            <div
                                className={`game-card ${game.colorClass}`}
                                key={game.id}
                            >

                                {/* CARD ICON */}
                                <div className="game-card-icon">
                                    {game.icon}
                                </div>


                                {/* DIFFICULTY */}
                                <div className="game-difficulty">
                                    {game.difficulty}
                                </div>


                                {/* CONTENT */}
                                <div className="game-card-content">

                                    <h3>
                                        {game.title}
                                    </h3>

                                    <p>
                                        {game.description}
                                    </p>

                                </div>


                                {/* REWARD */}
                                <div className="game-reward">
                                    <span>⭐</span>
                                    Earn XP
                                </div>


                                {/* BUTTON */}
                                <Link
                                    to={`/game/${game.id}`}
                                    className="game-play-button"
                                >
                                    {game.action}
                                    <span>→</span>
                                </Link>

                            </div>

                        ))}

                    </div>

                </section>


                {/* MOTIVATION */}
                <section className="games-motivation">

                    <div className="motivation-icon">
                        🧠
                    </div>

                    <div>
                        <h2>
                            Learn → Play → Practice → Master 🚀
                        </h2>

                        <p>
                            Every game helps you improve your Python skills
                            while earning XP and unlocking achievements.
                        </p>
                    </div>

                </section>

            </div>
        );
    }
}

export default Games;
 
