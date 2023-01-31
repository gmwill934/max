import { Genre } from '../common/types/genre';

export function genreFilter(inputValue: string) {
  return function genreFilter(genre: Genre) {
    return !inputValue || genre.name.toLowerCase().includes(inputValue);
  };
}
