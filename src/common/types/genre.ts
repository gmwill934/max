import { ReactNode } from 'react';

export type Genre = {
  id: number;
  name: string;
  is_primary: number;
};

export type GenreProviderProps = {
  children: ReactNode;
};

export type GenreContextState = {
  selectedGenre: Genre | undefined;
  genres: Genre[] | undefined;
  isLoading: boolean;
  error: Error | string | undefined;
  dispatch: React.Dispatch<GenreActionType>;
};

export type GenreState = {
  data: Genre[] | undefined;
  isLoading: boolean;
  selectedGenre: Genre | undefined;
  error: Error | string | undefined;
};

export type GenreActionType =
  | {
      type: 'SET_GENRE';
      payload: Genre | undefined;
    }
  | { type: 'FETCH_GENRES_SUCCESS'; payload: Genre[] }
  | {
      type: 'ERROR';
      payload: string;
    }
  | { type: 'LOADING' };
