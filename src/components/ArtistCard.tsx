import { Artist } from '../common/types/artist';
import { useArtistContext } from '../hooks';
import { updateArtist } from '../utils/ls';
import { Button } from './Button';
import { CustomLink } from './CustomLink';

type ArtistCardProps = { artist: Artist; showExtraInformation?: boolean };

export function ArtistCard({
  artist,
  showExtraInformation = false,
}: ArtistCardProps) {
  const { dispatch } = useArtistContext();

  const artistGenres = artist.genres?.filter((g) => !g.is_primary);

  return (
    <>
      <div className='shadow place-items-center grid grid-cols-12 bg-gray-100 p-4'>
        <div className='col-span-2'>
          <img
            src={artist?.image || '/not-available.png'}
            className='object-cover h-32'
          />
        </div>
        <div className='col-span-8 text-center'>
          <CustomLink
            highlight
            to={'/artist/' + artist.id?.toString()}
            className='text-lg font-medium'
          >
            {artist?.name}
          </CustomLink>
          <p className='text-gray-600'>
            {artist.genres?.filter((a) => Boolean(a?.is_primary))[0]?.name ??
              'N/A'}
          </p>
          {showExtraInformation ? (
            <p className='text-gray-600'>
              Popularity Score: <span>{artist.popularity}</span>
            </p>
          ) : null}
        </div>
        <div className='col-span-2'>
          <Button
            variant={artist.is_saved ? 'danger' : 'primary'}
            onClick={() => {
              updateArtist(artist);
              dispatch({ type: 'UPDATE_ARTIST', payload: artist.id });
            }}
          >
            {artist?.is_saved ? 'Remove' : 'Add'}
          </Button>
        </div>
      </div>
      {showExtraInformation && (
        <div className='grid grid-cols-12 bg-gray-100 p-4 mt-4 shadow'>
          <div className='col-span-12 text-left'>
            <p className='text-base'>Additional Genres</p>
            <p className='text-gray-600'>
              {artistGenres.length ? (
                <>{artist.genres.map((g) => g.name).join(', ')}</>
              ) : (
                'None'
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
