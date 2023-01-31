import { createContext } from 'react';
import { ArtistContextState } from '../common/types/artist';

export const ArtistContext = createContext<ArtistContextState>(
  {} as ArtistContextState
);
