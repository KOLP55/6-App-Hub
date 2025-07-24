
import React, { useState, useMemo } from 'react';
import { apps } from '../data/apps';
import AppCard from '../components/AppCard';
import { App } from '../types';

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');

  const categories = ['الكل', ...Array.from(new Set(apps.map(app => app.category)))];

  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      const matchesCategory = selectedCategory === 'الكل' || app.category === selectedCategory;
      const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="container mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">أفضل التطبيقات والألعاب</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">استكشف مجموعة منتقاة من أفضل التطبيقات والألعاب لجهازك.</p>
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن تطبيقات وألعاب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pr-12 text-lg bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 focus:ring-0 rounded-xl"
          />
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
             <SearchIcon />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {selectedCategory === 'الكل' ? 'جميع التطبيقات' : selectedCategory}
        </h2>
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredApps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 dark:text-gray-400">لم يتم العثور على تطبيقات تطابق بحثك.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
