import React, { Component } from "react";

import {
    validateTopic,
    findDuplicateExerciseIds,
    LEVELS,
    DIFFICULTIES
} from "../shared/validateTopic";

import { runPython, needsDesktopPython } from "../utils/pythonRunner";

import {
    clone,
    slugify,
    moveItem,
    nextLessonId,
    nextExerciseId,
    nextQuizId,
    emptyLesson,
    emptyExercise,
    emptyQuestion,
    usesInput
} from "./helpers";

import CodeField from "./CodeField";
import ItemCard from "./ItemCard";


const TABS = [
    { key: "details", label: "📝 Details" },
    { key: "lessons", label: "📘 Lessons", list: "lessons" },
    { key: "exercises", label: "🧩 Exercises", list: "exercises" },
    { key: "quiz", label: "❓ Quiz", list: "quiz" }
];

const FLAGS = [
    {
        key: "flexible",
        label: "Flexible",
        help: "Any printed output passes – use when answers vary (random numbers, the kid's own text)."
    },
    {
        key: "usesInput",
        label: "Uses input()",
        help: "Shows an Input box so kids can type the lines input() reads."
    },
    {
        key: "turtle",
        label: "Turtle",
        help: "Draws with turtle – can't run in the browser; kids run it in IDLE/Thonny and press “I did it”."
    }
];

const LIST_LABELS = { lessons: "Lesson", exercises: "Exercise", quiz: "Question" };

const LEAVE_MESSAGE = "You have unsaved changes. Leave without saving?";


function toPoints(value) {
    if (value === "") return "";
    const n = Number(value);
    return Number.isFinite(n) ? Math.trunc(n) : "";
}


class TopicEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topic: clone(props.topic),
            isNew: Boolean(props.isNew),
            tab: "details",
            expanded: {},       // "lessons:101" -> true
            runs: {},           // "lessons:101" -> { running, output, error, note }
            testInput: {},      // exercise id -> stdin text
            dirty: false,
            saving: false,
            errors: [],
            errorTitle: null,
            liveCheck: false    // re-validate while typing after a failed save
        };
    }


    componentDidMount() {
        this.mounted = true;
        window.addEventListener("beforeunload", this.handleBeforeUnload);
        window.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("click", this.handleLinkClick, true);
    }


    componentWillUnmount() {
        this.mounted = false;
        window.removeEventListener("beforeunload", this.handleBeforeUnload);
        window.removeEventListener("keydown", this.handleKeyDown);
        document.removeEventListener("click", this.handleLinkClick, true);
    }


    /* ---------------- Guards ---------------- */

    handleBeforeUnload = (event) => {
        if (this.state.dirty) {
            event.preventDefault();
            event.returnValue = "";
        }
    };


    // Navbar/footer links would otherwise silently drop unsaved work.
    handleLinkClick = (event) => {

        if (!this.state.dirty) return;

        const link = event.target.closest && event.target.closest("a[href]");

        if (!link || link.target === "_blank") return;

        if (!window.confirm(LEAVE_MESSAGE)) {
            event.preventDefault();
            event.stopPropagation();
        }
    };


    handleKeyDown = (event) => {
        if ((event.ctrlKey || event.metaKey) && (event.key === "s" || event.key === "S")) {
            event.preventDefault();
            this.handleSave();
        }
    };


    handleBack = () => {
        if (this.state.dirty && !window.confirm(LEAVE_MESSAGE)) {
            return;
        }
        this.props.onClose();
    };


    /* ---------------- Editing ---------------- */

    updateTopic(changes) {
        this.setState(state => ({
            topic: { ...state.topic, ...changes },
            dirty: true
        }));
    }


    handleTitle = (title) => {
        const changes = { title };

        if (this.state.isNew) {
            changes.slug = slugify(title);
        }
        this.updateTopic(changes);
    };


    updateItem(list, index, changes) {
        this.setState(state => {
            const items = [...state.topic[list]];
            items[index] = { ...items[index], ...changes };
            return { topic: { ...state.topic, [list]: items }, dirty: true };
        });
    }


    nextId(list, topic) {
        if (list === "lessons") return nextLessonId(topic);
        if (list === "exercises") return nextExerciseId(topic, this.props.otherTopics);
        return nextQuizId(topic);
    }


    addItem(list) {
        this.setState(state => {
            const id = this.nextId(list, state.topic);
            const make = list === "lessons" ? emptyLesson
                : list === "exercises" ? emptyExercise : emptyQuestion;

            return {
                topic: { ...state.topic, [list]: [...state.topic[list], make(id)] },
                expanded: { ...state.expanded, [`${list}:${id}`]: true },
                dirty: true
            };
        });
    }


    duplicateItem(list, index) {
        this.setState(state => {
            const id = this.nextId(list, state.topic);
            const copy = { ...clone(state.topic[list][index]), id };

            if (copy.title) copy.title += " (copy)";

            const items = [...state.topic[list]];
            items.splice(index + 1, 0, copy);

            return {
                topic: { ...state.topic, [list]: items },
                expanded: { ...state.expanded, [`${list}:${id}`]: true },
                dirty: true
            };
        });
    }


    deleteItem(list, index) {
        const item = this.state.topic[list][index];
        const name = item.title || item.question || "this item";

        if (!window.confirm(`Delete ${LIST_LABELS[list].toLowerCase()} “${name}”?`)) {
            return;
        }

        this.setState(state => ({
            topic: { ...state.topic, [list]: state.topic[list].filter((_, i) => i !== index) },
            dirty: true
        }));
    }


    moveListItem(list, index, delta) {
        this.setState(state => ({
            topic: { ...state.topic, [list]: moveItem(state.topic[list], index, delta) },
            dirty: true
        }));
    }


    toggle(key) {
        this.setState(state => ({
            expanded: { ...state.expanded, [key]: !state.expanded[key] }
        }));
    }


    setRun(key, value) {
        if (!this.mounted) return;
        this.setState(state => ({ runs: { ...state.runs, [key]: value } }));
    }


    /* ---------------- Running Python ---------------- */

    runLesson = async (index) => {

        const lesson = this.state.topic.lessons[index];
        const key = `lessons:${lesson.id}`;

        if (needsDesktopPython(lesson.example)) {
            this.setRun(key, { note: "🐢 Turtle code can't run in the browser – type the output yourself (or leave it empty)." });
            return;
        }
        if (usesInput(lesson.example)) {
            this.setRun(key, { note: "⌨️ This code uses input(), so it can't be run automatically – type the output yourself, including what the user would type." });
            return;
        }
        if (!lesson.example.trim()) {
            this.setRun(key, { note: "Write some example code first." });
            return;
        }

        this.setRun(key, { running: true });

        const res = await runPython(lesson.example);

        if (!this.mounted) return;

        if (res.error) {
            this.setRun(key, { output: res.stdout, error: res.error });
            return;
        }

        // Find the lesson again - it may have moved while running.
        const at = this.state.topic.lessons.findIndex(l => l.id === lesson.id);

        if (at >= 0) {
            this.updateItem("lessons", at, { output: res.stdout.replace(/\n$/, "") });
        }
        this.setRun(key, { note: "✅ Output filled in from the run." });
    };


    testExercise = async (index) => {

        const exercise = this.state.topic.exercises[index];
        const key = `exercises:${exercise.id}`;

        if (exercise.turtle || needsDesktopPython(exercise.answer)) {
            this.setRun(key, { note: "🐢 Turtle code can't run in the browser – test it in IDLE or Thonny." });
            return;
        }
        if (!exercise.answer.trim()) {
            this.setRun(key, { note: "Write the answer code first." });
            return;
        }

        this.setRun(key, { running: true });

        const res = await runPython(exercise.answer, {
            stdin: this.state.testInput[exercise.id] || ""
        });

        let note = null;

        if (res.ranOutOfInput) {
            note = "💬 The program asked for more input than the test input box has.";
        } else if (!res.error && !res.programOutput.trim()) {
            note = "⚠️ The answer printed nothing – the checker compares printed output.";
        } else if (!res.error) {
            note = "✅ Ran without errors. Output:";
        }

        this.setRun(key, { output: res.stdout, error: res.error, note });
    };


    /* ---------------- Saving ---------------- */

    handleSave = async () => {

        if (this.state.saving) return;

        const result = validateTopic(this.state.topic);

        if (!result.ok) {
            this.setState({ errors: result.errors, errorTitle: "Please fix these before saving:", liveCheck: true });
            this.scrollToErrors();
            return;
        }

        const duplicates = findDuplicateExerciseIds([...this.props.otherTopics, result.topic])
            .map(d => `Exercise id ${d.id} is also used in topic “${d.topics[0]}”.`);

        if (duplicates.length) {
            this.setState({ errors: duplicates, errorTitle: "Exercise ids must be unique across all topics:" });
            this.scrollToErrors();
            return;
        }

        this.setState({ saving: true, errors: [], errorTitle: null, liveCheck: false });

        try {
            const saved = await this.props.onSave(result.topic, this.state.isNew);

            if (!this.mounted) return;

            this.setState({
                topic: clone(saved),
                isNew: false,
                dirty: false,
                saving: false
            });
        } catch (err) {
            if (!this.mounted) return;

            let title = err.message;

            if (err.status === 409) {
                title = "A topic with this slug already exists – change the title.";
            }

            this.setState({
                saving: false,
                errors: err.details || [],
                errorTitle: title
            });
            this.scrollToErrors();
        }
    };


    scrollToErrors() {
        window.requestAnimationFrame(() => {
            const box = document.getElementById("adm-errors");
            if (box) box.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    }


    /* ---------------- Render ---------------- */

    renderRunResult(key) {

        const run = this.state.runs[key];

        if (!run || run.running) return null;

        return (
            <div className="adm-run-result">
                {run.note && <p className="adm-run-note">{run.note}</p>}
                {run.output ? <pre className="adm-output">{run.output}</pre> : null}
                {run.error && <pre className="adm-output error">{run.error}</pre>}
            </div>
        );
    }


    renderDetails() {

        const { topic, isNew } = this.state;

        return (
            <div className="adm-card adm-form">

                <div className="adm-row">
                    <label className="adm-field grow">
                        <span>Title</span>
                        <input
                            name="topic-title"
                            value={topic.title}
                            onChange={e => this.handleTitle(e.target.value)}
                            placeholder="e.g. Python Basics"
                        />
                    </label>

                    <label className="adm-field small">
                        <span>Icon</span>
                        <input
                            name="topic-icon"
                            value={topic.icon}
                            onChange={e => this.updateTopic({ icon: e.target.value })}
                            className="adm-emoji-input"
                        />
                    </label>
                </div>

                <div className="adm-row">
                    <label className="adm-field grow">
                        <span>Slug {isNew ? "(made from the title)" : "(can't be changed)"}</span>
                        <input name="topic-slug" value={topic.slug} readOnly className="adm-readonly" />
                    </label>

                    <label className="adm-field">
                        <span>Level</span>
                        <select
                            name="topic-level"
                            value={topic.level}
                            onChange={e => this.updateTopic({ level: e.target.value })}
                        >
                            {LEVELS.map(level => <option key={level}>{level}</option>)}
                        </select>
                    </label>
                </div>

                <label className="adm-field">
                    <span>Description</span>
                    <textarea
                        name="topic-description"
                        rows={3}
                        value={topic.description}
                        onChange={e => this.updateTopic({ description: e.target.value })}
                    />
                </label>

                <p className="adm-muted small">Topic id: {topic.id}</p>

            </div>
        );
    }


    renderLesson(lesson, index) {

        const key = `lessons:${lesson.id}`;
        const run = this.state.runs[key];
        const set = changes => this.updateItem("lessons", index, changes);

        return (
            <div className="adm-form">
                <div className="adm-row">
                    <label className="adm-field grow">
                        <span>Title</span>
                        <input name="lesson-title" value={lesson.title} onChange={e => set({ title: e.target.value })} />
                    </label>
                    <label className="adm-field small">
                        <span>Icon</span>
                        <input value={lesson.icon} onChange={e => set({ icon: e.target.value })} className="adm-emoji-input" />
                    </label>
                    <label className="adm-field small">
                        <span>Points</span>
                        <input type="number" min="0" value={lesson.points} onChange={e => set({ points: toPoints(e.target.value) })} />
                    </label>
                </div>

                <label className="adm-field">
                    <span>Explanation</span>
                    <textarea name="lesson-explanation" rows={4} value={lesson.explanation} onChange={e => set({ explanation: e.target.value })} />
                </label>

                <div className="adm-field">
                    <span>Example code</span>
                    <CodeField name="lesson-example" value={lesson.example} onChange={example => set({ example })} />
                </div>

                <div className="adm-field">
                    <div className="adm-field-head">
                        <span>Output</span>
                        <button
                            type="button"
                            className="adm-btn run small"
                            onClick={() => this.runLesson(index)}
                            disabled={Boolean(run && run.running)}
                        >
                            {run && run.running ? "Running..." : "▶ Run to fill output"}
                        </button>
                    </div>
                    <CodeField name="lesson-output" value={lesson.output} onChange={output => set({ output })} rows={3} />
                    {this.renderRunResult(key)}
                </div>

                <p className="adm-muted small">Lesson id: {lesson.id}</p>
            </div>
        );
    }


    renderExercise(exercise, index) {

        const key = `exercises:${exercise.id}`;
        const run = this.state.runs[key];
        const set = changes => this.updateItem("exercises", index, changes);
        const showInput = exercise.usesInput || usesInput(exercise.answer);

        return (
            <div className="adm-form">
                <div className="adm-row">
                    <label className="adm-field grow">
                        <span>Title</span>
                        <input name="exercise-title" value={exercise.title} onChange={e => set({ title: e.target.value })} />
                    </label>
                    <label className="adm-field">
                        <span>Difficulty</span>
                        <select name="exercise-difficulty" value={exercise.difficulty} onChange={e => set({ difficulty: e.target.value })}>
                            {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
                        </select>
                    </label>
                    <label className="adm-field small">
                        <span>Points</span>
                        <input type="number" min="0" value={exercise.points} onChange={e => set({ points: toPoints(e.target.value) })} />
                    </label>
                </div>

                <label className="adm-field">
                    <span>Mission (description)</span>
                    <textarea name="exercise-description" rows={3} value={exercise.description} onChange={e => set({ description: e.target.value })} />
                </label>

                <label className="adm-field">
                    <span>Hint</span>
                    <input name="exercise-hint" value={exercise.hint} onChange={e => set({ hint: e.target.value })} />
                </label>

                <div className="adm-field">
                    <span>Answer code</span>
                    <CodeField name="exercise-answer" value={exercise.answer} onChange={answer => set({ answer })} />
                </div>

                <fieldset className="adm-flags">
                    <legend>Options</legend>
                    {FLAGS.map(flag => (
                        <label key={flag.key} className="adm-flag">
                            <input
                                type="checkbox"
                                name={`flag-${flag.key}`}
                                checked={Boolean(exercise[flag.key])}
                                onChange={e => set({ [flag.key]: e.target.checked })}
                            />
                            <span>
                                <b>{flag.label}</b>
                                <small>{flag.help}</small>
                            </span>
                        </label>
                    ))}
                </fieldset>

                {showInput && (
                    <label className="adm-field">
                        <span>Test input (one line per input() – not saved)</span>
                        <textarea
                            rows={2}
                            className="adm-code"
                            value={this.state.testInput[exercise.id] || ""}
                            onChange={e => {
                                const value = e.target.value;
                                this.setState(state => ({
                                    testInput: { ...state.testInput, [exercise.id]: value }
                                }));
                            }}
                        />
                    </label>
                )}

                <div className="adm-field">
                    <div className="adm-field-head">
                        <button
                            type="button"
                            className="adm-btn run small"
                            onClick={() => this.testExercise(index)}
                            disabled={Boolean(run && run.running)}
                        >
                            {run && run.running ? "Running..." : "▶ Test answer"}
                        </button>
                    </div>
                    {this.renderRunResult(key)}
                </div>

                <p className="adm-muted small">
                    Exercise id: {exercise.id} (used in the URL /exercise/{exercise.id})
                </p>
            </div>
        );
    }


    renderQuestion(question, index) {

        const set = changes => this.updateItem("quiz", index, changes);
        const options = question.options;

        const setOption = (i, value) => {
            const next = [...options];
            next[i] = value;
            set({ options: next });
        };

        const removeOption = (i) => {
            const next = options.filter((_, j) => j !== i);
            let answer = question.answer;

            if (answer === i) answer = 0;
            else if (answer > i) answer -= 1;

            set({ options: next, answer });
        };

        return (
            <div className="adm-form">
                <label className="adm-field">
                    <span>Question</span>
                    <textarea name="quiz-question" rows={2} value={question.question} onChange={e => set({ question: e.target.value })} />
                </label>

                <div className="adm-field">
                    <span>Options (select the correct one)</span>

                    <div className="adm-options">
                        {options.map((option, i) => (
                            <div key={i} className={question.answer === i ? "adm-option correct" : "adm-option"}>
                                <input
                                    type="radio"
                                    name={`correct-${question.id}`}
                                    checked={question.answer === i}
                                    onChange={() => set({ answer: i })}
                                    aria-label={`Option ${i + 1} is correct`}
                                />
                                <input
                                    className="adm-option-text"
                                    value={option}
                                    onChange={e => setOption(i, e.target.value)}
                                    placeholder={`Option ${i + 1}`}
                                />
                                <button
                                    type="button"
                                    className="adm-icon-btn danger"
                                    onClick={() => removeOption(i)}
                                    disabled={options.length <= 2}
                                    title="Remove option"
                                    aria-label={`Remove option ${i + 1}`}
                                >✕</button>
                            </div>
                        ))}
                    </div>

                    {options.length < 6 && (
                        <button
                            type="button"
                            className="adm-btn ghost small adm-add-option"
                            onClick={() => set({ options: [...options, ""] })}
                        >
                            ➕ Add option
                        </button>
                    )}
                </div>

                <label className="adm-field">
                    <span>Explanation (shown after answering)</span>
                    <textarea name="quiz-explanation" rows={2} value={question.explanation} onChange={e => set({ explanation: e.target.value })} />
                </label>

                <p className="adm-muted small">Question id: {question.id}</p>
            </div>
        );
    }


    renderList(list) {

        const items = this.state.topic[list];
        const label = LIST_LABELS[list];

        const renderBody = {
            lessons: (item, i) => this.renderLesson(item, i),
            exercises: (item, i) => this.renderExercise(item, i),
            quiz: (item, i) => this.renderQuestion(item, i)
        }[list];

        return (
            <div className="adm-list">

                {items.length === 0 && (
                    <p className="adm-empty">No {label.toLowerCase()}s yet.</p>
                )}

                {items.map((item, index) => {
                    const key = `${list}:${item.id}`;

                    return (
                        <ItemCard
                            key={key}
                            index={index}
                            count={items.length}
                            label={label}
                            summary={item.title || item.question}
                            badge={list === "exercises" ? item.difficulty : null}
                            expanded={Boolean(this.state.expanded[key])}
                            onToggle={() => this.toggle(key)}
                            onMove={delta => this.moveListItem(list, index, delta)}
                            onDuplicate={() => this.duplicateItem(list, index)}
                            onDelete={() => this.deleteItem(list, index)}
                        >
                            {renderBody(item, index)}
                        </ItemCard>
                    );
                })}

                <button
                    type="button"
                    className="adm-btn primary adm-add"
                    onClick={() => this.addItem(list)}
                >
                    ➕ Add {label.toLowerCase()}
                </button>

            </div>
        );
    }


    render() {

        const { topic, isNew, tab, dirty, saving, liveCheck } = this.state;
        let { errors, errorTitle } = this.state;

        // After a failed validation, keep the list in sync with edits.
        if (liveCheck) {
            const result = validateTopic(topic);
            errors = result.errors;
            if (result.ok) errorTitle = null;
        }

        return (
            <div className="adm-editor">

                <div className="adm-editor-bar">

                    <button type="button" className="adm-btn ghost" onClick={this.handleBack}>
                        ← Topics
                    </button>

                    <div className="adm-editor-title">
                        <span aria-hidden="true">{topic.icon || "📘"}</span>
                        <h1>{topic.title || (isNew ? "New topic" : "Untitled")}</h1>
                        {dirty && <span className="adm-dirty">● Unsaved</span>}
                    </div>

                    <div className="adm-editor-actions">
                        {!isNew && (
                            <a
                                className="adm-btn ghost"
                                href={`/lesson/${topic.slug}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                👀 View on site
                            </a>
                        )}
                        <button
                            type="button"
                            className="adm-btn success adm-save"
                            onClick={this.handleSave}
                            disabled={saving}
                            title="Save (Ctrl+S)"
                        >
                            {saving ? "Saving..." : "💾 Save"}
                        </button>
                    </div>

                </div>

                {errorTitle && (
                    <div id="adm-errors" className="adm-alert error" role="alert">
                        <strong>{errorTitle}</strong>
                        {errors.length > 0 && (
                            <ul>
                                {errors.map((error, i) => <li key={i}>{error}</li>)}
                            </ul>
                        )}
                    </div>
                )}

                <div className="adm-tabs" role="tablist">
                    {TABS.map(t => (
                        <button
                            key={t.key}
                            type="button"
                            role="tab"
                            aria-selected={tab === t.key}
                            className={tab === t.key ? "adm-tab active" : "adm-tab"}
                            onClick={() => this.setState({ tab: t.key })}
                        >
                            {t.label}
                            {t.list && <span className="adm-tab-count">{topic[t.list].length}</span>}
                        </button>
                    ))}
                </div>

                {tab === "details" ? this.renderDetails() : this.renderList(tab)}

            </div>
        );
    }
}

export default TopicEditor;
