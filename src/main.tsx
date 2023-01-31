import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ArtistProvider } from './providers/ArtistProvider';
import { GenreProvider } from './providers/GenreProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ArtistProvider>
      <GenreProvider>
        <App />
      </GenreProvider>
    </ArtistProvider>
  </BrowserRouter>
);
