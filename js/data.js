// ── COURSES ──
const COURSES = [
  { id: 'DSA', name: 'Data Structures & Algorithms', code: 'IT2401', credits: 4, color: '#F97316', icon: '🌳' },
  { id: 'DBMS', name: 'Database Management Systems', code: 'IT2402', credits: 4, color: '#EA580C', icon: '🗄️' },
  { id: 'OS', name: 'Operating Systems', code: 'IT2403', credits: 3, color: '#C2540A', icon: '⚙️' },
  { id: 'CN', name: 'Computer Networks', code: 'IT2404', credits: 3, color: '#FB923C', icon: '🌐' },
  { id: 'OOP', name: 'OOP with Java', code: 'IT2405', credits: 4, color: '#F59E0B', icon: '☕' },
  { id: 'WT', name: 'Web Technologies', code: 'IT2406', credits: 3, color: '#D97706', icon: '💻' },
  { id: 'SE', name: 'Software Engineering', code: 'IT2407', credits: 3, color: '#B45309', icon: '📐' },
  { id: 'M3', name: 'Mathematics III (Prob. & Stats)', code: 'MA2401', credits: 4, color: '#92400E', icon: '📊' }
];

// ── STUDENTS ──
const STUDENTS = [
  {
    id: '22IT001', name: 'Tanmay Pratap', email: 'tanmay@college.edu', password: 'student123',
    course: 'B.Tech IT', year: 2, semester: 4, section: 'A', rollNo: '22IT001', cgpa: 8.4, initials: 'TS'
  }
];

// Helper: dates relative to now
const now = () => new Date();
const addDays = d => { let dt = new Date(); dt.setDate(dt.getDate() + d); return dt.toISOString(); };

