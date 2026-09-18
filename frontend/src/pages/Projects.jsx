import React, { Component } from "react";

import "./Projects.css";


class Projects extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedProject: null
        };
    }


    openProject = (project) => {

        this.setState({
            selectedProject: project
        });

    };


    closeProject = () => {

        this.setState({
            selectedProject: null
        });

    };


    render() {

        const projects = [

            {
                emoji: "🎲",
                title: "Number Guessing Game",
                level: "Beginner",
                description:
                    "Create a game where the computer chooses a number and the player tries to guess it.",
                skills:
                    "Variables, input(), if/else, loops"
            },

            {
                emoji: "🧮",
                title: "Mini Calculator",
                level: "Beginner",
                description:
                    "Build a calculator that can add, subtract, multiply and divide numbers.",
                skills:
                    "Variables, input(), conditions, functions"
            },

            {
                emoji: "🎟️",
                title: "Movie Ticket Booking",
                level: "Beginner",
                description:
                    "Create a simple movie seat booking system using Python.",
                skills:
                    "Lists, loops, conditions"
            },

            {
                emoji: "❓",
                title: "Quiz Game",
                level: "Intermediate",
                description:
                    "Create your own multiple-choice quiz game and calculate the player's score.",
                skills:
                    "Lists, dictionaries, loops, conditions"
            },

            {
                emoji: "🤖",
                title: "Chatbot",
                level: "Intermediate",
                description:
                    "Build a simple chatbot that responds to different questions.",
                skills:
                    "Functions, conditions, strings"
            },

            {
                emoji: "🐍",
                title: "Python Adventure",
                level: "Intermediate",
                description:
                    "Create a text-based adventure game where the player makes choices.",
                skills:
                    "Functions, conditions, loops"
            }

        ];


        const { selectedProject } = this.state;


        return (

            <div className="projects-page">

                {/* HERO */}

                <section className="projects-hero">

                    <div className="projects-hero-icon">
                        🚀
                    </div>

                    <h1>
                        Python Projects
                    </h1>

                    <p>
                        Learn by building something awesome!
                    </p>

                </section>


                {/* PROJECTS */}

                <section className="projects-content">

                    <div className="project-heading">

                        <h2>
                            🛠️ Build Something Cool
                        </h2>

                        <p>
                            Pick a project and start creating.
                        </p>

                    </div>


                    <div className="projects-grid">

                        {projects.map(
                            (project, index) => (

                                <div
                                    className="project-card"
                                    key={index}
                                >

                                    <div className="project-icon">
                                        {project.emoji}
                                    </div>

                                    <span className="project-level">
                                        {project.level}
                                    </span>

                                    <h3>
                                        {project.title}
                                    </h3>

                                    <p>
                                        {project.description}
                                    </p>

                                    <div className="project-skills">

                                        <strong>
                                            Skills:
                                        </strong>

                                        <br />

                                        {project.skills}

                                    </div>

                                    <button
                                        className="project-button"
                                        onClick={() =>
                                            this.openProject(project)
                                        }
                                    >
                                        View Project →
                                    </button>

                                </div>

                            )
                        )}

                    </div>

                </section>


                {/* PROJECT MODAL */}

                {selectedProject && (

                    <div className="project-modal-overlay">

                        <div className="project-modal">

                            <button
                                className="modal-close"
                                onClick={this.closeProject}
                            >
                                ✕
                            </button>

                            <div className="modal-icon">
                                {selectedProject.emoji}
                            </div>

                            <h2>
                                {selectedProject.title}
                            </h2>

                            <p>
                                {selectedProject.description}
                            </p>

                            <div className="modal-skills">

                                <strong>
                                    What you'll practice:
                                </strong>

                                <p>
                                    {selectedProject.skills}
                                </p>

                            </div>

                            <div className="coming-soon">
                                🚀 Project workspace coming soon!
                            </div>

                        </div>

                    </div>

                )}

            </div>
        );
    }
}


export default Projects;