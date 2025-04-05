
import { format, addDays, addHours, subDays } from 'date-fns';

// Types
export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: 'student' | 'club' | 'admin';
  };
  content: string;
  images?: string[];
  createdAt: string;
  likes: number;
  comments: Comment[];
  eventLink?: {
    title: string;
    date: string;
    url: string;
  };
}

export interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  organizer: string;
  date: string;
  location: string;
  image?: string;
  category: 'workshop' | 'seminar' | 'hackathon' | 'cultural' | 'other';
}

export interface ForumTopic {
  id: string;
  title: string;
  description: string;
  department: string;
  posts: number;
  lastActivity: string;
}

export interface SJSQuestion {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    year: number;
  };
  title: string;
  content: string;
  createdAt: string;
  replies: SJSReply[];
}

export interface SJSReply {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    year: number;
  };
  content: string;
  createdAt: string;
}

export interface AnonymousPost {
  id: string;
  content: string;
  createdAt: string;
  category: 'feedback' | 'idea' | 'confession' | 'question';
  replies: AnonymousReply[];
}

export interface AnonymousReply {
  id: string;
  content: string;
  createdAt: string;
  isAdmin: boolean;
}

// Generate mock data
const now = new Date();

export const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      id: '2',
      name: 'Computer Science Club',
      avatar: '/placeholder.svg',
      role: 'club',
    },
    content: 'Join us for the upcoming Hackathon! This is a great opportunity to showcase your skills and win exciting prizes. Open to all students!',
    images: ['/placeholder.svg'],
    createdAt: format(subDays(now, 1), 'yyyy-MM-dd HH:mm:ss'),
    likes: 42,
    comments: [
      {
        id: '1',
        author: {
          id: '3',
          name: 'John Doe',
          avatar: '/placeholder.svg',
        },
        content: 'Sounds exciting! Can first-year students participate?',
        createdAt: format(subDays(now, 1), 'yyyy-MM-dd HH:mm:ss'),
      },
      {
        id: '2',
        author: {
          id: '2',
          name: 'Computer Science Club',
          avatar: '/placeholder.svg',
        },
        content: 'Absolutely! Everyone is welcome. We will have mentors to guide you.',
        createdAt: format(subDays(now, 1), 'yyyy-MM-dd HH:mm:ss'),
      },
    ],
    eventLink: {
      title: 'Annual Hackathon 2025',
      date: format(addDays(now, 7), 'MMMM dd, yyyy'),
      url: '/events/hackathon-2025',
    },
  },
  {
    id: '2',
    author: {
      id: '4',
      name: 'Cultural Committee',
      avatar: '/placeholder.svg',
      role: 'club',
    },
    content: 'Cultural Night rehearsals start next week! Don\'t forget to register your performances by this Friday.',
    createdAt: format(subDays(now, 2), 'yyyy-MM-dd HH:mm:ss'),
    likes: 27,
    comments: [],
  },
  {
    id: '3',
    author: {
      id: '5',
      name: 'Robotics Club',
      avatar: '/placeholder.svg',
      role: 'club',
    },
    content: 'Check out our latest robot design! This will be competing in the national competition next month.',
    images: ['/placeholder.svg', '/placeholder.svg'],
    createdAt: format(subDays(now, 3), 'yyyy-MM-dd HH:mm:ss'),
    likes: 65,
    comments: [
      {
        id: '3',
        author: {
          id: '6',
          name: 'Jane Smith',
          avatar: '/placeholder.svg',
        },
        content: 'This looks amazing! What sensors are you using?',
        createdAt: format(subDays(now, 3), 'yyyy-MM-dd HH:mm:ss'),
      },
    ],
  },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Hackathon 2025',
    description: 'A 24-hour coding competition where students can build projects in teams of up to 4. Prizes worth $5000 to be won!',
    organizer: 'Computer Science Club',
    date: format(addDays(now, 7), 'yyyy-MM-dd HH:mm:ss'),
    location: 'Main Campus, Building A',
    image: '/placeholder.svg',
    category: 'hackathon',
  },
  {
    id: '2',
    title: 'AI Workshop Series',
    description: 'Learn the fundamentals of Artificial Intelligence in this three-part workshop series. No prior experience required!',
    organizer: 'AI Society',
    date: format(addDays(now, 3), 'yyyy-MM-dd HH:mm:ss'),
    location: 'Online (Zoom)',
    category: 'workshop',
  },
  {
    id: '3',
    title: 'Cultural Night 2025',
    description: 'An evening celebrating the diverse cultures of our campus community, featuring performances, food, and art.',
    organizer: 'Cultural Committee',
    date: format(addDays(now, 14), 'yyyy-MM-dd HH:mm:ss'),
    location: 'College Auditorium',
    image: '/placeholder.svg',
    category: 'cultural',
  },
  {
    id: '4',
    title: 'Career Fair',
    description: 'Connect with over 50 companies from various industries. Bring your resume and business attire!',
    organizer: 'Career Services',
    date: format(addDays(now, 21), 'yyyy-MM-dd HH:mm:ss'),
    location: 'Student Center',
    category: 'other',
  },
  {
    id: '5',
    title: 'Research Symposium',
    description: 'Undergraduate and graduate students present their research projects to faculty and peers.',
    organizer: 'Research Department',
    date: format(addDays(now, 10), 'yyyy-MM-dd HH:mm:ss'),
    location: 'Science Building, Room 305',
    category: 'seminar',
  },
];

