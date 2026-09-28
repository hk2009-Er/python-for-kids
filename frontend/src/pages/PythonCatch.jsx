import React, { Component } from "react";
import { Link } from "react-router-dom";
import lessonData from "../data/lessonData";
import "./PythonCatch.css";

// -----------------------------------------
// GAME SETTINGS
// -----------------------------------------

const MAX_HEARTS = 3;
const MAX_LANES = 4;
const BEST_KEY = "pythonCatchBestScore";

// Speeds are fractions of the play area per second
const BASE_FALL_SPEED = 0.16;
const FALL_SPEED_STEP = 0.022;
const MAX_FALL_SPEED = 0.38;
const BASKET_SPEED = 1.35;
const BASKET_BOTTOM_GAP = 10;

const CORRECT_PAUSE_MS = 1100;
const WRONG_PAUSE_MS = 4500;

// -----------------------------------------
// HELPERS
// -----------------------------------------

function shuffle(list) {
    const copy = [...list];

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}

function topicKey(topic) {
    return String(topic.slug || topic.id || topic.title);
}

function readBestScore() {
    try {
        const value = parseInt(
            window.localStorage.getItem(BEST_KEY),
            10
        );

        return Number.isFinite(value) ? value : 0;
    } catch {
        return 0;
    }
}

function saveBestScore(value) {
    try {
        window.localStorage.setItem(BEST_KEY, String(value));
    } catch {
        // Storage can be blocked (private mode) - ignore.
    }
}

class PythonCatch extends Component {
    constructor(props) {
        super(props);

        this.arenaRef = React.createRef();
        this.basketRef = React.createRef();

        this.itemEls = {};
        this.items = [];
        this.phys = {};
        this.itemSeq = 0;

        this.basketX = 0.5;
        this.dragTarget = null;
        this.dragging = false;
        this.keys = { left: false, right: false };
        this.holdDir = 0;

        this.rafId = null;
        this.lastTime = null;
        this.feedbackTimer = null;

        this.state = {
            phase: "start", // start | playing | feedback | over
            paused: false,
            topic: "all",

            questions: [],
            qIndex: 0,
            items: [],

            score: 0,
            xp: 0,
            hearts: MAX_HEARTS,
            streak: 0,
            bestStreak: 0,
            correctCount: 0,

            feedback: null,
            endReason: null,

            bestScore: readBestScore(),
            newBest: false,

            noQuestions: false
        };
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keyup", this.handleKeyUp);
        document.addEventListener(
            "visibilitychange",
            this.handleVisibility
        );
        window.addEventListener("blur", this.clearKeys);
        window.addEventListener("resize", this.draw);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
        document.removeEventListener("keyup", this.handleKeyUp);
        document.removeEventListener(
            "visibilitychange",
            this.handleVisibility
        );
        window.removeEventListener("blur", this.clearKeys);
        window.removeEventListener("resize", this.draw);

        this.stopLoop();
        this.clearFeedbackTimer();
    }

    // -----------------------------------------
    // QUESTIONS & TOPICS (pulled dynamically)
    // -----------------------------------------

    getTopics = () => {
        return lessonData
            .filter(
                (topic) =>
                    Array.isArray(topic.quiz) &&
                    topic.quiz.length > 0
            )
            .map((topic) => ({
                key: topicKey(topic),
                title: topic.title,
                icon: topic.icon,
                count: topic.quiz.length
            }));
    };

    getQuestions = (selectedTopic) => {
        const questions = [];

        lessonData.forEach((topic) => {
            if (!topic.quiz || topic.quiz.length === 0) {
                return;
            }

            if (
                selectedTopic !== "all" &&
                topicKey(topic) !== selectedTopic
            ) {
                return;
            }

            topic.quiz.forEach((quiz) => {
                const valid =
                    quiz &&
                    Array.isArray(quiz.options) &&
                    quiz.options.length >= 2 &&
                    typeof quiz.answer === "number" &&
                    quiz.answer >= 0 &&
                    quiz.answer < quiz.options.length;

                if (valid) {
                    questions.push({
                        ...quiz,
                        topic: topic.title,
                        topicIcon: topic.icon
                    });
                }
            });
        });

        return shuffle(questions);
    };

    // -----------------------------------------
    // START / RESTART
    // -----------------------------------------

