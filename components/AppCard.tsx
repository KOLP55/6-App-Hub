
import React from 'react';
import { Link } from 'react-router-dom';
import { App } from '../types';
import Rating from './Rating';

interface AppCardProps {
  app: App;
}

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <Link to={`/app/${app.id}`} className="block group">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden transform hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        <div className="p-4 flex items-center gap-4">
          <img src={app.icon} alt={app.name} className="w-16 h-16 rounded-xl object-cover" />
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white truncate group-hover:text-blue-500">{app.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{app.developer}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-600 dark:text-gray-300">{app.rating.toFixed(1)}</span>
              <Rating value={app.rating} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AppCard;
