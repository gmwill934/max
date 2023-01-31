import { FullArtistCardProps } from '../common/types/component';

export function FullArtistCard({ artist }: FullArtistCardProps) {
  return <div className='bg-gray-100 p-4'>{artist?.name}</div>;
}
