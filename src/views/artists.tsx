import { ArtistCard } from '../components/ArtistCard';
import { Loading } from '../components/Loading';
import { useArtistContext, useGenre } from '../hooks';

export function ArtistsView() {
  const { selectedGenre, isLoading } = useGenre();
  const { artists, isLoading: isLoadingArtists } = useArtistContext();

  if (isLoading || isLoadingArtists) {
    return <Loading />;
  }

  return (
    <>
      <div className='grid grid-cols-12'>
        <div className='col-start-4 text-center col-end-10'>
          <p className='text-lg text-gray-800'>{selectedGenre?.name}</p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {artists?.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </>
  );
}
