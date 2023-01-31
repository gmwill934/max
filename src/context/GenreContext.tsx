import { createContext } from 'react';
import { GenreContextState } from '../common/types/genre';

export const GenreContext = createContext<GenreContextState>(
  {} as GenreContextState
);
