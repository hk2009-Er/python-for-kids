const topic = {
    id: 9,
    slug: "strings",
    title: "Strings",
    icon: "🔤",
    level: "Beginner",

    description:
        "Learn how to join text together, build messages with f-strings, measure and change text, and pick out letters and pieces of a string.",

    lessons: [
        {
            id: 901,
            title: "Joining Strings Together",
            icon: "🔗",

            explanation:
                "A string is a piece of text inside quotation marks. We can join two strings together using the + sign. Joining strings is called concatenation, which is a fancy word for sticking them end to end. Remember to add a space yourself if you want one between the words!",

            example: `first = "Super"
second = "Hero"
print(first + second)
print(first + " " + second)`,

            output: `SuperHero
Super Hero`,

            points: 10
        },

        {
            id: 902,
            title: "Building Messages with f-strings",
            icon: "✨",

            explanation:
                "An f-string is a string with the letter f in front of it. Inside an f-string, you can put a variable inside curly brackets { } and Python will swap in its value. This makes it easy to build messages that mix text and numbers. You can even do small calculations inside the curly brackets.",

            example: `name = "Mia"
age = 10
print(f"My name is {name} and I am {age} years old.")
print(f"Next year I will be {age + 1}.")`,

            output: `My name is Mia and I am 10 years old.
Next year I will be 11.`,

            points: 10
        },

        {
            id: 903,
            title: "Counting Letters with len()",
            icon: "📏",

            explanation:
                "The len() function tells us how long a string is. It counts every character, which means letters, numbers, symbols, and even spaces. This is useful when you want to check if a password or name is long enough.",

            example: `word = "Python"
print(len(word))

sentence = "I love cats"
print(len(sentence))`,

            output: `6
11`,

            points: 10
        },

        {
            id: 904,
            title: "Changing Case with upper() and lower()",
            icon: "🔠",

            explanation:
                "Strings have special tools called methods that you use with a dot. The upper() method makes every letter a capital letter, and lower() makes every letter small. The original string does not change unless you save the new one in a variable.",

            example: `animal = "Tiger"
print(animal.upper())
print(animal.lower())
print(animal)`,

            output: `TIGER
tiger
Tiger`,

            points: 10
        },

        {
            id: 905,
            title: "Indexing and Slicing",
            icon: "✂️",

            explanation:
                "Every character in a string has a position number called an index. Python starts counting at 0, so the first letter is at index 0. You can use -1 to get the last letter. Slicing with [start:end] gives you a piece of the string, from start up to (but not including) end.",

            example: `word = "RAINBOW"
print(word[0])
print(word[3])
print(word[-1])
print(word[0:4])
print(word[4:])`,

            output: `R
N
W
RAIN
BOW`,

            points: 15
        },

        {
            id: 906,
            title: "Replacing and Searching Text",
            icon: "🔍",

            explanation:
                "The replace() method swaps one piece of text for another. The word in lets you check whether some text is inside a string, and it gives back True or False. These tools help you search and fix text in your programs.",

            example: `message = "I like apples"
print(message.replace("apples", "bananas"))

print("like" in message)
print("pizza" in message)`,

            output: `I like bananas
True
False`,

            points: 15
        }
    ],

    exercises: [
        {
            id: 9001,
            title: "Join Two Words",
            difficulty: "Easy",

            description:
                'Create two variables: one with "Ice" and one with "Cream". Join them with a space in between and print "Ice Cream".',

            hint:
                'Use + to join the strings, and add " " in the middle for the space.',

            answer:
                `a = "Ice"
b = "Cream"
print(a + " " + b)`,

            points: 20
        },

        {
            id: 9002,
            title: "f-string Greeting",
            difficulty: "Easy",

            description:
                'Make a variable called name with your name in it. Use an f-string to print "Hello, <name>!". For example, "Hello, Alex!".',

            hint:
                'Put an f before the quotes and write {name} where the name should go.',

            answer:
                `name = "Alex"
print(f"Hello, {name}!")`,

            flexible: true,

            points: 20
        },

        {
            id: 9003,
            title: "How Long Is It?",
            difficulty: "Easy",

            description:
                'Print the number of characters in the string "butterfly".',

            hint:
                "Use the len() function.",

            answer:
                `print(len("butterfly"))`,

            points: 20
        },

        {
            id: 9004,
            title: "Shout It Out",
            difficulty: "Easy",

            description:
                'Store the text "we won the game" in a variable, then print it in all capital letters.',

            hint:
                "Use the upper() method with a dot after the variable name.",

            answer:
                `text = "we won the game"
print(text.upper())`,

            points: 25
        },

        {
            id: 9005,
            title: "First and Last Letter",
            difficulty: "Medium",

            description:
                'Store the word "elephant" in a variable. Print its first letter, then its last letter, then the first three letters.',

            hint:
                "The first letter is at index 0, the last is at index -1, and [0:3] gives the first three.",

            answer:
                `word = "elephant"
print(word[0])
print(word[-1])
print(word[0:3])`,

            points: 30
        },

        {
            id: 9006,
            title: "Fix the Sentence",
            difficulty: "Medium",

            description:
                'Store "My dog is sleepy" in a variable. Print the sentence with "dog" replaced by "cat", then print whether the word "sleepy" is in the sentence.',

            hint:
                'Use replace("dog", "cat") and then use the in keyword.',

            answer:
                `sentence = "My dog is sleepy"
print(sentence.replace("dog", "cat"))
print("sleepy" in sentence)`,

            points: 30
        }
    ],

    quiz: [
        {
            id: 1,

            question:
                'What will this code print?\n\nprint("Sun" + "shine")',

            options: [
                "Sun shine",
                "Sunshine",
                "Sun + shine",
                "Error"
            ],

            answer: 1,

            explanation:
                "The + sign joins the two strings with no space, so it prints Sunshine."
        },

        {
            id: 2,

            question:
                'What will this code print?\n\nprint(len("cat"))',

            options: [
                "2",
                "cat",
                "4",
                "3"
            ],

            answer: 3,

            explanation:
                'The word "cat" has 3 characters, so len() gives 3.'
        },

        {
            id: 3,

            question:
                'What is the index of the first letter in a string?',

            options: [
                "0",
                "1",
                "-1",
                "It depends on the word"
            ],

            answer: 0,

            explanation:
                "Python starts counting positions at 0, so the first letter is at index 0."
        },

        {
            id: 4,

            question:
                'What will this code print?\n\nword = "hello"\nprint(word.upper())',

            options: [
                "hello",
                "Hello",
                "HELLO",
                "hELLO"
            ],

            answer: 2,

            explanation:
                "upper() turns every letter into a capital letter."
        },

        {
            id: 5,

            question:
                'What will this code print?\n\nname = "Leo"\nprint(f"Hi {name}")',

            options: [
                "Hi {name}",
                "Hi Leo",
                "Hi name",
                "f Hi Leo"
            ],

            answer: 1,

            explanation:
                "In an f-string, {name} is replaced with the value of the variable, which is Leo."
        },

        {
            id: 6,

            question:
                'What will this code print?\n\nword = "PIZZA"\nprint(word[-1])',

            options: [
                "P",
                "Z",
                "-1",
                "A"
            ],

            answer: 3,

            explanation:
                "Index -1 always means the last character, which is A."
        },

        {
            id: 7,

            question:
                'What will this code print?\n\nprint("cat" in "concatenate")',

            options: [
                "False",
                "cat",
                "True",
                "Error"
            ],

            answer: 2,

            explanation:
                'The letters "cat" appear inside "concatenate", so in gives True.'
        },

        {
            id: 8,

            question:
                'What will this code print?\n\nword = "PLAYGROUND"\nprint(word[0:4])',

            options: [
                "PLAY",
                "PLAYG",
                "LAYG",
                "GROUND"
            ],

            answer: 0,

            explanation:
                "The slice [0:4] takes characters at index 0, 1, 2, and 3, which spell PLAY."
        }
    ]
};

export default topic;
