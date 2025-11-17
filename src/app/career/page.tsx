import Image from 'next/image';
import { Heart, TrendingUp, Award, Users, Target, Sparkles, CheckCircle } from 'lucide-react';

interface CoreValue {
  id: string;
  title: string;
  subtitle: string;
  principles: string[];
  icon: string;
  color: string;
}

interface MissionPoint {
  id: string;
  text: string;
}

const defaultData = {
  hero: {
    title: 'Our Mission And Core Values',
    image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
  },
  mission: {
    title: 'Why are we here?',
    intro:
      'At Studyportals, we have always been an idealistic bunch of people. From the very start until today, our team continues to unify under a shared belief that strengthening international education for the entire world can not only be easier, but it can also be more inspiring.',
    description:
      "We remain consistently optimistic about the value of international education – a sense of confidence that all of our superheroes carry with them in everything we do. It's the best way to keep our eyes set on long-term goals, and ensures that we continue to create the world's largest education search platform.",
    statement: 'Empowering the world to choose education',
    statementIntro: 'If we could put our belief under one big banner, it would state the overall mission as:',
    meaning: 'The beauty of this mission is its double-meaning:',
    points: [
      {
        id: '1001',
        text: 'We want the world to choose education: we want everyone to embrace education, by any means, as the path to strong leadership, creative thinking, and a better society.',
      },
      {
        id: '1002',
        text: 'We want the world to choose education: want education choice to be transparent, enabling students and people worldwide to choose for themselves the education that fits their needs best.',
      },
    ] as MissionPoint[],
    closing:
      'From the design of our office to the layout of our platforms, to the decorations at our desks, Studyportals is a company built upon the mission of global education transparency, choice, and access across borders. We grow as our users and clients grow, making education the thing that energises our whole company personality. We share insights, innovate our products, develop ourselves, and – most importantly – contribute to an educated global society that is more tolerant and open.',
  },
  coreValues: [
    {
      id: '1',
      title: 'Making our world a little bit better',
      subtitle: 'Making our world a little bit better',
      principles: [
        'I improve our world every day',
        'I am purpose-driven',
        'I empower students to study abroad, creating a more tolerant and better-educated world',
        'I create a legacy through my career',
      ],
      icon: 'heart',
      color: 'from-pink-500 to-red-600',
    },
    {
      id: '2',
      title: 'Personal growth is the KEY',
      subtitle: 'Personal growth is the KEY',
      principles: [
        'I help my colleagues, clients, users, and partners be a little bit better every day',
        'I step out of my comfort zone',
        'I take ownership over my personal growth and learn from everyone',
        'I communicate openly about my strengths and weaknesses, as well as those of others',
      ],
      icon: 'trending',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      id: '3',
      title: 'Dedicated & never give up',
      subtitle: 'Dedicated & never give up',
      principles: [
        'I do what I promise',
        'I never give up on what we believe in',
        'I challenge the way we do things',
        'I aim high and make the team succeed',
        'I go the extra mile to reach my personal & company objectives',
        'I deliver value to students and clients in everything I do',
      ],
      icon: 'award',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      id: '4',
      title: 'Heads up & hearts open',
      subtitle: 'Heads up & hearts open',
      principles: [
        'I am optimistic, ambitious, and proud',
        'I see failure as a source for growth because it will help me do better next time.',
        'I speak my mind; I take up ideas and issues with the relevant person in an honest, direct, and constructive way',
        'I balance my feelings and my rational thinking',
        "I truly care about my colleagues' professional and private life",
      ],
      icon: 'users',
      color: 'from-green-500 to-emerald-600',
    },
    {
      id: '5',
      title: 'Serious about fun',
      subtitle: 'Serious about fun',
      principles: [
        'I initiate spontaneous activities with my colleagues',
        'I bring color to my life and to the lives of others',
        'I seek a fun element in everything I do',
        'I believe fun & achieving impact go hand in hand',
        "'If it is fun, it's never work. If it is not fun, it will never work'",
      ],
      icon: 'sparkles',
      color: 'from-yellow-500 to-orange-600',
    },
  ] as CoreValue[],
  cta: {
    title: 'Start Your Study Abroad Journey',
    subtitle:
      'Allow us to assist you at every stage, from selecting the best university to obtaining approval for your visa. Become one of the thousands of accomplished students who have relied on our advisory services.',
    buttonText: 'Apply now',
  },
  footer: {
    description:
      'The Nexus Study portal (NES Solution) is a prominent overseas study assistance center in Bangladesh and Malaysia. It began its journey in 2010.',
    company: [
      { id: '1', label: 'About us', link: '/about' },
      { id: '2', label: 'Blog', link: '/blog' },
      { id: '3', label: 'Student Enrolment', link: '/enrolment' },
      { id: '4', label: 'Careers', link: '/careers' },
    ],
    support: [
      { id: '1', label: 'FAQ', link: '/faq' },
      { id: '2', label: 'Terms & Conditions', link: '/terms' },
      { id: '3', label: 'Privacy Policy', link: '/privacy' },
      { id: '4', label: 'Become B2B Agent', link: '/b2b' },
    ],
  },
};

