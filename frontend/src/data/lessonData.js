// Newer topics live in their own files to keep this one manageable.
import strings from "./topics/strings.js";
import userInput from "./topics/user-input.js";
import loopControl from "./topics/loop-control.js";
import tuplesSets from "./topics/tuples-sets.js";
import dictionaries from "./topics/dictionaries.js";
import randomModules from "./topics/random-modules.js";
import errorHandling from "./topics/error-handling.js";
import turtleGraphics from "./topics/turtle-graphics.js";
import classesObjects from "./topics/classes-objects.js";

const coreTopics = [
    // =========================================================
    // 1. PYTHON BASICS
    // =========================================================
    {
        id: 1,
        slug: "python-basics",
        title: "Python Basics",
        icon: "🐍",
        level: "Beginner",

        description:
            "Learn what Python is, how programs work, how to display information, and how to write your first Python programs.",

        lessons: [
            {
                id: 101,
                title: "What is Python?",
                icon: "🐍",

                explanation:
                    "Python is a programming language that lets us give instructions to a computer. It is popular because its code is easy to read and understand. Python can be used to create games, websites, apps, tools, and many other types of programs. When we write Python code, the computer follows our instructions and produces a result.",

                example: `print("Hello, Python!")`,

                output: `Hello, Python!`,

                points: 10
            },

            {
                id: 102,
                title: "Your First Python Program",
                icon: "💻",

                explanation:
                    "The print() function is one of the first Python commands you will learn. It tells Python to display information on the screen. You can use print() to display words, numbers, and the results of calculations. Text is written inside quotation marks, while numbers can be written without quotation marks.",

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
                title: "Printing Text and Numbers",
                icon: "🖨️",

                explanation:
                    "Python can print different kinds of information. Text is called a string and is usually placed inside quotation marks. Numbers can be printed directly. We can also print more than one piece of information using commas.",

                example: `print("My name is Alex")
print(12)
print("My age is", 12)`,

                output: `My name is Alex
12
My age is 12`,

                points: 10
            },

            {
                id: 104,
                title: "Python Comments",
                icon: "💬",

                explanation:
                    "Comments are notes that programmers write inside their code to explain what the code does. Python ignores comments when the program runs. A comment starts with the # symbol. Comments can make programs easier to understand, especially when the code becomes longer.",

                example: `# This is a comment
print("I love Python!")

# Python ignores this note
print("Let's learn!")`,

                output: `I love Python!
Let's learn!`,

                points: 10
            },

            {
                id: 105,
                title: "Doing Math in Python",
                icon: "🧮",

                explanation:
                    "Python can work like a calculator. We can use mathematical operators such as + for addition, - for subtraction, * for multiplication, and / for division. Python calculates the expression and gives us the result.",

                example: `print(5 + 3)
print(10 - 4)
print(3 * 4)
print(10 / 2)`,

                output: `8
6
12
5.0`,

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
                    "Use the print() function and put the text inside quotation marks.",

                answer:
                    `print("Hello Python!")`,

                points: 20
            },

            {
                id: 1002,
                title: "Print a Number",
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
                    "Use the print() function and the + operator.",

                answer:
                    `print(5 + 7)`,

                points: 20
            },

            {
                id: 1004,
                title: "Print Your Name",
                difficulty: "Easy",

                description:
                    'Write a Python program that prints your name. For example, print "Alex".',

                hint:
                    "Use print() and put your name inside quotation marks.",

                answer:
                    `print("Alex")`,

                flexible: true,

                points: 20
            },

            {
                id: 1005,
                title: "Print Two Messages",
                difficulty: "Easy",

                description:
                    'Write a program that prints "I am learning Python!" and "Python is fun!".',

                hint:
                    "Use print() twice.",

                answer:
                    `print("I am learning Python!")
print("Python is fun!")`,

                points: 25
            },

            {
                id: 1006,
                title: "Python Calculator",
                difficulty: "Easy",

                description:
                    "Write a program that prints the result of 20 - 8.",

                hint:
                    "Use the - operator inside print().",

                answer:
                    `print(20 - 8)`,

                points: 25
            },

            {
                id: 1007,
                title: "Print and Calculate",
                difficulty: "Medium",

                description:
                    'Write a program that prints the text "5 x 4 =" followed by the result of 5 * 4 on the same line.',

                hint:
                    'Use a comma inside print() to print text and a calculation together.',

                answer:
                    `print("5 x 4 =", 5 * 4)`,

                points: 30
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
                    "Python is a programming language used to create programs and applications."
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
            },

            {
                id: 6,

                question:
                    "Which symbol is used for multiplication in Python?",

                options: [
                    "+",
                    "-",
                    "*",
                    "/"
                ],

                answer: 2,

                explanation:
                    "The * symbol is used for multiplication in Python."
            },

            {
                id: 7,

                question:
                    "Which one is written as text in Python?",

                options: [
                    "25",
                    "10 + 5",
                    '"Hello"',
                    "100"
                ],

                answer: 2,

                explanation:
                    '"Hello" is text, also called a string, and it is written inside quotation marks.'
            },

            {
                id: 8,

                question:
                    "What will this code print?\n\nprint(10 - 3)",

                options: [
                    "7",
                    "13",
                    "103",
                    "10 - 3"
                ],

                answer: 0,

                explanation:
                    "Python subtracts 3 from 10, so the result is 7."
            }
        ]
    },

    // =========================================================
    // 2. VARIABLES
    // =========================================================
    {
        id: 2,
        slug: "variables",
        title: "Variables",
        icon: "📦",
        level: "Beginner",

        description:
            "Learn how Python stores information using variables and how to work with values.",

        lessons: [
            {
                id: 201,
                title: "What is a Variable?",
                icon: "📦",

                explanation:
                    "A variable is like a labelled box that stores information. We give the box a name and put a value inside it. Variables can store numbers, words, and other types of information. We can then use the variable name later in our program.",

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
                    "The value stored inside a variable can be changed. When we assign a new value to the same variable, Python replaces the old value with the new one. This is useful when information changes, such as a player's score in a game.",

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
                    "Good variable names make code easier to understand. A variable name can contain letters, numbers, and underscores, but it cannot start with a number. Variable names are case-sensitive, which means name and Name are treated as different names. Using clear names such as student_name is better than using names such as x.",

                example: `student_name = "Sam"
student_age = 11

print(student_name)
print(student_age)`,

                output: `Sam
11`,

                points: 10
            },

            {
                id: 204,
                title: "Variables with Different Values",
                icon: "🧩",

                explanation:
                    "Variables can store different kinds of values. For example, one variable can store a person's name, another can store an age, and another can store whether someone is a student. Python keeps track of the type of value stored in each variable.",

                example: `name = "Emma"
age = 12
is_student = True

print(name)
print(age)
print(is_student)`,

                output: `Emma
12
True`,

                points: 10
            },

            {
                id: 205,
                title: "Using Variables in Calculations",
                icon: "🧮",

                explanation:
                    "We can use variables in mathematical calculations. Instead of writing the same number again and again, we can store it in a variable and use the variable name in our calculation. This makes programs easier to change and understand.",

                example: `apples = 5
more_apples = 3

total = apples + more_apples

print(total)`,

                output: `8`,

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

                flexible: true,

                points: 20
            },

            {
                id: 2002,
                title: "Store a Number",
                difficulty: "Easy",

                description:
                    "Create a variable called age and store 12 in it.",

                hint:
                    "Numbers do not need quotation marks.",

                answer:
                    `age = 12`,

                points: 20
            },

            {
                id: 2003,
                title: "Change a Score",
                difficulty: "Easy",

                description:
                    "Create a variable called score with the value 10, then change it to 50.",

                hint:
                    "Assign a new value to score.",

                answer:
                    `score = 10
score = 50`,

                points: 25
            },

            {
                id: 2004,
                title: "Create a Student Profile",
                difficulty: "Easy",

                description:
                    'Create variables called name and age. Store "Sam" in name and 11 in age.',

                hint:
                    'Use name = "Sam" and age = 11.',

                answer:
                    `name = "Sam"
age = 11`,

                flexible: true,

                points: 25
            },

            {
                id: 2005,
                title: "Add Using Variables",
                difficulty: "Medium",

                description:
                    "Create two variables called a and b with values 10 and 5. Print their total.",

                hint:
                    "Use print(a + b).",

                answer:
                    `a = 10
b = 5
print(a + b)`,

                points: 30
            },

            {
                id: 2006,
                title: "Update a Score",
                difficulty: "Medium",

                description:
                    "Create a variable called score with the value 10. Add 5 to it using score = score + 5, then print score.",

                hint:
                    "Python uses the old value of score to work out the new value.",

                answer:
                    `score = 10
score = score + 5
print(score)`,

                points: 30
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
                    "Which is a valid Python variable assignment?",

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
            },

            {
                id: 4,

                question:
                    "Which variable name is easier to understand?",

                options: [
                    "x",
                    "abc123",
                    "student_name",
                    "q"
                ],

                answer: 2,

                explanation:
                    "A descriptive name such as student_name makes the purpose of the variable easier to understand."
            },

            {
                id: 5,

                question:
                    "Which variable assignment stores the number 25?",

                options: [
                    'age = "25"',
                    "age = 25",
                    "25 = age",
                    "age == 25"
                ],

                answer: 1,

                explanation:
                    "age = 25 stores the number 25 in the variable age."
            },

            {
                id: 6,

                question:
                    "What will this code print?\n\nscore = 10\nscore = 20\nprint(score)",

                options: [
                    "10",
                    "20",
                    "30",
                    "Error"
                ],

                answer: 1,

                explanation:
                    "The second assignment changes score from 10 to 20, so print(score) displays 20."
            },

            {
                id: 7,

                question:
                    "Which symbol is used to assign a value to a variable?",

                options: [
                    "==",
                    "=",
                    "+",
                    ">"
                ],

                answer: 1,

                explanation:
                    "The = symbol assigns a value to a variable."
            },

            {
                id: 8,

                question:
                    "What will this code print?\n\na = 5\nb = 3\nprint(a + b)",

                options: [
                    "2",
                    "8",
                    "53",
                    "15"
                ],

                answer: 1,

                explanation:
                    "Python adds the values stored in a and b. 5 + 3 equals 8."
            }
        ]
    },

    // =========================================================
    // 3. DATA TYPES
    // =========================================================
    {
        id: 3,
        slug: "data-types",
        title: "Data Types",
        icon: "🔢",
        level: "Beginner",

        description:
            "Learn about the different types of data Python can store and work with.",

        lessons: [
            {
                id: 301,
                title: "What Are Data Types?",
                icon: "🧩",

                explanation:
                    "A data type tells Python what kind of value we are working with. For example, a number and a piece of text are different types of data. Understanding data types helps us know what we can do with a value.",

                example: `age = 12
height = 4.8
name = "Alex"
is_student = True

print(age)
print(height)
print(name)
print(is_student)`,

                output: `12
4.8
Alex
True`,

                points: 10
            },

            {
                id: 302,
                title: "Numbers: int and float",
                icon: "🔢",

                explanation:
                    "Python has two basic number types that you will use often: int and float. An int is a whole number without a decimal point. A float is a number that contains a decimal point.",

                example: `age = 12
score = 100
apples = 5

height = 4.8
price = 12.50

print(age)
print(height)`,

                output: `12
4.8`,

                points: 10
            },

            {
                id: 303,
                title: "Strings: Working with Text",
                icon: "🔤",

                explanation:
                    "A string is text stored inside quotation marks. You can use either single quotes or double quotes. Strings can contain letters, numbers, spaces, and symbols.",

                example: `name = "Alex"
city = 'London'
message = "Hello!"

print(name)
print(city)
print(message)`,

                output: `Alex
London
Hello!`,

                points: 10
            },

            {
                id: 304,
                title: "Booleans: True and False",
                icon: "✅",

                explanation:
                    "A boolean is a value that can be either True or False. Booleans are useful when a program needs to make decisions, such as checking whether a player has finished a game or whether it is raining.",

                example: `is_sunny = True
is_raining = False

print(is_sunny)
print(is_raining)`,

                output: `True
False`,

                points: 10
            },

            {
                id: 305,
                title: "Checking Data Types with type()",
                icon: "🔍",

                explanation:
                    "Python provides a useful function called type() that tells us what type of data a value contains. This is helpful when learning Python and when checking values inside a program.",

                example: `age = 12
name = "Alex"
height = 4.8
is_student = True

print(type(age))
print(type(name))
print(type(height))
print(type(is_student))`,

                output: `<class 'int'>
<class 'str'>
<class 'float'>
<class 'bool'>`,

                points: 10
            },

            {
                id: 306,
                title: "Changing Data Types",
                icon: "🔄",

                explanation:
                    "Sometimes we need to convert one type of data into another. This is called type conversion. Common conversion functions include int(), float(), and str().",

                example: `age = "12"
age = int(age)

price = 5
price = float(price)

score = 100
score_text = str(score)

print(age)
print(price)
print(score_text)`,

                output: `12
5.0
100`,

                points: 10
            }
        ],

        exercises: [
            {
                id: 3001,
                title: "Create an Integer",
                difficulty: "Easy",

                description:
                    "Create a variable called age and store the number 12 in it.",

                hint:
                    "Use age = 12.",

                answer:
                    `age = 12`,

                points: 20
            },

            {
                id: 3002,
                title: "Create a String",
                difficulty: "Easy",

                description:
                    'Create a variable called name and store "Alex" in it.',

                hint:
                    'Put the text inside quotation marks.',

                answer:
                    `name = "Alex"`,

                points: 20
            },

            {
                id: 3003,
                title: "Create a Boolean",
                difficulty: "Easy",

                description:
                    "Create a variable called is_student and store True in it.",

                hint:
                    "Use True with a capital T.",

                answer:
                    `is_student = True`,

                points: 20
            },

            {
                id: 3004,
                title: "Create a Float",
                difficulty: "Easy",

                description:
                    "Create a variable called height and store the decimal number 4.5.",

                hint:
                    "A decimal number is a float.",

                answer:
                    `height = 4.5`,

                points: 20
            },

            {
                id: 3005,
                title: "Check a Data Type",
                difficulty: "Easy",

                description:
                    "Create a variable called score with the value 100 and use type() to check its data type.",

                hint:
                    "Use print(type(score)).",

                answer:
                    `score = 100
print(type(score))`,

                points: 25
            },

            {
                id: 3006,
                title: "Convert Text to a Number",
                difficulty: "Medium",

                description:
                    'Convert the string "25" into an integer and print the result.',

                hint:
                    "Use int() to convert the string.",

                answer:
                    `number = "25"
number = int(number)
print(number)`,

                points: 30
            }
        ],

        quiz: [
            {
                id: 1,

                question:
                    "Which data type is used for whole numbers?",

                options: [
                    "int",
                    "str",
                    "bool",
                    "float"
                ],

                answer: 0,

                explanation:
                    "The int data type is used for whole numbers such as 5, 10, and 100."
            },

            {
                id: 2,

                question:
                    "Which data type is used for text?",

                options: [
                    "int",
                    "str",
                    "float",
                    "bool"
                ],

                answer: 1,

                explanation:
                    "The str data type is used for text."
            },

            {
                id: 3,

                question:
                    "Which value is a float?",

                options: [
                    "10",
                    '"10"',
                    "10.5",
                    "True"
                ],

                answer: 2,

                explanation:
                    "10.5 contains a decimal point, so it is a float."
            },

            {
                id: 4,

                question:
                    "Which two values are used by the boolean data type?",

                options: [
                    "Yes and No",
                    "1 and 0",
                    "True and False",
                    "On and Off"
                ],

                answer: 2,

                explanation:
                    "Python booleans use the values True and False."
            },

            {
                id: 5,

                question:
                    "What does type() do?",

                options: [
                    "Changes a variable",
                    "Checks the data type",
                    "Deletes a variable",
                    "Prints only text"
                ],

                answer: 1,

                explanation:
                    "The type() function tells us the data type of a value."
            },

            {
                id: 6,

                question:
                    "Which function converts a value into an integer?",

                options: [
                    "str()",
                    "float()",
                    "int()",
                    "bool()"
                ],

                answer: 2,

                explanation:
                    "The int() function converts a value to an integer when the conversion is valid."
            },

            {
                id: 7,

                question:
                    'What type of value is "Hello"?',

                options: [
                    "int",
                    "float",
                    "bool",
                    "str"
                ],

                answer: 3,

                explanation:
                    '"Hello" is text, so Python treats it as a string (str).'
            },

            {
                id: 8,

                question:
                    "What is the data type of 5.5?",

                options: [
                    "int",
                    "float",
                    "str",
                    "bool"
                ],

                answer: 1,

                explanation:
                    "5.5 is a decimal number, so its data type is float."
            }
        ]
    },

    // =========================================================
    // 4. OPERATORS
    // =========================================================
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
                    "Arithmetic operators allow Python to perform mathematical calculations. The main operators are + for addition, - for subtraction, * for multiplication, and / for division.",

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
                    "Comparison operators compare values and return True or False. Common comparison operators include >, <, ==, >=, <=, and !=.",

                example: `print(10 > 5)
print(10 < 5)
print(10 == 10)
print(10 != 5)`,

                output: `True
False
True
True`,

                points: 10
            },

            {
                id: 403,
                title: "Using Operators with Variables",
                icon: "🧮",

                explanation:
                    "Operators can also be used with variables. This allows programs to perform calculations using values stored in variables.",

                example: `apples = 5
oranges = 3

total = apples + oranges

print(total)`,

                output: `8`,

                points: 10
            },

            {
                id: 404,
                title: "Remainder with %",
                icon: "🍰",

                explanation:
                    "The % operator gives us the remainder after division. For example, 10 divided by 3 has a remainder of 1. The remainder operator is useful for problems such as checking whether a number is even or odd.",

                example: `print(10 % 3)
print(8 % 2)
print(7 % 2)`,

                output: `1
0
1`,

                points: 10
            },

            {
                id: 405,
                title: "Assignment Shortcuts",
                icon: "⚡",

                explanation:
                    "Programs often need to change a variable by adding or taking away a number, such as when a player scores points. Python has handy shortcuts for this. score += 5 means the same as score = score + 5, and score -= 3 means the same as score = score - 3.",

                example: `score = 10

score += 5
print(score)

score -= 3
print(score)`,

                output: `15
12`,

                points: 10
            },

            {
                id: 406,
                title: "Powers and Floor Division",
                icon: "🚀",

                explanation:
                    "The ** operator raises a number to a power. For example, 2 ** 3 means 2 * 2 * 2. The // operator is called floor division. It divides two numbers and gives a whole number answer by throwing away anything after the decimal point.",

                example: `print(2 ** 3)
print(5 ** 2)
print(7 // 2)
print(10 // 3)`,

                output: `8
25
3
3`,

                points: 10
            },

            {
                id: 407,
                title: "Order of Operations",
                icon: "🧠",

                explanation:
                    "When a calculation has more than one operator, Python follows the same rules as in maths class. Multiplication and division happen before addition and subtraction. If we want Python to do a part of the calculation first, we can put it inside brackets ().",

                example: `print(2 + 3 * 4)
print((2 + 3) * 4)
print(10 - 4 / 2)`,

                output: `14
20
8.0`,

                points: 10
            },

            {
                id: 408,
                title: "Logical Operators: and, or, not",
                icon: "🔗",

                explanation:
                    "Logical operators let us combine True and False values. and gives True only when both sides are True. or gives True when at least one side is True. not flips a value, so True becomes False and False becomes True.",

                example: `age = 12
has_ticket = True

print(age >= 10 and has_ticket)
print(age < 5 or has_ticket)
print(not has_ticket)`,

                output: `True
True
False`,

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
            },

            {
                id: 4003,
                title: "Find a Remainder",
                difficulty: "Easy",

                description:
                    "Print the remainder when 10 is divided by 3.",

                hint:
                    "Use the % operator.",

                answer:
                    `print(10 % 3)`,

                points: 25
            },

            {
                id: 4004,
                title: "Calculate a Total",
                difficulty: "Medium",

                description:
                    "Create two variables called price and quantity with values 10 and 3. Print their product.",

                hint:
                    "Use the * operator.",

                answer:
                    `price = 10
quantity = 3
print(price * quantity)`,

                points: 30
            },

            {
                id: 4005,
                title: "Level Up with +=",
                difficulty: "Easy",

                description:
                    "Create a variable called lives with the value 3. Use += to add 2 more lives, then print lives.",

                hint:
                    "lives += 2 adds 2 to the value already stored in lives.",

                answer:
                    `lives = 3
lives += 2
print(lives)`,

                points: 25
            },

            {
                id: 4006,
                title: "Power Up",
                difficulty: "Easy",

                description:
                    "Print the result of 3 to the power of 2.",

                hint:
                    "Use the ** operator.",

                answer:
                    `print(3 ** 2)`,

                points: 25
            },

            {
                id: 4007,
                title: "Share the Sweets",
                difficulty: "Medium",

                description:
                    "There are 17 sweets to share equally between 5 friends. Print how many sweets each friend gets, then print how many sweets are left over.",

                hint:
                    "Use // to find how many each friend gets and % to find the leftovers.",

                answer:
                    `sweets = 17
friends = 5
print(sweets // friends)
print(sweets % friends)`,

                points: 30
            },

            {
                id: 4008,
                title: "Check Two Conditions",
                difficulty: "Medium",

                description:
                    "Create a variable called age with the value 11 and a variable called height with the value 140. Print whether age is at least 10 and height is at least 130.",

                hint:
                    "Use >= twice and join the two comparisons with and.",

                answer:
                    `age = 11
height = 140
print(age >= 10 and height >= 130)`,

                points: 30
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
            },

            {
                id: 4,

                question:
                    "What does the % operator return?",

                options: [
                    "The remainder",
                    "The total",
                    "The largest number",
                    "The smallest number"
                ],

                answer: 0,

                explanation:
                    "The % operator returns the remainder after division."
            },

            {
                id: 5,

                question:
                    "What will 8 > 3 return?",

                options: [
                    "True",
                    "False",
                    "8",
                    "3"
                ],

                answer: 0,

                explanation:
                    "8 is greater than 3, so the comparison returns True."
            },

            {
                id: 6,

                question:
                    "What will 10 % 3 return?",

                options: [
                    "0",
                    "1",
                    "3",
                    "10"
                ],

                answer: 1,

                explanation:
                    "10 divided by 3 leaves a remainder of 1."
            },

            {
                id: 7,

                question:
                    "What will this code print?\n\nprint(2 + 3 * 4)",

                options: [
                    "20",
                    "24",
                    "9",
                    "14"
                ],

                answer: 3,

                explanation:
                    "Python does multiplication first. 3 * 4 is 12, and 2 + 12 is 14."
            },

            {
                id: 8,

                question:
                    "What does score += 2 do?",

                options: [
                    "Sets score to 2",
                    "Checks if score equals 2",
                    "Adds 2 to score",
                    "Multiplies score by 2"
                ],

                answer: 2,

                explanation:
                    "score += 2 is a shortcut for score = score + 2, so it adds 2 to score."
            }
        ]
    },

    // =========================================================
    // 5. IF / ELSE
    // =========================================================
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
                    "An if statement allows Python to run some code only when a condition is True. Conditions help programs make decisions based on information.",

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
                    "The else block runs when the if condition is False. This allows a program to choose between two different actions.",

                example: `age = 7

if age >= 10:
    print("You can play!")
else:
    print("You are too young!")`,

                output: `You are too young!`,

                points: 10
            },

            {
                id: 503,
                title: "Using Comparison Operators",
                icon: "⚖️",

                explanation:
                    "Conditions often use comparison operators such as >, <, ==, >=, and <=. Python checks the comparison and gets either True or False.",

                example: `score = 80

if score >= 50:
    print("You passed!")
else:
    print("Try again!")`,

                output: `You passed!`,

                points: 10
            },

            {
                id: 504,
                title: "Multiple Choices with elif",
                icon: "🔀",

                explanation:
                    "The elif keyword allows a program to check another condition when the previous if condition was False. You can use multiple elif blocks when there are several possible choices.",

                example: `score = 85

if score >= 90:
    print("Excellent!")
elif score >= 50:
    print("Good job!")
else:
    print("Keep practicing!")`,

                output: `Good job!`,

                points: 10
            },

            {
                id: 505,
                title: "Using and / or in Conditions",
                icon: "🔗",

                explanation:
                    "Sometimes a decision depends on more than one thing. We can use and when both conditions must be True, and or when only one of them needs to be True. This lets us write smarter conditions in a single if statement.",

                example: `age = 12
has_ticket = True

if age >= 10 and has_ticket:
    print("Enjoy the ride!")
else:
    print("Sorry, you cannot ride.")

day = "Sunday"

if day == "Saturday" or day == "Sunday":
    print("It's the weekend!")`,

                output: `Enjoy the ride!
It's the weekend!`,

                points: 10
            },

            {
                id: 506,
                title: "Nested if Statements",
                icon: "🔁",

                explanation:
                    "An if statement can be placed inside another if statement. This is called nesting. The inner if is only checked when the outer condition is True. Remember to indent the inner block a little further so Python knows which code belongs to which if.",

                example: `is_weekend = True
is_sunny = False

if is_weekend:
    print("No school today!")
    if is_sunny:
        print("Let's go to the park!")
    else:
        print("Let's play board games!")`,

                output: `No school today!
Let's play board games!`,

                points: 10
            },

            {
                id: 507,
                title: "Mini Grade Checker",
                icon: "🏆",

                explanation:
                    "We can use if, elif, and else together to build a grade checker. Python checks each condition from top to bottom and runs the first block whose condition is True. Once one block runs, Python skips the rest.",

                example: `score = 72

if score >= 90:
    print("Grade: A")
elif score >= 75:
    print("Grade: B")
elif score >= 60:
    print("Grade: C")
else:
    print("Grade: D")`,

                output: `Grade: C`,

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
                    `age = 12

if age >= 10:
    print("You can play.")`,

                points: 25
            },

            {
                id: 5002,
                title: "Check a Score",
                difficulty: "Easy",

                description:
                    "If score is 50 or more, print Passed. Otherwise print Try again.",

                hint:
                    "Use if, >= and else.",

                answer:
                    `score = 60

if score >= 50:
    print("Passed")
else:
    print("Try again")`,

                points: 30
            },

            {
                id: 5003,
                title: "Check a Number",
                difficulty: "Medium",

                description:
                    "Check whether a number is greater than 10.",

                hint:
                    "Use an if statement and the > operator.",

                answer:
                    `number = 15

if number > 10:
    print("Greater than 10")`,

                points: 30
            },

            {
                id: 5004,
                title: "Check the Password",
                difficulty: "Easy",

                description:
                    'Create a variable called password with the value "python123". If password is equal to "python123", print Access granted. Otherwise print Access denied.',

                hint:
                    "Use == to check whether two values are equal.",

                answer:
                    `password = "python123"

if password == "python123":
    print("Access granted")
else:
    print("Access denied")`,

                points: 25
            },

            {
                id: 5005,
                title: "Even or Odd",
                difficulty: "Medium",

                description:
                    "Create a variable called number with the value 7. Print Even if the number is even, otherwise print Odd.",

                hint:
                    "A number is even when number % 2 == 0.",

                answer:
                    `number = 7

if number % 2 == 0:
    print("Even")
else:
    print("Odd")`,

                points: 30
            },

            {
                id: 5006,
                title: "Weekend Checker",
                difficulty: "Easy",

                description:
                    'Create a variable called day with the value "Saturday". If day is "Saturday" or "Sunday", print Weekend! Otherwise print School day.',

                hint:
                    "Use or to join two == checks.",

                answer:
                    `day = "Saturday"

if day == "Saturday" or day == "Sunday":
    print("Weekend!")
else:
    print("School day")`,

                points: 25
            },

            {
                id: 5007,
                title: "Grade Checker",
                difficulty: "Medium",

                description:
                    "Create a variable called score with the value 85. Print A for 90 or more, B for 75 or more, C for 60 or more, and D for anything lower.",

                hint:
                    "Use if, elif, elif, and else. Start with the highest grade.",

                answer:
                    `score = 85

if score >= 90:
    print("A")
elif score >= 75:
    print("B")
elif score >= 60:
    print("C")
else:
    print("D")`,

                points: 35
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
            },

            {
                id: 3,

                question:
                    "Which keyword can be used to check another condition?",

                options: [
                    "elif",
                    "repeat",
                    "again",
                    "next"
                ],

                answer: 0,

                explanation:
                    "elif lets Python check another condition when the previous condition was False."
            },

            {
                id: 4,

                question:
                    "What will this code print?\n\nage = 12\n\nif age >= 10:\n    print(\"Yes\")",

                options: [
                    "No",
                    "Yes",
                    "12",
                    "Error"
                ],

                answer: 1,

                explanation:
                    "12 is greater than or equal to 10, so Python prints Yes."
            },

            {
                id: 5,

                question:
                    "What will this code print?\n\nscore = 40\n\nif score >= 50:\n    print(\"Pass\")\nelse:\n    print(\"Fail\")",

                options: [
                    "Pass",
                    "40",
                    "Fail",
                    "Nothing"
                ],

                answer: 2,

                explanation:
                    "40 is not 50 or more, so the condition is False and the else block prints Fail."
            },

            {
                id: 6,

                question:
                    "When is this condition True?\n\nage >= 10 and has_ticket",

                options: [
                    "When only one part is True",
                    "When both parts are False",
                    "Always",
                    "When both parts are True"
                ],

                answer: 3,

                explanation:
                    "The and operator only gives True when both conditions are True."
            },

            {
                id: 7,

                question:
                    "Which symbol must come at the end of an if line?",

                options: [
                    ":",
                    ";",
                    ".",
                    "!"
                ],

                answer: 0,

                explanation:
                    "Every if, elif, and else line ends with a colon :."
            },

            {
                id: 8,

                question:
                    "What will this code print?\n\nscore = 80\n\nif score >= 90:\n    print(\"A\")\nelif score >= 70:\n    print(\"B\")\nelse:\n    print(\"C\")",

                options: [
                    "A",
                    "B",
                    "C",
                    "A and B"
                ],

                answer: 1,

                explanation:
                    "80 is not 90 or more, but it is 70 or more, so the elif block prints B."
            }
        ]
    },

    // =========================================================
    // 6. LOOPS
    // =========================================================
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
                    "A for loop repeats code for each item in a sequence. The range() function is commonly used when we want to repeat something a certain number of times.",

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
                    "A while loop continues running as long as its condition is True. It is important to change the value used by the condition so that the loop can eventually stop.",

                example: `count = 1

while count <= 3:
    print(count)
    count += 1`,

                output: `1
2
3`,

                points: 15
            },

            {
                id: 603,
                title: "Using range()",
                icon: "🔢",

                explanation:
                    "The range() function creates a sequence of numbers. range(5) gives the numbers 0 through 4. The ending number is not included.",

                example: `for number in range(5):
    print(number)`,

                output: `0
1
2
3
4`,

                points: 15
            },

            {
                id: 604,
                title: "Repeating a Message",
                icon: "📢",

                explanation:
                    "Loops are useful when we want to repeat the same action many times. Instead of writing the same print statement repeatedly, we can use a loop.",

                example: `for i in range(3):
    print("Python is fun!")`,

                output: `Python is fun!
Python is fun!
Python is fun!`,

                points: 15
            },

            {
                id: 605,
                title: "Counting with a Step",
                icon: "📶",

                explanation:
                    "range() can take three numbers: a start, a stop, and a step. The step tells Python how much to jump each time. range(2, 11, 2) starts at 2, jumps by 2, and stops before reaching 11.",

                example: `for number in range(2, 11, 2):
    print(number)`,

                output: `2
4
6
8
10`,

                points: 15
            },

            {
                id: 606,
                title: "Counting Down",
                icon: "🚀",

                explanation:
                    "If we use a negative step, range() counts backwards. range(5, 0, -1) starts at 5 and goes down by 1 each time, stopping before it reaches 0. This is perfect for a rocket countdown!",

                example: `for number in range(5, 0, -1):
    print(number)

print("Blast off!")`,

                output: `5
4
3
2
1
Blast off!`,

                points: 15
            },

            {
                id: 607,
                title: "Looping Through a List",
                icon: "📋",

                explanation:
                    "A for loop can go through every item in a list, one at a time. Each time the loop runs, the loop variable holds the next item from the list. This means we do not need to know how many items the list has.",

                example: `pets = ["cat", "dog", "fish"]

for pet in pets:
    print("I love my", pet)`,

                output: `I love my cat
I love my dog
I love my fish`,

                points: 15
            },

            {
                id: 608,
                title: "Adding Up with a Loop",
                icon: "➕",

                explanation:
                    "Loops can help us add up lots of numbers. We start with a total of 0, and each time the loop runs we add the next number to the total. After the loop finishes, we print the final total.",

                example: `total = 0

for number in range(1, 6):
    total += number

print(total)`,

                output: `15`,

                points: 15
            },

            {
                id: 609,
                title: "Stopping a While Loop",
                icon: "⏱️",

                explanation:
                    "A while loop keeps going until its condition becomes False. In a countdown, we take 1 away from the counter each time. When the counter reaches 0, the condition countdown > 0 is False and the loop stops. If the counter never changed, the loop would run forever!",

                example: `countdown = 3

while countdown > 0:
    print(countdown)
    countdown -= 1

print("Go!")`,

                output: `3
2
1
Go!`,

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
            },

            {
                id: 6002,
                title: "Repeat a Message",
                difficulty: "Easy",

                description:
                    'Use a loop to print "Python is fun!" three times.',

                hint:
                    "Use range(3).",

                answer:
                    `for i in range(3):
    print("Python is fun!")`,

                points: 30
            },

            {
                id: 6003,
                title: "Count with a While Loop",
                difficulty: "Medium",

                description:
                    "Use a while loop to print 1, 2, and 3.",

                hint:
                    "Start count at 1 and increase it inside the loop.",

                answer:
                    `count = 1

while count <= 3:
    print(count)
    count += 1`,

                points: 35
            },

            {
                id: 6004,
                title: "Even Numbers",
                difficulty: "Easy",

                description:
                    "Use a for loop to print the even numbers 2, 4, 6, 8, and 10.",

                hint:
                    "Use range(2, 11, 2).",

                answer:
                    `for number in range(2, 11, 2):
    print(number)`,

                points: 30
            },

            {
                id: 6005,
                title: "Say Hi to Friends",
                difficulty: "Easy",

                description:
                    'Create a list called friends with "Mia", "Leo" and "Zara". Use a for loop to print Hi followed by each name.',

                hint:
                    'Use for friend in friends: and print("Hi", friend).',

                answer:
                    `friends = ["Mia", "Leo", "Zara"]

for friend in friends:
    print("Hi", friend)`,

                points: 30
            },

            {
                id: 6006,
                title: "Rocket Countdown",
                difficulty: "Medium",

                description:
                    "Use a for loop to count down from 10 to 1, then print Blast off!",

                hint:
                    "Use range(10, 0, -1) and put the last print() outside the loop.",

                answer:
                    `for number in range(10, 0, -1):
    print(number)

print("Blast off!")`,

                points: 35
            },

            {
                id: 6007,
                title: "Add Up 1 to 10",
                difficulty: "Medium",

                description:
                    "Use a loop to add up all the numbers from 1 to 10, then print the total.",

                hint:
                    "Start with total = 0 and use total += number inside the loop.",

                answer:
                    `total = 0

for number in range(1, 11):
    total += number

print(total)`,

                points: 35
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
            },

            {
                id: 3,

                question:
                    "Which loop continues while a condition is True?",

                options: [
                    "for",
                    "while",
                    "if",
                    "def"
                ],

                answer: 1,

                explanation:
                    "A while loop continues running while its condition is True."
            },

            {
                id: 4,

                question:
                    "What is the first number produced by range(5)?",

                options: [
                    "0",
                    "1",
                    "4",
                    "5"
                ],

                answer: 0,

                explanation:
                    "Python starts range(5) at 0."
            },

            {
                id: 5,

                question:
                    "What will this code print?\n\nfor i in range(1, 4):\n    print(i)",

                options: [
                    "0 1 2 3",
                    "1 2 3 4",
                    "1 2 3",
                    "0 1 2"
                ],

                answer: 2,

                explanation:
                    "range(1, 4) starts at 1 and stops before 4, so it gives 1, 2 and 3."
            },

            {
                id: 6,

                question:
                    "What does range(10, 0, -1) do?",

                options: [
                    "Counts up from 0 to 10",
                    "Gives the number 10 only once",
                    "Counts down from 10 to 0",
                    "Counts down from 10 to 1"
                ],

                answer: 3,

                explanation:
                    "The step -1 makes range() count backwards. It starts at 10 and stops before reaching 0, so the last number is 1."
            },

            {
                id: 7,

                question:
                    "What will this code print?\n\ntotal = 0\n\nfor n in range(1, 4):\n    total += n\n\nprint(total)",

                options: [
                    "6",
                    "3",
                    "4",
                    "10"
                ],

                answer: 0,

                explanation:
                    "The loop adds 1, 2 and 3 to the total. 1 + 2 + 3 = 6."
            },

            {
                id: 8,

                question:
                    "What happens if a while loop's condition never becomes False?",

                options: [
                    "The loop runs once",
                    "Python skips the loop",
                    "The loop runs forever",
                    "The computer turns off"
                ],

                answer: 2,

                explanation:
                    "If the condition always stays True, the while loop never stops. This is called an infinite loop."
            }
        ]
    },

    // =========================================================
    // 7. LISTS
    // =========================================================
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
                    "A list allows us to store multiple values in one variable. Lists are written using square brackets, and individual values are separated by commas.",

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
                    "Each item in a list has a position called an index. Python starts counting indexes from 0, so the first item is at index 0, the second item is at index 1, and so on.",

                example: `fruits = ["Apple", "Banana", "Mango"]

print(fruits[0])
print(fruits[1])`,

                output: `Apple
Banana`,

                points: 15
            },

            {
                id: 703,
                title: "Adding Items to a List",
                icon: "➕",

                explanation:
                    "We can add an item to the end of a list using the append() method. This is useful when we want our list to grow while a program is running.",

                example: `fruits = ["Apple", "Banana"]

fruits.append("Mango")

print(fruits)`,

                output:
                    `['Apple', 'Banana', 'Mango']`,

                points: 15
            },

            {
                id: 704,
                title: "Changing List Items",
                icon: "✏️",

                explanation:
                    "List items can be changed by using their index. We assign a new value to the position we want to change.",

                example: `fruits = ["Apple", "Banana", "Mango"]

fruits[1] = "Orange"

print(fruits)`,

                output:
                    `['Apple', 'Orange', 'Mango']`,

                points: 15
            },

            {
                id: 705,
                title: "Counting Items with len()",
                icon: "📏",

                explanation:
                    "The len() function tells us how many items are inside a list. This is useful when we want to know how big a list is, such as how many players are in a game.",

                example: `fruits = ["Apple", "Banana", "Mango"]

print(len(fruits))`,

                output: `3`,

                points: 15
            },

            {
                id: 706,
                title: "Removing Items",
                icon: "🗑️",

                explanation:
                    "We can take items out of a list in two main ways. remove() deletes the first item that matches a value. pop() takes the last item out of the list and gives it back to us, so we can store it in a variable.",

                example: `fruits = ["Apple", "Banana", "Mango", "Grape"]

fruits.remove("Banana")
print(fruits)

last = fruits.pop()
print(last)
print(fruits)`,

                output: `['Apple', 'Mango', 'Grape']
Grape
['Apple', 'Mango']`,

                points: 15
            },

            {
                id: 707,
                title: "Looping Over a List",
                icon: "🔁",

                explanation:
                    "A for loop can visit every item in a list, one after another. This lets us do something with each item, such as printing it, without writing a separate line for every item.",

                example: `colors = ["red", "green", "blue"]

for color in colors:
    print(color)`,

                output: `red
green
blue`,

                points: 15
            },

            {
                id: 708,
                title: "Checking with in",
                icon: "🔍",

                explanation:
                    "The in keyword checks whether a value is inside a list. It gives True if the value is found and False if it is not. This is often used together with an if statement.",

                example: `fruits = ["Apple", "Banana", "Mango"]

print("Mango" in fruits)
print("Grape" in fruits)`,

                output: `True
False`,

                points: 15
            },

            {
                id: 709,
                title: "Sorting a List",
                icon: "🔤",

                explanation:
                    "The sort() method puts the items in a list in order. Numbers are sorted from smallest to largest, and words are sorted in alphabetical order. sort() changes the list itself.",

                example: `numbers = [5, 2, 9, 1]
numbers.sort()
print(numbers)

names = ["Zoe", "Adam", "Mia"]
names.sort()
print(names)`,

                output: `[1, 2, 5, 9]
['Adam', 'Mia', 'Zoe']`,

                points: 15
            },

            {
                id: 710,
                title: "Slicing a List",
                icon: "✂️",

                explanation:
                    "Slicing lets us take a part of a list. letters[0:2] gives the items from index 0 up to, but not including, index 2. We can also use a negative index such as -1 to get the last item.",

                example: `letters = ["a", "b", "c", "d", "e"]

print(letters[0:2])
print(letters[1:4])
print(letters[-1])`,

                output: `['a', 'b']
['b', 'c', 'd']
e`,

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
            },

            {
                id: 7002,
                title: "Get the First Item",
                difficulty: "Easy",

                description:
                    'Create a list with "Apple", "Banana" and "Mango", then print the first item.',

                hint:
                    "Remember that the first index is 0.",

                answer:
                    `fruits = ["Apple", "Banana", "Mango"]
print(fruits[0])`,

                points: 30
            },

            {
                id: 7003,
                title: "Add an Item",
                difficulty: "Medium",

                description:
                    'Create a list with "Apple" and "Banana", then add "Mango".',

                hint:
                    "Use append().",

                answer:
                    `fruits = ["Apple", "Banana"]
fruits.append("Mango")`,

                points: 30
            },

            {
                id: 7004,
                title: "Count the Items",
                difficulty: "Easy",

                description:
                    'Create a list called animals with "cat", "dog", "rabbit" and "hamster". Print how many items are in the list.',

                hint:
                    "Use len().",

                answer:
                    `animals = ["cat", "dog", "rabbit", "hamster"]
print(len(animals))`,

                points: 25
            },

            {
                id: 7005,
                title: "Remove an Item",
                difficulty: "Easy",

                description:
                    'Create a list called colors with "red", "green" and "blue". Remove "green", then print the list.',

                hint:
                    'Use colors.remove("green").',

                answer:
                    `colors = ["red", "green", "blue"]
colors.remove("green")
print(colors)`,

                points: 25
            },

            {
                id: 7006,
                title: "Is It in the List?",
                difficulty: "Easy",

                description:
                    'Create a list called fruits with "Apple", "Banana" and "Mango". Print whether "Banana" is in the list.',

                hint:
                    'Use print("Banana" in fruits).',

                answer:
                    `fruits = ["Apple", "Banana", "Mango"]
print("Banana" in fruits)`,

                points: 25
            },

            {
                id: 7007,
                title: "Print Every Item",
                difficulty: "Medium",

                description:
                    'Create a list called toys with "ball", "kite" and "robot". Use a for loop to print each toy on its own line.',

                hint:
                    "Use for toy in toys:",

                answer:
                    `toys = ["ball", "kite", "robot"]

for toy in toys:
    print(toy)`,

                points: 30
            },

            {
                id: 7008,
                title: "Sort the Scores",
                difficulty: "Medium",

                description:
                    "Create a list called scores with 45, 90, 12 and 78. Sort the list from smallest to largest, then print it.",

                hint:
                    "Use scores.sort().",

                answer:
                    `scores = [45, 90, 12, 78]
scores.sort()
print(scores)`,

                points: 30
            },

            {
                id: 7009,
                title: "First Three Items",
                difficulty: "Medium",

                description:
                    "Create a list called numbers with 10, 20, 30, 40 and 50. Use slicing to print only the first three items.",

                hint:
                    "Use numbers[0:3].",

                answer:
                    `numbers = [10, 20, 30, 40, 50]
print(numbers[0:3])`,

                points: 35
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
            },

            {
                id: 3,

                question:
                    "Which method adds an item to the end of a list?",

                options: [
                    "add()",
                    "append()",
                    "insert_end()",
                    "push()"
                ],

                answer: 1,

                explanation:
                    "The append() method adds an item to the end of a list."
            },

            {
                id: 4,

                question:
                    'What will fruits[0] return?\n\nfruits = ["Apple", "Banana"]',

                options: [
                    "Apple",
                    "Banana",
                    "0",
                    "Error"
                ],

                answer: 0,

                explanation:
                    "The first item in a Python list has index 0."
            },

            {
                id: 5,

                question:
                    "What will this code print?\n\npets = [\"cat\", \"dog\", \"fish\"]\nprint(len(pets))",

                options: [
                    "2",
                    "3",
                    "4",
                    "fish"
                ],

                answer: 1,

                explanation:
                    "len() counts the items in the list. There are 3 pets."
            },

            {
                id: 6,

                question:
                    "Which method removes a matching item from a list?",

                options: [
                    "append()",
                    "sort()",
                    "len()",
                    "remove()"
                ],

                answer: 3,

                explanation:
                    "remove() deletes the first item in the list that matches the value you give it."
            },

            {
                id: 7,

                question:
                    "What will this code print?\n\nfruits = [\"Apple\", \"Mango\"]\nprint(\"Mango\" in fruits)",

                options: [
                    "Mango",
                    "1",
                    "True",
                    "False"
                ],

                answer: 2,

                explanation:
                    "\"Mango\" is inside the list, so the in check gives True."
            },

            {
                id: 8,

                question:
                    "What will numbers[0:2] give?\n\nnumbers = [10, 20, 30, 40]",

                options: [
                    "[10, 20]",
                    "[10, 20, 30]",
                    "[20, 30]",
                    "[0, 2]"
                ],

                answer: 0,

                explanation:
                    "The slice starts at index 0 and stops before index 2, so it gives the first two items: [10, 20]."
            }
        ]
    },

    // =========================================================
    // 8. FUNCTIONS
    // =========================================================
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
                    "A function is a reusable block of code. We create a function using the def keyword. The code inside the function runs when we call the function.",

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
                    "Parameters allow us to send information into a function. The function can then use that information when it runs.",

                example: `def greet(name):
    print("Hello", name)

greet("Alex")`,

                output:
                    `Hello Alex`,

                points: 15
            },

            {
                id: 803,
                title: "Returning a Value",
                icon: "📤",

                explanation:
                    "A function can send a value back to the part of the program that called it. We use the return keyword to return a value.",

                example: `def add(a, b):
    return a + b

result = add(5, 3)

print(result)`,

                output:
                    `8`,

                points: 15
            },

            {
                id: 804,
                title: "Why Use Functions?",
                icon: "💡",

                explanation:
                    "Functions help us organize programs into smaller pieces. They allow us to reuse code instead of writing the same instructions again and again. This can make programs easier to understand and maintain.",

                example: `def say_hello():
    print("Hello!")

say_hello()
say_hello()
say_hello()`,

                output: `Hello!
Hello!
Hello!`,

                points: 15
            },

            {
                id: 805,
                title: "Default Parameters",
                icon: "🎛️",

                explanation:
                    "A parameter can have a default value. If we call the function without giving that information, Python uses the default value instead. We set a default by writing = and a value after the parameter name.",

                example: `def greet(name="friend"):
    print("Hello", name)

greet("Alex")
greet()`,

                output: `Hello Alex
Hello friend`,

                points: 15
            },

            {
                id: 806,
                title: "Functions Calling Functions",
                icon: "📞",

                explanation:
                    "A function can call another function. This lets us build bigger tools out of smaller ones, a bit like building a model out of blocks. Each function does one small job, and together they solve a bigger problem.",

                example: `def double(number):
    return number * 2

def double_and_add_one(number):
    return double(number) + 1

print(double_and_add_one(5))`,

                output: `11`,

                points: 15
            },

            {
                id: 807,
                title: "Returning True or False",
                icon: "✅",

                explanation:
                    "A function can return a boolean value, either True or False. This is handy for asking yes-or-no questions, such as whether a number is even. The answer can then be printed or used in an if statement.",

                example: `def is_even(number):
    return number % 2 == 0

print(is_even(4))
print(is_even(7))`,

                output: `True
False`,

                points: 15
            },

            {
                id: 808,
                title: "Where Variables Live (Scope)",
                icon: "🏠",

                explanation:
                    "A variable created inside a function only lives inside that function. This is called a local variable, and the rest of the program cannot see it. A variable created outside all functions can be read from inside a function. Think of a function as a room: things made inside the room stay in the room.",

                example: `bonus = 10

def add_bonus(score):
    total = score + bonus
    return total

print(add_bonus(5))
print(bonus)`,

                output: `15
10`,

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
            },

            {
                id: 8002,
                title: "Create a Function with a Parameter",
                difficulty: "Medium",

                description:
                    "Create a function called greet that accepts a name and prints Hello followed by the name.",

                hint:
                    "Use def greet(name):",

                answer:
                    `def greet(name):
    print("Hello", name)`,

                points: 35
            },

            {
                id: 8003,
                title: "Return a Total",
                difficulty: "Medium",

                description:
                    "Create a function called add that accepts two numbers and returns their sum.",

                hint:
                    "Use return a + b.",

                answer:
                    `def add(a, b):
    return a + b`,

                points: 35
            },

            {
                id: 8004,
                title: "Say Hi Twice",
                difficulty: "Easy",

                description:
                    "Create a function called say_hi that prints Hi! Then call the function two times.",

                hint:
                    "Write say_hi() twice after the function.",

                answer:
                    `def say_hi():
    print("Hi!")

say_hi()
say_hi()`,

                points: 25
            },

            {
                id: 8005,
                title: "Square a Number",
                difficulty: "Easy",

                description:
                    "Create a function called square that returns a number multiplied by itself. Print the result of square(4).",

                hint:
                    "Use return number * number.",

                answer:
                    `def square(number):
    return number * number

print(square(4))`,

                points: 30
            },

            {
                id: 8006,
                title: "Default Greeting",
                difficulty: "Medium",

                description:
                    'Create a function called greet with a parameter name that has the default value "friend". It should print Hello followed by the name. Call greet() without any value.',

                hint:
                    'Use def greet(name="friend"):',

                answer:
                    `def greet(name="friend"):
    print("Hello", name)

greet()`,

                points: 35
            },

            {
                id: 8007,
                title: "Is It Even?",
                difficulty: "Medium",

                description:
                    "Create a function called is_even that returns True if a number is even and False if it is not. Print the result of is_even(10).",

                hint:
                    "Use return number % 2 == 0.",

                answer:
                    `def is_even(number):
    return number % 2 == 0

print(is_even(10))`,

                points: 35
            },

            {
                id: 8008,
                title: "Function Team-Up",
                difficulty: "Medium",

                description:
                    'Create a function called area that returns width * height. Then create a function called show_area that calls area() and prints "The area is" followed by the answer. Call show_area(3, 4).',

                hint:
                    'Inside show_area, use print("The area is", area(width, height)).',

                answer:
                    `def area(width, height):
    return width * height

def show_area(width, height):
    print("The area is", area(width, height))

show_area(3, 4)`,

                points: 40
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
            },

            {
                id: 3,

                question:
                    "What is a parameter used for?",

                options: [
                    "Sending information into a function",
                    "Deleting a function",
                    "Stopping Python",
                    "Creating a computer"
                ],

                answer: 0,

                explanation:
                    "Parameters allow information to be passed into a function."
            },

            {
                id: 4,

                question:
                    "Which keyword sends a value back from a function?",

                options: [
                    "send",
                    "give",
                    "return",
                    "output"
                ],

                answer: 2,

                explanation:
                    "The return keyword sends a value back from a function."
            },

            {
                id: 5,

                question:
                    "What will this code print?\n\ndef greet(name=\"friend\"):\n    print(\"Hello\", name)\n\ngreet()",

                options: [
                    "Hello",
                    "Hello name",
                    "Error",
                    "Hello friend"
                ],

                answer: 3,

                explanation:
                    "No name was given, so Python uses the default value \"friend\"."
            },

            {
                id: 6,

                question:
                    "What will this code print?\n\ndef is_big(n):\n    return n > 10\n\nprint(is_big(3))",

                options: [
                    "True",
                    "False",
                    "3",
                    "10"
                ],

                answer: 1,

                explanation:
                    "3 is not greater than 10, so the function returns False."
            },

            {
                id: 7,

                question:
                    "What will this code print?\n\ndef double(n):\n    return n * 2\n\nprint(double(double(3)))",

                options: [
                    "6",
                    "9",
                    "12",
                    "33"
                ],

                answer: 2,

                explanation:
                    "double(3) returns 6, and then double(6) returns 12."
            },

            {
                id: 8,

                question:
                    "A variable created inside a function is...",

                options: [
                    "Only usable inside that function",
                    "Usable everywhere in the program",
                    "Deleted before the function runs",
                    "Always equal to 0"
                ],

                answer: 0,

                explanation:
                    "Variables made inside a function are local. They only exist inside that function."
            }
        ]
    }
];

const bySlug = (slug) =>
    coreTopics.find(topic => topic.slug === slug);

// Ordered so each topic only uses ideas from the ones before it.
const lessonData = [
    bySlug("python-basics"),
    bySlug("variables"),
    bySlug("data-types"),
    bySlug("operators"),
    strings,
    userInput,
    bySlug("if-else"),
    bySlug("loops"),
    loopControl,
    bySlug("lists"),
    tuplesSets,
    dictionaries,
    bySlug("functions"),
    randomModules,
    errorHandling,
    turtleGraphics,
    classesObjects
];

export default lessonData;
