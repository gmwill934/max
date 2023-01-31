import { ReactNode } from 'react';
import { Genre } from './genre';

export type Artist = {
  id: number;
  name: string;
  image: string;
  popularity: number;
  genres: Genre[];
  is_saved: boolean;
};

export type ArtistContextState = {
  dispatch: React.Dispatch<ArtistActionType>;
  isLoading: boolean;
  error: Error | string | undefined;
  data: {
    artists: Artist[] | undefined;
    artist: Artist | undefined;
    favorites: Artist[] | undefined;
    similar: Artist[] | undefined;
  };
};

export type ArtistState = {
  isLoading: boolean;
  error: Error | string | undefined;
  data: {
    artists: Artist[] | undefined;
    artist: Artist | undefined;
    favorites: Artist[] | undefined;
    similar: Artist[] | undefined;
  };
};

export type ArtistProviderProps = {
  children: ReactNode;
};

export type ArtistActionType =
  | { type: 'LOADING' }
  | { type: 'ERROR'; payload: string | Error | undefined }
  | { type: 'SET_ARTISTS'; payload: Artist[] }
  | { type: 'UPDATE_ARTIST'; payload: number }
  | { type: 'SET_FAVORITES'; payload: Artist[] }
  | { type: 'SET_ARTIST'; payload: Artist }
  | {
      type: 'SET_SIMILAR';
      payload: Artist[];
    };
