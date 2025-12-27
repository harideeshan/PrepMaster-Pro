-- ==========================================================
-- TECHNICAL: JAVA
-- ==========================================================
INSERT INTO question (category, difficulty_level, option1, option2, option3, option4, question_title, right_answer) VALUES 
('Java', 'Easy', 'Object', 'Class', 'Main', 'System', 'What is the parent class of all Java classes?', 'Object'),
('Java', 'Medium', 'JDK', 'JRE', 'JVM', 'JIT', 'Which component is responsible for converting bytecode to machine code?', 'JVM'),
('Java', 'Hard', 'Heap', 'Stack', 'Method Area', 'PC Register', 'Where are objects stored in memory during runtime?', 'Heap'),
('Java', 'Medium', 'Final', 'Static', 'Private', 'Abstract', 'Which keyword prevents a class from being inherited?', 'Final'),
('Java', 'Hard', 'Strong', 'Soft', 'Weak', 'Phantom', 'Which type of reference allows an object to be collected immediately when memory is needed?', 'Weak'),
('Java', 'Easy', 'Interface', 'Abstract Class', 'Enum', 'Annotation', 'Which of these cannot be instantiated?', 'Abstract Class'),
('Java', 'Medium', 'Error', 'Checked Exception', 'Unchecked Exception', 'Runtime', 'What type of exception is NullPointerException?', 'Unchecked Exception'),
('Java', 'Medium', 'Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction', 'Restricting access to data members is called?', 'Encapsulation'),
('Java', 'Easy', '8', '16', '32', '64', 'What is the size of an int in Java (in bits)?', '32'),
('Java', 'Hard', 'O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'What is the worst-case time complexity of HashMap.get() in Java 8+?', 'O(log n)');

-- ==========================================================
-- TECHNICAL: DSA
-- ==========================================================
INSERT INTO question (category, difficulty_level, option1, option2, option3, option4, question_title, right_answer) VALUES 
('DSA', 'Easy', 'Queue', 'Array', 'Stack', 'Linked List', 'Which data structure works on LIFO principle?', 'Stack'),
('DSA', 'Medium', 'O(1)', 'O(log n)', 'O(n)', 'O(n^2)', 'What is the time complexity of searching in a Balanced Binary Search Tree?', 'O(log n)'),
('DSA', 'Hard', 'Dijkstra', 'Kruskal', 'Prim', 'Bellman-Ford', 'Which algorithm is used for shortest paths with negative weights?', 'Bellman-Ford'),
('DSA', 'Medium', 'BFS', 'DFS', 'Inorder', 'Preorder', 'Which traversal uses a Queue?', 'BFS'),
('DSA', 'Hard', 'Array', 'Linked List', 'Hash Table', 'Skip List', 'Which data structure is best for implementing a LRU Cache?', 'Hash Table'),
('DSA', 'Easy', 'O(1)', 'O(n)', 'O(n^2)', 'O(log n)', 'Time complexity of accessing an element in an array by index?', 'O(1)'),
('DSA', 'Medium', 'Selection Sort', 'Bubble Sort', 'Quick Sort', 'Merge Sort', 'Which sorting algorithm is stable and has O(n log n) worst case?', 'Merge Sort'),
('DSA', 'Hard', 'Stack', 'Heap', 'Graph', 'Trie', 'Which data structure is ideal for Autocomplete features?', 'Trie'),
('DSA', 'Medium', 'Adjacency Matrix', 'Adjacency List', 'Edge List', 'Incidence Matrix', 'Which graph representation is better for sparse graphs?', 'Adjacency List'),
('DSA', 'Easy', 'Leaf', 'Root', 'Node', 'Branch', 'The topmost node of a tree is called?', 'Root');

-- ==========================================================
-- TECHNICAL: SQL
-- ==========================================================
INSERT INTO question (category, difficulty_level, option1, option2, option3, option4, question_title, right_answer) VALUES 
('SQL', 'Easy', 'GET', 'SELECT', 'EXTRACT', 'SHOW', 'Which statement is used to extract data?', 'SELECT'),
('SQL', 'Medium', 'Primary Key', 'Foreign Key', 'Unique Key', 'Candidate Key', 'Which constraint identifies a record in another table?', 'Foreign Key'),
('SQL', 'Hard', 'Inner Join', 'Left Join', 'Cross Join', 'Full Outer Join', 'Which join returns all rows when there is a match in one of the tables?', 'Full Outer Join'),
('SQL', 'Medium', 'GROUP BY', 'ORDER BY', 'HAVING', 'WHERE', 'Which clause is used to filter results after an aggregation?', 'HAVING'),
('SQL', 'Easy', 'UPDATE', 'MODIFY', 'SAVE', 'CHANGE', 'Which command is used to change existing data in a table?', 'UPDATE'),
('SQL', 'Hard', 'Atomicity', 'Consistency', 'Isolation', 'Durability', 'Which ACID property ensures transactions are all-or-nothing?', 'Atomicity'),
('SQL', 'Medium', 'Index', 'View', 'Trigger', 'Stored Procedure', 'What is used to speed up data retrieval?', 'Index'),
('SQL', 'Hard', '1NF', '2NF', '3NF', 'BCNF', 'Which normal form deals with transitive dependencies?', '3NF'),
('SQL', 'Easy', 'COUNT()', 'SUM()', 'AVG()', 'TOTAL()', 'Which function returns the number of rows?', 'COUNT()'),
('SQL', 'Medium', 'DROP', 'TRUNCATE', 'DELETE', 'REMOVE', 'Which DDL command removes all records but keeps the table structure?', 'TRUNCATE');

-- ==========================================================
-- TECHNICAL: PYTHON, HTML, CSS
-- ==========================================================
INSERT INTO question (category, difficulty_level, option1, option2, option3, option4, question_title, right_answer) VALUES 
('Python', 'Easy', 'list', 'tuple', 'dict', 'set', 'Which of the following is an immutable data type in Python?', 'tuple'),
('Python', 'Medium', 'range()', 'xrange()', 'slice()', 'list()', 'In Python 3, which function is used to generate a sequence of numbers?', 'range()'),
('Python', 'Hard', 'deepcopy()', 'copy()', 'shred()', 'clone()', 'Which method creates an independent copy of nested objects?', 'deepcopy()'),
('Python', 'Easy', 'def', 'func', 'lambda', 'define', 'Which keyword is used to create a function in Python?', 'def'),
('Python', 'Medium', '__init__', '__main__', '__construct__', '__start__', 'What is the name of the constructor method in a Python class?', '__init__'),
('HTML', 'Easy', '<a>', '<link>', '<href>', '<url>', 'Which HTML tag is used to define a hyperlink?', '<a>'),
('HTML', 'Medium', '<ul>', '<ol>', '<li>', '<list>', 'Which tag is used to create an ordered list?', '<ol>'),
('CSS', 'Easy', 'color', 'background-color', 'font-style', 'text-color', 'Which CSS property is used to change the text color?', 'color'),
('CSS', 'Hard', 'Flexbox', 'Grid', 'Float', 'Position', 'Which layout model is designed for one-dimensional layouts?', 'Flexbox');

-- ==========================================================
-- APTITUDE: QUANTITATIVE ABILITY
-- ==========================================================
INSERT INTO question (category, difficulty_level, option1, option2, option3, option4, question_title, right_answer) VALUES 
('Quantitative', 'Easy', '10%', '20%', '25%', '30%', 'If the cost price is 80 and the selling price is 100, what is the profit percentage?', '25%'),
('Quantitative', 'Medium', '12 days', '15 days', '18 days', '20 days', 'A can do work in 20 days and B in 30 days. How many days will they take together?', '12 days'),
('Quantitative', 'Hard', '4:5', '5:4', '2:3', '3:2', 'Two numbers are in the ratio 3:5. If 9 is subtracted from each, find the smaller number.', '33'),
('Quantitative', 'Easy', '45', '50', '55', '60', 'What is the average of the first five prime numbers?', '5.6'),
('Quantitative', 'Medium', '54 km/hr', '60 km/hr', '72 km/hr', '45 km/hr', 'A train 150m long crosses a pole in 10 seconds. What is its speed in km/hr?', '54 km/hr'),
('Quantitative', 'Hard', '1/2', '1/6', '1/12', '1/36', 'Two dice are thrown. What is the probability of getting two numbers whose product is even?', '3/4'),
('Quantitative', 'Medium', '240', '300', '360', '480', 'A candidate got 60 percent of votes. 20 percent were invalid. If total votes were 7500, find valid votes.', '3600'),
('Quantitative', 'Easy', '150', '200', '250', '300', 'Find the simple interest on 2000 at 5 percent per annum for 2 years.', '200'),
('Quantitative', 'Hard', '120', '240', '360', '720', 'In how many different ways can the letters of the word LEADER be arranged?', '360'),
('Quantitative', 'Medium', '45', '50', '55', '60', 'The sum of ages of 5 children born at intervals of 3 years each is 50. Age of youngest?', '4');

-- ==========================================================
-- APTITUDE: LOGICAL REASONING
-- ==========================================================
INSERT INTO question (category, difficulty_level, option1, option2, option3, option4, question_title, right_answer) VALUES 
('Logical', 'Easy', '31', '34', '37', '40', 'Find the missing number in the series: 7, 10, 14, 19, 25, ?', '32'),
('Logical', 'Medium', 'Brother', 'Cousin', 'Uncle', 'Son', 'A woman said, ''His mother is the only daughter of my mother.'' How is she related to the man?', 'Mother'),
('Logical', 'Hard', 'North', 'South', 'East', 'West', 'A man walks 5 km South and turns right. After 3 km he turns left. Which direction from start?', 'South-West'),
('Logical', 'Easy', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'If today is Monday, what will be the day after 64 days?', 'Tuesday'),
('Logical', 'Medium', '12', '11', '10', '9', 'One tree is fifth from either end in a row. How many trees are in the row?', '9'),
('Logical', 'Hard', 'KMF', 'LLH', 'MLH', 'MGF', 'Find the next term: B2CD, BC3D, BCD4, B5CD, ?', 'BC6D'),
('Logical', 'Medium', 'Cause 1', 'Cause 2', 'Independent', 'Common', 'I: Standard of living has gone up. II: Economy is growing fast. Which is the cause?', 'Statement II is the cause'),
('Logical', 'Easy', 'Cup: Lip', 'Garden: Pestle', 'Foot: Shoe', 'Fins', 'Find the analogy: Bird: Wings :: Fish: ?', 'Fins'),
('Logical', 'Hard', 'None', 'Only I', 'Only II', 'Both', 'All mangoes are golden. No golden things are cheap. Conclusion: Golden mangoes are not cheap.', 'Only II follows'),
('Logical', 'Medium', '24', '27', '31', '35', 'In a code, TIGER is written as SUHJFHQS. How is HORSE written?', 'GINPQS RTDF');

-- ==========================================================
-- APTITUDE: VERBAL ABILITY
-- ==========================================================
INSERT INTO question (category, difficulty_level, option1, option2, option3, option4, question_title, right_answer) VALUES 
('Verbal', 'Easy', 'Huge', 'Small', 'Heavy', 'Thin', 'What is the synonym of the word Gigantic?', 'Huge'),
('Verbal', 'Medium', 'In', 'On', 'At', 'With', 'Complete: The candidate is well-versed ____ the latest technologies.', 'In'),
('Verbal', 'Hard', 'Altruistic', 'Narcissistic', 'Miserly', 'Benevolent', 'What is the antonym of the word Philanthropic?', 'Miserly'),
('Verbal', 'Easy', 'Affect', 'Effect', 'Effort', 'Afford', 'Which word is a verb meaning ''to influence''?', 'Affect'),
('Verbal', 'Medium', 'Uncertain', 'Happy', 'Trouble', 'Clumsy', 'What does the idiom ''All at sea'' mean?', 'Uncertain'),
('Verbal', 'Hard', 'Summary', 'Story', 'Secret', 'Mistake', 'What does the phrase ''In a nutshell'' mean?', 'A brief summary'),
('Verbal', 'Easy', 'Their', 'There', 'They''re', 'Them', 'Identify the correct word: Put the books over ____.', 'There'),
('Verbal', 'Hard', 'Loquacious', 'Reticent', 'Garrulous', 'Verbose', 'Choose the word that means ''unwilling to tell people about things'':', 'Reticent');