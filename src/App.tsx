import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import PlaceDetail from './pages/PlaceDetail';
import Booking from './pages/Booking';

export type Page = 'home' | 'about' | 'gallery' | 'contact' | 'place-detail' | 'booking';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [targetSection, setTargetSection] = useState<string | null>(null);

  const navigate = (p: string, extra?: string) => {
    if (p === 'place-detail' && extra) {
      setSelectedPlaceId(extra);
      setTargetSection(null);
      setPage('place-detail');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    } else if (p === 'home') {
      if (extra) {
        setTargetSection(extra);
      } else {
        setTargetSection(null);
      }
      setPage('home');
      if (!extra) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      }
    } else {
      setTargetSection(null);
      setPage(p as Page);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  };

  const renderPage = () => {
    switch (page) {
      case 'about':
        return <About onNavigate={navigate} />;
      case 'gallery':
        return <Gallery onNavigate={navigate} />;
      case 'contact':
        return <Contact />;
      case 'booking':
        return <Booking onNavigate={navigate} />;
      case 'place-detail':
        return <PlaceDetail placeId={selectedPlaceId} onNavigate={navigate} />;
      default:
        return <Home onNavigate={navigate} scrollToSection={targetSection} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      <Navbar currentPage={page} onNavigate={navigate} />
      <main style={{ flex: 1, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
        {renderPage()}
      </main>
      <Footer onNavigate={navigate} />
      <FloatingActions />
    </div>
  );
}
