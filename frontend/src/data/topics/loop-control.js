const topic = {
    id: 11,
    slug: "loop-control",
    title: "Break, Continue & Nested Loops",
    icon: "🛑",
    level: "Intermediate",

    description:
        "Take control of your loops! Learn how to stop a loop early, skip steps, put loops inside loops to draw patterns, loop over strings, and keep running totals.",

    lessons: [
        {
            id: 1101,
            title: "Stopping a Loop with break",
            icon: "🛑",

            explanation:
                "Sometimes you want a loop to stop before it has finished. The break keyword jumps out of the loop straight away. This is handy when you have found what you were looking for and do not need to keep going.",

            example: `for number in range(1, 10):
    if number == 5:
        print("Found 5! Stopping.")
        break
    print(number)`,

            output: `1
2
3
4
Found 5! Stopping.`,

            points: 10
        },

        {
            id: 1102,
            title: "Skipping Steps with continue",
            icon: "⏭️",

            explanation:
                "The continue keyword skips the rest of the current turn of the loop and jumps to the next one. The loop keeps going, it just ignores that one step. Here we skip the number 3.",

            example: `for number in range(1, 6):
    if number == 3:
        continue
    print(number)`,

            output: `1
2
4
5`,

            points: 10
        },

        {
            id: 1103,
            title: "Loops Inside Loops",
            icon: "🔁",

            explanation:
                "A nested loop is a loop inside another loop. For every single turn of the outer loop, the inner loop runs all the way through. This is useful for things like grids, tables, and games with rows and columns.",

            example: `for row in range(1, 3):
    for col in range(1, 4):
        print(f"Row {row}, Seat {col}")`,

            output: `Row 1, Seat 1
Row 1, Seat 2
Row 1, Seat 3
Row 2, Seat 1
Row 2, Seat 2
Row 2, Seat 3`,

            points: 15
        },

        {
            id: 1104,
            title: "Drawing a Star Triangle",
            icon: "⭐",

            explanation:
                "Nested loops can draw cool patterns! The outer loop picks which row we are on, and the inner loop prints that many stars. Using end=\"\" keeps the stars on the same line, and an empty print() moves to the next line.",

            example: `for row in range(1, 5):
    for star in range(row):
        print("*", end="")
    print()`,

            output: `*
**
***
****`,

            points: 15
        },

        {
            id: 1105,
            title: "Looping Over a String",
            icon: "🔤",

            explanation:
                "A for loop can go through a string one letter at a time. Each time around the loop, the variable holds the next letter. This lets you check or change each letter in a word.",

            example: `for letter in "CODE":
    print(letter)`,

            output: `C
O
D
E`,

            points: 10
        },

        {
            id: 1106,
            title: "Counters and Running Totals",
            icon: "🧮",

            explanation:
                "A counter is a variable that goes up by 1 each time something happens. A running total (also called an accumulator) is a variable that adds up numbers as the loop goes. Start them at 0 before the loop, then update them inside it.",

            example: `total = 0
vowels = 0

for n in range(1, 6):
    total = total + n
print("Total:", total)

for letter in "banana":
    if letter in "aeiou":
        vowels = vowels + 1
print("Vowels:", vowels)`,

            output: `Total: 15
Vowels: 3`,

            points: 15
        }
    ],

    exercises: [
        {
            id: 11001,
            title: "Countdown Stopper",
            difficulty: "Easy",

            description:
                "Write a loop that prints the numbers from 10 down to 1, but stops with break when it reaches 6 (so 6 is not printed).",

            hint:
                "Use range(10, 0, -1) to count down, and check if the number is 6 before printing.",

            answer:
                `for n in range(10, 0, -1):
    if n == 6:
        break
    print(n)`,

            points: 20
        },

        {
            id: 11002,
            title: "Skip the Odd Ones",
            difficulty: "Easy",

            description:
                "Loop through the numbers 1 to 10 and use continue to skip odd numbers, so only even numbers are printed.",

            hint:
                "A number is odd when n % 2 == 1.",

            answer:
                `for n in range(1, 11):
    if n % 2 == 1:
        continue
    print(n)`,

            points: 20
        },

        {
            id: 11003,
            title: "Spell It Out",
            difficulty: "Easy",

            description:
                'Use a for loop to print each letter of the word "ROCKET" on its own line.',

            hint:
                'Write for letter in "ROCKET": and print the letter.',

            answer:
                `for letter in "ROCKET":
    print(letter)`,

            points: 20
        },

        {
            id: 11004,
            title: "Add Up to 100",
            difficulty: "Medium",

            description:
                "Use a running total to add up all the numbers from 1 to 100 and print the answer.",

            hint:
                "Start total at 0, loop with range(1, 101), and add each number to total.",

            answer:
                `total = 0
for n in range(1, 101):
    total = total + n
print(total)`,

            points: 25
        },

        {
            id: 11005,
            title: "Star Triangle",
            difficulty: "Medium",

            description:
                "Use nested loops to print a triangle of stars with 5 rows. The first row has 1 star and the last row has 5 stars.",

            hint:
                'The outer loop goes from 1 to 5. The inner loop prints "*" with end="" that many times. Then call print().',

            answer:
                `for row in range(1, 6):
    for star in range(row):
        print("*", end="")
    print()`,

            points: 30
        },

        {
            id: 11006,
            title: "Times Table Grid",
            difficulty: "Medium",

            description:
                "Use nested loops to print the 1, 2, and 3 times tables from 1 to 3. Each line should look like 2 x 3 = 6.",

            hint:
                "The outer loop picks the table number and the inner loop picks what to multiply by. Use an f-string to print each line.",

            answer:
                `for a in range(1, 4):
    for b in range(1, 4):
        print(f"{a} x {b} = {a * b}")`,

            points: 30
        }
    ],

    quiz: [
        {
            id: 1,

            question:
                "What does the break keyword do inside a loop?",

            options: [
                "Skips one step",
                "Stops the loop completely",
                "Restarts the loop",
                "Breaks the computer"
            ],

            answer: 1,

            explanation:
                "break jumps out of the loop straight away, so the loop stops."
        },

        {
            id: 2,

            question:
                "What does the continue keyword do inside a loop?",

            options: [
                "Stops the loop",
                "Ends the program",
                "Prints the next number",
                "Skips to the next turn of the loop"
            ],

            answer: 3,

            explanation:
                "continue skips the rest of the current turn and moves on to the next one."
        },

        {
            id: 3,

            question:
                "What will this code print?\n\nfor n in range(1, 6):\n    if n == 3:\n        break\n    print(n)",

            options: [
                "1 2",
                "1 2 3",
                "1 2 4 5",
                "3"
            ],

            answer: 0,

            explanation:
                "The loop prints 1 and 2, then stops when n becomes 3, before printing it."
        },

        {
            id: 4,

            question:
                "What will this code print?\n\nfor n in range(1, 5):\n    if n == 2:\n        continue\n    print(n)",

            options: [
                "1",
                "2",
                "1 3 4",
                "1 2 3 4"
            ],

            answer: 2,

            explanation:
                "When n is 2, continue skips the print, so only 1, 3, and 4 are printed."
        },

        {
            id: 5,

            question:
                "How many times will \"Hi\" be printed?\n\nfor a in range(3):\n    for b in range(2):\n        print(\"Hi\")",

            options: [
                "3",
                "5",
                "2",
                "6"
            ],

            answer: 3,

            explanation:
                "The inner loop runs 2 times for each of the 3 outer turns, so 3 x 2 = 6."
        },

        {
            id: 6,

            question:
                "What will this code print?\n\ncount = 0\nfor letter in \"hello\":\n    count = count + 1\nprint(count)",

            options: [
                "0",
                "5",
                "hello",
                "1"
            ],

            answer: 1,

            explanation:
                "The loop runs once for each of the 5 letters, adding 1 to count each time."
        },

        {
            id: 7,

            question:
                "What is a loop inside another loop called?",

            options: [
                "A nested loop",
                "A broken loop",
                "A double function",
                "A string loop"
            ],

            answer: 0,

            explanation:
                "When one loop is placed inside another, it is called a nested loop."
        },

        {
            id: 8,

            question:
                "What will this code print?\n\ntotal = 0\nfor n in range(1, 4):\n    total = total + n\nprint(total)",

            options: [
                "3",
                "4",
                "6",
                "123"
            ],

            answer: 2,

            explanation:
                "The running total adds 1 + 2 + 3, which equals 6."
        }
    ]
};

export default topic;
