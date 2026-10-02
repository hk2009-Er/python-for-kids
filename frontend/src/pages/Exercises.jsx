import React, { Component } from "react";
import { Link } from "react-router-dom";

import lessonData from "../data/lessonData";
import { getSolvedExercises } from "../utils/progress";

import "./Exercises.css";


const DIFFICULTY_ORDER = ["Easy", "Medium", "Hard"];


class Exercises extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTopic: "All",
            selectedDifficulty: "All",
            solved: []
        };
    }


    componentDidMount() {
        // Read saved progress after hydration so the prerendered HTML matches.
        // oxlint-disable-next-line react/no-did-mount-set-state -- read browser-only storage after hydration
        this.setState({ solved: getSolvedExercises() });
    }


    getAllExercises = () => {

        const allExercises = [];

        lessonData.forEach((topic) => {

            (topic.exercises || []).forEach((exercise) => {

                allExercises.push({
                    ...exercise,
                    topic: topic.title,
                    topicIcon: topic.icon,
                    slug: topic.slug
                });

            });

        });

        return allExercises;
    };


    getExerciseEmoji = (index) => {

        const emojis = [
            "🟢",
            "📦",
            "🔢",
            "🔄",
            "🍎",
            "⚙️",
            "🐍",
            "💡",
            "🎯",
            "🚀"
        ];

        return emojis[index % emojis.length];
    };


    getDifficultyClass = (difficulty) => {

        const d = String(difficulty || "Easy").toLowerCase();

        if (d === "medium") return "difficulty medium";
        if (d === "hard") return "difficulty hard";

        return "difficulty easy";
    };


    render() {

        const { selectedTopic, selectedDifficulty, solved } = this.state;

        const exercises = this.getAllExercises();
        const solvedSet = new Set(solved.map(String));

        const solvedCount = exercises.filter(
            e => solvedSet.has(String(e.id))
        ).length;

        const percent = exercises.length
            ? Math.round((solvedCount / exercises.length) * 100)
            : 0;

        const topics = lessonData.filter(
            t => (t.exercises || []).length > 0
        );

        const difficulties = Array.from(
            new Set(exercises.map(e => e.difficulty || "Easy"))
        ).sort((a, b) => {
            const ia = DIFFICULTY_ORDER.indexOf(a);
            const ib = DIFFICULTY_ORDER.indexOf(b);
            return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
        });

        const filtered = exercises.filter(e =>
            (selectedTopic === "All" || e.slug === selectedTopic) &&
            (selectedDifficulty === "All" ||
                (e.difficulty || "Easy") === selectedDifficulty)
        );


        return (

            <div className="exercises-page">

                {/* HERO */}

                <section className="exercises-hero">

                    <div className="exercises-hero-icon">
                        🧩
                    </div>

                    <h1>
                        Python Exercises
                    </h1>

                    <p>
                        Practice what you learned
                        and become a better coder!
                    </p>

                </section>


                {/* CONTENT */}

                <section className="exercises-content">

                    <div className="exercise-intro">

                        <h2>
                            🎯 Choose an Exercise
                        </h2>

                        <p>
                            Start with an easy challenge
                            and work your way up.
                        </p>

                    </div>


                    {/* PROGRESS */}

                    <div className="exercises-progress">

                        <div className="exercises-progress-text">
                            <span>🏆 Your progress</span>
                            <strong>
                                {solvedCount} / {exercises.length} solved
                            </strong>
                        </div>

                        <div className="exercises-progress-bar">
                            <div
                                className="exercises-progress-fill"
                                style={{ width: `${percent}%` }}
                            />
                        </div>

                    </div>


                    {/* FILTERS */}

                    <div className="exercise-filters">

                        <div className="filter-row">

                            <span className="filter-label">Topic</span>

                            <div className="filter-chips">

                                <button
                                    className={selectedTopic === "All" ? "filter-chip active" : "filter-chip"}
                                    onClick={() => this.setState({ selectedTopic: "All" })}
                                >
                                    All topics
                                </button>

                                {topics.map(topic => (
                                    <button
                                        key={topic.slug}
                                        className={selectedTopic === topic.slug ? "filter-chip active" : "filter-chip"}
                                        onClick={() => this.setState({ selectedTopic: topic.slug })}
                                    >
                                        {topic.icon} {topic.title}
                                    </button>
                                ))}

                            </div>

                        </div>


                        <div className="filter-row">

                            <span className="filter-label">Level</span>

                            <div className="filter-chips">

                                {["All", ...difficulties].map(d => (
                                    <button
                                        key={d}
                                        className={selectedDifficulty === d ? "filter-chip active" : "filter-chip"}
                                        onClick={() => this.setState({ selectedDifficulty: d })}
                                    >
                                        {d === "All" ? "All levels" : d}
                                    </button>
                                ))}

                            </div>

                        </div>

                    </div>


                    {/* EXERCISES */}

                    {filtered.length === 0 ? (

                        <div className="exercises-empty">
                            🤷 No exercises match these filters yet.
                        </div>

                    ) : (

                        <div className="exercises-grid">

                            {filtered.map((exercise, index) => {

                                const isSolved = solvedSet.has(String(exercise.id));

                                return (

                                    <Link
                                        to={`/exercise/${exercise.id}`}
                                        className={isSolved ? "exercise-card solved" : "exercise-card"}
                                        key={exercise.id}
                                    >

                                        <div className="exercise-top">

                                            <div className="exercise-icon">
                                                {isSolved ? "✅" : this.getExerciseEmoji(index)}
                                            </div>

                                            <div className="exercise-badges">

                                                {isSolved && (
                                                    <span className="solved-badge">
                                                        ✅ Solved
                                                    </span>
                                                )}

                                                <span className={this.getDifficultyClass(exercise.difficulty)}>
                                                    {exercise.difficulty || "Easy"}
                                                </span>

                                            </div>

                                        </div>


                                        <h3>
                                            {exercise.title}
                                        </h3>


                                        <div className="exercise-topic">
                                            📚 {exercise.topic}
                                            {exercise.points ? ` • ⭐ ${exercise.points} XP` : ""}
                                        </div>


                                        <p>
                                            {exercise.description}
                                        </p>


                                        <span className="exercise-button">
                                            {isSolved ? "Practice again →" : "Start coding →"}
                                        </span>

                                    </Link>

                                );
                            })}

                        </div>

                    )}

                </section>

            </div>
        );
    }
}


export default Exercises;
