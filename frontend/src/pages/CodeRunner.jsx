import React, { Component } from "react";
import { Link } from "react-router-dom";
import runnerChallenges from "../data/runnerChallenges";
import "./CodeRunner.css";

// -----------------------------------------
// GAME SETTINGS
// All x positions are in "% of track width".
// -----------------------------------------

const PLAYER_X = 14;
const BASE_SPEED = 20;
const MAX_SPEED = 40;
const SPAWN_X = 108;
const JUMP_TIME = 0.62;
const JUMP_HEIGHT = 30;
const PICKUP_RANGE = 3.5;
const HIT_RANGE = 3.2;
const BOOST_TIME = 1.6;
const STUMBLE_TIME = 0.8;
const START_HEARTS = 3;
const BEST_KEY = "codeRunnerBest";

const LANES = [
    { name: "Top", icon: "⬆️" },
    { name: "Middle", icon: "⏺️" },
    { name: "Bottom", icon: "⬇️" }
];

const GAME_KEYS = [
    " ",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight"
];

function shuffle(list) {
    const copy = list.slice();

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}

function loadBest() {
    try {
        const raw = window.localStorage.getItem(BEST_KEY);

        if (!raw) {
            return { distance: 0, xp: 0 };
        }

        const parsed = JSON.parse(raw);

        return {
            distance: Number(parsed.distance) || 0,
            xp: Number(parsed.xp) || 0
        };
    } catch {
        return { distance: 0, xp: 0 };
    }
}

function saveBest(best) {
    try {
        window.localStorage.setItem(BEST_KEY, JSON.stringify(best));
    } catch {
        // Storage can be blocked (private mode) - the game still works.
    }
}

function toMeters(distance) {
    return Math.floor(distance / 4);
}

class CodeRunner extends Component {
    constructor(props) {
        super(props);

        this.trackRef = React.createRef();
        this.frameId = null;
        this.running = false;
        this.lastTime = 0;
        this.pointerStart = null;
        this.world = this.createWorld();

        this.state = {
            screen: "start",
            paused: false,
            frame: 0,
            best: loadBest(),
            result: null
        };
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("blur", this.autoPause);
        document.addEventListener("visibilitychange", this.handleVisibility);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
        window.removeEventListener("blur", this.autoPause);
        document.removeEventListener("visibilitychange", this.handleVisibility);
        this.stopLoop();
    }

    // -----------------------------------------
    // WORLD SETUP
    // -----------------------------------------

    createWorld = () => {
        return {
            distance: 0,
            speed: BASE_SPEED,
            boost: 0,
            stumble: 0,
            lane: 1,
            jumpT: 0,
            entities: [],
            nextId: 1,
            spawnGap: 25,
            challenge: null,
            nextChallengeIn: 2.5,
            feedback: null,
            toast: null,
            toastTime: 0,
            coins: 0,
            correct: 0,
            answered: 0,
            streak: 0,
            bestStreak: 0,
            xp: 0,
            hearts: START_HEARTS,
            lastMistake: null,
            deck: shuffle(runnerChallenges),
            deckPos: 0,
            trackWidth: 600
        };
    };

    // -----------------------------------------
    // LOOP CONTROL
    // -----------------------------------------

    startGame = () => {
        if (this.state.screen === "playing") {
            return;
        }

        this.stopLoop();
        this.world = this.createWorld();

        this.setState(
            {
                screen: "playing",
                paused: false,
                result: null
            },
            () => {
                this.lastTime = 0;
                this.running = true;
                this.frameId = requestAnimationFrame(this.loop);
            }
        );
    };

