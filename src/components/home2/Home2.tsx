import ListaPostagens from "../../components/postagens/listaPostagens/ListaPostagens"
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem"
import FormularioPostagem from "../postagens/formularioPostagem/FormularioPostagem"
import './home.css'

function Home() {
   return (
      <main className="flex flex-col items-center">

         <section className="relative mt-4 w-[90vw] flex items-center h-[23rem] border-dashed border-[0.2rem] rounded-[1.25rem] border-[#f16d41] px-2">

         <FormularioPostagem />

         </section>

         {/* <div className="bg-indigo-900 flex justify-center">
            <div className='container grid grid-cols-2 text-white'>
               <div className="flex flex-col gap-4 items-center justify-center py-4">
                  <h2 className='text-5xl font-bold'>
                     Seja Bem Vinde!
                  </h2>
                  <p className='text-xl'>
                     Expresse aqui seus pensamentos e opniões
                  </p>

                  <div className="flex justify-around gap-4">
                     <div className="flex justify-around gap-4">
                        
                     </div>
                  </div>
               </div>

               <div className="flex justify-center ">
                  <img
                     src="https://i.imgur.com/fyfri1v.png"
                     alt="Imagem Página Home"
                     className='w-2/3'
                  />
               </div>
            </div>
         </div> */}

         {/* <ModalPostagem /> */}
         <ListaPostagens />


      </main>
   )
}

export default Home