export default function MissionValuesPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <section className="relative bg-gradient-to-br from-gray-50 via-red-50 to-blue-50 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-8 animate-in fade-in slide-in-from-bottom duration-700">
                {defaultData.hero.title}
              </h1>
            </div>
          </div>
        </section>

        <section className="py-20 animate-in fade-in duration-700">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 animate-in fade-in slide-in-from-left duration-700">{defaultData.mission.title}</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed animate-in fade-in slide-in-from-left duration-700 delay-100">
                  {defaultData.mission.intro}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed animate-in fade-in slide-in-from-left duration-700 delay-200">
                  {defaultData.mission.description}
                </p>
                <div className="bg-gradient-to-br from-red-50 to-blue-50 p-8 rounded-2xl shadow-xl my-8 animate-in fade-in zoom-in duration-700 delay-300">
                  <p className="text-gray-700 mb-4 text-center">{defaultData.mission.statementIntro}</p>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 text-center italic">{defaultData.mission.statement}</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed font-semibold animate-in fade-in slide-in-from-left duration-700 delay-400">
                  {defaultData.mission.meaning}
                </p>
                <div className="space-y-4">
                  {defaultData.mission.points.map((point, index) => (
                    <div
                      key={point.id}
                      className="flex gap-4 items-start bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-600 hover:shadow-2xl transition-all transform hover:-translate-x-2 animate-in fade-in slide-in-from-right duration-700"
                      style={{ animationDelay: `${(index + 5) * 100}ms` }}
                    >
                      <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-700 leading-relaxed">{point.text}</p>
                    </div>
                  ))}
                </div>
                <p className="text-lg text-gray-700 leading-relaxed animate-in fade-in slide-in-from-left duration-700 delay-700">
                  {defaultData.mission.closing}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-red-600 via-purple-600 to-blue-600 relative overflow-hidden animate-in fade-in duration-700">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-in fade-in slide-in-from-bottom duration-700">Our core values</h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-200">
                What are the things that we bring to work with us every day? What are the principles that bolster our team and keep us focused on the mission?
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 animate-in fade-in duration-700">
          <div className="container mx-auto px-4">
            <div className="space-y-20">
              {defaultData.coreValues.map((value, index) => (
                <div
                  key={value.id}
                  className={`animate-in fade-in duration-700 ${index % 2 === 0 ? 'slide-in-from-left' : 'slide-in-from-right'}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
                        <Image
                          src={defaultData.hero.image}
                          alt={value.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-80 group-hover:opacity-70 transition-opacity`}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-transform">
                              {value.icon === 'heart' && <Heart className="w-10 h-10" />}
                              {value.icon === 'trending' && <TrendingUp className="w-10 h-10" />}
                              {value.icon === 'award' && <Award className="w-10 h-10" />}
                              {value.icon === 'users' && <Users className="w-10 h-10" />}
                              {value.icon === 'sparkles' && <Sparkles className="w-10 h-10" />}
                            </div>
                            <h3 className="text-3xl font-bold">{value.subtitle}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{value.title}</h3>
                      <div className="space-y-4">
                        {value.principles.map((principle, pIndex) => (
                          <div
                            key={pIndex}
                            className="flex gap-3 items-start bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:translate-x-2"
                          >
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <p className="text-gray-700 leading-relaxed">{principle}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-red-600 relative overflow-hidden animate-in fade-in duration-700">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-12 animate-in fade-in zoom-in duration-700">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform hover:scale-110 transition-transform">
                  <Target className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Values in Action</h2>
                <p className="text-xl text-white/90">
                  These core values aren&apos;t just words on a page—they&apos;re the foundation of everything we do. They guide our decisions, shape our
                  culture, and inspire us to make a positive impact on global education every single day.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 animate-in fade-in duration-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{defaultData.cta.title}</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">{defaultData.cta.subtitle}</p>
            <button className="px-10 py-4 bg-red-600 text-white font-bold text-lg rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 shadow-xl animate-pulse">
              {defaultData.cta.buttonText}
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-16 animate-in fade-in duration-700">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative w-32 h-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">NES</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">{defaultData.footer.description}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Company</h3>
              <ul className="space-y-3">
                {defaultData.footer.company.map(item => (
                  <li key={item.id}>
                    <a href={item.link} className="text-gray-400 hover:text-red-400 transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Support</h3>
              <ul className="space-y-3">
                {defaultData.footer.support.map(item => (
                  <li key={item.id}>
                    <a href={item.link} className="text-gray-400 hover:text-red-400 transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400">
                <p>© 2024 The Nexus Study portal (NES Solution). All rights reserved.</p>
              </div>
              <div className="flex gap-4">
                {['f', 'y', 'i', 'x', 'in', 't'].map((social, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 transition-all flex items-center justify-center transform hover:scale-110"
                  >
                    <span className="text-white">{social}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
