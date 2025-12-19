import React from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      {/* Top Section - CTA */}
      <div className="bg-slate-100 py-10 md:py-12 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <h2 className="text-slate-800 font-bold text-xl md:text-2xl mb-2">İşletmeniz İçin Danışmanlık Hizmeti</h2>
            <p className="text-slate-500 text-sm">Kaliteli hizmet, uygun fiyat, müşteri memnuniyeti</p>
          </div>
          <Link to="/contact" className="bg-blue-500 text-white font-bold py-3 px-8 rounded hover:bg-blue-600 transition-colors whitespace-nowrap">
            Bize Ulaşın
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-slate-800 text-white py-12 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h4 className="font-bold text-base mb-4">Şirket Bilgileri</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/about" className="hover:text-white transition-colors">Hakkımızda</Link></li>
              <li><Link to="/team" className="hover:text-white transition-colors">Ekibimiz</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">İletişim</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Mağaza</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-base mb-4">Yasal</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kullanım Koşulları</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Çerez Politikası</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sorumluluk Reddi</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-bold text-base mb-4">Özellikler</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Hızlı Teslimat</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Güvenli Ödeme</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Canlı Destek</a></li>
              <li><a href="#" className="hover:text-white transition-colors">7/24 Hizmet</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-base mb-4">Kaynaklar</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">iOS & Android</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Demo İzle</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Müşteriler</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="font-bold text-base mb-4">İletişim</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+90 212 555 0103</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@bandage.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 pt-6 flex justify-center items-center">
          <div className="flex gap-4">
            <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors">
              <FaFacebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors">
              <FaTwitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
