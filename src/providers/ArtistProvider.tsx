import { useReducer } from 'react';
import {
  ArtistActionType,
  ArtistProviderProps,
  ArtistState,
} from '../common/types/artist';
import { ArtistContext } from '../context/ArtistContext';

const initialState = {
  error: undefined,
  isLoading: true,
  data: {
    artists: undefined, // search artists
    artist: undefined, // single page artist
    favorites: undefined, // list artists (saved artists)
    similar: undefined, // similar artists
  },
};

function reducer(state: ArtistState, action: ArtistActionType): ArtistState {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true };
    case 'ERROR': {
      return { ...state, error: action.payload };
    }
    case 'SET_ARTISTS': {
      return {
        ...state,
        isLoading: false,
        data: { ...state.data, artists: action.payload },
      };
    }
    case 'SET_ARTIST': {
      return {
        ...state,
        isLoading: false,
        data: { ...state.data, artist: action.payload },
      };
    }
    case 'SET_FAVORITES': {
      return {
        ...state,
        isLoading: false,
        data: { ...state.data, favorites: [...action.payload] },
      };
    }

    case 'SET_SIMILAR':
      return {
        ...state,
        isLoading: false,
        data: { ...state.data, similar: [...action.payload] },
      };

    case 'UPDATE_ARTIST': {
      return {
        ...state,
        data: {
          ...state.data,
          artists: state.data.artists?.map((artist) =>
            artist.id === action.payload
              ? { ...artist, is_saved: !artist.is_saved }
              : artist
          ),
          similar: state.data.similar?.map((artist) =>
            artist.id === action.payload
              ? { ...artist, is_saved: !artist.is_saved }
              : artist
          ),
          favorites: state.data.favorites?.filter(
            (artist) => artist.id !== action.payload
          ),
          artist: state.data.artist
            ? {
                ...state.data.artist,
                is_saved:
                  state.data.artist.id === action.payload
                    ? !state.data.artist.is_saved
                    : state.data.artist.is_saved,
              }
            : state.data.artist,
        },
      };
    }
    // case 'UPDATE_ARTIST':
    //   return {
    //     ...state,
    //     similar: state.data.similar?.map((artist) =>
    //       artist.id === action.payload
    // ? { ...artist, is_saved: !artist.is_saved }
    // : artist
    //     ),
    //     data: state.data?.map((artist) =>
    //       artist.id === action.payload
    //         ? { ...artist, is_saved: !artist.is_saved }
    //         : artist
    //     ),
    //     favorites: state.favorites?.filter(
    //       (artist) => artist.id !== action.payload
    //     ),
    //     singles: state.favorites?.filter(
    //       (artist) => artist.id !== action.payload
    //     ),
    //     single: state.single
    //       ? {
    //           ...state.single,
    //           is_saved:
    //             state.single.id === action.payload
    //               ? !state.single.is_saved
    //               : state.single.is_saved,
    //         }
    //       : state.single,
    //   };
    default:
      return state;
  }
}

export function ArtistProvider({ children }: ArtistProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ArtistContext.Provider
      value={{
        dispatch,
        error: state.error,
        isLoading: state.isLoading,
        data: {
          artists: state.data.artists,
          favorites: state.data.favorites,
          similar: state.data.similar,
          artist: state.data.artist,
        },
      }}
    >
      {children}
    </ArtistContext.Provider>
  );
}
