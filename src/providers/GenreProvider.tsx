import { useReducer } from 'react';
import {
  GenreActionType,
  GenreProviderProps,
  GenreState,
} from '../common/types/genre';
import { GenreContext } from '../context/GenreContext';

const initialState = {
  error: undefined,
  data: undefined,
  isLoading: true,
  selectedGenre: undefined,
};

function reducer(
  state: GenreState = initialState,
  action: GenreActionType
): GenreState {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true };
    case 'FETCH_GENRES_SUCCESS':
      return { ...state, isLoading: false, data: action.payload };
    case 'ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'SET_GENRE':
      return { ...state, selectedGenre: action.payload };
    default:
      return state;
  }
}

export function GenreProvider({ children }: GenreProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GenreContext.Provider
      value={{
        genres: state.data,
        isLoading: state.isLoading,
        error: state.error,
        dispatch,
        selectedGenre: state.selectedGenre,
      }}
    >
      {children}
    </GenreContext.Provider>
  );
}