    startGame = () => {
        const questions = this.getQuestions(this.state.topic);

        if (questions.length === 0) {
            this.setState({ noQuestions: true });
            return;
        }

        this.clearFeedbackTimer();
        this.clearKeys();
        this.basketX = 0.5;
        this.dragTarget = null;

        this.setState(
            {
                phase: "playing",
                paused: false,
                questions,
                qIndex: 0,
                items: [],
                score: 0,
                xp: 0,
                hearts: MAX_HEARTS,
                streak: 0,
                bestStreak: 0,
                correctCount: 0,
                feedback: null,
                endReason: null,
                newBest: false,
                noQuestions: false
            },
            () => {
                this.spawnQuestion(0);
                this.startLoop();
            }
        );
    };

    backToStart = () => {
        this.stopLoop();
        this.clearFeedbackTimer();

        this.setState({
            phase: "start",
            paused: false,
            items: [],
            feedback: null
        });
    };

    handleTopicChange = (event) => {
        this.setState({
            topic: event.target.value,
            noQuestions: false
        });
    };

    // -----------------------------------------
    // SPAWN FALLING ANSWERS
    // -----------------------------------------

    getFallSpeed = (correctCount) => {
        const level = Math.floor(correctCount / 3);

        return Math.min(
            BASE_FALL_SPEED + level * FALL_SPEED_STEP,
            MAX_FALL_SPEED
        );
    };

    spawnQuestion = (qIndex) => {
        const { questions, correctCount } = this.state;
        const question = questions[qIndex];

        if (!question) {
            this.endGame("cleared");
            return;
        }

        // Correct answer + up to 3 wrong ones
        const wrong = shuffle(
            question.options
                .map((_, index) => index)
                .filter((index) => index !== question.answer)
        ).slice(0, MAX_LANES - 1);

        const optionIndexes = shuffle([question.answer, ...wrong]);
        const lanes = shuffle(optionIndexes.map((_, i) => i));

        // Stagger starting heights so they don't arrive together
        const starts = shuffle([-0.12, -0.3, -0.48, -0.66]);

        const speed = this.getFallSpeed(correctCount);

        this.itemEls = {};
        this.phys = {};

        const items = optionIndexes.map((optionIndex, i) => {
            this.itemSeq += 1;

            const id = this.itemSeq;

            this.phys[id] = {
                y: starts[i] - Math.random() * 0.05,
                speed: speed * (0.85 + Math.random() * 0.3),
                done: false
            };

            return {
                id,
                text: String(question.options[optionIndex]),
                correct: optionIndex === question.answer,
                lane: lanes[i],
                caught: false,
                reveal: false
            };
        });

        this.items = items;

        this.setState({
            qIndex,
            items,
            phase: "playing",
            feedback: null
        });
    };

    // -----------------------------------------
    // GAME LOOP (requestAnimationFrame)
    // -----------------------------------------

    startLoop = () => {
        this.stopLoop();
        this.lastTime = null;
        this.rafId = requestAnimationFrame(this.tick);
    };

    stopLoop = () => {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    };

    tick = (time) => {
        this.rafId = requestAnimationFrame(this.tick);

        if (this.lastTime === null) {
            this.lastTime = time;
            return;
        }

        const dt = Math.min((time - this.lastTime) / 1000, 0.05);

        this.lastTime = time;

        if (!this.state.paused) {
            this.update(dt);
        }

        this.draw();
    };

