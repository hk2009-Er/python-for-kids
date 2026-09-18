import React, { Component } from "react";
import "../styles/InfoPages.css";

class Contact extends Component {

    handleEmailClick = () => {
        window.location.href =
            "mailto:pythonforkids@gmail.com?subject=Python for Kids - Contact";
    };

    render() {
        return (
            <div className="info-page">

                <div className="info-hero">
                    <div className="info-hero-icon">📩</div>

                    <h1>Contact Us</h1>

                    <p>
                        Have a question, suggestion or feedback?
                    </p>
                </div>

                <div className="info-container contact-container">

                    <section className="contact-card">

                        <div className="contact-icon">
                            📧
                        </div>

                        <h2>Email Us</h2>

                        <p>
                            For questions, suggestions, feedback or
                            website-related enquiries, you can contact us
                            through email.
                        </p>

                        <button
                            className="info-button"
                            onClick={this.handleEmailClick}
                        >
                            ✉️ Send Email
                        </button>

                    </section>

                    <section className="contact-card">

                        <div className="contact-icon">
                            💡
                        </div>

                        <h2>Suggestions</h2>

                        <p>
                            Have an idea for a new Python lesson, exercise,
                            quiz or game?
                        </p>

                        <p>
                            We would love to hear your suggestions.
                        </p>

                    </section>

                    <section className="contact-card">

                        <div className="contact-icon">
                            🐛
                        </div>

                        <h2>Found a Problem?</h2>

                        <p>
                            If you find a broken link, incorrect example,
                            technical problem or other issue, please let us
                            know so it can be reviewed.
                        </p>

                    </section>

                </div>

            </div>
        );
    }
}

export default Contact;