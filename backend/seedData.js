const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Quiz = require('./models/Quiz');
const Progress = require('./models/Progress');
const Model = require('./models/Model');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const sampleUsers = [
  {
    name: 'Rahul Kumar',
    email: 'rahul@student.com',
    password: 'password123',
    role: 'student',
    classLevel: 9,
    points: 450,
    badges: 5,
    streak: 7
  },
  {
    name: 'Priya Singh',
    email: 'priya@teacher.com',
    password: 'password123',
    role: 'teacher'
  },
  {
    name: 'Mr. Sharma',
    email: 'sharma@parent.com',
    password: 'password123',
    role: 'parent'
  }
];

const sampleQuizzes = [
  {
    topicId: 'circulatory-system',
    topic: 'Human Circulatory System',
    subject: 'Biology',
    classLevel: 9,
    questions: [
      {
        question: 'What is the primary function of the heart?',
        options: [
          'To digest food',
          'To pump blood throughout the body',
          'To filter oxygen',
          'To store nutrients'
        ],
        correctAnswer: 1
      },
      {
        question: 'Which blood vessels carry oxygenated blood away from the heart?',
        options: ['Veins', 'Arteries', 'Capillaries', 'Lymph vessels'],
        correctAnswer: 1
      },
      {
        question: 'What are the four chambers of the heart called?',
        options: [
          'Left and right lungs, upper and lower chambers',
          'Two atria and two ventricles',
          'Four ventricles',
          'Four atria'
        ],
        correctAnswer: 1
      },
      {
        question: 'What is the role of red blood cells?',
        options: [
          'Fight infections',
          'Carry oxygen to body tissues',
          'Help blood clot',
          'Produce antibodies'
        ],
        correctAnswer: 1
      },
      {
        question: 'Which component of blood helps in clotting?',
        options: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'],
        correctAnswer: 2
      }
    ]
  },
  {
    topicId: 'photosynthesis',
    topic: 'Photosynthesis',
    subject: 'Biology',
    classLevel: 7,
    questions: [
      {
        question: 'What is the primary pigment involved in photosynthesis?',
        options: ['Carotene', 'Chlorophyll', 'Xanthophyll', 'Hemoglobin'],
        correctAnswer: 1
      },
      {
        question: 'Which gas do plants absorb during photosynthesis?',
        options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
        correctAnswer: 2
      },
      {
        question: 'What is the main product of photosynthesis?',
        options: ['Water', 'Glucose', 'Carbon dioxide', 'Nitrogen'],
        correctAnswer: 1
      }
    ]
  },
  {
    topicId: 'solar-system',
    topic: 'Solar System',
    subject: 'Science',
    classLevel: 5,
    questions: [
      {
        question: 'How many planets are in our solar system?',
        options: ['7', '8', '9', '10'],
        correctAnswer: 1
      },
      {
        question: 'Which is the largest planet in our solar system?',
        options: ['Earth', 'Saturn', 'Jupiter', 'Mars'],
        correctAnswer: 2
      },
      {
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Mercury', 'Neptune'],
        correctAnswer: 1
      }
    ]
  }
];

const sample3DModels = [
  {
    topicId: 'circulatory-system',
    topic: 'Human Circulatory System',
    subject: 'Biology',
    classLevel: 9,
    modelUrl: 'https://cdn.example.com/models/heart.glb',
    description: 'Explore the intricate network of blood vessels and the pumping action of the human heart. Watch how blood flows through the four chambers and understand the difference between oxygenated and deoxygenated blood.',
    keyPoints: [
      'The heart pumps blood throughout your body 24/7',
      'Arteries carry oxygen-rich blood away from the heart',
      'Veins return oxygen-poor blood back to the heart',
      'The average adult has about 5 liters of blood',
      'Your heart beats around 100,000 times per day'
    ],
    funFact: 'Your heart beats about 100,000 times per day, pumping roughly 2,000 gallons of blood!'
  },
  {
    topicId: 'photosynthesis',
    topic: 'Photosynthesis',
    subject: 'Biology',
    classLevel: 7,
    modelUrl: 'https://cdn.example.com/models/plant-cell.glb',
    description: 'Witness the amazing process of photosynthesis where plants convert sunlight into energy. See chloroplasts in action as they capture light energy and transform carbon dioxide and water into glucose.',
    keyPoints: [
      'Plants use sunlight to make their own food',
      'Chlorophyll gives plants their green color',
      'Oxygen is released as a byproduct',
      'This process happens in the chloroplasts',
      'Plants need water, CO2, and sunlight'
    ],
    funFact: 'A single tree can produce enough oxygen in one year to keep a family of four breathing!'
  },
  {
    topicId: 'solar-system',
    topic: 'Solar System',
    subject: 'Science',
    classLevel: 5,
    modelUrl: 'https://cdn.example.com/models/solar-system.glb',
    description: 'Take a journey through our solar system and explore all eight planets orbiting the Sun. Learn about their unique characteristics, sizes, and positions in space.',
    keyPoints: [
      'The Sun is a star at the center of our solar system',
      'Eight planets orbit the Sun',
      'Jupiter is the largest planet',
      'Earth is the only planet known to support life',
      'Saturn has beautiful rings made of ice and rock'
    ],
    funFact: 'If the Sun were the size of a basketball, Earth would be the size of a pea!'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Quiz.deleteMany({});
    await Progress.deleteMany({});
    await Model.deleteMany({});

    console.log('Cleared existing data');

    // Create users
    const users = await User.create(sampleUsers);
    console.log(`Created ${users.length} users`);

    // Create quizzes
    const quizzes = await Quiz.create(sampleQuizzes);
    console.log(`Created ${quizzes.length} quizzes`);

    // Create 3D models
    const models = await Model.create(sample3DModels);
    console.log(`Created ${models.length} 3D models`);

    // Create sample progress for student
    const student = users.find(u => u.role === 'student');
    if (student) {
      const sampleProgress = [
        {
          studentId: student._id,
          topicId: 'circulatory-system',
          topic: 'Human Circulatory System',
          subject: 'Biology',
          completed: true,
          score: 85,
          attempts: 2,
          lastAttemptDate: new Date()
        },
        {
          studentId: student._id,
          topicId: 'photosynthesis',
          topic: 'Photosynthesis',
          subject: 'Biology',
          completed: true,
          score: 92,
          attempts: 1,
          lastAttemptDate: new Date()
        },
        {
          studentId: student._id,
          topicId: 'solar-system',
          topic: 'Solar System',
          subject: 'Science',
          completed: false,
          score: 45,
          attempts: 1,
          lastAttemptDate: new Date()
        }
      ];

      const progress = await Progress.create(sampleProgress);
      console.log(`Created ${progress.length} progress records`);
    }

    console.log('\n✅ Database seeded successfully!');
    console.log('\nSample credentials:');
    console.log('Student: rahul@student.com / password123');
    console.log('Teacher: priya@teacher.com / password123');
    console.log('Parent: sharma@parent.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
