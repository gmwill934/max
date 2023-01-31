import axios from 'axios';
import { Genre } from '../common/types/genre';

axios.defaults.headers.common.Authorization = `apikey ${
  import.meta.env.VITE_API_KEY
}`;

axios.defaults.baseURL = 'https://music.musicaudience.info/api/v1/music';

export const axiosClient = axios;

export async function fetchGenres(): Promise<Genre[]> {
  const { data } = await axiosClient.get('/genres');
  return data.data;
}
