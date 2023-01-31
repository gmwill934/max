import clsx from 'clsx';
import { RefAttributes } from 'react';
import { Link, LinkProps } from 'react-router-dom';

export function CustomLink({
  highlight,
  ...props
}: LinkProps & RefAttributes<HTMLAnchorElement> & { highlight?: boolean }) {
  return (
    <Link
      {...props}
      className={clsx(
        'px-3 py-1 hover:bg-gray-200 transition-all duration-300 cursor-pointer',
        {
          'hover:underline underline-offset-2 decoration transition-all duration-300 decoration-teal-500 font-medium text-base':
            highlight,
        }
      )}
    />
  );
}
