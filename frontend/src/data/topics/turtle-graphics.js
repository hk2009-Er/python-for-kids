const topic = {
    id: 16,
    slug: "turtle-graphics",
    title: "Turtle Drawing",
    icon: "🐢",
    level: "Advanced",

    description:
        "Meet the Python turtle! Move it forward, turn it left and right, and use loops, colors, and functions to draw squares, triangles, stars, and your own art.",

    lessons: [
        {
            id: 1601,
            title: "Meet the Turtle",
            icon: "🐢",

            explanation:
                "The turtle module gives us a little turtle that draws a line wherever it walks. We import turtle and create our turtle with turtle.Turtle(). t.forward(100) moves the turtle forward 100 steps, and turtle.done() keeps the drawing window open.",

            example: `import turtle

t = turtle.Turtle()
t.forward(100)

turtle.done()`,

            output: `🐢 The turtle draws a straight line 100 steps long!`,

            points: 15
        },

        {
            id: 1602,
            title: "Turning Left and Right",
            icon: "↪️",

            explanation:
                "The turtle can turn using left() and right(). The number inside is the angle in degrees. A turn of 90 is a corner, like the corner of a book, and a turn of 360 is a full spin.",

            example: `import turtle

t = turtle.Turtle()
t.forward(100)
t.left(90)
t.forward(100)

turtle.done()`,

            output: `🐢 The turtle draws a line, turns left at a corner, and draws another line, making an L shape!`,

            points: 15
        },

        {
            id: 1603,
            title: "Drawing a Square with a Loop",
            icon: "⬛",

            explanation:
                "A square has 4 equal sides and 4 corners of 90 degrees. Instead of writing forward and left four times, we can use a for loop to repeat them. Loops make drawing much faster!",

            example: `import turtle

t = turtle.Turtle()

for i in range(4):
    t.forward(100)
    t.left(90)

turtle.done()`,

            output: `🐢 The turtle draws a square!`,

            points: 18
        },

        {
            id: 1604,
            title: "Triangles and Stars",
            icon: "⭐",

            explanation:
                "A triangle has 3 sides, so the turtle turns 120 degrees 3 times. A star has 5 points, and the turtle turns 144 degrees each time. Changing the number of repeats and the angle makes totally different shapes!",

            example: `import turtle

t = turtle.Turtle()

for i in range(3):
    t.forward(100)
    t.left(120)

t.penup()
t.forward(150)
t.pendown()

for i in range(5):
    t.forward(100)
    t.right(144)

turtle.done()`,

            output: `🐢 The turtle draws a triangle, moves over without drawing, and then draws a 5-pointed star!`,

            points: 18
        },

        {
            id: 1605,
            title: "Colors and the Pen",
            icon: "🎨",

            explanation:
                "We can change how the turtle draws. color() changes the pen color, and pensize() makes the line thicker. penup() lifts the pen so the turtle moves without drawing, and pendown() puts it back. begin_fill() and end_fill() color in a shape.",

            example: `import turtle

t = turtle.Turtle()
t.pensize(5)
t.color("purple")
t.fillcolor("pink")

t.begin_fill()
for i in range(4):
    t.forward(100)
    t.left(90)
t.end_fill()

turtle.done()`,

            output: `🐢 The turtle draws a thick purple square filled with pink!`,

            points: 20
        },

        {
            id: 1606,
            title: "Drawing with Functions",
            icon: "🛠️",

            explanation:
                "We can put drawing code inside a function and use it again and again. A parameter like size lets us draw shapes of different sizes with the same function. This is how artists make patterns quickly!",

            example: `import turtle

t = turtle.Turtle()

def draw_square(size):
    for i in range(4):
        t.forward(size)
        t.left(90)

draw_square(50)
draw_square(100)
draw_square(150)

turtle.done()`,

            output: `🐢 The turtle draws three squares of different sizes, all starting from the same corner!`,

            points: 20
        }
    ],

    exercises: [
        {
            id: 16001,
            title: "Walk the Turtle",
            difficulty: "Easy",

            description:
                "Import turtle, create a turtle, and make it move forward 150 steps.",

            hint:
                "Use t = turtle.Turtle() and then t.forward(150).",

            answer:
                `import turtle

t = turtle.Turtle()
t.forward(150)

turtle.done()`,

            turtle: true,
            flexible: true,

            points: 20
        },

        {
            id: 16002,
            title: "Draw a Square",
            difficulty: "Easy",

            description:
                "Use a for loop to make the turtle draw a square with sides of 80 steps.",

            hint:
                "Repeat 4 times: forward(80) and left(90).",

            answer:
                `import turtle

t = turtle.Turtle()

for i in range(4):
    t.forward(80)
    t.left(90)

turtle.done()`,

            turtle: true,
            flexible: true,

            points: 20
        },

        {
            id: 16003,
            title: "Draw a Triangle",
            difficulty: "Easy",

            description:
                "Use a for loop to draw a triangle with sides of 100 steps.",

            hint:
                "A triangle has 3 sides. Turn left 120 degrees each time.",

            answer:
                `import turtle

t = turtle.Turtle()

for i in range(3):
    t.forward(100)
    t.left(120)

turtle.done()`,

            turtle: true,
            flexible: true,

            points: 25
        },

        {
            id: 16004,
            title: "Shining Star",
            difficulty: "Medium",

            description:
                "Draw a gold 5-pointed star with sides of 120 steps.",

            hint:
                'Use t.color("gold"), then repeat 5 times: forward(120) and right(144).',

            answer:
                `import turtle

t = turtle.Turtle()
t.color("gold")

for i in range(5):
    t.forward(120)
    t.right(144)

turtle.done()`,

            turtle: true,
            flexible: true,

            points: 30
        },

        {
            id: 16005,
            title: "Filled Hexagon",
            difficulty: "Medium",

            description:
                "Draw a hexagon (6 sides) filled with your favorite color. Make the pen thicker with pensize().",

            hint:
                "A hexagon turns 60 degrees each time. Put the loop between begin_fill() and end_fill().",

            answer:
                `import turtle

t = turtle.Turtle()
t.pensize(3)
t.color("blue")
t.fillcolor("lightblue")

t.begin_fill()
for i in range(6):
    t.forward(80)
    t.left(60)
t.end_fill()

turtle.done()`,

            turtle: true,
            flexible: true,

            points: 30
        },

        {
            id: 16006,
            title: "Shape Function",
            difficulty: "Medium",

            description:
                "Write a function called draw_triangle(size) that draws a triangle. Call it three times with sizes 50, 100, and 150.",

            hint:
                "Inside the function, repeat 3 times: forward(size) and left(120).",

            answer:
                `import turtle

t = turtle.Turtle()

def draw_triangle(size):
    for i in range(3):
        t.forward(size)
        t.left(120)

draw_triangle(50)
draw_triangle(100)
draw_triangle(150)

turtle.done()`,

            turtle: true,
            flexible: true,

            points: 35
        }
    ],

    quiz: [
        {
            id: 1,

            question:
                "Which line creates a new turtle?",

            options: [
                "t = turtle.Turtle()",
                "t = turtle()",
                "t = new Turtle",
                "turtle.start()"
            ],

            answer: 0,

            explanation:
                "turtle.Turtle() creates a new turtle that we can move around."
        },

        {
            id: 2,

            question:
                "What does t.forward(100) do?",

            options: [
                "Turns the turtle 100 degrees",
                "Moves the turtle forward 100 steps",
                "Changes the color",
                "Makes the turtle disappear"
            ],

            answer: 1,

            explanation:
                "forward(100) moves the turtle 100 steps in the direction it is facing."
        },

        {
            id: 3,

            question:
                "How many degrees should the turtle turn at each corner of a square?",

            options: [
                "45",
                "60",
                "120",
                "90"
            ],

            answer: 3,

            explanation:
                "Each corner of a square is 90 degrees."
        },

        {
            id: 4,

            question:
                "What shape does this code draw?\n\nfor i in range(3):\n    t.forward(100)\n    t.left(120)",

            options: [
                "A square",
                "A circle",
                "A triangle",
                "A star"
            ],

            answer: 2,

            explanation:
                "The turtle draws 3 sides and turns 120 degrees each time, which makes a triangle."
        },

        {
            id: 5,

            question:
                "Which command lifts the pen so the turtle moves without drawing?",

            options: [
                "t.penup()",
                "t.pendown()",
                "t.stop()",
                "t.hide()"
            ],

            answer: 0,

            explanation:
                "penup() lifts the pen. pendown() puts it back down to draw again."
        },

        {
            id: 6,

            question:
                "Which angle does the turtle turn to draw a 5-pointed star?",

            options: [
                "90",
                "144",
                "72",
                "180"
            ],

            answer: 1,

            explanation:
                "Turning 144 degrees 5 times makes a 5-pointed star."
        },

        {
            id: 7,

            question:
                "How do you color in (fill) a shape?",

            options: [
                "Use t.forward() twice",
                "Use print()",
                "Use t.left(360)",
                "Draw it between t.begin_fill() and t.end_fill()"
            ],

            answer: 3,

            explanation:
                "Code between begin_fill() and end_fill() draws a shape that gets filled with color."
        },

        {
            id: 8,

            question:
                "Why is it useful to put drawing code inside a function?",

            options: [
                "It makes the turtle faster",
                "It changes the turtle's color",
                "You can draw the same shape again and again easily",
                "It is the only way to draw"
            ],

            answer: 2,

            explanation:
                "A function lets you reuse your drawing code, even with different sizes."
        }
    ]
};

export default topic;
