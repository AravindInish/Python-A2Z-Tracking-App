import { Topic } from '../types/tracker';

/**
 * Complete Python, Data Science (NumPy, Pandas, SciPy), Web (Django) & DSA Curriculum
 * Total: 216 topics across 17 modules.
 * Fresh Sheet: All topics start cleanly as 'Not Started' so user can track daily streak and progress from Day 1.
 */
export const INITIAL_TOPICS: Topic[] = [
  {
    "id": "w3-001",
    "order": 1,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python HOME",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/default.asp",
    "status": "Not Started",
    "notes": "Welcome to Python tutorial overview and roadmap.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-002",
    "order": 2,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Intro",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_intro.asp",
    "status": "Not Started",
    "notes": "What is Python? High-level, interpreted language created by Guido van Rossum.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-003",
    "order": 3,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Get Started",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_getstarted.asp",
    "status": "Not Started",
    "notes": "Installation, verifying python --version, running first python script.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-004",
    "order": 4,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Syntax",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_syntax.asp",
    "status": "Not Started",
    "notes": "Indentation indicates code blocks instead of curly braces. PEP 8 rules.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-005",
    "order": 5,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Output",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_output.asp",
    "status": "Not Started",
    "notes": "print() function, sep, end parameters, outputting variables.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-006",
    "order": 6,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Comments",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_comments.asp",
    "status": "Not Started",
    "notes": "Single-line (#) and multiline docstrings (\"\"\") in Python.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-007",
    "order": 7,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Variables",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_variables.asp",
    "status": "Not Started",
    "notes": "Creating variables, dynamic typing, variable naming conventions, multiple assignment.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-008",
    "order": 8,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Data Types",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_datatypes.asp",
    "status": "Not Started",
    "notes": "Built-in data types: str, int, float, complex, list, tuple, range, dict, set, bool, bytes.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-009",
    "order": 9,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Numbers",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_numbers.asp",
    "status": "Not Started",
    "notes": "int (unlimited length), float (scientific notation with e), complex numbers (j).",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-010",
    "order": 10,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Casting",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_casting.asp",
    "status": "Not Started",
    "notes": "Type casting using int(), float(), str() constructors.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-011",
    "order": 11,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Strings",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_strings.asp",
    "status": "Not Started",
    "notes": "String slicing [start:stop:step], negative index, length len(), string methods.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-012",
    "order": 12,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Booleans",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_booleans.asp",
    "status": "Not Started",
    "notes": "True and False values, truthy/falsy evaluation, bool() constructor.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-013",
    "order": 13,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Operators",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_operators.asp",
    "status": "Not Started",
    "notes": "Arithmetic, Assignment, Comparison, Logical (and, or, not), Identity (is), Membership (in).",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-014",
    "order": 14,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Lists",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_lists.asp",
    "status": "Not Started",
    "notes": "Ordered, changeable, allows duplicates. append, extend, insert, pop, list comprehension.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-015",
    "order": 15,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Tuples",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_tuples.asp",
    "status": "Not Started",
    "notes": "Ordered, unchangeable (immutable). Packing, unpacking, single-element comma rule.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-016",
    "order": 16,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Sets",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_sets.asp",
    "status": "Not Started",
    "notes": "Unordered, unchangeable*, unindexed, no duplicates. union, intersection, difference.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-017",
    "order": 17,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Dictionaries",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_dictionaries.asp",
    "status": "Not Started",
    "notes": "Key-value pairs, ordered (Python 3.7+), changeable, no duplicate keys. keys(), values(), items().",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-018",
    "order": 18,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python If...Else",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_conditions.asp",
    "status": "Not Started",
    "notes": "Conditional statements: if, elif, else, shorthand ternary operators.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-019",
    "order": 19,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Match",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_match.asp",
    "status": "Not Started",
    "notes": "Pattern matching with match...case introduced in Python 3.10.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-020",
    "order": 20,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python While Loops",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_while_loops.asp",
    "status": "Not Started",
    "notes": "Executing statements as long as condition is true. break, continue, while...else.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-021",
    "order": 21,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python For Loops",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_for_loops.asp",
    "status": "Not Started",
    "notes": "Iterating over sequences (list, tuple, string). range(), break, continue, else block.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-022",
    "order": 22,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Functions",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_functions.asp",
    "status": "Not Started",
    "notes": "def keyword, positional arguments, keyword arguments, *args, **kwargs, return values.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-023",
    "order": 23,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Range",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/ref_func_range.asp",
    "status": "Not Started",
    "notes": "range(start, stop, step) sequence generator for loops.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-024",
    "order": 24,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Arrays",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_arrays.asp",
    "status": "Not Started",
    "notes": "Python lists used as arrays; array module for homogeneous primitive arrays.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-025",
    "order": 25,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Iterators",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_iterators.asp",
    "status": "Not Started",
    "notes": "__iter__() and __next__() protocols. StopIteration exception.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-026",
    "order": 26,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Modules",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_modules.asp",
    "status": "Not Started",
    "notes": "Creating modules (.py), import statement, from...import, renaming with as.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-027",
    "order": 27,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Dates",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_datetime.asp",
    "status": "Not Started",
    "notes": "datetime module: datetime.now(), strftime() formatting directives.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-028",
    "order": 28,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Math",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_math.asp",
    "status": "Not Started",
    "notes": "Built-in min, max, abs, round. math module: sqrt, ceil, floor, pi.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-029",
    "order": 29,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python JSON",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_json.asp",
    "status": "Not Started",
    "notes": "json module: json.loads() parsing JSON string, json.dumps() serialization.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-030",
    "order": 30,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python RegEx",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_regex.asp",
    "status": "Not Started",
    "notes": "re module: findall, search, split, sub. Meta-characters and special sequences.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-031",
    "order": 31,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python PIP",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_pip.asp",
    "status": "Not Started",
    "notes": "Package manager for Python. pip install, uninstall, list, requirements.txt.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-032",
    "order": 32,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python Try...Except",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_try_except.asp",
    "status": "Not Started",
    "notes": "Error handling: try, except SpecificError, else (if no error), finally (always).",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-033",
    "order": 33,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python String Formatting",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_string_formatting.asp",
    "status": "Not Started",
    "notes": "F-strings (f\"{var:.2f}\"), str.format(), % operator.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-034",
    "order": 34,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python None",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/ref_keyword_none.asp",
    "status": "Not Started",
    "notes": "NoneType constant representing null or absence of value. Checked with `is None`.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-035",
    "order": 35,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python User Input",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_user_input.asp",
    "status": "Not Started",
    "notes": "input() function reads console input as string.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-036",
    "order": 36,
    "module": "Python Tutorial",
    "submodule": "Basics & Fundamentals",
    "topic": "Python VirtualEnv",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_virtualenv.asp",
    "status": "Not Started",
    "notes": "python -m venv myenv, isolated project dependencies, activating environment.",
    "difficulty": "Basic",
    "tags": [
      "Python",
      "Basics"
    ]
  },
  {
    "id": "w3-037",
    "order": 37,
    "module": "Python Classes",
    "submodule": "Object-Oriented Programming",
    "topic": "Python OOP",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_classes.asp",
    "status": "Not Started",
    "notes": "Core OOP paradigms: Abstraction, Encapsulation, Inheritance, Polymorphism.",
    "difficulty": "Medium",
    "tags": [
      "Classes",
      "Object-Oriented"
    ]
  },
  {
    "id": "w3-038",
    "order": 38,
    "module": "Python Classes",
    "submodule": "Object-Oriented Programming",
    "topic": "Python Classes/Objects",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_classes.asp",
    "status": "Not Started",
    "notes": "Class as blueprint, creating object instances with constructor calls.",
    "difficulty": "Medium",
    "tags": [
      "Classes",
      "Object-Oriented"
    ]
  },
  {
    "id": "w3-039",
    "order": 39,
    "module": "Python Classes",
    "submodule": "Object-Oriented Programming",
    "topic": "Python __init__ Method",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_classes.asp",
    "status": "Not Started",
    "notes": "Dunder method __init__ executes automatically when object is instantiated.",
    "difficulty": "Medium",
    "tags": [
      "Classes",
      "Object-Oriented"
    ]
  },
  {
    "id": "w3-040",
    "order": 40,
    "module": "Python Classes",
    "submodule": "Object-Oriented Programming",
    "topic": "Python self Parameter",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_classes.asp",
    "status": "Not Started",
    "notes": "Explicit reference to current instance of the class used to access attributes.",
    "difficulty": "Medium",
    "tags": [
      "Classes",
      "Object-Oriented"
    ]
  },
  {
    "id": "w3-041",
    "order": 41,
    "module": "Python Classes",
    "submodule": "Object-Oriented Programming",
    "topic": "Python Class Properties",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_classes.asp",
    "status": "Not Started",
    "notes": "Instance attributes vs class-level attributes; @property getters and setters.",
    "difficulty": "Medium",
    "tags": [
      "Classes",
      "Object-Oriented"
    ]
  },
  {
    "id": "w3-042",
    "order": 42,
    "module": "Python Classes",
    "submodule": "Object-Oriented Programming",
    "topic": "Python Class Methods",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_classes.asp",
    "status": "Not Started",
    "notes": "Instance methods, @classmethod (takes cls), @staticmethod (utility functions).",
    "difficulty": "Medium",
    "tags": [
      "Classes",
      "Object-Oriented"
    ]
  },
  {
    "id": "w3-043",
    "order": 43,
    "module": "Python Classes",
    "submodule": "Object-Oriented Programming",
    "topic": "Python Magic Methods",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_classes.asp",
    "status": "Not Started",
    "notes": "__str__, __repr__, __len__, __eq__, operator overloading dunder methods.",
    "difficulty": "Medium",
    "tags": [
      "Classes",
      "Object-Oriented"
    ]
  },
  {
    "id": "w3-044",
    "order": 44,
    "module": "Python Classes",
    "submodule": "Object-Oriented Programming",
    "topic": "Python Inheritance",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_inheritance.asp",
    "status": "Not Started",
    "notes": "Parent/base class and child/derived class, super() function call.",
    "difficulty": "Medium",
    "tags": [
      "Classes",
      "Object-Oriented"
    ]
  },
  {
    "id": "w3-045",
    "order": 45,
    "module": "Python Classes",
    "submodule": "Object-Oriented Programming",
    "topic": "Python Polymorphism",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_polymorphism.asp",
    "status": "Not Started",
    "notes": "Same method name across different classes. Duck typing in Python.",
    "difficulty": "Medium",
    "tags": [
      "Classes",
      "Object-Oriented"
    ]
  },
  {
    "id": "w3-046",
    "order": 46,
    "module": "Python Classes",
    "submodule": "Object-Oriented Programming",
    "topic": "Python Encapsulation",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_classes.asp",
    "status": "Not Started",
    "notes": "Protected (_var) and private (__var) attribute name mangling convention.",
    "difficulty": "Medium",
    "tags": [
      "Classes",
      "Object-Oriented"
    ]
  },
  {
    "id": "w3-047",
    "order": 47,
    "module": "Python Classes",
    "submodule": "Object-Oriented Programming",
    "topic": "Python Inner Classes",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_classes.asp",
    "status": "Not Started",
    "notes": "Nesting classes inside classes for logical containment.",
    "difficulty": "Medium",
    "tags": [
      "Classes",
      "Object-Oriented"
    ]
  },
  {
    "id": "w3-048",
    "order": 48,
    "module": "File Handling",
    "submodule": "I/O Operations",
    "topic": "Python File Handling",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_file_handling.asp",
    "status": "Not Started",
    "notes": "open() modes: 'r' (read), 'a' (append), 'w' (write), 'x' (create), 't' (text), 'b' (binary).",
    "difficulty": "Medium",
    "tags": [
      "File Handling",
      "I/O"
    ]
  },
  {
    "id": "w3-049",
    "order": 49,
    "module": "File Handling",
    "submodule": "I/O Operations",
    "topic": "Python Read Files",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_file_open.asp",
    "status": "Not Started",
    "notes": "read(), readline(), readlines(), iterating with context manager `with open(...)`.",
    "difficulty": "Medium",
    "tags": [
      "File Handling",
      "I/O"
    ]
  },
  {
    "id": "w3-050",
    "order": 50,
    "module": "File Handling",
    "submodule": "I/O Operations",
    "topic": "Python Write/Create Files",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_file_write.asp",
    "status": "Not Started",
    "notes": "Writing lines, overwriting vs appending to existing files safely.",
    "difficulty": "Medium",
    "tags": [
      "File Handling",
      "I/O"
    ]
  },
  {
    "id": "w3-051",
    "order": 51,
    "module": "File Handling",
    "submodule": "I/O Operations",
    "topic": "Python Delete Files",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_file_remove.asp",
    "status": "Not Started",
    "notes": "os.remove(), os.path.exists() verification, os.rmdir() for folders.",
    "difficulty": "Medium",
    "tags": [
      "File Handling",
      "I/O"
    ]
  },
  {
    "id": "w3-052",
    "order": 52,
    "module": "NumPy Tutorial",
    "submodule": "NumPy Basics & Arrays",
    "topic": "NumPy Intro",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/numpy/numpy_intro.asp",
    "status": "Not Started",
    "notes": "Introduction to NumPy (Numerical Python), advantages over Python lists, speed & cache locality.",
    "difficulty": "Medium",
    "tags": [
      "NumPy",
      "NumPy"
    ]
  },
  {
    "id": "w3-053",
    "order": 53,
    "module": "NumPy Tutorial",
    "submodule": "NumPy Basics & Arrays",
    "topic": "NumPy Getting Started",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/numpy/numpy_getting_started.asp",
    "status": "Not Started",
    "notes": "Installing NumPy, importing as `import numpy as np`, checking `np.__version__`.",
    "difficulty": "Medium",
    "tags": [
      "NumPy",
      "NumPy"
    ]
  },
  {
    "id": "w3-054",
    "order": 54,
    "module": "NumPy Tutorial",
    "submodule": "NumPy Basics & Arrays",
    "topic": "NumPy Creating Arrays",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/numpy/numpy_creating_arrays.asp",
    "status": "Not Started",
    "notes": "Creating 0-D, 1-D, 2-D, 3-D and n-D arrays with np.array(), ndmin parameter.",
    "difficulty": "Medium",
    "tags": [
      "NumPy",
      "NumPy"
    ]
  },
  {
    "id": "w3-055",
    "order": 55,
    "module": "NumPy Tutorial",
    "submodule": "NumPy Basics & Arrays",
    "topic": "NumPy Array Indexing",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/numpy/numpy_array_indexing.asp",
    "status": "Not Started",
    "notes": "Accessing elements in 1D, 2D (arr[row, col]), and 3D arrays, negative indexing.",
    "difficulty": "Medium",
    "tags": [
      "NumPy",
      "NumPy"
    ]
  },
  {
    "id": "w3-056",
    "order": 56,
    "module": "NumPy Tutorial",
    "submodule": "NumPy Basics & Arrays",
    "topic": "NumPy Array Slicing",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/numpy/numpy_array_slicing.asp",
    "status": "Not Started",
    "notes": "Slicing 1D and 2D arrays: arr[start:end:step], slicing rows and columns.",
    "difficulty": "Medium",
    "tags": [
      "NumPy",
      "NumPy"
    ]
  },
  {
    "id": "w3-057",
    "order": 57,
    "module": "NumPy Tutorial",
    "submodule": "NumPy Basics & Arrays",
    "topic": "NumPy Data Types",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/numpy/numpy_data_types.asp",
    "status": "Not Started",
    "notes": "NumPy dtypes (i, b, u, f, c, m, M, O, S, U, V), astype() casting.",
    "difficulty": "Medium",
    "tags": [
      "NumPy",
      "NumPy"
    ]
  },
  {
    "id": "w3-058",
    "order": 58,
    "module": "NumPy Tutorial",
    "submodule": "NumPy Basics & Arrays",
    "topic": "NumPy Copy vs View",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/numpy/numpy_copy_vs_view.asp",
    "status": "Not Started",
    "notes": "Deep copy (owns data) vs view (shallow reference), checking with .base attribute.",
    "difficulty": "Medium",
    "tags": [
      "NumPy",
      "NumPy"
    ]
  },
  {
    "id": "w3-059",
    "order": 59,
    "module": "NumPy Tutorial",
    "submodule": "NumPy Basics & Arrays",
    "topic": "NumPy Array Shape",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/numpy/numpy_array_shape.asp",
    "status": "Not Started",
    "notes": "Array dimensions with arr.shape, tuple of lengths of corresponding dimensions.",
    "difficulty": "Medium",
    "tags": [
      "NumPy",
      "NumPy"
    ]
  },
  {
    "id": "w3-060",
    "order": 60,
    "module": "NumPy Tutorial",
    "submodule": "NumPy Basics & Arrays",
    "topic": "NumPy Array Reshape",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/numpy/numpy_array_reshape.asp",
    "status": "Not Started",
    "notes": "Reshaping 1D to 2D/3D, unknown dimension using -1, flattening with reshape(-1) or flatten().",
    "difficulty": "Medium",
    "tags": [
      "NumPy",
      "NumPy"
    ]
  },
  {
    "id": "w3-061",
    "order": 61,
    "module": "NumPy Tutorial",
    "submodule": "NumPy Basics & Arrays",
    "topic": "NumPy Array Iterating",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/numpy/numpy_array_iterating.asp",
    "status": "Not Started",
    "notes": "Iterating through multi-dimensional arrays, using np.nditer() and np.ndenumerate().",
    "difficulty": "Medium",
    "tags": [
      "NumPy",
      "NumPy"
    ]
  },
  {
    "id": "w3-062",
    "order": 62,
    "module": "NumPy Tutorial",
    "submodule": "NumPy Basics & Arrays",
    "topic": "NumPy Array Join",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/numpy/numpy_array_join.asp",
    "status": "Not Started",
    "notes": "Joining arrays using np.concatenate(), np.stack(), np.hstack(), np.vstack(), np.dstack().",
    "difficulty": "Medium",
    "tags": [
      "NumPy",
      "NumPy"
    ]
  },
  {
    "id": "w3-063",
    "order": 63,
    "module": "NumPy Tutorial",
    "submodule": "NumPy Basics & Arrays",
    "topic": "NumPy Array Split",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/numpy/numpy_array_split.asp",
    "status": "Not Started",
    "notes": "Splitting arrays into sub-arrays with np.array_split(), np.hsplit(), np.vsplit().",
    "difficulty": "Medium",
    "tags": [
      "NumPy",
      "NumPy"
    ]
  },
  {
    "id": "w3-064",
    "order": 64,
    "module": "NumPy Tutorial",
    "submodule": "NumPy Basics & Arrays",
    "topic": "NumPy Array Search",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/numpy/numpy_array_search.asp",
    "status": "Not Started",
    "notes": "Searching arrays with np.where() conditions, np.searchsorted() for binary search insertion.",
    "difficulty": "Medium",
    "tags": [
      "NumPy",
      "NumPy"
    ]
  },
  {
    "id": "w3-065",
    "order": 65,
    "module": "NumPy Tutorial",
    "submodule": "NumPy Basics & Arrays",
    "topic": "NumPy Array Sort",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/numpy/numpy_array_sort.asp",
    "status": "Not Started",
    "notes": "Sorting 1D and 2D arrays alphabetically or numerically with np.sort().",
    "difficulty": "Medium",
    "tags": [
      "NumPy",
      "NumPy"
    ]
  },
  {
    "id": "w3-066",
    "order": 66,
    "module": "NumPy Tutorial",
    "submodule": "NumPy Basics & Arrays",
    "topic": "NumPy Array Filter",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/numpy/numpy_array_filter.asp",
    "status": "Not Started",
    "notes": "Filtering elements with boolean index lists, boolean masks (arr > 40).",
    "difficulty": "Medium",
    "tags": [
      "NumPy",
      "NumPy"
    ]
  },
  {
    "id": "w3-067",
    "order": 67,
    "module": "NumPy Tutorial",
    "submodule": "NumPy Basics & Arrays",
    "topic": "NumPy Random",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/numpy/numpy_random.asp",
    "status": "Not Started",
    "notes": "Pseudo-random generation: random.randint(), random.rand(), random.choice() with probabilities.",
    "difficulty": "Medium",
    "tags": [
      "NumPy",
      "NumPy"
    ]
  },
  {
    "id": "w3-068",
    "order": 68,
    "module": "NumPy Tutorial",
    "submodule": "NumPy Basics & Arrays",
    "topic": "NumPy ufuncs",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/numpy/numpy_ufuncs.asp",
    "status": "Not Started",
    "notes": "Universal functions for vectorized operations: add, subtract, multiply, divide, power, mod.",
    "difficulty": "Medium",
    "tags": [
      "NumPy",
      "NumPy"
    ]
  },
  {
    "id": "w3-069",
    "order": 69,
    "module": "Pandas Tutorial",
    "submodule": "Data Analysis & Manipulation",
    "topic": "Pandas Intro",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/pandas/default.asp",
    "status": "Not Started",
    "notes": "Introduction to Pandas, data manipulation & analysis for tabular, time-series data.",
    "difficulty": "Medium",
    "tags": [
      "Pandas",
      "Data"
    ]
  },
  {
    "id": "w3-070",
    "order": 70,
    "module": "Pandas Tutorial",
    "submodule": "Data Analysis & Manipulation",
    "topic": "Pandas Getting Started",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/pandas/pandas_getting_started.asp",
    "status": "Not Started",
    "notes": "Installing pandas, importing `import pandas as pd`, checking pd.__version__.",
    "difficulty": "Medium",
    "tags": [
      "Pandas",
      "Data"
    ]
  },
  {
    "id": "w3-071",
    "order": 71,
    "module": "Pandas Tutorial",
    "submodule": "Data Analysis & Manipulation",
    "topic": "Pandas Series",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/pandas/pandas_series.asp",
    "status": "Not Started",
    "notes": "One-dimensional labeled array pd.Series(data, index), accessing by label.",
    "difficulty": "Medium",
    "tags": [
      "Pandas",
      "Data"
    ]
  },
  {
    "id": "w3-072",
    "order": 72,
    "module": "Pandas Tutorial",
    "submodule": "Data Analysis & Manipulation",
    "topic": "Pandas DataFrames",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/pandas/pandas_dataframes.asp",
    "status": "Not Started",
    "notes": "Two-dimensional tabular data structure with labeled axes: loc[] and iloc[].",
    "difficulty": "Medium",
    "tags": [
      "Pandas",
      "Data"
    ]
  },
  {
    "id": "w3-073",
    "order": 73,
    "module": "Pandas Tutorial",
    "submodule": "Data Analysis & Manipulation",
    "topic": "Pandas Read CSV",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/pandas/pandas_csv.asp",
    "status": "Not Started",
    "notes": "Loading flat files with pd.read_csv(), to_string(), max_rows options.",
    "difficulty": "Medium",
    "tags": [
      "Pandas",
      "Data"
    ]
  },
  {
    "id": "w3-074",
    "order": 74,
    "module": "Pandas Tutorial",
    "submodule": "Data Analysis & Manipulation",
    "topic": "Pandas Read JSON",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/pandas/pandas_json.asp",
    "status": "Not Started",
    "notes": "Loading JSON data structures and nested JSON with pd.read_json().",
    "difficulty": "Medium",
    "tags": [
      "Pandas",
      "Data"
    ]
  },
  {
    "id": "w3-075",
    "order": 75,
    "module": "Pandas Tutorial",
    "submodule": "Data Analysis & Manipulation",
    "topic": "Pandas Analyzing Data",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/pandas/pandas_analyzing.asp",
    "status": "Not Started",
    "notes": "Viewing data with df.head(), df.tail(), df.info(), df.describe() statistical summary.",
    "difficulty": "Medium",
    "tags": [
      "Pandas",
      "Data"
    ]
  },
  {
    "id": "w3-076",
    "order": 76,
    "module": "Pandas Tutorial",
    "submodule": "Data Analysis & Manipulation",
    "topic": "Pandas Cleaning Empty Cells",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/pandas/pandas_cleaning_empty_cells.asp",
    "status": "Not Started",
    "notes": "dropna() removing rows, fillna() replacing nulls with mean/median/mode.",
    "difficulty": "Medium",
    "tags": [
      "Pandas",
      "Data"
    ]
  },
  {
    "id": "w3-077",
    "order": 77,
    "module": "Pandas Tutorial",
    "submodule": "Data Analysis & Manipulation",
    "topic": "Pandas Cleaning Wrong Format",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/pandas/pandas_cleaning_wrong_format.asp",
    "status": "Not Started",
    "notes": "Converting date strings to datetime with pd.to_datetime(), handling NaT.",
    "difficulty": "Medium",
    "tags": [
      "Pandas",
      "Data"
    ]
  },
  {
    "id": "w3-078",
    "order": 78,
    "module": "Pandas Tutorial",
    "submodule": "Data Analysis & Manipulation",
    "topic": "Pandas Cleaning Wrong Data",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/pandas/pandas_cleaning_wrong_data.asp",
    "status": "Not Started",
    "notes": "Replacing outlier/invalid values based on boundary rules, dropping invalid rows.",
    "difficulty": "Medium",
    "tags": [
      "Pandas",
      "Data"
    ]
  },
  {
    "id": "w3-079",
    "order": 79,
    "module": "Pandas Tutorial",
    "submodule": "Data Analysis & Manipulation",
    "topic": "Pandas Removing Duplicates",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/pandas/pandas_cleaning_duplicates.asp",
    "status": "Not Started",
    "notes": "df.duplicated() boolean mask, df.drop_duplicates(inplace=True).",
    "difficulty": "Medium",
    "tags": [
      "Pandas",
      "Data"
    ]
  },
  {
    "id": "w3-080",
    "order": 80,
    "module": "Pandas Tutorial",
    "submodule": "Data Analysis & Manipulation",
    "topic": "Pandas Correlations",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/pandas/pandas_correlations.asp",
    "status": "Not Started",
    "notes": "Calculating pairwise correlation of columns using df.corr() Pearson coefficients.",
    "difficulty": "Medium",
    "tags": [
      "Pandas",
      "Data"
    ]
  },
  {
    "id": "w3-081",
    "order": 81,
    "module": "Pandas Tutorial",
    "submodule": "Data Analysis & Manipulation",
    "topic": "Pandas Plotting",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/pandas/pandas_plotting.asp",
    "status": "Not Started",
    "notes": "Visualizing DataFrames directly with df.plot(kind='scatter'|'hist'|'line').",
    "difficulty": "Medium",
    "tags": [
      "Pandas",
      "Data"
    ]
  },
  {
    "id": "w3-082",
    "order": 82,
    "module": "SciPy Tutorial",
    "submodule": "Scientific Computing",
    "topic": "SciPy Intro",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/scipy/index.php",
    "status": "Not Started",
    "notes": "Scientific Python library built on NumPy for optimization, linear algebra, calculus.",
    "difficulty": "Hard",
    "tags": [
      "SciPy",
      "Scientific"
    ]
  },
  {
    "id": "w3-083",
    "order": 83,
    "module": "SciPy Tutorial",
    "submodule": "Scientific Computing",
    "topic": "SciPy Getting Started",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/scipy/scipy_getting_started.asp",
    "status": "Not Started",
    "notes": "Installing scipy, importing submodules, checking version.",
    "difficulty": "Hard",
    "tags": [
      "SciPy",
      "Scientific"
    ]
  },
  {
    "id": "w3-084",
    "order": 84,
    "module": "SciPy Tutorial",
    "submodule": "Scientific Computing",
    "topic": "SciPy Constants",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/scipy/scipy_constants.asp",
    "status": "Not Started",
    "notes": "Scientific constants in scipy.constants: pi, speed of light, metric prefixes, mass, time.",
    "difficulty": "Hard",
    "tags": [
      "SciPy",
      "Scientific"
    ]
  },
  {
    "id": "w3-085",
    "order": 85,
    "module": "SciPy Tutorial",
    "submodule": "Scientific Computing",
    "topic": "SciPy Optimizers",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/scipy/scipy_optimizers.asp",
    "status": "Not Started",
    "notes": "Root finding with scipy.optimize.root(), finding minimum with minimize().",
    "difficulty": "Hard",
    "tags": [
      "SciPy",
      "Scientific"
    ]
  },
  {
    "id": "w3-086",
    "order": 86,
    "module": "SciPy Tutorial",
    "submodule": "Scientific Computing",
    "topic": "SciPy Sparse Data",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/scipy/scipy_sparse_data.asp",
    "status": "Not Started",
    "notes": "CSR (Compressed Sparse Row) and CSC (Compressed Sparse Column) matrices.",
    "difficulty": "Hard",
    "tags": [
      "SciPy",
      "Scientific"
    ]
  },
  {
    "id": "w3-087",
    "order": 87,
    "module": "SciPy Tutorial",
    "submodule": "Scientific Computing",
    "topic": "SciPy Graphs",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/scipy/scipy_graphs.asp",
    "status": "Not Started",
    "notes": "scipy.sparse.csgraph: Dijkstra, Floyd-Warshall, Bellman-Ford shortest paths, BFS/DFS.",
    "difficulty": "Hard",
    "tags": [
      "SciPy",
      "Scientific"
    ]
  },
  {
    "id": "w3-088",
    "order": 88,
    "module": "SciPy Tutorial",
    "submodule": "Scientific Computing",
    "topic": "SciPy Spatial Data",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/scipy/scipy_spatial_data.asp",
    "status": "Not Started",
    "notes": "Triangulation (Delaunay), Convex Hull, K-d Trees, distance metrics (Euclidean, Cosine, Hamming).",
    "difficulty": "Hard",
    "tags": [
      "SciPy",
      "Scientific"
    ]
  },
  {
    "id": "w3-089",
    "order": 89,
    "module": "SciPy Tutorial",
    "submodule": "Scientific Computing",
    "topic": "SciPy Matlab Arrays",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/scipy/scipy_matlab_arrays.asp",
    "status": "Not Started",
    "notes": "Reading and writing MATLAB .mat files with scipy.io.loadmat and savemat.",
    "difficulty": "Hard",
    "tags": [
      "SciPy",
      "Scientific"
    ]
  },
  {
    "id": "w3-090",
    "order": 90,
    "module": "SciPy Tutorial",
    "submodule": "Scientific Computing",
    "topic": "SciPy Interpolation",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/scipy/scipy_interpolation.asp",
    "status": "Not Started",
    "notes": "scipy.interpolate.interp1d 1D interpolation, Spline interpolation UnivariateSpline.",
    "difficulty": "Hard",
    "tags": [
      "SciPy",
      "Scientific"
    ]
  },
  {
    "id": "w3-091",
    "order": 91,
    "module": "SciPy Tutorial",
    "submodule": "Scientific Computing",
    "topic": "SciPy Significance Tests",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/scipy/scipy_statistical_significance_tests.asp",
    "status": "Not Started",
    "notes": "Hypothesis testing: T-Test (ttest_ind), KS-Test, Statistical p-value analysis.",
    "difficulty": "Hard",
    "tags": [
      "SciPy",
      "Scientific"
    ]
  },
  {
    "id": "w3-092",
    "order": 92,
    "module": "Django Tutorial",
    "submodule": "Web Framework",
    "topic": "Django Intro",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/django/index.php",
    "status": "Not Started",
    "notes": "High-level Python web framework: Model-View-Template (MVT) architecture.",
    "difficulty": "Medium",
    "tags": [
      "Django",
      "Web"
    ]
  },
  {
    "id": "w3-093",
    "order": 93,
    "module": "Django Tutorial",
    "submodule": "Web Framework",
    "topic": "Django Get Started",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/django/django_getstarted.php",
    "status": "Not Started",
    "notes": "Installing Django in virtualenv, running `django-admin --version`.",
    "difficulty": "Medium",
    "tags": [
      "Django",
      "Web"
    ]
  },
  {
    "id": "w3-094",
    "order": 94,
    "module": "Django Tutorial",
    "submodule": "Web Framework",
    "topic": "Django Create Project",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/django/django_create_project.php",
    "status": "Not Started",
    "notes": "django-admin startproject myproject, structure: settings.py, urls.py, wsgi.py.",
    "difficulty": "Medium",
    "tags": [
      "Django",
      "Web"
    ]
  },
  {
    "id": "w3-095",
    "order": 95,
    "module": "Django Tutorial",
    "submodule": "Web Framework",
    "topic": "Django Create App",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/django/django_create_app.php",
    "status": "Not Started",
    "notes": "python manage.py startapp myapp, registering app in INSTALLED_APPS.",
    "difficulty": "Medium",
    "tags": [
      "Django",
      "Web"
    ]
  },
  {
    "id": "w3-096",
    "order": 96,
    "module": "Django Tutorial",
    "submodule": "Web Framework",
    "topic": "Django Views",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/django/django_views.php",
    "status": "Not Started",
    "notes": "Writing view functions taking request argument and returning HttpResponse.",
    "difficulty": "Medium",
    "tags": [
      "Django",
      "Web"
    ]
  },
  {
    "id": "w3-097",
    "order": 97,
    "module": "Django Tutorial",
    "submodule": "Web Framework",
    "topic": "Django URLs",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/django/django_urls.php",
    "status": "Not Started",
    "notes": "URL routing with path() patterns, include() for modular app URLs.",
    "difficulty": "Medium",
    "tags": [
      "Django",
      "Web"
    ]
  },
  {
    "id": "w3-098",
    "order": 98,
    "module": "Django Tutorial",
    "submodule": "Web Framework",
    "topic": "Django Templates",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/django/django_templates.php",
    "status": "Not Started",
    "notes": "HTML rendering with loader.get_template(), Template tags ({% for %}, {{ var }}).",
    "difficulty": "Medium",
    "tags": [
      "Django",
      "Web"
    ]
  },
  {
    "id": "w3-099",
    "order": 99,
    "module": "Django Tutorial",
    "submodule": "Web Framework",
    "topic": "Django Models",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/django/django_models.php",
    "status": "Not Started",
    "notes": "Defining database schemas with models.Model, CharField, IntegerField, DateField.",
    "difficulty": "Medium",
    "tags": [
      "Django",
      "Web"
    ]
  },
  {
    "id": "w3-100",
    "order": 100,
    "module": "Django Tutorial",
    "submodule": "Web Framework",
    "topic": "Django Migrations",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/django/django_models.php",
    "status": "Not Started",
    "notes": "python manage.py makemigrations and python manage.py migrate.",
    "difficulty": "Medium",
    "tags": [
      "Django",
      "Web"
    ]
  },
  {
    "id": "w3-101",
    "order": 101,
    "module": "Django Tutorial",
    "submodule": "Web Framework",
    "topic": "Django Admin",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/django/django_admin.php",
    "status": "Not Started",
    "notes": "Auto-generated admin interface: createsuperuser, registering models with admin.site.register.",
    "difficulty": "Medium",
    "tags": [
      "Django",
      "Web"
    ]
  },
  {
    "id": "w3-102",
    "order": 102,
    "module": "Django Tutorial",
    "submodule": "Web Framework",
    "topic": "Django QuerySets",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/django/django_queryset.php",
    "status": "Not Started",
    "notes": "ORM querying: Model.objects.all(), values(), values_list(), order_by().",
    "difficulty": "Medium",
    "tags": [
      "Django",
      "Web"
    ]
  },
  {
    "id": "w3-103",
    "order": 103,
    "module": "Django Tutorial",
    "submodule": "Web Framework",
    "topic": "Django Filter",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/django/django_queryset_filter.php",
    "status": "Not Started",
    "notes": "Field lookups: filter(firstname__startswith='L'), Q objects for OR queries.",
    "difficulty": "Medium",
    "tags": [
      "Django",
      "Web"
    ]
  },
  {
    "id": "w3-104",
    "order": 104,
    "module": "Django Tutorial",
    "submodule": "Web Framework",
    "topic": "Django Static Files",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/django/django_static_files.php",
    "status": "Not Started",
    "notes": "Managing CSS, JavaScript, and images: {% load static %}, STATIC_URL settings.",
    "difficulty": "Medium",
    "tags": [
      "Django",
      "Web"
    ]
  },
  {
    "id": "w3-105",
    "order": 105,
    "module": "Django Tutorial",
    "submodule": "Web Framework",
    "topic": "Django Forms",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/django/index.php",
    "status": "Not Started",
    "notes": "Handling HTML forms, CSRF token ({% csrf_token %}), validation with forms.ModelForm.",
    "difficulty": "Medium",
    "tags": [
      "Django",
      "Web"
    ]
  },
  {
    "id": "w3-106",
    "order": 106,
    "module": "Python Matplotlib",
    "submodule": "Data Visualization",
    "topic": "Matplotlib Intro",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/matplotlib_intro.asp",
    "status": "Not Started",
    "notes": "2D plotting library for creating static, animated, and interactive visualizations.",
    "difficulty": "Medium",
    "tags": [
      "Matplotlib",
      "Data"
    ]
  },
  {
    "id": "w3-107",
    "order": 107,
    "module": "Python Matplotlib",
    "submodule": "Data Visualization",
    "topic": "Matplotlib Get Started",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/matplotlib_getting_started.asp",
    "status": "Not Started",
    "notes": "Installation pip install matplotlib, importing `import matplotlib.pyplot as plt`.",
    "difficulty": "Medium",
    "tags": [
      "Matplotlib",
      "Data"
    ]
  },
  {
    "id": "w3-108",
    "order": 108,
    "module": "Python Matplotlib",
    "submodule": "Data Visualization",
    "topic": "Matplotlib Pyplot",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/matplotlib_pyplot.asp",
    "status": "Not Started",
    "notes": "Pyplot state-based interface for fast chart generation.",
    "difficulty": "Medium",
    "tags": [
      "Matplotlib",
      "Data"
    ]
  },
  {
    "id": "w3-109",
    "order": 109,
    "module": "Python Matplotlib",
    "submodule": "Data Visualization",
    "topic": "Matplotlib Plotting",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/matplotlib_plotting.asp",
    "status": "Not Started",
    "notes": "plt.plot(x, y), default x-points [0, 1, 2...], rendering with plt.show().",
    "difficulty": "Medium",
    "tags": [
      "Matplotlib",
      "Data"
    ]
  },
  {
    "id": "w3-110",
    "order": 110,
    "module": "Python Matplotlib",
    "submodule": "Data Visualization",
    "topic": "Matplotlib Markers",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/matplotlib_markers.asp",
    "status": "Not Started",
    "notes": "Emphasizing points with marker='o', '*', 's', marker size ms, edge color mec.",
    "difficulty": "Medium",
    "tags": [
      "Matplotlib",
      "Data"
    ]
  },
  {
    "id": "w3-111",
    "order": 111,
    "module": "Python Matplotlib",
    "submodule": "Data Visualization",
    "topic": "Matplotlib Line",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/matplotlib_line.asp",
    "status": "Not Started",
    "notes": "linestyle ('dotted', 'dashed', '-'), color, linewidth.",
    "difficulty": "Medium",
    "tags": [
      "Matplotlib",
      "Data"
    ]
  },
  {
    "id": "w3-112",
    "order": 112,
    "module": "Python Matplotlib",
    "submodule": "Data Visualization",
    "topic": "Matplotlib Labels",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/matplotlib_labels.asp",
    "status": "Not Started",
    "notes": "plt.title(), plt.xlabel(), plt.ylabel() with fontdict and positioning.",
    "difficulty": "Medium",
    "tags": [
      "Matplotlib",
      "Data"
    ]
  },
  {
    "id": "w3-113",
    "order": 113,
    "module": "Python Matplotlib",
    "submodule": "Data Visualization",
    "topic": "Matplotlib Grid",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/matplotlib_grid.asp",
    "status": "Not Started",
    "notes": "plt.grid(color, linestyle, linewidth) to add background gridlines.",
    "difficulty": "Medium",
    "tags": [
      "Matplotlib",
      "Data"
    ]
  },
  {
    "id": "w3-114",
    "order": 114,
    "module": "Python Matplotlib",
    "submodule": "Data Visualization",
    "topic": "Matplotlib Subplot",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/matplotlib_subplots.asp",
    "status": "Not Started",
    "notes": "plt.subplot(rows, cols, index) to render multi-chart grids.",
    "difficulty": "Medium",
    "tags": [
      "Matplotlib",
      "Data"
    ]
  },
  {
    "id": "w3-115",
    "order": 115,
    "module": "Python Matplotlib",
    "submodule": "Data Visualization",
    "topic": "Matplotlib Scatter",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/matplotlib_scatter.asp",
    "status": "Not Started",
    "notes": "plt.scatter() for relationship analysis between continuous variables.",
    "difficulty": "Medium",
    "tags": [
      "Matplotlib",
      "Data"
    ]
  },
  {
    "id": "w3-116",
    "order": 116,
    "module": "Python Matplotlib",
    "submodule": "Data Visualization",
    "topic": "Matplotlib Bars",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/matplotlib_bars.asp",
    "status": "Not Started",
    "notes": "plt.bar() vertical bars, plt.barh() horizontal bars, width and color.",
    "difficulty": "Medium",
    "tags": [
      "Matplotlib",
      "Data"
    ]
  },
  {
    "id": "w3-117",
    "order": 117,
    "module": "Python Matplotlib",
    "submodule": "Data Visualization",
    "topic": "Matplotlib Histograms",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/matplotlib_histograms.asp",
    "status": "Not Started",
    "notes": "plt.hist() frequency distribution of continuous dataset.",
    "difficulty": "Medium",
    "tags": [
      "Matplotlib",
      "Data"
    ]
  },
  {
    "id": "w3-118",
    "order": 118,
    "module": "Python Matplotlib",
    "submodule": "Data Visualization",
    "topic": "Matplotlib Pie Charts",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/matplotlib_pie_charts.asp",
    "status": "Not Started",
    "notes": "plt.pie() with labels, startangle, explode slices, shadow.",
    "difficulty": "Medium",
    "tags": [
      "Matplotlib",
      "Data"
    ]
  },
  {
    "id": "w3-119",
    "order": 119,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Getting Started",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_getting_started.asp",
    "status": "Not Started",
    "notes": "Introduction to Machine Learning, types of data: Numerical, Categorical, Ordinal.",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-120",
    "order": 120,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Mean Median Mode",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_mean_median_mode.asp",
    "status": "Not Started",
    "notes": "numpy.mean, numpy.median, scipy.stats.mode for central tendencies.",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-121",
    "order": 121,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Standard Deviation",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_standard_deviation.asp",
    "status": "Not Started",
    "notes": "Measuring spread of data values: numpy.std(), variance numpy.var().",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-122",
    "order": 122,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Percentile",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_percentile.asp",
    "status": "Not Started",
    "notes": "Percentage of data points lower than a value: numpy.percentile().",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-123",
    "order": 123,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Data Distribution",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_data_distribution.asp",
    "status": "Not Started",
    "notes": "Random dataset generation with numpy.random.uniform().",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-124",
    "order": 124,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Normal Data Distribution",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_normal_data_distribution.asp",
    "status": "Not Started",
    "notes": "Gaussian bell curve distribution with numpy.random.normal(loc, scale, size).",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-125",
    "order": 125,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Scatter Plot",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_scatterplot.asp",
    "status": "Not Started",
    "notes": "Visualizing correlations between two numerical variables.",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-126",
    "order": 126,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Linear Regression",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_linear_regression.asp",
    "status": "Not Started",
    "notes": "Fitting line y = mx + c with scipy.stats.linregress, r value (Pearson coefficient).",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-127",
    "order": 127,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Polynomial Regression",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_polynomial_regression.asp",
    "status": "Not Started",
    "notes": "Curved line fitting with numpy.polyfit and r2_score.",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-128",
    "order": 128,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Multiple Regression",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_multiple_regression.asp",
    "status": "Not Started",
    "notes": "Predicting target with multiple features using sklearn.linear_model.LinearRegression.",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-129",
    "order": 129,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Scale",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_scale.asp",
    "status": "Not Started",
    "notes": "Feature standardization (Z-score) using sklearn.preprocessing.StandardScaler.",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-130",
    "order": 130,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Train/Test",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_train_test.asp",
    "status": "Not Started",
    "notes": "Splitting dataset (80/20) to evaluate generalization performance and prevent overfitting.",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-131",
    "order": 131,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Decision Tree",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_decision_tree.asp",
    "status": "Not Started",
    "notes": "Flowchart-like classification tree: DecisionTreeClassifier, Gini impurity.",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-132",
    "order": 132,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Confusion Matrix",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_confusion_matrix.asp",
    "status": "Not Started",
    "notes": "True Positives, False Positives, True Negatives, False Negatives, Accuracy, Precision, Recall.",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-133",
    "order": 133,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Hierarchical Clustering",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_hierarchical_clustering.asp",
    "status": "Not Started",
    "notes": "Unsupervised agglomerative clustering and dendrogram visualization.",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-134",
    "order": 134,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Logistic Regression",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_logistic_regression.asp",
    "status": "Not Started",
    "notes": "Predicting probability of categorical outcome (0 or 1) using sigmoid curve.",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-135",
    "order": 135,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Grid Search",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_grid_search.asp",
    "status": "Not Started",
    "notes": "Hyperparameter tuning across candidate parameter grid using GridSearchCV.",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-136",
    "order": 136,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Categorical Data",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_categorical_data.asp",
    "status": "Not Started",
    "notes": "One-Hot Encoding with pandas.get_dummies() and label encoding.",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-137",
    "order": 137,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "K-means",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_k-means.asp",
    "status": "Not Started",
    "notes": "Centroid-based unsupervised clustering. Elbow method for optimal K.",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-138",
    "order": 138,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Bootstrap Aggregation",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_bootstrap_aggregation.asp",
    "status": "Not Started",
    "notes": "Bagging ensemble method to reduce variance across decision trees.",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-139",
    "order": 139,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "Cross Validation",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_cross_validation.asp",
    "status": "Not Started",
    "notes": "K-Fold cross-validation for robust performance estimation.",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-140",
    "order": 140,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "AUC - ROC Curve",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_auc_roc.asp",
    "status": "Not Started",
    "notes": "Area Under Receiver Operating Characteristic Curve for binary classifiers.",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-141",
    "order": 141,
    "module": "Machine Learning",
    "submodule": "Data Science & ML Fundamentals",
    "topic": "K-nearest neighbors",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ml_knn.asp",
    "status": "Not Started",
    "notes": "Non-parametric supervised algorithm based on distance metric (Euclidean).",
    "difficulty": "Hard",
    "tags": [
      "Machine Learning",
      "Data"
    ]
  },
  {
    "id": "w3-142",
    "order": 142,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "Python DSA",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/index.php",
    "status": "Not Started",
    "notes": "Introduction to DSA concepts, Big-O notation, Time & Space complexity analysis.",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-143",
    "order": 143,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "Lists and Arrays",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/dsa_theory_arrays.php",
    "status": "Not Started",
    "notes": "Contiguous memory layout, O(1) random access by index, O(n) insertion/deletion.",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-144",
    "order": 144,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "Stacks",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/dsa_theory_stacks.php",
    "status": "Not Started",
    "notes": "LIFO (Last In First Out). Push, pop, peek using collections.deque or lists.",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-145",
    "order": 145,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "Queues",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/dsa_theory_queues.php",
    "status": "Not Started",
    "notes": "FIFO (First In First Out). Enqueue, dequeue with collections.deque(maxlen=...).",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-146",
    "order": 146,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "Linked Lists",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/dsa_theory_linkedlists.php",
    "status": "Not Started",
    "notes": "Singly and Doubly linked lists: Node(val, next), traversal, insertion at head/tail.",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-147",
    "order": 147,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "Hash Tables",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/dsa_theory_hashtables.php",
    "status": "Not Started",
    "notes": "Hash function mapping keys to buckets, handling collisions (chaining, open addressing).",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-148",
    "order": 148,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "Trees",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/dsa_theory_trees.php",
    "status": "Not Started",
    "notes": "Hierarchical data structure: Root, parent, children, leaves, depth, height.",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-149",
    "order": 149,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "Binary Trees",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/dsa_theory_trees.php",
    "status": "Not Started",
    "notes": "Each node has at most two children (left, right). Preorder, Inorder, Postorder traversals.",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-150",
    "order": 150,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "Binary Search Trees",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/dsa_algo_binarysearchtrees.php",
    "status": "Not Started",
    "notes": "Left child < Node < Right child. O(log n) average search, insert, and delete.",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-151",
    "order": 151,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "AVL Trees",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/dsa_algo_trees.php",
    "status": "Not Started",
    "notes": "Self-balancing BST. Balance factor {-1, 0, 1}, LL, RR, LR, RL rotations.",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-152",
    "order": 152,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "Graphs",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/dsa_theory_graphs.php",
    "status": "Not Started",
    "notes": "Vertices & Edges, Adjacency List vs Adjacency Matrix, BFS and DFS traversals.",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-153",
    "order": 153,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "Linear Search",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/dsa_algo_linearsearch.php",
    "status": "Not Started",
    "notes": "Iterate sequentially through collection. Time Complexity O(n).",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-154",
    "order": 154,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "Binary Search",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/dsa_algo_binarysearch.php",
    "status": "Not Started",
    "notes": "Divide-and-conquer on sorted arrays: low, high, mid = (low + high) // 2. O(log n).",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-155",
    "order": 155,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "Bubble Sort",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/dsa_algo_bubblesort.php",
    "status": "Not Started",
    "notes": "Repeatedly swap adjacent elements if in wrong order. Time Complexity O(n^2).",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-156",
    "order": 156,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "Selection Sort",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/dsa_algo_selectionsort.php",
    "status": "Not Started",
    "notes": "Find minimum element in unsorted subarray and swap to beginning. O(n^2).",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-157",
    "order": 157,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "Insertion Sort",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/dsa_algo_insertionsort.php",
    "status": "Not Started",
    "notes": "Build sorted array one element at a time. Efficient for small/nearly sorted data O(n).",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-158",
    "order": 158,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "Quick Sort",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/dsa_algo_quicksort.php",
    "status": "Not Started",
    "notes": "Partition around pivot element. Average O(n log n), in-place sorting algorithm.",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-159",
    "order": 159,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "Counting Sort",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/dsa_algo_countingsort.php",
    "status": "Not Started",
    "notes": "Non-comparison integer sorting algorithm with O(n + k) time complexity.",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-160",
    "order": 160,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "Radix Sort",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/dsa_algo_radixsort.php",
    "status": "Not Started",
    "notes": "Sort elements digit by digit from least significant to most significant.",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-161",
    "order": 161,
    "module": "Python DSA",
    "submodule": "Data Structures & Algorithms",
    "topic": "Merge Sort",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/dsa/dsa_algo_mergesort.php",
    "status": "Not Started",
    "notes": "Divide array into halves, recursively sort, and merge sorted arrays. O(n log n) stable.",
    "difficulty": "Hard",
    "tags": [
      "DSA",
      "Data"
    ]
  },
  {
    "id": "w3-162",
    "order": 162,
    "module": "Python MySQL",
    "submodule": "Relational Database",
    "topic": "MySQL Get Started",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mysql_getstarted.asp",
    "status": "Not Started",
    "notes": "mysql.connector module, establishing database connection.",
    "difficulty": "Medium",
    "tags": [
      "MySQL",
      "Relational"
    ]
  },
  {
    "id": "w3-163",
    "order": 163,
    "module": "Python MySQL",
    "submodule": "Relational Database",
    "topic": "MySQL Create Database",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mysql_create_db.asp",
    "status": "Not Started",
    "notes": "mycursor.execute(\"CREATE DATABASE mydatabase\"), SHOW DATABASES.",
    "difficulty": "Medium",
    "tags": [
      "MySQL",
      "Relational"
    ]
  },
  {
    "id": "w3-164",
    "order": 164,
    "module": "Python MySQL",
    "submodule": "Relational Database",
    "topic": "MySQL Create Table",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mysql_create_table.asp",
    "status": "Not Started",
    "notes": "CREATE TABLE with PRIMARY KEY AUTO_INCREMENT columns.",
    "difficulty": "Medium",
    "tags": [
      "MySQL",
      "Relational"
    ]
  },
  {
    "id": "w3-165",
    "order": 165,
    "module": "Python MySQL",
    "submodule": "Relational Database",
    "topic": "MySQL Insert",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mysql_insert.asp",
    "status": "Not Started",
    "notes": "INSERT INTO statement, executemany(), mydb.commit() transaction.",
    "difficulty": "Medium",
    "tags": [
      "MySQL",
      "Relational"
    ]
  },
  {
    "id": "w3-166",
    "order": 166,
    "module": "Python MySQL",
    "submodule": "Relational Database",
    "topic": "MySQL Select",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mysql_select.asp",
    "status": "Not Started",
    "notes": "SELECT * or specific columns, fetchall(), fetchone() cursor methods.",
    "difficulty": "Medium",
    "tags": [
      "MySQL",
      "Relational"
    ]
  },
  {
    "id": "w3-167",
    "order": 167,
    "module": "Python MySQL",
    "submodule": "Relational Database",
    "topic": "MySQL Where",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mysql_where.asp",
    "status": "Not Started",
    "notes": "Filtering records with WHERE clause and wildcard % in LIKE.",
    "difficulty": "Medium",
    "tags": [
      "MySQL",
      "Relational"
    ]
  },
  {
    "id": "w3-168",
    "order": 168,
    "module": "Python MySQL",
    "submodule": "Relational Database",
    "topic": "MySQL Order By",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mysql_orderby.asp",
    "status": "Not Started",
    "notes": "Sorting records with ORDER BY column ASC/DESC.",
    "difficulty": "Medium",
    "tags": [
      "MySQL",
      "Relational"
    ]
  },
  {
    "id": "w3-169",
    "order": 169,
    "module": "Python MySQL",
    "submodule": "Relational Database",
    "topic": "MySQL Delete",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mysql_delete.asp",
    "status": "Not Started",
    "notes": "DELETE FROM table WHERE condition. Remember to commit transaction!",
    "difficulty": "Medium",
    "tags": [
      "MySQL",
      "Relational"
    ]
  },
  {
    "id": "w3-170",
    "order": 170,
    "module": "Python MySQL",
    "submodule": "Relational Database",
    "topic": "MySQL Drop Table",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mysql_drop_table.asp",
    "status": "Not Started",
    "notes": "DROP TABLE IF EXISTS statement to delete tables safely.",
    "difficulty": "Medium",
    "tags": [
      "MySQL",
      "Relational"
    ]
  },
  {
    "id": "w3-171",
    "order": 171,
    "module": "Python MySQL",
    "submodule": "Relational Database",
    "topic": "MySQL Update",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mysql_update.asp",
    "status": "Not Started",
    "notes": "UPDATE table SET column = value WHERE condition.",
    "difficulty": "Medium",
    "tags": [
      "MySQL",
      "Relational"
    ]
  },
  {
    "id": "w3-172",
    "order": 172,
    "module": "Python MySQL",
    "submodule": "Relational Database",
    "topic": "MySQL Limit",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mysql_limit.asp",
    "status": "Not Started",
    "notes": "LIMIT count OFFSET start for database pagination.",
    "difficulty": "Medium",
    "tags": [
      "MySQL",
      "Relational"
    ]
  },
  {
    "id": "w3-173",
    "order": 173,
    "module": "Python MySQL",
    "submodule": "Relational Database",
    "topic": "MySQL Join",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mysql_join.asp",
    "status": "Not Started",
    "notes": "INNER JOIN, LEFT JOIN, RIGHT JOIN combining rows from two tables on keys.",
    "difficulty": "Medium",
    "tags": [
      "MySQL",
      "Relational"
    ]
  },
  {
    "id": "w3-174",
    "order": 174,
    "module": "Python MongoDB",
    "submodule": "NoSQL Database",
    "topic": "MongoDB Get Started",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mongodb_getstarted.asp",
    "status": "Not Started",
    "notes": "pymongo driver, MongoClient('mongodb://localhost:27017/').",
    "difficulty": "Medium",
    "tags": [
      "MongoDB",
      "NoSQL"
    ]
  },
  {
    "id": "w3-175",
    "order": 175,
    "module": "Python MongoDB",
    "submodule": "NoSQL Database",
    "topic": "MongoDB Create DB",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mongodb_create_db.asp",
    "status": "Not Started",
    "notes": "Creating database in MongoDB (created once document is inserted).",
    "difficulty": "Medium",
    "tags": [
      "MongoDB",
      "NoSQL"
    ]
  },
  {
    "id": "w3-176",
    "order": 176,
    "module": "Python MongoDB",
    "submodule": "NoSQL Database",
    "topic": "MongoDB Collection",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mongodb_create_collection.asp",
    "status": "Not Started",
    "notes": "Collections are equivalent to tables in relational databases.",
    "difficulty": "Medium",
    "tags": [
      "MongoDB",
      "NoSQL"
    ]
  },
  {
    "id": "w3-177",
    "order": 177,
    "module": "Python MongoDB",
    "submodule": "NoSQL Database",
    "topic": "MongoDB Insert",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mongodb_insert.asp",
    "status": "Not Started",
    "notes": "insert_one() and insert_many(), auto-generated _id ObjectId.",
    "difficulty": "Medium",
    "tags": [
      "MongoDB",
      "NoSQL"
    ]
  },
  {
    "id": "w3-178",
    "order": 178,
    "module": "Python MongoDB",
    "submodule": "NoSQL Database",
    "topic": "MongoDB Find",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mongodb_find.asp",
    "status": "Not Started",
    "notes": "find_one() and find() cursor, field projection { '_id': 0, 'name': 1 }.",
    "difficulty": "Medium",
    "tags": [
      "MongoDB",
      "NoSQL"
    ]
  },
  {
    "id": "w3-179",
    "order": 179,
    "module": "Python MongoDB",
    "submodule": "NoSQL Database",
    "topic": "MongoDB Query",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mongodb_query.asp",
    "status": "Not Started",
    "notes": "Query filter objects with modifier operators ($gt, $regex, etc.).",
    "difficulty": "Medium",
    "tags": [
      "MongoDB",
      "NoSQL"
    ]
  },
  {
    "id": "w3-180",
    "order": 180,
    "module": "Python MongoDB",
    "submodule": "NoSQL Database",
    "topic": "MongoDB Sort",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mongodb_sort.asp",
    "status": "Not Started",
    "notes": "sort('name', 1) ascending or -1 descending.",
    "difficulty": "Medium",
    "tags": [
      "MongoDB",
      "NoSQL"
    ]
  },
  {
    "id": "w3-181",
    "order": 181,
    "module": "Python MongoDB",
    "submodule": "NoSQL Database",
    "topic": "MongoDB Delete",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mongodb_delete.asp",
    "status": "Not Started",
    "notes": "delete_one() and delete_many() based on query filter.",
    "difficulty": "Medium",
    "tags": [
      "MongoDB",
      "NoSQL"
    ]
  },
  {
    "id": "w3-182",
    "order": 182,
    "module": "Python MongoDB",
    "submodule": "NoSQL Database",
    "topic": "MongoDB Drop Collection",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mongodb_drop_collection.asp",
    "status": "Not Started",
    "notes": "mycol.drop() removes entire collection from database.",
    "difficulty": "Medium",
    "tags": [
      "MongoDB",
      "NoSQL"
    ]
  },
  {
    "id": "w3-183",
    "order": 183,
    "module": "Python MongoDB",
    "submodule": "NoSQL Database",
    "topic": "MongoDB Update",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mongodb_update.asp",
    "status": "Not Started",
    "notes": "update_one() and update_many() with modifier $set.",
    "difficulty": "Medium",
    "tags": [
      "MongoDB",
      "NoSQL"
    ]
  },
  {
    "id": "w3-184",
    "order": 184,
    "module": "Python MongoDB",
    "submodule": "NoSQL Database",
    "topic": "MongoDB Limit",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_mongodb_limit.asp",
    "status": "Not Started",
    "notes": "limit(count) cursor method to constrain result set.",
    "difficulty": "Medium",
    "tags": [
      "MongoDB",
      "NoSQL"
    ]
  },
  {
    "id": "w3-185",
    "order": 185,
    "module": "Python Cert",
    "submodule": "Certifications",
    "topic": "Python Certificate",
    "resourceName": "W3Schools",
    "resourceUrl": "https://campus.w3schools.com/collections/certifications/products/python-certificate",
    "status": "Not Started",
    "notes": "Official W3Schools Python developer certification exam prep.",
    "difficulty": "Medium",
    "tags": [
      "Cert",
      "Certifications"
    ]
  },
  {
    "id": "w3-186",
    "order": 186,
    "module": "Python Reference",
    "submodule": "Standard References",
    "topic": "Python Overview",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_reference.asp",
    "status": "Not Started",
    "notes": "Complete reference documentation index for Python language constructs.",
    "difficulty": "Medium",
    "tags": [
      "Reference",
      "Standard"
    ]
  },
  {
    "id": "w3-187",
    "order": 187,
    "module": "Python Reference",
    "submodule": "Standard References",
    "topic": "Python Built-in Functions",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ref_functions.asp",
    "status": "Not Started",
    "notes": "Comprehensive index of 68+ built-in functions: len, type, map, filter, zip, sum, etc.",
    "difficulty": "Medium",
    "tags": [
      "Reference",
      "Standard"
    ]
  },
  {
    "id": "w3-188",
    "order": 188,
    "module": "Python Reference",
    "submodule": "Standard References",
    "topic": "Python String Methods",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ref_string.asp",
    "status": "Not Started",
    "notes": "All string methods: upper, lower, strip, split, join, replace, format, find.",
    "difficulty": "Medium",
    "tags": [
      "Reference",
      "Standard"
    ]
  },
  {
    "id": "w3-189",
    "order": 189,
    "module": "Python Reference",
    "submodule": "Standard References",
    "topic": "Python List Methods",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ref_list.asp",
    "status": "Not Started",
    "notes": "All list methods: append, clear, copy, count, extend, index, insert, pop, remove, reverse, sort.",
    "difficulty": "Medium",
    "tags": [
      "Reference",
      "Standard"
    ]
  },
  {
    "id": "w3-190",
    "order": 190,
    "module": "Python Reference",
    "submodule": "Standard References",
    "topic": "Python Dictionary Methods",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ref_dictionary.asp",
    "status": "Not Started",
    "notes": "All dict methods: clear, copy, fromkeys, get, items, keys, pop, popitem, setdefault, update, values.",
    "difficulty": "Medium",
    "tags": [
      "Reference",
      "Standard"
    ]
  },
  {
    "id": "w3-191",
    "order": 191,
    "module": "Python Reference",
    "submodule": "Standard References",
    "topic": "Python Tuple Methods",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ref_tuple.asp",
    "status": "Not Started",
    "notes": "Tuple methods: count() and index().",
    "difficulty": "Medium",
    "tags": [
      "Reference",
      "Standard"
    ]
  },
  {
    "id": "w3-192",
    "order": 192,
    "module": "Python Reference",
    "submodule": "Standard References",
    "topic": "Python Set Methods",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ref_set.asp",
    "status": "Not Started",
    "notes": "All set methods: add, clear, copy, difference, discard, intersection, issubset, union.",
    "difficulty": "Medium",
    "tags": [
      "Reference",
      "Standard"
    ]
  },
  {
    "id": "w3-193",
    "order": 193,
    "module": "Python Reference",
    "submodule": "Standard References",
    "topic": "Python File Methods",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ref_file.asp",
    "status": "Not Started",
    "notes": "File object methods: close, detach, fileno, flush, isatty, read, readline, seek, tell, write.",
    "difficulty": "Medium",
    "tags": [
      "Reference",
      "Standard"
    ]
  },
  {
    "id": "w3-194",
    "order": 194,
    "module": "Python Reference",
    "submodule": "Standard References",
    "topic": "Python Keywords",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ref_keywords.asp",
    "status": "Not Started",
    "notes": "Reserved keywords: and, as, assert, break, class, continue, def, del, elif, else, except, etc.",
    "difficulty": "Medium",
    "tags": [
      "Reference",
      "Standard"
    ]
  },
  {
    "id": "w3-195",
    "order": 195,
    "module": "Python Reference",
    "submodule": "Standard References",
    "topic": "Python Exceptions",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ref_exceptions.asp",
    "status": "Not Started",
    "notes": "Built-in exception hierarchy: TypeError, ValueError, KeyError, IndexError, ZeroDivisionError.",
    "difficulty": "Medium",
    "tags": [
      "Reference",
      "Standard"
    ]
  },
  {
    "id": "w3-196",
    "order": 196,
    "module": "Python Reference",
    "submodule": "Standard References",
    "topic": "Python Glossary",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_ref_glossary.asp",
    "status": "Not Started",
    "notes": "Terms and definitions for Python programming terms.",
    "difficulty": "Medium",
    "tags": [
      "Reference",
      "Standard"
    ]
  },
  {
    "id": "w3-197",
    "order": 197,
    "module": "Module Reference",
    "submodule": "Standard Libraries",
    "topic": "Built-in Modules",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_modules.asp",
    "status": "Not Started",
    "notes": "Python's batteries-included standard libraries overview.",
    "difficulty": "Medium",
    "tags": [
      "Module Reference",
      "Standard"
    ]
  },
  {
    "id": "w3-198",
    "order": 198,
    "module": "Module Reference",
    "submodule": "Standard Libraries",
    "topic": "Random Module",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/module_random.asp",
    "status": "Not Started",
    "notes": "Pseudo-random number generator: random(), randint(), choice(), shuffle(), sample().",
    "difficulty": "Medium",
    "tags": [
      "Module Reference",
      "Standard"
    ]
  },
  {
    "id": "w3-199",
    "order": 199,
    "module": "Module Reference",
    "submodule": "Standard Libraries",
    "topic": "Requests Module",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/module_requests.asp",
    "status": "Not Started",
    "notes": "HTTP library: requests.get(), post(), put(), delete(), json response, headers.",
    "difficulty": "Medium",
    "tags": [
      "Module Reference",
      "Standard"
    ]
  },
  {
    "id": "w3-200",
    "order": 200,
    "module": "Module Reference",
    "submodule": "Standard Libraries",
    "topic": "Statistics Module",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/module_statistics.asp",
    "status": "Not Started",
    "notes": "Mathematical statistics functions: mean, median, mode, stdev, variance.",
    "difficulty": "Medium",
    "tags": [
      "Module Reference",
      "Standard"
    ]
  },
  {
    "id": "w3-201",
    "order": 201,
    "module": "Module Reference",
    "submodule": "Standard Libraries",
    "topic": "Math Module",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/module_math.asp",
    "status": "Not Started",
    "notes": "C standard mathematical functions: trigonometry, logarithms, constants e & pi.",
    "difficulty": "Medium",
    "tags": [
      "Module Reference",
      "Standard"
    ]
  },
  {
    "id": "w3-202",
    "order": 202,
    "module": "Module Reference",
    "submodule": "Standard Libraries",
    "topic": "cMath Module",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/module_cmath.asp",
    "status": "Not Started",
    "notes": "Mathematical functions for complex numbers: polar, rect, phase.",
    "difficulty": "Medium",
    "tags": [
      "Module Reference",
      "Standard"
    ]
  },
  {
    "id": "w3-203",
    "order": 203,
    "module": "Python How To",
    "submodule": "Common Problem Solving",
    "topic": "Remove List Duplicates",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_howto_remove_duplicates.asp",
    "status": "Not Started",
    "notes": "Techniques: list(dict.fromkeys(mylist)) to preserve order, or list(set(mylist)).",
    "difficulty": "Basic",
    "tags": [
      "How To",
      "Common"
    ]
  },
  {
    "id": "w3-204",
    "order": 204,
    "module": "Python How To",
    "submodule": "Common Problem Solving",
    "topic": "Reverse a String",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_howto_reverse_string.asp",
    "status": "Not Started",
    "notes": "Idiomatic Python string slicing: txt[::-1] or ''.join(reversed(txt)).",
    "difficulty": "Basic",
    "tags": [
      "How To",
      "Common"
    ]
  },
  {
    "id": "w3-205",
    "order": 205,
    "module": "Python How To",
    "submodule": "Common Problem Solving",
    "topic": "Add Two Numbers",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_howto_add_two_numbers.asp",
    "status": "Not Started",
    "notes": "Reading inputs, casting to float/int, and printing sum.",
    "difficulty": "Basic",
    "tags": [
      "How To",
      "Common"
    ]
  },
  {
    "id": "w3-206",
    "order": 206,
    "module": "Python Examples",
    "submodule": "Practice & Assessment",
    "topic": "Python Examples",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_examples.asp",
    "status": "Not Started",
    "notes": "Collection of curated real-world Python code examples.",
    "difficulty": "Medium",
    "tags": [
      "Examples",
      "Practice"
    ]
  },
  {
    "id": "w3-207",
    "order": 207,
    "module": "Python Examples",
    "submodule": "Practice & Assessment",
    "topic": "Python Compiler",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_compiler.asp",
    "status": "Not Started",
    "notes": "Online interactive Python sandbox to run and test code immediately.",
    "difficulty": "Medium",
    "tags": [
      "Examples",
      "Practice"
    ]
  },
  {
    "id": "w3-208",
    "order": 208,
    "module": "Python Examples",
    "submodule": "Practice & Assessment",
    "topic": "Python Exercises",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_exercises.asp",
    "status": "Not Started",
    "notes": "Hands-on exercises for each topic with immediate automated grading.",
    "difficulty": "Medium",
    "tags": [
      "Examples",
      "Practice"
    ]
  },
  {
    "id": "w3-209",
    "order": 209,
    "module": "Python Examples",
    "submodule": "Practice & Assessment",
    "topic": "Python Quiz",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_quiz.asp",
    "status": "Not Started",
    "notes": "Multiple-choice assessment testing Python proficiency.",
    "difficulty": "Medium",
    "tags": [
      "Examples",
      "Practice"
    ]
  },
  {
    "id": "w3-210",
    "order": 210,
    "module": "Python Examples",
    "submodule": "Practice & Assessment",
    "topic": "Python Challenges",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_challenges.asp",
    "status": "Not Started",
    "notes": "Algorithmic coding challenges to test problem-solving skills.",
    "difficulty": "Medium",
    "tags": [
      "Examples",
      "Practice"
    ]
  },
  {
    "id": "w3-211",
    "order": 211,
    "module": "Python Examples",
    "submodule": "Practice & Assessment",
    "topic": "Python Practice Problems",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_exercises.asp",
    "status": "Not Started",
    "notes": "Curated problem set covering data types, loops, logic, and OOP.",
    "difficulty": "Medium",
    "tags": [
      "Examples",
      "Practice"
    ]
  },
  {
    "id": "w3-212",
    "order": 212,
    "module": "Python Examples",
    "submodule": "Practice & Assessment",
    "topic": "Python Server",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_server.asp",
    "status": "Not Started",
    "notes": "Running lightweight Python HTTP server with http.server.",
    "difficulty": "Medium",
    "tags": [
      "Examples",
      "Practice"
    ]
  },
  {
    "id": "w3-213",
    "order": 213,
    "module": "Python Examples",
    "submodule": "Practice & Assessment",
    "topic": "Python Syllabus",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_syllabus.asp",
    "status": "Not Started",
    "notes": "Comprehensive outline of Python topics and learning pathways.",
    "difficulty": "Medium",
    "tags": [
      "Examples",
      "Practice"
    ]
  },
  {
    "id": "w3-214",
    "order": 214,
    "module": "Python Examples",
    "submodule": "Practice & Assessment",
    "topic": "Python Study Plan",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_study_plan.asp",
    "status": "Not Started",
    "notes": "Structured week-by-week roadmap for mastering Python & DSA.",
    "difficulty": "Medium",
    "tags": [
      "Examples",
      "Practice"
    ]
  },
  {
    "id": "w3-215",
    "order": 215,
    "module": "Python Examples",
    "submodule": "Practice & Assessment",
    "topic": "Python Interview Q&A",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_interview_questions.asp",
    "status": "Not Started",
    "notes": "Top frequently asked technical interview questions and answers.",
    "difficulty": "Medium",
    "tags": [
      "Examples",
      "Practice"
    ]
  },
  {
    "id": "w3-216",
    "order": 216,
    "module": "Python Examples",
    "submodule": "Practice & Assessment",
    "topic": "Python Training",
    "resourceName": "W3Schools",
    "resourceUrl": "https://www.w3schools.com/python/python_training.asp",
    "status": "Not Started",
    "notes": "Guided certification and course pathways.",
    "difficulty": "Medium",
    "tags": [
      "Examples",
      "Practice"
    ]
  }
];
