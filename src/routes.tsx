import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import ArtistPage from './pages/artist';
import HomePage from './pages/home';
import ListPage from './pages/list';

export function ApplicationRoutes() {
  return (
    <Routes>
      <Route element={<Layout />} path='/'>
        <Route index element={<HomePage />} />
        <Route path='/artist/:artistId' element={<ArtistPage />} />
        <Route path='/list' element={<ListPage />} />
      </Route>
    </Routes>
  );
}
