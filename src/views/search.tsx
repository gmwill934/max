import { useEffect, useState } from 'react';
import { useArtistContext, useGenre } from '../hooks';
import { useCombobox } from 'downshift';
import clsx from 'clsx';
import { axiosClient } from '../utils';
import { genreFilter } from '../utils/genre-filter';
import { ArtistsResponse } from '../common/types/axios';
import { mergeArtists } from '../utils/ls';

export function SearchView() {
  const { dispatch: genreDispatch, genres, isLoading } = useGenre();
  const { dispatch: artistDispatch } = useArtistContext();
  const [items, setItems] = useState(genres ?? []);

  useEffect(() => {
    axiosClient
      .get('/genres')
      .then(({ data }) => {
        genreDispatch({ type: 'FETCH_GENRES_SUCCESS', payload: data.data });
      })
      .catch((err) =>
        genreDispatch({
          type: 'ERROR',
          payload: err.message || 'Error 500',
        })
      );
  }, []);

  const {
    getLabelProps,
    highlightedIndex,
    selectedItem,
    getItemProps,
    getMenuProps,
    getInputProps,
    isOpen,
  } = useCombobox({
    items: items ?? [],
    itemToString(item) {
      return item ? item.name : '';
    },
    onSelectedItemChange({ selectedItem }) {
      genreDispatch({ type: 'SET_GENRE', payload: selectedItem ?? undefined });
      artistDispatch({ type: 'LOADING' });
      // Fetch artists based on a genre
      axiosClient
        .get<ArtistsResponse>(`/genres/${selectedItem?.id}/artists`)
        .then(({ data }) => {
          const _data = mergeArtists(data.data);
          artistDispatch({ type: 'SET_ARTISTS', payload: _data });
        })
        .catch((err) => {
          artistDispatch({
            type: 'ERROR',
            payload: err.message || 'Error 500',
          });
        });
    },
    onInputValueChange({ inputValue }) {
      setItems((genres ?? []).filter(genreFilter(inputValue ?? '')));
    },
  });

  return (
    <div className='grid grid-cols-12 '>
      <form className='relative col-span-12 md:col-span-4'>
        <div className='flex flex-col gap-1'>
          <label {...getLabelProps()} htmlFor='genre'>
            Type a genre to search artists {isLoading && '...'}
          </label>
          <div className='relative'>
            <input
              disabled={isLoading}
              {...getInputProps()}
              type='text'
              id='genre'
              placeholder='Type to search...'
              name='genre'
              className='px-4 py-3 outline-none shadow border  w-full disabled:cursor-not-allowed'
            />
          </div>
        </div>
        <ul
          {...getMenuProps()}
          className={clsx(
            'absolute inset-x-0 max-h-80 overflow-scroll bg-white',
            { border: isOpen }
          )}
        >
          {isOpen && (
            <>
              {items.map((item, index) => {
                return (
                  <li
                    className={clsx(
                      highlightedIndex === index && 'bg-gray-200',
                      selectedItem === item && 'font-bold',
                      'py-2 px-2 flex flex-col cursor-pointer text-sm'
                    )}
                    key={`${item.id}${index}`}
                    {...getItemProps({ item, index })}
                  >
                    <span>{item.name}</span>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </form>
    </div>
  );
}
