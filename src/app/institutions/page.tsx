import Image from 'next/image';
import { GraduationCap, Building2, FileText, ExternalLink, Search, Filter } from 'lucide-react';

interface University {
  id: string;
  name: string;
  type: 'public' | 'private';
  logo?: string;
  image: string;
}

const defaultData = {
  hero: {
    title: 'University List Of Australia',
    subtitle: 'Explore world-class education opportunities in Australia',
    image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
  },
  publicUniversities: [
    { id: '1', name: 'The University of Queensland', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '2', name: 'Macquarie University', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '3', name: 'The University of Melbourne', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '4', name: 'Swinburne University of Technology', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '5', name: 'CQ University', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '6', name: 'Curtin University', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '7', name: 'University of Canberra', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '8', name: 'Charles Darwin University', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '9', name: 'Griffith University', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '10', name: 'University of Technology Sydney', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '11', name: 'Monash University', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '12', name: 'UNSW Sydney', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '13', name: 'Victoria University', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '14', name: 'The University of Western Australia', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '15', name: 'University of Wollongong', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '16', name: 'University of Tasmania', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '17', name: 'University of Newcastle', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '18', name: 'Flinders University', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '19', name: 'Deakin University', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '20', name: 'Queensland University of Technology', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
    { id: '21', name: 'George Brown College', type: 'public' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
  ] as University[],
  privateUniversities: [
    { id: '1', name: 'Sydney Metropolitan Institute of Technology', type: 'private' as const, image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg' },
  ] as University[],
  stats: [
    { id: '1', value: '21', label: 'Public Universities' },
    { id: '2', value: '1', label: 'Private Institutions' },
    { id: '3', value: '500K+', label: 'International Students' },
    { id: '4', value: 'Top 100', label: 'Global Rankings' },
  ],
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

export default function AustraliaUniversitiesPage() {
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
        <section className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-6 animate-in fade-in slide-in-from-bottom duration-700">
                {defaultData.hero.title}
              </h1>
              <p className="text-xl text-gray-700 mb-8 animate-in fade-in slide-in-from-bottom duration-700 delay-200">{defaultData.hero.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom duration-700 delay-300">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search universities..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  />
                </div>
                <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filter
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600 relative overflow-hidden animate-in fade-in duration-700">
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
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-8 h-8 text-red-600" />
                <h2 className="text-4xl font-bold text-gray-900">Public Universities and Institutes in Australia</h2>
              </div>
              <p className="text-xl text-gray-600">{defaultData.publicUniversities.length} prestigious public institutions</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {defaultData.publicUniversities.map((university, index) => (
                <div
                  key={university.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative h-48 group">
                    <Image
                      src={university.image}
                      alt={university.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Public</div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3">
                        <span className="text-red-600 font-bold text-lg">{university.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 min-h-[3.5rem] line-clamp-2">{university.name}</h3>
                    <div className="flex flex-col gap-3">
                      <button className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-orange-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                        <FileText className="w-4 h-4" />
                        View Details
                      </button>
                      <button className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-red-600 hover:text-red-600 transition-all flex items-center justify-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 animate-in fade-in duration-700">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-8 h-8 text-blue-600" />
                <h2 className="text-4xl font-bold text-gray-900">Private Universities and Institutes in Australia</h2>
              </div>
              <p className="text-xl text-gray-600">{defaultData.privateUniversities.length} specialized private institution</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {defaultData.privateUniversities.map((university, index) => (
                <div
                  key={university.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative h-48 group">
                    <Image
                      src={university.image}
                      alt={university.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Private</div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3">
                        <span className="text-blue-600 font-bold text-lg">{university.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 min-h-[3.5rem] line-clamp-2">{university.name}</h3>
                    <div className="flex flex-col gap-3">
                      <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                        <FileText className="w-4 h-4" />
                        View Details
                      </button>
                      <button className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden animate-in fade-in duration-700">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Why Study in Australia?</h2>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="animate-in fade-in zoom-in duration-700">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">World-Class Education</h3>
                  <p className="text-white/90">7 universities in global top 100</p>
                </div>
                <div className="animate-in fade-in zoom-in duration-700 delay-150">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Diverse Programs</h3>
                  <p className="text-white/90">22,000+ courses available</p>
                </div>
                <div className="animate-in fade-in zoom-in duration-700 delay-300">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Post-Study Work</h3>
                  <p className="text-white/90">Visa options available</p>
                </div>
              </div>
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