export const mockForumTopics: ForumTopic[] = [
  {
    id: '1',
    title: 'Interdisciplinary Project Ideas',
    description: 'Share and discuss ideas for projects that combine multiple fields of study.',
    department: 'All Departments',
    posts: 15,
    lastActivity: format(subDays(now, 1), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    id: '2',
    title: 'Engineering Ethics Discussion',
    description: 'Let\'s talk about ethical considerations in engineering practice and research.',
    department: 'Engineering',
    posts: 8,
    lastActivity: format(subDays(now, 3), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    id: '3',
    title: 'Business Case Competition Preparation',
    description: 'Resources and tips for the upcoming business case competition.',
    department: 'Business',
    posts: 22,
    lastActivity: format(subDays(now, 2), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    id: '4',
    title: 'Medical Research Opportunities',
    description: 'Information about research opportunities for medical students.',
    department: 'Medicine',
    posts: 5,
    lastActivity: format(subDays(now, 5), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    id: '5',
    title: 'Creative Arts Showcase',
    description: 'Share your artwork, writing, music, or other creative projects.',
    department: 'Arts',
    posts: 30,
    lastActivity: format(subDays(now, 1), 'yyyy-MM-dd HH:mm:ss'),
  },
];

export const mockSJSQuestions: SJSQuestion[] = [
  {
    id: '1',
    author: {
      id: '7',
      name: 'Alex Johnson',
      avatar: '/placeholder.svg',
      year: 1,
    },
    title: 'Course Selection Advice',
    content: 'I\'m a first-year Computer Science student and I\'m trying to plan my courses for next semester. Should I take Data Structures and Algorithms along with Discrete Math, or is that too challenging?',
    createdAt: format(subDays(now, 2), 'yyyy-MM-dd HH:mm:ss'),
    replies: [
      {
        id: '1',
        author: {
          id: '8',
          name: 'Michael Brown',
          avatar: '/placeholder.svg',
          year: 3,
        },
        content: 'I took those two courses together in my second year, and while it was challenging, it\'s definitely manageable if you stay on top of the work. The concepts in both classes complement each other well!',
        createdAt: format(subDays(now, 2), 'yyyy-MM-dd HH:mm:ss'),
      },
      {
        id: '2',
        author: {
          id: '9',
          name: 'Emily Chen',
          avatar: '/placeholder.svg',
          year: 4,
        },
        content: 'It depends on your other commitments. If you\'re also working part-time or involved in many extracurriculars, you might want to spread them out. Both courses require significant time for projects and problem sets.',
        createdAt: format(subDays(now, 1), 'yyyy-MM-dd HH:mm:ss'),
      },
    ],
  },
  {
    id: '2',
    author: {
      id: '10',
      name: 'Sophia Martinez',
      avatar: '/placeholder.svg',
      year: 2,
    },
    title: 'Internship Application Process',
    content: 'I\'m starting to apply for summer internships. Does anyone have advice on preparing for technical interviews? Also, when is the best time to start applying?',
    createdAt: format(subDays(now, 4), 'yyyy-MM-dd HH:mm:ss'),
    replies: [
      {
        id: '3',
        author: {
          id: '11',
          name: 'David Wilson',
          avatar: '/placeholder.svg',
          year: 4,
        },
        content: 'Start applying as early as September/October for the following summer. Many companies fill positions on a rolling basis. For technical interviews, practice on LeetCode and review data structures and algorithms concepts.',
        createdAt: format(subDays(now, 4), 'yyyy-MM-dd HH:mm:ss'),
      },
    ],
  },
];

export const mockAnonymousPosts: AnonymousPost[] = [
  {
    id: '1',
    content: 'I think the campus dining options need more vegetarian and vegan choices. It\'s really difficult to find good plant-based meals on campus.',
    createdAt: format(subDays(now, 3), 'yyyy-MM-dd HH:mm:ss'),
    category: 'feedback',
    replies: [
      {
        id: '1',
        content: 'Thanks for sharing this feedback. We\'ll pass it along to the dining services department for consideration in the next menu planning cycle.',
        createdAt: format(subDays(now, 2), 'yyyy-MM-dd HH:mm:ss'),
        isAdmin: true,
      },
    ],
  },
  {
    id: '2',
    content: 'I\'m feeling really overwhelmed with my course load this semester and I\'m afraid to talk to my professors about it because I don\'t want them to think I\'m not capable.',
    createdAt: format(subDays(now, 5), 'yyyy-MM-dd HH:mm:ss'),
    category: 'confession',
    replies: [
      {
        id: '2',
        content: 'Please know that many students feel this way and professors understand. Consider visiting our student support services - they can provide resources and strategies to help you manage your workload.',
        createdAt: format(subDays(now, 4), 'yyyy-MM-dd HH:mm:ss'),
        isAdmin: true,
      },
    ],
  },
  {
    id: '3',
    content: 'What if we created a weekend hackathon specifically for first-year students? It could be a less intimidating way for newcomers to try out their skills.',
    createdAt: format(subDays(now, 1), 'yyyy-MM-dd HH:mm:ss'),
    category: 'idea',
    replies: [],
  },
];
