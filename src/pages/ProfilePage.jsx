import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { User, Mail, LogOut } from 'lucide-react';
import { getGravatarUrl } from '../utils/gravatar';
import { logout } from '../store/actions/clientActions';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const user = useSelector((state) => state.client.user);
  const dispatch = useDispatch();
  const history = useHistory();
  
  if (!user) {
    history.push('/login');
    return null;
  }
  
  const handleLogout = () => {
    dispatch(logout());
    toast.info('Cikis yapildi');
    history.push('/');
  };
  
  const getRoleName = (role) => {
    switch (role) {
      case 'customer': return 'Musteri';
      case 'store': return 'Magaza';
      case 'admin': return 'Admin';
      default: return role;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-[#23A6F0] p-6 text-white text-center">
          <img
            src={getGravatarUrl(user.email, 100)}
            alt={user.name}
            className="w-20 h-20 rounded-full border-4 border-white shadow-md mx-auto"
          />
          <h1 className="mt-3 text-xl font-bold">{user.name}</h1>
          <span className="inline-block mt-1 px-3 py-1 bg-white/20 rounded-full text-sm">
            {getRoleName(user.role)}
          </span>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Ad Soyad</p>
              <p className="font-medium text-gray-800">{user.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">E-posta</p>
              <p className="font-medium text-gray-800">{user.email}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            Cikis Yap
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;