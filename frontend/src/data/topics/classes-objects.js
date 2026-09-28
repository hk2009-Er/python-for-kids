const topic = {
    id: 17,
    slug: "classes-objects",
    title: "Classes & Objects",
    icon: "🏗️",
    level: "Advanced",

    description:
        "Build your own types of things! Learn to make classes as blueprints, create objects like pets and game characters, give them attributes and methods, and share code with inheritance.",

    lessons: [
        {
            id: 1701,
            title: "What is a Class?",
            icon: "📐",

            explanation:
                "A class is like a blueprint or a cookie cutter. It describes what something should be like. An object is a real thing made from that blueprint, like a cookie made from the cutter. We create an object by writing the class name with brackets, like Dog().",

            example: `class Dog:
    sound = "Woof!"

my_dog = Dog()
print(my_dog.sound)`,

            output: `Woof!`,

            points: 15
        },

        {
            id: 1702,
            title: "The __init__ Method",
            icon: "🎬",

            explanation:
                "__init__ is a special method that runs every time a new object is made. It sets up the object's attributes, which are pieces of information the object remembers. The word self means \"this object\", so self.name is this object's own name.",

            example: `class Pet:
    def __init__(self, name, animal):
        self.name = name
        self.animal = animal

my_pet = Pet("Buddy", "dog")
print(my_pet.name)
print(my_pet.animal)`,

            output: `Buddy
dog`,

            points: 18
        },

        {
            id: 1703,
            title: "Methods: Things Objects Can Do",
            icon: "🏃",

            explanation:
                "A method is a function that lives inside a class. Methods are the actions an object can do, like speak or jump. Every method has self as its first parameter so it can use the object's attributes.",

            example: `class Pet:
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound

    def speak(self):
        print(self.name, "says", self.sound)

cat = Pet("Whiskers", "Meow!")
cat.speak()`,

            output: `Whiskers says Meow!`,

            points: 18
        },

        {
            id: 1704,
            title: "Making Many Objects",
            icon: "🐾",

            explanation:
                "One class can make as many objects as we want! Each object has its own attributes, so every pet can have a different name and sound. We can even put objects in a list and loop through them.",

            example: `class Pet:
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound

    def speak(self):
        print(self.name, "says", self.sound)

pets = [Pet("Rex", "Woof!"), Pet("Luna", "Meow!"), Pet("Polly", "Squawk!")]

for pet in pets:
    pet.speak()`,

            output: `Rex says Woof!
Luna says Meow!
Polly says Squawk!`,

            points: 18
        },

        {
            id: 1705,
            title: "Game Characters",
            icon: "🎮",

            explanation:
                "Objects are perfect for games! A hero can have attributes like name and health, and methods can change those attributes. When the hero takes damage, the method lowers self.health.",

            example: `class Hero:
    def __init__(self, name):
        self.name = name
        self.health = 100

    def take_damage(self, amount):
        self.health = self.health - amount
        print(self.name, "has", self.health, "health left")

knight = Hero("Sir Kai")
knight.take_damage(30)
knight.take_damage(20)`,

            output: `Sir Kai has 70 health left
Sir Kai has 50 health left`,

            points: 20
        },

        {
            id: 1706,
            title: "Simple Inheritance",
            icon: "👪",

            explanation:
                "Inheritance lets a new class borrow everything from another class. We write the parent class in brackets, like class Wizard(Hero). The child class gets all the parent's attributes and methods, and it can add its own new ones too.",

            example: `class Hero:
    def __init__(self, name):
        self.name = name

    def say_hello(self):
        print("Hi, I am", self.name)

class Wizard(Hero):
    def cast_spell(self):
        print(self.name, "casts a magic spell!")

merlin = Wizard("Merlin")
merlin.say_hello()
merlin.cast_spell()`,

            output: `Hi, I am Merlin
Merlin casts a magic spell!`,

            points: 20
        }
    ],

    exercises: [
        {
            id: 17001,
            title: "Make a Cat Class",
            difficulty: "Easy",

            description:
                'Create a class called Cat with an attribute sound = "Meow!". Make a Cat object and print its sound.',

            hint:
                "Write class Cat:, put sound = \"Meow!\" inside, then my_cat = Cat() and print(my_cat.sound).",

            answer:
                `class Cat:
    sound = "Meow!"

my_cat = Cat()
print(my_cat.sound)`,

            points: 20
        },

        {
            id: 17002,
            title: "Car Blueprint",
            difficulty: "Easy",

            description:
                'Create a class called Car with an __init__ method that takes color and brand. Make a red Toyota car and print its color and brand on separate lines.',

            hint:
                "Inside __init__, write self.color = color and self.brand = brand.",

            answer:
                `class Car:
    def __init__(self, color, brand):
        self.color = color
        self.brand = brand

my_car = Car("red", "Toyota")
print(my_car.color)
print(my_car.brand)`,

            points: 25
        },

        {
            id: 17003,
            title: "Robot Says Hello",
            difficulty: "Easy",

            description:
                'Create a class Robot with a name attribute and a method greet() that prints "Beep boop! I am" followed by the name. Make a robot named Robo and call greet().',

            hint:
                'Inside greet(self), use print("Beep boop! I am", self.name).',

            answer:
                `class Robot:
    def __init__(self, name):
        self.name = name

    def greet(self):
        print("Beep boop! I am", self.name)

robo = Robot("Robo")
robo.greet()`,

            points: 25
        },

        {
            id: 17004,
            title: "Pet Parade",
            difficulty: "Medium",

            description:
                'Create a class Pet with name and animal attributes and a method introduce() that prints the name, "is a", and the animal. Make three pets: Max the dog, Bella the cat, and Nemo the fish, and call introduce() for each.',

            hint:
                "Put the three pets in a list and use a for loop to call introduce() on each one.",

            answer:
                `class Pet:
    def __init__(self, name, animal):
        self.name = name
        self.animal = animal

    def introduce(self):
        print(self.name, "is a", self.animal)

pets = [Pet("Max", "dog"), Pet("Bella", "cat"), Pet("Nemo", "fish")]

for pet in pets:
    pet.introduce()`,

            points: 30
        },

        {
            id: 17005,
            title: "Power Up!",
            difficulty: "Medium",

            description:
                'Create a class Player with a name and a score that starts at 0. Add a method add_points(amount) that adds to the score and prints the name, "has", the score, and "points". Make a player named Zara and add 10 points, then 25 points.',

            hint:
                "In __init__, set self.score = 0. In add_points, write self.score = self.score + amount.",

            answer:
                `class Player:
    def __init__(self, name):
        self.name = name
        self.score = 0

    def add_points(self, amount):
        self.score = self.score + amount
        print(self.name, "has", self.score, "points")

zara = Player("Zara")
zara.add_points(10)
zara.add_points(25)`,

            points: 30
        },

        {
            id: 17006,
            title: "Animal Family",
            difficulty: "Medium",

            description:
                'Create a class Animal with a name and a method eat() that prints the name and "is eating". Then create a class Dog that inherits from Animal and adds a method bark() that prints "Woof!". Make a Dog named Rocky and call eat() and bark().',

            hint:
                "Write class Dog(Animal): so Dog gets everything from Animal.",

            answer:
                `class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(self.name, "is eating")

class Dog(Animal):
    def bark(self):
        print("Woof!")

rocky = Dog("Rocky")
rocky.eat()
rocky.bark()`,

            points: 35
        }
    ],

    quiz: [
        {
            id: 1,

            question:
                "What is a class most like?",

            options: [
                "A blueprint for making things",
                "A number",
                "An error message",
                "A loop"
            ],

            answer: 0,

            explanation:
                "A class is a blueprint that describes how to make objects."
        },

        {
            id: 2,

            question:
                "Which special method runs when a new object is created?",

            options: [
                "start()",
                "__init__()",
                "create()",
                "print()"
            ],

            answer: 1,

            explanation:
                "__init__ runs automatically every time a new object is made."
        },

        {
            id: 3,

            question:
                "What does self mean inside a class?",

            options: [
                "The whole program",
                "The class name",
                "The object that is using the method",
                "A special error"
            ],

            answer: 2,

            explanation:
                "self means \"this object\", so self.name is the object's own name."
        },

        {
            id: 4,

            question:
                "What will this code print?\n\nclass Dog:\n    sound = \"Woof\"\n\nd = Dog()\nprint(d.sound)",

            options: [
                "Dog",
                "sound",
                "d.sound",
                "Woof"
            ],

            answer: 3,

            explanation:
                "d is a Dog object, and its sound attribute is Woof."
        },

        {
            id: 5,

            question:
                "What is a method?",

            options: [
                "A function that lives inside a class",
                "A type of variable",
                "A list of objects",
                "A kind of error"
            ],

            answer: 0,

            explanation:
                "Methods are functions inside a class. They are the actions an object can do."
        },

        {
            id: 6,

            question:
                "How many objects can you make from one class?",

            options: [
                "Only one",
                "Exactly two",
                "As many as you want",
                "None"
            ],

            answer: 2,

            explanation:
                "One class can make as many objects as you need, each with its own attributes."
        },

        {
            id: 7,

            question:
                "What does class Wizard(Hero): mean?",

            options: [
                "Hero inherits from Wizard",
                "Wizard inherits from Hero",
                "Wizard and Hero are deleted",
                "It is a SyntaxError"
            ],

            answer: 1,

            explanation:
                "The class in brackets is the parent, so Wizard gets everything from Hero."
        },

        {
            id: 8,

            question:
                "What will this code print?\n\nclass Hero:\n    def __init__(self):\n        self.health = 100\n\nh = Hero()\nh.health = h.health - 40\nprint(h.health)",

            options: [
                "100",
                "40",
                "140",
                "60"
            ],

            answer: 3,

            explanation:
                "The hero starts with 100 health, loses 40, and has 60 left."
        }
    ]
};

export default topic;
