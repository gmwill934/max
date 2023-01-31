import { useEffect } from 'react';
import { ArtistCard } from '../components/ArtistCard';
import { CustomLink } from '../components/CustomLink';
import { Loading } from '../components/Loading';
import { useArtistContext } from '../hooks';
import { getArtists } from '../utils/ls';

export function ListView() {
  const { dispatch, isLoading, favorites } = useArtistContext();
  const _artists = getArtists();
  useEffect(() => {
    dispatch({ type: 'LOADING' });
    dispatch({ type: 'SET_FAVORITES', payload: _artists });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='space-y-5'>
      <div className='grid grid-cols-12'>
        <div className='col-span-12 lg:col-span-4'>
          <CustomLink to='/'>Back to Search</CustomLink>
        </div>
      </div>

      <div className='grid grid-cols-12'>
        <div className='lg:col-start-4 grid gap-4 lg:col-end-10 col-span-12'>
          {favorites?.length ? (
            favorites?.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))
          ) : (
            <p className='text-center text-base'>No Artists in list</p>
          )}
        </div>
      </div>
    </div>
  );
}
