import { lazy, Suspense } from "react";
import {
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MetaUpdater from "./seo/MetaUpdater";

import "./App.css";

// Pages load on demand so the first visit stays fast.
const Home = lazy(() => import("./pages/Home"));
const Learn = lazy(() => import("./pages/Learn"));
const Lesson = lazy(() => import("./pages/Lesson"));
const Exercises = lazy(() => import("./pages/Exercises"));
const Exercise = lazy(() => import("./pages/Exercise"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectGuide = lazy(() => import("./pages/ProjectGuide"));
const Quizzes = lazy(() => import("./pages/Quizzes"));
const Games = lazy(() => import("./pages/Games"));
const Game = lazy(() => import("./pages/Game"));
const Quiz = lazy(() => import("./pages/Quiz"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {

    // The router is provided by main.jsx (browser) or
    // entry-server.jsx (build-time prerender).
    return (
        <>

            <MetaUpdater />

            <div className="app">

                {/* Navigation */}
                <Navbar />

                {/* Main Website Content */}
                <main className="main-content">

                    <Suspense
                        fallback={
                            <div className="page-loading">
                                🐍 Loading...
                            </div>
                        }
                    >
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

                        <Route
                            path="/exercise/:exerciseId"
                            element={<Exercise />}
                        />

                        {/* Projects */}
                        <Route
                            path="/projects"
                            element={<Projects />}
                        />
                        <Route
                            path="/project/:slug"
                            element={<ProjectGuide />}
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

                        <Route path="/contact" element={<Contact />} />

                        <Route path="/privacy" element={<PrivacyPolicy />} />

                        <Route path="/terms" element={<Terms />} />

                        {/* 404 */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    </Suspense>

                </main>

                {/* Footer */}
                <Footer />

            </div>

        </>
    );
}

export default App;