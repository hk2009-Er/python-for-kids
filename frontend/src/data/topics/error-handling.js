const topic = {
    id: 15,
    slug: "error-handling",
    title: "Fixing Errors",
    icon: "🐞",
    level: "Advanced",

    description:
        "Every programmer makes mistakes! Learn to read error messages like a detective, fix common bugs, and use try and except so your programs don't crash.",

    lessons: [
        {
            id: 1501,
            title: "Reading Error Messages",
            icon: "🔍",

            explanation:
                "When Python finds a problem, it stops and shows an error message. Don't worry, errors are clues, not failures! Look at the last line first: it tells you the type of error and what went wrong. A NameError means Python does not know a name, often because of a typo or a variable that was never made.",

            example: `print("Start!")
print(score)`,

            output: `Start!
NameError: name 'score' is not defined`,

            points: 15
        },

        {
            id: 1502,
            title: "SyntaxError: Typos in Code",
            icon: "✏️",

            explanation:
                "A SyntaxError means the code is not written the way Python expects, like a sentence with missing punctuation. Common causes are a missing bracket, a missing quotation mark, or a missing colon after if or for. With a SyntaxError, Python won't run any of the program until it is fixed.",

            example: `print("Hello"`,

            output: `SyntaxError: '(' was never closed`,

            points: 15
        },

        {
            id: 1503,
            title: "TypeError and ValueError",
            icon: "🧩",

            explanation:
                "A TypeError happens when we mix types that don't fit together, like adding text and a number. A ValueError happens when the type is right but the value is wrong, like int(\"seven\"), because Python can't turn the word seven into a number. We can fix a TypeError by changing the number into text with str().",

            example: `age = 10
print("I am " + str(age) + " years old")
print("I am " + age + " years old")`,

            output: `I am 10 years old
TypeError: can only concatenate str (not "int") to str`,

            points: 15
        },

        {
            id: 1504,
            title: "Catching Errors with try and except",
            icon: "🥅",

            explanation:
                "We can stop a program from crashing by putting risky code inside try. If an error happens, Python jumps to the except part instead of stopping. We can name the error we want to catch, like ZeroDivisionError or ValueError.",

            example: `try:
    print(10 / 0)
except ZeroDivisionError:
    print("Oops! You can't divide by zero.")

try:
    number = int("seven")
except ValueError:
    print("That is not a number!")

print("The program keeps going!")`,

            output: `Oops! You can't divide by zero.
That is not a number!
The program keeps going!`,

            points: 18
        },

        {
            id: 1505,
            title: "else and finally",
            icon: "🏁",

            explanation:
                "try can have two extra helpers. The else part runs only if there was no error. The finally part always runs at the end, error or no error, so it is great for saying goodbye or cleaning up.",

            example: `try:
    result = 20 / 4
except ZeroDivisionError:
    print("Can't divide by zero!")
else:
    print("The answer is", result)
finally:
    print("All done!")`,

            output: `The answer is 5.0
All done!`,

            points: 18
        },

        {
            id: 1506,
            title: "Debugging Tips",
            icon: "🕵️",

            explanation:
                "Debugging means finding and fixing bugs. A great trick is to add extra print() lines to see what your variables hold while the program runs. Also check spelling, brackets, colons, and indentation, and fix one error at a time.",

            example: `total = 0
for number in [2, 4, 6]:
    total = total + number
    print("DEBUG: number is", number, "and total is", total)

print("Final total:", total)`,

            output: `DEBUG: number is 2 and total is 2
DEBUG: number is 4 and total is 6
DEBUG: number is 6 and total is 12
Final total: 12`,

            points: 20
        }
    ],

    exercises: [
        {
            id: 15001,
            title: "Fix the Missing Bracket",
            difficulty: "Easy",

            description:
                'This code has a SyntaxError: print("Hello World!" . Fix it so it prints Hello World!',

            hint:
                "Every opening bracket ( needs a closing bracket ).",

            answer:
                `print("Hello World!")`,

            points: 20
        },

        {
            id: 15002,
            title: "Fix the NameError",
            difficulty: "Easy",

            description:
                'This code gives a NameError:\n\nname = "Mia"\nprint(nmae)\n\nFix the typo so it prints Mia.',

            hint:
                "Look carefully at how the variable name is spelled.",

            answer:
                `name = "Mia"
print(name)`,

            points: 20
        },

        {
            id: 15003,
            title: "Fix the TypeError",
            difficulty: "Easy",

            description:
                'This code gives a TypeError:\n\nage = 10\nprint("I am " + age + " years old")\n\nFix it so it prints I am 10 years old',

            hint:
                "Turn the number into text with str(age).",

            answer:
                `age = 10
print("I am " + str(age) + " years old")`,

            points: 25
        },

        {
            id: 15004,
            title: "Safe Division",
            difficulty: "Medium",

            description:
                "Use try and except to divide 10 by 0. If a ZeroDivisionError happens, print \"You can't divide by zero!\"",

            hint:
                "Put print(10 / 0) inside try:, then write except ZeroDivisionError:.",

            answer:
                `try:
    print(10 / 0)
except ZeroDivisionError:
    print("You can't divide by zero!")`,

            points: 30
        },

        {
            id: 15005,
            title: "Safe Number Input",
            difficulty: "Medium",

            description:
                'Ask the user for their age with input(). Use try and except ValueError so that if they type something that is not a number, the program prints "Please type a number!" instead of crashing. If it is a number, print their age next year.',

            hint:
                "Put int(input(...)) inside try:, then use except ValueError:.",

            answer:
                `try:
    age = int(input("How old are you? "))
    print("Next year you will be", age + 1)
except ValueError:
    print("Please type a number!")`,

            usesInput: true,
            flexible: true,

            points: 30
        },

        {
            id: 15006,
            title: "try, except, and finally",
            difficulty: "Medium",

            description:
                'Try to turn the text "abc" into a number with int(). Catch the ValueError and print "That is not a number!". Add a finally part that prints "All done!".',

            hint:
                "Use try:, except ValueError:, and finally: in that order.",

            answer:
                `try:
    number = int("abc")
except ValueError:
    print("That is not a number!")
finally:
    print("All done!")`,

            points: 35
        }
    ],

    quiz: [
        {
            id: 1,

            question:
                "Which line of an error message should you read first?",

            options: [
                "The first line",
                "The middle line",
                "The last line",
                "None of them"
            ],

            answer: 2,

            explanation:
                "The last line tells you the type of error and what went wrong."
        },

        {
            id: 2,

            question:
                "What error will this code give?\n\nprint(10 / 0)",

            options: [
                "ZeroDivisionError",
                "NameError",
                "SyntaxError",
                "No error"
            ],

            answer: 0,

            explanation:
                "Dividing by zero is not allowed, so Python gives a ZeroDivisionError."
        },

        {
            id: 3,

            question:
                "What error will this code give?\n\nprint(pizza)\n\n(pizza was never created)",

            options: [
                "TypeError",
                "ValueError",
                "ZeroDivisionError",
                "NameError"
            ],

            answer: 3,

            explanation:
                "Python does not know the name pizza, so it gives a NameError."
        },

        {
            id: 4,

            question:
                'What error does int("hello") give?',

            options: [
                "SyntaxError",
                "ValueError",
                "NameError",
                "No error"
            ],

            answer: 1,

            explanation:
                'The word "hello" can\'t be turned into a number, so Python gives a ValueError.'
        },

        {
            id: 5,

            question:
                'What error will this code give?\n\nprint("Score: " + 5)',

            options: [
                "TypeError",
                "ValueError",
                "SyntaxError",
                "NameError"
            ],

            answer: 0,

            explanation:
                "You can't add text and a number together, so Python gives a TypeError."
        },

        {
            id: 6,

            question:
                "In try and except, when does the except part run?",

            options: [
                "Always",
                "Never",
                "Only when there is no error",
                "Only when an error happens in try"
            ],

            answer: 3,

            explanation:
                "except only runs if the code inside try causes an error."
        },

        {
            id: 7,

            question:
                "Which part always runs, whether there is an error or not?",

            options: [
                "except",
                "else",
                "finally",
                "if"
            ],

            answer: 2,

            explanation:
                "The finally part always runs at the end."
        },

        {
            id: 8,

            question:
                "What is a good trick for finding a bug?",

            options: [
                "Delete all the code",
                "Add print() lines to see what variables hold",
                "Type faster",
                "Turn off the computer"
            ],

            answer: 1,

            explanation:
                "Printing variables helps you see what your program is really doing, step by step."
        }
    ]
};

export default topic;
