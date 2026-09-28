import React, { Component } from "react";
import { Link } from "react-router-dom";
import lessonData from "../data/lessonData";
import "./SpacePython.css";

// -----------------------------------------
// GAME SETTINGS
// -----------------------------------------

const PLANETS = [
    { name: "Earth Orbit", icon: "🌍" },
    { name: "Moon", icon: "🌙" },
    { name: "Mars", icon: "🔴" },
    { name: "Jupiter", icon: "🟠" },
    { name: "Saturn", icon: "🪐" },
    { name: "Uranus", icon: "🔵" },
    { name: "Neptune", icon: "🌊" },
    { name: "Pluto", icon: "❄️" },
    { name: "Deep Space", icon: "🌌" }
];

const CORRECT_PER_PLANET = 3;
const MAX_SHIELDS = 3;
const ROCKET_Y = 0.9;
const ROCKET_SPEED = 0.95; // field widths per second
const BULLET_SPEED = 1.35; // field heights per second
const FIRE_COOLDOWN = 0.22;
const BASE_SPEED = 0.055; // field heights per second
const SPEED_STEP = 0.006;
const MAX_SPEED = 0.17;
const CORRECT_PAUSE = 1.3;
const WRONG_PAUSE = 8;
const BEST_KEY = "spacePythonBest";
const LETTERS = ["A", "B", "C", "D", "E", "F"];

const getPlanetIndex = (correct) =>
    Math.min(
        Math.floor(correct / CORRECT_PER_PLANET),
        PLANETS.length - 1
    );

const shuffle = (list) => {
    const copy = [...list];

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
};

const clamp = (value, min, max) =>
    Math.max(min, Math.min(max, value));

const loadBest = () => {
    try {
        const raw = window.localStorage.getItem(BEST_KEY);
        const parsed = raw ? JSON.parse(raw) : null;

        return {
            score: Number(parsed && parsed.score) || 0,
            planet: Number(parsed && parsed.planet) || 0
        };
    } catch {
        return { score: 0, planet: 0 };
    }
};

const saveBest = (best) => {
    try {
        window.localStorage.setItem(BEST_KEY, JSON.stringify(best));
    } catch {
        // Storage can be blocked (private mode) - ignore.
    }
};

const createWorld = () => ({
    gt: 0,
    rocketX: 0.5,
    asteroids: [],
    bullets: [],
    booms: [],
    lastShot: -10,
    phase: "flying",
    feedback: null,
    feedbackUntil: 0,
    toast: null,
    shakeUntil: 0,
    nextId: 1
});

class SpacePython extends Component {
    constructor(props) {
        super(props);

        this.fieldRef = React.createRef();
        this.dims = { w: 0, h: 0 };
        this.keys = { left: false, right: false };
        this.touchDir = 0;
        this.pointer = null;
        this.raf = null;
        this.lastTs = null;
        this.world = createWorld();

        this.state = {
            screen: "start",
            topic: "all",
            questions: [],
            qIndex: 0,
            score: 0,
            xp: 0,
            shields: MAX_SHIELDS,
            correct: 0,
            answered: 0,
            streak: 0,
            bestStreak: 0,
            paused: false,
            endReason: null,
            best: loadBest(),
            newBest: false,
            frame: 0
        };
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keyup", this.handleKeyUp);
        window.addEventListener("blur", this.handleBlur);
        window.addEventListener("resize", this.measure);

        if (typeof ResizeObserver !== "undefined") {
            this.resizeObserver = new ResizeObserver(this.measure);
        }

        this.observeField();
        this.raf = requestAnimationFrame(this.loop);
    }

    componentDidUpdate() {
        this.observeField();
    }