    update = (dt) => {
        const arena = this.arenaRef.current;
        const basket = this.basketRef.current;

        if (!arena || !basket) {
            return;
        }

        const width = arena.clientWidth;
        const height = arena.clientHeight;

        if (width === 0 || height === 0) {
            return;
        }

        // ----- Move basket -----

        let dir = this.holdDir;

        if (this.keys.left) dir -= 1;
        if (this.keys.right) dir += 1;

        dir = Math.max(-1, Math.min(1, dir));

        if (dir !== 0) {
            this.dragTarget = null;
            this.basketX += dir * BASKET_SPEED * dt;
        } else if (this.dragTarget !== null) {
            this.basketX +=
                (this.dragTarget - this.basketX) *
                Math.min(1, dt * 18);
        }

        const basketW = basket.offsetWidth;
        const basketH = basket.offsetHeight;
        const half = basketW / 2 / width;

        this.basketX = Math.max(
            half,
            Math.min(1 - half, this.basketX)
        );

        if (this.state.phase !== "playing") {
            return;
        }

        // ----- Move falling answers -----

        const basketTop = height - basketH - BASKET_BOTTOM_GAP;
        const basketLeft = this.basketX * width - basketW / 2;
        const basketRight = basketLeft + basketW;

        const laneW = width / this.items.length;
        const itemW = laneW - 8;

        // Check lowest items first
        const ordered = [...this.items].sort(
            (a, b) =>
                (this.phys[b.id] ? this.phys[b.id].y : 0) -
                (this.phys[a.id] ? this.phys[a.id].y : 0)
        );

        for (const item of ordered) {
            const p = this.phys[item.id];

            if (!p || p.done) {
                continue;
            }

            p.y += p.speed * dt;

            const el = this.itemEls[item.id];
            const itemH = el ? el.offsetHeight : 40;
            const top = p.y * height;
            const bottom = top + itemH;

            const left = item.lane * laneW + 4;
            const right = left + itemW;

            // Caught?
            if (
                bottom >= basketTop + 4 &&
                top <= basketTop + basketH * 0.6
            ) {
                const overlap =
                    Math.min(right, basketRight) -
                    Math.max(left, basketLeft);

                if (overlap >= Math.min(itemW, basketW) * 0.4) {
                    p.done = true;
                    this.resolveRound(item, "catch");
                    return;
                }
            }

            // Fell off the bottom?
            if (top > height) {
                p.done = true;

                if (item.correct) {
                    this.resolveRound(item, "miss");
                    return;
                }
            }
        }
    };

    draw = () => {
        const arena = this.arenaRef.current;
        const basket = this.basketRef.current;

        if (!arena) {
            return;
        }

        const width = arena.clientWidth;
        const height = arena.clientHeight;

        this.items.forEach((item) => {
            const el = this.itemEls[item.id];
            const p = this.phys[item.id];

            if (el && p) {
                el.style.transform = `translateY(${(
                    p.y * height
                ).toFixed(1)}px)`;
            }
        });

        if (basket) {
            const x = this.basketX * width - basket.offsetWidth / 2;

            basket.style.transform = `translateX(${x.toFixed(1)}px)`;
        }
    };

    // -----------------------------------------
    // ROUND RESULT
    // -----------------------------------------

    resolveRound = (item, how) => {
        const {
            questions,
            qIndex,
            streak,
            bestStreak,
            hearts,
            correctCount
        } = this.state;

        const question = questions[qIndex];
        const isCorrect = how === "catch" && item.correct;

        // Mark caught answer and reveal the right one
        const items = this.items.map((it) => ({
            ...it,
            caught: how === "catch" && it.id === item.id,
            reveal: it.correct
        }));

        this.items = items;

        if (isCorrect) {
            const newStreak = streak + 1;
            const streakBonus = Math.min(newStreak - 1, 5) * 2;
            const xpGain = 10 + streakBonus;
            const scoreGain = 100 + Math.min(newStreak - 1, 5) * 20;

            this.setState((prev) => ({
                items,
                phase: "feedback",
                score: prev.score + scoreGain,
                xp: prev.xp + xpGain,
                streak: newStreak,
                bestStreak: Math.max(bestStreak, newStreak),
                correctCount: correctCount + 1,
                feedback: {
                    correct: true,
                    title: "🎉 Correct!",
                    message:
                        newStreak >= 2
                            ? `🔥 ${newStreak} in a row! +${xpGain} XP`
                            : `+${xpGain} XP`
                }
            }));

            this.setFeedbackTimer(CORRECT_PAUSE_MS);
            return;
        }

        const correctText = question
            ? String(question.options[question.answer])
            : "";

        const remaining = Math.max(hearts - 1, 0);

        this.setState({
            items,
            phase: "feedback",
            hearts: remaining,
            streak: 0,
            feedback: {
                correct: false,
                title:
                    how === "miss"
                        ? "💨 The right answer got away!"
                        : "❌ Oops, wrong answer!",
                answer: correctText,
                explanation: question ? question.explanation : "",
                last: remaining <= 0
            }
        });

        this.setFeedbackTimer(WRONG_PAUSE_MS);
    };

    setFeedbackTimer = (ms) => {
        this.clearFeedbackTimer();
        this.feedbackTimer = setTimeout(this.continueGame, ms);
    };

    clearFeedbackTimer = () => {
        if (this.feedbackTimer) {
            clearTimeout(this.feedbackTimer);
            this.feedbackTimer = null;
        }
    };

