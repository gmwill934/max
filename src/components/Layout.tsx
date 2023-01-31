import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function Layout() {
  return (
    <div className='bg-white flex flex-col gap-10 text-sm'>
      <Header />
      <main className='w-10/12 sm:w-11/12 mx-auto space-y-5 mb-20'>
        <Outlet />
      </main>
    </div>
  );
}
