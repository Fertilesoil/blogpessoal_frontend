function CardFlex() {

   return (
      <>
         <div className="flex justify-center">
            <div className="
                     flex 
                     flex-row 
                     items-center 
                     bg-slate-200 
                     mx-7 
                     my-7 
                     px-4 
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
               <div className="px-4">
                  <h2 className="
                           text-center 
                           text-4xl 
                           py-4 
                           font-bold
                        ">Card - Flex Layout</h2>
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

export default CardFlex