import { lazy, Suspense } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import "./App.css";

// Pages load on demand so the first visit stays fast.
const Learn = lazy(() => import("./pages/Learn"));
const Lesson = lazy(() => import("./pages/Lesson"));
const Exercises = lazy(() => import("./pages/Exercises"));
const Exercise = lazy(() => import("./pages/Exercise"));
const Projects = lazy(() => import("./pages/Projects"));
const Quizzes = lazy(() => import("./pages/Quizzes"));
const Games = lazy(() => import("./pages/Games"));
const Game = lazy(() => import("./pages/Game"));
const Quiz = lazy(() => import("./pages/Quiz"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Admin = lazy(() => import("./pages/Admin"));

// The admin panel has its own header, so the site navbar/footer are hidden there.
function HideOnAdmin({ children }) {

    const { pathname } = useLocation();

    return pathname.startsWith("/admin") ? null : children;
}

function App() {

    return (
        <BrowserRouter>

            <div className="app">

                {/* Navigation */}
                <HideOnAdmin><Navbar /></HideOnAdmin>

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

                        {/* Content admin (not linked, noindex) */}
                        <Route path="/admin" element={<Admin />} />

                        {/* 404 */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    </Suspense>

                </main>

                {/* Footer */}
                <HideOnAdmin><Footer /></HideOnAdmin>

            </div>

        </BrowserRouter>
    );
}

export default App;