1. What is the difference between var, let, and const?

Answer: Var, let and const all are used for declaring variable. 
Var is a function scoped, it can be redeclared and updated. Let is a blocked scoped, it can be updated but not redeclared in the same scope and Const is also a blocked scoped, it cannot be reassigned.

2. What is the difference between map(), forEach(), and filter()?

Answer: map() creates a new array by transforming each element, forEach() just runs a function on each element without returning anything, and filter() builds a new array with only the elements that pass a given condition. Instead of writing long loops, these methods give cleaner and more readable code. 

3. What are arrow functions in ES6?

Answer: Arrow functions in ES6 are just a shorter way to write functions using the => syntax. They make code shorter and easier to read, and they don’t create their own this, so they use the value from the outer scope. This makes them very useful in places like array methods and small functions.

4. How does destructuring assignment work in ES6?

Answer: Destructuring in ES6 lets take values from an array or object and put them into variables in one step. It makes the code shorter and easier because you don’t have to access each value separately.

5. Explain template literals in ES6. How are they different from string concatenation?

Answer: Template literals in ES6 create strings using backticks `` instead of quotes. You can easily include variables or expressions inside the string with ${}. Template literals help us to keep everything in one readable string without extra symbols.