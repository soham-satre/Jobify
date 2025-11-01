const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Job = require('./src/models/Job');

dotenv.config();

const sampleJobs = [
  {
    title: 'Full Stack Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    description: 'We are looking for a talented Full Stack Developer to join our team. You will be working on cutting-edge web applications using modern technologies.',
    requirements: [
      '3+ years of experience in web development',
      'Strong knowledge of JavaScript, React, and Node.js',
      'Experience with databases (MongoDB, PostgreSQL)',
      'Good understanding of RESTful APIs'
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
    salary: {
      min: 100000,
      max: 150000,
      currency: 'USD'
    },
    type: 'Full-time'
  },
  {
    title: 'Frontend Developer',
    company: 'DesignHub',
    location: 'Remote',
    description: 'Join our creative team as a Frontend Developer. You will create beautiful and responsive user interfaces for our clients.',
    requirements: [
      '2+ years of frontend development experience',
      'Expertise in React and modern CSS',
      'Understanding of UX/UI principles',
      'Experience with responsive design'
    ],
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'TypeScript'],
    salary: {
      min: 80000,
      max: 120000,
      currency: 'USD'
    },
    type: 'Full-time'
  },
  {
    title: 'Backend Engineer',
    company: 'DataFlow Systems',
    location: 'New York, NY',
    description: 'We need a skilled Backend Engineer to build and maintain our scalable server infrastructure.',
    requirements: [
      '4+ years of backend development experience',
      'Strong knowledge of Node.js or Python',
      'Experience with microservices architecture',
      'Database design and optimization skills'
    ],
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS'],
    salary: {
      min: 110000,
      max: 160000,
      currency: 'USD'
    },
    type: 'Full-time'
  },
  {
    title: 'Junior Web Developer',
    company: 'StartupXYZ',
    location: 'Austin, TX',
    description: 'Perfect opportunity for a junior developer to grow their skills in a fast-paced startup environment.',
    requirements: [
      'Basic knowledge of HTML, CSS, JavaScript',
      'Familiarity with React or Vue.js',
      'Eager to learn and grow',
      'Good communication skills'
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    salary: {
      min: 60000,
      max: 80000,
      currency: 'USD'
    },
    type: 'Full-time'
  },
  {
    title: 'DevOps Engineer',
    company: 'CloudNine Technologies',
    location: 'Seattle, WA',
    description: 'Looking for a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines.',
    requirements: [
      '3+ years of DevOps experience',
      'Strong knowledge of AWS or Azure',
      'Experience with Docker and Kubernetes',
      'Scripting skills (Bash, Python)'
    ],
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Python', 'Terraform'],
    salary: {
      min: 120000,
      max: 170000,
      currency: 'USD'
    },
    type: 'Full-time'
  },
  {
    title: 'React Native Developer',
    company: 'MobileFirst Inc.',
    location: 'Remote',
    description: 'Join us to build amazing mobile applications using React Native.',
    requirements: [
      '2+ years of mobile development experience',
      'Proficiency in React Native',
      'Understanding of iOS and Android platforms',
      'Experience with RESTful APIs'
    ],
    skills: ['React Native', 'JavaScript', 'iOS', 'Android', 'Redux'],
    salary: {
      min: 90000,
      max: 130000,
      currency: 'USD'
    },
    type: 'Full-time'
  },
  {
    title: 'Software Engineering Intern',
    company: 'BigTech Corp',
    location: 'Mountain View, CA',
    description: 'Summer internship program for aspiring software engineers. Great learning opportunity!',
    requirements: [
      'Currently pursuing CS degree',
      'Knowledge of any programming language',
      'Problem-solving skills',
      'Passion for technology'
    ],
    skills: ['Python', 'Java', 'C++', 'JavaScript'],
    salary: {
      min: 30,
      max: 40,
      currency: 'USD'
    },
    type: 'Internship'
  },
  {
    title: 'Data Scientist',
    company: 'AI Innovations',
    location: 'Boston, MA',
    description: 'Work on cutting-edge machine learning projects and help us build intelligent systems.',
    requirements: [
      'MS/PhD in Computer Science or related field',
      'Strong Python and ML libraries knowledge',
      'Experience with TensorFlow or PyTorch',
      'Statistical analysis skills'
    ],
    skills: ['Python', 'TensorFlow', 'Machine Learning', 'Statistics', 'SQL'],
    salary: {
      min: 130000,
      max: 180000,
      currency: 'USD'
    },
    type: 'Full-time'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing jobs
    await Job.deleteMany({});
    console.log('Cleared existing jobs');

    // Insert sample jobs
    const jobs = await Job.insertMany(sampleJobs);
    console.log(`Inserted ${jobs.length} sample jobs`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
