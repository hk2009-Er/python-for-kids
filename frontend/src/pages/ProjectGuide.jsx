import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";

import projectData from "../data/projectData";
import lessonData from "../data/lessonData";

import "./ProjectGuide.css";


/*
    Step-by-step guide for one project (/project/:slug).

    Rendered on the server too, so the browser is only touched in
    event handlers and lifecycle methods.
*/

function copyText(text) {

    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
    }

    return new Promise((resolve, reject) => {

        const area = document.createElement("textarea");

        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";

        document.body.appendChild(area);
        area.select();

        try {
            document.execCommand("copy");
            resolve();
        } catch (error) {
            reject(error);
        } finally {
            document.body.removeChild(area);
        }
    });
}


class ProjectGuide extends Component {

    constructor(props) {
        super(props);

        this.state = {
            copied: null
        };
    }


    componentWillUnmount() {

        clearTimeout(this.copyTimer);
    }


    copyCode = (key, code) => {

        copyText(code.replace(/\n$/, "")).then(
            () => {
                this.setState({ copied: key });

                clearTimeout(this.copyTimer);

                this.copyTimer = setTimeout(() => {
                    this.setState({ copied: null });
                }, 2000);
            },
            () => {
                this.setState({ copied: null });
            }
        );
    };


    renderCode(key, code, label) {

        const copied = this.state.copied === key;

        return (

            <div className="pg-code">

                <div className="pg-code-header">

                    <span>{label}</span>

                    <button
                        type="button"
                        className="pg-copy-button"
                        onClick={() => this.copyCode(key, code)}
                        aria-label="Copy code"
                    >
                        {copied ? "✅ Copied!" : "📋 Copy"}
                    </button>

                </div>

                <pre>
                    <code>{code}</code>
                </pre>

            </div>

        );
    }


    renderOutput(text, label) {

        return (

            <div className="pg-output">

                <div className="pg-output-header">
                    {label}
                </div>

                <pre>{text}</pre>

            </div>

        );
    }


