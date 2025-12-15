import React from 'react';
import { Play } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { value: '15K', label: 'Happy Customers' },
    { value: '150K', label: 'Monthly Visitors' },
    { value: '15', label: 'Countries Worldwide' },
    { value: '100+', label: 'Top Partners' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <p className="text-sm font-bold text-gray-500 mb-4">ABOUT COMPANY</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
                ABOUT US
              </h1>
              <p className="text-gray-500 text-base md:text-lg mb-8 max-w-md mx-auto lg:mx-0">
                We know how large objects will act, but things on a small scale just do not act that way.
              </p>
              <button className="bg-[#23A6F0] text-white px-8 py-4 rounded font-bold text-sm hover:bg-[#1a8cd8] transition-colors">
                Get Quote Now
              </button>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-8 -right-8 w-72 h-72 bg-pink-200 rounded-full -z-10"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-200 rounded-full -z-10"></div>
                <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-purple-300 rounded-full -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=500&fit=crop"
                  alt="About Us"
                  className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-lg relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <p className="text-sm font-bold text-[#E74040] mb-4">Problems trying</p>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
              </h2>
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-1/2">
              <p className="text-gray-500 text-center lg:text-left">
                Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics and quantum mechanics. Problems trying to resolve the conflict between the two major realms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">{stat.value}</h3>
                <p className="text-sm font-bold text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="relative rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop"
              alt="Video thumbnail"
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            />
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 md:w-20 md:h-20 bg-[#23A6F0] rounded-full flex items-center justify-center hover:bg-[#1a8cd8] transition-colors shadow-lg">
                <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face', name: 'Username', role: 'Profession' },
              { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face', name: 'Username', role: 'Profession' },
              { image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face', name: 'Username', role: 'Profession' }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-[280px] sm:h-[300px] object-cover object-top mb-4"
                />
                <h3 className="text-base font-bold text-slate-800 mb-1">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Big Companies Are Here
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>

          {/* Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png" alt="Tesla" className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative">
        <div className="flex flex-col lg:flex-row">
          {/* Left - Blue Background */}
          <div className="w-full lg:w-1/2 bg-[#23A6F0] py-16 md:py-24 px-4 md:px-8 lg:px-16">
            <div className="max-w-md mx-auto lg:ml-auto lg:mr-16 text-center lg:text-left">
              <p className="text-sm font-bold text-white mb-4">WORK WITH US</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                Now Let's grow Yours
              </h2>
              <p className="text-white text-sm mb-8">
                The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th
              </p>
              <button className="border-2 border-white text-white px-8 py-4 rounded font-bold text-sm hover:bg-white hover:text-[#23A6F0] transition-colors">
                Button
              </button>
            </div>
          </div>

          {/* Right - Image */}
          <div className="w-full lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1560264280-88b68371db39?w=800&h=500&fit=crop"
              alt="Work with us"
              className="w-full h-[300px] md:h-[400px] lg:h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