    continueGame = () => {
        this.clearFeedbackTimer();

        const { phase, hearts, qIndex, questions } = this.state;

        if (phase !== "feedback") {
            return;
        }

        // Wait while paused
        if (this.state.paused) {
            this.setFeedbackTimer(500);
            return;
        }

        if (hearts <= 0) {
            this.endGame("hearts");
            return;
        }

        if (qIndex + 1 >= questions.length) {
            this.endGame("cleared");
            return;
        }

        this.spawnQuestion(qIndex + 1);
    };

    endGame = (reason) => {
        this.stopLoop();
        this.clearFeedbackTimer();
        this.clearKeys();

        const { score, bestScore } = this.state;
        const newBest = score > bestScore;

        if (newBest) {
            saveBestScore(score);
        }

        this.setState({
            phase: "over",
            paused: false,
            endReason: reason,
            newBest,
            bestScore: newBest ? score : bestScore
        });
    };

    // -----------------------------------------
    // PAUSE
    // -----------------------------------------

    togglePause = () => {
        const { phase } = this.state;

        if (phase !== "playing" && phase !== "feedback") {
            return;
        }

        this.clearKeys();
        this.setState((prev) => ({ paused: !prev.paused }));
    };

    handleVisibility = () => {
        const { phase, paused } = this.state;

        if (
            document.hidden &&
            !paused &&
            (phase === "playing" || phase === "feedback")
        ) {
            this.clearKeys();
            this.setState({ paused: true });
        }
    };

    // -----------------------------------------
    // CONTROLS
    // -----------------------------------------

    isActive = () => {
        const { phase, paused } = this.state;

        return (
            !paused && (phase === "playing" || phase === "feedback")
        );
    };

    clearKeys = () => {
        this.keys.left = false;
        this.keys.right = false;
        this.holdDir = 0;
        this.dragging = false;
    };

    handleKeyDown = (event) => {
        const { phase } = this.state;
        const inGame = phase === "playing" || phase === "feedback";

        if (!inGame) {
            return;
        }

        const key = event.key;

        if (key === "ArrowLeft" || key === "a" || key === "A") {
            event.preventDefault();
            this.keys.left = true;
        } else if (
            key === "ArrowRight" ||
            key === "d" ||
            key === "D"
        ) {
            event.preventDefault();
            this.keys.right = true;
        } else if (key === "p" || key === "P" || key === "Escape") {
            event.preventDefault();
            this.togglePause();
        }
    };

    handleKeyUp = (event) => {
        const key = event.key;

        if (key === "ArrowLeft" || key === "a" || key === "A") {
            this.keys.left = false;
        }

        if (key === "ArrowRight" || key === "d" || key === "D") {
            this.keys.right = false;
        }
    };

    pointerToFraction = (event) => {
        const arena = this.arenaRef.current;

        if (!arena) {
            return null;
        }

        const rect = arena.getBoundingClientRect();

        if (rect.width === 0) {
            return null;
        }

        return Math.max(
            0,
            Math.min(1, (event.clientX - rect.left) / rect.width)
        );
    };

    handleArenaPointerDown = (event) => {
        if (!this.isActive()) {
            return;
        }

        // Let buttons inside the arena work normally
        if (event.target.closest && event.target.closest("button")) {
            return;
        }

        this.dragging = true;

        if (event.currentTarget.setPointerCapture) {
            try {
                event.currentTarget.setPointerCapture(event.pointerId);
            } catch {
                // ignore
            }
        }

        this.dragTarget = this.pointerToFraction(event);
    };

    handleArenaPointerMove = (event) => {
        if (!this.dragging || !this.isActive()) {
            return;
        }

        this.dragTarget = this.pointerToFraction(event);
    };

    handleArenaPointerUp = () => {
        this.dragging = false;
    };

    holdStart = (dir) => (event) => {
        event.preventDefault();

        if (this.isActive()) {
            this.holdDir = dir;
        }
    };

    holdEnd = () => {
        this.holdDir = 0;
    };

    setItemRef = (id) => (el) => {
        if (el) {
            this.itemEls[id] = el;
        } else {
            delete this.itemEls[id];
        }
    };

    // -----------------------------------------
    // RENDER: START SCREEN
    // -----------------------------------------

