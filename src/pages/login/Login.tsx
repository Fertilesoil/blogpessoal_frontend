import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import UsuarioLogin from '../../models/UsuarioLogin';
import './Login.css';
import { At, Key } from '@phosphor-icons/react';
import { treadmill } from 'ldrs'
treadmill.register('l-treadmill')

function Login() {

   const navigate = useNavigate();
   const { usuario, handleLogin, isLoading } = useContext(AuthContext);

   const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
      {} as UsuarioLogin
   );

   function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
      setUsuarioLogin({
         ...usuarioLogin,
         [e.target.name]: e.target.value
      })
   }

   function login(e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault()
      handleLogin(usuarioLogin)
   }

   useEffect(() => {
      if (usuario.token !== "") {
         navigate('/home')
      }
   }, [usuario])

   return (

      <section className='bg-section w-[100%] h-[100%] flex justify-center items-center'>
         <main className='w-[100vw] h-[80%] flex justify-center items-center'>

            <div className="w-[100vw] h-[100%] min-h-[50vh] bg-img flex justify-center items-center rounded-[2.5rem] border-none shadow-xl">
               <div className="bg-forms w-[28.3rem] h-[95%] backdrop-blur-[15px] rounded-[2.5rem]">
                  <form onSubmit={login} className='w-[100%] h-[100%] flex flex-col justify-center items-center gap-10'>

                     <h1 className='text-[5em] text-[#bb3e53] font-extrabold font-[Comfortaa]'>Login</h1>

                     <div className='flex w-[90%] h-[9%] items-center justify-center '>
                        <label htmlFor="usuario"></label>
                        <input className='font bg-forms text-[0.9rem] cursor-pointer border-none outline-none opacity-80 rounded-[3rem] p-3 w-[100%] h-[100%]  placeholder:text-black placeholder:font-[300] placeholder:indent-1.5 focus:opacity-100 focus:p-4 focus:duration-200 focus:font-[400] shadow-md'
                           type="text"
                           id="usuario"
                           name="usuario"
                           placeholder='Insira seu E-mail'
                           value={usuarioLogin.usuario}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
                        <i className='bg-forms cursor-pointer p-2 bg-transparent absolute right-10 border-none outline-none rounded-[3rem] '><At size={32} weight="thin" /></i></div>

                     <div className='flex w-[90%] h-[9%] items-center justify-center'>
                        <label htmlFor="senha"></label>
                        <input className='font bg-forms text-[0.9rem] cursor-pointer border-none outline-none opacity-80 rounded-[3rem] p-3 w-[100%] h-[100%] placeholder:text-black placeholder:font-[300] placeholder:indent-1.5 focus:opacity-100 focus:p-4 focus:duration-200 focus:font-[400] shadow-md'
                           type="password"
                           id="senha"
                           name="senha"
                           placeholder='Insira sua Senha'
                           value={usuarioLogin.senha}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
                        <i className='bg-forms cursor-pointer p-2 bg-transparent absolute right-10 border-none outline-none rounded-[3rem] '><Key size={32} weight="thin" /></i></div>

                     <button type='submit'
                        className='flex justify-center items-center w-[50%] h-[8%] rounded-[2.5rem] bg-[#f16d41] font-[300] text-[1.3rem] shadow-md hover:h-[8.5%] hover:w-[51%] duration-200 ease-in-out focus:w-[50%] focus:h-[8%]'>
                        {isLoading ? <l-treadmill
                           color={'#f5f5f5'}
                           size={40}
                           speed={0.9}
                        /> :
                           <span>Entrar</span>}
                     </button>

                     <h5 className='font-[700] text-[0.8rem]'>Ainda não tem uma conta ? <Link to='/cadastro' className='text-[#692c46] font-[700]'>Registre-se aqui.</Link></h5>

                  </form>
               </div>
            </div>
         </main>
      </section>

      // <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
      //    <form className="flex justify-center items-center flex-col w-1/2 gap-4"
      //       onSubmit={login}>
      //       <h2 className="text-slate-900 text-5xl ">Entrar</h2>
      //       <div className="flex flex-col w-full">
      //          <label htmlFor="usuario">Usuário</label>
      //          <input
      //             type="text"
      //             id="usuario"
      //             name="usuario"
      //             placeholder="Usuario"
      //             className="border-2 border-slate-700 rounded p-2"
      //             value={usuarioLogin.usuario}
      //             onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
      //          />
      //       </div>
      //       <div className="flex flex-col w-full">
      //          <label htmlFor="senha">Senha</label>
      //          <input
      //             type="password"
      //             id="senha"
      //             name="senha"
      //             placeholder="Senha"
      //             className="border-2 border-slate-700 rounded p-2"
      //             value={usuarioLogin.senha}
      //             onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
      //          />
      //       </div>

      //       <button
      //          type='submit'
      //          className="rounded bg-indigo-400 flex justify-center
      //                               hover:bg-indigo-900 text-white w-1/2 py-2">
      //          {isLoading ? <RotatingLines
      //             strokeColor="white"
      //             strokeWidth="5"
      //             animationDuration="0.75"
      //             width="24"
      //             visible={true}
      //          /> :
      //             <span>Entrar</span>}
      //       </button>

      //       <hr className="border-slate-800 w-full" />

      //       <p>
      //          Ainda não tem uma conta?{' '}
      //          <Link to="/cadastro" className="text-indigo-800 hover:underline">
      //             Cadastre-se
      //          </Link>
      //       </p>
      //    </form>
      //    <div className="fundoLogin hidden lg:block"></div>
      // </div>
   );
}


export default Login;