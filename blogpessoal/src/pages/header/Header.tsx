import { } from './Header.css'

function header() {
   return (
         <header>
            <nav id="nav-flex">
               <div id='div-flex'>
                  <a id="nome-blog" href="">BlogPessoal</a>
                  <form id='form-flex' action="#">
                     <input id="nav-busca" type="text" />
                     <button type='submit'><img src="src\assets\icons8-pesquisar-64.svg" alt="" /></button>
                  </form>
               </div>
               <ul id='nav-list'>
                  <li className="nav-links"><a href="#">Home</a></li>
                  <li className="nav-links"><a href="#">Posts</a></li>
               </ul>
            </nav>
         </header>
   )
}

export default header