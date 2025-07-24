
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AppDetailPage from './pages/AppDetailPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200">
          <Header />
          <main className="p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/app/:id" element={<AppDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