    renderStart = () => {
        const { topic, bestScore, noQuestions } = this.state;
        const topics = this.getTopics();

        return (
            <div className="catch-start-card">
                <div className="catch-big-icon">🎯</div>

                <h1>Python Catch</h1>

                <p>
                    Answers fall from the sky! Move your basket and
                    catch the <strong>correct</strong> one.
                </p>

                <div className="catch-rules">
                    <div>🧺 Catch the right answer</div>
                    <div>💎 +10 XP per catch</div>
                    <div>🔥 Streaks give bonus XP</div>
                    <div>❤️ Wrong or missed = lose a heart</div>
                    <div>⚡ It gets faster!</div>
                    <div>⏸ P or Esc to pause</div>
                </div>

                <label className="catch-topic-label" htmlFor="catch-topic">
                    Choose a topic
                </label>

                <select
                    id="catch-topic"
                    className="catch-topic-select"
                    value={topic}
                    onChange={this.handleTopicChange}
                >
                    <option value="all">🌟 All topics</option>

                    {topics.map((t) => (
                        <option key={t.key} value={t.key}>
                            {t.icon} {t.title} ({t.count})
                        </option>
                    ))}
                </select>

                {noQuestions && (
                    <div className="catch-error">
                        No questions found for this topic yet.
                    </div>
                )}

                <button
                    className="catch-start-btn"
                    onClick={this.startGame}
                >
                    🚀 Start Game
                </button>

                <p className="catch-help">
                    Move with ⬅️ ➡️ or A / D, drag in the play area,
                    or tap ◀ ▶
                </p>

                {bestScore > 0 && (
                    <p className="catch-best-line">
                        🏅 Best score: <strong>{bestScore}</strong>
                    </p>
                )}
            </div>
        );
    };

    // -----------------------------------------
    // RENDER: RESULTS
    // -----------------------------------------

    renderResult = () => {
        const {
            score,
            xp,
            correctCount,
            bestStreak,
            bestScore,
            newBest,
            endReason,
            questions
        } = this.state;

        const cleared = endReason === "cleared";

        return (
            <div className="catch-result">
                <div className="catch-result-icon">
                    {cleared ? "🏆" : "🎯"}
                </div>

                <h1>{cleared ? "You caught them all! 🎉" : "Game Over!"}</h1>

                <p>
                    {cleared
                        ? "You answered every question. Amazing!"
                        : `You caught ${correctCount} of ${questions.length} answers. Keep practising!`}
                </p>

                {newBest && (
                    <div className="catch-new-best">🌟 New best score!</div>
                )}

                <div className="catch-result-stats">
                    <div className="catch-result-stat">
                        <span>⭐</span>
                        <strong>{score}</strong>
                        <small>Score</small>
                    </div>

                    <div className="catch-result-stat">
                        <span>💎</span>
                        <strong>{xp}</strong>
                        <small>XP</small>
                    </div>

                    <div className="catch-result-stat">
                        <span>🧺</span>
                        <strong>{correctCount}</strong>
                        <small>Caught</small>
                    </div>

                    <div className="catch-result-stat">
                        <span>🔥</span>
                        <strong>{bestStreak}</strong>
                        <small>Best Streak</small>
                    </div>
                </div>

                <p className="catch-best-line">
                    🏅 Best score: <strong>{bestScore}</strong>
                </p>

                <div className="catch-result-buttons">
                    <button onClick={this.startGame}>🔄 Play Again</button>

                    <button
                        className="catch-secondary-btn"
                        onClick={this.backToStart}
                    >
                        📚 Change Topic
                    </button>

                    <Link to="/games">🎮 All Games</Link>
                </div>
            </div>
        );
    };

    // -----------------------------------------
    // RENDER: PLAY AREA
    // -----------------------------------------

    renderFeedback = () => {
        const { feedback } = this.state;

        if (!feedback) {
            return null;
        }

        if (feedback.correct) {
            return (
                <div className="catch-toast correct">
                    <strong>{feedback.title}</strong>
                    <span>{feedback.message}</span>
                </div>
            );
        }

        return (
            <div className="catch-feedback-card">
                <strong>{feedback.title}</strong>

                <div className="catch-feedback-answer">
                    Correct answer: <code>{feedback.answer}</code>
                </div>

                {feedback.explanation && <p>{feedback.explanation}</p>}

                <button onClick={this.continueGame}>
                    {feedback.last ? "See Results 🏁" : "Continue ▶"}
                </button>
            </div>
        );
    };

