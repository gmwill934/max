import { useLocation } from 'react-router-dom';
import { CustomLink } from './CustomLink';

export function Header() {
  const { pathname } = useLocation();

  return (
    <header className='border-b bg-gray-100 p-4 shadow'>
      <nav className='w-10/12 sm:w-11/12 mx-auto flex justify-end'>
        <CustomLink to={pathname === '/list' ? '/' : '/list'}>
          {pathname === '/list' ? 'Home' : 'View my list'}
        </CustomLink>
      </nav>
    </header>
  );
}
