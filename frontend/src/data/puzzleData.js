// Code Puzzle levels. `code` is the scrambled starting order,
// `answer` is the only correct order. Each answer must be the
// single valid ordering, so avoid lines that could swap places.
const puzzleData = [
    {
        id: 1,
        title: "Print Your Name",
        description:
            "Arrange the Python code to print a name.",
        code: [
            "print(name)",
            'name = "Python"'
        ],
        answer: [
            'name = "Python"',
            "print(name)"
        ],
        hint: "First create the variable, then print it.",
        explanation:
            "We create the variable first and then use print() to display its value."
    },

    {
        id: 2,
        title: "Create a Greeting",
        description:
            "Arrange the code to create a friendly greeting.",
        code: [
            'print("Hello", name)',
            'name = "Alex"'
        ],
        answer: [
            'name = "Alex"',
            'print("Hello", name)'
        ],
        hint: "Python needs to know what name is before printing it.",
        explanation:
            "The variable must be created before we use it."
    },

    {
        id: 3,
        title: "Add Two Numbers",
        description:
            "Put the code in the correct order.",
        code: [
            "result = a + b",
            "a = 10",
            "b = a * 2",
            "print(result)"
        ],
        answer: [
            "a = 10",
            "b = a * 2",
            "result = a + b",
            "print(result)"
        ],
        hint: "Create the numbers before adding them.",
        explanation:
            "Python executes code from top to bottom, so a and b must exist before calculating result."
    },

    {
        id: 4,
        title: "Make a Decision",
        description:
            "Arrange the code to check a number.",
        code: [
            '    print("Positive")',
            "number = 10",
            "if number > 0:"
        ],
        answer: [
            "number = 10",
            "if number > 0:",
            '    print("Positive")'
        ],
        hint: "First create the number, then check it.",
        explanation:
            "The number is created first, then the if statement checks whether it is greater than zero."
    },

    {
        id: 5,
        title: "Python Loop",
        description:
            "Arrange the code to print numbers from 1 to 3.",
        code: [
            "    print(i)",
            "for i in range(1, 4):"
        ],
        answer: [
            "for i in range(1, 4):",
            "    print(i)"
        ],
        hint: "The loop statement comes before the code inside it.",
        explanation:
            "The for statement starts the loop and the indented print statement runs during each iteration."
    },

    {
        id: 6,
        title: "Create a Function",
        description:
            "Arrange the code to create and call a function.",
        code: [
            "greet()",
            "def greet():",
            '    print("Hello!")'
        ],
        answer: [
            "def greet():",
            '    print("Hello!")',
            "greet()"
        ],
        hint: "Define the function before calling it.",
        explanation:
            "Python needs the function definition before the function is called."
    },

    {
        id: 7,
        title: "List Example",
        description:
            "Create a list and print it.",
        code: [
            "print(fruits)",
            'fruits = ["Apple", "Banana", "Mango"]'
        ],
        answer: [
            'fruits = ["Apple", "Banana", "Mango"]',
            "print(fruits)"
        ],
        hint: "Create the list before printing it.",
        explanation:
            "The fruits variable must be assigned before Python can print it."
    },

    {
        id: 8,
        title: "Even or Odd",
        description:
            "Arrange the code to check whether a number is even.",
        code: [
            '    print("Even")',
            "if number % 2 == 0:",
            "number = 8"
        ],
        answer: [
            "number = 8",
            "if number % 2 == 0:",
            '    print("Even")'
        ],
        hint: "The number must exist before the condition checks it.",
        explanation:
            "We first assign the number, then check its remainder using the % operator."
    },

    {
        id: 9,
        title: "Shout It Out",
        description:
            "Arrange the code to print a word in capital letters.",
        code: [
            "print(loud)",
            'word = "hello"',
            "loud = word.upper()"
        ],
        answer: [
            'word = "hello"',
            "loud = word.upper()",
            "print(loud)"
        ],
        hint: "You need the word before you can make it loud.",
        explanation:
            "upper() turns a string into capital letters, so HELLO is printed."
    },

    {
        id: 10,
        title: "Ask a Question",
        description:
            "Arrange the code to ask for a name and greet the person.",
        code: [
            'print(f"Hi {name}!")',
            'name = input("What is your name? ")'
        ],
        answer: [
            'name = input("What is your name? ")',
            'print(f"Hi {name}!")'
        ],
        hint: "Ask the question first, then use the answer.",
        explanation:
            "input() stores what the user types in name, and the f-string puts it inside the greeting."
    },

    {
        id: 11,
        title: "Grade Checker",
        description:
            "Arrange the code to print a message for a score.",
        code: [
            "else:",
            '    print("Keep trying!")',
            "score = 85",
            '    print("Great job!")',
            "if score >= 80:"
        ],
        answer: [
            "score = 85",
            "if score >= 80:",
            '    print("Great job!")',
            "else:",
            '    print("Keep trying!")'
        ],
        hint: "Every if and else needs its own indented line right under it.",
        explanation:
            "The if checks the score first. else only runs when the if condition is False."
    },

    {
        id: 12,
        title: "Countdown",
        description:
            "Arrange the code to count down from 3 and then blast off.",
        code: [
            "    count = count - 1",
            'print("Blast off!")',
            "while count > 0:",
            "count = 3",
            "    print(count)"
        ],
        answer: [
            "count = 3",
            "while count > 0:",
            "    print(count)",
            "    count = count - 1",
            'print("Blast off!")'
        ],
        hint: "Print the number before making it smaller. The blast off line is not inside the loop.",
        explanation:
            "The loop prints 3, 2, 1 and makes count smaller each time. When count is 0 the loop stops."
    },

    {
        id: 13,
        title: "Add to the List",
        description:
            "Arrange the code to add a new pet and count the pets.",
        code: [
            "print(len(pets))",
            'pets.append("hamster")',
            'pets = ["cat", "dog"]'
        ],
        answer: [
            'pets = ["cat", "dog"]',
            'pets.append("hamster")',
            "print(len(pets))"
        ],
        hint: "Make the list, add to it, then count.",
        explanation:
            "append() adds hamster to the end, so len() counts 3 pets."
    },

    {
        id: 14,
        title: "Loop Through a List",
        description:
            "Arrange the code to say hello to every friend.",
        code: [
            '    print("Hello", friend)',
            'friends = ["Mia", "Leo", "Zoe"]',
            "for friend in friends:"
        ],
        answer: [
            'friends = ["Mia", "Leo", "Zoe"]',
            "for friend in friends:",
            '    print("Hello", friend)'
        ],
        hint: "The list must exist before the loop can use it.",
        explanation:
            "The for loop takes each name from the list one at a time."
    },

    {
        id: 15,
        title: "Stop Early",
        description:
            "Arrange the code so the loop stops when it reaches 3.",
        code: [
            "        break",
            "    print(n)",
            "for n in range(1, 10):",
            "    if n == 3:"
        ],
        answer: [
            "for n in range(1, 10):",
            "    if n == 3:",
            "        break",
            "    print(n)"
        ],
        hint: "Check for 3 before printing, so 3 is never printed.",
        explanation:
            "break jumps out of the loop straight away, so only 1 and 2 are printed."
    },

    {
        id: 16,
        title: "Pet Dictionary",
        description:
            "Arrange the code to store a pet's details and print its name.",
        code: [
            'print(pet["name"])',
            'pet = {"name": "Rex", "age": 3}'
        ],
        answer: [
            'pet = {"name": "Rex", "age": 3}',
            'print(pet["name"])'
        ],
        hint: "Create the dictionary before reading from it.",
        explanation:
            "A dictionary stores values with keys. pet[\"name\"] gets the value stored under the name key."
    },

    {
        id: 17,
        title: "Return a Value",
        description:
            "Arrange the code to make a function that doubles a number.",
        code: [
            "print(double(5))",
            "    return n * 2",
            "def double(n):"
        ],
        answer: [
            "def double(n):",
            "    return n * 2",
            "print(double(5))"
        ],
        hint: "Define the function, then call it.",
        explanation:
            "return sends the answer back, so print(double(5)) shows 10."
    },

    {
        id: 18,
        title: "Roll the Dice",
        description:
            "Arrange the code to roll a dice.",
        code: [
            "print(roll)",
            "import random",
            "roll = random.randint(1, 6)"
        ],
        answer: [
            "import random",
            "roll = random.randint(1, 6)",
            "print(roll)"
        ],
        hint: "You have to import a module before you can use it.",
        explanation:
            "import random gives us randint(), which picks a random whole number from 1 to 6."
    },

    {
        id: 19,
        title: "Catch the Error",
        description:
            "Arrange the code so dividing by zero doesn't crash.",
        code: [
            "except ZeroDivisionError:",
            "    print(10 / 0)",
            "try:",
            '    print("You cannot divide by zero!")'
        ],
        answer: [
            "try:",
            "    print(10 / 0)",
            "except ZeroDivisionError:",
            '    print("You cannot divide by zero!")'
        ],
        hint: "try comes first, with the risky code inside it.",
        explanation:
            "Python tries the code in try. When an error happens, it runs the except block instead of crashing."
    },

    {
        id: 20,
        title: "Build a Class",
        description:
            "Arrange the code to create a Dog and make it bark.",
        code: [
            "my_dog.bark()",
            "    def bark(self):",
            "class Dog:",
            "my_dog = Dog()",
            '        print("Woof!")'
        ],
        answer: [
            "class Dog:",
            "    def bark(self):",
            '        print("Woof!")',
            "my_dog = Dog()",
            "my_dog.bark()"
        ],
        hint: "Make the class first, then create a dog, then call its method.",
        explanation:
            "A class is a blueprint. Dog() makes an object, and my_dog.bark() runs its bark method."
    }
];

export default puzzleData;
