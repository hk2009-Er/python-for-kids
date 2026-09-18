import React, { Component } from "react";
import "../styles/InfoPages.css";

class Terms extends Component {
    render() {
        return (
            <div className="info-page">

                <div className="info-hero">
                    <div className="info-hero-icon">📜</div>

                    <h1>Terms & Conditions</h1>

                    <p>
                        Please read these terms before using the website.
                    </p>
                </div>

                <div className="info-container">

                    <section className="policy-card">

                        <p className="policy-updated">
                            Last updated: September 2026
                        </p>

                        <h2>1. Acceptance of Terms</h2>

                        <p>
                            By accessing and using Python for Kids, you agree
                            to use the website responsibly and in accordance
                            with these Terms & Conditions.
                        </p>

                        <h2>2. Educational Content</h2>

                        <p>
                            The lessons, examples, exercises, quizzes and
                            games provided on this website are intended for
                            educational and learning purposes.
                        </p>

                        <p>
                            We make reasonable efforts to provide useful and
                            understandable learning material, but we do not
                            guarantee that all content will always be complete,
                            error-free or up to date.
                        </p>

                        <h2>3. Acceptable Use</h2>

                        <p>
                            Visitors should use this website for lawful and
                            educational purposes.
                        </p>

                        <p>
                            You should not intentionally attempt to damage,
                            disrupt or interfere with the website or its
                            services.
                        </p>

                        <h2>4. Intellectual Property</h2>

                        <p>
                            The website design, original written content,
                            graphics, code examples and other materials may be
                            protected by applicable intellectual property
                            laws.
                        </p>

                        <p>
                            You may use the educational material for personal
                            learning purposes. Republishing substantial
                            portions of the website's original content without
                            permission is not permitted.
                        </p>

                        <h2>5. External Websites</h2>

                        <p>
                            The website may contain links to third-party
                            websites. We do not control those websites and are
                            not responsible for their content, availability or
                            policies.
                        </p>

                        <h2>6. Website Availability</h2>

                        <p>
                            We may modify, update, suspend or remove parts of
                            the website at any time.
                        </p>

                        <p>
                            We do not guarantee that the website will always
                            be available without interruption.
                        </p>

                        <h2>7. Limitation of Liability</h2>

                        <p>
                            The website is provided for educational purposes.
                            To the extent permitted by applicable law, we are
                            not responsible for losses arising from the use of
                            or inability to use the website.
                        </p>

                        <h2>8. Changes to These Terms</h2>

                        <p>
                            These Terms & Conditions may be updated as the
                            website develops.
                        </p>

                        <p>
                            Updated terms will be published on this page.
                        </p>

                        <h2>9. Contact</h2>

                        <p>
                            If you have questions regarding these terms,
                            please contact us through the Contact page.
                        </p>

                    </section>

                </div>

            </div>
        );
    }
}

export default Terms;