import React from 'react';
import { Play } from 'lucide-react';
import aboutHero from '../assets/about-hero.jpg';
import aboutTeam1 from '../assets/about-team-1.jpg';
import aboutTeam2 from '../assets/about-team-2.jpg';
import aboutTeam3 from '../assets/about-team-3.jpg';
import aboutContact from '../assets/about-contact.jpg';

const AboutPage = () => {
  const stats = [
    { value: '15K', label: 'Mutlu Müşteri' },
    { value: '150K', label: 'Aylık Ziyaretçi' },
    { value: '15', label: 'Ülke Genelinde' },
    { value: '100+', label: 'Birinci Sınıf Partner' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <p className="text-sm font-bold text-gray-500 mb-4">ŞİRKET HAKKINDA</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
                HAKKIMIZDA
              </h1>
              <p className="text-gray-500 text-base md:text-lg mb-8 max-w-md mx-auto lg:mx-0">
                Kaliteli ve taze ürünleri en uygun fiyatlarla sizlere ulaştırıyoruz. Müşteri memnuniyeti bizim önceliğimiz.
              </p>
              <button className="bg-[#23A6F0] text-white px-8 py-4 rounded font-bold text-sm hover:bg-[#1a8cd8] transition-colors">
                Teklif Alın
              </button>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-8 -right-8 w-72 h-72 bg-pink-200 rounded-full -z-10"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-200 rounded-full -z-10"></div>
                <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-purple-300 rounded-full -z-10"></div>
                <img 
                  src={aboutHero}
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
              <p className="text-sm font-bold text-[#E74040] mb-4">Sorunları Çözüyoruz</p>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                En kaliteli ürünleri en uygun fiyatlarla sunmak için çalışıyoruz.
              </h2>
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-1/2">
              <p className="text-gray-500 text-center lg:text-left">
                Müşterilerimizin ihtiyaçlarını anlamak ve onlara en iyi hizmeti sunmak için sürekli kendimizi geliştiriyoruz. Kalite, güvenilirlik ve müşteri memnuniyeti bizim temel değerlerimizdir.
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
              src={aboutHero}
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
              Ekibimizle Tanışın
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Deneyimli ve uzman ekibimiz sizlere en iyi hizmeti sunmak için çalışıyor.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { image: aboutTeam1, name: 'Ahmet Yılmaz', role: 'Genel Müdür' },
              { image: aboutTeam2, name: 'Ayşe Demir', role: 'Pazarlama Müdürü' },
              { image: aboutTeam3, name: 'Mehmet Kaya', role: 'Satış Müdürü' }
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
              Büyük Şirketler Bizimle
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Güvenilir iş ortaklarımızla birlikte size en iyi hizmeti sunuyoruz.
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
              <p className="text-sm font-bold text-white mb-4">BİZİMLE ÇALIŞIN</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                Şimdi Birlikte Büyüyelim
              </h2>
              <p className="text-white text-sm mb-8">
                Kaliteli ürünler ve mükemmel hizmet anlayışımızla sizin de yanınızda olmak istiyoruz.
              </p>
              <button className="border-2 border-white text-white px-8 py-4 rounded font-bold text-sm hover:bg-white hover:text-[#23A6F0] transition-colors">
                Başla
              </button>
            </div>
          </div>

          {/* Right - Image */}
          <div className="w-full lg:w-1/2">
            <img 
              src={aboutContact}
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
