import Image from 'next/image';
import { MapPin, Phone, Mail, Building2, Send, Clock, Globe } from 'lucide-react';

interface Office {
  id: string;
  name: string;
  address: string;
  phone: string[];
  email?: string;
  whatsapp?: string;
}

const defaultData = {
  hero: {
    title: 'Get in Touch',
    subtitle: "We're here to help you start your study abroad journey",
    image: 'https://i.ibb.co.com/LzZ48tVk/ss.jpg',
  },
  offices: [
    {
      id: '1',
      name: 'Malaysia Head Office',
      address: 'B-10-14 Megan Avenue 2, 12 Jalan Yap Kwan Seng, Kuala Lumpur, Malaysia',
      phone: ['+60111819297'],
      email: 'contact@thenesis.com',
      whatsapp: '+60111819297',
    },
    {
      id: '2',
      name: 'Dhaka Office',
      address: 'House-387, Road-29, (Ground Floor) Mohakhali DOHS, Dhaka Bangladesh',
      phone: ['+8801795952130'],
    },
    {
      id: '3',
      name: 'Sylhet Office',
      address: 'Milan Monjil, Rasua -4, Raihanagar, East Mirabazar, Sylhet',
      phone: ['+8801889505801', '+8801889505801'],
    },
    {
      id: '4',
      name: 'Chittagong Office',
      address: '98/B1 Joynagar, Chatteshwari Road, Chawkbazar, Chattagram',
      phone: ['+8801613273400', '+8801613273400'],
    },
  ] as Office[],
  contactForm: {
    title: 'Send Us A Message',
    fields: {
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      message: 'Write your message',
    },
    submitButton: 'Submit',
  },
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

export default function ContactPage() {
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
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-in fade-in slide-in-from-bottom duration-700">
                {defaultData.hero.title}
              </h1>
              <p className="text-xl text-gray-700 animate-in fade-in slide-in-from-bottom duration-700 delay-200">{defaultData.hero.subtitle}</p>
            </div>
          </div>
        </section>

        <section className="py-20 animate-in fade-in duration-700">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Offices</h2>
              <p className="text-xl text-gray-600">Visit us at any of our locations</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {defaultData.offices.map((office, index) => (
                <div
                  key={office.id}
                  className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden animate-in fade-in slide-in-from-bottom duration-700"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative h-48">
                    <Image src={defaultData.hero.image} alt={office.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/80 to-blue-600/80"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Building2 className="w-12 h-12 mx-auto mb-3" />
                        <h3 className="text-2xl font-bold">{office.name}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex gap-3 items-start">
                      <MapPin className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">{office.address}</p>
                    </div>
                    <div className="space-y-2">
                      {office.phone.map((phone, pIndex) => (
                        <div key={pIndex} className="flex gap-3 items-center">
                          <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <a href={`tel:${phone}`} className="text-gray-700 hover:text-red-600 transition-colors">
                            {phone}
                          </a>
                        </div>
                      ))}
                    </div>
                    {office.email && (
                      <div className="flex gap-3 items-center">
                        <Mail className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <a href={`mailto:${office.email}`} className="text-gray-700 hover:text-red-600 transition-colors">
                          {office.email}
                        </a>
                      </div>
                    )}
                    {office.whatsapp && (
                      <div className="flex gap-3 items-center">
                        <Globe className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        <a
                          href={`https://wa.me/${office.whatsapp.replace(/\+/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-red-600 transition-colors"
                        >
                          WhatsApp: {office.whatsapp}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 animate-in fade-in duration-700">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-left duration-700">
                  <Image src={defaultData.hero.image} alt="Contact Us" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <Send className="w-20 h-20 mx-auto mb-6 animate-bounce" />
                      <h3 className="text-3xl font-bold mb-4">Let&apos;s Connect</h3>
                      <p className="text-lg">We&apos;re excited to hear from you!</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl animate-in fade-in slide-in-from-right duration-700">
                  <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">{defaultData.contactForm.title}</h2>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{defaultData.contactForm.fields.name} *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{defaultData.contactForm.fields.phone} *</label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{defaultData.contactForm.fields.email} *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">{defaultData.contactForm.fields.message}</label>
                      <textarea
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-blue-600 text-white font-bold text-lg rounded-lg hover:from-red-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
                    >
                      <Send className="w-5 h-5" />
                      {defaultData.contactForm.submitButton}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-red-600 relative overflow-hidden animate-in fade-in duration-700">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 text-center text-white">
                <div className="animate-in fade-in zoom-in duration-700">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform hover:scale-110 transition-transform">
                    <Clock className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Working Hours</h3>
                  <p className="text-white/90">Mon - Fri: 9AM - 6PM</p>
                  <p className="text-white/90">Sat: 10AM - 4PM</p>
                </div>
                <div className="animate-in fade-in zoom-in duration-700 delay-150">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform hover:scale-110 transition-transform">
                    <Phone className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Call Us</h3>
                  <p className="text-white/90">24/7 Support Available</p>
                  <p className="text-white/90">Multiple Languages</p>
                </div>
                <div className="animate-in fade-in zoom-in duration-700 delay-300">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform hover:scale-110 transition-transform">
                    <Mail className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Email Us</h3>
                  <p className="text-white/90">Quick Response Time</p>
                  <p className="text-white/90">Expert Advisors</p>
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
