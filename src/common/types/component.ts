import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { Artist } from './artist';

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { variant: Variant };

export type Variant = 'danger' | 'primary';

export type FullArtistCardProps = {
  artist: Artist;
};
