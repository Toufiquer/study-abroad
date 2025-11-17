import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { GraduationCap, DollarSign, Briefcase, Calendar, MapPin, Trophy, Clock } from 'lucide-react';

export default function StudyAustraliaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image src="/australia-hero.jpg" alt="Study Abroad in Australia" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Study Abroad in Australia</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">Make the best use of study in Australia by enrolling in world-class institutions</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <section className="mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            The island nation is a favourite student destination in the world. Australia is a top student destination known for its quality education, diverse
            culture, and outdoor activities. With world-class healthcare and a high life expectancy, it&apos;s not just a great place to study but also to live.
            Home to eight of the top 100 global universities, Australia offers a wide range of courses in cities like Melbourne, Sydney, and Brisbane.
          </p>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-primary" />
                Why International Students Choose Australia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Advanced teaching styles',
                  'Plethora of Specialist institutions',
                  'Quality of Scientific Research',
                  'Global Acceptance of Australian Higher Education Standards',
                  'Multicultural Community',
                  'A Safe Environment',
                  'Unique Travel Choices',
                  'Flexibility to work up to 20 hours per week and 40 hours during semester breaks',
                ].map((reason, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">{reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold">Study Scholarships in Australia</h2>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Scholarship Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Every year, the Australian Government invests around $200,000,000 in international scholarships. Additionally, it evaluates all the universities
                in the country to make sure they are maintaining high standards on an annual basis.
              </p>

              <div className="bg-slate-50 p-6 rounded-lg space-y-4">
                <h3 className="font-semibold text-lg">Eligibility Criteria</h3>
                <p className="text-muted-foreground">
                  To qualify for scholarships in Australia, international students primarily need a strong academic record. Additional factors like the chosen
                  field of study, educational level, and even extracurricular activities can be considered. English language proficiency, often measured by
                  IELTS scores, is also a common requirement.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg space-y-4">
                <h3 className="font-semibold text-lg">Scholarship Amount</h3>
                <p className="text-muted-foreground">
                  Scholarships in Australia for Bangladeshi students mainly cover tuition and may include living and travel costs. Award types and amounts vary
                  by institution. Apply 8-12 months in advance due to competition.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Study Scholarship Programs in Australia</h3>
                <div className="space-y-2">
                  {[
                    'Australian Government Research and Training Program (AGRTP)',
                    'Australia Awards Scholarship',
                    'Destination Australia scholarship',
                    'John Allwright Fellowship (JAF)',
                  ].map((program, index) => (
                    <Badge key={index} variant="secondary" className="mr-2 mb-2 text-sm py-2 px-4">
                      {program}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold">Intakes in Australia</h2>
          </div>

          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-6">
                Australian universities have two main intakes, unlike the single intake in Bangladesh. These intakes, sometimes called semesters, are:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-2">Semester 1</h3>
                  <p className="text-muted-foreground">Late February to early June</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-2">Semester 2</h3>
                  <p className="text-muted-foreground">Late July to November</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg space-y-3">
                <h3 className="font-semibold text-lg">Australian Intakes Advantages</h3>
                <div className="space-y-2">
                  {[
                    'More start dates for courses and jobs',
                    'Enhanced scheduling flexibility',
                    'A diverse student community',
                    'Improved job prospects during peak hiring seasons',
                    'Access to support services like orientation',
                    'Extra time for cultural and environmental adjustment',
                  ].map((advantage, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground">{advantage}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold">Job Opportunities in Australia</h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Industry-Specific Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Healthcare Jobs in Australia</h3>
                  <p className="text-muted-foreground">
                    Australia&apos;s healthcare sector is always in demand. Medical professionals, from nurses to doctors, can find numerous healthcare jobs in
                    Australia offering competitive salaries and excellent working conditions.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-3">IT Jobs in Australia</h3>
                  <p className="text-muted-foreground">
                    The tech industry is booming, making IT jobs in Australia both abundant and lucrative. Whether you&apos;re a software engineer or a data
                    scientist, you can find a position that suits your skill set.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-3">Finance Jobs in Australia</h3>
                  <p className="text-muted-foreground">
                    Finance jobs in Australia range from accounting to investment banking. Australian financial institutions offer plenty of career growth and
                    development opportunities, making it a hotspot for finance professionals.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location-Specific Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      city: 'Sydney',
                      icon: '🏙️',
                      description:
                        "As Australia's financial and cultural capital, presents a multitude of job opportunities. From technology to tourism, jobs in Sydney are plentiful for those with the right skills and experience.",
                    },
                    {
                      city: 'Melbourne',
                      icon: '🎨',
                      description:
                        'Known for its diverse culture and arts scene, Melbourne employment opportunities are particularly strong in the creative industries, including media, fashion, and design.',
                    },
                    {
                      city: 'Brisbane',
                      icon: '🌆',
                      description:
                        'The Brisbane job market is rapidly growing, particularly in sectors like healthcare, education, and information technology. The city offers a balanced work-life environment, attracting professionals from all over the world.',
                    },
                  ].map((location, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-slate-50 rounded-lg">
                      <div className="text-4xl">{location.icon}</div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          {location.city}
                        </h3>
                        <p className="text-muted-foreground">{location.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill-Specific Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-primary bg-slate-50">
                    <h3 className="font-semibold mb-2">Entry-Level Jobs Australia</h3>
                    <p className="text-muted-foreground">
                      For those starting their careers, entry-level jobs in Australia provide a stepping stone into the professional world. These jobs often
                      require minimal experience but offer training and development opportunities.
                    </p>
                  </div>

                  <div className="p-4 border-l-4 border-primary bg-slate-50">
                    <h3 className="font-semibold mb-2">Skilled Jobs Australia</h3>
                    <p className="text-muted-foreground">
                      Skilled jobs in Australia usually require specific qualifications or years of experience. These roles often come with higher salaries and
                      greater job security.
                    </p>
                  </div>

                  <div className="p-4 border-l-4 border-primary bg-slate-50">
                    <h3 className="font-semibold mb-2">Freelance Jobs Australia</h3>
                    <p className="text-muted-foreground">
                      If a traditional 9-to-5 isn&apos;t your style, there are plenty of freelance jobs in Australia across sectors like writing, design, and
                      marketing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <DollarSign className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold">Cost of Study & Living Expenses</h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Study Expenses: Cost of Studying in Australia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Are you considering studying in Australia? It&apos;s crucial to plan your budget wisely. The cost of studying in Australia can vary depending
                  on factors like tuition fees, accommodation, and living expenses. Let&apos;s explore the key elements that contribute to the overall cost of
                  pursuing your education down under.
                </p>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Education Qualifications</TableHead>
                        <TableHead>Fee (BDT)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { qualification: 'School', fee: '5,83,383 to 21,66,853' },
                        {
                          qualification: 'Vocational Education and Training (Certificates I to IV, Diploma and Advanced Diploma)',
                          fee: '7,38,914 to 15,89,027',
                        },
                        { qualification: 'English language studies', fee: 'Approximate 21,669 per week depending on course length' },
                        { qualification: "Undergraduate bachelor's degree", fee: '10,83,428 to 23,83,540' },
                        { qualification: "Postgraduate master's degree", fee: '14,44,570 to 26,72,454' },
                        { qualification: 'Doctoral Degree', fee: '10,11,200 to 26,72,454' },
                      ].map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{row.qualification}</TableCell>
                          <TableCell>{row.fee}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Living Expenses: Cost of Living in Australia</CardTitle>
                <CardDescription>Minimum cost of living required: BDT 24,505</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Accommodation Expenses</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Qualifications</TableHead>
                          <TableHead>Fee</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          { type: 'Child', fee: '2,27,692/year' },
                          { type: 'Dependents', fee: '5,31,747/year' },
                          { type: 'Hostels and guesthouses', fee: '5,779 to 9,751 a week' },
                          { type: 'Shared rentals and On-Campus Accommodation', fee: '5,056 to 18,058 a week' },
                          { type: 'Homestay', fee: '7,946 to 19,502 a week' },
                          { type: 'Return Air Travel', fee: '1,44,457/head' },
                        ].map((row, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{row.type}</TableCell>
                            <TableCell>{row.fee}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="font-semibold mb-2">Annual Living Cost Estimate</p>
                  <p className="text-muted-foreground">
                    Students and their families can anticipate an annual living cost of approximately{' '}
                    <span className="font-semibold text-foreground">BDT 15,19,760</span>. If a student is arriving with a partner or guardian, there will be an
                    additional charge of <span className="font-semibold text-foreground">BDT 7,362</span>, and if accompanied by a minor, the expenses will be
                    approximately <span className="font-semibold text-foreground">BDT 27,27,665</span>.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Other Weekly Expenses</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Qualifications</TableHead>
                          <TableHead>Fee (BDT)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          { type: 'Groceries or eating out', fee: '5,822 to 14,454' },
                          { type: 'Gas and Electricity', fee: '4,334 to 7,223' },
                          { type: 'Phone and Internet', fee: '1,445 to 3,612' },
                          { type: 'Public Transport', fee: '723 to 3,612' },
                          { type: 'Entertainment', fee: '3,612 to 7,223' },
                        ].map((row, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{row.type}</TableCell>
                            <TableCell>{row.fee}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <p className="text-sm text-amber-900">
                    <span className="font-semibold">Note:</span> Please be aware that the cost of living in Australia depends on students&apos; choices and
                    habits. Opting for a luxurious lifestyle will result in higher living expenses, whereas adopting a more modest or simple lifestyle will lead
                    to lower living costs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold">Part-Time Work Opportunities</h2>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Student Visa Work Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <p className="text-lg font-semibold mb-2">Work Allowance</p>
                <p className="text-muted-foreground">
                  Most international students on a student visa (subclass 500) in Australia have permission to work up to{' '}
                  <span className="font-semibold text-foreground">48 hours every two weeks</span> during the semester and{' '}
                  <span className="font-semibold text-foreground">full-time during holidays</span>. This enables students to earn income to support their living
                  expenses.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Types of Part-Time Jobs</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Campus Jobs',
                      description:
                        'Many universities and colleges in Australia offer part-time job opportunities on campus. These jobs are convenient for students as they are located within the university premises.',
                    },
                    {
                      title: 'Off-Campus Employment',
                      description:
                        'International students can also seek part-time employment off-campus. Common job options include working in retail, hospitality, customer service, and more. Australia has a strong job market with a variety of opportunities.',
                    },
                    {
                      title: 'Career-Related Opportunities',
                      description:
                        'Some students may find part-time jobs related to their field of study, which can provide valuable experience and networking opportunities.',
                    },
                    {
                      title: 'English Proficiency',
                      description:
                        'Good English language skills are usually required for most part-time jobs. Students should consider improving their language proficiency to enhance their employability.',
                    },
                  ].map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Industries Offering Part-Time Work</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">There is a wide range of industries in Australia that offer part-time work opportunities including:</p>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  'Hospitality (Restaurants, bars and cafes)',
                  'Agriculture (Farming and fruit-picking)',
                  'Retail (Supermarkets and clothing stores)',
                  'Tourism (Hotels and Motels)',
                  'Tutoring',
                  'Administration or Clerical roles',
                  'Sales and Telemarketing',
                ].map((industry, index) => (
                  <Badge key={index} variant="outline" className="text-sm py-2 px-4 justify-center">
                    {industry}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 bg-slate-50 p-6 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Important:</span> Before applying for work, international students need to visit the
                  Australian Taxation Office to get a TFN (Taxation File Number). The process includes submitting a few details like name, current address, date
                  of birth along with the date of arrival in Australia, passport, and proof of enrolment.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white border-0">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Start Your Study Abroad Journey</h2>
              <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">
                Allow us to assist you at every stage, from selecting the best university to obtaining approval for your visa. Become one of the thousands of
                accomplished students who have relied on our advisory services.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Apply Now
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>

      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">About NeS Solution</h3>
              <p className="text-sm text-slate-400">
                The Nexus Study portal (NeS Solution) is a prominent overseas study assistance center in Bangladesh and Malaysia. It began its journey in 2010.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Student Enrolment
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Become B2B Agent
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Community</h3>
              <p className="text-sm text-slate-400 mb-4">Follow us on social media</p>
            </div>
          </div>
          <Separator className="my-8 bg-slate-700" />
          <div className="text-center text-sm text-slate-400">© 2024 The Nexus Study portal (NeS Solution). All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
