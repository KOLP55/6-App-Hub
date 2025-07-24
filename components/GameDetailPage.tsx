
import React from 'react';
import { Game } from '../types';

interface GameDetailPageProps {
  game: Game;
  onBack: () => void;
}

const ArrowRightIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 17.59L11.41 19 19 11.41 11.41 3.82 10 5.23 15.59 11H3v2h12.59L10 17.59z"/>
    </svg>
);

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const GameDetailPage: React.FC<GameDetailPageProps> = ({ game, onBack }) => {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
        <div className="mb-6">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-semibold transition-colors">
                <ArrowRightIcon className="w-6 h-6 transform rotate-180" />
                <span>العودة</span>
            </button>
        </div>

        <header className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <img src={game.imageUrl} alt={game.title} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-3xl shadow-lg flex-shrink-0" />
            <div className="flex-grow text-center sm:text-right">
                <h1 id="game-title" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">{game.title}</h1>
                <p className="text-lg text-green-600 dark:text-green-400 font-semibold mt-1">{game.category}</p>
                <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <div className="flex items-center gap-1">
                        <span>{game.rating}</span>
                        <StarIcon className="w-4 h-4 text-yellow-400 dark:text-yellow-500"/>
                    </div>
                    <span>•</span>
                    <span>{game.downloadCount} تنزيل</span>
                </div>
            </div>
        </header>

        <div className="mb-8">
            <a 
                href={game.downloadUrl}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white text-lg font-bold py-3 px-4 rounded-full hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 transition-all duration-300"
            >
                تثبيت
            </a>
        </div>
        
        <section className="mb-8">
            <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-4">
                {game.screenshots.map((ss, index) => (
                    <div key={index} className="flex-shrink-0 w-full sm:w-[320px]">
                         <img src={ss} alt={`Screenshot ${index + 1}`} className="rounded-xl w-full h-auto object-cover shadow-md" />
                    </div>
                ))}
            </div>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-2xl font-bold mb-3">عن هذه اللعبة</h3>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">{game.description}</p>
        </section>

        <style>{`
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .animate-fade-in {
                animation: fade-in 0.4s ease-out forwards;
            }
        `}</style>
    </main>
  );
};

export default GameDetailPage;
