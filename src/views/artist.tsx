import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArtistCard } from '../components/ArtistCard';
import { CustomLink } from '../components/CustomLink';
import { Loading } from '../components/Loading';
import { useArtistContext } from '../hooks';
import { axiosClient } from '../utils';
import { getArtist, mergeArtists } from '../utils/ls';

export function ArtistView() {
  const { dispatch, artist, isLoading, similar } = useArtistContext();
  const { artistId } = useParams();
  const _artist = getArtist(+(artistId as string));

  useEffect(() => {
    (async () => {
      dispatch({ type: 'LOADING' });
      const { data: artists } = await axiosClient.get(`/artists/${artistId}`);
      const { data: similar } = await axiosClient.get(
        `/artists/${artistId}/similar`
      );
      dispatch({
        type: 'SET_ARTIST',
        payload: _artist || artists.data[0],
      });

      const _data = mergeArtists(similar.data);
      dispatch({ type: 'SET_SIMILAR', payload: _data });
    })();
  }, [artistId]);

  if (isLoading) {
    return <Loading />;
  }

  const _similar = similar?.filter((a) => a.id !== +(artistId as string));
  return (
    <>
      <div className='grid grid-cols-12'>
        <div className='col-span-12 lg:col-span-4'>
          <CustomLink to='/'>Back to Search</CustomLink>
        </div>
      </div>

      <div className='grid grid-cols-12 '>
        <div className='lg:col-start-4 col-start-1 col-end-13 text-center lg:col-end-10 '>
          {artist && <ArtistCard artist={artist} showExtraInformation />}
        </div>
      </div>
      <div className='grid grid-cols-12 '>
        <div className='lg:col-start-4 col-start-1 col-end-13 lg:col-end-10'>
          <h2 className='text-center text-lg'>Similar Artists</h2>
          <div className='grid grid-cols-1 gap-4 mt-4'>
            {_similar?.length ? (
              _similar?.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))
            ) : (
              <p className='text-gray-600 text-center'>
                No similar artists where found
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
