import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import member1 from '../assets/member-1.jpg';
import member2 from '../assets/member-2.jpg';
import member3 from '../assets/member-3.jpg';

const TeamPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      role: 'Genel Müdür',
      image: member1,
      socials: {
        twitter: '#',
        instagram: '#',
        linkedin: '#'
      }
    },
    {
      id: 2,
      name: 'Ayşe Demir',
      role: 'Pazarlama Müdürü',
      image: member2,
      socials: {
        twitter: '#',
        instagram: '#',
        linkedin: '#'
      }
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      role: 'Satış Müdürü',
      image: member3,
      socials: {
        twitter: '#',
        instagram: '#',
        linkedin: '#'
      }
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="text-center">
            <p className="text-sm font-bold text-gray-500 mb-4">NE YAPIYORUZ</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
              Size Özel İnovasyon
            </h1>
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm">
              <Link to="/" className="font-bold text-slate-800 hover:text-[#23A6F0]">Ana Sayfa</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="font-bold text-gray-400">Ekip</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Images Grid */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {/* Large Image */}
            <div className="col-span-2 row-span-2">
              <img 
                src="/src/assets/team-main.jpg"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Small Images */}
            <div className="col-span-1">
              <img 
                src="/src/assets/team-work-1.jpg"
                alt="Team meeting"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1">
              <img 
                src="/src/assets/team-work-2.jpg"
                alt="Team member"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1">
              <img 
                src="/src/assets/team-work-3.jpg"
                alt="Teamwork"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1">
              <img 
                src="/src/assets/team-work-4.jpg"
                alt="Office work"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Ekibimizle Tanışın
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Deneyimli ve uzman ekibimiz sizlere en iyi hizmeti sunmak için çalışıyor.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center group">
                {/* Image */}
                <div className="relative overflow-hidden mb-4">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[280px] sm:h-[260px] md:h-[300px] object-cover object-top"
                  />
                  {/* Social Overlay */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a 
                      href={member.socials.twitter} 
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white transition-colors shadow-lg"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a 
                      href={member.socials.instagram} 
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white transition-colors shadow-lg"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a 
                      href={member.socials.linkedin} 
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white transition-colors shadow-lg"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                {/* Info */}
                <h3 className="text-base font-bold text-slate-800 mb-1">{member.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{member.role}</p>
                {/* Social Icons (Always Visible on Mobile) */}
                <div className="flex justify-center gap-4 md:hidden">
                  <a href={member.socials.twitter} className="text-[#23A6F0]">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href={member.socials.instagram} className="text-[#23A6F0]">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href={member.socials.linkedin} className="text-[#23A6F0]">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              14 Gün Ücretsiz Deneme Başlatın
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Kaliteli ürünlerimizi keşfedin ve alışverişin tadını çıkarın. Ücretsiz deneme süresi ile başlayın.
            </p>
            <button className="bg-[#23A6F0] text-white px-10 py-4 rounded font-bold text-sm hover:bg-[#1a8cd8] transition-colors mb-6">
              Ücretsiz Deneyin
            </button>
            {/* Social Links */}
            <div className="flex justify-center gap-6">
              <a href="#" className="text-[#55ACEE] hover:opacity-80 transition-opacity">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#395185] hover:opacity-80 transition-opacity">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-black hover:opacity-80 transition-opacity">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#0A66C2] hover:opacity-80 transition-opacity">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
