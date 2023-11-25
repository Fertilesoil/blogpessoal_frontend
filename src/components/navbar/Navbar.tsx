import { ReactNode, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toastAlerta } from '../../utils/toastAlerta'

import { AuthContext } from '../../contexts/AuthContext'

function Navbar() {

   const navigate = useNavigate()
   const { usuario, handleLogout } = useContext(AuthContext)

   function logout() {
      handleLogout()
      toastAlerta('Usuário deslogado com sucesso', "sucesso")
      navigate('/login')
   }

   let component: ReactNode

   if (usuario.token !== "") {

      component = (
         <div className='w-full bg-[#F2B99E] text-[#9C9669] flex justify-center items-center h-10'>
            <nav className=" container flex justify-between items-center text-[1rem]">
               <Link to='/home' className='text-2xl font-bold'>Blog Pessoal</Link>

               <div className='flex items-center gap-4'>
                  <Link to='/postagens'>Postagens</Link>
                  <Link to='/temas'>Temas</Link>
                  <Link to='/cadastroTema'>Cadastrar Tema</Link>
                  <Link to='/perfil'>Perfil</Link>
                  <Link to='' onClick={logout}>Sair</Link>
               </div>

            </nav>
         </div>
      )

   }

   return (
      <>
         {component}
      </>
   )
}

export default Navbar