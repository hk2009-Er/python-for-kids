import React, { Component } from "react";
import { Link } from "react-router-dom";

import { login } from "./api";


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: "",
            busy: false,
            error: null
        };
    }


    handleSubmit = async (event) => {

        event.preventDefault();

        if (this.state.busy || !this.state.password) {
            return;
        }

        this.setState({ busy: true, error: null });

        try {
            await login(this.state.password);
            this.props.onLoggedIn();
        } catch (err) {
            let error = err.message;

            if (err.kind === "unauthorized") {
                error = "Wrong password. Please try again.";
            } else if (err.status === 429) {
                error = "Too many attempts. Please wait a few minutes and try again.";
            }

            this.setState({ busy: false, error });
        }
    };


    render() {

        const { password, busy, error } = this.state;
        const offlineMessage = this.props.offlineMessage;

        return (
            <div className="adm-login">

                <form className="adm-card adm-login-card" onSubmit={this.handleSubmit}>

                    <div className="adm-login-icon" aria-hidden="true">🔐</div>

                    <h1>Admin Login</h1>

                    <p className="adm-muted">
                        Edit topics, lessons, exercises and quizzes.
                    </p>

                    {offlineMessage && (
                        <div className="adm-alert error" role="alert">
                            {offlineMessage}
                        </div>
                    )}

                    <label className="adm-field">
                        <span>Password</span>
                        <input
                            type="password"
                            value={password}
                            onChange={e => this.setState({ password: e.target.value })}
                            autoComplete="current-password"
                            autoFocus
                        />
                    </label>

                    {error && (
                        <div className="adm-alert error" role="alert">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="adm-btn primary wide"
                        disabled={busy || !password}
                    >
                        {busy ? "Logging in..." : "Log in"}
                    </button>

                    <Link to="/" className="adm-back-link">← Back to the site</Link>

                </form>

            </div>
        );
    }
}

export default Login;
