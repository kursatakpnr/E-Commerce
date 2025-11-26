import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="p-4 bg-white shadow-md w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">E-Commerce</h1>
        <ShoppingCart className="text-gray-600" />
      </header>
      
      <main className="p-8 text-center">
        <Switch>
          <Route exact path="/">
            <h2 className="text-xl mb-4">Ana Sayfa</h2>
            <p className="text-gray-700">Proje başarıyla kuruldu!</p>
            <div className="mt-4 p-4 bg-white rounded shadow">
              <p>Kullanılan Teknolojiler:</p>
              <ul className="list-disc list-inside text-left mt-2">
                <li>React & Vite</li>
                <li>Redux & Thunk</li>
                <li>React Router v5</li>
                <li>Tailwind CSS</li>
                <li>Axios</li>
                <li>React Toastify</li>
                <li>Lucide Icons</li>
              </ul>
            </div>
          </Route>
          <Route path="/about">
            <h2>Hakkında</h2>
          </Route>
        </Switch>
      </main>
    </div>
  )
}

export default App
