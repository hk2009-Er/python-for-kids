const topic = {
    id: 10,
    slug: "user-input",
    title: "User Input",
    icon: "⌨️",
    level: "Beginner",

    description:
        "Learn how to ask the user questions with input(), save their answers, turn answers into numbers, and build fun interactive programs.",

    lessons: [
        {
            id: 1001,
            title: "Asking a Question with input()",
            icon: "❓",

            explanation:
                "The input() function lets your program ask the user a question and wait for them to type an answer. The text inside the brackets is the question shown on the screen. The program pauses until the user types something and presses Enter. If you type Sam:",

            example: `name = input("What is your name? ")
print("Hello, " + name + "!")`,

            output: `What is your name? Sam
Hello, Sam!`,

            points: 10
        },

        {
            id: 1002,
            title: "Storing and Using Answers",
            icon: "📦",

            explanation:
                "Whatever the user types is saved in a variable, so you can use it again and again. You can ask more than one question and store each answer in its own variable. Then you can mix the answers into a message with an f-string. If you type blue and then pizza:",

            example: `colour = input("Favourite colour? ")
food = input("Favourite food? ")
print(f"You like {colour} things and eating {food}!")`,

            output: `Favourite colour? blue
Favourite food? pizza
You like blue things and eating pizza!`,

            points: 10
        },

        {
            id: 1003,
            title: "Input Is Always Text",
            icon: "🔤",

            explanation:
                "input() always gives back a string, even if the user types a number. That means \"5\" + \"5\" joins the text together and makes \"55\" instead of adding. To do math, we need to change the text into a number first. If you type 5:",

            example: `number = input("Type a number: ")
print(number + number)`,

            output: `Type a number: 5
55`,

            points: 10
        },

        {
            id: 1004,
            title: "Turning Input into Numbers",
            icon: "🔢",

            explanation:
                "The int() function turns text into a whole number, like 7 or 12. The float() function turns text into a decimal number, like 2.5. Once the answer is a number, you can add, subtract, and multiply it. If you type 7 and then 2.5:",

            example: `apples = int(input("How many apples? "))
print(apples + 3)

price = float(input("Price of one apple? "))
print(apples * price)`,

            output: `How many apples? 7
10
Price of one apple? 2.5
17.5`,

            points: 15
        },

        {
            id: 1005,
            title: "Building a Greeter",
            icon: "👋",

            explanation:
                "Now we can combine input() with if statements to make a program that reacts to the user. The program checks what the user typed and gives a different reply. This is how games and apps respond to you! If you type Zoe and then yes:",

            example: `name = input("Name: ")
happy = input("Are you happy today? (yes/no) ")

if happy == "yes":
    print(f"Awesome, {name}! Keep smiling!")
else:
    print(f"Cheer up, {name}! Tomorrow is a new day.")`,

            output: `Name: Zoe
Are you happy today? (yes/no) yes
Awesome, Zoe! Keep smiling!`,

            points: 15
        },

        {
            id: 1006,
            title: "Making an Age Calculator",
            icon: "🎂",

            explanation:
                "Let's build a small calculator that works out ages. We ask for the user's age, turn it into a number with int(), and then do some math. The program can tell you how old you will be in the future. If you type 9:",

            example: `age = int(input("How old are you? "))
print(f"In 5 years you will be {age + 5}.")
print(f"You have lived about {age * 365} days!")`,

            output: `How old are you? 9
In 5 years you will be 14.
You have lived about 3285 days!`,

            points: 15
        }
    ],

    exercises: [
        {
            id: 10001,
            title: "Say My Name",
            difficulty: "Easy",

            description:
                'Ask the user for their name using input(), then print "Nice to meet you, <name>!".',

            hint:
                "Save the answer from input() in a variable, then use it inside print().",

            answer:
                `name = input("What is your name? ")
print(f"Nice to meet you, {name}!")`,

            usesInput: true,
            flexible: true,

            points: 20
        },

        {
            id: 10002,
            title: "Favourite Animal",
            difficulty: "Easy",

            description:
                'Ask the user for their favourite animal and print "<animal> is a great choice!".',

            hint:
                "Use input() to ask, and an f-string to build the message.",

            answer:
                `animal = input("What is your favourite animal? ")
print(f"{animal} is a great choice!")`,

            usesInput: true,
            flexible: true,

            points: 20
        },

        {
            id: 10003,
            title: "Double It",
            difficulty: "Easy",

            description:
                "Ask the user for a whole number, turn it into a number with int(), and print the number multiplied by 2.",

            hint:
                "Wrap input() inside int() like this: int(input(...)).",

            answer:
                `number = int(input("Type a number: "))
print(number * 2)`,

            usesInput: true,
            flexible: true,

            points: 25
        },

        {
            id: 10004,
            title: "Add Two Numbers",
            difficulty: "Medium",

            description:
                "Ask the user for two whole numbers, one at a time. Add them together and print the total.",

            hint:
                "Use int(input(...)) twice and store each number in its own variable.",

            answer:
                `a = int(input("First number: "))
b = int(input("Second number: "))
print(f"The total is {a + b}")`,

            usesInput: true,
            flexible: true,

            points: 25
        },

        {
            id: 10005,
            title: "Pocket Money Saver",
            difficulty: "Medium",

            description:
                "Ask the user how much money they save each week (it can be a decimal like 2.5). Print how much they will have after 4 weeks.",

            hint:
                "Use float() so decimal numbers work, then multiply by 4.",

            answer:
                `weekly = float(input("How much do you save each week? "))
print(f"After 4 weeks you will have {weekly * 4}")`,

            usesInput: true,
            flexible: true,

            points: 30
        },

        {
            id: 10006,
            title: "Birth Year Guesser",
            difficulty: "Medium",

            description:
                "Ask the user for their age and for the current year. Print the year they were probably born in.",

            hint:
                "Turn both answers into numbers with int(), then subtract the age from the year.",

            answer:
                `age = int(input("How old are you? "))
year = int(input("What year is it? "))
print(f"You were probably born in {year - age}")`,

            usesInput: true,
            flexible: true,

            points: 30
        }
    ],

    quiz: [
        {
            id: 1,

            question:
                "Which function asks the user to type something?",

            options: [
                "print()",
                "ask()",
                "input()",
                "type()"
            ],

            answer: 2,

            explanation:
                "input() shows a question and waits for the user to type an answer."
        },

        {
            id: 2,

            question:
                "What kind of value does input() always give back?",

            options: [
                "A string (text)",
                "A whole number",
                "A decimal number",
                "True or False"
            ],

            answer: 0,

            explanation:
                "input() always gives back a string, even when the user types digits."
        },

        {
            id: 3,

            question:
                'If the user types 4, what will this code print?\n\nx = input("Number: ")\nprint(x + x)',

            options: [
                "8",
                "Error",
                "x + x",
                "44"
            ],

            answer: 3,

            explanation:
                'x is the string "4", and joining "4" + "4" makes "44".'
        },

        {
            id: 4,

            question:
                "Which function turns text like \"12\" into a whole number?",

            options: [
                "str()",
                "int()",
                "float()",
                "len()"
            ],

            answer: 1,

            explanation:
                "int() changes text into a whole number so you can do math with it."
        },

        {
            id: 5,

            question:
                'If the user types 4, what will this code print?\n\nx = int(input("Number: "))\nprint(x + x)',

            options: [
                "44",
                "8",
                "4",
                "Error"
            ],

            answer: 1,

            explanation:
                "int() turns the answer into the number 4, so 4 + 4 is 8."
        },

        {
            id: 6,

            question:
                "Which function should you use if the user might type a decimal number like 3.5?",

            options: [
                "int()",
                "str()",
                "print()",
                "float()"
            ],

            answer: 3,

            explanation:
                "float() turns text into a decimal number such as 3.5."
        },

        {
            id: 7,

            question:
                'What does the text inside input("How old are you? ") do?',

            options: [
                "It is shown to the user as a question",
                "It is the user's answer",
                "It is saved as a number",
                "Nothing, Python ignores it"
            ],

            answer: 0,

            explanation:
                "The text inside input() is the prompt, the message shown to the user before they type."
        },

        {
            id: 8,

            question:
                'If the user types Kai, what will this code print?\n\nname = input("Name: ")\nprint(f"Hi {name}!")',

            options: [
                "Hi name!",
                "Hi {name}!",
                "Hi Kai!",
                "Kai"
            ],

            answer: 2,

            explanation:
                "The answer Kai is stored in name, and the f-string puts it in place of {name}."
        }
    ]
};

export default topic;
