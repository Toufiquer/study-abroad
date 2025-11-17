import Image from 'next/image';
import { Globe, Users, Target, Award, CheckCircle } from 'lucide-react';

interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
}

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface Stat {
  id: string;
  value: string;
  label: string;
}

interface Partner {
  id: string;
  name: string;
  type: string;
}

const defaultData = {
  hero: {
    title: 'Our Story',
    subtitle: 'Nexus Study Portal is the International Study Choice Platform.',
    mission: 'Our mission: &#x27;Empowering the world to choose education&#x27;.',
    image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
  },
  story: {
    how: {
      title: 'How?',
      content: [
        'By making study choice transparent globally. We help universities with easier and more effective international marketing and recruitment solutions.',
        'Nexus Study Portal started as a spin-off from a couple of large international study associations, frustrated by the lack of information to find international masters in Europe. Mastersportal.com was born and proved to be an overwhelming success. In 2009 Nexus Study Portal BV, a private enterprise, which now also publishes Bachelorsportal.com, Phdportal.com, Shortcoursesportal.com, Distancelearningportal.com, Scholarshipsportal.com and Admissionstestportal.com was founded.',
        'We are driven to realise a positive contribution to our world with our platform. Beyond that, the Nexus Study Portal Foundation realizes charitable projects related to our mission and our team.',
        'Nowadays, the Nexus Study Portal team consists of over 155 people with 29 different nationalities, with the centre of our operations in Eindhoven, the Netherlands.',
        'We currently have more than 3,750 participating universities around the world. We cooperate with and are supported by the European Commission and many national institutes such as the British Council (UK), DAAD (Germany), Nuffic (Netherlands), SIU (Norway), OeAD (Austria), Universidad.es (Spain) and many more. International Student Associations are still our key partners in further developing our services, as well as informing students about the assistance our portals can give them. We are proud to state that most big international student associations are our official partners.',
      ],
    },
    why: {
      title: 'Why?',
      content: [
        'The following developments have driven the need and motivation to create the original Mastersportal.com:',
        'Europe is unifying their university systems - Powered by the Bologna Process, 48 nations in Europe aim to unify their systems in a three-tier system of Higher Education: Bachelor&#x27;s, Master&#x27;s and PhD. In 2010, the European Higher Education Area was supposed to come to its full effect.',
        'Mobility is key - Students and researchers are encouraged and supported to relocate themselves to another university in another city or country when moving to the next level.',
        'We found that there is no comprehensive internet source where international degree programmes could be found and compared on an international level.',
        'Despite the wave of newly created (master&#x27;s) programmes, of which many with an international focus, there were very little information sources available and those that existed were of best at the national level.',
        'Finding and comparing programmes internationally was a time consuming and strenuous activity.',
        'Through our investigation on the topic, we have received many complaints from students in and outside Europe about this lack of information, which left them either not being able to study at all abroad, or study in other continents, primarily the USA.',
        'We consider international study experience extremely valuable to students&#x27; development. Through our portals, we try to fill the information gap that hinders students from finding and starting their international studies. On this mission, there&#x27;s still a lot of work to be done, but we are working enthusiastically and welcome cooperation with students and universities.',
      ],
    },
  },
  stats: [
    { id: '1', value: '3,750+', label: 'Participating Universities' },
    { id: '2', value: '155+', label: 'Team Members' },
    { id: '3', value: '29', label: 'Nationalities' },
    { id: '4', value: '2009', label: 'Founded' },
  ] as Stat[],
  features: [
    {
      id: '1',
      icon: 'globe',
      title: 'Global Transparency',
      description: 'Making study choice transparent globally by helping universities with easier and more effective international marketing.',
    },
    {
      id: '2',
      icon: 'users',
      title: 'Diverse Team',
      description: 'Over 155 people with 29 different nationalities working together in Eindhoven, the Netherlands.',
    },
    {
      id: '3',
      icon: 'target',
      title: 'Clear Mission',
      description: 'Empowering the world to choose education and realizing positive contributions through our platform.',
    },
    {
      id: '4',
      icon: 'award',
      title: 'Trusted Partners',
      description: 'Supported by European Commission, British Council, DAAD, Nuffic, and major international student associations.',
    },
  ] as Feature[],
  milestones: [
    {
      id: '1',
      year: '2009',
      title: 'Foundation',
      description: 'Nexus Study Portal BV was founded as a private enterprise, launching multiple portals including Bachelorsportal.com and Phdportal.com.',
    },
    {
      id: '2',
      year: '2010',
      title: 'Journey Begins',
      description: 'Started as a prominent overseas study assistance center in Bangladesh and Malaysia, beginning our international expansion.',
    },
    {
      id: '3',
      year: '2015',
      title: 'Rapid Growth',
      description: 'Expanded partnerships with universities worldwide and launched additional portals for specialized education programs.',
    },
    {
      id: '4',
      year: '2024',
      title: 'Global Leader',
      description: 'Now serving 3,750+ universities with 155+ team members, leading the international study choice platform space.',
    },
  ] as Milestone[],
  partners: [
    { id: '1', name: 'European Commission', type: 'Government' },
    { id: '2', name: 'British Council (UK)', type: 'National Institute' },
    { id: '3', name: 'DAAD (Germany)', type: 'National Institute' },
    { id: '4', name: 'Nuffic (Netherlands)', type: 'National Institute' },
    { id: '5', name: 'SIU (Norway)', type: 'National Institute' },
    { id: '6', name: 'OeAD (Austria)', type: 'National Institute' },
    { id: '7', name: 'Universidad.es (Spain)', type: 'National Institute' },
  ] as Partner[],
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm animate-in fade-in slide-in-from-top duration-500">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-32 h-10">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">NES</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-gray-700 hover:text-red-600 transition-colors font-medium">About</button>
              <button className="text-gray-700 hover:text-red-600 transition-colors font-medium">Students</button>
              <button className="text-gray-700 hover:text-red-600 transition-colors font-medium">Study Abroad</button>
              <button className="text-gray-700 hover:text-red-600 transition-colors font-medium">Institutions</button>
              <button className="text-gray-700 hover:text-red-600 transition-colors font-medium">Careers</button>
              <button className="text-gray-700 hover:text-red-600 transition-colors font-medium">News and Events</button>
            </div>
            <button className="px-6 py-2 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-all transform hover:scale-105">
              Contact
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative bg-gradient-to-br from-gray-50 via-red-50 to-blue-50 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-6 animate-in fade-in slide-in-from-bottom duration-700">
                {defaultData.hero.title}
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
                {defaultData.hero.subtitle}
              </h2>
              <p className="text-xl text-gray-700 italic animate-in fade-in slide-in-from-bottom duration-700 delay-300">{defaultData.hero.mission}</p>
            </div>
          </div>
        </section>

        <section className="py-20 animate-in fade-in duration-700">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
                <h2 className="text-4xl font-bold text-gray-900 mb-8">{defaultData.story.how.title}</h2>
                {defaultData.story.how.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-gray-700 leading-relaxed animate-in fade-in slide-in-from-left duration-700"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-right duration-700">
                <Image src={defaultData.hero.image} alt="Our Story" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-red-600 via-purple-600 to-blue-600 relative overflow-hidden animate-in fade-in duration-700">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {defaultData.stats.map((stat, index) => (
                <div key={stat.id} className="text-center animate-in fade-in zoom-in duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="text-5xl md:text-6xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-lg text-white/90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 animate-in fade-in duration-700">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">{defaultData.story.why.title}</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">The driving forces behind creating the original Mastersportal.com</p>
            <div className="max-w-5xl mx-auto space-y-6">
              {defaultData.story.why.content.map((paragraph, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-600 hover:shadow-2xl transition-all transform hover:-translate-x-2 animate-in fade-in slide-in-from-right duration-700"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <p className="text-gray-700 leading-relaxed">{paragraph}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 animate-in fade-in duration-700">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">What We Offer</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Our commitment to empowering students and universities worldwide</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {defaultData.features.map((feature, index) => (
                <div
                  key={feature.id}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 animate-in fade-in slide-in-from-bottom duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform">
                    {feature.icon === 'globe' && <Globe className="w-8 h-8 text-white" />}
                    {feature.icon === 'users' && <Users className="w-8 h-8 text-white" />}
                    {feature.icon === 'target' && <Target className="w-8 h-8 text-white" />}
                    {feature.icon === 'award' && <Award className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 animate-in fade-in duration-700">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Our Journey</h2>
            <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">From humble beginnings to global leadership in international education</p>
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-600 to-blue-600 hidden lg:block"></div>
                {defaultData.milestones.map((milestone, index) => (
                  <div
                    key={milestone.id}
                    className={`relative mb-12 animate-in fade-in duration-700 ${
                      index % 2 === 0 ? 'lg:pr-1/2 slide-in-from-left' : 'lg:pl-1/2 slide-in-from-right'
                    }`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className={`lg:flex ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                      <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 max-w-md">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">{milestone.year}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">{milestone.title}</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-red-600 relative overflow-hidden animate-in fade-in duration-700">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold text-center text-white mb-4">Our Trusted Partners</h2>
            <p className="text-center text-white/90 mb-12 max-w-3xl mx-auto">Collaborating with leading institutions and organizations worldwide</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {defaultData.partners.map((partner, index) => (
                <div
                  key={partner.id}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105 animate-in fade-in zoom-in duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <h3 className="font-bold text-white">{partner.name}</h3>
                  </div>
                  <p className="text-sm text-white/80">{partner.type}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 animate-in fade-in duration-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{defaultData.cta.title}</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">{defaultData.cta.subtitle}</p>
            <button className="px-10 py-4 bg-red-600 text-white font-bold text-lg rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 shadow-xl">
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
                <button className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 transition-all flex items-center justify-center transform hover:scale-110">
                  <span className="text-white">f</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 transition-all flex items-center justify-center transform hover:scale-110">
                  <span className="text-white">y</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 transition-all flex items-center justify-center transform hover:scale-110">
                  <span className="text-white">i</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 transition-all flex items-center justify-center transform hover:scale-110">
                  <span className="text-white">x</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 transition-all flex items-center justify-center transform hover:scale-110">
                  <span className="text-white">in</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 transition-all flex items-center justify-center transform hover:scale-110">
                  <span className="text-white">t</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