    observeField = () => {
        const field = this.fieldRef.current;

        if (this.resizeObserver && field && field !== this.observedField) {
            this.resizeObserver.disconnect();
            this.resizeObserver.observe(field);
            this.observedField = field;
            this.measure();
        }
    };

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
        document.removeEventListener("keyup", this.handleKeyUp);
        window.removeEventListener("blur", this.handleBlur);
        window.removeEventListener("resize", this.measure);

        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }

        if (this.raf) {
            cancelAnimationFrame(this.raf);
        }
    }

    // -----------------------------------------
    // QUESTIONS & TOPICS
    // -----------------------------------------

    getTopics = () =>
        lessonData
            .filter((topic) => topic.quiz && topic.quiz.length > 0)
            .map((topic) => ({
                key: String(topic.slug || topic.id || topic.title),
                title: topic.title,
                icon: topic.icon,
                count: topic.quiz.length
            }));

    getQuestions = (topicKey) => {
        const questions = [];

        lessonData.forEach((topic) => {
            const key = String(topic.slug || topic.id || topic.title);

            if (topicKey !== "all" && key !== topicKey) {
                return;
            }

            if (topic.quiz && topic.quiz.length > 0) {
                topic.quiz.forEach((quiz) => {
                    if (quiz && Array.isArray(quiz.options) && quiz.options.length > 0) {
                        questions.push({
                            ...quiz,
                            topic: topic.title,
                            topicIcon: topic.icon
                        });
                    }
                });
            }
        });

        return shuffle(questions);
    };

    // -----------------------------------------
    // SIZE OF THE PLAY FIELD
    // -----------------------------------------

    measure = () => {
        const field = this.fieldRef.current;

        if (!field) {
            return;
        }

        const rect = field.getBoundingClientRect();
        this.dims = { w: rect.width, h: rect.height };
    };

    getRadius = () =>
        clamp(this.dims.w * 0.075, 24, 42);

    // -----------------------------------------
    // START / RESTART
    // -----------------------------------------

    selectTopic = (topic) => {
        this.setState({ topic });
    };

    startGame = () => {
        const questions = this.getQuestions(this.state.topic);

        if (questions.length === 0) {
            return;
        }

        this.world = createWorld();
        this.keys = { left: false, right: false };
        this.touchDir = 0;

        this.setState(
            {
                screen: "playing",
                questions,
                qIndex: 0,
                score: 0,
                xp: 0,
                shields: MAX_SHIELDS,
                correct: 0,
                answered: 0,
                streak: 0,
                bestStreak: 0,
                paused: false,
                endReason: null,
                newBest: false
            },
            () => {
                this.measure();
                this.spawnRound(questions[0]);
            }
        );
    };

    backToStart = () => {
        this.setState({ screen: "start", paused: false });
    };

    // -----------------------------------------
    // ROUNDS
    // -----------------------------------------

    spawnRound = (question) => {
        const w = this.world;
        const count = question.options.length;
        const lanes = shuffle(
            question.options.map((_, i) => 0.1 + (0.8 * (i + 0.5)) / count)
        );

        w.asteroids = question.options.map((_, index) => ({
            id: w.nextId++,
            index,
            correct: index === question.answer,
            baseX: lanes[index],
            x: lanes[index],
            y: -0.02 - Math.random() * 0.12,
            speedMul: 0.85 + Math.random() * 0.3,
            wobble: 0.012 + Math.random() * 0.018,
            freq: 0.8 + Math.random() * 1.2,
            phase: Math.random() * Math.PI * 2,
            spin: Math.random() > 0.5 ? 1 : -1,
            gone: false
        }));

        w.bullets = [];
        w.phase = "flying";
        w.feedback = null;
    };

    getFallSpeed = () =>
        Math.min(
            BASE_SPEED + SPEED_STEP * this.state.correct,
            MAX_SPEED
        );

    resolveRound = (type, asteroid) => {
        const w = this.world;
        const { questions, qIndex, correct, score, xp, shields, streak, bestStreak } = this.state;
        const question = questions[qIndex];

        if (!question || w.phase !== "flying") {
            return;
        }

        w.bullets = [];

        if (asteroid) {
            asteroid.gone = true;
            w.booms.push({
                id: w.nextId++,
                x: asteroid.x,
                y: asteroid.y,
                t: w.gt,
                good: type === "correct"
            });
        }

        if (type === "correct") {
            const heightBonus = Math.round(clamp(1 - asteroid.y, 0, 1) * 10);
            const newStreak = streak + 1;
            const streakBonus = Math.min(newStreak - 1, 5) * 2;
            const gained = 10 + heightBonus + streakBonus;
            const newCorrect = correct + 1;
            const oldPlanet = getPlanetIndex(correct);
            const newPlanet = getPlanetIndex(newCorrect);

            w.asteroids.forEach((a) => {
                if (!a.gone) {
                    a.fading = true;
                }
            });

            if (newPlanet > oldPlanet) {
                w.toast = {
                    text: `${PLANETS[newPlanet].icon} You reached ${PLANETS[newPlanet].name}!`,
                    until: w.gt + 2.6
                };
            }

            w.phase = "feedback";
            w.feedback = { type, gained, question };
            w.feedbackUntil = w.gt + CORRECT_PAUSE;

            this.setState({
                score: score + gained,
                xp: xp + 10,
                correct: newCorrect,
                answered: this.state.answered + 1,
                streak: newStreak,
                bestStreak: Math.max(bestStreak, newStreak)
            });

            return;
        }

        // Wrong asteroid hit, or the correct asteroid escaped.
        const newShields = Math.max(shields - 1, 0);

        w.asteroids.forEach((a) => {
            if (!a.gone && !a.correct) {
                a.fading = true;
            }
        });

        w.phase = "feedback";
        w.feedback = {
            type,
            question,
            hitIndex: asteroid && type === "wrong" ? asteroid.index : null,
            last: newShields <= 0
        };
        w.feedbackUntil = w.gt + WRONG_PAUSE;
        w.shakeUntil = w.gt + 0.45;

        this.setState({
            shields: newShields,
            answered: this.state.answered + 1,
            streak: 0
        });
    };

    continueRound = () => {
        const w = this.world;

        if (this.state.screen !== "playing" || w.phase !== "feedback") {
            return;
        }

        const { shields, qIndex, questions } = this.state;

        if (shields <= 0) {
            this.endGame("crash");
            return;
        }

        if (qIndex + 1 >= questions.length) {
            this.endGame("complete");
            return;
        }

        const nextIndex = qIndex + 1;
        w.phase = "loading";

        this.setState({ qIndex: nextIndex }, () => {
            this.spawnRound(questions[nextIndex]);
        });
    };

    endGame = (endReason) => {
        const { score, correct, best } = this.state;
        const planet = getPlanetIndex(correct);
        const newBest = score > best.score;
        const updated = {
            score: Math.max(score, best.score),
            planet: Math.max(planet, best.planet)
        };

        saveBest(updated);

        this.world.phase = "over";
        this.keys = { left: false, right: false };
        this.touchDir = 0;

        this.setState({
            screen: "results",
            endReason,
            paused: false,
            best: updated,
            newBest
        });
    };

    // -----------------------------------------
    // GAME LOOP
    // -----------------------------------------

    loop = (ts) => {
        this.raf = requestAnimationFrame(this.loop);

        const last = this.lastTs === null ? ts : this.lastTs;
        const dt = Math.min((ts - last) / 1000, 0.05);
        this.lastTs = ts;

        const { screen, paused } = this.state;

        if (screen !== "playing" || paused) {
            return;
        }

        if (!this.dims.w || !this.dims.h) {
            this.measure();

            if (!this.dims.w || !this.dims.h) {
                return;
            }
        }

        const w = this.world;
        const W = this.dims.w;
        const H = this.dims.h;
        const r = this.getRadius();

        w.gt += dt;

        // Rocket movement
        let dir = this.touchDir;

        if (this.keys.left) {
            dir -= 1;
        }

        if (this.keys.right) {
            dir += 1;
        }

        dir = clamp(dir, -1, 1);

        if (dir !== 0) {
            w.rocketX = clamp(w.rocketX + dir * ROCKET_SPEED * dt, 0.06, 0.94);
        }

        // Bullets
        w.bullets.forEach((b) => {
            b.y -= BULLET_SPEED * dt;
        });
        w.bullets = w.bullets.filter((b) => b.y > -0.05);

        // Explosions
        w.booms = w.booms.filter((b) => w.gt - b.t < 0.8);

        if (w.toast && w.gt > w.toast.until) {
            w.toast = null;
        }

        if (w.phase === "flying") {
            const speed = this.getFallSpeed();

            w.asteroids.forEach((a) => {
                if (a.gone) {
                    return;
                }

                a.y += speed * a.speedMul * dt;
                a.x = clamp(
                    a.baseX + Math.sin(w.gt * a.freq + a.phase) * a.wobble,
                    0.05,
                    0.95
                );
            });

            // Bullet collisions
            let hit = null;

            for (let i = 0; i < w.bullets.length && !hit; i++) {
                const b = w.bullets[i];

                for (let j = 0; j < w.asteroids.length; j++) {
                    const a = w.asteroids[j];

                    if (a.gone || a.y < -0.02) {
                        continue;
                    }

                    const dx = (b.x - a.x) * W;
                    const dy = (b.y - a.y) * H;

                    if (dx * dx + dy * dy < r * r) {
                        hit = a;
                        break;
                    }
                }
            }

            if (hit) {
                this.resolveRound(hit.correct ? "correct" : "wrong", hit);
            } else {
                // Asteroids reaching the bottom
                const bottom = ROCKET_Y + r / H * 0.5;
                const escaped = w.asteroids.find(
                    (a) => !a.gone && a.correct && a.y > bottom
                );

                w.asteroids.forEach((a) => {
                    if (!a.gone && !a.correct && a.y > bottom) {
                        a.gone = true;
                    }
                });

                if (escaped) {
                    escaped.gone = true;
                    this.resolveRound("miss", null);
                }
            }
        } else if (w.phase === "feedback" && w.gt >= w.feedbackUntil) {
            this.continueRound();
        }

        this.setState((prev) => ({ frame: prev.frame + 1 }));
    };

    // -----------------------------------------
    // CONTROLS
    // -----------------------------------------

    fire = () => {
        const w = this.world;

        if (this.state.screen !== "playing" || this.state.paused) {
            return;
        }

        if (w.phase === "feedback") {
            return;
        }

        if (w.phase !== "flying" || w.gt - w.lastShot < FIRE_COOLDOWN) {
            return;
        }

        w.lastShot = w.gt;
        w.bullets.push({
            id: w.nextId++,
            x: w.rocketX,
            y: ROCKET_Y - 0.05
        });
    };

    togglePause = () => {
        if (this.state.screen !== "playing") {
            return;
        }

        this.keys = { left: false, right: false };
        this.touchDir = 0;
        this.setState((prev) => ({ paused: !prev.paused }));
    };

    handleBlur = () => {
        if (this.state.screen === "playing" && !this.state.paused) {
            this.togglePause();
        }
    };

    handleKeyDown = (event) => {
        if (this.state.screen !== "playing") {
            return;
        }

        const key = event.key;

        if (
            key === " " ||
            key === "ArrowLeft" ||
            key === "ArrowRight" ||
            key === "ArrowUp" ||
            key === "ArrowDown"
        ) {
            event.preventDefault();
        }

        if (key === "p" || key === "P" || key === "Escape") {
            if (!event.repeat) {
                this.togglePause();
            }
            return;
        }

        if (this.state.paused) {
            return;
        }

        if (key === "ArrowLeft" || key === "a" || key === "A") {
            this.keys.left = true;
        }

        if (key === "ArrowRight" || key === "d" || key === "D") {
            this.keys.right = true;
        }

        if (key === " " || key === "ArrowUp" || key === "w" || key === "W") {
            if (this.world.phase === "feedback") {
                if (!event.repeat) {
                    this.continueRound();
                }
            } else {
                this.fire();
            }
        }

        if (key === "Enter" && this.world.phase === "feedback" && !event.repeat) {
            event.preventDefault();
            this.continueRound();
        }
    };

    handleKeyUp = (event) => {
        const key = event.key;

        if (this.state.screen === "playing" && key === " ") {
            event.preventDefault();
        }

        if (key === "ArrowLeft" || key === "a" || key === "A") {
            this.keys.left = false;
        }

        if (key === "ArrowRight" || key === "d" || key === "D") {
            this.keys.right = false;
        }
    };

    // Touch / mouse drag on the play field
    getPointerX = (event) => {
        const field = this.fieldRef.current;

        if (!field) {
            return null;
        }

        const rect = field.getBoundingClientRect();

        if (!rect.width) {
            return null;
        }

        return clamp((event.clientX - rect.left) / rect.width, 0.06, 0.94);
    };

    handlePointerDown = (event) => {
        if (this.state.screen !== "playing" || this.state.paused) {
            return;
        }

        if (event.target.closest && event.target.closest("button")) {
            return;
        }

        const x = this.getPointerX(event);

        if (x === null) {
            return;
        }

        try {
            event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
            // Pointer capture is optional.
        }

        this.pointer = {
            id: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            time: performance.now(),
            moved: false
        };

        this.world.rocketX = x;
    };

    handlePointerMove = (event) => {
        if (!this.pointer || this.pointer.id !== event.pointerId) {
            return;
        }

        const dist = Math.abs(event.clientX - this.pointer.startX) +
            Math.abs(event.clientY - this.pointer.startY);

        if (dist > 8) {
            this.pointer.moved = true;
        }

        const x = this.getPointerX(event);

        if (x !== null && !this.state.paused) {
            this.world.rocketX = x;
        }
    };

    handlePointerUp = (event) => {
        if (!this.pointer || this.pointer.id !== event.pointerId) {
            return;
        }

        const quickTap = !this.pointer.moved &&
            performance.now() - this.pointer.time < 300;

        this.pointer = null;

        if (quickTap) {
            this.fire();
        }
    };

    handlePointerCancel = () => {
        this.pointer = null;
    };

    // On-screen buttons use pointer events so they work on touch
    // screens and never steal keyboard focus.
    holdMove = (dir) => (event) => {
        event.preventDefault();
        this.touchDir = dir;
    };

    releaseMove = () => {
        this.touchDir = 0;
    };

    pressFire = (event) => {
        event.preventDefault();
        this.fire();
    };

    // -----------------------------------------
    // RENDER HELPERS
    // -----------------------------------------

    renderStars = () => (
        <div className="sp-stars" aria-hidden="true">
            <div className="sp-star-layer sp-star-layer-1" />
            <div className="sp-star-layer sp-star-layer-2" />
            <div className="sp-star-layer sp-star-layer-3" />
        </div>
    );

    renderAltitude = () => {
        const { correct } = this.state;
        const planetIndex = getPlanetIndex(correct);
        const planet = PLANETS[planetIndex];
        const next = PLANETS[planetIndex + 1];
        const progress = next
            ? ((correct % CORRECT_PER_PLANET) / CORRECT_PER_PLANET) * 100
            : 100;

        return (
            <div className="sp-altitude">
                <div className="sp-altitude-row">
                    <span>
                        Altitude: <strong>{planet.icon} {planet.name}</strong>
                    </span>

                    <span className="sp-altitude-next">
                        {next ? `Next: ${next.icon} ${next.name}` : "🏁 Max altitude!"}
                    </span>
                </div>

                <div className="sp-fuel">
                    <div
                        className="sp-fuel-fill"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="sp-planet-track" aria-hidden="true">
                    {PLANETS.map((p, i) => (
                        <span
                            key={p.name}
                            className={
                                i <= planetIndex
                                    ? "sp-planet-dot reached"
                                    : "sp-planet-dot"
                            }
                            title={p.name}
                        >
                            {p.icon}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    renderQuestionPanel = (question) => {
        const { qIndex, questions } = this.state;
        const feedback = this.world.feedback;
        const showResult = this.world.phase === "feedback" && feedback;

        return (
            <section className="sp-panel">
                <div className="sp-panel-top">
                    <div className="sp-topic">
                        {question.topicIcon} {question.topic}
                    </div>

                    <div className="sp-qnum">
                        Question {qIndex + 1} of {questions.length}
                    </div>
                </div>

                <h2 className="sp-question">{question.question}</h2>

                <div className="sp-options">
                    {question.options.map((option, index) => {
                        let className = `sp-option sp-letter-${index % 4}`;

                        if (showResult && index === question.answer) {
                            className += " correct";
                        }

                        if (showResult && feedback.hitIndex === index) {
                            className += " wrong";
                        }

                        return (
                            <div key={index} className={className}>
                                <span className="sp-option-letter">
                                    {LETTERS[index] || index + 1}
                                </span>

                                <code className="sp-option-text">
                                    {String(option)}
                                </code>
                            </div>
                        );
                    })}
                </div>

                <p className="sp-panel-hint">
                    🎯 Blast the asteroid with the correct letter!
                </p>

                {this.renderAltitude()}
            </section>
        );
    };

    renderFeedback = () => {
        const w = this.world;
        const feedback = w.feedback;

        if (w.phase !== "feedback" || !feedback) {
            return null;
        }

        const { question } = feedback;
        const answerLetter = LETTERS[question.answer] || question.answer + 1;
        const answerText = question.options[question.answer];

        if (feedback.type === "correct") {
            return (
                <div className="sp-feedback sp-feedback-correct" role="status">
                    <strong>💥 Direct hit! +{feedback.gained}</strong>
                    <p>Rocket fuel rising... 🚀</p>
                </div>
            );
        }

        return (
            <div className="sp-feedback sp-feedback-wrong" role="alert">
                <strong>
                    {feedback.type === "miss"
                        ? "☄️ The answer asteroid slipped past!"
                        : "🛡️ Oops! Shield hit!"}
                </strong>

                <p className="sp-feedback-answer">
                    Correct answer: <b>{answerLetter}</b>{" "}
                    <code>{String(answerText)}</code>
                </p>

                {question.explanation && (
                    <p className="sp-feedback-explain">{question.explanation}</p>
                )}

                <button
                    type="button"
                    className="sp-continue-btn"
                    onClick={this.continueRound}
                >
                    {feedback.last ? "See Results 🏁" : "Continue ▶"}
                </button>

                <small>Press Space or Enter to continue</small>
            </div>
        );
    };

    renderField = () => {
        const w = this.world;
        const { paused } = this.state;
        const r = this.getRadius();
        const size = r * 2;
        const shaking = w.gt < w.shakeUntil;

        return (
            <div
                ref={this.fieldRef}
                className={shaking ? "sp-field shake" : "sp-field"}
                onPointerDown={this.handlePointerDown}
                onPointerMove={this.handlePointerMove}
                onPointerUp={this.handlePointerUp}
                onPointerCancel={this.handlePointerCancel}
            >
                {this.renderStars()}

                {w.asteroids.map((a) =>
                    a.gone ? null : (
                        <div
                            key={a.id}
                            className={`sp-asteroid sp-letter-${a.index % 4}${a.fading ? " fading" : ""}`}
                            style={{
                                left: `${a.x * 100}%`,
                                top: `${a.y * 100}%`,
                                width: `${size}px`,
                                height: `${size}px`,
                                fontSize: `${Math.round(r * 0.85)}px`
                            }}
                        >
                            <span
                                className="sp-asteroid-rock"
                                style={{
                                    transform: `rotate(${a.spin * w.gt * 40}deg)`
                                }}
                            />
                            <span className="sp-asteroid-letter">
                                {LETTERS[a.index] || a.index + 1}
                            </span>
                        </div>
                    )
                )}

                {w.bullets.map((b) => (
                    <div
                        key={b.id}
                        className="sp-bullet"
                        style={{
                            left: `${b.x * 100}%`,
                            top: `${b.y * 100}%`
                        }}
                    />
                ))}

                {w.booms.map((b) => (
                    <div
                        key={b.id}
                        className={b.good ? "sp-boom good" : "sp-boom bad"}
                        style={{
                            left: `${b.x * 100}%`,
                            top: `${b.y * 100}%`,
                            width: `${size * 2}px`,
                            height: `${size * 2}px`
                        }}
                    >
                        <span>💥</span>
                    </div>
                ))}

                <div
                    className="sp-rocket"
                    style={{
                        left: `${w.rocketX * 100}%`,
                        top: `${ROCKET_Y * 100}%`
                    }}
                >
                    <span className="sp-rocket-ship">🚀</span>
                    <span className="sp-rocket-flame" />
                </div>

                <div className="sp-danger-line" style={{ top: `${ROCKET_Y * 100 + 4}%` }} />

                {w.toast && <div className="sp-toast">{w.toast.text}</div>}

                {this.renderFeedback()}

                {paused && (
                    <div className="sp-pause">
                        <div className="sp-pause-card">
                            <div className="sp-pause-icon">⏸️</div>
                            <h2>Paused</h2>
                            <p>Take a breath, space pilot!</p>

                            <button
                                type="button"
                                className="sp-primary-btn"
                                onClick={this.togglePause}
                            >
                                ▶ Resume
                            </button>

                            <button
                                type="button"
                                className="sp-ghost-btn"
                                onClick={() => this.endGame("quit")}
                            >
                                🏁 End Mission
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
            <div className="sp-controls">
                <button
                    type="button"
                    className="sp-ctrl-btn"
                    aria-label="Move left"
                    onPointerDown={this.holdMove(-1)}
                    onPointerUp={this.releaseMove}
                    onPointerLeave={this.releaseMove}
                    onPointerCancel={this.releaseMove}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    ◀
                </button>

                <button
                    type="button"
                    className="sp-fire-btn"
                    aria-label="Fire"
                    onPointerDown={this.pressFire}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    🔥 FIRE
                </button>

                <button
                    type="button"
                    className="sp-ctrl-btn"
                    aria-label="Move right"
                    onPointerDown={this.holdMove(1)}
                    onPointerUp={this.releaseMove}
                    onPointerLeave={this.releaseMove}
                    onPointerCancel={this.releaseMove}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    ▶
                </button>

                <button
                    type="button"
                    className="sp-ctrl-btn sp-pause-btn"
                    aria-label={paused ? "Resume" : "Pause"}
                    onClick={this.togglePause}
                >
                    {paused ? "▶" : "⏸"}
                </button>
            </div>
        );
    };

    renderStartScreen = () => {
        const topics = this.getTopics();
        const { topic, best } = this.state;
        const total = topics.reduce((sum, t) => sum + t.count, 0);
        const selectedCount = topic === "all"
            ? total
            : (topics.find((t) => t.key === topic) || { count: 0 }).count;

        return (
            <div className="sp-overlay">
                <div className="sp-start-card">
                    <div className="sp-big-icon">🚀</div>

                    <h1>Space Python</h1>

                    <span className="sp-level">Intermediate</span>

                    <p>
                        Asteroids are falling! Read the Python question and
                        blast the asteroid with the correct answer to fly
                        higher into space.
                    </p>

                    <div className="sp-rules">
                        <div>🎯 Hit the right letter</div>
                        <div>🛡️ You have 3 shields</div>
                        <div>🪐 Every 3 hits = new planet</div>
                        <div>⚡ Asteroids get faster</div>
                    </div>

                    <div className="sp-topic-picker">
                        <h3>Choose your mission</h3>

                        <div className="sp-topic-list">
                            <button
                                type="button"
                                className={topic === "all" ? "sp-topic-chip active" : "sp-topic-chip"}
                                onClick={() => this.selectTopic("all")}
                            >
                                🌌 All Topics <small>{total}</small>
                            </button>

                            {topics.map((t) => (
                                <button
                                    type="button"
                                    key={t.key}
                                    className={topic === t.key ? "sp-topic-chip active" : "sp-topic-chip"}
                                    onClick={() => this.selectTopic(t.key)}
                                >
                                    {t.icon} {t.title} <small>{t.count}</small>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        className="sp-primary-btn sp-launch-btn"
                        onClick={this.startGame}
                        disabled={selectedCount === 0}
                    >
                        🚀 Launch!
                    </button>

                    {best.score > 0 && (
                        <p className="sp-best-line">
                            🏆 Best: {best.score} points · furthest{" "}
                            {PLANETS[best.planet].icon} {PLANETS[best.planet].name}
                        </p>
                    )}

                    <p className="sp-keyboard-help">
                        ⬅️ ➡️ or A / D to move · Space to fire · P to pause
                        <br />
                        On phones: drag the rocket, tap to fire
                    </p>
                </div>
            </div>
        );
    };

    renderResult = () => {
        const {
            score,
            xp,
            correct,
            answered,
            bestStreak,
            endReason,
            best,
            newBest
        } = this.state;

        const planet = PLANETS[getPlanetIndex(correct)];
        const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;

        let title = "Mission Complete! 🎉";
        let subtitle = "You answered every question in this mission!";

        if (endReason === "crash") {
            title = "Shields Down! 💥";
            subtitle = "Your rocket needs repairs, but what a flight!";
        } else if (endReason === "quit") {
            title = "Mission Ended 🏁";
            subtitle = "You returned safely to base.";
        }

        return (
            <div className="sp-result">
                <div className="sp-result-icon">{planet.icon}</div>

                <h1>{title}</h1>

                <p>{subtitle}</p>

                <div className="sp-furthest">
                    Furthest reached: <strong>{planet.icon} {planet.name}</strong>
                </div>

                {newBest && <div className="sp-new-best">🌟 New best score!</div>}

                <div className="sp-result-stats">
                    <div className="sp-result-stat">
                        <span>⭐</span>
                        <strong>{score}</strong>
                        <small>Score</small>
                    </div>

                    <div className="sp-result-stat">
                        <span>💎</span>
                        <strong>{xp}</strong>
                        <small>XP</small>
                    </div>

                    <div className="sp-result-stat">
                        <span>🎯</span>
                        <strong>{correct}/{answered}</strong>
                        <small>Hits</small>
                    </div>

                    <div className="sp-result-stat">
                        <span>🔥</span>
                        <strong>{bestStreak}</strong>
                        <small>Best Streak</small>
                    </div>
                </div>

                <div className="sp-result-progress">
                    <div
                        className="sp-result-progress-fill"
                        style={{ width: `${accuracy}%` }}
                    />
                </div>

                <p>
                    Accuracy <strong>{accuracy}%</strong>
                </p>

                <p className="sp-best-line">
                    🏆 Best score: <strong>{best.score}</strong> · Best planet:{" "}
                    <strong>{PLANETS[best.planet].icon} {PLANETS[best.planet].name}</strong>
                </p>

                <div className="sp-result-buttons">
                    <button type="button" onClick={this.startGame}>
                        🔄 Play Again
                    </button>

                    <button
                        type="button"
                        className="sp-secondary"
                        onClick={this.backToStart}
                    >
                        🧭 Change Topic
                    </button>

                    <Link to="/games">🎮 All Games</Link>
                </div>
            </div>
        );
    };

    renderHeader = () => {
        const { score, xp, shields, correct } = this.state;
        const planet = PLANETS[getPlanetIndex(correct)];

        return (
            <header className="sp-header">
                <div className="sp-header-left">
                    <Link to="/games" className="sp-back">
                        ← Games
                    </Link>

                    <h1>🚀 Space Python</h1>
                </div>

                <div className="sp-stats">
                    <div className="sp-stat">⭐ {score}</div>
                    <div className="sp-stat">💎 {xp} XP</div>
                    <div className="sp-stat" aria-label={`${shields} shields`}>
                        {"🛡️".repeat(shields)}
                        <span className="sp-shield-empty">
                            {"🛡️".repeat(MAX_SHIELDS - shields)}
                        </span>
                    </div>
                    <div className="sp-stat">{planet.icon} {planet.name}</div>
                </div>
            </header>
        );
    };

    // -----------------------------------------
    // MAIN RENDER
    // -----------------------------------------

    render() {
        const { screen, questions, qIndex } = this.state;

        if (screen === "results") {
            return <div className="sp-page">{this.renderResult()}</div>;
        }

        if (this.getTopics().length === 0) {
            return (
                <div className="sp-page">
                    <div className="sp-error">No quiz questions found.</div>
                </div>
            );
        }

        const question = screen === "playing" ? questions[qIndex] : null;

        return (
            <div className="sp-page">
                {this.renderHeader()}

                <main className="sp-content">
                    <section className="sp-game-section">
                        {this.renderField()}
                        {this.renderControls()}
                    </section>

                    {question ? (
                        this.renderQuestionPanel(question)
                    ) : (
                        <section className="sp-panel sp-panel-empty">
                            <h2 className="sp-question">Ready for launch? 🚀</h2>
                        </section>
                    )}
                </main>

                {screen === "start" && this.renderStartScreen()}
            </div>
        );
    }
}

export default SpacePython;
