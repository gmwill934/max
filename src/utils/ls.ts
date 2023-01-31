import { Artist } from '../common/types/artist';

export function getArtists() {
  let artists: unknown = localStorage.getItem('artists');
  artists = JSON.parse(artists as string);

  if (!artists) {
    artists = [];
  }

  return artists as Artist[];
}

export function mergeArtists(data: Artist[]) {
  const savedArtists = getArtists();
  return data.map((artist) => {
    const match = savedArtists.find(
      (savedArtist) => artist.id === savedArtist.id
    );
    if (match) {
      // @ts-ignore
      artist.is_saved = true;
    } else {
      artist.is_saved = false;
    }
    return artist;
  });
}

function set(artists: Artist[]) {
  return localStorage.setItem('artists', JSON.stringify(artists));
}

export function saveArtist(artist: Artist) {
  const artists = getArtists();
  artists.unshift({ ...artist, is_saved: true });
  set(artists);
  return artist;
}

export function updateArtist(artist: Artist) {
  if (artist.is_saved) {
    deleteArtist(artist.id);
  } else {
    saveArtist(artist);
  }
}

export function deleteArtist(id: number) {
  const artists = getArtists();
  set(artists.filter((artist) => artist.id !== id));
  return artists;
}

export function getArtist(id: number) {
  const artists = getArtists();
  const artist = artists.find((artist) => artist.id === id);
  return artist;
}
