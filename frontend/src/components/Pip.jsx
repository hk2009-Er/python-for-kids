import { motion } from "framer-motion";

function Pip({ mood = "happy", message = "" }) {

    const moods = {
        happy: "😊",
        excited: "🤩",
        thinking: "🤔",
        confused: "😕",
        celebrate: "🥳"
    };

    return (

        <div className="pip-container">

            {message && (

                <motion.div
                    className="pip-message"
                    initial={{
                        opacity: 0,
                        scale: 0.5
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1
                    }}
                    transition={{
                        duration: 0.5
                    }}
                >
                    {message}
                </motion.div>

            )}

            <motion.div
                className="pip"
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, -3, 3, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                🐍

                <span className="pip-mood">
                    {moods[mood]}
                </span>

            </motion.div>

        </div>

    );
}

export default Pip;