    stopLoop = () => {
        this.running = false;

        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }
    };

    loop = (time) => {
        if (!this.lastTime) {
            this.lastTime = time;
        }

        const dt = Math.min((time - this.lastTime) / 1000, 0.05);
        this.lastTime = time;

        if (!this.state.paused) {
            this.update(dt);
        }

        if (!this.running) {
            this.frameId = null;
            return;
        }

        this.setState((prev) => ({ frame: prev.frame + 1 }));
        this.frameId = requestAnimationFrame(this.loop);
    };

    togglePause = () => {
        if (this.state.screen !== "playing") {
            return;
        }

        this.lastTime = 0;
        this.setState((prev) => ({ paused: !prev.paused }));
    };

    autoPause = () => {
        if (this.state.screen === "playing" && !this.state.paused) {
            this.setState({ paused: true });
        }
    };

    handleVisibility = () => {
        if (document.hidden) {
            this.autoPause();
        }
    };

    // -----------------------------------------
    // GAME UPDATE (one frame)
    // -----------------------------------------

    getSpeed = () => {
        const w = this.world;
        let speed = w.speed;

        if (w.boost > 0) {
            speed *= 1.5;
        }

        if (w.stumble > 0) {
            speed *= 0.45;
        }

        return speed;
    };

    update = (dt) => {
        const w = this.world;

        if (this.trackRef.current) {
            w.trackWidth = this.trackRef.current.clientWidth || w.trackWidth;
        }

        // Timers
        w.boost = Math.max(0, w.boost - dt);
        w.stumble = Math.max(0, w.stumble - dt);
        w.toastTime = Math.max(0, w.toastTime - dt);

        if (w.jumpT > 0) {
            w.jumpT += dt;

            if (w.jumpT >= JUMP_TIME) {
                w.jumpT = 0;
            }
        }

        // Slowly speed up over time
        w.speed = Math.min(MAX_SPEED, w.speed + dt * 0.12);

        const move = this.getSpeed() * dt;
        w.distance += move;

        w.entities.forEach((entity) => {
            entity.x -= move;
        });

        this.spawnThings(move);
        this.updateChallenge(dt);
        this.checkCollisions();

        w.entities = w.entities.filter((entity) => entity.x > -25);

        if (w.hearts <= 0 && this.running) {
            this.endGame();
        }
    };

    spawnThings = (move) => {
        const w = this.world;

        w.spawnGap -= move;

        if (w.spawnGap > 0) {
            return;
        }

        // Keep the area around a gate clear
        const gateNear = w.entities.some(
            (entity) =>
                entity.type === "gate" &&
                entity.x > SPAWN_X - 16 &&
                entity.x < SPAWN_X + 30
        );

        if (gateNear) {
            w.spawnGap = 8;
            return;
        }

        const lane = Math.floor(Math.random() * 3);

        if (Math.random() < 0.38) {
            w.entities.push({
                id: w.nextId++,
                type: "rock",
                x: SPAWN_X,
                lane
            });

            w.spawnGap = 20 + Math.random() * 16;
        } else {
            const count = 3 + Math.floor(Math.random() * 3);

            for (let i = 0; i < count; i++) {
                w.entities.push({
                    id: w.nextId++,
                    type: "coin",
                    x: SPAWN_X + i * 5,
                    lane
                });
            }

            w.spawnGap = count * 5 + 10 + Math.random() * 10;
        }
    };

    nextChallenge = () => {
        const w = this.world;

        if (w.deckPos >= w.deck.length) {
            w.deck = shuffle(runnerChallenges);
            w.deckPos = 0;
        }

        const base = w.deck[w.deckPos];
        w.deckPos += 1;

        const correctText = base.options[base.answer];
        const options = shuffle(base.options);

        return {
            ...base,
            options,
            answer: options.indexOf(correctText)
        };
    };

    updateChallenge = (dt) => {
        const w = this.world;

        if (w.challenge) {
            return;
        }

        w.nextChallengeIn -= dt;

        if (w.nextChallengeIn > 0) {
            return;
        }

        const challenge = this.nextChallenge();

        // Give time to read: fewer seconds as you get better
        const readTime = Math.max(6.5, 10 - w.correct * 0.25);
        const gateX = PLAYER_X + this.getSpeed() * readTime;
        const gateId = w.nextId++;

        // Clear coins / rocks right around the gate
        w.entities = w.entities.filter(
            (entity) => Math.abs(entity.x - gateX) > 12
        );

        w.entities.push({
            id: gateId,
            type: "gate",
            x: gateX,
            options: challenge.options,
            answer: challenge.answer,
            resolved: false,
            picked: null
        });

        w.challenge = { ...challenge, gateId };
        w.feedback = null;
    };

    checkCollisions = () => {
        const w = this.world;
        const jumping = w.jumpT > 0;

        w.entities.forEach((entity) => {
            if (entity.type === "coin" && !entity.taken) {
                if (
                    entity.lane === w.lane &&
                    Math.abs(entity.x - PLAYER_X) < PICKUP_RANGE
                ) {
                    entity.taken = true;
                    w.coins += 1;
                    w.xp += 1;
                }
            }

            if (entity.type === "rock" && !entity.hit) {
                if (
                    !jumping &&
                    entity.lane === w.lane &&
                    Math.abs(entity.x - PLAYER_X) < HIT_RANGE
                ) {
                    entity.hit = true;
                    w.stumble = STUMBLE_TIME;
                    w.boost = 0;

                    const lost = Math.min(3, w.coins);
                    w.coins -= lost;

                    this.showToast(
                        lost > 0
                            ? `🧱 Ouch! -${lost} coins. Jump with Space!`
                            : "🧱 Ouch! Jump with Space!"
                    );
                }
            }

            if (
                entity.type === "gate" &&
                !entity.resolved &&
                entity.x <= PLAYER_X
            ) {
                this.resolveGate(entity);
            }
        });

        w.entities = w.entities.filter(
            (entity) => !(entity.type === "coin" && entity.taken)
        );
    };

    resolveGate = (gate) => {
        const w = this.world;
        const challenge = w.challenge;

        gate.resolved = true;
        gate.picked = w.lane;
        w.answered += 1;

        const isCorrect = w.lane === gate.answer;
        const output = gate.options[gate.answer];

        if (isCorrect) {
            w.correct += 1;
            w.streak += 1;
            w.bestStreak = Math.max(w.bestStreak, w.streak);

            const bonus = w.streak >= 3 ? 5 : 0;
            w.xp += 20 + bonus;

            w.speed = Math.min(MAX_SPEED, w.speed + 1.5);
            w.boost = BOOST_TIME;
            w.nextChallengeIn = 2.8;

            w.feedback = {
                correct: true,
                output,
                explanation: challenge ? challenge.explanation : "",
                xpGained: 20 + bonus
            };
        } else {
            w.hearts -= 1;
            w.streak = 0;
            w.nextChallengeIn = 4.5;

            w.feedback = {
                correct: false,
                output,
                explanation: challenge ? challenge.explanation : ""
            };

            if (challenge) {
                w.lastMistake = {
                    code: challenge.code,
                    output,
                    explanation: challenge.explanation
                };
            }
        }

        w.challenge = null;
    };

    showToast = (text) => {
        this.world.toast = text;
        this.world.toastTime = 1.6;
    };

    endGame = () => {
        const w = this.world;
        this.stopLoop();

        const distance = toMeters(w.distance);
        const prevBest = this.state.best;

        const newBest = {
            distance: Math.max(prevBest.distance, distance),
            xp: Math.max(prevBest.xp, w.xp)
        };

        saveBest(newBest);

        this.setState({
            screen: "over",
            paused: false,
            best: newBest,
            result: {
                distance,
                coins: w.coins,
                correct: w.correct,
                answered: w.answered,
                xp: w.xp,
                bestStreak: w.bestStreak,
                isNewBest:
                    distance > prevBest.distance ||
                    w.xp > prevBest.xp,
                lastMistake: w.lastMistake
            }
        });
    };

    // -----------------------------------------
    // PLAYER ACTIONS
    // -----------------------------------------

    canAct = () => {
        return this.state.screen === "playing" && !this.state.paused;
    };

    moveLane = (step) => {
        if (!this.canAct()) {
            return;
        }

        const w = this.world;
        w.lane = Math.max(0, Math.min(2, w.lane + step));
    };

    setLane = (lane) => {
        if (!this.canAct()) {
            return;
        }

        this.world.lane = lane;
    };

    jump = () => {
        if (!this.canAct()) {
            return;
        }

        if (this.world.jumpT === 0) {
            this.world.jumpT = 0.0001;
        }
    };

    // -----------------------------------------
    // KEYBOARD / TOUCH
    // -----------------------------------------

    handleKeyDown = (event) => {
        const { screen, paused } = this.state;
        const key = event.key;

        if (screen === "start") {
            if (key === " " || key === "Enter") {
                event.preventDefault();
                this.startGame();
            }

            return;
        }

        if (screen !== "playing") {
            return;
        }

        if (GAME_KEYS.includes(key)) {
            event.preventDefault();
        }

        if (key === "p" || key === "P" || key === "Escape") {
            this.togglePause();
            return;
        }

        if (paused) {
            if (key === " " || key === "Enter") {
                event.preventDefault();
                this.togglePause();
            }

            return;
        }

        if (key === "ArrowUp" || key === "w" || key === "W") {
            this.moveLane(-1);
        } else if (key === "ArrowDown" || key === "s" || key === "S") {
            this.moveLane(1);
        } else if (key === " " || key === "ArrowRight") {
            this.jump();
        }
    };

    handlePointerDown = (event) => {
        this.pointerStart = { x: event.clientX, y: event.clientY };
    };

    handlePointerUp = (event) => {
        if (!this.pointerStart) {
            return;
        }

        const dx = event.clientX - this.pointerStart.x;
        const dy = event.clientY - this.pointerStart.y;
        this.pointerStart = null;

        if (Math.abs(dy) > 25 && Math.abs(dy) > Math.abs(dx)) {
            this.moveLane(dy < 0 ? -1 : 1);
        } else {
            this.jump();
        }
    };

    // Buttons act on press (snappier on phones) and never keep focus,
    // so Space always means "jump" instead of re-clicking a button.
    pressButton = (action) => (event) => {
        event.preventDefault();
        action();
    };

    // -----------------------------------------
    // RENDER HELPERS
    // -----------------------------------------

    renderHeader = () => {
        const w = this.world;
        const hearts = [];

        for (let i = 0; i < START_HEARTS; i++) {
            hearts.push(i < w.hearts ? "❤️" : "🖤");
        }

        return (
            <header className="runner-header">
                <div className="runner-header-left">
                    <Link to="/games" className="runner-back">
                        ← Games
                    </Link>

                    <h1>🏃 Code Runner</h1>
                </div>

                <div className="runner-stats">
                    <div className="runner-stat">📏 {toMeters(w.distance)}m</div>
                    <div className="runner-stat">💰 {w.coins}</div>
                    <div className="runner-stat">💎 {w.xp} XP</div>
                    <div className="runner-stat runner-hearts">
                        {hearts.join("")}
                    </div>
                </div>
            </header>
        );
    };

    renderPanel = () => {
        const w = this.world;
        const challenge = w.challenge;

        if (challenge) {
            const gate = w.entities.find(
                (entity) => entity.id === challenge.gateId
            );

            const secondsLeft = gate
                ? Math.max(0, (gate.x - PLAYER_X) / this.getSpeed())
                : 0;

            return (
                <section className="runner-panel">
                    <div className="runner-panel-top">
                        <span className="runner-topic">🐍 {challenge.topic}</span>
                        <span className="runner-countdown">
                            🚪 Gate in {secondsLeft.toFixed(1)}s
                        </span>
                    </div>

                    <p className="runner-question">What does this print?</p>

                    <pre className="runner-code">
                        <code>{challenge.code}</code>
                    </pre>

                    <div className="runner-options">
                        {challenge.options.map((option, index) => (
                            <button
                                key={index}
                                type="button"
                                tabIndex={-1}
                                className={
                                    "runner-option lane-" +
                                    index +
                                    (w.lane === index ? " active" : "")
                                }
                                onPointerDown={this.pressButton(() =>
                                    this.setLane(index)
                                )}
                            >
                                <span className="runner-option-lane">
                                    {LANES[index].icon} {LANES[index].name}
                                </span>

                                <code>{option}</code>
                            </button>
                        ))}
                    </div>
                </section>
            );
        }

        const feedback = w.feedback;

        if (feedback) {
            return (
                <section
                    className={
                        "runner-panel runner-feedback " +
                        (feedback.correct ? "good" : "bad")
                    }
                >
                    <strong>
                        {feedback.correct
                            ? `🎉 Correct! +${feedback.xpGained} XP and a speed boost!`
                            : "❌ Oops! You lost a heart."}
                    </strong>

                    <p>
                        It prints <code>{feedback.output}</code>
                    </p>

                    <p className="runner-explain">💡 {feedback.explanation}</p>
                </section>
            );
        }

        return (
            <section className="runner-panel runner-idle">
                <strong>🏃 Keep running!</strong>

                <p>
                    Grab coins 💰 and jump over rocks 🧱. A Python
                    challenge is coming up next...
                </p>
            </section>
        );
    };

    renderEntity = (entity) => {
        const w = this.world;
        const px = (entity.x / 100) * w.trackWidth;

        if (entity.x > 125) {
            return null;
        }

        if (entity.type === "gate") {
            return (
                <div
                    key={entity.id}
                    className="runner-gate"
                    style={{ transform: `translate3d(${px}px, 0, 0)` }}
                >
                    {entity.options.map((option, index) => {
                        let cls = "runner-gate-pill lane-" + index;

                        if (entity.resolved) {
                            if (index === entity.answer) {
                                cls += " correct";
                            } else if (index === entity.picked) {
                                cls += " wrong";
                            } else {
                                cls += " faded";
                            }
                        }

                        return (
                            <div key={index} className="runner-gate-cell">
                                <div className={cls}>{option}</div>
                            </div>
                        );
                    })}
                </div>
            );
        }

        return (
            <div
                key={entity.id}
                className={
                    "runner-thing runner-" +
                    entity.type +
                    (entity.hit ? " hit" : "")
                }
                style={{
                    top: `${entity.lane * 33.333}%`,
                    transform: `translate3d(${px}px, 0, 0)`
                }}
            >
                <span>{entity.type === "coin" ? "💰" : "🧱"}</span>
            </div>
        );
    };

    renderTrack = () => {
        const w = this.world;
        const { paused, screen } = this.state;

        const jumpOffset =
            w.jumpT > 0
                ? Math.sin((Math.PI * w.jumpT) / JUMP_TIME) * JUMP_HEIGHT
                : 0;

        const groundShift = -(((w.distance / 100) * w.trackWidth) % 64);

        let playerClass = "runner-player";

        if (w.stumble > 0) {
            playerClass += " stumble";
        }

        if (w.boost > 0) {
            playerClass += " boost";
        }

        return (
            <div
                className="runner-track"
                ref={this.trackRef}
                onPointerDown={this.handlePointerDown}
                onPointerUp={this.handlePointerUp}
            >
                {LANES.map((lane, index) => (
                    <div
                        key={lane.name}
                        className={
                            "runner-lane" + (w.lane === index ? " current" : "")
                        }
                        style={{ backgroundPosition: `${groundShift}px 0` }}
                    />
                ))}

                {w.entities.map(this.renderEntity)}

                <div
                    className={playerClass}
                    style={{
                        top: `${w.lane * 33.333}%`,
                        left: `${PLAYER_X}%`
                    }}
                >
                    <div
                        className="runner-shadow"
                        style={{
                            transform: `translateX(-50%) scale(${1 - jumpOffset / 60})`
                        }}
                    />

                    <div
                        className="runner-body"
                        style={{
                            transform: `translate(-50%, ${-jumpOffset}px)`
                        }}
                    >
                        <span>🏃</span>
                    </div>
                </div>

                {w.toastTime > 0 && w.toast && (
                    <div className="runner-toast">{w.toast}</div>
                )}

                {screen === "playing" && paused && (
                    <div className="runner-pause">
                        <div className="runner-pause-card">
                            <div className="runner-pause-icon">⏸️</div>
                            <strong>Paused</strong>

                            <button
                                type="button"
                                onClick={this.togglePause}
                                onPointerDown={(event) => event.stopPropagation()}
                                onPointerUp={(event) => event.stopPropagation()}
                            >
                                ▶️ Resume
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    renderControls = () => {
        const { paused } = this.state;

        return (
            <div className="runner-controls">
                <button
                    type="button"
                    tabIndex={-1}
                    aria-label="Move up a lane"
                    onPointerDown={this.pressButton(() => this.moveLane(-1))}
                >
                    ⬆️
                </button>

                <button
                    type="button"
                    tabIndex={-1}
                    aria-label="Move down a lane"
                    onPointerDown={this.pressButton(() => this.moveLane(1))}
                >
                    ⬇️
                </button>

                <button
                    type="button"
                    tabIndex={-1}
                    className="runner-jump-btn"
                    aria-label="Jump"
                    onPointerDown={this.pressButton(this.jump)}
                >
                    🦘 Jump
                </button>

                <button
                    type="button"
                    tabIndex={-1}
                    aria-label={paused ? "Resume" : "Pause"}
                    onPointerDown={this.pressButton(this.togglePause)}
                >
                    {paused ? "▶️" : "⏸️"}
                </button>
            </div>
        );
    };

    renderStartScreen = () => {
        const { best } = this.state;

        return (
            <div className="runner-overlay">
                <div className="runner-start-card">
                    <div className="runner-big-icon">🏃</div>

                    <h1>Code Runner</h1>

                    <p>
                        Read the Python code, predict what it prints,
                        and run through the gate with the right answer!
                    </p>

                    <div className="runner-rules">
                        <div>🧠 Pick the right gate</div>
                        <div>⬆️ ⬇️ Switch lanes</div>
                        <div>🦘 Space / tap to jump</div>
                        <div>💰 Collect coins</div>
                        <div>🧱 Rocks slow you down</div>
                        <div>❤️ Wrong gate = -1 heart</div>
                    </div>

                    <button
                        type="button"
                        className="runner-start-btn"
                        onClick={this.startGame}
                    >
                        🚀 Start Running
                    </button>

                    <p className="runner-keyboard-help">
                        Phone: swipe up/down on the track, tap to jump.
                        P = pause.
                    </p>

                    {best.distance > 0 && (
                        <p className="runner-keyboard-help">
                            🏅 Best: {best.distance}m · {best.xp} XP
                        </p>
                    )}
                </div>
            </div>
        );
    };

    renderResult = () => {
        const { result, best } = this.state;

        if (!result) {
            return null;
        }

        const accuracy =
            result.answered > 0
                ? Math.round((result.correct / result.answered) * 100)
                : 0;

        return (
            <div className="runner-result">
                <div className="runner-result-icon">
                    {result.isNewBest ? "🏆" : "🏁"}
                </div>

                <h1>{result.isNewBest ? "New Best Run! 🎉" : "Great Run!"}</h1>

                <p>You ran out of hearts - but your brain got a workout!</p>

                <div className="runner-result-stats">
                    <div className="runner-result-stat">
                        <span>📏</span>
                        <strong>{result.distance}m</strong>
                        <small>Distance</small>
                    </div>

                    <div className="runner-result-stat">
                        <span>💰</span>
                        <strong>{result.coins}</strong>
                        <small>Coins</small>
                    </div>

                    <div className="runner-result-stat">
                        <span>✅</span>
                        <strong>
                            {result.correct}/{result.answered}
                        </strong>
                        <small>Correct</small>
                    </div>

                    <div className="runner-result-stat">
                        <span>💎</span>
                        <strong>{result.xp}</strong>
                        <small>XP</small>
                    </div>
                </div>

                <div className="runner-progress">
                    <div
                        className="runner-progress-fill"
                        style={{ width: `${accuracy}%` }}
                    />
                </div>

                <p className="runner-result-line">
                    Accuracy <strong>{accuracy}%</strong> · Best streak{" "}
                    <strong>{result.bestStreak}</strong>
                </p>

                <p className="runner-result-line">
                    🏅 Your best: {best.distance}m · {best.xp} XP
                </p>

                {result.lastMistake && (
                    <div className="runner-mistake">
                        <strong>Last tricky one:</strong>

                        <pre className="runner-code">
                            <code>{result.lastMistake.code}</code>
                        </pre>

                        <p>
                            It prints <code>{result.lastMistake.output}</code>
                        </p>

                        <p className="runner-explain">
                            💡 {result.lastMistake.explanation}
                        </p>
                    </div>
                )}

                <div className="runner-result-buttons">
                    <button type="button" onClick={this.startGame}>
                        🔄 Play Again
                    </button>

                    <Link to="/games">🎮 All Games</Link>

                    <Link to="/quizzes">🧠 Quizzes</Link>
                </div>
            </div>
        );
    };

    // -----------------------------------------
    // MAIN RENDER
    // -----------------------------------------

    render() {
        const { screen } = this.state;

        if (screen === "over") {
            return (
                <div className="runner-page">
                    {this.renderHeader()}
                    {this.renderResult()}
                </div>
            );
        }

        return (
            <div className="runner-page">
                {this.renderHeader()}

                <main className="runner-content">
                    {this.renderTrack()}
                    {this.renderControls()}
                    {this.renderPanel()}

                    <p className="runner-instruction">
                        ⬆️ ⬇️ switch lanes · Space jump · P pause
                    </p>
                </main>

                {screen === "start" && this.renderStartScreen()}
            </div>
        );
    }
}

export default CodeRunner;
