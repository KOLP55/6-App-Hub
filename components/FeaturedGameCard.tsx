
import React from 'react';
import { Game } from '../types';

interface FeaturedGameCardProps {
  game: Game;
  onCardClick: (game: Game) => void;
}

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const PlayCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
    </svg>
);


const FeaturedGameCard: React.FC<FeaturedGameCardProps> = ({ game, onCardClick }) => {
    if (!game.bannerUrl) {
        return null;
    }

    return (
        <div 
            className="w-full cursor-pointer group"
            onClick={() => onCardClick(game)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onCardClick(game)}
            aria-label={`View details for ${game.title}`}
        >
            <div className="relative aspect-w-16 aspect-h-9 mb-4">
                <img src={game.bannerUrl} alt={`${game.title} banner`} className="w-full h-full object-cover rounded-2xl shadow-sm group-hover:shadow-lg transition-shadow duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                 <PlayCircleIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 text-white/80" />
            </div>
            
            <div className="flex items-center gap-4">
                <img src={game.imageUrl} alt={game.title} className="w-16 h-16 object-cover rounded-2xl shadow-md flex-shrink-0" />
                <div className="flex-grow">
                    <h3 className="text-md font-semibold text-gray-800">{game.title}</h3>
                    <p className="text-sm text-gray-600">{game.category}</p>
                     <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <span>{game.rating}</span>
                        <StarIcon className="w-3 h-3 text-gray-400"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedGameCard;
