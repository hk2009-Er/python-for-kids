// Step-by-step project guides.
// Generated and verified by running every program with real Python:
// each sampleRun and step output is genuine program output.

const projectData = [
    {
        "slug": "number-guessing-game",
        "emoji": "🎲",
        "title": "Number Guessing Game",
        "level": "Beginner",
        "description": "Create a game where the computer chooses a secret number and the player tries to guess it, with helpful clues along the way.",
        "skills": [
            "Variables",
            "input()",
            "if / elif / else",
            "while loops",
            "random"
        ],
        "time": "about 30 minutes",
        "intro": [
            "In this project you will build a classic game that programmers have been making for more than fifty years. The computer secretly picks a number between 1 and 20, and you have to guess it. After every guess the computer gives you a clue: \"too high\" or \"too low\". Keep guessing until you find it!",
            "It is a perfect first project because it is small enough to finish in one sitting, but it still feels like a real game you can show your friends and family. Every time you play, the secret number is different, so the game never gets boring.",
            "Along the way you will practise four big ideas: storing information in variables, asking the player questions with input(), making decisions with if, elif and else, and repeating code with a while loop. You will also meet the random module, which lets your programs surprise you."
        ],
        "steps": [
            {
                "title": "Say hello to the player",
                "explanation": "Every good game starts with a welcome message. We use print() to show text on the screen. Run this first so you know Python is working before we add the fun parts.",
                "code": "print(\"🎲 Welcome to the Number Guessing Game!\")\nprint(\"I'm thinking of a number between 1 and 20.\")\n",
                "output": "🎲 Welcome to the Number Guessing Game!\nI'm thinking of a number between 1 and 20."
            },
            {
                "title": "Let the computer pick a secret number",
                "explanation": "The random module can choose numbers for us. random.randint(1, 20) picks a whole number from 1 to 20, and both ends are included. We store it in a variable called secret. For now we print it so we can check it works, but we will remove that line later so the player cannot cheat!",
                "code": "import random\n\nsecret = random.randint(1, 20)\nprint(\"Psst... the secret number is\", secret)\n",
                "output": "Psst... the secret number is 8",
                "note": "Your number will probably be different, because it is random!"
            },
            {
                "title": "Ask the player for a guess",
                "explanation": "input() shows a question and waits for the player to type an answer. Whatever they type comes back as text, so we wrap it in int() to turn it into a number. Now we can compare it with other numbers.",
                "code": "guess = int(input(\"Your guess: \"))\nprint(\"You guessed\", guess)\n",
                "output": "Your guess: 12\nYou guessed 12"
            },
            {
                "title": "Give the player a clue",
                "explanation": "Now the computer needs to make a decision. If the guess is smaller than the secret, we say \"too low\". If it is bigger, we say \"too high\". Otherwise, the only thing left is that they are equal, so the player wins! This is exactly what if, elif and else are for.",
                "code": "import random\n\nsecret = random.randint(1, 20)\nguess = int(input(\"Your guess: \"))\n\nif guess < secret:\n    print(\"Too low! Try a bigger number.\")\nelif guess > secret:\n    print(\"Too high! Try a smaller number.\")\nelse:\n    print(\"🎉 You got it! The number was\", secret)\n",
                "output": "Your guess: 10\nToo high! Try a smaller number."
            },
            {
                "title": "Keep guessing with a while loop",
                "explanation": "One guess is not much of a game. A while loop repeats its code for as long as its condition is True. Here the condition is guess != secret, which means \"the guess is not the secret yet\". We start guess at 0 so the loop always runs at least once, because 0 can never be the secret.",
                "code": "import random\n\nsecret = random.randint(1, 20)\nguess = 0\n\nwhile guess != secret:\n    guess = int(input(\"Your guess: \"))\n\n    if guess < secret:\n        print(\"Too low! Try a bigger number.\")\n    elif guess > secret:\n        print(\"Too high! Try a smaller number.\")\n    else:\n        print(\"🎉 You got it! The number was\", secret)\n",
                "output": "Your guess: 10\nToo high! Try a smaller number.\nYour guess: 5\nToo low! Try a bigger number.\nYour guess: 7\nToo low! Try a bigger number.\nYour guess: 8\n🎉 You got it! The number was 8"
            },
            {
                "title": "Count the guesses",
                "explanation": "Let's keep score! We make a variable called guesses that starts at 0, and add 1 to it every time the loop runs. When the loop finishes, the player has found the number, so we print how many tries it took. Try to beat your best score!",
                "code": "guesses = 0\n\n# ...inside the while loop, after input():\nguesses = guesses + 1\n\n# ...after the loop has finished:\nprint(\"You needed\", guesses, \"guesses.\")\n",
                "partial": true
            }
        ],
        "fullCode": "import random\n\nprint(\"🎲 Welcome to the Number Guessing Game!\")\nprint(\"I'm thinking of a number between 1 and 20.\")\n\nsecret = random.randint(1, 20)\nguesses = 0\nguess = 0\n\nwhile guess != secret:\n    guess = int(input(\"Your guess: \"))\n    guesses = guesses + 1\n\n    if guess < secret:\n        print(\"Too low! Try a bigger number.\")\n    elif guess > secret:\n        print(\"Too high! Try a smaller number.\")\n    else:\n        print(\"🎉 You got it! The number was\", secret)\n\nprint(\"You needed\", guesses, \"guesses.\")\n",
        "sampleRun": "🎲 Welcome to the Number Guessing Game!\nI'm thinking of a number between 1 and 20.\nYour guess: 10\nToo high! Try a smaller number.\nYour guess: 5\nToo low! Try a bigger number.\nYour guess: 7\nToo low! Try a bigger number.\nYour guess: 8\n🎉 You got it! The number was 8\nYou needed 4 guesses.",
        "challenges": [
            "Make the game harder by choosing a number between 1 and 100. Remember to change the welcome message too!",
            "Give the player only 5 tries. If they run out, print \"Game over!\" and reveal the secret number. (Hint: use and in your while condition.)",
            "Add a \"You're getting warm!\" clue when the guess is within 3 of the secret number.",
            "At the end, ask \"Play again? (yes/no)\" and wrap the whole game in another loop so it starts over."
        ],
        "relatedTopics": [
            "variables",
            "user-input",
            "if-else",
            "loops",
            "random-modules"
        ]
    },
    {
        "slug": "mini-calculator",
        "emoji": "🧮",
        "title": "Mini Calculator",
        "level": "Beginner",
        "description": "Build a calculator that can add, subtract, multiply and divide, and that keeps going until you tell it to stop.",
        "skills": [
            "Functions",
            "input()",
            "float()",
            "if / elif / else",
            "while loops"
        ],
        "time": "about 30 minutes",
        "intro": [
            "Computers are amazing at maths. They can add up millions of numbers in the blink of an eye. In this project you will turn Python into your very own pocket calculator. The player types two numbers and a symbol like + or *, and the calculator works out the answer.",
            "Building a calculator is a great way to learn about functions. A function is a little machine with a name: you give it some numbers, it does a job, and it hands back a result. You will write one function for each kind of sum, and then your program will choose the right one based on what the player types.",
            "You will also learn how to handle a tricky situation: dividing by zero! Real programmers always think about what could go wrong, and you will make sure your calculator gives a friendly message instead of crashing."
        ],
        "steps": [
            {
                "title": "Write your first function",
                "explanation": "We create a function with the word def, give it a name, and list the values it needs in brackets. The return line sends the answer back to whoever called the function. Then we call add(3, 4) to test it.",
                "code": "def add(a, b):\n    return a + b\n\nprint(add(3, 4))\nprint(add(10, 25))\n",
                "output": "7\n35"
            },
            {
                "title": "Add the other three functions",
                "explanation": "Subtracting, multiplying and dividing work in exactly the same way. In Python, * means multiply and / means divide. Notice that dividing always gives a decimal number, like 5.0, even when the answer is a whole number.",
                "code": "def subtract(a, b):\n    return a - b\n\ndef multiply(a, b):\n    return a * b\n\ndef divide(a, b):\n    return a / b\n\nprint(subtract(10, 4))\nprint(multiply(6, 7))\nprint(divide(20, 4))\n",
                "output": "6\n42\n5.0"
            },
            {
                "title": "Protect against dividing by zero",
                "explanation": "Nobody can divide a number by zero, not even a computer! If you try, Python stops with an error. We add an if inside divide() to check whether b is 0 first. If it is, we return a friendly message instead of crashing.",
                "code": "def divide(a, b):\n    if b == 0:\n        return \"Oops! You can't divide by zero.\"\n    return a / b\n\nprint(divide(9, 3))\nprint(divide(9, 0))\n",
                "output": "3.0\nOops! You can't divide by zero."
            },
            {
                "title": "Ask the player for numbers",
                "explanation": "We use input() to ask for two numbers and a symbol. Because input() gives us text, we use float() to turn the numbers into decimals. That way the calculator works with numbers like 2.5 as well as whole numbers.",
                "code": "first = float(input(\"First number: \"))\nsymbol = input(\"Choose + - * or /: \")\nsecond = float(input(\"Second number: \"))\n\nprint(\"You want to work out\", first, symbol, second)\n",
                "output": "First number: 8\nChoose + - * or /: +\nSecond number: 5\nYou want to work out 8.0 + 5.0"
            },
            {
                "title": "Pick the right function",
                "explanation": "Now we check which symbol the player typed and call the matching function. Each elif checks one more symbol. The final else catches anything we don't understand, like a typo. This piece of code uses the four functions from the earlier steps, so they need to be at the top of your file.",
                "code": "if symbol == \"+\":\n    answer = add(first, second)\nelif symbol == \"-\":\n    answer = subtract(first, second)\nelif symbol == \"*\":\n    answer = multiply(first, second)\nelif symbol == \"/\":\n    answer = divide(first, second)\nelse:\n    answer = \"I don't know that symbol.\"\n\nprint(\"Answer:\", answer)\n",
                "partial": true
            },
            {
                "title": "Keep calculating with a loop",
                "explanation": "A real calculator doesn't switch off after one sum. We put everything inside a while loop that keeps going while keep_going is \"yes\". At the end of each sum we ask the player if they want another. Using .lower() means \"YES\" and \"Yes\" work too.",
                "code": "keep_going = \"yes\"\n\nwhile keep_going == \"yes\":\n    # ...ask for the numbers and work out the answer here...\n    keep_going = input(\"Another sum? (yes/no): \").lower()\n\nprint(\"Thanks for calculating with me! 👋\")\n",
                "output": "Another sum? (yes/no): yes\nAnother sum? (yes/no): no\nThanks for calculating with me! 👋"
            }
        ],
        "fullCode": "def add(a, b):\n    return a + b\n\ndef subtract(a, b):\n    return a - b\n\ndef multiply(a, b):\n    return a * b\n\ndef divide(a, b):\n    if b == 0:\n        return \"Oops! You can't divide by zero.\"\n    return a / b\n\nprint(\"🧮 Mini Calculator\")\n\nkeep_going = \"yes\"\n\nwhile keep_going == \"yes\":\n    first = float(input(\"First number: \"))\n    symbol = input(\"Choose + - * or /: \")\n    second = float(input(\"Second number: \"))\n\n    if symbol == \"+\":\n        answer = add(first, second)\n    elif symbol == \"-\":\n        answer = subtract(first, second)\n    elif symbol == \"*\":\n        answer = multiply(first, second)\n    elif symbol == \"/\":\n        answer = divide(first, second)\n    else:\n        answer = \"I don't know that symbol.\"\n\n    print(\"Answer:\", answer)\n    keep_going = input(\"Another sum? (yes/no): \").lower()\n\nprint(\"Thanks for calculating with me! 👋\")\n",
        "sampleRun": "🧮 Mini Calculator\nFirst number: 12\nChoose + - * or /: *\nSecond number: 3\nAnswer: 36.0\nAnother sum? (yes/no): yes\nFirst number: 10\nChoose + - * or /: /\nSecond number: 0\nAnswer: Oops! You can't divide by zero.\nAnother sum? (yes/no): yes\nFirst number: 7.5\nChoose + - * or /: +\nSecond number: 2.5\nAnswer: 10.0\nAnother sum? (yes/no): no\nThanks for calculating with me! 👋",
        "challenges": [
            "Add a power button: if the player types **, work out first ** second (for example 2 ** 3 is 8).",
            "Add a % option that gives the remainder after dividing. Try 17 % 5!",
            "Count how many sums the player did and print the total when they say no.",
            "Use round(answer, 2) so long answers like 3.3333333 are tidied up to 3.33. (Careful: only round numbers, not the divide-by-zero message!)"
        ],
        "relatedTopics": [
            "functions",
            "user-input",
            "operators",
            "if-else",
            "data-types"
        ]
    },
    {
        "slug": "movie-ticket-booking",
        "emoji": "🎟️",
        "title": "Movie Ticket Booking",
        "level": "Beginner",
        "description": "Create a cinema seat booking system that shows free seats, stops double bookings and prints a receipt.",
        "skills": [
            "Lists",
            "for loops",
            "while loops",
            "break",
            "if / elif / else"
        ],
        "time": "about 30 minutes",
        "intro": [
            "Have you ever booked seats at the cinema and watched the seat map change colour as other people grab the best spots? In this project you will build the program behind a tiny cinema called Python Cinema. The player sees which seats are free, picks the ones they want, and gets a receipt with the total price at the end.",
            "This project is all about lists. A list lets one variable hold lots of values, like all the seat names in the cinema. You will use one list for every seat and a second list for the seats that have been booked, and you will move seats between them as the player makes choices.",
            "You will also practise checking for mistakes. What happens if someone types a seat that doesn't exist, or tries to book a seat that is already taken? Your program will spot these problems and give a helpful message, just like a real booking website."
        ],
        "steps": [
            {
                "title": "Make a list of seats",
                "explanation": "We store every seat name in a list, using square brackets with commas between the items. A second, empty list called booked will remember which seats have been taken. len() tells us how many items a list has.",
                "code": "seats = [\"A1\", \"A2\", \"A3\", \"A4\", \"B1\", \"B2\", \"B3\", \"B4\"]\nbooked = []\n\nprint(\"🎬 Welcome to Python Cinema!\")\nprint(\"We have\", len(seats), \"seats tonight.\")\n",
                "output": "🎬 Welcome to Python Cinema!\nWe have 8 seats tonight."
            },
            {
                "title": "Show only the free seats",
                "explanation": "A for loop visits every seat in the list, one at a time. For each seat, we check if it is not in the booked list. Using end=\" \" inside print() keeps everything on one line with spaces in between, instead of starting a new line each time.",
                "code": "seats = [\"A1\", \"A2\", \"A3\", \"A4\", \"B1\", \"B2\", \"B3\", \"B4\"]\nbooked = [\"A2\", \"B3\"]\n\nprint(\"Free seats:\", end=\" \")\nfor seat in seats:\n    if seat not in booked:\n        print(seat, end=\" \")\nprint()\n",
                "output": "Free seats: A1 A3 A4 B1 B2 B4 "
            },
            {
                "title": "Book a seat",
                "explanation": "We ask the player which seat they want. .upper() turns their answer into capital letters, so typing a1 works just as well as A1. Then .append() adds the seat to the end of the booked list.",
                "code": "booked = []\n\nchoice = input(\"Pick a seat: \").upper()\nbooked.append(choice)\n\nprint(\"✅ Seat\", choice, \"is yours!\")\nprint(\"Booked seats:\", booked)\n",
                "output": "Pick a seat: a1\n✅ Seat A1 is yours!\nBooked seats: ['A1']"
            },
            {
                "title": "Check for mistakes",
                "explanation": "Before booking, we need to make sure the seat really exists and nobody else has it. We use if, elif and else to check each problem in turn. Only when both checks pass do we add the seat to the booked list.",
                "code": "seats = [\"A1\", \"A2\", \"A3\", \"A4\", \"B1\", \"B2\", \"B3\", \"B4\"]\nbooked = [\"A2\"]\n\nchoice = input(\"Pick a seat: \").upper()\n\nif choice not in seats:\n    print(\"Hmm, that seat doesn't exist.\")\nelif choice in booked:\n    print(\"Sorry, seat\", choice, \"is already taken.\")\nelse:\n    booked.append(choice)\n    print(\"✅ Seat\", choice, \"is yours!\")\n",
                "output": "Pick a seat: a2\nSorry, seat A2 is already taken."
            },
            {
                "title": "Book lots of seats with a loop",
                "explanation": "Families often need more than one seat! while True: makes a loop that would go on forever, so we need a way out. When the player types done, the break command jumps straight out of the loop. Everything else in this step is the code you already wrote, now placed inside the loop.",
                "code": "while True:\n    choice = input(\"Pick a seat (or type done): \").upper()\n\n    if choice == \"DONE\":\n        break\n\n    print(\"You picked\", choice)\n\nprint(\"Finished booking!\")\n",
                "output": "Pick a seat (or type done): b1\nYou picked B1\nPick a seat (or type done): b2\nYou picked B2\nPick a seat (or type done): done\nFinished booking!"
            },
            {
                "title": "Print the receipt",
                "explanation": "When the loop ends, we show the player their seats and the total price. Each ticket costs 8 dollars, so we multiply the number of booked seats by the price. We use str() to turn the number into text so we can join it to the $ sign with +.",
                "code": "booked = [\"A1\", \"B2\"]\nprice = 8\n\nprint(\"Your seats:\", booked)\nprint(\"Total price: $\" + str(len(booked) * price))\nprint(\"Enjoy the movie! 🍿\")\n",
                "output": "Your seats: ['A1', 'B2']\nTotal price: $16\nEnjoy the movie! 🍿"
            }
        ],
        "fullCode": "seats = [\"A1\", \"A2\", \"A3\", \"A4\", \"B1\", \"B2\", \"B3\", \"B4\"]\nbooked = []\nprice = 8\n\nprint(\"🎬 Welcome to Python Cinema!\")\nprint(\"Tonight's movie: The Robot Who Loved Pizza\")\n\nwhile True:\n    print()\n    print(\"Free seats:\", end=\" \")\n    for seat in seats:\n        if seat not in booked:\n            print(seat, end=\" \")\n    print()\n\n    choice = input(\"Pick a seat (or type done): \").upper()\n\n    if choice == \"DONE\":\n        break\n    elif choice not in seats:\n        print(\"Hmm, that seat doesn't exist.\")\n    elif choice in booked:\n        print(\"Sorry, seat\", choice, \"is already taken.\")\n    else:\n        booked.append(choice)\n        print(\"✅ Seat\", choice, \"is yours!\")\n\nprint()\nprint(\"Your seats:\", booked)\nprint(\"Total price: $\" + str(len(booked) * price))\nprint(\"Enjoy the movie! 🍿\")\n",
        "sampleRun": "🎬 Welcome to Python Cinema!\nTonight's movie: The Robot Who Loved Pizza\n\nFree seats: A1 A2 A3 A4 B1 B2 B3 B4 \nPick a seat (or type done): a2\n✅ Seat A2 is yours!\n\nFree seats: A1 A3 A4 B1 B2 B3 B4 \nPick a seat (or type done): B3\n✅ Seat B3 is yours!\n\nFree seats: A1 A3 A4 B1 B2 B4 \nPick a seat (or type done): A2\nSorry, seat A2 is already taken.\n\nFree seats: A1 A3 A4 B1 B2 B4 \nPick a seat (or type done): C9\nHmm, that seat doesn't exist.\n\nFree seats: A1 A3 A4 B1 B2 B4 \nPick a seat (or type done): done\n\nYour seats: ['A2', 'B3']\nTotal price: $16\nEnjoy the movie! 🍿",
        "challenges": [
            "Add a third row of seats (C1 to C4) to make the cinema bigger.",
            "Stop the player booking when the cinema is full. (Hint: compare len(booked) with len(seats).)",
            "Let the player cancel a seat by typing cancel, then use booked.remove() to give it back.",
            "Make row A the VIP row that costs 12 dollars, while row B stays at 8. Work out the correct total."
        ],
        "relatedTopics": [
            "lists",
            "loops",
            "loop-control",
            "if-else",
            "strings"
        ]
    },
    {
        "slug": "quiz-game",
        "emoji": "❓",
        "title": "Quiz Game",
        "level": "Intermediate",
        "description": "Create your own multiple-choice quiz that asks questions, checks answers and gives the player a final score.",
        "skills": [
            "Dictionaries",
            "Lists",
            "for loops",
            "if / elif / else",
            "Strings"
        ],
        "time": "about 30 minutes",
        "intro": [
            "Quizzes are everywhere: on TV game shows, in apps, and in classrooms. In this project you will build a quiz game about Python itself. The program asks questions one at a time, shows three possible answers, checks what the player picks, and adds up their score.",
            "The clever part is how we store the questions. Each question is a dictionary, which is a way of labelling information. One dictionary holds the question text, the list of options, and the correct answer, all under handy names like \"question\" and \"answer\". Then we put all the dictionaries into one big list.",
            "Because the questions are stored as data, you can change the whole quiz without touching the rest of the code. Once you have finished, you can turn it into a quiz about dinosaurs, football, space, or your favourite book, and test your friends!"
        ],
        "steps": [
            {
                "title": "Store one question in a dictionary",
                "explanation": "A dictionary uses curly brackets and stores pairs of keys and values. Here the keys are \"question\", \"options\" and \"answer\". We read a value by putting its key in square brackets, like q[\"question\"].",
                "code": "q = {\n    \"question\": \"What does print() do?\",\n    \"options\": [\"a) Prints on paper\", \"b) Shows text on the screen\", \"c) Deletes your code\"],\n    \"answer\": \"b\"\n}\n\nprint(q[\"question\"])\nprint(\"The answer is\", q[\"answer\"])\n",
                "output": "What does print() do?\nThe answer is b"
            },
            {
                "title": "Make a list of questions",
                "explanation": "A quiz needs more than one question, so we put several dictionaries inside a list. A for loop then visits each question in turn. Inside the loop, a second for loop prints every option.",
                "code": "questions = [\n    {\n        \"question\": \"What does print() do?\",\n        \"options\": [\"a) Prints on paper\", \"b) Shows text on the screen\", \"c) Deletes your code\"],\n        \"answer\": \"b\"\n    },\n    {\n        \"question\": \"What is 7 % 2 in Python?\",\n        \"options\": [\"a) 1\", \"b) 3.5\", \"c) 14\"],\n        \"answer\": \"a\"\n    }\n]\n\nfor q in questions:\n    print(q[\"question\"])\n    for option in q[\"options\"]:\n        print(\"  \" + option)\n",
                "output": "What does print() do?\n  a) Prints on paper\n  b) Shows text on the screen\n  c) Deletes your code\nWhat is 7 % 2 in Python?\n  a) 1\n  b) 3.5\n  c) 14"
            },
            {
                "title": "Ask and check the answer",
                "explanation": "We ask the player for a, b or c and compare their reply with the answer stored in the dictionary. .lower() means it doesn't matter if they type B or b. If they get it wrong, we tell them the right answer so they learn something.",
                "code": "q = {\n    \"question\": \"What is 7 % 2 in Python?\",\n    \"options\": [\"a) 1\", \"b) 3.5\", \"c) 14\"],\n    \"answer\": \"a\"\n}\n\nprint(q[\"question\"])\nfor option in q[\"options\"]:\n    print(\"  \" + option)\n\nreply = input(\"Your answer (a, b or c): \").lower()\n\nif reply == q[\"answer\"]:\n    print(\"✅ Correct!\")\nelse:\n    print(\"❌ Not quite. The answer was\", q[\"answer\"])\n",
                "output": "What is 7 % 2 in Python?\n  a) 1\n  b) 3.5\n  c) 14\nYour answer (a, b or c): A\n✅ Correct!"
            },
            {
                "title": "Keep score and number the questions",
                "explanation": "We create score = 0 before the loop and add 1 whenever the player is right. A second variable called number counts which question we are on. We use str() to turn the number into text so it can be joined to the question with +.",
                "code": "score = 0\nnumber = 1\n\nfor q in questions:\n    print(\"Question \" + str(number) + \": \" + q[\"question\"])\n    # ...show the options and check the reply...\n    # when the reply is correct:\n    score = score + 1\n    number = number + 1\n",
                "partial": true
            },
            {
                "title": "Show the final score",
                "explanation": "When the loop has asked every question, we tell the player how they did. len(questions) tells us how many questions there were, so the message is always right even if you add more questions later. Then we use if, elif and else to pick a message that matches their score.",
                "code": "name = \"Mia\"\nscore = 3\ntotal = 4\n\nprint(name + \", you scored\", score, \"out of\", total)\n\nif score == total:\n    print(\"🏆 Perfect score! You're a Python star!\")\nelif score >= total / 2:\n    print(\"👍 Great job! Keep practising.\")\nelse:\n    print(\"📚 Nice try! Read the lessons and play again.\")\n",
                "output": "Mia, you scored 3 out of 4\n👍 Great job! Keep practising."
            }
        ],
        "fullCode": "questions = [\n    {\n        \"question\": \"What does print() do?\",\n        \"options\": [\"a) Prints on paper\", \"b) Shows text on the screen\", \"c) Deletes your code\"],\n        \"answer\": \"b\"\n    },\n    {\n        \"question\": \"What is 7 % 2 in Python?\",\n        \"options\": [\"a) 1\", \"b) 3.5\", \"c) 14\"],\n        \"answer\": \"a\"\n    },\n    {\n        \"question\": \"Which brackets make a list?\",\n        \"options\": [\"a) ( )\", \"b) { }\", \"c) [ ]\"],\n        \"answer\": \"c\"\n    },\n    {\n        \"question\": \"What does len('cat') give you?\",\n        \"options\": [\"a) 1\", \"b) 3\", \"c) 'cat'\"],\n        \"answer\": \"b\"\n    }\n]\n\nscore = 0\nnumber = 1\n\nprint(\"❓ Welcome to the Python Quiz!\")\nname = input(\"What's your name? \")\n\nfor q in questions:\n    print()\n    print(\"Question \" + str(number) + \": \" + q[\"question\"])\n    for option in q[\"options\"]:\n        print(\"  \" + option)\n\n    reply = input(\"Your answer (a, b or c): \").lower()\n\n    if reply == q[\"answer\"]:\n        print(\"✅ Correct!\")\n        score = score + 1\n    else:\n        print(\"❌ Not quite. The answer was\", q[\"answer\"])\n\n    number = number + 1\n\nprint()\nprint(name + \", you scored\", score, \"out of\", len(questions))\n\nif score == len(questions):\n    print(\"🏆 Perfect score! You're a Python star!\")\nelif score >= len(questions) / 2:\n    print(\"👍 Great job! Keep practising.\")\nelse:\n    print(\"📚 Nice try! Read the lessons and play again.\")\n",
        "sampleRun": "❓ Welcome to the Python Quiz!\nWhat's your name? Mia\n\nQuestion 1: What does print() do?\n  a) Prints on paper\n  b) Shows text on the screen\n  c) Deletes your code\nYour answer (a, b or c): b\n✅ Correct!\n\nQuestion 2: What is 7 % 2 in Python?\n  a) 1\n  b) 3.5\n  c) 14\nYour answer (a, b or c): a\n✅ Correct!\n\nQuestion 3: Which brackets make a list?\n  a) ( )\n  b) { }\n  c) [ ]\nYour answer (a, b or c): b\n❌ Not quite. The answer was c\n\nQuestion 4: What does len('cat') give you?\n  a) 1\n  b) 3\n  c) 'cat'\nYour answer (a, b or c): B\n✅ Correct!\n\nMia, you scored 3 out of 4\n👍 Great job! Keep practising.",
        "challenges": [
            "Write five new questions about your favourite subject and replace the Python ones.",
            "Add a \"points\" key to each question so harder questions are worth 2 points.",
            "Use random.shuffle(questions) at the start so the questions come in a different order every game.",
            "Give the player a second try when they get a question wrong, for half a point."
        ],
        "relatedTopics": [
            "dictionaries",
            "lists",
            "loops",
            "if-else",
            "strings"
        ]
    },
    {
        "slug": "chatbot",
        "emoji": "🤖",
        "title": "Chatbot",
        "level": "Intermediate",
        "description": "Build Pybot, a friendly chatbot that remembers your name, answers questions and tells jokes.",
        "skills": [
            "Functions",
            "Strings",
            "if / elif / else",
            "while loops",
            "random.choice()"
        ],
        "time": "about 30 minutes",
        "intro": [
            "Chatbots are programs that you can talk to by typing. Big chatbots use huge amounts of data, but you can build a fun one with just a few lines of Python. In this project you will create Pybot, a cheerful little robot that asks your name, chats with you, and tells terrible computer jokes.",
            "Pybot works by looking for keywords. If your message contains the word \"joke\", Pybot tells a joke. If it contains \"how are you\", Pybot tells you how it feels. This is how many early chatbots worked, and it is a brilliant way to practise working with strings and making decisions.",
            "You will put all of Pybot's thinking inside a function called get_reply(). That keeps your code tidy: the main loop only has to read the message and print the reply, while the function does the hard work. Once it is working, you can give Pybot its own personality!"
        ],
        "steps": [
            {
                "title": "Say hello and learn the player's name",
                "explanation": "Pybot starts by introducing itself and asking for your name. We store the answer in a variable called name so Pybot can use it later. Joining strings with + lets us build a personal greeting.",
                "code": "print(\"🤖 Hi! I'm Pybot, a tiny chatbot.\")\nname = input(\"What's your name? \")\nprint(\"Nice to meet you, \" + name + \"!\")\n",
                "output": "🤖 Hi! I'm Pybot, a tiny chatbot.\nWhat's your name? Leo\nNice to meet you, Leo!"
            },
            {
                "title": "Create a reply function",
                "explanation": "get_reply() takes the player's message and returns Pybot's answer. The in keyword checks whether one string appears inside another, so \"hello\" in message is True for \"hello there\" too. If no rule matches, the else gives a default reply.",
                "code": "def get_reply(message):\n    if \"hello\" in message:\n        return \"Hello to you too! 😊\"\n    else:\n        return \"Hmm, I don't understand that yet.\"\n\nprint(get_reply(\"hello there\"))\nprint(get_reply(\"what is a banana?\"))\n",
                "output": "Hello to you too! 😊\nHmm, I don't understand that yet."
            },
            {
                "title": "Teach Pybot more answers",
                "explanation": "Each elif is a new thing Pybot understands. We use message.lower() first so that \"HELLO\" and \"Hello\" both match \"hello\". We also pass in the player's name so Pybot can use it in its answers.",
                "code": "def get_reply(message, name):\n    message = message.lower()\n    if \"hello\" in message or message == \"hi\":\n        return \"Hello again, \" + name + \"! 😊\"\n    elif \"how are you\" in message:\n        return \"I'm feeling electric! ⚡ Thanks for asking.\"\n    elif \"your name\" in message:\n        return \"My name is Pybot. I live inside your computer!\"\n    else:\n        return \"Hmm, I don't understand that yet. Try asking for a joke!\"\n\nprint(get_reply(\"How are you?\", \"Leo\"))\nprint(get_reply(\"HELLO\", \"Leo\"))\n",
                "output": "I'm feeling electric! ⚡ Thanks for asking.\nHello again, Leo! 😊"
            },
            {
                "title": "Add random jokes",
                "explanation": "We store some jokes in a list. random.choice() picks one item from a list at random, so Pybot tells a different joke each time. Add this list near the top of your program, then add the joke rule to get_reply().",
                "code": "import random\n\njokes = [\n    \"Why do programmers prefer dark mode? Because light attracts bugs! 🐛\",\n    \"Why was the computer cold? It left its Windows open! 🥶\",\n    \"What do you call a snake that does maths? A Py-thon! 🐍\"\n]\n\nprint(random.choice(jokes))\n",
                "output": "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
                "note": "Your joke might be different, because random.choice() picks one at random!"
            },
            {
                "title": "Chat in a loop until the player says bye",
                "explanation": "A conversation goes back and forth, so we use while True: to keep chatting. Each time round, we read a message. If it is \"bye\", Pybot says goodbye and break ends the loop; otherwise we print Pybot's reply and the loop starts again.",
                "code": "name = \"Leo\"\n\nwhile True:\n    message = input(name + \": \")\n\n    if message.lower() == \"bye\":\n        print(\"Pybot: Goodbye, \" + name + \"! Come back soon! 👋\")\n        break\n\n    print(\"Pybot: You said\", message)\n",
                "output": "Leo: hello\nPybot: You said hello\nLeo: Bye\nPybot: Goodbye, Leo! Come back soon! 👋"
            }
        ],
        "fullCode": "import random\n\njokes = [\n    \"Why do programmers prefer dark mode? Because light attracts bugs! 🐛\",\n    \"Why was the computer cold? It left its Windows open! 🥶\",\n    \"What do you call a snake that does maths? A Py-thon! 🐍\"\n]\n\ndef get_reply(message, name):\n    message = message.lower()\n    if \"hello\" in message or message == \"hi\":\n        return \"Hello again, \" + name + \"! 😊\"\n    elif \"how are you\" in message:\n        return \"I'm feeling electric! ⚡ Thanks for asking.\"\n    elif \"your name\" in message:\n        return \"My name is Pybot. I live inside your computer!\"\n    elif \"joke\" in message:\n        return random.choice(jokes)\n    elif \"colour\" in message or \"color\" in message:\n        return \"My favourite colour is Python blue! 💙\"\n    else:\n        return \"Hmm, I don't understand that yet. Try asking for a joke!\"\n\nprint(\"🤖 Hi! I'm Pybot, a tiny chatbot.\")\nname = input(\"What's your name? \")\nprint(\"Nice to meet you, \" + name + \"!\")\nprint(\"Type bye when you want to stop chatting.\")\n\nwhile True:\n    message = input(name + \": \")\n\n    if message.lower() == \"bye\":\n        print(\"Pybot: Goodbye, \" + name + \"! Come back soon! 👋\")\n        break\n\n    print(\"Pybot:\", get_reply(message, name))\n",
        "sampleRun": "🤖 Hi! I'm Pybot, a tiny chatbot.\nWhat's your name? Leo\nNice to meet you, Leo!\nType bye when you want to stop chatting.\nLeo: hi\nPybot: Hello again, Leo! 😊\nLeo: What is your name?\nPybot: My name is Pybot. I live inside your computer!\nLeo: tell me a joke\nPybot: Why do programmers prefer dark mode? Because light attracts bugs! 🐛\nLeo: What's your favourite colour?\nPybot: My favourite colour is Python blue! 💙\nLeo: Can you fly?\nPybot: Hmm, I don't understand that yet. Try asking for a joke!\nLeo: bye\nPybot: Goodbye, Leo! Come back soon! 👋",
        "challenges": [
            "Teach Pybot three new topics, like your favourite food, sport or animal.",
            "Make a list of different greetings and use random.choice() so Pybot says hello in a new way each time.",
            "Count how many messages the player sent and have Pybot mention it when saying goodbye.",
            "If the player says \"I'm sad\", have Pybot cheer them up with a kind message or a joke."
        ],
        "relatedTopics": [
            "strings",
            "functions",
            "if-else",
            "loop-control",
            "random-modules"
        ]
    },
    {
        "slug": "python-adventure",
        "emoji": "🐍",
        "title": "Python Adventure",
        "level": "Intermediate",
        "description": "Create a text-based adventure game where the player explores, collects items and makes choices to find the treasure.",
        "skills": [
            "Functions",
            "Lists",
            "while loops",
            "if / elif / else",
            "return values"
        ],
        "time": "about 30 minutes",
        "intro": [
            "Long before games had fancy graphics, people played text adventures. The computer describes where you are, you type what you want to do, and the story changes depending on your choices. In this project you will write your own adventure where a hero explores a forest, a river and a mysterious cave, searching for the legendary Python Gem.",
            "Each place in the game will be its own function. When the player finishes in one place, the function returns the name of the next place to go. A loop at the bottom of the program keeps calling the right function until the adventure is over. This is a powerful pattern that real game programmers use!",
            "You will also give the hero an inventory, which is a list of items they are carrying. Finding a key at the river changes what happens in the cave. That means the player has to explore and think, which makes the game much more fun than just picking a path."
        ],
        "steps": [
            {
                "title": "Welcome the hero",
                "explanation": "Every adventure needs a hero! We ask the player to name their character and store it in a variable called hero. We will use that name again at the end of the game.",
                "code": "print(\"🐍 Welcome to Python Adventure!\")\nhero = input(\"What is your hero's name? \")\nprint(\"Good luck, \" + hero + \"! Find the treasure hidden in the forest.\")\n",
                "output": "🐍 Welcome to Python Adventure!\nWhat is your hero's name? Zara\nGood luck, Zara! Find the treasure hidden in the forest."
            },
            {
                "title": "Build the first place as a function",
                "explanation": "The forest is a function that describes the scene and asks which way to go. Instead of printing where to go next, it returns the name of the next place. If the player types something unexpected, we return \"forest\" so they get another chance.",
                "code": "def forest():\n    print()\n    print(\"🌲 You are in a dark, whispering forest.\")\n    print(\"A path goes left to a river. Another goes right to a cave.\")\n    choice = input(\"Which way? (left/right) \").lower()\n    if choice == \"left\":\n        return \"river\"\n    elif choice == \"right\":\n        return \"cave\"\n    else:\n        print(\"You spin in a circle. Let's try that again!\")\n        return \"forest\"\n\nnext_place = forest()\nprint(\"Next you go to the\", next_place)\n",
                "output": "\n🌲 You are in a dark, whispering forest.\nA path goes left to a river. Another goes right to a cave.\nWhich way? (left/right) left\nNext you go to the river"
            },
            {
                "title": "Collect items in an inventory",
                "explanation": "The inventory is a list that starts empty. At the river, the player can pick up a golden key, and .append() adds it to the list. We check if \"key\" in inventory first so the player can't collect the same key twice.",
                "code": "inventory = []\n\ndef river():\n    print()\n    print(\"🌊 You reach a sparkling river.\")\n    if \"key\" in inventory:\n        print(\"The water is calm. There is nothing else here.\")\n    else:\n        print(\"Something shiny is glinting in the water!\")\n        choice = input(\"Do you pick it up? (yes/no) \").lower()\n        if choice == \"yes\":\n            print(\"You found a golden key! 🔑\")\n            inventory.append(\"key\")\n        else:\n            print(\"You leave it where it is.\")\n    print(\"You walk back to the forest.\")\n    return \"forest\"\n\nriver()\nprint(\"Inventory:\", inventory)\n",
                "output": "\n🌊 You reach a sparkling river.\nSomething shiny is glinting in the water!\nDo you pick it up? (yes/no) yes\nYou found a golden key! 🔑\nYou walk back to the forest.\nInventory: ['key']"
            },
            {
                "title": "Use the item to win",
                "explanation": "In the cave there is a locked chest. If the key is in the inventory, the chest opens and the function returns \"end\" to finish the game. If not, the player is sent back to the forest to keep exploring.",
                "code": "inventory = [\"key\"]\n\ndef cave():\n    print()\n    print(\"🦇 You enter a cave. A huge locked chest sits in the middle.\")\n    if \"key\" in inventory:\n        print(\"You use the golden key... the chest creaks open!\")\n        print(\"💎 Inside is the legendary Python Gem. You win!\")\n        return \"end\"\n    else:\n        print(\"The chest is locked. Maybe something nearby can open it?\")\n        return \"forest\"\n\nprint(cave())\n",
                "output": "\n🦇 You enter a cave. A huge locked chest sits in the middle.\nYou use the golden key... the chest creaks open!\n💎 Inside is the legendary Python Gem. You win!\nend"
            },
            {
                "title": "Connect the places with a game loop",
                "explanation": "The variable place remembers where the hero is right now. The while loop keeps running until place becomes \"end\". Each time round, we call the function for the current place and store the place it returns, which moves the hero around the map.",
                "code": "place = \"forest\"\n\nwhile place != \"end\":\n    if place == \"forest\":\n        place = forest()\n    elif place == \"river\":\n        place = river()\n    elif place == \"cave\":\n        place = cave()\n",
                "partial": true
            },
            {
                "title": "Count the moves and celebrate",
                "explanation": "Let's add a moves counter that goes up by 1 every time the loop runs. When the hero wins, we print a victory message with their name and the number of moves. Can you find the treasure in fewer moves next time?",
                "code": "moves = 0\n\n# ...inside the while loop:\nmoves = moves + 1\n\n# ...after the loop:\nprint(\"🏆 Well done, \" + hero + \"! You finished in\", moves, \"moves.\")\n",
                "partial": true
            }
        ],
        "fullCode": "inventory = []\n\ndef forest():\n    print()\n    print(\"🌲 You are in a dark, whispering forest.\")\n    print(\"A path goes left to a river. Another goes right to a cave.\")\n    choice = input(\"Which way? (left/right) \").lower()\n    if choice == \"left\":\n        return \"river\"\n    elif choice == \"right\":\n        return \"cave\"\n    else:\n        print(\"You spin in a circle. Let's try that again!\")\n        return \"forest\"\n\ndef river():\n    print()\n    print(\"🌊 You reach a sparkling river.\")\n    if \"key\" in inventory:\n        print(\"The water is calm. There is nothing else here.\")\n    else:\n        print(\"Something shiny is glinting in the water!\")\n        choice = input(\"Do you pick it up? (yes/no) \").lower()\n        if choice == \"yes\":\n            print(\"You found a golden key! 🔑\")\n            inventory.append(\"key\")\n        else:\n            print(\"You leave it where it is.\")\n    print(\"You walk back to the forest.\")\n    return \"forest\"\n\ndef cave():\n    print()\n    print(\"🦇 You enter a cave. A huge locked chest sits in the middle.\")\n    if \"key\" in inventory:\n        print(\"You use the golden key... the chest creaks open!\")\n        print(\"💎 Inside is the legendary Python Gem. You win!\")\n        return \"end\"\n    else:\n        print(\"The chest is locked. Maybe something nearby can open it?\")\n        return \"forest\"\n\nprint(\"🐍 Welcome to Python Adventure!\")\nhero = input(\"What is your hero's name? \")\nprint(\"Good luck, \" + hero + \"! Find the treasure hidden in the forest.\")\n\nplace = \"forest\"\nmoves = 0\n\nwhile place != \"end\":\n    moves = moves + 1\n    if place == \"forest\":\n        place = forest()\n    elif place == \"river\":\n        place = river()\n    elif place == \"cave\":\n        place = cave()\n\nprint()\nprint(\"🏆 Well done, \" + hero + \"! You finished in\", moves, \"moves.\")\n",
        "sampleRun": "🐍 Welcome to Python Adventure!\nWhat is your hero's name? Zara\nGood luck, Zara! Find the treasure hidden in the forest.\n\n🌲 You are in a dark, whispering forest.\nA path goes left to a river. Another goes right to a cave.\nWhich way? (left/right) right\n\n🦇 You enter a cave. A huge locked chest sits in the middle.\nThe chest is locked. Maybe something nearby can open it?\n\n🌲 You are in a dark, whispering forest.\nA path goes left to a river. Another goes right to a cave.\nWhich way? (left/right) left\n\n🌊 You reach a sparkling river.\nSomething shiny is glinting in the water!\nDo you pick it up? (yes/no) yes\nYou found a golden key! 🔑\nYou walk back to the forest.\n\n🌲 You are in a dark, whispering forest.\nA path goes left to a river. Another goes right to a cave.\nWhich way? (left/right) right\n\n🦇 You enter a cave. A huge locked chest sits in the middle.\nYou use the golden key... the chest creaks open!\n💎 Inside is the legendary Python Gem. You win!\n\n🏆 Well done, Zara! You finished in 6 moves.",
        "challenges": [
            "Add a new place, like a mountain or a castle, with its own function and its own choices.",
            "Put a sleeping dragon in the cave that only lets you pass if you are carrying a \"cookie\" from somewhere else.",
            "Give the hero 3 lives. Wrong choices cost a life, and the game ends if lives reaches 0.",
            "Print the inventory every time the hero arrives back in the forest."
        ],
        "relatedTopics": [
            "functions",
            "lists",
            "loops",
            "if-else",
            "user-input"
        ]
    },
    {
        "slug": "times-table-trainer",
        "emoji": "✖️",
        "title": "Times Table Trainer",
        "level": "Beginner",
        "description": "Print any times table, then take a 5-question quiz with random questions and get a score at the end.",
        "skills": [
            "for loops",
            "range()",
            "input()",
            "random",
            "if / elif / else"
        ],
        "time": "about 30 minutes",
        "intro": [
            "Learning your times tables takes practice, so why not build a program to help? In this project you will make a Times Table Trainer. The player chooses a table, like the 7 times table, and the program prints the whole thing. Then it switches into quiz mode and asks five random questions to test their memory.",
            "This project shows off one of the things computers do best: repeating work without getting tired. A for loop with range() can print a whole times table in just two lines of code, and it would be just as easy to print the 1000 times table!",
            "You will also use the random module to make every quiz different, keep a score with a variable, and give the player an encouraging message at the end. It is a program you can actually use for your homework, and a great one to share with younger brothers or sisters."
        ],
        "steps": [
            {
                "title": "Choose a times table",
                "explanation": "We ask the player which times table they want to practise. input() gives back text, so we use int() to turn it into a whole number we can multiply with.",
                "code": "print(\"✖️ Times Table Trainer\")\ntable = int(input(\"Which times table do you want to practise? \"))\nprint(\"Great choice! Let's practise the\", table, \"times table.\")\n",
                "output": "✖️ Times Table Trainer\nWhich times table do you want to practise? 7\nGreat choice! Let's practise the 7 times table."
            },
            {
                "title": "Print the whole table with a loop",
                "explanation": "range(1, 11) gives us the numbers 1 to 10, because the last number is never included. The for loop runs once for each number, and we print a line like 7 x 3 = 21. The * sign does the multiplying.",
                "code": "table = 7\n\nfor number in range(1, 11):\n    print(table, \"x\", number, \"=\", table * number)\n",
                "output": "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70"
            },
            {
                "title": "Ask a random question",
                "explanation": "random.randint(1, 10) picks a number from 1 to 10. We build the question as a string by joining pieces with +, using str() to turn the numbers into text. Then we ask it with input().",
                "code": "import random\n\ntable = 7\nnumber = random.randint(1, 10)\n\nquestion_text = \"What is \" + str(table) + \" x \" + str(number) + \"? \"\nanswer = int(input(question_text))\nprint(\"You answered\", answer)\n",
                "output": "What is 7 x 8? 56\nYou answered 56"
            },
            {
                "title": "Check the answer",
                "explanation": "The right answer is table * number. If the player's answer matches it, we cheer. If not, we kindly tell them the correct answer, because seeing the right answer helps you remember it next time.",
                "code": "import random\n\ntable = 7\nnumber = random.randint(1, 10)\nanswer = int(input(\"What is \" + str(table) + \" x \" + str(number) + \"? \"))\n\nif answer == table * number:\n    print(\"✅ Correct!\")\nelse:\n    print(\"❌ Oops! It's\", table * number)\n",
                "output": "What is 7 x 8? 56\n✅ Correct!"
            },
            {
                "title": "Ask five questions and keep score",
                "explanation": "We wrap the question in a for loop that runs 5 times with range(1, 6). The loop variable question tells us which question we are on, so we can show it in the prompt. Every correct answer adds 1 to score.",
                "code": "import random\n\ntable = 7\nscore = 0\n\nfor question in range(1, 6):\n    number = random.randint(1, 10)\n    question_text = \"Question \" + str(question) + \": What is \" + str(table) + \" x \" + str(number) + \"? \"\n    answer = int(input(question_text))\n\n    if answer == table * number:\n        print(\"✅ Correct!\")\n        score = score + 1\n    else:\n        print(\"❌ Oops! It's\", table * number)\n\nprint(\"You scored\", score, \"out of 5.\")\n",
                "output": "Question 1: What is 7 x 8? 56\n✅ Correct!\nQuestion 2: What is 7 x 9? 63\n✅ Correct!\nQuestion 3: What is 7 x 8? 57\n❌ Oops! It's 56\nQuestion 4: What is 7 x 8? 56\n✅ Correct!\nQuestion 5: What is 7 x 9? 63\n✅ Correct!\nYou scored 4 out of 5."
            },
            {
                "title": "Finish with an encouraging message",
                "explanation": "Different scores deserve different messages. We use if, elif and else to choose one: a big celebration for 5, praise for 3 or more, and encouragement for everyone else. Learning is all about practice!",
                "code": "score = 4\n\nif score == 5:\n    print(\"🌟 Perfect! You're a times table champion!\")\nelif score >= 3:\n    print(\"👏 Great work! A little more practice and you'll be perfect.\")\nelse:\n    print(\"💪 Keep practising, you'll get there!\")\n",
                "output": "👏 Great work! A little more practice and you'll be perfect."
            }
        ],
        "fullCode": "import random\n\nprint(\"✖️ Times Table Trainer\")\ntable = int(input(\"Which times table do you want to practise? \"))\n\nprint()\nprint(\"Here is the\", table, \"times table:\")\nfor number in range(1, 11):\n    print(table, \"x\", number, \"=\", table * number)\n\nprint()\nprint(\"Now it's quiz time! 5 questions.\")\nscore = 0\n\nfor question in range(1, 6):\n    number = random.randint(1, 10)\n    question_text = \"Question \" + str(question) + \": What is \" + str(table) + \" x \" + str(number) + \"? \"\n    answer = int(input(question_text))\n\n    if answer == table * number:\n        print(\"✅ Correct!\")\n        score = score + 1\n    else:\n        print(\"❌ Oops! It's\", table * number)\n\nprint()\nprint(\"You scored\", score, \"out of 5.\")\n\nif score == 5:\n    print(\"🌟 Perfect! You're a times table champion!\")\nelif score >= 3:\n    print(\"👏 Great work! A little more practice and you'll be perfect.\")\nelse:\n    print(\"💪 Keep practising, you'll get there!\")\n",
        "sampleRun": "✖️ Times Table Trainer\nWhich times table do you want to practise? 7\n\nHere is the 7 times table:\n7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70\n\nNow it's quiz time! 5 questions.\nQuestion 1: What is 7 x 8? 56\n✅ Correct!\nQuestion 2: What is 7 x 9? 63\n✅ Correct!\nQuestion 3: What is 7 x 8? 57\n❌ Oops! It's 56\nQuestion 4: What is 7 x 8? 56\n✅ Correct!\nQuestion 5: What is 7 x 9? 63\n✅ Correct!\n\nYou scored 4 out of 5.\n👏 Great work! A little more practice and you'll be perfect.",
        "challenges": [
            "Let the player choose how many questions they want instead of always asking 5.",
            "Ask questions from a random times table each time, using a second random.randint().",
            "Add a while loop so the player keeps answering a question until they get it right.",
            "Make a \"speed round\" for the 12 times table, with numbers from 1 to 12."
        ],
        "relatedTopics": [
            "loops",
            "operators",
            "user-input",
            "if-else",
            "random-modules"
        ]
    },
    {
        "slug": "rock-paper-scissors",
        "emoji": "✊",
        "title": "Rock, Paper, Scissors",
        "level": "Beginner",
        "description": "Play the classic hand game against the computer. First to 3 points wins the match!",
        "skills": [
            "Lists",
            "Dictionaries",
            "random.choice()",
            "while loops",
            "continue"
        ],
        "time": "about 30 minutes",
        "intro": [
            "Rock, Paper, Scissors is one of the most famous games in the world. Rock smashes scissors, scissors cut paper, and paper wraps rock. In this project you will teach Python to play it against you. The computer makes its choice at random, so it can't cheat, and the first player to reach 3 points wins the match.",
            "The tricky part of this game is working out who wins each round. You could write a long list of if statements, but there is a neater way: a dictionary that remembers what each choice beats. One short line of code can then decide the winner. You will see how picking the right way to store information can make a program much simpler.",
            "You will also use random.choice() to let the computer choose, a while loop to keep the match going, and the continue command to ignore choices that aren't allowed. By the end you will have a game you can play again and again."
        ],
        "steps": [
            {
                "title": "Let the computer choose",
                "explanation": "We put the three choices in a list. random.choice() picks one item from the list at random, just like closing your eyes and pointing. Run it a few times and you'll see different answers.",
                "code": "import random\n\nchoices = [\"rock\", \"paper\", \"scissors\"]\ncomputer = random.choice(choices)\nprint(\"Computer chose\", computer)\n",
                "output": "Computer chose scissors",
                "note": "The computer's choice is random, so yours may be different!"
            },
            {
                "title": "Ask for the player's choice",
                "explanation": "We ask the player to type rock, paper or scissors. .lower() turns it into small letters so that \"Rock\" still counts. Then we check that the answer is actually in the list of choices.",
                "code": "choices = [\"rock\", \"paper\", \"scissors\"]\n\nplayer = input(\"rock, paper or scissors? \").lower()\n\nif player in choices:\n    print(\"You chose\", player)\nelse:\n    print(\"That's not a choice!\")\n",
                "output": "rock, paper or scissors? Rock\nYou chose rock"
            },
            {
                "title": "Use a dictionary to decide the winner",
                "explanation": "This dictionary says what each choice beats: rock beats scissors, paper beats rock, and scissors beat paper. So wins_against[player] tells us which choice the player can beat. If that is what the computer picked, the player wins!",
                "code": "wins_against = {\"rock\": \"scissors\", \"paper\": \"rock\", \"scissors\": \"paper\"}\n\nplayer = \"paper\"\ncomputer = \"rock\"\n\nif player == computer:\n    print(\"It's a tie! 🤝\")\nelif wins_against[player] == computer:\n    print(\"You win this round! 🎉\")\nelse:\n    print(\"Computer wins this round! 🤖\")\n",
                "output": "You win this round! 🎉"
            },
            {
                "title": "Keep score",
                "explanation": "We need two score variables, one for the player and one for the computer. Whoever wins the round gets 1 point added to their score. After every round we print the scores so everyone knows who is ahead.",
                "code": "player_score = 0\ncomputer_score = 0\n\n# ...when the player wins a round:\nplayer_score = player_score + 1\n\n# ...when the computer wins a round:\ncomputer_score = computer_score + 1\n\nprint(\"Score - You:\", player_score, \" Computer:\", computer_score)\n",
                "partial": true
            },
            {
                "title": "Play until someone gets 3 points",
                "explanation": "The while loop keeps playing rounds while both scores are less than 3. If the player types something that isn't allowed, continue skips the rest of the loop and jumps straight back to the top to ask again, so the computer doesn't get a free turn.",
                "code": "while player_score < 3 and computer_score < 3:\n    player = input(\"rock, paper or scissors? \").lower()\n\n    if player not in choices:\n        print(\"That's not a choice! Try again.\")\n        continue\n\n    # ...the computer chooses and we decide the winner...\n",
                "partial": true
            },
            {
                "title": "Announce the champion",
                "explanation": "When the loop ends, one player has reached 3 points. We only need to check one score to know who won the match. Then we print a message for the winner.",
                "code": "player_score = 3\ncomputer_score = 1\n\nif player_score == 3:\n    print(\"🏆 You won the match!\")\nelse:\n    print(\"💻 The computer won the match. Play again for a rematch!\")\n",
                "output": "🏆 You won the match!"
            }
        ],
        "fullCode": "import random\n\nchoices = [\"rock\", \"paper\", \"scissors\"]\nwins_against = {\"rock\": \"scissors\", \"paper\": \"rock\", \"scissors\": \"paper\"}\n\nplayer_score = 0\ncomputer_score = 0\n\nprint(\"✊✋✌️ Rock, Paper, Scissors!\")\nprint(\"First to 3 points wins the match.\")\n\nwhile player_score < 3 and computer_score < 3:\n    print()\n    player = input(\"rock, paper or scissors? \").lower()\n\n    if player not in choices:\n        print(\"That's not a choice! Try again.\")\n        continue\n\n    computer = random.choice(choices)\n    print(\"Computer chose\", computer)\n\n    if player == computer:\n        print(\"It's a tie! 🤝\")\n    elif wins_against[player] == computer:\n        print(\"You win this round! 🎉\")\n        player_score = player_score + 1\n    else:\n        print(\"Computer wins this round! 🤖\")\n        computer_score = computer_score + 1\n\n    print(\"Score - You:\", player_score, \" Computer:\", computer_score)\n\nprint()\nif player_score == 3:\n    print(\"🏆 You won the match!\")\nelse:\n    print(\"💻 The computer won the match. Play again for a rematch!\")\n",
        "sampleRun": "✊✋✌️ Rock, Paper, Scissors!\nFirst to 3 points wins the match.\n\nrock, paper or scissors? rock\nComputer chose scissors\nYou win this round! 🎉\nScore - You: 1  Computer: 0\n\nrock, paper or scissors? Paper\nComputer chose paper\nIt's a tie! 🤝\nScore - You: 1  Computer: 0\n\nrock, paper or scissors? banana\nThat's not a choice! Try again.\n\nrock, paper or scissors? scissors\nComputer chose scissors\nIt's a tie! 🤝\nScore - You: 1  Computer: 0\n\nrock, paper or scissors? paper\nComputer chose paper\nIt's a tie! 🤝\nScore - You: 1  Computer: 0\n\nrock, paper or scissors? rock\nComputer chose scissors\nYou win this round! 🎉\nScore - You: 2  Computer: 0\n\nrock, paper or scissors? scissors\nComputer chose scissors\nIt's a tie! 🤝\nScore - You: 2  Computer: 0\n\nrock, paper or scissors? paper\nComputer chose scissors\nComputer wins this round! 🤖\nScore - You: 2  Computer: 1\n\nrock, paper or scissors? rock\nComputer chose scissors\nYou win this round! 🎉\nScore - You: 3  Computer: 1\n\n🏆 You won the match!",
        "challenges": [
            "Add lizard and spock to make the game \"Rock, Paper, Scissors, Lizard, Spock\". Each choice now beats two others, so try storing a list in the dictionary.",
            "Let the player choose how many points are needed to win the match.",
            "Let the player type r, p or s as a shortcut for rock, paper or scissors.",
            "Keep track of how many ties there were and print it at the end."
        ],
        "relatedTopics": [
            "random-modules",
            "dictionaries",
            "loops",
            "loop-control",
            "if-else"
        ]
    }
];

export default projectData;
