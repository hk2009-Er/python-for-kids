const lessonData = [
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
            }
        ]
    }
];

export default lessonData;