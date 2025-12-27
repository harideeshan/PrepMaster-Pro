-- JAVA CORE & ADVANCED
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

-- DATA STRUCTURES & ALGORITHMS
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

-- SQL & DATABASE
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