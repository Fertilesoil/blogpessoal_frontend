import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Home2 from './components/home2/Home2';
import Login from './pages/login/Login';
import Footer2 from './components/footer2/Footer2';
import Navbar from './components/navbar/Navbar';
import Cadastro from './pages/cadastro/Cadastro';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className='min-h-[80vh]'>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home2 />} />
            <Route path="/cadastro" element={<Cadastro />} />
          </Routes>
        </div>
        <Footer2 />
      </BrowserRouter>
    </ AuthProvider>
  );
}

export default App;