import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Career = () => {
  const jobs = [
    {
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Join our team to build amazing user experiences for our digital marketplace platform where creators sell software, digital art, e-books, and courses.'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Drive the vision and strategy for DigiMart\'s digital marketplace, focusing on creator tools and buyer experience for digital goods.'
    },
    {
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Design intuitive interfaces for our digital marketplace, helping creators showcase their software, artwork, courses, and e-books effectively.'
    },
    {
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Grow our community of digital creators and buyers. Focus on marketing digital products like software, courses, and digital artwork.'
    },
    {
      title: 'Creator Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      description: 'Help digital creators succeed on our platform by providing guidance on selling software, digital art, e-books, and online courses.'
    },
    {
      title: 'Marketplace Operations Specialist',
      department: 'Operations',
      location: 'Austin, TX',
      type: 'Full-time',
      description: 'Ensure smooth operations of our digital marketplace, managing product listings, creator onboarding, and quality assurance for digital goods.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-cyan-700 mb-6">Join Our Team</h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                We're building the world's leading digital marketplace for software, digital artwork, e-books, 
                YouTube courses, and premium digital goods. Join us in empowering creators and connecting them with customers globally.
              </p>
            </div>

            {/* Company Culture */}
            <div className="bg-white p-8 rounded-lg shadow-md mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Why Work With Us?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-700">Innovation</h3>
                  <p className="text-gray-600">Work on cutting-edge marketplace technology that powers the digital economy.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-700">Creativity</h3>
                  <p className="text-gray-600">Support digital creators and be part of the creative economy revolution.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-700">Growth</h3>
                  <p className="text-gray-600">Grow with us as we expand the digital marketplace ecosystem globally.</p>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Open Positions</h2>
              <div className="space-y-6">
                {jobs.map((job, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-cyan-700 mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 mb-3">
                          <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm">
                            {job.department}
                          </span>
                          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                            📍 {job.location}
                          </span>
                          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                            ⏰ {job.type}
                          </span>
                        </div>
                        <p className="text-gray-600">{job.description}</p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6">
                        <button className="bg-cyan-700 text-white px-6 py-2 rounded-lg hover:bg-cyan-800 transition">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Career; 