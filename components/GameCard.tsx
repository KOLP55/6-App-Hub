
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onCardClick: (game: Game) => void;
}

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const GameCard: React.FC<GameCardProps> = ({ game, onCardClick }) => {
  return (
    <div 
        className="w-full cursor-pointer group flex flex-col gap-2"
        onClick={() => onCardClick(game)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onCardClick(game)}
        aria-label={`View details for ${game.title}`}
    >
      <div className="aspect-w-1 aspect-h-1">
        <img src={game.imageUrl} alt={game.title} className="w-full h-full object-cover rounded-2xl shadow-sm group-hover:shadow-md transition-shadow duration-300" />
      </div>
      <div className="text-right">
        <h3 className="text-sm text-gray-800 truncate">{game.title}</h3>
        <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="truncate">{game.developer}</span>
            <div className="flex items-center gap-1 flex-shrink-0">
                <span>{game.rating}</span>
                <StarIcon className="w-3 h-3 text-gray-400"/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
