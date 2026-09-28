const topic = {
    id: 12,
    slug: "tuples-sets",
    title: "Tuples & Sets",
    icon: "🎁",
    level: "Intermediate",

    description:
        "Meet two new ways to group things together: tuples, which never change, and sets, which never have repeats.",

    lessons: [
        {
            id: 1201,
            title: "What is a Tuple?",
            icon: "📦",

            explanation:
                "A tuple is like a list, but it uses round brackets ( ) instead of square brackets. Just like a list, you can get items using their index, starting at 0. Tuples are great for things that belong together, like the x and y position of a point on a map.",

            example: `point = (3, 7)
print(point)
print(point[0])
print(point[1])
print(len(point))`,

            output: `(3, 7)
3
7
2`,

            points: 10
        },

        {
            id: 1202,
            title: "Tuples Cannot Change",
            icon: "🔒",

            explanation:
                "Once a tuple is made, you cannot change, add, or remove its items. We say tuples are immutable, which just means they cannot be changed. This keeps important data safe, like the days of the week, which should never change by accident.",

            example: `days = ("Mon", "Tue", "Wed")
print(days[2])

try:
    days[0] = "Sun"
except TypeError:
    print("Oops! Tuples cannot be changed.")`,

            output: `Wed
Oops! Tuples cannot be changed.`,

            points: 10
        },

        {
            id: 1203,
            title: "Unpacking Tuples",
            icon: "🎒",

            explanation:
                "Unpacking means taking the items out of a tuple and putting each one into its own variable in one line. The number of variables must match the number of items. You can also loop over a tuple with a for loop, just like a list.",

            example: `hero = ("Luna", 11, "Wizard")
name, age, job = hero
print(name)
print(age)
print(job)

for colour in ("red", "green"):
    print(colour)`,

            output: `Luna
11
Wizard
red
green`,

            points: 15
        },

        {
            id: 1204,
            title: "What is a Set?",
            icon: "🧺",

            explanation:
                "A set is a group of items inside curly brackets { }. A set never keeps duplicates, so if the same item appears twice, it is only stored once. Sets do not keep items in order, so we use sorted() to print them neatly in order.",

            example: `numbers = {3, 1, 3, 2, 1}
print(sorted(numbers))
print(len(numbers))

pets = {"cat", "dog", "cat"}
print(len(pets))`,

            output: `[1, 2, 3]
3
2`,

            points: 10
        },

        {
            id: 1205,
            title: "Adding, Removing and Checking",
            icon: "➕",

            explanation:
                "You can put new items into a set with add() and take them out with remove(). If you add something that is already there, nothing changes. The in keyword tells you if an item is in the set, giving True or False.",

            example: `fruits = {"apple", "banana"}
fruits.add("mango")
fruits.add("apple")
fruits.remove("banana")

print(sorted(fruits))
print("mango" in fruits)
print("banana" in fruits)`,

            output: `['apple', 'mango']
True
False`,

            points: 15
        },

        {
            id: 1206,
            title: "Removing Duplicates and Combining Sets",
            icon: "🤝",

            explanation:
                "Turning a list into a set with set() is a quick way to remove repeats. You can also combine sets: | gives every item from both sets, and & gives only the items that are in both. This is useful for finding things friends have in common!",

            example: `votes = ["pizza", "tacos", "pizza", "pasta", "tacos"]
print(sorted(set(votes)))

amy = {"football", "chess", "art"}
ben = {"chess", "art", "music"}
print(sorted(amy | ben))
print(sorted(amy & ben))`,

            output: `['pasta', 'pizza', 'tacos']
['art', 'chess', 'football', 'music']
['art', 'chess']`,

            points: 15
        }
    ],

    exercises: [
        {
            id: 12001,
            title: "Make a Colour Tuple",
            difficulty: "Easy",

            description:
                'Create a tuple called colours with "red", "yellow", and "blue". Print the whole tuple, then print the second colour.',

            hint:
                "Use round brackets. The second item is at index 1.",

            answer:
                `colours = ("red", "yellow", "blue")
print(colours)
print(colours[1])`,

            points: 20
        },

        {
            id: 12002,
            title: "Unpack a Pet",
            difficulty: "Easy",

            description:
                'Create a tuple pet = ("Rex", "dog", 4). Unpack it into three variables name, kind, and age, then print "Rex is a dog and is 4 years old".',

            hint:
                "Write name, kind, age = pet and then use an f-string.",

            answer:
                `pet = ("Rex", "dog", 4)
name, kind, age = pet
print(f"{name} is a {kind} and is {age} years old")`,

            points: 20
        },

        {
            id: 12003,
            title: "No Repeats Allowed",
            difficulty: "Easy",

            description:
                "Create a set from the numbers 5, 2, 5, 8, 2, 8, 8. Print how many items are in the set.",

            hint:
                "Put the numbers inside curly brackets and use len().",

            answer:
                `numbers = {5, 2, 5, 8, 2, 8, 8}
print(len(numbers))`,

            points: 20
        },

        {
            id: 12004,
            title: "Sticker Collection",
            difficulty: "Medium",

            description:
                'Start with a set of stickers {"star", "moon"}. Add "sun", add "star" again, then print the sorted set and whether "moon" is in it.',

            hint:
                'Use add() twice, then print(sorted(stickers)) and print("moon" in stickers).',

            answer:
                `stickers = {"star", "moon"}
stickers.add("sun")
stickers.add("star")
print(sorted(stickers))
print("moon" in stickers)`,

            points: 25
        },

        {
            id: 12005,
            title: "Clean Up the List",
            difficulty: "Medium",

            description:
                'You have a list of names: ["Ava", "Ben", "Ava", "Cal", "Ben"]. Remove the duplicates using a set and print the unique names in sorted order.',

            hint:
                "Use set() on the list, then sorted() to put them in order.",

            answer:
                `names = ["Ava", "Ben", "Ava", "Cal", "Ben"]
print(sorted(set(names)))`,

            points: 25
        },

        {
            id: 12006,
            title: "Games in Common",
            difficulty: "Medium",

            description:
                'Sam likes {"tag", "chess", "football"} and Priya likes {"chess", "football", "tennis"}. Print the games they both like, in sorted order.',

            hint:
                "The & symbol finds the items that are in both sets.",

            answer:
                `sam = {"tag", "chess", "football"}
priya = {"chess", "football", "tennis"}
print(sorted(sam & priya))`,

            points: 30
        }
    ],

    quiz: [
        {
            id: 1,

            question:
                "Which brackets are used to make a tuple?",

            options: [
                "[ ]",
                "( )",
                "{ }",
                "< >"
            ],

            answer: 1,

            explanation:
                "Tuples use round brackets, like (1, 2, 3)."
        },

        {
            id: 2,

            question:
                "What is special about a tuple?",

            options: [
                "It can only hold numbers",
                "It is always sorted",
                "Its items cannot be changed",
                "It removes duplicates"
            ],

            answer: 2,

            explanation:
                "Tuples are immutable, which means their items cannot be changed after they are made."
        },

        {
            id: 3,

            question:
                "What will this code print?\n\nt = (10, 20, 30)\nprint(t[2])",

            options: [
                "30",
                "20",
                "10",
                "Error"
            ],

            answer: 0,

            explanation:
                "Index 2 is the third item because counting starts at 0, so it prints 30."
        },

        {
            id: 4,

            question:
                "What is special about a set?",

            options: [
                "It keeps items in order",
                "It cannot be changed",
                "It uses round brackets",
                "It never has duplicate items"
            ],

            answer: 3,

            explanation:
                "A set only keeps one copy of each item, so there are no duplicates."
        },

        {
            id: 5,

            question:
                "What will this code print?\n\ns = {1, 1, 2, 2, 2}\nprint(len(s))",

            options: [
                "5",
                "3",
                "2",
                "1"
            ],

            answer: 2,

            explanation:
                "The set only keeps 1 and 2, so its length is 2."
        },

        {
            id: 6,

            question:
                "Which method puts a new item into a set?",

            options: [
                "add()",
                "append()",
                "insert()",
                "push()"
            ],

            answer: 0,

            explanation:
                "Sets use add() to put in a new item. Lists use append()."
        },

        {
            id: 7,

            question:
                "What will this code print?\n\nname, age = (\"Ivy\", 9)\nprint(age)",

            options: [
                "Ivy",
                "(\"Ivy\", 9)",
                "name",
                "9"
            ],

            answer: 3,

            explanation:
                "Unpacking puts \"Ivy\" into name and 9 into age, so it prints 9."
        },

        {
            id: 8,

            question:
                "What will this code print?\n\na = {1, 2, 3}\nb = {2, 3, 4}\nprint(sorted(a & b))",

            options: [
                "[1, 2, 3, 4]",
                "[2, 3]",
                "[1, 4]",
                "[1, 2, 3]"
            ],

            answer: 1,

            explanation:
                "& keeps only the items found in both sets, which are 2 and 3."
        }
    ]
};

export default topic;
