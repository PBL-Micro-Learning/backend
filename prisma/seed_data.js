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
    gender: Gender.FEMALE,
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
    gender: Gender.FEMALE,
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
                video_url: "https://youtu.be/video1"
              },
              {
                title: "Basic Syntax",
                body: "Learn the basic syntax of different programming languages.",
                video_url: "https://youtu.be/video2"
              },
              {
                title: "Writing Your First Program",
                body: "Step-by-step guide to writing your first program.",
                video_url: "https://youtu.be/video3"
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
                video_url: "https://youtu.be/video4"
              },
              {
                title: "Algorithms 101",
                body: "Introduction to algorithms and their importance.",
                video_url: "https://youtu.be/video5"
              },
              {
                title: "Complexity Analysis",
                body: "Learn how to analyze the complexity of algorithms.",
                video_url: "https://youtu.be/video6"
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
                video_url: "https://youtu.be/video7"
              },
              {
                title: "Classes and Objects",
                body: "Learn about classes and objects in OOP.",
                video_url: "https://youtu.be/video8"
              },
              {
                title: "Inheritance and Polymorphism",
                body: "Understand inheritance and polymorphism.",
                video_url: "https://youtu.be/video9"
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
                video_url: "https://youtu.be/video10"
              },
              {
                title: "Styling with CSS",
                body: "Learn how to style web pages using CSS.",
                video_url: "https://youtu.be/video11"
              },
              {
                title: "Building a Simple Web Page",
                body: "Build your first web page using HTML and CSS.",
                video_url: "https://youtu.be/video12"
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
                video_url: "https://youtu.be/video13"
              },
              {
                title: "JavaScript Syntax and Operators",
                body: "Learn about JavaScript syntax and operators.",
                video_url: "https://youtu.be/video14"
              },
              {
                title: "DOM Manipulation",
                body: "Learn how to manipulate the DOM using JavaScript.",
                video_url: "https://youtu.be/video15"
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
                video_url: "https://youtu.be/video16"
              },
              {
                title: "Using Media Queries",
                body: "Learn how to use media queries for responsive design.",
                video_url: "https://youtu.be/video17"
              },
              {
                title: "Responsive Layouts",
                body: "Learn how to create responsive layouts.",
                video_url: "https://youtu.be/video18"
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
                video_url: "https://youtu.be/video19"
              },
              {
                title: "SQL Basics",
                body: "Learn the basics of SQL.",
                video_url: "https://youtu.be/video20"
              },
              {
                title: "Database Design",
                body: "Learn how to design a database.",
                video_url: "https://youtu.be/video21"
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
                video_url: "https://youtu.be/video22"
              },
              {
                title: "Stored Procedures",
                body: "Learn about stored procedures in SQL.",
                video_url: "https://youtu.be/video23"
              },
              {
                title: "Database Optimization",
                body: "Learn how to optimize databases.",
                video_url: "https://youtu.be/video24"
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
                video_url: "https://youtu.be/video25"
              },
              {
                title: "Types of NoSQL Databases",
                body: "Learn about different types of NoSQL databases.",
                video_url: "https://youtu.be/video26"
              },
              {
                title: "Using MongoDB",
                body: "Learn how to use MongoDB.",
                video_url: "https://youtu.be/video27"
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
                video_url: "https://youtu.be/video28"
              },
              {
                title: "Parallel Programming",
                body: "Learn about parallel programming techniques.",
                video_url: "https://youtu.be/video29"
              },
              {
                title: "Synchronization",
                body: "Learn how to synchronize concurrent processes.",
                video_url: "https://youtu.be/video30"
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
                video_url: "https://youtu.be/video31"
              },
              {
                title: "Higher-Order Functions",
                body: "Learn about higher-order functions in functional programming.",
                video_url: "https://youtu.be/video32"
              },
              {
                title: "Immutability",
                body: "Learn about immutability in functional programming.",
                video_url: "https://youtu.be/video33"
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
                video_url: "https://youtu.be/video34"
              },
              {
                title: "Creational Patterns",
                body: "Learn about creational design patterns.",
                video_url: "https://youtu.be/video35"
              },
              {
                title: "Structural Patterns",
                body: "Learn about structural design patterns.",
                video_url: "https://youtu.be/video36"
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
                video_url: "https://youtu.be/video37"
              },
              {
                title: "Supervised Learning",
                body: "Learn about supervised learning techniques.",
                video_url: "https://youtu.be/video38"
              },
              {
                title: "Unsupervised Learning",
                body: "Learn about unsupervised learning techniques.",
                video_url: "https://youtu.be/video39"
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
                video_url: "https://youtu.be/video40"
              },
              {
                title: "Training Neural Networks",
                body: "Learn how to train neural networks.",
                video_url: "https://youtu.be/video41"
              },
              {
                title: "Deep Learning",
                body: "Introduction to deep learning.",
                video_url: "https://youtu.be/video42"
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
                video_url: "https://youtu.be/video43"
              },
              {
                title: "Cross-Validation",
                body: "Learn how to use cross-validation for model evaluation.",
                video_url: "https://youtu.be/video44"
              },
              {
                title: "Hyperparameter Tuning",
                body: "Learn how to tune hyperparameters for better model performance.",
                video_url: "https://youtu.be/video45"
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
                video_url: "https://youtu.be/video46"
              },
              {
                title: "Common Cyber Threats",
                body: "Learn about common cyber threats.",
                video_url: "https://youtu.be/video47"
              },
              {
                title: "Protecting Your Systems",
                body: "Learn how to protect your systems from cyber threats.",
                video_url: "https://youtu.be/video48"
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
                video_url: "https://youtu.be/video49"
              },
              {
                title: "Firewalls and Intrusion Detection Systems",
                body: "Learn about firewalls and intrusion detection systems.",
                video_url: "https://youtu.be/video50"
              },
              {
                title: "Securing Wireless Networks",
                body: "Learn how to secure wireless networks.",
                video_url: "https://youtu.be/video51"
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
                video_url: "https://youtu.be/video52"
              },
              {
                title: "Encryption Algorithms",
                body: "Learn about different encryption algorithms.",
                video_url: "https://youtu.be/video53"
              },
              {
                title: "Digital Signatures",
                body: "Learn about digital signatures and their importance.",
                video_url: "https://youtu.be/video54"
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
    gender: Gender.FEMALE,
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
                video_url: "https://youtu.be/video55"
              },
              {
                title: "Requirement Analysis",
                body: "Learn how to gather and analyze requirements.",
                video_url: "https://youtu.be/video56"
              },
              {
                title: "Design and Architecture",
                body: "Learn about software design and architecture.",
                video_url: "https://youtu.be/video57"
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
                video_url: "https://youtu.be/video58"
              },
              {
                title: "Scrum Framework",
                body: "Learn about the Scrum framework.",
                video_url: "https://youtu.be/video59"
              },
              {
                title: "Kanban",
                body: "Learn about the Kanban methodology.",
                video_url: "https://youtu.be/video60"
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
                video_url: "https://youtu.be/video61"
              },
              {
                title: "Types of Testing",
                body: "Learn about different types of software testing.",
                video_url: "https://youtu.be/video62"
              },
              {
                title: "Automated Testing",
                body: "Learn about automated testing tools and techniques.",
                video_url: "https://youtu.be/video63"
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
                video_url: "https://youtu.be/video64"
              },
              {
                title: "Data Wrangling",
                body: "Learn how to clean and prepare data.",
                video_url: "https://youtu.be/video65"
              },
              {
                title: "Exploratory Data Analysis",
                body: "Learn how to perform exploratory data analysis.",
                video_url: "https://youtu.be/video66"
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
                video_url: "https://youtu.be/video67"
              },
              {
                title: "Inferential Statistics",
                body: "Learn about inferential statistics.",
                video_url: "https://youtu.be/video68"
              },
              {
                title: "Hypothesis Testing",
                body: "Learn how to perform hypothesis testing.",
                video_url: "https://youtu.be/video69"
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
                video_url: "https://youtu.be/video70"
              },
              {
                title: "Using Matplotlib",
                body: "Learn how to create visualizations using Matplotlib.",
                video_url: "https://youtu.be/video71"
              },
              {
                title: "Using Seaborn",
                body: "Learn how to create visualizations using Seaborn.",
                video_url: "https://youtu.be/video72"
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
                video_url: "https://youtu.be/video73"
              },
              {
                title: "History of AI",
                body: "Learn about the history of artificial intelligence.",
                video_url: "https://youtu.be/video74"
              },
              {
                title: "AI in Everyday Life",
                body: "Learn how AI is used in everyday life.",
                video_url: "https://youtu.be/video75"
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
                video_url: "https://youtu.be/video76"
              },
              {
                title: "Unsupervised Learning",
                body: "Learn about unsupervised learning techniques in AI.",
                video_url: "https://youtu.be/video77"
              },
              {
                title: "Reinforcement Learning",
                body: "Learn about reinforcement learning techniques in AI.",
                video_url: "https://youtu.be/video78"
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
                video_url: "https://youtu.be/video79"
              },
              {
                title: "Privacy in AI",
                body: "Learn about privacy concerns in AI.",
                video_url: "https://youtu.be/video80"
              },
              {
                title: "Future of AI",
                body: "Learn about the future trends in AI.",
                video_url: "https://youtu.be/video81"
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
                video_url: "https://youtu.be/video82"
              },
              {
                title: "Cloud Service Models",
                body: "Learn about IaaS, PaaS, and SaaS.",
                video_url: "https://youtu.be/video83"
              },
              {
                title: "Cloud Deployment Models",
                body: "Learn about public, private, and hybrid clouds.",
                video_url: "https://youtu.be/video84"
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
                video_url: "https://youtu.be/video85"
              },
              {
                title: "Security Best Practices",
                body: "Learn about best practices for securing cloud environments.",
                video_url: "https://youtu.be/video86"
              },
              {
                title: "Compliance in the Cloud",
                body: "Learn about compliance requirements for cloud services.",
                video_url: "https://youtu.be/video87"
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
                video_url: "https://youtu.be/video88"
              },
              {
                title: "Designing Scalable Applications",
                body: "Learn how to design applications that scale in the cloud.",
                video_url: "https://youtu.be/video89"
              },
              {
                title: "Cost Management in the Cloud",
                body: "Learn how to manage costs effectively in the cloud.",
                video_url: "https://youtu.be/video90"
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
                video_url: "https://youtu.be/video91"
              },
              {
                title: "Blockchain Components",
                body: "Learn about the key components of blockchain technology.",
                video_url: "https://youtu.be/video92"
              },
              {
                title: "Blockchain Use Cases",
                body: "Explore various use cases of blockchain technology.",
                video_url: "https://youtu.be/video93"
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
                video_url: "https://youtu.be/video94"
              },
              {
                title: "Bitcoin and Ethereum",
                body: "Learn about the two most popular cryptocurrencies.",
                video_url: "https://youtu.be/video95"
              },
              {
                title: "Investing in Cryptocurrencies",
                body: "Learn about investing in cryptocurrencies and the risks involved.",
                video_url: "https://youtu.be/video96"
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
                video_url: "https://youtu.be/video97"
              },
              {
                title: "Creating Smart Contracts",
                body: "Learn how to create and deploy smart contracts.",
                video_url: "https://youtu.be/video98"
              },
              {
                title: "Smart Contract Security",
                body: "Learn about security considerations for smart contracts.",
                video_url: "https://youtu.be/video99"
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
                video_url: "https://youtu.be/video100"
              },
              {
                title: "IoT Architecture",
                body: "Learn about the architecture of IoT systems.",
                video_url: "https://youtu.be/video101"
              },
              {
                title: "IoT Communication Protocols",
                body: "Learn about communication protocols used in IoT.",
                video_url: "https://youtu.be/video102"
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
                video_url: "https://youtu.be/video103"
              },
              {
                title: "Common IoT Vulnerabilities",
                body: "Learn about common vulnerabilities in IoT systems.",
                video_url: "https://youtu.be/video104"
              },
              {
                title: "Securing IoT Devices",
                body: "Learn how to secure IoT devices.",
                video_url: "https://youtu.be/video105"
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
                video_url: "https://youtu.be/video106"
              },
              {
                title: "Industrial IoT",
                body: "Learn about IoT applications in industrial settings.",
                video_url: "https://youtu.be/video107"
              },
              {
                title: "IoT in Healthcare",
                body: "Learn about IoT applications in healthcare.",
                video_url: "https://youtu.be/video108"
              }
            ]
          }
        ]
      }
    ]
  }
];