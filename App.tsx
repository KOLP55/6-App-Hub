import React, { useState, useEffect, useMemo } from 'react';
import { Game } from './types';
import { MOCK_GAMES } from './constants';
import Header from './components/Header';
import GameCard from './components/GameCard';
import FeaturedGameCard from './components/FeaturedGameCard';
import GameDetailPage from './components/GameDetailPage';
import GameCardSkeleton from './components/GameCardSkeleton';
import Section from './components/Section';
import AuthModal from './components/AuthModal';
import { useAuth } from './hooks/useAuth';

const HomePage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [viewingGame, setViewingGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { isAuthModalOpen } = useAuth();

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setGames(MOCK_GAMES);
      setIsLoading(false);
    }, 1500);
  }, []);

  const { recommendedGames, indieGame, multiplayerGame } = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase().trim();
    
    let filtered = games;
    if (lowercasedQuery) {
        filtered = games.filter(game =>
            game.title.toLowerCase().includes(lowercasedQuery) ||
            game.developer.toLowerCase().includes(lowercasedQuery)
        );
    }
    
    return {
      recommendedGames: filtered,
      indieGame: games.find(g => g.id === 1), // Static featured game
      multiplayerGame: games.find(g => g.id === 3) // Static featured game
    };
  }, [searchQuery, games]);


  const handleViewGame = (game: Game) => {
    setViewingGame(game);
    window.scrollTo(0, 0);
  };

  const handleGoBack = () => {
    setViewingGame(null);
  };
  
  const renderContent = () => {
    if (viewingGame) {
      return <GameDetailPage game={viewingGame} onBack={handleGoBack} />;
    }

    return (
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        <Section title="مُقترَح لك" showArrow>
          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 pb-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => <div className="w-28 flex-shrink-0" key={index}><GameCardSkeleton /></div>)
            ) : (
              recommendedGames.map(game => (
                <div className="w-28 flex-shrink-0" key={game.id}>
                  <GameCard game={game} onCardClick={() => handleViewGame(game)} />
                </div>
              ))
            )}
          </div>
        </Section>
        
        {indieGame && (
          <Section title="قسم الألعاب المستقلة" subtitle="استمتع بأفضل الألعاب المستقلة" showArrow>
            {isLoading ? <div>Loading...</div> : <FeaturedGameCard game={indieGame} onCardClick={() => handleViewGame(indieGame)} />}
          </Section>
        )}

        {multiplayerGame && (
           <Section title="ألعاب متعددة اللاعبين" showArrow>
            {isLoading ? <div>Loading...</div> : <FeaturedGameCard game={multiplayerGame} onCardClick={() => handleViewGame(multiplayerGame)} />}
          </Section>
        )}

        {searchQuery && recommendedGames.length === 0 && !isLoading && (
            <div className="col-span-full text-center py-16">
                <h2 className="text-2xl font-semibold text-gray-500">لا توجد نتائج</h2>
                <p className="text-gray-400 mt-2">لم نتمكن من العثور على أي ألعاب تطابق بحثك.</p>
            </div>
        )}
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
      />
      {renderContent()}
      {isAuthModalOpen && <AuthModal />}
    </div>
  );
};

export default HomePage;