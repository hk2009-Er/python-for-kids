const lessonData = [
    {
        id: 1,
        slug: "python-basics",
        title: "Python Basics",
        icon: "🐍",
        level: "Beginner",
        description:
            "Learn what Python is and write your very first Python programs.",

        lessons: [
            {
                id: 101,
                title: "What is Python?",
                icon: "🐍",

                explanation:
                    "Python is a programming language that allows us to give instructions to a computer. It is popular because its syntax is simple and easy to understand.",

                example: `print("Hello, Python!")`,

                output: `Hello, Python!`,

                points: 10
            },

            {
                id: 102,
                title: "Your First Program",
                icon: "💻",

                explanation:
                    "The print() function is used to display something on the screen. You can print words, numbers and even calculations.",

                example: `print("Hello!")
print(10)
print(5 + 3)`,

                output: `Hello!
10
8`,

                points: 10
            },

            {
                id: 103,
                title: "Python Comments",
                icon: "💬",

                explanation:
                    "Comments are notes written inside our code. Python ignores comments when the program runs. A comment starts with the # symbol.",

                example: `# This is my first Python program
print("I love Python!")`,

                output: `I love Python!`,

                points: 10
            }
        ],

        exercises: [
            {
                id: 1001,
                title: "Say Hello",
                difficulty: "Easy",

                description:
                    'Write a Python program that prints "Hello Python!".',

                hint:
                    "Use the print() function.",

                answer:
                    `print("Hello Python!")`,

                points: 20
            },

            {
                id: 1002,
                title: "Print Your Age",
                difficulty: "Easy",

                description:
                    "Write a program that prints the number 10.",

                hint:
                    "Numbers do not need quotation marks.",

                answer:
                    `print(10)`,

                points: 20
            },

            {
                id: 1003,
                title: "Simple Calculation",
                difficulty: "Easy",

                description:
                    "Write a program that prints the result of 5 + 7.",

                hint:
                    "Python can perform calculations using +.",

                answer:
                    `print(5 + 7)`,

                points: 20
            }
        ],

        quiz: [
            {
                id: 1,

                question:
                    "Which function is used to display something on the screen?",

                options: [
                    "show()",
                    "print()",
                    "display()",
                    "write()"
                ],

                answer: 1,

                explanation:
                    "The print() function displays information on the screen."
            },

            {
                id: 2,

                question:
                    "Which symbol is used to create a comment in Python?",

                options: [
                    "//",
                    "/*",
                    "#",
                    "<!--"
                ],

                answer: 2,

                explanation:
                    "Python comments begin with the # symbol."
            },

            {
                id: 3,

                question:
                    "What will this code print?\n\nprint(5 + 3)",

                options: [
                    "53",
                    "8",
                    "5 + 3",
                    "Error"
                ],

                answer: 1,

                explanation:
                    "Python calculates 5 + 3 and prints 8."
            },

            {
                id: 4,

                question:
                    "Which one is a Python programming language?",

                options: [
                    "Python",
                    "HTML",
                    "CSS",
                    "Photoshop"
                ],

                answer: 0,

                explanation:
                    "Python is a programming language."
            },

            {
                id: 5,

                question:
                    'What will print("Hello") do?',

                options: [
                    "Create a variable",
                    "Print Hello",
                    "Delete Hello",
                    "Create a file"
                ],

                answer: 1,

                explanation:
                    'print("Hello") displays Hello on the screen.'
            }
        ]
    },

    {
        id: 2,
        slug: "variables",
        title: "Variables",
        icon: "📦",
        level: "Beginner",

        description:
            "Learn how Python stores information using variables.",

        lessons: [
            {
                id: 201,
                title: "What is a Variable?",
                icon: "📦",

                explanation:
                    "A variable is like a labelled box that stores information. We can store numbers, words and other values inside variables.",

                example: `name = "Alex"
age = 10

print(name)
print(age)`,

                output: `Alex
10`,

                points: 10
            },

            {
                id: 202,
                title: "Changing Variables",
                icon: "🔄",

                explanation:
                    "The value stored inside a variable can be changed. Simply assign a new value to the variable.",

                example: `score = 10

print(score)

score = 20

print(score)`,

                output: `10
20`,

                points: 10
            },

            {
                id: 203,
                title: "Naming Variables",
                icon: "🏷️",

                explanation:
                    "Python variable names should be meaningful. For example, student_name is easier to understand than x.",

                example: `student_name = "Sam"
student_age = 11

print(student_name)
print(student_age)`,

                output: `Sam
11`,

                points: 10
            }
        ],

        exercises: [
            {
                id: 2001,
                title: "Create a Name",
                difficulty: "Easy",

                description:
                    'Create a variable called name and store "Alex" in it.',

                hint:
                    'Use name = "Alex".',

                answer:
                    `name = "Alex"`,

                points: 20
            },

            {
                id: 2002,
                title: "Store a Number",
                difficulty: "Easy",

                description:
                    "Create a variable called age and store 12 in it.",

                hint:
                    "Numbers don't need quotation marks.",

                answer:
                    `age = 12`,

                points: 20
            }
        ],

        quiz: [
            {
                id: 1,

                question:
                    "What is a variable used for?",

                options: [
                    "Storing information",
                    "Drawing pictures",
                    "Playing music",
                    "Turning off the computer"
                ],

                answer: 0,

                explanation:
                    "Variables are used to store information."
            },

            {
                id: 2,

                question:
                    'Which is a valid Python variable assignment?',

                options: [
                    "name == Alex",
                    'name = "Alex"',
                    "name : Alex",
                    "name -> Alex"
                ],

                answer: 1,

                explanation:
                    'name = "Alex" stores the string Alex inside the variable name.'
            },

            {
                id: 3,

                question:
                    "Can a variable's value be changed?",

                options: [
                    "Yes",
                    "No",
                    "Only once",
                    "Only with a loop"
                ],

                answer: 0,

                explanation:
                    "Python variables can be assigned new values."
            }
        ]
    },

    {
        id: 3,
        slug: "data-types",
        title: "Data Types",
        icon: "🧩",
        level: "Beginner",

        description:
            "Discover strings, integers, floats and booleans.",

        lessons: [
            {
                id: 301,
                title: "Numbers",
                icon: "🔢",

                explanation:
                    "Python has different types of numbers. int is used for whole numbers and float is used for decimal numbers.",

                example: `age = 12
height = 5.4

print(age)
print(height)`,

                output: `12
5.4`,

                points: 10
            },

            {
                id: 302,
                title: "Strings",
                icon: "🔤",

                explanation:
                    "A string is text. Strings are usually written inside quotation marks.",

                example: `name = "Emma"
favorite_color = "Blue"

print(name)
print(favorite_color)`,

                output: `Emma
Blue`,

                points: 10
            },

            {
                id: 303,
                title: "Booleans",
                icon: "✅",

                explanation:
                    "A boolean has only two possible values: True or False.",

                example: `is_student = True
has_homework = False

print(is_student)
print(has_homework)`,

                output: `True
False`,

                points: 10
            }
        ],

        exercises: [
            {
                id: 3001,
                title: "Create a String",
                difficulty: "Easy",

                description:
                    'Create a variable called color and store "Blue" in it.',

                hint:
                    "Remember to use quotation marks.",

                answer:
                    `color = "Blue"`,

                points: 20
            },

            {
                id: 3002,
                title: "Create a Boolean",
                difficulty: "Easy",

                description:
                    "Create a variable called is_python_fun and store True in it.",

                hint:
                    "Boolean values are True and False.",

                answer:
                    `is_python_fun = True`,

                points: 20
            }
        ],

        quiz: [
            {
                id: 1,

                question:
                    "Which data type is used for text?",

                options: [
                    "int",
                    "float",
                    "str",
                    "bool"
                ],

                answer: 2,

                explanation:
                    "str represents strings, which are text."
            },

            {
                id: 2,

                question:
                    "Which data type represents True or False?",

                options: [
                    "str",
                    "bool",
                    "int",
                    "float"
                ],

                answer: 1,

                explanation:
                    "bool is the Boolean data type."
            },

            {
                id: 3,

                question:
                    "What type of number is 5.5?",

                options: [
                    "int",
                    "float",
                    "str",
                    "bool"
                ],

                answer: 1,

                explanation:
                    "5.5 is a decimal number, so it is a float."
            }
        ]
    },

    {
        id: 4,
        slug: "operators",
        title: "Operators",
        icon: "➗",
        level: "Beginner",

        description:
            "Learn how Python performs calculations and comparisons.",

        lessons: [
            {
                id: 401,
                title: "Arithmetic Operators",
                icon: "➕",

                explanation:
                    "Arithmetic operators allow Python to perform mathematical calculations.",

                example: `print(10 + 5)
print(10 - 5)
print(10 * 5)
print(10 / 5)`,

                output: `15
5
50
2.0`,

                points: 10
            },

            {
                id: 402,
                title: "Comparison Operators",
                icon: "⚖️",

                explanation:
                    "Comparison operators compare values and return True or False.",

                example: `print(10 > 5)
print(10 < 5)
print(10 == 10)`,

                output: `True
False
True`,

                points: 10
            }
        ],

        exercises: [
            {
                id: 4001,
                title: "Add Two Numbers",
                difficulty: "Easy",

                description:
                    "Print the result of 20 + 10.",

                hint:
                    "Use the + operator.",

                answer:
                    `print(20 + 10)`,

                points: 20
            },

            {
                id: 4002,
                title: "Compare Numbers",
                difficulty: "Easy",

                description:
                    "Print whether 20 is greater than 10.",

                hint:
                    "Use the > operator.",

                answer:
                    `print(20 > 10)`,

                points: 20
            }
        ],

        quiz: [
            {
                id: 1,

                question:
                    "Which operator is used for multiplication?",

                options: [
                    "+",
                    "-",
                    "*",
                    "/"
                ],

                answer: 2,

                explanation:
                    "The * operator performs multiplication."
            },

            {
                id: 2,

                question:
                    "What is 10 + 5?",

                options: [
                    "12",
                    "15",
                    "20",
                    "105"
                ],

                answer: 1,

                explanation:
                    "10 + 5 = 15."
            },

            {
                id: 3,

                question:
                    "What does == check?",

                options: [
                    "Assignment",
                    "Equality",
                    "Addition",
                    "Multiplication"
                ],

                answer: 1,

                explanation:
                    "== checks whether two values are equal."
            }
        ]
    },

    {
        id: 5,
        slug: "if-else",
        title: "If / Else",
        icon: "🤔",
        level: "Beginner",

        description:
            "Teach your computer how to make decisions.",

        lessons: [
            {
                id: 501,
                title: "Making Decisions",
                icon: "🤔",

                explanation:
                    "An if statement allows Python to run some code only when a condition is True.",

                example: `age = 12

if age >= 10:
    print("You can play!")`,

                output: `You can play!`,

                points: 10
            },

            {
                id: 502,
                title: "If and Else",
                icon: "🔀",

                explanation:
                    "The else block runs when the if condition is False.",

                example: `age = 7

if age >= 10:
    print("You can play!")
else:
    print("You are too young!")`,

                output: `You are too young!`,

                points: 10
            }
        ],

        exercises: [
            {
                id: 5001,
                title: "Check Age",
                difficulty: "Easy",

                description:
                    "If age is greater than or equal to 10, print You can play.",

                hint:
                    "Use if and >=.",

                answer:
                    `if age >= 10:
    print("You can play.")`,

                points: 25
            }
        ],

        quiz: [
            {
                id: 1,

                question:
                    "Which keyword is used to make a decision?",

                options: [
                    "when",
                    "if",
                    "check",
                    "decide"
                ],

                answer: 1,

                explanation:
                    "Python uses the if keyword for conditions."
            },

            {
                id: 2,

                question:
                    "Which block runs when an if condition is False?",

                options: [
                    "if",
                    "for",
                    "else",
                    "print"
                ],

                answer: 2,

                explanation:
                    "The else block runs when the if condition is False."
            }
        ]
    },

    {
        id: 6,
        slug: "loops",
        title: "Loops",
        icon: "🔁",
        level: "Intermediate",

        description:
            "Make Python repeat tasks automatically.",

        lessons: [
            {
                id: 601,
                title: "For Loops",
                icon: "🔁",

                explanation:
                    "A for loop repeats code for each item in a sequence.",

                example: `for i in range(5):
    print(i)`,

                output: `0
1
2
3
4`,

                points: 15
            },

            {
                id: 602,
                title: "While Loops",
                icon: "♻️",

                explanation:
                    "A while loop continues running as long as its condition is True.",

                example: `count = 1

while count <= 3:
    print(count)
    count += 1`,

                output: `1
2
3`,

                points: 15
            }
        ],

        exercises: [
            {
                id: 6001,
                title: "Count to Five",
                difficulty: "Medium",

                description:
                    "Use a for loop to print numbers from 0 to 4.",

                hint:
                    "Try range(5).",

                answer:
                    `for i in range(5):
    print(i)`,

                points: 30
            }
        ],

        quiz: [
            {
                id: 1,

                question:
                    "Which loop is commonly used with range()?",

                options: [
                    "if",
                    "for",
                    "else",
                    "def"
                ],

                answer: 1,

                explanation:
                    "for loops are commonly used with range()."
            },

            {
                id: 2,

                question:
                    "How many times does this run?\n\nfor i in range(5):",

                options: [
                    "4",
                    "5",
                    "6",
                    "10"
                ],

                answer: 1,

                explanation:
                    "range(5) produces 0, 1, 2, 3 and 4 — five values."
            }
        ]
    },

    {
        id: 7,
        slug: "lists",
        title: "Lists",
        icon: "📋",
        level: "Intermediate",

        description:
            "Store multiple pieces of information together.",

        lessons: [
            {
                id: 701,
                title: "Creating a List",
                icon: "📋",

                explanation:
                    "A list allows us to store multiple values in one variable.",

                example: `fruits = ["Apple", "Banana", "Mango"]

print(fruits)`,

                output:
                    `['Apple', 'Banana', 'Mango']`,

                points: 15
            },

            {
                id: 702,
                title: "List Indexing",
                icon: "🔢",

                explanation:
                    "Each item in a list has a position called an index. Python starts counting indexes from 0.",

                example: `fruits = ["Apple", "Banana", "Mango"]

print(fruits[0])
print(fruits[1])`,

                output: `Apple
Banana`,

                points: 15
            }
        ],

        exercises: [
            {
                id: 7001,
                title: "Create a Fruit List",
                difficulty: "Easy",

                description:
                    'Create a list containing "Apple", "Banana" and "Mango".',

                hint:
                    "Use square brackets [].",

                answer:
                    `fruits = ["Apple", "Banana", "Mango"]`,

                points: 25
            }
        ],

        quiz: [
            {
                id: 1,

                question:
                    "Which brackets are used to create a list?",

                options: [
                    "()",
                    "{}",
                    "[]",
                    "<>"
                ],

                answer: 2,

                explanation:
                    "Python lists use square brackets []."
            },

            {
                id: 2,

                question:
                    "What is the first index of a Python list?",

                options: [
                    "0",
                    "1",
                    "-1",
                    "10"
                ],

                answer: 0,

                explanation:
                    "Python uses zero-based indexing."
            }
        ]
    },

    {
        id: 8,
        slug: "functions",
        title: "Functions",
        icon: "⚙️",
        level: "Intermediate",

        description:
            "Create reusable blocks of Python code.",

        lessons: [
            {
                id: 801,
                title: "Creating a Function",
                icon: "⚙️",

                explanation:
                    "A function is a reusable block of code. We create a function using the def keyword.",

                example: `def say_hello():
    print("Hello!")

say_hello()`,

                output:
                    `Hello!`,

                points: 15
            },

            {
                id: 802,
                title: "Function Parameters",
                icon: "📥",

                explanation:
                    "Parameters allow us to send information into a function.",

                example: `def greet(name):
    print("Hello", name)

greet("Alex")`,

                output:
                    `Hello Alex`,

                points: 15
            }
        ],

        exercises: [
            {
                id: 8001,
                title: "Create a Greeting Function",
                difficulty: "Medium",

                description:
                    "Create a function called greet that prints Hello.",

                hint:
                    "Start with def greet():",

                answer:
                    `def greet():
    print("Hello")`,

                points: 30
            }
        ],

        quiz: [
            {
                id: 1,

                question:
                    "Which keyword creates a function in Python?",

                options: [
                    "function",
                    "func",
                    "def",
                    "create"
                ],

                answer: 2,

                explanation:
                    "Python uses the def keyword to define a function."
            },

            {
                id: 2,

                question:
                    "Why do we use functions?",

                options: [
                    "To repeat reusable code",
                    "To delete variables",
                    "To turn off Python",
                    "To create hardware"
                ],

                answer: 0,

                explanation:
                    "Functions allow us to organize and reuse code."
            }
        ]
    }
];

export default lessonData;