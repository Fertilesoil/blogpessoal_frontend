import { } from './Home.css'

function Home() {
   return (
      <main>
         <section id="sc-01">
            <div>
               <h1>Olá, meu nome é Fernando! <br />
                  Desenvolvedor FullStack</h1>
               <p>Lorem ipsum dolor sit amet. Et sint velit et quibusdam magni ex velit
                  accusamus eum debitis galisum
                  non facere voluptatem ad voluptate optio. Cum sunt totam aut dolores dolores qui quisquam eligendi
                  eos unde consectetur aut tempora voluptates.</p>
            </div>
            <img src="" alt="Minha Carinha" />
         </section>

         <div className="w-screen flex justify-center">
            <div>
               <div className="max-w-7xl flex flex-col items-center">
                  <h2>Seja Bem Vinde!</h2>
                  <p>Expresse aqui seus pensamentos e opniões</p>
               </div>

               <div className="max-w-7xl flex flex-col items-center">
                  <img
                     src="https://i.imgur.com/VpwApCU.png"
                     alt="Imagem da Página Home"
                     width="400px"
                  />
               </div>
            </div>
         </div>
      </main>
   )
}

export default Home