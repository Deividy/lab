All knowledge was taken from http://www.stroustrup.com/4th.html

An algorithm is "a finite set of rules which gives a sequence of operations for
solving a specific set of problems [and] has five important features:"
- Finiteness
- Definiteness
- Input
- Output
- Effectiveness

## Advices

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
                                   

## Glossary
- RAII - Resource Acquisition Is Initialization
- mutex - mutual exclusion object
