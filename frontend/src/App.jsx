import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Lesson from "./pages/Lesson";
import Exercises from "./pages/Exercises";
import Projects from "./pages/Projects";
import Quizzes from "./pages/Quizzes"; 
import Games from "./pages/Games";
import Game from "./pages/Game";
import Quiz from "./pages/Quiz";
import "./App.css";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

function App() {

    return (
        <BrowserRouter>

            <div className="app">

                {/* Navigation */}
                <Navbar />

                {/* Main Website Content */}
                <main className="main-content">

                    <Routes>

                        {/* Home */}
                        <Route
                            path="/"
                            element={<Home />}
                        />

                        {/* Learning */}
                        <Route
                            path="/learn"
                            element={<Learn />}
                        />

                        {/* Individual Lesson */}
                        <Route
                            path="/lesson/:slug"
                            element={<Lesson />}
                        />

                        {/* Exercises */}
                        <Route
                            path="/exercises"
                            element={<Exercises />}
                        />

                        {/* Projects */}
                        <Route
                            path="/projects"
                            element={<Projects />}
                        />
                        {/* games */}
                        <Route
                            path="/games"
                            element={<Games />}
                        />
                        <Route path="/game/:gameId" element={<Game />} 
                        />
                        {/* Quizzes */}
                        <Route
                            path="/quizzes"
                            element={<Quizzes />}
                        />
                        <Route
                            path="/quiz/:slug"
                            element={<Quiz />}
                        />
                        {/* About */}
                        <Route
                            path="/about"
                            element={<About />}
                        />

                        {/* 404 */}
                        <Route
                            path="*"
                            element={
                                <div className="not-found">

                                    <h1>🐍 Oops!</h1>

                                    <h2>
                                        Python couldn't find this page!
                                    </h2>

                                    <p>
                                        The page you're looking for
                                        doesn't exist.
                                    </p>

                                    <a href="/">
                                        🏠 Go Home
                                    </a>

                                </div>
                            }
                        />
                    <Route path="/about" element={<About />} />

                    <Route path="/contact" element={<Contact />} />

                    <Route path="/privacy" element={<PrivacyPolicy />} />

                    <Route path="/terms" element={<Terms />} />

                    <Route path="*" element={<NotFound />} />
                    </Routes>

                </main>

                {/* Footer */}
                <Footer />

            </div>

        </BrowserRouter>
    );
}

export default App;