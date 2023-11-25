import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toastAlerta } from '../../utils/toastAlerta'
import { cadastrarUsuario } from '../../services/Service'
import UsuarioLogin from '../../models/UsuarioLogin'
import './Cadastro.css'
import { At, IdentificationCard, Key, Image } from '@phosphor-icons/react'
import { treadmill } from 'ldrs'
treadmill.register('l-treadmill')

function Cadastro() {
   const navigate = useNavigate()

   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [confirmaSenha, setConfirmaSenha] = useState<string>("")

   const [usuario, setUsuario] = useState<UsuarioLogin>({
      id: 0,
      nome: '',
      usuario: '',
      senha: '',
      foto: '',
      token: ""
   })

   useEffect(() => {
      if (usuario.id !== 0) {
         retornar()
      }
   }, [usuario])

   function retornar() {
      navigate('/login')
   }

   function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
      setConfirmaSenha(e.target.value)
   }

   function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
      setUsuario({
         ...usuario,
         [e.target.name]: e.target.value
      })
   }

   async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
      e.preventDefault()

      if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
         setIsLoading(true)

         try {
            await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
            toastAlerta('Usuário cadastrado com sucesso', "sucesso")

         } catch (error) {
            toastAlerta('Erro ao cadastrar o Usuário', "erro")
         }

      } else {
         toastAlerta('Erro ao cadastrar o Usuário', "erro")
         setUsuario({ ...usuario, senha: "" })
         setConfirmaSenha("")
      }

      setIsLoading(false)
   }

   return (

      <section className='w-[100%] h-[100vh] flex justify-center items-center'>

         <div className="caixa-encolhida-2 flex items-center w-[60rem] h-[85%] rounded-[2.5rem] border-none shadow-xl">
            {/* <div className="img-lateral bg-img-2 w-[25rem] h-[100%] min-h-[80vh] rounded-l-[2.5rem] border-none outline-none"> </div> */}

            <div className="bg-forms-2 img-forms bg w-[100%] h-[100%] min-h-[80vh] flex flex-col justify-center rounded-[2.5rem] border-none outline-none">

               <div className="rounded-[2.5rem] border-none outline-none">
                  <h1 className='text-[3em] text-center text-[#bb3e53] font-extrabold'>Cadastre-se</h1>
               </div>

               <form className='flex flex-col justify-center items-center gap-6 rounded-[2.5rem] border-none outline-none ml-8' onSubmit={cadastrarNovoUsuario}>

                  <div className='w-[100%] h-[23%]  flex items-center justify-center'>
                     <label htmlFor="nome"></label>
                     <input className='font bg-forms-2 text-[0.9rem] cursor-pointer border-none outline-none opacity-90 rounded-[3rem] p-3 w-[100%] h-[100%] placeholder:text-black placeholder:font-[300] placeholder:indent-1.5 focus:opacity-100 focus:p-4 focus:duration-200 focus:font-[400] shadow-md'
                        placeholder='Insira seu nome'
                        type="text"
                        id="nome"
                        name="nome"
                        value={usuario.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
                     <i className='bg-forms-2 cursor-pointer p-2 bg-transparent relative right-12 border-none outline-none rounded-[3rem]'><IdentificationCard size={30} weight="thin" /></i>
                  </div>

                  <div className='w-[100%] h-[23%]  flex items-center justify-center'>
                     <label htmlFor="usuario"></label>
                     <input className='font bg-forms-2 text-[0.9rem] cursor-pointer border-none outline-none opacity-90 rounded-[3rem] p-3 w-[100%] h-[100%] placeholder:text-black placeholder:font-[300] placeholder:indent-1.5 focus:opacity-100 focus:p-4 focus:duration-200 focus:font-[400] shadow-md'
                        placeholder='Insira seu E-mail'
                        type="text"
                        id="usuario"
                        name="usuario"
                        value={usuario.usuario}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
                     <i className='bg-forms-2 cursor-pointer p-2 bg-transparent relative right-12 border-none outline-none rounded-[3rem]'><At size={30} weight="thin" /></i>
                  </div>

                  <div className='w-[100%] h-[23%]  flex items-center justify-center'>
                     <label htmlFor="foto"></label>
                     <input className='font bg-forms-2 text-[0.9rem] cursor-pointer border-none outline-none opacity-90 rounded-[3rem] p-3 w-[100%] h-[100%] placeholder:text-black placeholder:font-[300] placeholder:indent-1.5 focus:opacity-100 focus:p-4 focus:duration-200 focus:font-[400] shadow-md'
                        placeholder='Insira o link da foto'
                        type="text"
                        id="foto"
                        name="foto"
                        value={usuario.foto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
                     <i className='bg-forms-2 cursor-pointer p-2 bg-transparent relative right-12 border-none outline-none rounded-[3rem]'><Image size={30} weight="thin" /></i>
                  </div>

                  <div className='w-[100%] h-[23%]  flex items-center justify-center'>
                     <label htmlFor="senha"></label>
                     <input className='font bg-forms-2 text-[0.9rem] cursor-pointer border-none outline-none opacity-90 rounded-[3rem] p-3 w-[100%] h-[100%] placeholder:text-black placeholder:font-[300] placeholder:indent-1.5 focus:opacity-100 focus:p-4 focus:duration-200 focus:font-[400] shadow-md'
                        placeholder='Insira sua senha'
                        type="password"
                        id="senha"
                        name="senha"
                        value={usuario.senha}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
                     <i className='bg-forms cursor-pointer p-2 bg-transparent relative right-12 border-none outline-none rounded-[3rem]'><Key size={30} weight="thin" /></i>
                  </div>

                  <div className='w-[100%] h-[23%]  flex items-center justify-center'>
                     <label htmlFor="confirmarSenha"></label>
                     <input className='font bg-forms-2 text-[0.9rem] cursor-pointer border-none outline-none opacity-90 rounded-[3rem] p-3 w-[100%] h-[100%] placeholder:text-black placeholder:font-[300] placeholder:indent-1.5 focus:opacity-100 focus:p-4 focus:duration-200 focus:font-[400] shadow-md'
                        placeholder='Confirme sua senha'
                        type="password"
                        id="confirmarSenha"
                        name="confirmarSenha"
                        value={confirmaSenha}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)} />
                     <i className='bg-forms cursor-pointer p-2 bg-transparent relative right-12 border-none outline-none rounded-[3rem]'><Key size={30} weight="thin" /></i>
                  </div>

                  <div className="flex justify-evenly items-center w-[90%]">
                     <button type='submit' className='btn flex justify-center items-center fonte w-[25%] h-[80%] rounded-[2.5rem] bg-[#f16d41] font-[300] text-[1.1rem] shadow-md hover:h-[73%] hover:w-[27%] duration-300 ease-in-out focus:w-[23%] focus:h-[68%]'>
                        {isLoading ? <l-treadmill
                           color={'#f5f5f5'}
                           size={40}
                           speed={0.9}
                        /> :
                           <span className='flex items-center p-3'>Cadastrar</span>}
                     </button>

                     <button onClick={retornar} className='btn flex justify-center items-center fonte w-[25%] h-[80%] rounded-[2.5rem] bg-[#f16d41] font-[300] text-[1.1rem] shadow-md hover:h-[73%] hover:w-[27%] duration-300 ease-in-out focus:w-[23%] focus:h-[68%]'>
                        <span className='flex items-center p-3'>Cancelar</span>
                     </button>
                  </div>
               </form>



            </div>

         </div>

      </section>

      // <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
      //    <div className="fundoCadastro hidden lg:block"></div>
      //    <form
      //       className='flex justify-center items-center flex-col w-2/3 gap-3'
      //       onSubmit={cadastrarNovoUsuario}>
      //       <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
      //       <div className="flex flex-col w-full">
      //          <label htmlFor="nome">Nome</label>
      //          <input
      //             type="text"
      //             id="nome"
      //             name="nome"
      //             placeholder="Nome"
      //             className="border-2 border-slate-700 rounded p-2"
      //             value={usuario.nome}
      //             onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
      //          />

      //       </div>
      //       <div className="flex flex-col w-full">
      //          <label htmlFor="usuario">Usuario</label>
      //          <input
      //             type="text"
      //             id="usuario"
      //             name="usuario"
      //             placeholder="Usuario"
      //             className="border-2 border-slate-700 rounded p-2"
      //             value={usuario.usuario}
      //             onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
      //          />

      //       </div>
      //       <div className="flex flex-col w-full">
      //          <label htmlFor="foto">Foto</label>
      //          <input
      //             type="text"
      //             id="foto"
      //             name="foto"
      //             placeholder="Foto"
      //             className="border-2 border-slate-700 rounded p-2"
      //             value={usuario.foto}
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
      //             value={usuario.senha}
      //             onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
      //          />

      //       </div>
      //       <div className="flex flex-col w-full">
      //          <label htmlFor="confirmarSenha">Confirmar Senha</label>
      //          <input
      //             type="password"
      //             id="confirmarSenha"
      //             name="confirmarSenha"
      //             placeholder="Confirmar Senha"
      //             className="border-2 border-slate-700 rounded p-2"
      //             value={confirmaSenha}
      //             onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
      //          />

      //       </div>

      //       <div className="flex justify-around w-full gap-8">
      //          <button
      //             className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2'
      //             onClick={retornar}>
      //             Cancelar
      //          </button>
      //          <button
      //             className='rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 
      //                                        py-2 flex justify-center'
      //             type='submit'>
      //             {isLoading ? <RotatingLines
      //                strokeColor="white"
      //                strokeWidth="5"
      //                animationDuration="0.75"
      //                width="24"
      //                visible={true}
      //             /> :
      //                <span>Cadastrar</span>}
      //          </button>
      //       </div>
      //    </form>
      // </div>
   )
}

export default Cadastro