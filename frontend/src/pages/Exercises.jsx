import React, { Component } from "react";
import { Link } from "react-router-dom";

import lessonData from "../data/lessonData";
import "./Exercises.css";


class Exercises extends Component {

    getAllExercises = () => {

        const allExercises = [];

        lessonData.forEach((topic) => {

            topic.exercises.forEach((exercise) => {

                allExercises.push({
                    ...exercise,
                    topic: topic.title,
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


    render() {

        const exercises = this.getAllExercises();


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


                    {/* EXERCISES */}

                    <div className="exercises-grid">

                        {exercises.map((exercise, index) => (

                            <div
                                className="exercise-card"
                                key={exercise.id}
                            >

                                <div className="exercise-top">

                                    <div className="exercise-icon">
                                        {this.getExerciseEmoji(index)}
                                    </div>


                                    <span
                                        className={
                                            exercise.difficulty === "Medium"
                                                ? "difficulty medium"
                                                : "difficulty easy"
                                        }
                                    >
                                        {exercise.difficulty || "Easy"}
                                    </span>

                                </div>


                                <h3>
                                    {exercise.title}
                                </h3>


                                <div className="exercise-topic">
                                    📚 {exercise.topic}
                                </div>


                                <p>
                                    {exercise.description}
                                </p>


                                <Link
                                    to={`/lesson/${exercise.slug}`}
                                    className="exercise-button"
                                >
                                    Practice →
                                </Link>

                            </div>

                        ))}

                    </div>

                </section>

            </div>
        );
    }
}


export default Exercises;