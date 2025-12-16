import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Header from './layout/Header'
import PageContent from './layout/PageContent'
import Footer from './layout/Footer'
import { autoLogin } from './store/actions/clientActions'
import { Loader2 } from 'lucide-react'

function App() {
  const dispatch = useDispatch();
  const [isInitializing, setIsInitializing] = useState(true);

  // Uygulama başlangıcında token kontrolü yap
  useEffect(() => {
    const initializeApp = async () => {
      await dispatch(autoLogin());
      setIsInitializing(false);
    };

    initializeApp();
  }, [dispatch]);

  // Uygulama başlatılırken loading göster
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#23A6F0] animate-spin" />
          <p className="text-gray-500">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      <PageContent />
      <Footer />
    </div>
  )
}

export default App
