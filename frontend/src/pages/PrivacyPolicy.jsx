import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/InfoPages.css";

class PrivacyPolicy extends Component {
    render() {
        return (
            <div className="info-page">

                <div className="info-hero">
                    <div className="info-hero-icon">🔒</div>

                    <h1>Privacy Policy</h1>

                    <p>
                        How Python for Kids handles information, cookies and
                        advertising.
                    </p>
                </div>

                <div className="info-container">

                    <section className="policy-card">

                        <p className="policy-updated">
                            Last updated: October 2026
                        </p>

                        <h2>1. Introduction</h2>

                        <p>
                            Welcome to Python for Kids
                            (python-tutorial-for-kids.pages.dev). This Privacy
                            Policy explains what information is collected when
                            you visit the website, how it is used, and the
                            choices you have.
                        </p>

                        <p>
                            Python for Kids is a free educational website with
                            beginner-friendly Python lessons, coding exercises,
                            quizzes, projects and games for children, parents
                            and teachers.
                        </p>

                        <h2>2. Information We Collect</h2>

                        <p>
                            You do not need an account to use this website, and
                            we do not ask visitors for their name, address,
                            phone number or other personal information.
                        </p>

                        <p>
                            If you email us, we receive the information you
                            choose to include, such as your email address and
                            your message. We use it only to reply to you and do
                            not share it with anyone else.
                        </p>

                        <h2>3. Progress Saved on Your Device</h2>

                        <p>
                            To remember which lessons, exercises and quizzes
                            you have finished, the website saves a small amount
                            of progress information (such as completed topic
                            names, quiz scores and points earned) in your
                            browser's local storage. This information stays on
                            your own device and is never sent to us. You can
                            delete it at any time by clearing your browser's
                            site data.
                        </p>

                        <h2>4. Running Python Code</h2>

                        <p>
                            Exercises let you run Python code directly in your
                            browser. The code you write runs on your own device
                            and is not sent to or stored by us. To make this
                            work, your browser downloads the Pyodide Python
                            engine from the jsDelivr content delivery network,
                            which, like any website you visit, receives your
                            IP address in order to deliver the files.
                        </p>

                        <h2>5. Advertising and Cookies</h2>

                        <p>
                            This website uses Google AdSense to show
                            advertisements, which helps keep Python for Kids
                            free. Google and other third-party vendors use
                            cookies to serve ads based on a visitor's previous
                            visits to this website or other websites.
                        </p>

                        <p>
                            Google's use of advertising cookies enables it and
                            its partners to serve ads to visitors based on
                            their visits to this and other sites on the
                            internet. You can learn how Google uses information
                            from sites that use its services at{" "}
                            <a
                                href="https://policies.google.com/technologies/partner-sites"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                How Google uses information from sites or apps
                                that use our services
                            </a>
                            .
                        </p>

                        <p>
                            You can opt out of personalised advertising by
                            visiting{" "}
                            <a
                                href="https://adssettings.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Google Ads Settings
                            </a>
                            . You can also opt out of some third-party vendors'
                            use of cookies for personalised advertising at{" "}
                            <a
                                href="https://www.aboutads.info/choices"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                www.aboutads.info
                            </a>
                            {" "}or, in Europe,{" "}
                            <a
                                href="https://www.youronlinechoices.eu"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                www.youronlinechoices.eu
                            </a>
                            .
                        </p>

                        <p>
                            Most browsers also let you block or delete cookies
                            in their settings. Blocking cookies will not stop
                            the lessons, exercises or games from working.
                        </p>

                        <h2>6. Children's Privacy</h2>

                        <p>
                            Python for Kids is designed for young learners, so
                            we take children's privacy seriously. We do not
                            knowingly collect personal information from
                            children, and no part of the website asks children
                            to enter personal details.
                        </p>

                        <p>
                            Because the website is directed at children, we
                            ask Google to treat it as child-directed. This
                            means ads shown here should not be personalised
                            based on a child's interests or browsing history.
                        </p>

                        <p>
                            If you are a parent or guardian and believe your
                            child has sent us personal information, for
                            example by email, please contact us and we will
                            delete it.
                        </p>

                        <h2>7. Hosting</h2>

                        <p>
                            The website is hosted by Cloudflare. Like most web
                            hosts, Cloudflare may process technical information
                            such as IP addresses and browser type to deliver
                            pages securely and protect the site from abuse.
                        </p>

                        <h2>8. External Links</h2>

                        <p>
                            Some pages link to other websites, such as
                            Google's privacy pages. We are not responsible for
                            the privacy practices or content of external
                            websites, so please review their policies when you
                            visit them.
                        </p>

                        <h2>9. Changes to This Policy</h2>

                        <p>
                            We may update this Privacy Policy when the website
                            or the services it uses change. The latest version
                            will always be published on this page with the
                            date it was last updated.
                        </p>

                        <h2>10. Contact</h2>

                        <p>
                            If you have questions about this Privacy Policy,
                            please reach us through our{" "}
                            <Link to="/contact">Contact page</Link>.
                        </p>

                    </section>

                </div>

            </div>
        );
    }
}

export default PrivacyPolicy;