// ── ASSIGNMENTS ──
const ASSIGNMENTS = [
  // DSA
  {
    id: 'DSA001', courseId: 'DSA', title: 'Binary Search Tree Implementation',
    description: 'Implement a Binary Search Tree (BST) with insert, delete, search, and inorder traversal in Java/C++. Include time complexity analysis for each operation and submit a PDF report with source code.',
    deadline: addDays(3), maxMarks: 100, status: 'pending', submittedAt: null, score: null, feedback: null, plagiarismScore: null, aiScore: null
  },
  {
    id: 'DSA002', courseId: 'DSA', title: 'Graph Traversal Algorithms',
    description: 'Implement BFS and DFS for an undirected graph. Analyse time/space complexities. Apply algorithms to a real-world problem such as shortest path or connected components.',
    deadline: addDays(-5), maxMarks: 100, status: 'submitted', submittedAt: addDays(-6),
    score: 82, feedback: { strengths: ['Clear code structure with proper comments', 'Correct BFS and DFS implementations', 'Good time complexity analysis'], improvements: ['DFS recursive approach could also be iterative', 'Real-world example lacked depth'], suggestions: ['Include traversal step visualization', 'Add disconnected graph edge cases'] },
    plagiarismScore: 12, aiScore: 8
  },
  {
    id: 'DSA003', courseId: 'DSA', title: 'Sorting Algorithms Comparison',
    description: 'Implement Bubble, Selection, Insertion, Merge, and Quick sort. Compare performance empirically with datasets of size 100, 1000, and 10000. Plot comparison graphs.',
    deadline: addDays(10), maxMarks: 100, status: 'pending', submittedAt: null, score: null, feedback: null, plagiarismScore: null, aiScore: null
  },

  // DBMS
  {
    id: 'DBMS001', courseId: 'DBMS', title: 'ER Diagram & Normalization',
    description: 'Design an ER diagram for a Hospital Management System. Convert to relational schema and normalize up to 3NF with full proof document.',
    deadline: addDays(1), maxMarks: 100, status: 'pending', submittedAt: null, score: null, feedback: null, plagiarismScore: null, aiScore: null
  },
  {
    id: 'DBMS002', courseId: 'DBMS', title: 'SQL Query Implementation',
    description: 'Using the university database schema, write SQL queries covering joins, subqueries, aggregate functions, views, and stored procedures. Include output screenshots.',
    deadline: addDays(-2), maxMarks: 100, status: 'overdue', submittedAt: null, score: null, feedback: null, plagiarismScore: null, aiScore: null
  },
  {
    id: 'DBMS003', courseId: 'DBMS', title: 'Transaction Management & Concurrency',
    description: 'Explain ACID properties with examples. Implement a deadlock scenario and resolution. Discuss 2PL and timestamp ordering concurrency control protocols.',
    deadline: addDays(7), maxMarks: 100, status: 'submitted', submittedAt: addDays(-1),
    score: 91, feedback: { strengths: ['Excellent understanding of ACID properties', 'Deadlock scenario well illustrated', 'Concurrency protocols explained clearly'], improvements: ['Missing timestamp ordering implementation', 'Could include more real-world examples'], suggestions: ['Add comparison table for concurrency control methods', 'Include lock compatibility matrix diagram'] },
    plagiarismScore: 7, aiScore: 22
  },

  // OS
  {
    id: 'OS001', courseId: 'OS', title: 'CPU Scheduling Algorithms',
    description: 'Implement FCFS, SJF, Priority Scheduling, and Round Robin. Calculate waiting time, turnaround time, and CPU utilization. Create Gantt chart visualizations.',
    deadline: addDays(5), maxMarks: 100, status: 'pending', submittedAt: null, score: null, feedback: null, plagiarismScore: null, aiScore: null
  },
  {
    id: 'OS002', courseId: 'OS', title: 'Page Replacement Algorithms',
    description: 'Implement FIFO, LRU, and Optimal page replacement. Analyse page fault rates for different reference strings and frame sizes. Compare performance empirically.',
    deadline: addDays(-3), maxMarks: 100, status: 'submitted', submittedAt: addDays(-4),
    score: 76, feedback: { strengths: ['All three algorithms correctly implemented', 'Page fault analysis is accurate', 'Good use of comparison tables'], improvements: ['Optimal algorithm explanation needs clarity', 'Missing edge cases in LRU'], suggestions: ['Add visual simulation of page replacement', 'Include hardware support discussion for LRU'] },
    plagiarismScore: 18, aiScore: 35
  },

  // CN
  {
    id: 'CN001', courseId: 'CN', title: 'OSI Model & TCP/IP Protocol Analysis',
    description: 'Explain all 7 OSI layers with real-world protocols. Compare OSI vs TCP/IP. Capture and analyse a Wireshark packet trace. Submit PCAP file and analysis report.',
    deadline: addDays(4), maxMarks: 100, status: 'pending', submittedAt: null, score: null, feedback: null, plagiarismScore: null, aiScore: null
  },
  {
    id: 'CN002', courseId: 'CN', title: 'Subnetting & IP Addressing',
    description: 'Given a Class B network, perform subnetting to create 20 subnets. Calculate subnet mask, network/broadcast addresses, and valid host ranges. Use VLSM appropriately.',
    deadline: addDays(-7), maxMarks: 100, status: 'submitted', submittedAt: addDays(-8),
    score: 88, feedback: { strengths: ['All subnets correctly calculated', 'Clear tabular presentation', 'VLSM implementation is accurate'], improvements: ['More explanation for VLSM selection rationale', 'Minor overlap in some subnet ranges'], suggestions: ['Include a network diagram', 'Explain supernetting as a contrast'] },
    plagiarismScore: 5, aiScore: 14
  },

  // OOP
  {
    id: 'OOP001', courseId: 'OOP', title: 'Inheritance & Polymorphism in Java',
    description: 'Design a class hierarchy for a University system (Person, Student, Faculty, Admin). Demonstrate single, multilevel and hierarchical inheritance, method overriding, and dynamic dispatch.',
    deadline: addDays(6), maxMarks: 100, status: 'pending', submittedAt: null, score: null, feedback: null, plagiarismScore: null, aiScore: null
  },
  {
    id: 'OOP002', courseId: 'OOP', title: 'Exception Handling & File I/O',
    description: 'Write a Java app that reads student data from CSV, processes it, handles exceptions (FileNotFoundException, NumberFormatException, custom exceptions), and writes results to a new file.',
    deadline: addDays(2), maxMarks: 100, status: 'pending', submittedAt: null, score: null, feedback: null, plagiarismScore: null, aiScore: null
  },

  // WT
  {
    id: 'WT001', courseId: 'WT', title: 'Responsive Portfolio Website',
    description: 'Create a fully responsive personal portfolio using HTML5 and CSS3 with navigation, hero, skills, projects, and contact sections. Use Flexbox/Grid and media queries.',
    deadline: addDays(-1), maxMarks: 100, status: 'overdue', submittedAt: null, score: null, feedback: null, plagiarismScore: null, aiScore: null
  },
  {
    id: 'WT002', courseId: 'WT', title: 'JavaScript & DOM Manipulation',
    description: 'Build an interactive To-Do app using vanilla JS with add/edit/delete, mark complete, status filter, localStorage persistence, and drag-and-drop reordering.',
    deadline: addDays(8), maxMarks: 100, status: 'pending', submittedAt: null, score: null, feedback: null, plagiarismScore: null, aiScore: null
  },

  // SE
  {
    id: 'SE001', courseId: 'SE', title: 'Software Requirements Specification (SRS)',
    description: 'Write a complete SRS document for an Online Food Delivery System following IEEE 830 standard, including functional/non-functional requirements, use case diagrams, and DFDs.',
    deadline: addDays(9), maxMarks: 100, status: 'submitted', submittedAt: addDays(-2),
    score: 94, feedback: { strengths: ['Excellent SRS structure per IEEE 830', 'Comprehensive use case diagrams', 'Non-functional requirements well defined'], improvements: ['DFD Level-2 diagrams missing', 'Some requirements are ambiguous'], suggestions: ['Add a data dictionary section', 'State system constraints explicitly'] },
    plagiarismScore: 9, aiScore: 18
  },

  // M3
  {
    id: 'M3001', courseId: 'M3', title: 'Probability Distributions & Applications',
    description: 'Solve problems on Binomial, Poisson, and Normal distributions. Apply the Central Limit Theorem to real datasets. Use Python/R for analysis and plots.',
    deadline: addDays(12), maxMarks: 100, status: 'pending', submittedAt: null, score: null, feedback: null, plagiarismScore: null, aiScore: null
  },
  {
    id: 'M3002', courseId: 'M3', title: 'Hypothesis Testing & Regression Analysis',
    description: 'Perform t-test, chi-square, and ANOVA on given datasets. Build a linear regression model, interpret coefficients, and evaluate using R² and RMSE.',
    deadline: addDays(-4), maxMarks: 100, status: 'submitted', submittedAt: addDays(-5),
    score: 79, feedback: { strengths: ['Correct t-test and chi-square application', 'Regression model well explained', 'Good Python visualizations'], improvements: ['ANOVA interpretation needs more detail', 'R² value not properly interpreted'], suggestions: ['Include residual plots for validation', 'Add p-value discussion for each test'] },
    plagiarismScore: 14, aiScore: 27
  }
];
