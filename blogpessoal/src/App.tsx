import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Footer from './pages/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import Home2 from './components/home2/Home2'

function App() {

  return (
    <>
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
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App
