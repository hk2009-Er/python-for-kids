// Code Runner "predict the output" challenges.
// Every correct option was verified by running the snippet with Python 3.
// `answer` is the index of the correct option (the game also reshuffles options at runtime).

const runnerChallenges = [
    {
        "topic": "print",
        "code": "print(\"Hi\" * 3)",
        "options": [
            "Hi 3",
            "HiHiHi",
            "Hi Hi Hi"
        ],
        "answer": 1,
        "explanation": "Multiplying a string repeats it, with no spaces added."
    },
    {
        "topic": "print",
        "code": "print(\"3\" + \"4\")",
        "options": [
            "3 + 4",
            "7",
            "34"
        ],
        "answer": 2,
        "explanation": "\"3\" and \"4\" are strings, so + glues them together."
    },
    {
        "topic": "print",
        "code": "print(\"cat\", \"dog\")",
        "options": [
            "catdog",
            "cat, dog",
            "cat dog"
        ],
        "answer": 2,
        "explanation": "print puts a space between items separated by commas."
    },
    {
        "topic": "print",
        "code": "print(5 > 3)",
        "options": [
            "False",
            "5",
            "True"
        ],
        "answer": 2,
        "explanation": "5 is greater than 3, so the comparison is True."
    },
    {
        "topic": "math",
        "code": "print(7 // 2)",
        "options": [
            "3.5",
            "3",
            "4"
        ],
        "answer": 1,
        "explanation": "// is floor division: it drops the decimal part."
    },
    {
        "topic": "math",
        "code": "print(7 % 3)",
        "options": [
            "1",
            "2",
            "2.33"
        ],
        "answer": 0,
        "explanation": "% gives the remainder: 7 = 3 * 2 + 1."
    },
    {
        "topic": "math",
        "code": "print(2 ** 3)",
        "options": [
            "6",
            "9",
            "8"
        ],
        "answer": 2,
        "explanation": "** means power: 2 * 2 * 2 = 8."
    },
    {
        "topic": "math",
        "code": "print(10 / 4)",
        "options": [
            "2",
            "2.0",
            "2.5"
        ],
        "answer": 2,
        "explanation": "/ always gives a decimal (float) answer."
    },
    {
        "topic": "math",
        "code": "print(3 + 4 * 2)",
        "options": [
            "14",
            "10",
            "11"
        ],
        "answer": 2,
        "explanation": "Multiplication happens before addition: 3 + 8 = 11."
    },
    {
        "topic": "math",
        "code": "print(17 % 5 + 17 // 5)",
        "options": [
            "2",
            "5",
            "3"
        ],
        "answer": 1,
        "explanation": "17 % 5 is 2 and 17 // 5 is 3, so 2 + 3 = 5."
    },
    {
        "topic": "math",
        "code": "print(10 / 2)",
        "options": [
            "5.0",
            "5",
            "2"
        ],
        "answer": 0,
        "explanation": "/ always makes a float, so 10 / 2 is 5.0."
    },
    {
        "topic": "variables",
        "code": "x = 5\nx = x + 3\nprint(x)",
        "options": [
            "x + 3",
            "5",
            "8"
        ],
        "answer": 2,
        "explanation": "x starts at 5, then becomes 5 + 3."
    },
    {
        "topic": "variables",
        "code": "a = 3\nb = a\na = 10\nprint(b)",
        "options": [
            "3",
            "10",
            "13"
        ],
        "answer": 0,
        "explanation": "b copied the value 3; changing a later doesn't change b."
    },
    {
        "topic": "variables",
        "code": "x = 10\nx += 5\nx -= 3\nprint(x)",
        "options": [
            "10",
            "18",
            "12"
        ],
        "answer": 2,
        "explanation": "10 + 5 = 15, then 15 - 3 = 12."
    },
    {
        "topic": "variables",
        "code": "score = 4\nscore = score * 2\nprint(score)",
        "options": [
            "8",
            "4",
            "6"
        ],
        "answer": 0,
        "explanation": "score is doubled from 4 to 8."
    },
    {
        "topic": "strings",
        "code": "print(len(\"python\"))",
        "options": [
            "6",
            "7",
            "5"
        ],
        "answer": 0,
        "explanation": "p-y-t-h-o-n has 6 letters."
    },
    {
        "topic": "strings",
        "code": "print(len(\"hi there\"))",
        "options": [
            "7",
            "2",
            "8"
        ],
        "answer": 2,
        "explanation": "The space counts as a character too!"
    },
    {
        "topic": "strings",
        "code": "print(\"hello\".upper())",
        "options": [
            "hello",
            "HELLO",
            "Hello"
        ],
        "answer": 1,
        "explanation": ".upper() makes every letter a capital."
    },
    {
        "topic": "strings",
        "code": "word = \"banana\"\nprint(word[0])",
        "options": [
            "banana",
            "a",
            "b"
        ],
        "answer": 2,
        "explanation": "Indexes start at 0, so word[0] is the first letter."
    },
    {
        "topic": "strings",
        "code": "word = \"python\"\nprint(word[-1])",
        "options": [
            "o",
            "p",
            "n"
        ],
        "answer": 2,
        "explanation": "Index -1 means the last character."
    },
    {
        "topic": "strings",
        "code": "word = \"python\"\nprint(word[1:3])",
        "options": [
            "yt",
            "yth",
            "pyt"
        ],
        "answer": 0,
        "explanation": "Slicing [1:3] takes index 1 and 2, but stops before 3."
    },
    {
        "topic": "strings",
        "code": "print(\"Python\"[::-1])",
        "options": [
            "nohtP",
            "Python",
            "nohtyP"
        ],
        "answer": 2,
        "explanation": "[::-1] reads the string backwards."
    },
    {
        "topic": "strings",
        "code": "name = \"Sam\"\nage = 9\nprint(f\"{name} is {age}\")",
        "options": [
            "{name} is {age}",
            "Sam is 9",
            "name is age"
        ],
        "answer": 1,
        "explanation": "An f-string swaps {name} and {age} for their values."
    },
    {
        "topic": "strings",
        "code": "print(f\"{2 + 3} apples\")",
        "options": [
            "23 apples",
            "5 apples",
            "2 + 3 apples"
        ],
        "answer": 1,
        "explanation": "Code inside { } in an f-string is worked out first."
    },
    {
        "topic": "strings",
        "code": "s = \"ab\"\nprint(s * 2 + \"c\")",
        "options": [
            "ababc",
            "abc2",
            "abcabc"
        ],
        "answer": 0,
        "explanation": "s * 2 is \"abab\", then \"c\" is added on the end."
    },
    {
        "topic": "strings",
        "code": "word = \"hello\"\nprint(word.count(\"l\"))",
        "options": [
            "2",
            "1",
            "3"
        ],
        "answer": 0,
        "explanation": "\"hello\" has two l's."
    },
    {
        "topic": "if/else",
        "code": "x = 7\nif x > 5:\n    print(\"big\")\nelse:\n    print(\"small\")",
        "options": [
            "small",
            "big",
            "7"
        ],
        "answer": 1,
        "explanation": "7 > 5 is True, so the if block runs."
    },
    {
        "topic": "if/else",
        "code": "x = 4\nif x % 2 == 0:\n    print(\"even\")\nelse:\n    print(\"odd\")",
        "options": [
            "odd",
            "even",
            "0"
        ],
        "answer": 1,
        "explanation": "4 % 2 is 0, so 4 is even."
    },
    {
        "topic": "if/else",
        "code": "age = 10\nif age >= 13:\n    print(\"teen\")\nelif age >= 6:\n    print(\"kid\")",
        "options": [
            "teen",
            "baby",
            "kid"
        ],
        "answer": 2,
        "explanation": "10 is not >= 13, but it is >= 6, so the elif runs."
    },
    {
        "topic": "if/else",
        "code": "x = 3\nif x == 3 and x < 2:\n    print(\"yes\")\nelse:\n    print(\"no\")",
        "options": [
            "3",
            "no",
            "yes"
        ],
        "answer": 1,
        "explanation": "and needs BOTH sides True, but 3 < 2 is False."
    },
    {
        "topic": "if/else",
        "code": "temp = 30\nif temp > 25:\n    temp = temp - 10\nprint(temp)",
        "options": [
            "30",
            "25",
            "20"
        ],
        "answer": 2,
        "explanation": "30 > 25, so 10 is taken away before printing."
    },
    {
        "topic": "loops",
        "code": "total = 0\nfor i in range(4):\n    total += i\nprint(total)",
        "options": [
            "6",
            "4",
            "10"
        ],
        "answer": 0,
        "explanation": "range(4) is 0, 1, 2, 3 and they add up to 6."
    },
    {
        "topic": "loops",
        "code": "print(list(range(3)))",
        "options": [
            "[0, 1, 2]",
            "[0, 1, 2, 3]",
            "[1, 2, 3]"
        ],
        "answer": 0,
        "explanation": "range(3) starts at 0 and stops before 3."
    },
    {
        "topic": "loops",
        "code": "print(list(range(2, 8, 2)))",
        "options": [
            "[2, 3, 4, 5, 6, 7]",
            "[2, 4, 6, 8]",
            "[2, 4, 6]"
        ],
        "answer": 2,
        "explanation": "Count from 2 in steps of 2, stopping before 8."
    },
    {
        "topic": "loops",
        "code": "count = 0\nfor letter in \"cat\":\n    count += 1\nprint(count)",
        "options": [
            "cat",
            "3",
            "1"
        ],
        "answer": 1,
        "explanation": "The loop runs once for each of the 3 letters."
    },
    {
        "topic": "loops",
        "code": "n = 3\nwhile n > 0:\n    n -= 1\nprint(n)",
        "options": [
            "0",
            "-1",
            "1"
        ],
        "answer": 0,
        "explanation": "The loop stops as soon as n reaches 0."
    },
    {
        "topic": "loops",
        "code": "word = \"\"\nfor ch in \"abc\":\n    word = ch + word\nprint(word)",
        "options": [
            "abc",
            "cba",
            "a"
        ],
        "answer": 1,
        "explanation": "Each new letter is put in FRONT, so the word flips."
    },
    {
        "topic": "lists",
        "code": "nums = [10, 20, 30]\nprint(nums[1])",
        "options": [
            "10",
            "20",
            "30"
        ],
        "answer": 1,
        "explanation": "List indexes start at 0, so [1] is the second item."
    },
    {
        "topic": "lists",
        "code": "nums = [4, 5, 6]\nprint(len(nums))",
        "options": [
            "2",
            "3",
            "15"
        ],
        "answer": 1,
        "explanation": "len counts the items in the list: there are 3."
    },
    {
        "topic": "lists",
        "code": "pets = [\"cat\"]\npets.append(\"dog\")\nprint(pets)",
        "options": [
            "['cat']",
            "['dog', 'cat']",
            "['cat', 'dog']"
        ],
        "answer": 2,
        "explanation": ".append adds the new item to the END of the list."
    },
    {
        "topic": "lists",
        "code": "nums = [1, 2, 3]\nprint(nums[-1])",
        "options": [
            "3",
            "-1",
            "1"
        ],
        "answer": 0,
        "explanation": "Index -1 is the last item in the list."
    },
    {
        "topic": "lists",
        "code": "colors = [\"red\", \"blue\"]\ncolors[0] = \"green\"\nprint(colors)",
        "options": [
            "['red', 'green']",
            "['green', 'blue']",
            "['green', 'red', 'blue']"
        ],
        "answer": 1,
        "explanation": "colors[0] = ... replaces the first item."
    },
    {
        "topic": "lists",
        "code": "print(max([3, 9, 2]))",
        "options": [
            "9",
            "3",
            "2"
        ],
        "answer": 0,
        "explanation": "max finds the biggest number in the list."
    },
    {
        "topic": "lists",
        "code": "fruits = [\"apple\", \"kiwi\"]\nprint(len(fruits[1]))",
        "options": [
            "2",
            "5",
            "4"
        ],
        "answer": 2,
        "explanation": "fruits[1] is \"kiwi\", which has 4 letters."
    },
    {
        "topic": "dictionaries",
        "code": "pet = {\"name\": \"Rex\", \"age\": 3}\nprint(pet[\"name\"])",
        "options": [
            "3",
            "name",
            "Rex"
        ],
        "answer": 2,
        "explanation": "pet[\"name\"] looks up the value stored for the key \"name\"."
    },
    {
        "topic": "dictionaries",
        "code": "d = {\"a\": 1}\nd[\"b\"] = 2\nprint(len(d))",
        "options": [
            "2",
            "3",
            "1"
        ],
        "answer": 0,
        "explanation": "Adding key \"b\" gives the dictionary 2 keys."
    },
    {
        "topic": "dictionaries",
        "code": "scores = {\"Ann\": 5, \"Bo\": 8}\nprint(scores[\"Bo\"] + 1)",
        "options": [
            "6",
            "Bo1",
            "9"
        ],
        "answer": 2,
        "explanation": "scores[\"Bo\"] is 8, and 8 + 1 = 9."
    },
    {
        "topic": "dictionaries",
        "code": "stock = {\"apples\": 4}\nstock[\"apples\"] = 7\nprint(stock)",
        "options": [
            "{'apples': 7}",
            "{'apples': 4}",
            "{'apples': 11}"
        ],
        "answer": 0,
        "explanation": "Setting an existing key replaces its old value."
    },
    {
        "topic": "functions",
        "code": "def double(n):\n    return n * 2\n\nprint(double(4))",
        "options": [
            "16",
            "4",
            "8"
        ],
        "answer": 2,
        "explanation": "double returns 4 * 2 = 8."
    },
    {
        "topic": "functions",
        "code": "def greet(name):\n    return \"Hi \" + name\n\nprint(greet(\"Mia\"))",
        "options": [
            "Hi Mia",
            "Hi name",
            "HiMia"
        ],
        "answer": 0,
        "explanation": "The value \"Mia\" goes into name, then gets added to \"Hi \"."
    },
    {
        "topic": "functions",
        "code": "def add(a, b):\n    return a + b\n\nprint(add(2, 3) * 2)",
        "options": [
            "8",
            "7",
            "10"
        ],
        "answer": 2,
        "explanation": "add(2, 3) returns 5, then 5 * 2 = 10."
    },
    {
        "topic": "functions",
        "code": "def square(x):\n    return x ** 2\n\nprint(square(3) + 1)",
        "options": [
            "7",
            "16",
            "10"
        ],
        "answer": 2,
        "explanation": "square(3) is 9, then 9 + 1 = 10."
    }
];

export default runnerChallenges;
