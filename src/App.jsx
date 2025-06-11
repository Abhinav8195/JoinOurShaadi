import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import WeddingPage from './pages/WeddingPage';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import ConatctUs from './pages/ConatctUs';
import NotFound from './pages/NotFound';
import MarriageDetails from './pages/MarriageDetails';

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.refresh(); 
  }, [location]);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weddings" element={<WeddingPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<ConatctUs />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/*" element={<NotFound />} />
          <Route path="/details" element={<MarriageDetails/>}/>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
