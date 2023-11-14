function CardGrid() {


   return (
      <>
         <div className="grid justify-center">
            <div className="
                     grid
                     grid-cols-[1fr_2fr] 
                     gap-5 
                     bg-slate-200 
                     mx-7 
                     my-7 
                     px-5  
                     py-5 
                     max-w-4xl 
                     rounded-2xl 
                     border 
                     shadow-md 
                     shadow-slate-400
               ">
               <div>
                  <img className="max-w-xs" src="https://i.imgur.com/hmFwxCL.jpg" alt="Imagem" />
               </div>
               <div>
                  <h2 className="
                           text-center 
                           text-4xl 
                           py-4 
                           font-bold
                        ">Card - Grid Layout</h2>
                  <p className="
                           text-justify 
                           text-xl 
                           py-4
                        ">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, ducimus molestiae dolores aperiam quisquam atque. Velit magni vel eum amet, tenetur saepe aperiam illo quibusdam corrupti facere dolorum aspernatur vero.</p>
               </div>
            </div>
         </div>
      </>
   )
}

export default CardGrid