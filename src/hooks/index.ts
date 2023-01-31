import { useContext } from 'react';
import { ArtistContext } from '../context/ArtistContext';
import { GenreContext } from '../context/GenreContext';

export const useGenre = () => useContext(GenreContext);

export function useArtistContext() {
  const context = useContext(ArtistContext);
  if (context === undefined) {
    throw new Error(
      'useArtistContext need to be wrapper with a React.Context provider'
    );
  }

  return {
    isLoading: context.isLoading,
    error: context.error,
    artists: context.data.artists, // search artists
    artist: context.data.artist, // single page artist
    favorites: context.data.favorites, // list artists (saved artists)
    similar: context.data.similar,
    dispatch: context.dispatch,
  };
}
