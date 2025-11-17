import Image from 'next/image';
import { Quote, Star, CheckCircle } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  university: string;
  program: string;
  content: string;
  image: string;
}

const defaultData = {
  hero: {
    title: 'What Our Students Say',
    subtitle: 'Real experiences from students who achieved their study abroad dreams',
    image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
  },
  testimonials: [
    {
      id: '1',
      name: 'Angela Buchi Gbandi',
      location: 'Nigeria',
      university: 'Vytautas Magnus University',
      program: 'Study Abroad Program',
      content:
        'I started by searching on Google for courses that suited my interest and I was redirected to different websites, one of which is Nexus Study Portal, which turned out to be the most useful. I chose Vytautas Magnus University (Lithuania) because it was the most affordable for me and the course completely suited my needs.',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
    {
      id: '2',
      name: 'Karan Prakash',
      location: 'Canada',
      university: 'Maastricht University',
      program: 'International Business Bachelor',
      content:
        'Currently, I am studying in the Netherlands at Maastricht University. I am enrolled in the International Business Bachelor, which is a three-year programme taught in the Problem Based Learning system. Nexus Study Portal helped me find the university that was most adequate for what I wanted to do later in life.',
      image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
    },
  ] as Testimonial[],
  stats: [
    { id: '1', value: '10,000+', label: 'Happy Students' },
    { id: '2', value: '95%', label: 'Success Rate' },
    { id: '3', value: '50+', label: 'Countries' },
    { id: '4', value: '500+', label: 'Universities' },
  ],
};

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="w-32 h-10 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">NES</span>
          </div>
          <button className="px-6 py-2 border-2 border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-all">Contact</button>
        </nav>
      </header>
      <main>
        <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-6">{defaultData.hero.title}</h1>
            <p className="text-xl text-gray-700">{defaultData.hero.subtitle}</p>
          </div>
        </section>
        <section className="py-20 bg-gradient-to-br from-red-600 via-purple-600 to-blue-600">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {defaultData.stats.map(stat => (
                <div key={stat.id} className="text-center">
                  <div className="text-5xl md:text-6xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-lg text-white/90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-4 space-y-20">
            {defaultData.testimonials.map((t, i) => (
              <div key={t.id} className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image src={t.image} alt={t.name} fill className="object-cover" sizes="50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{t.name}</h3>
                      <p className="text-white/90">{t.location}</p>
                    </div>
                  </div>
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="relative">
                    <Quote className="absolute -top-4 -left-4 w-16 h-16 text-red-200 transform rotate-180" />
                    <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-red-600">
                      <div className="mb-6">
                        <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold mb-3">
                          {t.university}
                        </div>
                        <p className="text-gray-600 font-medium">{t.program}</p>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-lg">{t.content}</p>
                      <div className="mt-6 flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Verified Student</span>
                      </div>
                    </div>
                    <Quote className="absolute -bottom-4 -right-4 w-16 h-16 text-red-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