    renderGame = () => {
        const {
            questions,
            qIndex,
            items,
            phase,
            paused,
            correctCount
        } = this.state;

        const question = questions[qIndex];
        const laneCount = Math.max(items.length, 1);
        const level = Math.floor(correctCount / 3) + 1;

        let arenaClass = "catch-arena";

        if (phase === "feedback") arenaClass += " is-feedback";

        return (
            <main className="catch-content">
                {question && (
                    <section className="catch-question">
                        <div className="catch-question-meta">
                            <span className="catch-topic-chip">
                                {question.topicIcon} {question.topic}
                            </span>

                            <span className="catch-qnum">
                                Q {qIndex + 1} / {questions.length} · ⚡
                                Level {level}
                            </span>
                        </div>

                        <h2>{question.question}</h2>
                    </section>
                )}

                <section
                    className={arenaClass}
                    ref={this.arenaRef}
                    onPointerDown={this.handleArenaPointerDown}
                    onPointerMove={this.handleArenaPointerMove}
                    onPointerUp={this.handleArenaPointerUp}
                    onPointerCancel={this.handleArenaPointerUp}
                    aria-label="Play area"
                >
                    {items.map((item) => {
                        let className = `catch-item lane-color-${item.lane % 4}`;

                        if (item.caught) className += " caught";
                        if (phase === "feedback" && item.reveal) {
                            className += " reveal";
                        }
                        if (item.caught && !item.correct) {
                            className += " wrong";
                        }

                        return (
                            <div
                                key={item.id}
                                ref={this.setItemRef(item.id)}
                                className={className}
                                style={{
                                    left: `calc(${
                                        (item.lane * 100) / laneCount
                                    }% + 4px)`,
                                    width: `calc(${
                                        100 / laneCount
                                    }% - 8px)`,
                                    transform: "translateY(-300px)"
                                }}
                            >
                                {item.text}
                            </div>
                        );
                    })}

                    <div
                        className="catch-basket"
                        ref={this.basketRef}
                        style={{ width: `${100 / laneCount}%` }}
                    >
                        <span>🧺</span>
                    </div>

                    {phase === "feedback" && this.renderFeedback()}

                    {paused && (
                        <div className="catch-paused">
                            <div>
                                <strong>⏸ Paused</strong>

                                <button onClick={this.togglePause}>
                                    ▶ Resume
                                </button>
                            </div>
                        </div>
                    )}
                </section>

                <div className="catch-controls">
                    <button
                        className="catch-move-btn"
                        aria-label="Move left"
                        onPointerDown={this.holdStart(-1)}
                        onPointerUp={this.holdEnd}
                        onPointerLeave={this.holdEnd}
                        onPointerCancel={this.holdEnd}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        ◀
                    </button>

                    <button
                        className="catch-pause-btn"
                        onClick={this.togglePause}
                    >
                        {paused ? "▶ Resume" : "⏸ Pause"}
                    </button>

                    <button
                        className="catch-move-btn"
                        aria-label="Move right"
                        onPointerDown={this.holdStart(1)}
                        onPointerUp={this.holdEnd}
                        onPointerLeave={this.holdEnd}
                        onPointerCancel={this.holdEnd}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        ▶
                    </button>
                </div>

                <p className="catch-help">
                    🎮 ⬅️ ➡️ / A D to move · drag the play area · P to
                    pause
                </p>
            </main>
        );
    };

    // -----------------------------------------
    // MAIN RENDER
    // -----------------------------------------

    render() {
        const { phase, score, xp, hearts, streak } = this.state;
        const inGame = phase === "playing" || phase === "feedback";

        return (
            <div className="catch-page">
                <header className="catch-header">
                    <div className="catch-header-left">
                        <Link to="/games" className="catch-back">
                            ← Games
                        </Link>

                        <h1>🎯 Python Catch</h1>
                    </div>

                    {inGame && (
                        <div className="catch-stats">
                            <div className="catch-stat">⭐ {score}</div>
                            <div className="catch-stat">💎 {xp} XP</div>
                            <div className="catch-stat">🔥 {streak}</div>
                            <div className="catch-stat">
                                {"❤️".repeat(hearts)}
                                {"🤍".repeat(MAX_HEARTS - hearts)}
                            </div>
                        </div>
                    )}
                </header>

                {phase === "start" && (
                    <div className="catch-center">{this.renderStart()}</div>
                )}

                {inGame && this.renderGame()}

                {phase === "over" && (
                    <div className="catch-center">{this.renderResult()}</div>
                )}
            </div>
        );
    }
}

export default PythonCatch;
