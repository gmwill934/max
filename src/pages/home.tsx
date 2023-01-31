import { ArtistsView } from '../views/artists';
import { SearchView } from '../views/search';

export default function HomePage() {
  return (
    <>
      <SearchView />
      <ArtistsView />
    </>
  );
}
