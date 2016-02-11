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

TODO
---

### Re-read
- Pointers and References
- Exception handling

---

Advices
---

## 0011

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

## 0100

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

## 0101

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

## 0110

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

## 0111

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

## 1000

- When compactness of data is important, lay out structure data members with larger members before smmaller ones.
- Use bit-fields to represent hardware-imposed data layouts.
- Dont naively try to optimize memory comsumption by packing several values into a single byte.
- Use unions to save space (represent alternatives) and never for type conversion.
- Use enumerations to represent sets of named constants.
- Prefer enum classes over plain enums to minimize surprises.
- Define operations on enumerations for safe and simple use.

---

## 1001

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

## 1010

- Prefer the standard library to other libraries and to "handcrafted code"
- Use character-level input only when you have to.
- When reading, always consider ill-formed(badly formed) input.
- Prefer suitable abstractions (classes, algorithms, etc.) to direct use of language features (e.g., ints, statements).
- Avoid complicated expressions.
- If in doubt about operator precedence, parenthesize
- Avoid expressions with undefined order of evaluation.
- Avoid narrowing conversions.
- Define symbolic constants to avoid "magic constants".

---

## 1011

- Prefer prefix `++` over suffix `++`.
- Use resource handles to avoid leaks, premature deletion, and double deletion.
- Dont put objects on the free store if you dont have to; prefer scoped variables.
- Avoid `naked new` and `naked delete`.
- Use RAII
- Prefer a named function object to a lambda if the operation requires comments.
- Prefer a named function object to a lambda if the operation is generally usefull.
- Keep lambdas short.
- For maintainability and correctness, be careful about capture by reference.
- Let the compiler deduce the return type of a lambda.
- Use the `T{e}` notation for construction.
- Avoid explicity type conversion (casts).
- When explicity type conversion is necessary, prefer a named cast.
- Consider using a run-time checked cast, such as `narrow_cast<>()`, for conversion between numeric types.

---

## 1100

- "Package" meaningful operations as carefully named `functions`.
- A function should perform a single logical operation.
- Keep functions **short** and **clear**
- Dont return pointers or references to local variables.
- If a function may have to be evaluated at compile time, declare it `constexpr`
- If a function cannot return, mark it [[noreturn]]
- Use pass-by-value for small objects
- Use pass-by-const-reference to pass large values that you dont need to modify.
- Return a result as a return value rather than modifying an object through an argument.
- Use rvalue references to implement move and forwarding.
- Pass a pointer if 'no object' is a valid alternative (and represent 'no object' by  `nullptr`)
- Use pass-by-non-const-reference only if you have to
- Use `const` extensively and consistently.
- Assume that `char*` or a `const char*` argument points to a C-style string.
- Avoid passing arrays as pointers.
- Pass homogeneous list of unknown length as an `initializer_list<T>` (or as some other container)
- Avoid unspecified numbers of arguments (...)
- Use overloading when functions perform conceptually the same task on different types.
- When overloading on integers, provide functions to eliminate common ambiguities.
- Specify preconditions and postconditions for your functions.
- Prefer function objects (including lambdas) and virtual functions to pointers to functions.
- Avoid macros.
- If you must use macros, use ugly names with lots of capital letters.

---

## 1101

- Develop an error-handling strategy early in a design.
- Throw an exception to indicate that you cannot perform an assigned task.
- Use exceptions for error handling.
- Use purpose-designed user-defined types as exceptions (not built-in types)
- If you for some reason cannot use exception, mimic them.
- Use hierarchical error handling.
- Keep the individual parts of error handling simple.
- Dont try to catch every exception in every function.
- Always provide the basic guarantee.
- Provide the strong guarantee unless there is a reason not to.
- Let a constructor estabilish an invariant, and throw if it cannot.
- Release locally owned resources before throwing an exception.
- Be sure that every resource acquired in a constructor is released when throwing an exception in that constructor.
- Dont use exceptions where more local control structures will suffice.
- Use the 'Resource Acquisiton Is Initialization' (RAII) and exception handlers to maintain invariants.
- Prefer proper resource handles to the less structured `finally`.
- Design your error-handling strategy around invariants.
- What can be checked at compile time usually best checked at compile time (using `static_assert`)
- Design your error-handling strategy to allow for different levels of checking/enforcement.
- If your function may not throw, declare it `noexcept`
- Dont use exception specification.
- Catch exceptions that may be part of a hierarchy by reference.
- Dont assume that every exception is derived from class `exception`.
- Have `main()` catch and report all exceptions.
- Dont destroy information before you have its replacement ready.
- Leave operands in valid state before throwing an exception from an assignment.
- Never let an exception espace from a destructor.
- Keep ordinary code and error-handling code separate.
- Beware of memory leakes caused by memory allocated by `new` not being released in cases of an exception.
- Assume that every exception that can be thrown by a function will be thrown.
- A library shouldnt unilaterally terminate a program. Instead, throw an exception and let a caller decide.
- A library shouldnt produce diagnostic output aimed at an end user. Instead, throw an exception and let a caller decide.

---

## 1110

- Use namespaces to express logical structure.
- Place every nonlocal name, except `main()`, in some namespace.
- Design a namespace so that you can conveniently use it without accidentally gaining access to unrelated namespaces.
- Avoid very short names for namespaces.
- If necessary, use namespace aliases to abbreviate long namespace names.
- Avoid placing heavy notational burdens on users of your namespaces.
- Use separate namespaces for interfaaces and implementations
- Use the `Namespace::member` notation when defining namespace members.
- Use `inline` namespaces to support versioning.
- Use `using-directives` for transition, for foundational libraries (such as `std`), or within a local scope.
- Dont put a `using-directive` in a header file.

---

## 1111

- Use header files to represent interfaces and to emphasize logical structure.
- `#include` a header in the source file that implements its functions.
- Dont define global entitie with the same name and similar-but-different meanings in different translation units.
- Avoid non-inline function definitions in headers.
- Use `#include` only at global scope and in namespaces.
- `#include` only complete declarations.
- Use include guards.
- `#include` C headers in namespaces to avoide global names.
- Make headers self-contained.
- Distinguish bettween user' interfaces and implementers' interface.
- Distinguish between averagens users' interfaces and expert users' interfaces.
- Avoid nonlocal objects that require run-time initialization in code intended for use as part of non-C++ programs.

---

## 10000

- Represent concepts as classes.
- Separate the interface of a class from its implementation.
- Use public data (`structs`) only when it really is just data and no invariant is meaningful for the data members.
- Define a constructor to handle initialization of objects.
- By default declare single-argument constructors `explicit`.
- Declare a member function that does not modify the state of its object `const`.
- A concrete type is the simplest kind of class. Where applicable, prefer a concrete type over more complicated classes and over plain data structures.
- Make a function a member only if it needs direct access to the representation of a class.
- Use a namespace to make the association between a class and its helper functions explicit.
- Use in-class initializers to avoid repetition in constructors.
- Make a function that needs access to the representation of a class but needn't be called for a specific object a `static` member function.

---



---

Glossary
---

- RAII - Resource Acquisition Is Initialization
- mutex - mutual exclusion object
- smatch - s stands for sub or string and smatch is a vector of sub-matches of type string.
- lvalue - something that can appear to the left-hand of an expression
- rvalue - a value that is not a lvalue
