import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
// import FAQ from './pages/FAQ';
// import Contact from './pages/Contact';
// import Login from './pages/Login';
// import Weddings from './pages/Weddings';

function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/weddings" element={<Weddings />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
