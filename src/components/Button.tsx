import clsx from 'clsx';
import { ButtonProps } from '../common/types/component';

export function Button({ variant, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'px-3 py-2 outline-none  hover:-translate-y-[2px] font-medium text-white w-full transition-all duration-200',
        { 'bg-teal-500 active:bg-teal-600/90': variant === 'primary' },
        { 'bg-red-500 active:bg-red-600/90': variant === 'danger' }
      )}
    />
  );
}
