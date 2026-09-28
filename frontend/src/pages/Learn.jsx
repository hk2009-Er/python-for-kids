import React, { Component } from "react";
import { Link } from "react-router-dom";

import lessonData from "../data/lessonData";
import { getCompletedTopics } from "../utils/progress";

import "./Learn.css";

class Learn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedLevel: "All",
            completedTopics: getCompletedTopics()
        };
    }


    handleLevelChange = (level) => {

        this.setState({
            selectedLevel: level
        });

    };


    render() {

        const { selectedLevel } = this.state;


        const levels = [
            "All",
            "Beginner",
            "Intermediate",
            "Advanced"
        ];


        const filteredTopics =
            selectedLevel === "All"
                ? lessonData
                : lessonData.filter(
                    topic => topic.level === selectedLevel
                );


        return (

            <div className="learn-page">

                {/* HERO */}

                <section className="learn-hero">

                    <div className="learn-hero-content">

                        <div className="learn-hero-emoji">
                            🐍
                        </div>

                        <h1>
                            Learn Python
                        </h1>

                        <p>
                            Learn Python step by step with
                            fun lessons, examples and challenges.
                        </p>

                    </div>

                </section>


                {/* CONTENT */}

                <section className="learn-content">


                    {/* LEVEL FILTER */}

                    <div className="level-buttons">

                        {levels.map(level => (

                            <button
                                key={level}
                                className={
                                    selectedLevel === level
                                        ? "level-button active"
                                        : "level-button"
                                }
                                onClick={() =>
                                    this.handleLevelChange(level)
                                }
                            >
                                {level}
                            </button>

                        ))}

                    </div>


                    {/* TOPICS */}

                    <div className="topics-grid">

                        {filteredTopics.map(topic => (

                            <div
                                className={
                                    this.state.completedTopics.includes(topic.slug)
                                        ? "topic-card completed"
                                        : "topic-card"
                                }
                                key={topic.id}
                            >

                                {this.state.completedTopics.includes(topic.slug) && (
                                    <span className="topic-completed">
                                        ✅ Completed
                                    </span>
                                )}

                                <div className="topic-icon">
                                    {topic.icon}
                                </div>


                                <span className="topic-level">
                                    {topic.level}
                                </span>


                                <h2>
                                    {topic.title}
                                </h2>


                                <p>
                                    {topic.description}
                                </p>


                                <div className="topic-footer">

                                    <span>
                                        📚 {topic.lessons.length} Lessons
                                    </span>


                                    <Link
                                        to={`/lesson/${topic.slug}`}
                                        className="learn-topic-button"
                                    >
                                        {this.state.completedTopics.includes(topic.slug)
                                            ? "Review →"
                                            : "Start Learning →"}
                                    </Link>

                                </div>

                            </div>

                        ))}

                    </div>

                </section>

            </div>

        );
    }
}

export default Learn;