    render() {

        const { slug } = this.props;

        const index = projectData.findIndex(
            project => project.slug === slug
        );


        if (index === -1) {

            return (

                <div className="pg-page">

                    <section className="pg-content">

                        <div className="pg-card pg-not-found">

                            <div className="pg-not-found-icon">
                                🔍
                            </div>

                            <h1>
                                Project not found
                            </h1>

                            <p>
                                We looked everywhere, but we couldn't find
                                that project. Maybe the link has a typo?
                                There are lots of other fun things to build.
                            </p>

                            <Link
                                to="/projects"
                                className="pg-button primary"
                            >
                                See all projects
                            </Link>

                        </div>

                    </section>

                </div>

            );
        }


        const project = projectData[index];
        const previous = projectData[index - 1] || null;
        const next = projectData[index + 1] || null;

        const related = project.relatedTopics
            .map(topicSlug => lessonData.find(
                topic => topic.slug === topicSlug
            ))
            .filter(Boolean);


        return (

            <div className="pg-page">


                {/* HERO */}

                <section className="pg-hero">

                    <div className="pg-hero-inner">

                        <Link
                            to="/projects"
                            className="pg-back-link"
                        >
                            ← All projects
                        </Link>


                        <div className="pg-title">

                            <span className="pg-title-icon">
                                {project.emoji}
                            </span>

                            <div>

                                <p className="pg-title-meta">
                                    <span className="pg-level">
                                        {project.level}
                                    </span>
                                    <span>
                                        ⏱️ {project.time}
                                    </span>
                                    <span>
                                        👣 {project.steps.length} steps
                                    </span>
                                </p>

                                <h1>
                                    {project.title}
                                </h1>

                            </div>

                        </div>


                        <p className="pg-description">
                            {project.description}
                        </p>


                        <ul className="pg-skills" aria-label="Skills you will practise">

                            {project.skills.map(skill => (
                                <li key={skill}>
                                    {skill}
                                </li>
                            ))}

                        </ul>

                    </div>

                </section>



                <section className="pg-content">


                    {/* INTRO */}

                    <div className="pg-card">

                        <h2>
                            🎯 What we're going to build
                        </h2>

                        {project.intro.map((paragraph, i) => (
                            <p
                                className="pg-text"
                                key={i}
                            >
                                {paragraph}
                            </p>
                        ))}

                        <div className="pg-tip">
                            💡 <strong>How to use this guide:</strong>{" "}
                            work through the steps in order and run your
                            code after each one. Steps marked
                            {" "}<em>snippet</em>{" "}are pieces that slot into
                            the program you are building, so they won't
                            run on their own. Programs that use input()
                            need a Python editor such as IDLE, Thonny or
                            Replit, where you can type your answers.
                        </div>

                    </div>



                    {/* STEPS */}

                    <h2 className="pg-section-title">
                        👣 Step by step
                    </h2>


                    <ol className="pg-steps">

                        {project.steps.map((step, i) => (

                            <li
                                className="pg-card pg-step"
                                key={step.title}
                            >

                                <div className="pg-step-heading">

                                    <span className="pg-step-number">
                                        {i + 1}
                                    </span>

                                    <h3>
                                        {step.title}
                                    </h3>

                                </div>


                                <p className="pg-text">
                                    {step.explanation}
                                </p>


                                {this.renderCode(
                                    `step-${i}`,
                                    step.code,
                                    step.partial
                                        ? "🧩 Snippet: add to your program"
                                        : "🐍 Python"
                                )}


                                {step.output && this.renderOutput(
                                    step.output,
                                    "▶ Output"
                                )}


                                {step.note && (
                                    <p className="pg-note">
                                        🎲 {step.note}
                                    </p>
                                )}

                            </li>

                        ))}

                    </ol>



                    {/* FULL PROGRAM */}

                    <div className="pg-card">

                        <h2>
                            ✅ The finished program
                        </h2>

                        <p className="pg-text">
                            Here is the whole program with every step
                            put together. If something isn't working in
                            your version, compare it with this one line by
                            line. Check the spelling, the colons at the end
                            of if and while lines, and that the indentation
                            (the spaces at the start of lines) matches.
                        </p>

                        {this.renderCode(
                            "full",
                            project.fullCode,
                            "🐍 " + project.title
                        )}

                    </div>



                    {/* SAMPLE RUN */}

                    <div className="pg-card">

                        <h2>
                            🖥️ Sample run
                        </h2>

                        <p className="pg-text">
                            This is what it looks like when someone plays.
                            The words after each question are what the
                            player typed.
                        </p>

                        {this.renderOutput(
                            project.sampleRun,
                            "▶ Output"
                        )}

                    </div>



                    {/* CHALLENGES */}

                    <div className="pg-card">

                        <h2>
                            🚀 Make it your own
                        </h2>

                        <p className="pg-text">
                            Finished? Brilliant! Real programmers are always
                            improving their programs. Try one of these
                            challenges to make the project truly yours.
                        </p>

                        <ul className="pg-challenges">

                            {project.challenges.map((challenge, i) => (
                                <li key={i}>
                                    <span className="pg-challenge-star">
                                        ⭐
                                    </span>
                                    <span>
                                        {challenge}
                                    </span>
                                </li>
                            ))}

                        </ul>

                    </div>



                    {/* RELATED LESSONS */}

                    {related.length > 0 && (

                        <div className="pg-card">

                            <h2>
                                📚 Lessons that help
                            </h2>

                            <p className="pg-text">
                                Stuck on a step? These lessons explain the
                                Python ideas used in this project.
                            </p>

                            <div className="pg-lessons">

                                {related.map(topic => (
                                    <Link
                                        key={topic.slug}
                                        to={`/lesson/${topic.slug}`}
                                        className="pg-lesson-link"
                                    >
                                        <span>{topic.icon}</span>
                                        {topic.title}
                                    </Link>
                                ))}

                            </div>

                        </div>

                    )}



                    {/* PREV / NEXT */}

                    <nav
                        className="pg-nav"
                        aria-label="More projects"
                    >

                        {previous ? (
                            <Link
                                to={`/project/${previous.slug}`}
                                className="pg-nav-link"
                            >
                                <small>← Previous project</small>
                                <span>
                                    {previous.emoji} {previous.title}
                                </span>
                            </Link>
                        ) : (
                            <span className="pg-nav-spacer" />
                        )}

                        {next ? (
                            <Link
                                to={`/project/${next.slug}`}
                                className="pg-nav-link next"
                            >
                                <small>Next project →</small>
                                <span>
                                    {next.emoji} {next.title}
                                </span>
                            </Link>
                        ) : (
                            <span className="pg-nav-spacer" />
                        )}

                    </nav>


                    <div className="pg-back-all">

                        <Link
                            to="/projects"
                            className="pg-button secondary"
                        >
                            ← Back to all projects
                        </Link>

                    </div>

                </section>

            </div>

        );
    }
}


function ProjectGuideWithParams(props) {

    const params = useParams();

    return (
        <ProjectGuide
            {...props}
            key={params.slug}
            slug={params.slug}
        />
    );
}


export default ProjectGuideWithParams;
