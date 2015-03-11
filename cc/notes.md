All knowledge was taken from http://www.stroustrup.com/4th.html

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


## Glossary
- RAII - Resource Acquisition Is Initialization
