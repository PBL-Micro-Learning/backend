const { Role, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt');


module.exports = [
  {
    name: 'Aryo Admin',
    email: 'aryo@admin.com',
    gender: Gender.MALE,
    password: bcrypt.hashSync('password', 10),
    role: Role.ADMIN
  },
  {
    name: 'Destia Admin',
    email: 'destia@admin.com',
    gender: Gender.FEMALE,
    password: bcrypt.hashSync('password', 10),
    role: Role.ADMIN
  },
  {
    name: 'Irgi Admin',
    email: 'irgi@admin.com',
    gender: Gender.MALE,
    password: bcrypt.hashSync('password', 10),
    role: Role.ADMIN
  },
  {
    name: 'Naura Admin',
    email: 'naura@admin.com',
    gender: Gender.FEMALE,
    password: bcrypt.hashSync('password', 10),
    role: Role.ADMIN
  },
  {
    name: 'Nur Admin',
    email: 'nur@admin.com',
    gender: Gender.FEMALE,
    password: bcrypt.hashSync('password', 10),
    role: Role.ADMIN
  },
  {
    name: 'Aryo Student',
    email: 'aryo@student.com',
    gender: Gender.MALE,
    password: bcrypt.hashSync('password', 10),
    role: Role.STUDENT
  },
  {
    name: 'Destia Student',
    email: 'destia@student.com',
    gender: Gender.MALE,
    password: bcrypt.hashSync('password', 10),
    role: Role.STUDENT
  },
  {
    name: 'Irgi Student',
    email: 'irgi@student.com',
    gender: Gender.MALE,
    password: bcrypt.hashSync('password', 10),
    role: Role.STUDENT
  },
  {
    name: 'Naura Student',
    email: 'naura@student.com',
    gender: Gender.FEMALE,
    password: bcrypt.hashSync('password', 10),
    role: Role.STUDENT
  },
  {
    name: 'Nur Student',
    email: 'nur@student.com',
    gender: Gender.FEMALE,
    password: bcrypt.hashSync('password', 10),
    role: Role.STUDENT
  },
  {
    name: 'Aryo Lecturer',
    email: 'aryo@lecturer.com',
    gender: Gender.MALE,
    password: bcrypt.hashSync('password', 10),
    role: Role.LECTURER,
    courses: [
      {
        name: "Introduction to Programming",
        description: "Learn the basics of programming using various languages.",
        cover_url: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
        lessons: [
          {
            title: "Introduction to Programming Concepts",
            description: "Learn the fundamental concepts of programming.",
            contents: [
              {
                title: "What is Programming?",
                body: "An overview of what programming is and its importance.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Basic Syntax",
                body: "Learn the basic syntax of different programming languages.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Writing Your First Program",
                body: "Step-by-step guide to writing your first program.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Data Structures and Algorithms",
            description: "An introduction to data structures and algorithms.",
            contents: [
              {
                title: "Understanding Data Structures",
                body: "Learn about different data structures.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Algorithms 101",
                body: "Introduction to algorithms and their importance.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Complexity Analysis",
                body: "Learn how to analyze the complexity of algorithms.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Object-Oriented Programming",
            description: "Learn the principles of object-oriented programming.",
            contents: [
              {
                title: "Introduction to OOP",
                body: "What is object-oriented programming?",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Classes and Objects",
                body: "Learn about classes and objects in OOP.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Inheritance and Polymorphism",
                body: "Understand inheritance and polymorphism.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          }
        ]
      },
      {
        name: "Web Development Basics",
        description: "Introduction to the basics of web development.",
        cover_url: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
        lessons: [
          {
            title: "HTML & CSS",
            description: "Learn the basics of HTML and CSS.",
            contents: [
              {
                title: "Introduction to HTML",
                body: "Learn the basics of HTML.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Styling with CSS",
                body: "Learn how to style web pages using CSS.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Building a Simple Web Page",
                body: "Build your first web page using HTML and CSS.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "JavaScript Basics",
            description: "Learn the basics of JavaScript.",
            contents: [
              {
                title: "Introduction to JavaScript",
                body: "Learn the basics of JavaScript.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "JavaScript Syntax and Operators",
                body: "Learn about JavaScript syntax and operators.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "DOM Manipulation",
                body: "Learn how to manipulate the DOM using JavaScript.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Responsive Design",
            description: "Learn how to create responsive web designs.",
            contents: [
              {
                title: "Introduction to Responsive Design",
                body: "What is responsive design?",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Using Media Queries",
                body: "Learn how to use media queries for responsive design.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Responsive Layouts",
                body: "Learn how to create responsive layouts.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          }
        ]
      },
      {
        name: "Database Management Systems",
        description: "Learn the fundamentals of database management systems.",
        cover_url: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
        lessons: [
          {
            title: "Introduction to Databases",
            description: "Learn the basics of databases.",
            contents: [
              {
                title: "What is a Database?",
                body: "An overview of what databases are and their importance.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "SQL Basics",
                body: "Learn the basics of SQL.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Database Design",
                body: "Learn how to design a database.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Advanced SQL",
            description: "Learn advanced SQL techniques.",
            contents: [
              {
                title: "Joins and Subqueries",
                body: "Learn about joins and subqueries in SQL.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Stored Procedures",
                body: "Learn about stored procedures in SQL.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Database Optimization",
                body: "Learn how to optimize databases.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "NoSQL Databases",
            description: "Learn about NoSQL databases.",
            contents: [
              {
                title: "Introduction to NoSQL",
                body: "Learn the basics of NoSQL databases.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Types of NoSQL Databases",
                body: "Learn about different types of NoSQL databases.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Using MongoDB",
                body: "Learn how to use MongoDB.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Destia Lecturer',
    email: 'destia@lecturer.com',
    gender: Gender.MALE,
    password: bcrypt.hashSync('password', 10),
    role: Role.LECTURER,
    courses: [
      {
        name: "Advanced Programming",
        description: "Advanced topics in programming.",
        cover_url: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
        lessons: [
          {
            title: "Concurrency and Parallelism",
            description: "Learn about concurrency and parallelism.",
            contents: [
              {
                title: "Introduction to Concurrency",
                body: "Learn the basics of concurrency.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Parallel Programming",
                body: "Learn about parallel programming techniques.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Synchronization",
                body: "Learn how to synchronize concurrent processes.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Functional Programming",
            description: "Introduction to functional programming.",
            contents: [
              {
                title: "Introduction to Functional Programming",
                body: "Learn the basics of functional programming.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Higher-Order Functions",
                body: "Learn about higher-order functions in functional programming.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Immutability",
                body: "Learn about immutability in functional programming.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Software Design Patterns",
            description: "Learn about software design patterns.",
            contents: [
              {
                title: "Introduction to Design Patterns",
                body: "Learn the basics of design patterns.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Creational Patterns",
                body: "Learn about creational design patterns.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Structural Patterns",
                body: "Learn about structural design patterns.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          }
        ]
      },
      {
        name: "Machine Learning",
        description: "Introduction to machine learning concepts.",
        cover_url: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
        lessons: [
          {
            title: "Introduction to Machine Learning",
            description: "Learn the basics of machine learning.",
            contents: [
              {
                title: "What is Machine Learning?",
                body: "An overview of machine learning and its applications.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Supervised Learning",
                body: "Learn about supervised learning techniques.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Unsupervised Learning",
                body: "Learn about unsupervised learning techniques.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Neural Networks",
            description: "Introduction to neural networks.",
            contents: [
              {
                title: "Basics of Neural Networks",
                body: "Learn the basics of neural networks.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Training Neural Networks",
                body: "Learn how to train neural networks.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Deep Learning",
                body: "Introduction to deep learning.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Model Evaluation",
            description: "Learn how to evaluate machine learning models.",
            contents: [
              {
                title: "Evaluation Metrics",
                body: "Learn about different evaluation metrics for machine learning models.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Cross-Validation",
                body: "Learn how to use cross-validation for model evaluation.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Hyperparameter Tuning",
                body: "Learn how to tune hyperparameters for better model performance.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          }
        ]
      },
      {
        name: "Cybersecurity Fundamentals",
        description: "Learn the fundamentals of cybersecurity.",
        cover_url: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
        lessons: [
          {
            title: "Introduction to Cybersecurity",
            description: "Learn the basics of cybersecurity.",
            contents: [
              {
                title: "What is Cybersecurity?",
                body: "An overview of cybersecurity and its importance.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Common Cyber Threats",
                body: "Learn about common cyber threats.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Protecting Your Systems",
                body: "Learn how to protect your systems from cyber threats.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Network Security",
            description: "Learn about network security.",
            contents: [
              {
                title: "Basics of Network Security",
                body: "Learn the basics of network security.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Firewalls and Intrusion Detection Systems",
                body: "Learn about firewalls and intrusion detection systems.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Securing Wireless Networks",
                body: "Learn how to secure wireless networks.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Cryptography",
            description: "Introduction to cryptography.",
            contents: [
              {
                title: "Basics of Cryptography",
                body: "Learn the basics of cryptography.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Encryption Algorithms",
                body: "Learn about different encryption algorithms.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Digital Signatures",
                body: "Learn about digital signatures and their importance.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Irgi Lecturer',
    email: 'irgi@lecturer.com',
    gender: Gender.MALE,
    password: bcrypt.hashSync('password', 10),
    role: Role.LECTURER,
    courses: [
      {
        name: "Software Engineering",
        description: "Introduction to software engineering principles.",
        cover_url: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
        lessons: [
          {
            title: "Software Development Life Cycle",
            description: "Learn about the software development life cycle.",
            contents: [
              {
                title: "Introduction to SDLC",
                body: "An overview of the software development life cycle.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Requirement Analysis",
                body: "Learn how to gather and analyze requirements.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Design and Architecture",
                body: "Learn about software design and architecture.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Agile Methodologies",
            description: "Learn about agile methodologies in software development.",
            contents: [
              {
                title: "Introduction to Agile",
                body: "Learn the basics of agile methodologies.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Scrum Framework",
                body: "Learn about the Scrum framework.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Kanban",
                body: "Learn about the Kanban methodology.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Testing and Quality Assurance",
            description: "Learn about testing and quality assurance in software development.",
            contents: [
              {
                title: "Introduction to Testing",
                body: "Learn the basics of software testing.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Types of Testing",
                body: "Learn about different types of software testing.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Automated Testing",
                body: "Learn about automated testing tools and techniques.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          }
        ]
      },
      {
        name: "Data Science",
        description: "Introduction to data science concepts.",
        cover_url: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
        lessons: [
          {
            title: "Introduction to Data Science",
            description: "Learn the basics of data science.",
            contents: [
              {
                title: "What is Data Science?",
                body: "An overview of data science and its applications.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Data Wrangling",
                body: "Learn how to clean and prepare data.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Exploratory Data Analysis",
                body: "Learn how to perform exploratory data analysis.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Statistical Analysis",
            description: "Introduction to statistical analysis.",
            contents: [
              {
                title: "Descriptive Statistics",
                body: "Learn about descriptive statistics.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Inferential Statistics",
                body: "Learn about inferential statistics.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Hypothesis Testing",
                body: "Learn how to perform hypothesis testing.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Data Visualization",
            description: "Learn how to visualize data effectively.",
            contents: [
              {
                title: "Introduction to Data Visualization",
                body: "Learn the basics of data visualization.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Using Matplotlib",
                body: "Learn how to create visualizations using Matplotlib.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Using Seaborn",
                body: "Learn how to create visualizations using Seaborn.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          }
        ]
      },
      {
        name: "Artificial Intelligence",
        description: "Introduction to artificial intelligence concepts.",
        cover_url: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
        lessons: [
          {
            title: "Introduction to AI",
            description: "Learn the basics of artificial intelligence.",
            contents: [
              {
                title: "What is AI?",
                body: "An overview of artificial intelligence and its applications.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "History of AI",
                body: "Learn about the history of artificial intelligence.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "AI in Everyday Life",
                body: "Learn how AI is used in everyday life.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Machine Learning in AI",
            description: "Learn about the role of machine learning in artificial intelligence.",
            contents: [
              {
                title: "Supervised Learning",
                body: "Learn about supervised learning techniques in AI.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Unsupervised Learning",
                body: "Learn about unsupervised learning techniques in AI.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Reinforcement Learning",
                body: "Learn about reinforcement learning techniques in AI.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Ethics in AI",
            description: "Learn about the ethical considerations in artificial intelligence.",
            contents: [
              {
                title: "Bias in AI",
                body: "Learn about bias and fairness in AI.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Privacy in AI",
                body: "Learn about privacy concerns in AI.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Future of AI",
                body: "Learn about the future trends in AI.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Naura Lecturer',
    email: 'naura@lecturer.com',
    gender: Gender.FEMALE,
    password: bcrypt.hashSync('password', 10),
    role: Role.LECTURER,
    courses: [
      {
        name: "Cloud Computing",
        description: "Introduction to cloud computing concepts and technologies.",
        cover_url: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
        lessons: [
          {
            title: "Introduction to Cloud Computing",
            description: "Learn the basics of cloud computing.",
            contents: [
              {
                title: "What is Cloud Computing?",
                body: "An overview of cloud computing and its benefits.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Cloud Service Models",
                body: "Learn about IaaS, PaaS, and SaaS.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Cloud Deployment Models",
                body: "Learn about public, private, and hybrid clouds.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Cloud Security",
            description: "Learn about security in the cloud.",
            contents: [
              {
                title: "Introduction to Cloud Security",
                body: "Learn the basics of cloud security.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Security Best Practices",
                body: "Learn about best practices for securing cloud environments.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Compliance in the Cloud",
                body: "Learn about compliance requirements for cloud services.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Cloud Architecture",
            description: "Learn about designing and architecting cloud solutions.",
            contents: [
              {
                title: "Introduction to Cloud Architecture",
                body: "Learn the basics of cloud architecture.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Designing Scalable Applications",
                body: "Learn how to design applications that scale in the cloud.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Cost Management in the Cloud",
                body: "Learn how to manage costs effectively in the cloud.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          }
        ]
      },
      {
        name: "Blockchain Technology",
        description: "Introduction to blockchain technology and its applications.",
        cover_url: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
        lessons: [
          {
            title: "Introduction to Blockchain",
            description: "Learn the basics of blockchain technology.",
            contents: [
              {
                title: "What is Blockchain?",
                body: "An overview of blockchain and how it works.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Blockchain Components",
                body: "Learn about the key components of blockchain technology.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Blockchain Use Cases",
                body: "Explore various use cases of blockchain technology.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Cryptocurrencies",
            description: "Learn about cryptocurrencies and their underlying technology.",
            contents: [
              {
                title: "Introduction to Cryptocurrencies",
                body: "Learn the basics of cryptocurrencies.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Bitcoin and Ethereum",
                body: "Learn about the two most popular cryptocurrencies.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Investing in Cryptocurrencies",
                body: "Learn about investing in cryptocurrencies and the risks involved.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Smart Contracts",
            description: "Learn about smart contracts and how they work.",
            contents: [
              {
                title: "Introduction to Smart Contracts",
                body: "Learn the basics of smart contracts.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Creating Smart Contracts",
                body: "Learn how to create and deploy smart contracts.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Smart Contract Security",
                body: "Learn about security considerations for smart contracts.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          }
        ]
      },
      {
        name: "Internet of Things (IoT)",
        description: "Introduction to Internet of Things (IoT) concepts and technologies.",
        cover_url: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
        lessons: [
          {
            title: "Introduction to IoT",
            description: "Learn the basics of Internet of Things (IoT).",
            contents: [
              {
                title: "What is IoT?",
                body: "An overview of IoT and its applications.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "IoT Architecture",
                body: "Learn about the architecture of IoT systems.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "IoT Communication Protocols",
                body: "Learn about communication protocols used in IoT.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "IoT Security",
            description: "Learn about security considerations in IoT.",
            contents: [
              {
                title: "Introduction to IoT Security",
                body: "Learn the basics of IoT security.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Common IoT Vulnerabilities",
                body: "Learn about common vulnerabilities in IoT systems.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Securing IoT Devices",
                body: "Learn how to secure IoT devices.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "IoT Applications",
            description: "Explore various applications of IoT.",
            contents: [
              {
                title: "Smart Homes",
                body: "Learn about IoT applications in smart homes.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Industrial IoT",
                body: "Learn about IoT applications in industrial settings.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "IoT in Healthcare",
                body: "Learn about IoT applications in healthcare.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Nur Lecturer',
    email: 'nur@lecturer.com',
    gender: Gender.FEMALE,
    password: bcrypt.hashSync('password', 10),
    role: Role.LECTURER,
    courses: [
      {
        name: "Data Structures and Algorithms",
        description: "Introduction to fundamental data structures and algorithms.",
        cover_url: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
        lessons: [
          {
            title: "Introduction to Data Structures",
            description: "Learn the basics of data structures.",
            contents: [
              {
                title: "Arrays and Linked Lists",
                body: "Introduction to arrays and linked lists.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Stacks and Queues",
                body: "Learn about stacks and queues.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Trees",
                body: "Learn about tree data structures.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Sorting and Searching Algorithms",
            description: "Learn about common sorting and searching algorithms.",
            contents: [
              {
                title: "Bubble Sort and Insertion Sort",
                body: "Introduction to bubble sort and insertion sort.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Merge Sort and Quick Sort",
                body: "Learn about merge sort and quick sort.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Binary Search",
                body: "Learn about binary search algorithm.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Advanced Data Structures",
            description: "Explore advanced data structures.",
            contents: [
              {
                title: "Graphs",
                body: "Learn about graph data structures.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Hash Tables",
                body: "Learn about hash tables.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Heap Data Structure",
                body: "Introduction to heap data structure.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          }
        ]
      },
      {
        name: "Software Architecture",
        description: "Introduction to software architecture principles and design patterns.",
        cover_url: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
        lessons: [
          {
            title: "Introduction to Software Architecture",
            description: "Learn the basics of software architecture.",
            contents: [
              {
                title: "Architectural Styles",
                body: "Introduction to different architectural styles.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Design Patterns",
                body: "Learn about common design patterns.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Architectural Patterns",
                body: "Learn about architectural patterns.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Microservices Architecture",
            description: "Learn about microservices architecture.",
            contents: [
              {
                title: "Introduction to Microservices",
                body: "Learn the basics of microservices architecture.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Service Discovery and Communication",
                body: "Learn about service discovery and communication in microservices.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Scalability and Resilience",
                body: "Learn how microservices achieve scalability and resilience.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Designing Scalable Systems",
            description: "Learn how to design scalable systems.",
            contents: [
              {
                title: "Scalability Concepts",
                body: "Introduction to scalability concepts.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Load Balancing",
                body: "Learn about load balancing techniques.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Caching Strategies",
                body: "Learn about caching strategies for performance optimization.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          }
        ]
      },
      {
        name: "Web Development",
        description: "Introduction to web development technologies and frameworks.",
        cover_url: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
        lessons: [
          {
            title: "Introduction to Web Development",
            description: "Learn the basics of web development.",
            contents: [
              {
                title: "HTML and CSS",
                body: "Introduction to HTML and CSS.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "JavaScript Basics",
                body: "Learn the basics of JavaScript programming.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Responsive Web Design",
                body: "Learn about responsive web design.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Backend Development",
            description: "Learn about backend development technologies.",
            contents: [
              {
                title: "Introduction to Node.js",
                body: "Learn the basics of Node.js.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "RESTful APIs",
                body: "Learn about designing RESTful APIs.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Database Integration",
                body: "Learn how to integrate databases with web applications.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          },
          {
            title: "Frontend Frameworks",
            description: "Explore popular frontend frameworks.",
            contents: [
              {
                title: "Introduction to React",
                body: "Learn the basics of React framework.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Angular Fundamentals",
                body: "Learn about fundamental concepts of Angular framework.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              },
              {
                title: "Vue.js Essentials",
                body: "Learn essential concepts of Vue.js framework.",
                video_url: "https://www.youtube.com/watch?v=SxQEiq4NZqk"
              }
            ]
          }
        ]
      }
    ]
  }
];