export const testData = {
  javascript: {
    easy: [
      {
        id: 1,
        question: "What does 'var' declare in JavaScript?",
        options: ["A variable", "A function", "A constant", "An object"],
        answer: "A variable",
      },
      {
        id: 2,
        question: "Which method adds an element to the end of an array..?",
        options: ["shift()", "unshift()", "push()", "pop()"],
        answer: "push()",
      },
      {
        id: 3,
        question: "What is the correct way to write a comment in JavaScript..?",
        options: ["// Comment", "# Comment", "<!-- Comment -->", "-- Comment"],
        answer: "// Comment",
      },
      {
        id: 4,
        question: "Which keyword is used to declare a constant?",
        options: ["var", "let", "const", "static"],
        answer: "const",
      },
      {
        id: 5,
        question: "What does JSON stand for?",
        options: [
          "JavaScript Object Notation",
          "Java Source Object Notation",
          "JavaScript Online Notation",
          "Java Serialized Object Notation",
        ],
        answer: "JavaScript Object Notation",
      },
      {
        id: 6,
        question: "Which method removes the first element from an array?",
        options: ["pop()", "shift()", "splice()", "slice()"],
        answer: "shift()",
      },
      {
        id: 7,
        question: "What is the result of typeof undefined?",
        options: ["null", "undefined", "string", "number"],
        answer: "undefined",
      },
      {
        id: 8,
        question: "Which function is used to parse JSON?",
        options: [
          "JSON.parse()",
          "JSON.stringify()",
          "parse()",
          "JSON.decode()",
        ],
        answer: "JSON.parse()",
      },
      {
        id: 9,
        question:
          "What is the default value of a variable declared with 'var'?",
        options: ["null", "undefined", "0", "empty string"],
        answer: "undefined",
      },
      {
        id: 10,
        question: "How do you create a function in JavaScript?",
        options: [
          "function myFunc() {}",
          "func myFunc() {}",
          "def myFunc() {}",
          "create myFunc() {}",
        ],
        answer: "function myFunc() {}",
      },
    ],
    medium: [
      {
        id: 1,
        question: "What is closure in JavaScript?",
        options: [
          "A function that returns an object",
          "A function that has access to variables from another function",
          "A method to close loops",
          "An error handling mechanism",
        ],
        answer: "A function that has access to variables from another function",
      },
      {
        id: 2,
        question: "What does the 'this' keyword refer to?",
        options: [
          "The global object",
          "The object that the method belongs to",
          "The previous object",
          "The function itself",
        ],
        answer: "The object that the method belongs to",
      },
      {
        id: 3,
        question: "What is the difference between '==' and '==='?",
        options: [
          "'==' checks type, '===' does not",
          "'===' checks type, '==' does not",
          "Both are the same",
          "'==' is for strings, '===' is for numbers",
        ],
        answer: "'===' checks type, '==' does not",
      },
      {
        id: 4,
        question: "What is a callback function?",
        options: [
          "A function passed as an argument to another function",
          "A function that returns a callback",
          "A function that is called twice",
          "A function stored in memory",
        ],
        answer: "A function passed as an argument to another function",
      },
      {
        id: 5,
        question: "What is the purpose of 'async' and 'await'?",
        options: [
          "To handle asynchronous operations more cleanly",
          "To synchronize code execution",
          "To create parallel processes",
          "To delay function execution",
        ],
        answer: "To handle asynchronous operations more cleanly",
      },
      {
        id: 6,
        question: "What does the 'spread operator' (...) do?",
        options: [
          "Spreads array elements into individual arguments",
          "Creates a copy of an object",
          "Iterates through an array",
          "Both A and B",
        ],
        answer: "Both A and B",
      },
      {
        id: 7,
        question: "What is destructuring in JavaScript?",
        options: [
          "Breaking an object into individual variables",
          "Removing properties from an object",
          "Creating nested objects",
          "Deleting array elements",
        ],
        answer: "Breaking an object into individual variables",
      },
      {
        id: 8,
        question: "What is 'hoisting' in JavaScript?",
        options: [
          "Moving declarations to the top of the scope",
          "Lifting elements in the DOM",
          "Increasing variable values",
          "Creating new functions",
        ],
        answer: "Moving declarations to the top of the scope",
      },
      {
        id: 9,
        question: "What is the difference between 'let', 'const', and 'var'?",
        options: [
          "'var' is function-scoped, 'let' and 'const' are block-scoped",
          "All three are block-scoped",
          "'var' is global, others are local",
          "There is no difference",
        ],
        answer: "'var' is function-scoped, 'let' and 'const' are block-scoped",
      },
      {
        id: 10,
        question: "What is a Promise in JavaScript?",
        options: [
          "An object for handling asynchronous operations",
          "A guarantee that code will execute",
          "A way to store data",
          "A type of loop",
        ],
        answer: "An object for handling asynchronous operations",
      },
    ],
    hard: [
      {
        id: 1,
        question: "What is the difference between 'call', 'apply', and 'bind'?",
        options: [
          "'call' and 'apply' invoke immediately, 'bind' returns a new function",
          "All three are synonymous",
          "'apply' uses arrow functions only",
          "'call' works only with objects",
        ],
        answer:
          "'call' and 'apply' invoke immediately, 'bind' returns a new function",
      },
      {
        id: 2,
        question: "What is event delegation?",
        options: [
          "Attaching handlers to child elements instead of parent",
          "Attaching handlers to parent to handle child events",
          "Delegating events to another function",
          "Creating new event listeners",
        ],
        answer: "Attaching handlers to parent to handle child events",
      },
      {
        id: 3,
        question: "What is the event loop in JavaScript?",
        options: [
          "A mechanism that executes code, collects callbacks, and executes them",
          "A loop that repeats until an event fires",
          "An error in the code",
          "A function that never ends",
        ],
        answer:
          "A mechanism that executes code, collects callbacks, and executes them",
      },
      {
        id: 4,
        question: "What is a WeakMap in JavaScript?",
        options: [
          "A map with weak references that can be garbage collected",
          "A smaller version of a regular Map",
          "A map that only stores weak values",
          "A deprecated data structure",
        ],
        answer: "A map with weak references that can be garbage collected",
      },
      {
        id: 5,
        question: "What does 'Object.freeze()' do?",
        options: [
          "Prevents modifications to an object",
          "Clones an object",
          "Merges objects",
          "Converts object to array",
        ],
        answer: "Prevents modifications to an object",
      },
      {
        id: 6,
        question: "What is the purpose of 'Proxy' in JavaScript?",
        options: [
          "To intercept operations performed on objects",
          "To create a copy of an object",
          "To send HTTP requests",
          "To manage memory allocation",
        ],
        answer: "To intercept operations performed on objects",
      },
      {
        id: 7,
        question:
          "What is the difference between 'Rest' and 'Spread' operators?",
        options: [
          "'Rest' collects elements, 'Spread' expands them",
          "'Spread' collects elements, 'Rest' expands them",
          "They are identical",
          "'Rest' is only for parameters, 'Spread' is only for arrays",
        ],
        answer: "'Rest' collects elements, 'Spread' expands them",
      },
      {
        id: 8,
        question: "What is memoization?",
        options: [
          "Caching function results to avoid redundant computations",
          "Writing notes about code",
          "A type of loop",
          "A memory management technique",
        ],
        answer: "Caching function results to avoid redundant computations",
      },
      {
        id: 9,
        question: "What is currying in JavaScript?",
        options: [
          "Transforming a function with multiple parameters into a sequence of single-parameter functions",
          "Adding spice to code",
          "A type of function declaration",
          "Combining multiple functions",
        ],
        answer:
          "Transforming a function with multiple parameters into a sequence of single-parameter functions",
      },
      {
        id: 10,
        question: "What is the purpose of 'Symbol' in JavaScript?",
        options: [
          "To create unique identifiers",
          "To represent mathematical operations",
          "To define custom data types",
          "To optimize code performance",
        ],
        answer: "To create unique identifiers",
      },
    ],
  },
  python: {
    easy: [
      {
        id: 1,
        question: "What is the correct syntax for a comment in Python?",
        options: ["// Comment", "# Comment", "<!-- Comment -->", "-- Comment"],
        answer: "# Comment",
      },
      {
        id: 2,
        question: "Which method adds an element to a list?",
        options: ["append()", "add()", "insert_item()", "push()"],
        answer: "append()",
      },
      {
        id: 3,
        question: "What data type is used for a single string?",
        options: ["str", "string", "text", "char"],
        answer: "str",
      },
      {
        id: 4,
        question: "How do you create a function in Python?",
        options: [
          "def myFunc(): pass",
          "function myFunc(): pass",
          "func myFunc(): pass",
          "create myFunc(): pass",
        ],
        answer: "def myFunc(): pass",
      },
      {
        id: 5,
        question: "What does 'len()' function do?",
        options: [
          "Returns the length of an object",
          "Deletes an object",
          "Converts to string",
          "Returns the size in bytes",
        ],
        answer: "Returns the length of an object",
      },
      {
        id: 6,
        question: "How do you import a module in Python?",
        options: [
          "import module",
          "include module",
          "require module",
          "load module",
        ],
        answer: "import module",
      },
      {
        id: 7,
        question: "What is the correct way to create a dictionary?",
        options: ["dict = {}", "dict = []", "dict = ''", "dict = ()"],
        answer: "dict = {}",
      },
      {
        id: 8,
        question: "How do you create a tuple in Python?",
        options: ["tuple = ()", "tuple = {}", "tuple = []", "tuple = ''"],
        answer: "tuple = ()",
      },
      {
        id: 9,
        question: "What is the default return value of a function?",
        options: ["None", "0", "empty string", "False"],
        answer: "None",
      },
      {
        id: 10,
        question: "Which keyword is used to handle exceptions?",
        options: ["try", "catch", "handle", "trap"],
        answer: "try",
      },
    ],
    medium: [
      {
        id: 1,
        question: "What is a lambda function?",
        options: [
          "An anonymous function with one expression",
          "A function that returns a lambda",
          "A special function for loops",
          "A deprecated function type",
        ],
        answer: "An anonymous function with one expression",
      },
      {
        id: 2,
        question: "What does 'enumerate()' do?",
        options: [
          "Returns index and value pairs from an iterable",
          "Lists all possible values",
          "Counts occurrences",
          "Sorts items",
        ],
        answer: "Returns index and value pairs from an iterable",
      },
      {
        id: 3,
        question: "What is list comprehension?",
        options: [
          "A concise syntax to create lists from existing iterables",
          "Understanding what a list contains",
          "Compressing list data",
          "Reading list documentation",
        ],
        answer: "A concise syntax to create lists from existing iterables",
      },
      {
        id: 4,
        question: "What does 'map()' function do?",
        options: [
          "Applies a function to every item in an iterable",
          "Creates a geographical map",
          "Sorts a dictionary",
          "Removes duplicates",
        ],
        answer: "Applies a function to every item in an iterable",
      },
      {
        id: 5,
        question: "What is the difference between list and tuple?",
        options: [
          "Lists are mutable, tuples are immutable",
          "Tuples are mutable, lists are immutable",
          "Both are identical",
          "Tuples are faster but limited",
        ],
        answer: "Lists are mutable, tuples are immutable",
      },
      {
        id: 6,
        question: "What does 'filter()' function do?",
        options: [
          "Returns items from an iterable that satisfy a condition",
          "Removes duplicate items",
          "Sorts items in order",
          "Converts to a different type",
        ],
        answer: "Returns items from an iterable that satisfy a condition",
      },
      {
        id: 7,
        question: "What is a decorator in Python?",
        options: [
          "A function that modifies another function or class",
          "A comment in code",
          "A type of variable",
          "An HTML tag",
        ],
        answer: "A function that modifies another function or class",
      },
      {
        id: 8,
        question: "What does 'zip()' function do?",
        options: [
          "Combines multiple iterables into tuples",
          "Compresses files",
          "Iterates through a dictionary",
          "Removes whitespace",
        ],
        answer: "Combines multiple iterables into tuples",
      },
      {
        id: 9,
        question: "What is *args in Python?",
        options: [
          "Allows functions to accept variable number of positional arguments",
          "A reference to arguments array",
          "A delimiter for function arguments",
          "An error flag",
        ],
        answer:
          "Allows functions to accept variable number of positional arguments",
      },
      {
        id: 10,
        question: "What is **kwargs in Python?",
        options: [
          "Allows functions to accept variable number of keyword arguments",
          "A reference to process arguments",
          "A string multiplication operator",
          "A deprecated feature",
        ],
        answer:
          "Allows functions to accept variable number of keyword arguments",
      },
    ],
    hard: [
      {
        id: 1,
        question: "What is a generator in Python?",
        options: [
          "A function that returns an iterator using yield",
          "An object that generates random numbers",
          "A loop that generates code",
          "A memory management tool",
        ],
        answer: "A function that returns an iterator using yield",
      },
      {
        id: 2,
        question: "What is a metaclass?",
        options: [
          "A class whose instances are classes",
          "A parent class of all classes",
          "A class with meta information",
          "A deprecated class type",
        ],
        answer: "A class whose instances are classes",
      },
      {
        id: 3,
        question: "What is the Global Interpreter Lock (GIL)?",
        options: [
          "A mechanism that prevents true parallel execution of Python bytecode in threads",
          "A security protocol for Python",
          "A compiler optimization",
          "A type of exception",
        ],
        answer:
          "A mechanism that prevents true parallel execution of Python bytecode in threads",
      },
      {
        id: 4,
        question: "What is duck typing?",
        options: [
          "If it quacks like a duck, it is a duck - polymorphism based on behavior",
          "A way to name variables",
          "A type checking mechanism",
          "A debugging technique",
        ],
        answer:
          "If it quacks like a duck, it is a duck - polymorphism based on behavior",
      },
      {
        id: 5,
        question: "What is a descriptor in Python?",
        options: [
          "An object that implements __get__, __set__, or __delete__ methods",
          "A string that describes a variable",
          "A documentation comment",
          "A type hint",
        ],
        answer:
          "An object that implements __get__, __set__, or __delete__ methods",
      },
      {
        id: 6,
        question: "What is the purpose of __init__.py file?",
        options: [
          "Marks a directory as a Python package",
          "Initializes variables at startup",
          "Configures the Python environment",
          "Runs tests on module import",
        ],
        answer: "Marks a directory as a Python package",
      },
      {
        id: 7,
        question: "What is monkey patching?",
        options: [
          "Dynamically modifying code at runtime",
          "Fixing bugs in external libraries",
          "A type of debugging",
          "Applying patches to code",
        ],
        answer: "Dynamically modifying code at runtime",
      },
      {
        id: 8,
        question: "What is context manager in Python?",
        options: [
          "Allows setup and teardown operations using 'with' statement",
          "A manager for application context",
          "A tool for managing memory",
          "A debugging feature",
        ],
        answer: "Allows setup and teardown operations using 'with' statement",
      },
      {
        id: 9,
        question: "What is method resolution order (MRO)?",
        options: [
          "The order in which methods are searched in a class hierarchy",
          "A memory optimization technique",
          "A sorting algorithm",
          "A compilation process",
        ],
        answer: "The order in which methods are searched in a class hierarchy",
      },
      {
        id: 10,
        question: "What is the purpose of 'property' decorator?",
        options: [
          "Allows getting, setting, and deleting attributes like methods",
          "Adds metadata to a property",
          "Protects a property from access",
          "Creates a read-only property",
        ],
        answer: "Allows getting, setting, and deleting attributes like methods",
      },
    ],
  },
  java: {
    easy: [
      {
        id: 1,
        question: "What is the main method signature in Java?",
        options: [
          "public static void main(String[] args)",
          "static void main(String args)",
          "public void main()",
          "void main(String[] args)",
        ],
        answer: "public static void main(String[] args)",
      },
      {
        id: 2,
        question: "Which keyword is used to create an object?",
        options: ["new", "create", "object", "init"],
        answer: "new",
      },
      {
        id: 3,
        question: "What is the correct syntax for a comment?",
        options: ["// Comment", "# Comment", "-- Comment", "<!-- Comment -->"],
        answer: "// Comment",
      },
      {
        id: 4,
        question: "Which data type is used for a single character?",
        options: ["char", "string", "character", "str"],
        answer: "char",
      },
      {
        id: 5,
        question: "What does 'static' keyword mean?",
        options: [
          "Variable/method belongs to the class, not instances",
          "Variable cannot be changed",
          "Method is not accessible",
          "Class is read-only",
        ],
        answer: "Variable/method belongs to the class, not instances",
      },
      {
        id: 6,
        question: "Which keyword is used for inheritance?",
        options: ["extends", "inherits", "like", "similar"],
        answer: "extends",
      },
      {
        id: 7,
        question: "What is the default value of an int variable?",
        options: ["0", "null", "undefined", "1"],
        answer: "0",
      },
      {
        id: 8,
        question: "How do you import a package?",
        options: [
          "import package.name",
          "include package",
          "require package",
          "load package",
        ],
        answer: "import package.name",
      },
      {
        id: 9,
        question: "What is the correct way to declare an array?",
        options: ["int[] arr", "int arr[]", "array int arr", "Both A and B"],
        answer: "Both A and B",
      },
      {
        id: 10,
        question: "Which class is the superclass of all classes?",
        options: ["Object", "Class", "Parent", "Super"],
        answer: "Object",
      },
    ],
    medium: [
      {
        id: 1,
        question: "What is an interface in Java?",
        options: [
          "A contract that specifies methods a class must implement",
          "A GUI component",
          "A way to connect to databases",
          "A network protocol",
        ],
        answer: "A contract that specifies methods a class must implement",
      },
      {
        id: 2,
        question:
          "What is the difference between 'abstract class' and 'interface'?",
        options: [
          "Abstract class can have concrete methods, interface cannot (before Java 8)",
          "Interface is more abstract than abstract class",
          "Both are identical",
          "Abstract class is for variables only",
        ],
        answer:
          "Abstract class can have concrete methods, interface cannot (before Java 8)",
      },
      {
        id: 3,
        question: "What does 'final' keyword do?",
        options: [
          "Prevents modification/inheritance/overriding",
          "Ends a method",
          "Finalizes an object",
          "Completes an operation",
        ],
        answer: "Prevents modification/inheritance/overriding",
      },
      {
        id: 4,
        question: "What is polymorphism?",
        options: [
          "The ability for objects to take multiple forms",
          "Multiple classes with same name",
          "Different variables in a class",
          "Methods that do the same thing",
        ],
        answer: "The ability for objects to take multiple forms",
      },
      {
        id: 5,
        question: "What is encapsulation?",
        options: [
          "Bundling data and methods together, hiding internal details",
          "Creating multiple classes",
          "Inheriting from parent class",
          "Implementing an interface",
        ],
        answer: "Bundling data and methods together, hiding internal details",
      },
      {
        id: 6,
        question: "What is exception handling?",
        options: [
          "Catching and handling runtime errors",
          "Preventing all errors",
          "A type of loop",
          "Debugging code",
        ],
        answer: "Catching and handling runtime errors",
      },
      {
        id: 7,
        question: "What is the purpose of 'this' keyword?",
        options: [
          "Refers to the current object instance",
          "Refers to the parent class",
          "Refers to the class itself",
          "Refers to the method",
        ],
        answer: "Refers to the current object instance",
      },
      {
        id: 8,
        question: "What is a constructor?",
        options: [
          "A special method called when an object is created",
          "A method that constructs code",
          "A method for creating copies",
          "A debugging method",
        ],
        answer: "A special method called when an object is created",
      },
      {
        id: 9,
        question: "What is method overloading?",
        options: [
          "Having multiple methods with same name but different parameters",
          "Calling a method multiple times",
          "A method that overrides parent method",
          "A method with too many parameters",
        ],
        answer:
          "Having multiple methods with same name but different parameters",
      },
      {
        id: 10,
        question: "What is method overriding?",
        options: [
          "A subclass providing a specific implementation of a parent method",
          "Changing a method's name",
          "Adding more parameters to a method",
          "Deleting a parent method",
        ],
        answer:
          "A subclass providing a specific implementation of a parent method",
      },
    ],
    hard: [
      {
        id: 1,
        question: "What is a generic type in Java?",
        options: [
          "A class or method that operates on parameterized types",
          "A type that works with any class",
          "A deprecated feature",
          "A memory optimization",
        ],
        answer: "A class or method that operates on parameterized types",
      },
      {
        id: 2,
        question: "What is reflection in Java?",
        options: [
          "The ability to inspect and modify class behavior at runtime",
          "Mirroring objects in memory",
          "A debugging technique",
          "A compiler feature",
        ],
        answer: "The ability to inspect and modify class behavior at runtime",
      },
      {
        id: 3,
        question: "What is the singleton pattern?",
        options: [
          "A design pattern that ensures only one instance of a class exists",
          "A class with one method",
          "A deprecated design pattern",
          "A threading model",
        ],
        answer:
          "A design pattern that ensures only one instance of a class exists",
      },
      {
        id: 4,
        question: "What is type erasure in Java?",
        options: [
          "Generic type information is removed during compilation",
          "Types are converted to strings",
          "Classes are deleted from memory",
          "Variables lose their types",
        ],
        answer: "Generic type information is removed during compilation",
      },
      {
        id: 5,
        question: "What is a marker interface?",
        options: [
          "An interface with no methods, used to mark a class",
          "An interface that marks errors",
          "An interface for debugging",
          "A deprecated feature",
        ],
        answer: "An interface with no methods, used to mark a class",
      },
      {
        id: 6,
        question: "What is the difference between composition and inheritance?",
        options: [
          "Composition uses 'has-a', inheritance uses 'is-a'",
          "Both are identical",
          "Composition is faster than inheritance",
          "Inheritance is always better than composition",
        ],
        answer: "Composition uses 'has-a', inheritance uses 'is-a'",
      },
      {
        id: 7,
        question: "What is the purpose of 'volatile' keyword?",
        options: [
          "Indicates a variable may be changed by multiple threads",
          "Makes a variable unstable",
          "Prevents variable modification",
          "Improves performance",
        ],
        answer: "Indicates a variable may be changed by multiple threads",
      },
      {
        id: 8,
        question: "What is the purpose of 'synchronized' keyword?",
        options: [
          "Ensures only one thread can access a method/block at a time",
          "Synchronizes code with network",
          "Makes operations faster",
          "Prevents all errors",
        ],
        answer: "Ensures only one thread can access a method/block at a time",
      },
      {
        id: 9,
        question: "What is a wildcard in Java generics?",
        options: [
          "A placeholder represented by '?' for any type",
          "A special character in code",
          "A debugging tool",
          "A memory allocator",
        ],
        answer: "A placeholder represented by '?' for any type",
      },
      {
        id: 10,
        question: "What is functional programming in Java?",
        options: [
          "Programming using functions and immutability, using lambdas and streams",
          "Creating multiple functions",
          "A deprecated programming style",
          "Programming without objects",
        ],
        answer:
          "Programming using functions and immutability, using lambdas and streams",
      },
    ],
  },
};
