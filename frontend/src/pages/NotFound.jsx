import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.css";

class NotFound extends React.Component {
    render() {
        return (
            <div className="not-found-page">

                <div className="not-found-card">

                    <div className="not-found-logo">
                        <img
                            src="/python-logo.png"
                            alt="Python for Kids"
                        />
                    </div>

                    <div className="not-found-number">
                        404
                    </div>

                    <h1>Oops! Page Not Found 🐍</h1>

                    <p>
                        Looks like this Python path took a wrong turn!
                    </p>

                    <p className="not-found-description">
                        The page you're looking for doesn't exist or may
                        have been moved.
                    </p>

                    <Link to="/" className="not-found-button">
                        🏠 Back to Home
                    </Link>

                </div>

            </div>
        );
    }
}

export default NotFound;