import React, { Component } from "react";
import { Link } from "react-router-dom";

import projectData from "../data/projectData";

import "./Projects.css";


class Projects extends Component {

    render() {

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
                            Pick a project and follow the step-by-step guide.
                            Each one takes about 30 minutes and ends with a
                            program you can show your friends.
                        </p>

                    </div>


                    <div className="projects-grid">

                        {projectData.map(project => (

                            <div
                                className="project-card"
                                key={project.slug}
                            >

                                <div className="project-icon">
                                    {project.emoji}
                                </div>

                                <div className="project-meta">

                                    <span className="project-level">
                                        {project.level}
                                    </span>

                                    <span className="project-time">
                                        ⏱️ {project.time}
                                    </span>

                                </div>

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

                                    {project.skills.join(", ")}

                                </div>

                                <Link
                                    to={`/project/${project.slug}`}
                                    className="project-button"
                                >
                                    Start project →
                                </Link>

                            </div>

                        ))}

                    </div>

                </section>

            </div>
        );
    }
}


export default Projects;
