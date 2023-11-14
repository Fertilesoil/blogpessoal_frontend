import { } from './Footer.css'

function Footer() {
   return (
      <footer>
            <div id='footer-flex'>
               <div className='footer-row'><hr className='hr-footer'/></div>
               <a className='footer-img-format' href="https://github.com/Fertilesoil" target='_blank'>
                  <img src="src\assets\icons8-github-100.svg" alt="Github link" /></a>
               <a className='footer-img-format' href="https://www.linkedin.com/in/fernandodiascosta-dotnet/" target='_blank'>
                  <img src="src\assets\icons8-linkedin-100.svg" alt="Linkedin link" /></a>
               <div className='footer-row'><hr className='hr-footer'/></div>
            </div>
         </footer>
   )
}

export default Footer