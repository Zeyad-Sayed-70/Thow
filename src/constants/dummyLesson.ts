export const CONTENTS = [
  {
    id: 1,
    type: "section",
    name: "Section 1: Getting Started with Python",
    isOpen: true,
    date: "Wed Dec 13 2023 15:46:00 GMT+0200",
    modules: [
      {
        id: 1,
        type: "module",
        name: "Module 1: Introduction",
        isOpen: true,
        date: "Wed Dec 13 2023 15:46:00 GMT+0200",
        lessons: [
          {
            id: 1,
            type: "lesson",
            name: "Lesson 1: What is Python?",
            link: "/1",
            date: "Wed Dec 13 2023 15:46:00 GMT+0200",
          },
          {
            id: 2,
            type: "lesson",
            name: "Lesson 2: Setting Up Your Environment",
            link: "/2",
            date: "Wed Dec 13 2023 15:46:00 GMT+0200",
          },
        ],
      },
    ],
  },
];

export const LESSONS_CONTENT: LessonData[] = [
  {
    id: 1,
    lesson_id: 1,
    type: "lesson",
    name: "Lesson 1: What is Python?",
    link: "/1",
    date: "Wed Dec 13 2023 15:46:00 GMT+0200",
    elements: [
      {
        id: 0,
        type: "message",
        types: ["text"],
        values: [
          {
            id: 0,
            text: `Hey there!

Welcome to your first lesson in Python! Are you excited to explore this amazing programming language?`,
          },
        ],
        hasOptions: true,
        nextMessage: {
          yes: "1",
          no: "2",
        },
        options: [
          {
            value: "yes, i am",
            label: "yes",
          },
          {
            value: "not sure",
            label: "no",
          },
        ],
      },
      {
        id: 1,
        type: "message",
        types: ["text"],
        values: [
          {
            id: 0,
            text: "Great, But before we dive in, let's start with the basics. What exactly is Python?",
          },
        ],
        hasOptions: false,
        nextMessage: "6",
      },
      {
        id: 2,
        type: "message",
        types: ["text"],
        values: [
          {
            id: 0,
            text: "Sorry to hear that, are you sure you don't want to continue?, you can comeback later",
          },
        ],
        hasOptions: true,
        options: [
          {
            value: "i'll continue",
            label: "yes",
          },
          {
            value: "sorry, may later",
            label: "no",
          },
        ],
        nextMessage: {
          yes: "5",
          no: "4",
        },
      },
      {
        id: 4,
        type: "message",
        types: ["text"],
        values: [
          {
            id: 0,
            text: "So, see you soon...",
          },
        ],
        hasOptions: false,
        nextMessage: null, // the end of lesson
      },
      {
        id: 5,
        type: "message",
        types: ["text"],
        values: [
          {
            id: 0,
            text: "Nice, let's begin...",
          },
        ],
        hasOptions: false,
        nextMessage: "6",
      },
      {
        id: 6,
        type: "message",
        types: ["list", "text"],
        values: [
          {
            id: 0,
            text: "Think of Python as a powerful tool that helps you boss around computers. You can tell them what to do, like:",
            lists: [
              "Build websites",
              "Analyze data",
              "Automate tasks ⏱️",
              "Create games",
              "And much more!",
            ],
          },
          {
            id: 1,
            text: "But what makes Python so special?",
          },
        ],
        hasOptions: false,
        nextMessage: "7",
      },
      {
        id: 7,
        type: "message",
        types: ["list"],
        values: [
          {
            id: 0,
            text: "Here are some of its superpowers:",
            lists: [
              "Easy to learn: Don't worry about complex grammar rules. Python code is clear, concise, and feels like plain English.",
              "Versatile: Like a swiss army knife, Python can be used for almost anything you can imagine.",
              "Powerful: Don't be fooled by its simplicity. Python packs a punch with powerful libraries for complex tasks.",
              "Free and open-source: No need to pay anything! Python is open for everyone to use and contribute to.",
            ],
          },
        ],
        hasOptions: false,
        nextMessage: "8",
      },
      {
        id: 8,
        type: "message",
        types: ["list", "text"],
        values: [
          {
            id: 0,
            text: "Free and open-source: No need to pay anything! Python is open for everyone to use and contribute to.",
            lists: [
              "Popular websites like Instagram and Spotify use Python to come to life.",
              "Data scientists use Python to uncover hidden patterns in massive datasets.",
              "Busy people use Python to automate repetitive tasks and free up their time. ⏰",
              "Game developers use Python to create fun and engaging games.",
            ],
          },
          {
            id: 1,
            text: "These are just a few examples, and the possibilities are endless!",
          },
        ],
        hasOptions: false,
        nextMessage: "9",
      },
      {
        id: 9,
        type: "message",
        types: ["text"],
        values: [
          {
            id: 0,
            text: "Do you think you understand what Python is all about so far?",
          },
        ],
        hasOptions: true,
        nextMessage: {
          yes: "11",
          no: "10",
        },
        options: [
          {
            value: "YES, I do",
            label: "yes",
          },
          {
            value: "Nope, I need more explanation",
            label: "no",
          },
        ],
      },
      {
        id: 10,
        type: "message",
        types: ["text"],
        values: [
          {
            id: 0,
            text: "Our Ai will try to re-explain it for you in easly way.",
          },
        ],
        hasOptions: false,
        nextMessage: "11",
        action: {
          type: "ask-ai",
          prompt:
            "re-explain what it python is all about, in easy way and use plain-language, just display the explanation only.",
        },
      },
      {
        id: 11,
        type: "message",
        types: ["text"],
        values: [
          {
            id: 0,
            text: "great!  Let's try to write first code in python.",
          },
        ],
        hasOptions: false,
        nextMessage: null,
      },
    ],
  },
];

type Lessons_ELEMENTS_TYPES = [
  "message",
  "mcq",
  "bcq",
  "code",
  "code-block",
  "code-block-with-output",
  "code-block-with-output-and-input"
];
