const topic = {
    id: 13,
    slug: "dictionaries",
    title: "Dictionaries",
    icon: "📖",
    level: "Intermediate",

    description:
        "Learn how to store information in pairs of keys and values, look things up, change them, loop through them, and build simple nested dictionaries.",

    lessons: [
        {
            id: 1301,
            title: "What is a Dictionary?",
            icon: "📖",

            explanation:
                "A dictionary stores information in pairs. Each pair has a key (like a label) and a value (the information). We write a dictionary with curly brackets { }, and put a colon between each key and its value. It works like a real dictionary, where you look up a word to find its meaning.",

            example: `pet = {"name": "Buddy", "animal": "dog", "age": 3}
print(pet)
print(len(pet))`,

            output: `{'name': 'Buddy', 'animal': 'dog', 'age': 3}
3`,

            points: 10
        },

        {
            id: 1302,
            title: "Looking Up Values",
            icon: "🔎",

            explanation:
                "To get a value, put its key inside square brackets after the dictionary name. Python finds the key and gives you the value that goes with it. Keys must match exactly, including capital letters.",

            example: `scores = {"Ana": 90, "Ben": 75, "Cleo": 88}
print(scores["Ana"])
print(scores["Cleo"])`,

            output: `90
88`,

            points: 10
        },

        {
            id: 1303,
            title: "Adding and Changing Values",
            icon: "✏️",

            explanation:
                "Dictionaries can change! To add a new pair, write a new key in square brackets and give it a value. If the key already exists, the old value is replaced with the new one.",

            example: `player = {"name": "Kai", "level": 1}
player["level"] = 2
player["coins"] = 50
print(player)`,

            output: `{'name': 'Kai', 'level': 2, 'coins': 50}`,

            points: 10
        },

        {
            id: 1304,
            title: "Safe Lookups with get() and in",
            icon: "🛡️",

            explanation:
                "If you look up a key that is not in the dictionary with square brackets, Python gives an error. The get() method is safer: it gives back None, or a backup value you choose, when the key is missing. The in keyword checks if a key exists and gives True or False.",

            example: `stock = {"apples": 5, "pears": 2}
print(stock.get("apples"))
print(stock.get("grapes"))
print(stock.get("grapes", 0))
print("pears" in stock)
print("grapes" in stock)`,

            output: `5
None
0
True
False`,

            points: 15
        },

        {
            id: 1305,
            title: "Looping with items()",
            icon: "🔁",

            explanation:
                "The items() method lets a for loop go through every key and value together. We use two variables in the loop, one for the key and one for the value. This is great for printing everything in a dictionary neatly.",

            example: `ages = {"Mia": 10, "Leo": 12, "Zoe": 9}
for name, age in ages.items():
    print(f"{name} is {age}")`,

            output: `Mia is 10
Leo is 12
Zoe is 9`,

            points: 15
        },

        {
            id: 1306,
            title: "Dictionaries Inside Dictionaries",
            icon: "🗂️",

            explanation:
                "A dictionary value can be another dictionary! This is called a nested dictionary. It helps you store lots of details about many things. Use two sets of square brackets to reach the inner value.",

            example: `pets = {
    "Buddy": {"animal": "dog", "age": 3},
    "Whiskers": {"animal": "cat", "age": 5}
}
print(pets["Buddy"]["animal"])
print(pets["Whiskers"]["age"])`,

            output: `dog
5`,

            points: 15
        }
    ],

    exercises: [
        {
            id: 13001,
            title: "My Favourite Things",
            difficulty: "Easy",

            description:
                'Make a dictionary called favourites with the keys "food", "colour", and "animal" and your own values. Print the whole dictionary.',

            hint:
                'Use curly brackets and write each pair like "food": "pizza".',

            answer:
                `favourites = {"food": "pizza", "colour": "blue", "animal": "panda"}
print(favourites)`,

            flexible: true,

            points: 20
        },

        {
            id: 13002,
            title: "Look It Up",
            difficulty: "Easy",

            description:
                'Create capitals = {"France": "Paris", "Japan": "Tokyo", "Egypt": "Cairo"}. Print the capital of Japan.',

            hint:
                'Use capitals["Japan"].',

            answer:
                `capitals = {"France": "Paris", "Japan": "Tokyo", "Egypt": "Cairo"}
print(capitals["Japan"])`,

            points: 20
        },

        {
            id: 13003,
            title: "Level Up",
            difficulty: "Easy",

            description:
                'Create hero = {"name": "Nova", "health": 100}. Change health to 80, add a new key "power" with the value "flying", then print hero.',

            hint:
                'Use hero["health"] = 80 and hero["power"] = "flying".',

            answer:
                `hero = {"name": "Nova", "health": 100}
hero["health"] = 80
hero["power"] = "flying"
print(hero)`,

            points: 25
        },

        {
            id: 13004,
            title: "Safe Snack Check",
            difficulty: "Medium",

            description:
                'Create snacks = {"chips": 3, "cookies": 5}. Use get() to print how many cookies there are, then use get() with a backup value of 0 to print how many cakes there are.',

            hint:
                'snacks.get("cakes", 0) gives 0 when "cakes" is missing.',

            answer:
                `snacks = {"chips": 3, "cookies": 5}
print(snacks.get("cookies"))
print(snacks.get("cakes", 0))`,

            points: 25
        },

        {
            id: 13005,
            title: "Print the Price List",
            difficulty: "Medium",

            description:
                'Create prices = {"apple": 2, "banana": 1, "cherry": 5}. Loop through it with items() and print each line like "apple costs 2".',

            hint:
                "Use for fruit, price in prices.items(): and an f-string.",

            answer:
                `prices = {"apple": 2, "banana": 1, "cherry": 5}
for fruit, price in prices.items():
    print(f"{fruit} costs {price}")`,

            points: 30
        },

        {
            id: 13006,
            title: "Class Score Total",
            difficulty: "Medium",

            description:
                'Create scores = {"Ana": 8, "Ben": 6, "Cleo": 9}. Use a loop to add up all the scores and print the total.',

            hint:
                "Start total at 0, loop with items(), and add each score to total.",

            answer:
                `scores = {"Ana": 8, "Ben": 6, "Cleo": 9}
total = 0
for name, score in scores.items():
    total = total + score
print(total)`,

            points: 30
        }
    ],

    quiz: [
        {
            id: 1,

            question:
                "Which brackets are used to make a dictionary?",

            options: [
                "( )",
                "[ ]",
                "< >",
                "{ }"
            ],

            answer: 3,

            explanation:
                "Dictionaries use curly brackets, like {\"name\": \"Sam\"}."
        },

        {
            id: 2,

            question:
                "In a dictionary, what is each piece of information paired with?",

            options: [
                "A key",
                "An index number",
                "A function",
                "A loop"
            ],

            answer: 0,

            explanation:
                "Every value in a dictionary is stored with a key, which is used to look it up."
        },

        {
            id: 3,

            question:
                "What will this code print?\n\ncolours = {\"sky\": \"blue\", \"grass\": \"green\"}\nprint(colours[\"grass\"])",

            options: [
                "grass",
                "blue",
                "green",
                "sky"
            ],

            answer: 2,

            explanation:
                "The key \"grass\" is paired with the value \"green\"."
        },

        {
            id: 4,

            question:
                "What will this code print?\n\nd = {\"a\": 1}\nd[\"a\"] = 5\nprint(d[\"a\"])",

            options: [
                "1",
                "5",
                "6",
                "Error"
            ],

            answer: 1,

            explanation:
                "Giving an existing key a new value replaces the old one, so it prints 5."
        },

        {
            id: 5,

            question:
                "What will this code print?\n\nd = {\"cats\": 2}\nprint(d.get(\"dogs\", 0))",

            options: [
                "Error",
                "2",
                "None",
                "0"
            ],

            answer: 3,

            explanation:
                "\"dogs\" is not a key, so get() gives back the backup value 0."
        },

        {
            id: 6,

            question:
                "Which method lets you loop through keys and values together?",

            options: [
                "items()",
                "pairs()",
                "values()",
                "loop()"
            ],

            answer: 0,

            explanation:
                "items() gives each key and value together so a for loop can use both."
        },

        {
            id: 7,

            question:
                "What will this code print?\n\nd = {\"x\": 1, \"y\": 2}\nprint(\"z\" in d)",

            options: [
                "True",
                "False",
                "z",
                "Error"
            ],

            answer: 1,

            explanation:
                "\"z\" is not a key in the dictionary, so in gives False."
        },

        {
            id: 8,

            question:
                "What will this code print?\n\nschool = {\"class1\": {\"teacher\": \"Ms Lee\"}}\nprint(school[\"class1\"][\"teacher\"])",

            options: [
                "class1",
                "teacher",
                "Ms Lee",
                "Error"
            ],

            answer: 2,

            explanation:
                "The first brackets reach the inner dictionary, and the second brackets get the teacher, Ms Lee."
        }
    ]
};

export default topic;
