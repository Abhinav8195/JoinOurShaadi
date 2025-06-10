import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';


function App() {

  return (
    <>
        <Header/>
        <Home/>
        <Footer/> 
    </>
  )
}

export default App
