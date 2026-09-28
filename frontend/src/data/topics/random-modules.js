const topic = {
    id: 14,
    slug: "random-modules",
    title: "Modules & Random Fun",
    icon: "🎲",
    level: "Intermediate",

    description:
        "Discover Python modules! Use import to borrow ready-made tools, roll dice with random, pick surprises, shuffle lists, and do clever math with the math module.",

    lessons: [
        {
            id: 1401,
            title: "What is a Module?",
            icon: "📦",

            explanation:
                "A module is a toolbox full of code that other programmers already wrote for us. We use the word import to open the toolbox and use its tools. After importing, we write the module name, a dot, and the tool name, like math.sqrt().",

            example: `import math

print(math.pi)
print(math.sqrt(25))`,

            output: `3.141592653589793
5.0`,

            points: 10
        },

        {
            id: 1402,
            title: "Random Numbers with randint",
            icon: "🎲",

            explanation:
                "The random module helps Python make surprises! random.randint(a, b) picks a whole number between a and b, and both a and b can be chosen. Every time you run the program, you might get a different number.",

            example: `import random

number = random.randint(1, 10)
print("My secret number is", number)`,

            output: `My secret number is 7

(your number may be different!)`,

            points: 10
        },

        {
            id: 1403,
            title: "Picking with random.choice",
            icon: "🎯",

            explanation:
                "random.choice() picks one item from a list, just like pulling a name out of a hat. It is great for choosing a random color, snack, or game move. The list stays the same; Python just picks one item.",

            example: `import random

colors = ["red", "blue", "green", "yellow"]
favorite = random.choice(colors)
print("Today's color is", favorite)`,

            output: `Today's color is green

(your color may be different!)`,

            points: 10
        },

        {
            id: 1404,
            title: "Mixing Things with random.shuffle",
            icon: "🔀",

            explanation:
                "random.shuffle() mixes up the order of a list, like shuffling a deck of cards. It changes the list itself, so we print the list after shuffling it. This is useful for games and quizzes.",

            example: `import random

cards = ["A", "B", "C", "D", "E"]
random.shuffle(cards)
print(cards)`,

            output: `['C', 'A', 'E', 'B', 'D']

(your order may be different!)`,

            points: 12
        },

        {
            id: 1405,
            title: "Math Module Magic",
            icon: "🧮",

            explanation:
                "The math module has handy tools like math.sqrt() for square roots and math.pi for the number pi. The round() function is built into Python, so it does not need importing. round(number, 2) keeps just 2 digits after the decimal point.",

            example: `import math

print(math.sqrt(81))
print(round(math.pi, 2))

radius = 5
area = math.pi * radius * radius
print("Circle area:", round(area, 1))`,

            output: `9.0
3.14
Circle area: 78.5`,

            points: 12
        },

        {
            id: 1406,
            title: "Dice Roller and Fortune Teller",
            icon: "🔮",

            explanation:
                "Now let's mix our tools together! We can roll two dice with randint and add them up. Then we can use choice to make a fortune teller that gives a random message.",

            example: `import random

die1 = random.randint(1, 6)
die2 = random.randint(1, 6)
print("You rolled", die1, "and", die2)
print("Total:", die1 + die2)

fortunes = ["You will find a treasure!", "A friend will make you laugh!", "Today is your lucky day!"]
print("Fortune:", random.choice(fortunes))`,

            output: `You rolled 3 and 5
Total: 8
Fortune: Today is your lucky day!

(your results may be different!)`,

            points: 15
        }
    ],

    exercises: [
        {
            id: 14001,
            title: "Square Root Finder",
            difficulty: "Easy",

            description:
                "Import the math module and print the square root of 49.",

            hint:
                "Use import math, then print(math.sqrt(49)).",

            answer:
                `import math

print(math.sqrt(49))`,

            points: 20
        },

        {
            id: 14002,
            title: "Roll a Die",
            difficulty: "Easy",

            description:
                "Import the random module and print a random number from 1 to 6, just like rolling a die.",

            hint:
                "Use random.randint(1, 6).",

            answer:
                `import random

print(random.randint(1, 6))`,

            flexible: true,

            points: 20
        },

        {
            id: 14003,
            title: "Pick a Snack",
            difficulty: "Easy",

            description:
                'Make a list of snacks: "apple", "popcorn", "cookie". Use random.choice() to print one random snack.',

            hint:
                "Store the snacks in a list, then print(random.choice(snacks)).",

            answer:
                `import random

snacks = ["apple", "popcorn", "cookie"]
print(random.choice(snacks))`,

            flexible: true,

            points: 25
        },

        {
            id: 14004,
            title: "Circle Area",
            difficulty: "Medium",

            description:
                "A circle has a radius of 3. Use math.pi to find its area (pi x radius x radius) and print it rounded to 2 decimal places.",

            hint:
                "area = math.pi * 3 * 3, then print(round(area, 2)).",

            answer:
                `import math

radius = 3
area = math.pi * radius * radius
print(round(area, 2))`,

            points: 30
        },

        {
            id: 14005,
            title: "Shuffle the Team",
            difficulty: "Medium",

            description:
                'Make a list of players: "Ava", "Leo", "Zoe", "Sam". Shuffle the list with random.shuffle() and print the new order.',

            hint:
                "random.shuffle(players) mixes the list. Then print(players).",

            answer:
                `import random

players = ["Ava", "Leo", "Zoe", "Sam"]
random.shuffle(players)
print(players)`,

            flexible: true,

            points: 30
        },

        {
            id: 14006,
            title: "Magic 8 Ball",
            difficulty: "Medium",

            description:
                'Ask the user to type a yes-or-no question with input(). Then print a random answer from the list "Yes!", "No way!", "Maybe...", "Ask again later".',

            hint:
                "Use input() to get the question, then random.choice() on a list of answers.",

            answer:
                `import random

question = input("Ask the Magic 8 Ball a question: ")
answers = ["Yes!", "No way!", "Maybe...", "Ask again later"]
print("The Magic 8 Ball says:", random.choice(answers))`,

            usesInput: true,
            flexible: true,

            points: 35
        }
    ],

    quiz: [
        {
            id: 1,

            question:
                "Which word do we use to bring a module into our program?",

            options: [
                "include",
                "import",
                "bring",
                "open"
            ],

            answer: 1,

            explanation:
                "We write import followed by the module name, like import random."
        },

        {
            id: 2,

            question:
                "What can random.randint(1, 6) give you?",

            options: [
                "Only the number 6",
                "A number from 1 to 5",
                "A word",
                "Any whole number from 1 to 6"
            ],

            answer: 3,

            explanation:
                "randint includes both ends, so it can give 1, 2, 3, 4, 5, or 6."
        },

        {
            id: 3,

            question:
                "Which tool picks one random item from a list?",

            options: [
                "random.choice()",
                "random.shuffle()",
                "math.sqrt()",
                "print()"
            ],

            answer: 0,

            explanation:
                "random.choice() picks one item from a list, like picking a name out of a hat."
        },

        {
            id: 4,

            question:
                "What will this code print?\n\nimport math\nprint(math.sqrt(16))",

            options: [
                "8",
                "256",
                "4.0",
                "16"
            ],

            answer: 2,

            explanation:
                "The square root of 16 is 4, and math.sqrt() gives it as 4.0."
        },

        {
            id: 5,

            question:
                "What does random.shuffle(cards) do?",

            options: [
                "Deletes the cards",
                "Mixes up the order of the list",
                "Picks one card",
                "Sorts the cards from A to Z"
            ],

            answer: 1,

            explanation:
                "random.shuffle() mixes up the order of the items in the list."
        },

        {
            id: 6,

            question:
                "What will this code print?\n\nprint(round(3.14159, 2))",

            options: [
                "3",
                "3.1",
                "3.141",
                "3.14"
            ],

            answer: 3,

            explanation:
                "round(number, 2) keeps 2 digits after the decimal point, so we get 3.14."
        },

        {
            id: 7,

            question:
                "Which of these is inside the math module?",

            options: [
                "randint",
                "choice",
                "pi",
                "shuffle"
            ],

            answer: 2,

            explanation:
                "math.pi is the number pi. randint, choice, and shuffle belong to the random module."
        },

        {
            id: 8,

            question:
                "Why might a program using random print something different each time?",

            options: [
                "Because random picks new surprises every run",
                "Because Python is broken",
                "Because the computer forgets the code",
                "Because print() changes words"
            ],

            answer: 0,

            explanation:
                "The random module makes a new random pick each time the program runs."
        }
    ]
};

export default topic;
