import Image from 'next/image';
import { Globe, Search, DollarSign, Plane, BookOpen, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface Program {
  id: string;
  title: string;
  location: string;
  semesters: string[];
  description: string;
  price: string;
  image: string;
}

interface Destination {
  id: string;
  name: string;
  image: string;
}

interface Review {
  id: string;
  name: string;
  program: string;
  content: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface BlogPost {
  id: string;
  title: string;
  date: string;
  image: string;
}

const defaultData = {
  hero: {
    title: 'Study Abroad for',
    highlight: 'Everyone',
    subtitle: 'Quality education, incredible destinations—your dream study abroad program, for less.',
    tagline: 'Cut the cost, not the experience.',
  },
  features: [
    {
      id: '1',
      title: 'Semesters under $10,000',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
    {
      id: '2',
      title: 'Classes in English',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
    {
      id: '3',
      title: 'No frills—just what you want',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
  ],
  pricing: {
    title: 'LEADING THE WAY WITH AFFORDABLE STUDY ABROAD',
    studyAbroadCost: '$13,252',
    otherProgramsCost: '$20,134',
    savings: 'SAVINGS!',
  },
  programs: [
    {
      id: '1',
      title: 'Study Abroad at Udayana University',
      location: 'Bali, Indonesia',
      semesters: ['Fall Semester', 'Spring Semester'],
      description:
        'Explore vibrant Bali while studying at Udayana University. Experience rich culture, stunning landscapes, and a unique academic journey in paradise.',
      price: 'Semester: $9,995',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
    {
      id: '2',
      title: 'Study Abroad at University of Pécs in Hungary',
      location: 'Pécs, Hungary',
      semesters: ['Fall Semester', 'Spring Semester', 'Summer Break'],
      description:
        'Explore exciting study abroad opportunities in Hungary at the University of Pecs. Immerse yourself in a vibrant culture while earning your degree.',
      price: 'Summer: From $3,495',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
    {
      id: '3',
      title: 'Study Abroad at Monroe University in New York, USA',
      location: 'New York, USA',
      semesters: ['Spring Semester'],
      description:
        'Discover study abroad opportunities at Monroe University in the United States. Experience diverse cultures, expert faculty, and a vibrant campus life.',
      price: 'Semester: $10,995',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
    {
      id: '4',
      title: 'Study Abroad at Universidad de la Sabana in Colombia',
      location: 'Bogotá, Colombia',
      semesters: ['Academic Year', 'Fall Semester', 'Spring Semester'],
      description:
        'Explore vibrant Colombia through a unique study abroad experience at Universidad de la Sabana. Immerse yourself in culture and elevate your education today!',
      price: 'Semester: $11,995',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
    {
      id: '5',
      title: 'Study Abroad at Al Akhawayn University in Morocco',
      location: 'Ifrane, Morocco',
      semesters: ['Fall Semester', 'Spring Semester'],
      description:
        'Discover the charm of Morocco while studying at Al Akhawayn University. Experience a unique blend of culture, education, and adventure in a stunning setting.',
      price: 'Semester: $10,995',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
    {
      id: '6',
      title: 'Study Abroad at Universidad Pablo de Olavide in Spain',
      location: 'Seville, Spain',
      semesters: ['Fall Semester', 'Spring Semester', 'Summer Break'],
      description:
        'Discover study abroad opportunities at Universidad Pablo de Olavide. Experience vibrant culture, diverse courses, and unforgettable adventures in Seville!',
      price: 'Summer: $3,495',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
  ] as Program[],
  destinations: [
    { id: '1', name: 'AFRICA', image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '2', name: 'AMERICAS', image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '3', name: 'OCEANIA', image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '4', name: 'ASIA', image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '5', name: 'EUROPE', image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
  ] as Destination[],
  howItWorks: [
    {
      id: '1',
      icon: 'search',
      title: 'Explore Your Options',
      description:
        "Start by browsing study abroad programs that align with your academic goals and personal interests. Whether you dream of studying art in Italy or language and culture in South Korea, there's an exciting world of opportunities waiting for you.",
    },
    {
      id: '2',
      icon: 'book',
      title: 'Pick a Program',
      description:
        "Once you've explored your options, select a program that best fits your aspirations. Consider factors like course offerings, location, and cultural experiences to make an informed decision.",
    },
    {
      id: '3',
      icon: 'plane',
      title: 'Submit an application',
      description: 'Fill out our simple and easy online application, then keep an eye on your email for a response from one of our advisors.',
    },
  ],
  steps: [
    {
      id: '1',
      icon: 'wallet',
      title: 'Funding Your Program',
      description: 'Make studying abroad even more affordable by exploring scholarships, grants, and financial aid options.',
      link: 'EXPLORE FUNDING OPTIONS',
    },
    {
      id: '2',
      icon: 'luggage',
      title: 'Prepare to Travel',
      description:
        'Once accepted, start preparing for your adventure! This includes applying for a visa, booking your travel, and packing essentials for your new home away from home.',
      link: "THINGS YOU'LL NEED",
    },
    {
      id: '3',
      icon: 'badge',
      title: 'Embark on Your Journey',
      description:
        'Immerse yourself in a new culture, challenge yourself, and create unforgettable memories. Studying abroad is a transformative journey—make the most of every moment!',
      link: 'HEAR FROM OUR ALUMNI',
    },
  ],
  reviews: [
    {
      id: '1',
      name: 'TIA',
      program: 'STUDY IN MEXICO',
      content:
        'I had a great experience on this program and would rate it 10/10 highly. My advisor was Meghan, and the in-country coordinators were also helpful. The program allowed me to achieve academic goals, and I received credit for the necessary courses. From start to finish, StudyAbroad.com provided strong support, even advocating for me while I was abroad, which made the experience smooth and stress-free. I would definitely recommend this program to others, as they took care of nearly everything, making the entire process easy and enjoyable.',
    },
    {
      id: '2',
      name: 'ALISON',
      program: 'STUDY IN ITALY',
      content:
        "I had an experience of a lifetime studying abroad in Milan, Italy. I took a tour of Università Cattolica and got a tour of Sky Productions headquarters and the entire place was like an adventure, and I got to see a lot of Italian culture. I met great people along the way and had the best pasta and pizza. On the weekends I traveled to Portofino and Bellagio. My favorite part about Italy was the food and all the art and culture! I'm so happy that I made the decision to study abroad! I had a good application process. My advisor was sweet and very helpful. The team replied in a timely manner.",
    },
    {
      id: '3',
      name: 'MARCUS',
      program: 'STUDY IN JAPAN',
      content:
        "Honestly, this experience changed my life. I went in with so many questions and came out with new perspectives, new love for different cultures, and life-changing recommendations that I'll carry forever.",
    },
  ] as Review[],
  faqs: [
    {
      id: '1',
      question: 'How can I afford to study abroad?',
      answer:
        'Think studying abroad is too pricy? Think again! There are tons of scholarships, grants, and financial aid options specifically for study abroad. Plus, choosing programs in less expensive countries can stretch your dollar further, making global education totally attainable.',
    },
    {
      id: '2',
      question: 'Will studying abroad delay my graduation?',
      answer:
        'Not at all! Many study abroad programs are designed to fit seamlessly into your academic plan. With proper planning, you can earn credits that count toward your degree.',
    },
    {
      id: '3',
      question: 'Is it safe to study abroad?',
      answer: 'Safety is a top priority. We carefully vet all our programs and provide comprehensive support to ensure your wellbeing throughout your journey.',
    },
    {
      id: '4',
      question: 'How do I choose the right program?',
      answer:
        'Consider your academic goals, budget, preferred destinations, and personal interests. Our advisors are here to help guide you through the decision process.',
    },
    {
      id: '5',
      question: 'Will I get a chance to travel and explore?',
      answer: 'Absolutely! Study abroad programs typically include plenty of free time for you to explore your host country and neighboring regions.',
    },
  ] as FAQ[],
  blogs: [
    {
      id: '1',
      title: 'Study Abroad Destinations for Nature Enthusiasts',
      date: 'September 30, 2025',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
    {
      id: '2',
      title: 'Why You Should Consider Studying Abroad in Non-Traditional Destinations',
      date: 'September 29, 2025',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
    {
      id: '3',
      title: 'Study Abroad Anxiety: How to Cope and Stay Calm',
      date: 'September 23, 2025',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
    {
      id: '4',
      title: 'Where to Study Communications Abroad',
      date: 'September 23, 2025',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
    {
      id: '5',
      title: 'How to Journal Your Study Abroad Experience',
      date: 'September 16, 2025',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
    {
      id: '6',
      title: 'Czech Republic: Where Learning Meets Opportunity',
      date: 'September 11, 2025',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
    {
      id: '7',
      title: '2025 Guide to International SIM Cards for Students Abroad',
      date: 'September 9, 2025',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
    {
      id: '8',
      title: 'How to Balance Study and Social Life Abroad',
      date: 'September 4, 2025',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
    {
      id: '9',
      title: 'Where to Study Visual & Performing Arts Abroad',
      date: 'September 2, 2025',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
  ] as BlogPost[],
};

export default function StudyAbroadPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* <header className="sticky top-0 z-50 bg-white border-b border-gray-200 animate-in fade-in slide-in-from-top duration-500">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="w-8 h-8 text-teal-600" />
              <span className="text-2xl font-bold text-gray-900">
                Study<span className="text-teal-600">Abroad</span>
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#destinations" className="text-gray-700 hover:text-teal-600 transition-colors">
                DESTINATIONS
              </a>
              <a href="#subjects" className="text-gray-700 hover:text-teal-600 transition-colors">
                SUBJECTS
              </a>
              <a href="#terms" className="text-gray-700 hover:text-teal-600 transition-colors">
                TERMS
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-teal-600 transition-colors">
                HOW IT WORKS
              </a>
              <a href="#about" className="text-gray-700 hover:text-teal-600 transition-colors">
                ABOUT
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-colors">
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">SEARCH</span>
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:border-teal-600 transition-colors">INQUIRE</button>
              <button className="px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded hover:bg-yellow-500 transition-all transform hover:scale-105">
                APPLY
              </button>
            </div>
          </div>
        </nav>
      </header> */}

      <main>
        <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-green-100 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-in fade-in slide-in-from-bottom duration-700">
              {defaultData.hero.title}{' '}
              <span className="text-green-500 inline-block animate-in fade-in slide-in-from-bottom duration-700 delay-200">{defaultData.hero.highlight}</span>
            </h1>
            <p className="text-xl text-gray-700 mb-3 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-300">
              {defaultData.hero.subtitle}
            </p>
            <p className="text-lg text-gray-600 mb-8 animate-in fade-in slide-in-from-bottom duration-700 delay-400">{defaultData.hero.tagline}</p>
            <button className="px-8 py-4 bg-teal-700 text-white font-semibold rounded-lg hover:bg-teal-800 transition-all transform hover:scale-105 shadow-lg animate-in fade-in slide-in-from-bottom duration-700 delay-500">
              Find a Program
            </button>
          </div>
        </section>

        <section className="py-8 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {defaultData.features.map((feature, index) => (
                <div
                  key={feature.id}
                  className="relative h-64 rounded-lg overflow-hidden group cursor-pointer animate-in fade-in slide-in-from-bottom duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Image src={feature.image} alt={feature.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute inset-0 bg-blue-600/20 group-hover:bg-blue-600/30 transition-colors"></div>
                  <div className="absolute bottom-6 left-6 z-10">
                    <div className="inline-block px-4 py-2 bg-green-500 text-white font-semibold rounded transform group-hover:scale-110 transition-transform">
                      {feature.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 animate-in fade-in duration-700">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{defaultData.pricing.title}</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The average cost for a semester abroad with StudyAbroad.com is just $13,252 including tuition, housing, and more! The average cost of a
                    semester elsewhere starts around $20,124. Why are we so much less? We&apos;ve cut out unnecessary add-ons so that you can get the same study
                    experience, for oftentimes half the cost! Learn more about what&apos;s included in your program cost.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Average Semester Tuition + Housing</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-teal-600 text-white rounded-lg transform hover:scale-105 transition-transform">
                      <span className="font-semibold">StudyAbroad.com</span>
                      <span className="text-2xl font-bold">{defaultData.pricing.studyAbroadCost}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-800 text-white rounded-lg">
                      <span className="font-semibold">Other Semester Programs</span>
                      <span className="text-2xl font-bold">{defaultData.pricing.otherProgramsCost}</span>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-6 py-3 bg-green-500 text-white font-bold rounded-lg text-lg animate-pulse">
                        {defaultData.pricing.savings}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 animate-in fade-in duration-700">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">FEATURED STUDY ABROAD PROGRAMS</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Explore our featured study abroad programs, carefully curated to offer immersive educational experiences, while also exploring some of the most
              exciting a diverse destinations.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {defaultData.programs.map((program, index) => (
                <div
                  key={program.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/50 to-teal-400/50"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 uppercase tracking-wide">{program.semesters.join(', ')}</p>
                    <p className="text-gray-700 mb-6 line-clamp-3">{program.description}</p>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold">
                      <span>{program.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-white border-2 border-yellow-400 text-yellow-600 font-semibold rounded-lg hover:bg-yellow-400 hover:text-white transition-all transform hover:scale-105">
                VIEW ALL AVAILABLE PROGRAMS
              </button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 relative overflow-hidden animate-in fade-in duration-700">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold text-center text-white mb-4">EXPLORE THE WORLD FOR LESS</h2>
            <p className="text-center text-white/90 mb-12 max-w-3xl mx-auto">
              Our programs span diverse regions across the globe, offering unique study abroad opportunities that won&apos;t break the bank.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {defaultData.destinations.map((dest, index) => (
                <div
                  key={dest.id}
                  className="relative h-64 rounded-xl overflow-hidden group cursor-pointer transform hover:scale-105 transition-all duration-300 animate-in fade-in zoom-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Image src={dest.image} alt={dest.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-green-600/20 group-hover:from-blue-600/40 group-hover:to-green-600/40 transition-all"></div>
                  <div className="absolute bottom-6 left-0 right-0 text-center z-10">
                    <span className="inline-block px-6 py-2 bg-green-500 text-white font-bold rounded-full transform group-hover:scale-110 transition-transform">
                      {dest.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 animate-in fade-in duration-700">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">HOW STUDY ABROAD WORKS</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {defaultData.howItWorks.map((step, index) => (
                <div key={step.id} className="text-center animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center transform hover:scale-110 transition-transform">
                    {step.icon === 'search' && <Search className="w-10 h-10 text-white" />}
                    {step.icon === 'book' && <BookOpen className="w-10 h-10 text-white" />}
                    {step.icon === 'plane' && <Plane className="w-10 h-10 text-white" />}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 animate-in fade-in duration-700">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {defaultData.steps.map((step, index) => (
                <div
                  key={step.id}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 animate-in fade-in slide-in-from-bottom duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 mb-6 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    {step.icon === 'wallet' && <DollarSign className="w-8 h-8 text-white" />}
                    {step.icon === 'luggage' && <Plane className="w-8 h-8 text-white" />}
                    {step.icon === 'badge' && <MapPin className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-700 mb-6">{step.description}</p>
                  <button className="text-yellow-600 font-semibold hover:text-yellow-700 transition-colors uppercase text-sm">{step.link}</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 relative overflow-hidden animate-in fade-in duration-700">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold text-center text-white mb-16">FEATURED PROGRAM REVIEWS</h2>
            <div className="relative max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {defaultData.reviews.map((review, index) => (
                  <div
                    key={review.id}
                    className="bg-white p-8 rounded-xl shadow-xl animate-in fade-in slide-in-from-bottom duration-700"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
                      <p className="text-sm text-gray-500 uppercase tracking-wide">{review.program}</p>
                    </div>
                    <p className="text-gray-700 leading-relaxed line-clamp-6">{review.content}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4 mt-8">
                <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors transform hover:scale-110">
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors transform hover:scale-110">
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 animate-in fade-in duration-700">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">STUDY ABROAD FAQS</h2>
            <p className="text-center text-gray-600 mb-12">
              Got questions about studying abroad? Get all the answers you need to kickstart your journey with confidence!
            </p>
            <div className="space-y-4">
              {defaultData.faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all animate-in fade-in slide-in-from-left duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <button className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors">
                    <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                    <span className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center flex-shrink-0 ml-4">
                      <span className="text-gray-600 text-xl">+</span>
                    </span>
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-white border-2 border-yellow-400 text-yellow-600 font-semibold rounded-lg hover:bg-yellow-400 hover:text-white transition-all transform hover:scale-105">
                VIEW ALL FAQS
              </button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 relative overflow-hidden animate-in fade-in duration-700">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">GET MORE INFORMATION</h2>
              <p className="text-center text-gray-600 mb-8">Craving more info? Discover how you can start your epic study abroad journey.</p>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                </div>
                <input
                  type="text"
                  placeholder="What destination(s) are you interested in?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                />
                <input
                  type="text"
                  placeholder="What academic area(s) are important to you?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                />
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-gray-600">
                  <option>When do you want to go?</option>
                  <option>Fall 2025</option>
                  <option>Spring 2026</option>
                  <option>Summer 2026</option>
                </select>
                <div className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1" />
                  <p className="text-sm text-gray-600">
                    By checking this box, I consent to StudyAbroad.com collecting and storing my data through the submission of this form, sending marketing
                    communications, and I agree to the StudyAbroad.com Privacy Policy.
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition-all transform hover:scale-105 shadow-lg"
                >
                  SEND ME THE INFO!
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="py-20 animate-in fade-in duration-700">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">BLOGS & RESOURCES</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Whether you&apos;re looking for a packing list, destination guides, or advice on making the most of your experience, we&apos;ve got you covered!
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {defaultData.blogs.map((blog, index) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer animate-in fade-in slide-in-from-bottom duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48">
                    <Image src={blog.image} alt={blog.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/70 to-teal-500/70"></div>
                    <h3 className="text-xl font-bold text-white absolute bottom-4 left-6 right-6 z-10 leading-tight">{blog.title}</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <Globe className="w-4 h-4 mr-2" />
                      <span>StudyAbroad.com</span>
                      <span className="mx-2">•</span>
                      <span>{blog.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-white border-2 border-yellow-400 text-yellow-600 font-semibold rounded-lg hover:bg-yellow-400 hover:text-white transition-all transform hover:scale-105">
                VIEW ALL BLOGS & RESOURCES
              </button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 relative overflow-hidden animate-in fade-in duration-700">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-bold text-white mb-8">JOIN OUR COMMUNITY. CONNECT WITH US ON SOCIAL.</h2>
            <div className="flex justify-center gap-4">
              {['Instagram', 'TikTok', 'YouTube', 'Facebook', 'Threads', 'Email'].map((social, index) => (
                <button
                  key={social}
                  className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all transform hover:scale-110 animate-in zoom-in duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-white text-xl">{social[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-16 animate-in fade-in duration-700">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Globe className="w-8 h-8 text-teal-400" />
                <span className="text-2xl font-bold">
                  Study<span className="text-teal-400">Abroad</span>
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4">STUDY ABROAD FOR EVERYONE</h3>
              <p className="text-gray-400 leading-relaxed">
                We&apos;re here to make studying abroad achievable, and we&apos;re building a community of open-minded, connected, and culturally aware people
                ready to make a real impact in our ever-connected world.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">CONTACT US</h3>
              <p className="text-gray-400 mb-2">+1 623-552-4876</p>
              <p className="text-gray-400 mb-6">info@studyabroad.com</p>
              <h3 className="text-xl font-bold mb-4">GET STARTED</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    Inquire Now
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    Apply Now
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">SUBSCRIBE TO OUR NEWSLETTER</h3>
              <p className="text-gray-400 mb-6">Stay up to date with the latest study abroad programs, news and promotions! No spam, just good content.</p>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                />
                <div className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1" />
                  <p className="text-sm text-gray-400">
                    By checking this box, I consent to StudyAbroad.com collecting and storing my data through the submission of this form, sending marketing
                    communications, and I agree to the StudyAbroad.com Privacy Policy.
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition-all transform hover:scale-105 shadow-lg"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2025 StudyAbroad.com. All rights reserved. | Privacy Policy</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
