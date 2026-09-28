import React, { Component } from "react";

import * as api from "../admin/api";
import { nextTopicId, emptyTopic, moveItem } from "../admin/helpers";

import Login from "../admin/Login";
import Dashboard from "../admin/Dashboard";
import TopicEditor from "../admin/TopicEditor";

import "./Admin.css";


/*
    /admin - content editor for topics, lessons, exercises and quizzes.

    view: "checking" -> "login" | "dashboard" | "editor"

    If the session expires while editing, the login form is shown on
    top of the editor so unsaved work isn't lost.
*/
class Admin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            view: "checking",
            needLogin: false,
            offlineMessage: null,
            topics: [],
            loading: false,
            reordering: false,
            editing: null,      // { topic, isNew }
            toast: null         // { kind, text }
        };
    }


    componentDidMount() {

        this.mounted = true;

        // Keep the admin page out of search engines.
        this.robotsMeta = document.createElement("meta");
        this.robotsMeta.name = "robots";
        this.robotsMeta.content = "noindex, nofollow";
        document.head.appendChild(this.robotsMeta);

        this.previousTitle = document.title;
        document.title = "Admin | Python for Kids";

        this.checkSession();
    }


    componentWillUnmount() {

        this.mounted = false;
        clearTimeout(this.toastTimer);

        if (this.robotsMeta) {
            this.robotsMeta.remove();
        }
        if (this.previousTitle) {
            document.title = this.previousTitle;
        }
    }


    /* ---------------- Helpers ---------------- */

    showToast(text, kind = "success") {

        clearTimeout(this.toastTimer);
        this.setState({ toast: { text, kind } });

        this.toastTimer = setTimeout(() => {
            if (this.mounted) this.setState({ toast: null });
        }, kind === "error" ? 6000 : 3500);
    }


    /*
        Shared error handling: 401 -> login, API missing -> login with
        the "API not running" message. Other errors are re-thrown.
    */
    handleApiError(err) {

        if (!this.mounted) return;

        if (err.kind === "unauthorized") {
            if (this.state.view === "editor") {
                this.setState({ needLogin: true, offlineMessage: null });
            } else {
                this.setState({ view: "login", needLogin: false, topics: [], offlineMessage: null });
            }
            this.showToast("Your session ended – please log in again.", "error");
            return;
        }

        if (err.kind === "offline") {
            if (this.state.view === "editor") {
                this.showToast(err.message, "error");
            } else {
                this.setState({ view: "login", offlineMessage: err.message });
            }
            return;
        }

        this.showToast(err.message, "error");
    }


    /* ---------------- Session ---------------- */

    async checkSession() {

        try {
            const { authenticated } = await api.getSession();

            if (!this.mounted) return;

            if (authenticated) {
                this.setState({ view: "dashboard", offlineMessage: null });
                this.loadTopics();
            } else {
                this.setState({ view: "login", offlineMessage: null });
            }
        } catch (err) {
            if (err.kind === "unauthorized") {
                this.setState({ view: "login", offlineMessage: null });
            } else if (this.mounted) {
                this.setState({ view: "login", offlineMessage: err.message });
            }
        }
    }


    handleLoggedIn = () => {

        if (this.state.needLogin) {
            this.setState({ needLogin: false });
            this.showToast("Logged in again – you can save now.");
            return;
        }

        this.setState({ view: "dashboard", offlineMessage: null });
        this.loadTopics();
    };


    handleLogout = async () => {

        try {
            await api.logout();
        } catch {
            // Logged out locally either way.
        }

        if (this.mounted) {
            this.setState({ view: "login", topics: [], editing: null });
        }
    };


    /* ---------------- Topics ---------------- */

    loadTopics = async () => {

        this.setState({ loading: true });

        try {
            const { topics } = await api.listTopics();

            if (this.mounted) {
                this.setState({ topics: Array.isArray(topics) ? topics : [], loading: false });
            }
        } catch (err) {
            if (this.mounted) this.setState({ loading: false });
            this.handleApiError(err);
        }
    };


    handleMove = async (index, delta) => {

        const before = this.state.topics;
        const after = moveItem(before, index, delta);

        if (after === before || this.state.reordering) return;

        this.setState({ topics: after, reordering: true });

        try {
            await api.saveOrder(after.map(t => t.slug));
            if (this.mounted) this.setState({ reordering: false });
        } catch (err) {
            if (this.mounted) this.setState({ topics: before, reordering: false });
            this.handleApiError(err);
        }
    };


    handleDelete = async (slug) => {

        try {
            await api.deleteTopic(slug);
        } catch (err) {
            this.handleApiError(err);
            throw err;
        }

        if (!this.mounted) return;

        const topic = this.state.topics.find(t => t.slug === slug);

        this.setState(state => ({ topics: state.topics.filter(t => t.slug !== slug) }));
        this.showToast(`Deleted “${topic ? topic.title : slug}”.`);
    };


    handleNew = () => {
        this.setState(state => ({
            view: "editor",
            editing: { topic: emptyTopic(nextTopicId(state.topics)), isNew: true, key: "new-" + Date.now() }
        }));
        window.scrollTo(0, 0);
    };


    handleEdit = (topic) => {
        this.setState({ view: "editor", editing: { topic, isNew: false, key: "edit-" + topic.slug } });
        window.scrollTo(0, 0);
    };


    handleCloseEditor = () => {
        this.setState({ view: "dashboard", editing: null });
        window.scrollTo(0, 0);
    };


    // Called by the editor with an already-validated topic.
    handleSave = async (topic, isNew) => {

        let saved;

        try {
            const res = isNew
                ? await api.createTopic(topic)
                : await api.updateTopic(topic.slug, topic);

            saved = res.topic || topic;
        } catch (err) {
            if (err.kind === "unauthorized" || err.kind === "offline") {
                this.handleApiError(err);
            }
            throw err;
        }

        if (this.mounted) {
            this.setState(state => {
                const exists = state.topics.some(t => t.slug === saved.slug);
                const topics = exists
                    ? state.topics.map(t => (t.slug === saved.slug ? saved : t))
                    : [...state.topics, saved];

                return { topics, editing: { ...state.editing, topic: saved, isNew: false } };
            });
            this.showToast(`💾 Saved “${saved.title}”.`);
        }

        return saved;
    };


    /* ---------------- Render ---------------- */

    renderBody() {

        const { view, topics, loading, reordering, editing, needLogin, offlineMessage } = this.state;

        if (view === "checking") {
            return <p className="adm-empty">🔐 Checking your session...</p>;
        }

        if (view === "login") {
            return (
                <Login
                    onLoggedIn={this.handleLoggedIn}
                    offlineMessage={offlineMessage}
                />
            );
        }

        if (view === "editor" && editing) {
            const otherTopics = topics.filter(t => t.slug !== editing.topic.slug);

            return (
                <>
                    <TopicEditor
                        key={editing.key}
                        topic={editing.topic}
                        isNew={editing.isNew}
                        otherTopics={otherTopics}
                        onSave={this.handleSave}
                        onClose={this.handleCloseEditor}
                    />

                    {needLogin && (
                        <div className="adm-modal-backdrop">
                            <Login onLoggedIn={this.handleLoggedIn} />
                        </div>
                    )}
                </>
            );
        }

        return (
            <Dashboard
                topics={topics}
                loading={loading}
                reordering={reordering}
                onEdit={this.handleEdit}
                onNew={this.handleNew}
                onMove={this.handleMove}
                onDelete={this.handleDelete}
                onLogout={this.handleLogout}
                onReload={this.loadTopics}
            />
        );
    }


    render() {

        const { toast } = this.state;

        return (
            <div className="admin-page">

                <div className="admin-inner">
                    {this.renderBody()}
                </div>

                {toast && (
                    <div
                        className={`adm-toast ${toast.kind}`}
                        role={toast.kind === "error" ? "alert" : "status"}
                    >
                        {toast.text}
                    </div>
                )}

            </div>
        );
    }
}

export default Admin;
