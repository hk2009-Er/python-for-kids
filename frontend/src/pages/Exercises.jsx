import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Exercises.css";


class Exercises extends Component {

    render() {

        const exercises = [

            {
                emoji: "🟢",
                title: "Print Your Name",
                difficulty: "Easy",
                topic: "Python Basics",
                description:
                    "Write a Python program that prints your name."
            },

            {
                emoji: "📦",
                title: "Variable Challenge",
                difficulty: "Easy",
                topic: "Variables",
                description:
                    "Create variables for your name, age and favorite color."
            },

            {
                emoji: "🔢",
                title: "Number Checker",
                difficulty: "Easy",
                topic: "If & Else",
                description:
                    "Check whether a number is positive or negative."
            },

            {
                emoji: "🔄",
                title: "Counting Robot",
                difficulty: "Easy",
                topic: "Loops",
                description:
                    "Use a loop to count from 1 to 10."
            },

            {
                emoji: "🍎",
                title: "Fruit Basket",
                difficulty: "Medium",
                topic: "Lists",
                description:
                    "Create a list of fruits and display them."
            },

            {
                emoji: "⚙️",
                title: "Greeting Machine",
                difficulty: "Medium",
                topic: "Functions",
                description:
                    "Create a function that greets a user."
            }

        ];


        return (

            <div className="exercises-page">

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


                    <div className="exercises-grid">

                        {exercises.map(
                            (exercise, index) => (

                                <div
                                    className="exercise-card"
                                    key={index}
                                >

                                    <div className="exercise-top">

                                        <div className="exercise-icon">
                                            {exercise.emoji}
                                        </div>

                                        <span
                                            className={
                                                exercise.difficulty ===
                                                "Easy"
                                                    ? "difficulty easy"
                                                    : "difficulty medium"
                                            }
                                        >
                                            {exercise.difficulty}
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
                                        to={`/lesson/${exercise.topic
                                            .toLowerCase()
                                            .replaceAll(" ", "-")}`}
                                        className="exercise-button"
                                    >
                                        Practice →
                                    </Link>

                                </div>

                            )
                        )}

                    </div>

                </section>

            </div>
        );
    }
}


export default Exercises;