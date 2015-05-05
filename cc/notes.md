Notes about C++
---

All knowledge was taken from http://www.stroustrup.com/4th.html

An algorithm is "a finite set of rules which gives a sequence of operations for
solving a specific set of problems [and] has five important features:"
- Finiteness
- Definiteness
- Input
- Output
- Effectiveness

---

Advices
---


- Focus on programming techniques, not on language features.
- Express ideas directly in code.
- Define classes to represent application concepts directly in code.
- Use concrete classes to represent simple concepts and performance-critical components.
- Avoid 'naked' new and delete operations
- Use resource handlers and RAII
- Use abstract classes and interfaces when complete separation of interface and implementation i needed.
- Use class hierarchies to represent concepts with inherent hierarchical structure.
- When designing a class hierarchy, distinguish between implementation inheritance and interface inheritance.
- Provide strong resource safety; that is, never leak anything that you think of as resource.
- Use containers, defined as resource-handle templates, to hold collection of values of the same type.
- Use function templates to represent general algorithms.
- Use function objects, including lambdas, to represent policies and actions.
- Use type and template aliases to provide a uniform notation for types that may vary among similar types or among implementations.

---

- Don't reivent the wheel; use libraries.
- When you have a choice; prefer the standard library over other libraries.
- Do not think that the standard library is ideal for everything
- Remember to #include the headers for the facilities you use
- Remember that standard-library facilities are defined in namespace std
- Prefer strings over C-style strings (a `char*`)
- iostreams are type-sensitive, type-safe and extensible.
- Prefer `vector<T>`, `map<T>` and `unordered_map<K, T>` over `T[]`
- Know your standard containers and their tradeoffs.
- Use vector as your default container.
- Prefer compact data structures
- If in doubt, use a range-checked vector
- Use `push_back()` or `back_inserter()` to add elements to a container.
- Use `push_back()` on a vector rather than `realloc()` on an array
- Catch common exceptions in `main()`
- Know your standard algorithms and prefer them over handwritten loops.
- If iterator use gets tedious, define container algorithms
- You can use the range-for loop for a complete container.

---

- Use resource handles to manage resources (RAII)
- Use `unique_ptr` to refer to objects of polymorphic type
- Use `shared_ptr` to refer to shared objects
- Use type-safe mechanisms for concurrency
- Minimize the use of shared data.
- Dont choose shared data for communication because of 'efficiency' widthout thought and preferably not without measurements.
- Dont assume something, prove it!
- Think in terms of concurrent tasks, rather than threads.
- A library doesnt have to be large or complicated to be useful.
- Time your programs before making claims about efficiency.
- You can write code to explicitly depend on properties of types.
- Use regular expressions for simple pattern matching.
- Dont try to do serious numeric computation using only the language; use libraries.
- Properties of numeric types are accesible through `numeric_limits`

---

- For the final word on lamgiage defomotopm ossies. see tje OSP C++ standard.
- Avoid unspecified and undefined behavior
- Isolate code that must depend on implementation-defined behaviors
- Avoid unecessary assumptions about the numeric value of characters
- Remember that an integer starting with 0 is octal.
- Avoid 'magic constants'
- Avoid unecessary assumptions about the size of integers
- Avoid unecessary assumptions about the range and precision of floating-point types.
- Prefer plain char over signed char and unsigned char
- Beware of conversions between signed and unsigned types
- Declare one name (only) per declaration.
- Keep common and local names short, and keep uncommon and nonlocal names longer.
- Avoid similar-looking names
- Name an object to reflect its meaning rather than its type
- Maintain a consistent naming style.
- Avoid `ALL_CAPS` names
- Keep scopes small
- Dont use the same name in both a scope and an enclosing scope
- Prefer the {}-initializer syntax for declarations with a named type.
- Prefer the = syntax for the initialization in declarations using auto
- Avoid unitialized variables.
- Use an alias to define meaningful name for a built-in type in cases in which the built-in type used to represent a value might change.
- Use an alias to define synonyms for types; use enumerations and classes to define new types

---

- Keep use of pointers simple and straightforward.
- Avoid nontrivial pointers arithmetic.
- Take care not to write beyond the bounds of an array.
- Avoid multidimensional arrays; define suitable containers instead.
- Use `nullptr` rather than `0` or `NULL`
- Use containers (e.g. `vector`, `array`, and `valarray`) rather than build-in (C-style) arrays
- Use `string` rather than zero-terminaed arrays of `char`.
- Use raw strings for string literals with complicated uses of backslash.
- Prefer `const` reference arguments to plain reference arguments.
- Use rvalue references (only) for forwarding and move semantics.
- Keep pointers that represent ownership inside handle classes.
- Avoid `void*` except in low-level code
- Use `const` pointers and `const` references to express immutability in interfaces.
- Prefer references to pointers as arguments, except where 'no object' is reasonable option.

---

- When compactness of data is important, lay out structure data members with larger members before smmaller ones.
- Use bit-fields to represent hardware-imposed data layouts.
- Dont naively try to optimize memory comsumption by packing several values into a single byte.
- Use unions to save space (represent alternatives) and never for type conversion.
- Use enumerations to represent sets of named constants.
- Prefer enum classes over plain enums to minimize surprises.
- Define operations on enumerations for safe and simple use.

---

- Dont declare a variable until you have a value to initialize it with.
- Prefer a switch-statement to an if-statement when there is a choice.
- Prefer a range-for-statement to an if-statement when there is a choice.
- Prefer a for-statement to a while-statement when there is an obvious loop variable.
- Prefer a while-statement to a for-statement when there is no obvious loop variable.
- Avoid do-statements.
- Avoid goto.
- Keep comments crisp.
- Dont say in comments what can be clearly stated in code.
- State intent in comments.
- Maintain a consistent indentation.

---

Glossary
---

- RAII - Resource Acquisition Is Initialization
- mutex - mutual exclusion object
- smatch - s stands for sub or string and smatch is a vector of sub-matches of type string.
- lvalue - something that can appear to the left-hand of an expression
- rvalue - a value that is not a lvalue
