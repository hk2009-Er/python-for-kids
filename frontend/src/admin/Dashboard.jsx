import React, { Component } from "react";
import { Link } from "react-router-dom";


/* Topic list: reorder, edit, delete, create. */
class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deleting: null,     // topic being deleted (confirm dialog)
            confirmText: "",
            busy: false
        };
    }


    startDelete(topic) {
        this.setState({ deleting: topic, confirmText: "" });
    }


    cancelDelete = () => {
        if (!this.state.busy) {
            this.setState({ deleting: null, confirmText: "" });
        }
    };


    confirmDelete = async (event) => {

        event.preventDefault();

        const { deleting, confirmText, busy } = this.state;

        if (busy || !deleting || confirmText.trim() !== deleting.title.trim()) {
            return;
        }

        this.setState({ busy: true });

        try {
            await this.props.onDelete(deleting.slug);
            this.setState({ deleting: null, confirmText: "", busy: false });
        } catch {
            // The page shows the error toast.
            this.setState({ busy: false });
        }
    };


    renderDeleteDialog() {

        const { deleting, confirmText, busy } = this.state;

        if (!deleting) return null;

        const matches = confirmText.trim() === deleting.title.trim();

        return (
            <div className="adm-modal-backdrop" onClick={this.cancelDelete}>
                <form
                    className="adm-card adm-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="adm-delete-title"
                    onClick={e => e.stopPropagation()}
                    onSubmit={this.confirmDelete}
                >
                    <h2 id="adm-delete-title">🗑 Delete “{deleting.title}”?</h2>

                    <p>
                        This removes the topic with all its lessons, exercises
                        and quiz questions from the site. It can't be undone.
                    </p>

                    <label className="adm-field">
                        <span>Type <b>{deleting.title}</b> to confirm</span>
                        <input
                            name="confirm-delete"
                            value={confirmText}
                            onChange={e => this.setState({ confirmText: e.target.value })}
                            autoFocus
                            autoComplete="off"
                        />
                    </label>

                    <div className="adm-modal-actions">
                        <button type="button" className="adm-btn ghost" onClick={this.cancelDelete} disabled={busy}>
                            Cancel
                        </button>
                        <button type="submit" className="adm-btn danger" disabled={!matches || busy}>
                            {busy ? "Deleting..." : "Delete topic"}
                        </button>
                    </div>
                </form>
            </div>
        );
    }


    render() {

        const { topics, loading, reordering, onEdit, onNew, onMove, onLogout, onReload } = this.props;

        return (
            <div className="adm-dashboard">

                <div className="adm-dash-head">
                    <div>
                        <h1>🛠️ Content Admin</h1>
                        <p className="adm-muted">
                            {topics.length} topics · order here is the order on the site
                        </p>
                    </div>

                    <div className="adm-dash-actions">
                        <button type="button" className="adm-btn primary" onClick={onNew}>
                            ➕ New topic
                        </button>
                        <button type="button" className="adm-btn ghost" onClick={onReload} disabled={loading}>
                            ↻ Refresh
                        </button>
                        <Link to="/" className="adm-btn ghost">
                            🏠 Site
                        </Link>
                        <button type="button" className="adm-btn ghost" onClick={onLogout}>
                            Log out
                        </button>
                    </div>
                </div>

                {loading && topics.length === 0 && (
                    <p className="adm-empty">Loading topics...</p>
                )}

                {!loading && topics.length === 0 && (
                    <p className="adm-empty">No topics yet – create the first one!</p>
                )}

                <ol className="adm-topic-list">
                    {topics.map((topic, index) => (
                        <li key={topic.slug} className="adm-card adm-topic">

                            <div className="adm-topic-move">
                                <button
                                    type="button"
                                    className="adm-icon-btn"
                                    onClick={() => onMove(index, -1)}
                                    disabled={index === 0 || reordering}
                                    aria-label={`Move ${topic.title} up`}
                                    title="Move up"
                                >↑</button>
                                <button
                                    type="button"
                                    className="adm-icon-btn"
                                    onClick={() => onMove(index, 1)}
                                    disabled={index === topics.length - 1 || reordering}
                                    aria-label={`Move ${topic.title} down`}
                                    title="Move down"
                                >↓</button>
                            </div>

                            <div className="adm-topic-icon" aria-hidden="true">{topic.icon}</div>

                            <div className="adm-topic-info">
                                <h2>{topic.title}</h2>
                                <div className="adm-topic-meta">
                                    <span className={`adm-level ${String(topic.level).toLowerCase()}`}>
                                        {topic.level}
                                    </span>
                                    <span>📘 {(topic.lessons || []).length}</span>
                                    <span>🧩 {(topic.exercises || []).length}</span>
                                    <span>❓ {(topic.quiz || []).length}</span>
                                </div>
                            </div>

                            <div className="adm-topic-actions">
                                <button type="button" className="adm-btn primary small" onClick={() => onEdit(topic)}>
                                    ✏️ Edit
                                </button>
                                <a
                                    className="adm-btn ghost small"
                                    href={`/lesson/${topic.slug}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    👀 View<span className="adm-hide-phone"> on site</span>
                                </a>
                                <button type="button" className="adm-btn danger-ghost small" onClick={() => this.startDelete(topic)}>
                                    🗑 Delete
                                </button>
                            </div>

                        </li>
                    ))}
                </ol>

                {this.renderDeleteDialog()}

            </div>
        );
    }
}

export default Dashboard;
