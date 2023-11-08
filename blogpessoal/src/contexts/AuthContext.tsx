import { createContext, ReactNode, useState } from "react";

import UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";
import { toastAlerta } from "../utils/toastAlerta";

/* A context é como um armazenamento interno, em memória, da aplicação que guarda
   informações importantes que possam ser compartilhadas entre vários componentes
   como por exemplo o token, daí não precisamos fazer várias rquisições para acessar os
   demais endpoints da aplicação.
      Note que esse contexto existe enquanto a aplicação estiver rodando !! É em memória
   então assim que a aplicação fechar tudo se vai. */
interface AuthContextProps {
   usuario: UsuarioLogin
   handleLogout(): void
   handleLogin(usuario: UsuarioLogin): Promise<void>
   isLoading: boolean
}

/* Aqui ele está informando que os elementos que o Provedor vai envolver tem de ser um elemento
renderizável do react. */
interface AuthProviderProps {
   children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)
/* Aqui criamos um contexto com essa função do react e guardamos ele na variável
AuthContext. Lembra do banco de dados ?? Estamos criando um objeto para ser armazenado
na variável, e aqui estamos apenas informando a estrutura desse objeto. A AuthContextProps
contém as propriedades que queremos e quando informamos {} as dizemos que querenos que
guarde as informações seguindo essa estrutura.
   Ele precisa de um objeto de inicialização, é o nosso {}, e no caso falamos que queremos que
guarde nesses moldes, nos que criamos, as AuthContextProps.
   IMPORTANTE: Aqui estamos definindo o MODELO dos dados a serem guardados e não o que 
será acessado propriamente.  */

export function AuthProvider({ children }: AuthProviderProps) {

   /* Essa função é o nosso distribuidor das informações que estão dentro do context que criamos,
   lembrando que a context é só para ARMAZENAR dados. 
      Porque children ?? Se formos no nosso App.tsx veremos que o nosso Provedor está ennvolvendo todos os nossos componentes, 
      então o children serve para informar que os componentes envolvidos tem de ser componentes
      do react para passar a informação. */

   const [usuario, setUsuario] = useState<UsuarioLogin>({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: ""
   })
   /* Aqui estamos definindo as informações que serão manipuladas criando uma variável de
   estado do tipo UsuarioLogin. */

   const [isLoading, setIsLoading] = useState(false)
   /* Aqui a mesma coisa. Quando essa variável login mudar ela triga o handle login para tratar 
   os erros ou não.*/

   async function handleLogin(userLogin: UsuarioLogin) {
      setIsLoading(true)
      try {
         await login(`/usuarios/logar`, userLogin, setUsuario)
         toastAlerta("Usuário logado com sucesso", "sucesso")
         setIsLoading(false)

      } catch (error) {
         console.log(error)
         toastAlerta("Dados do usuário inconsistentes", "erro")
         setIsLoading(false)
      }
   }
   /* Aqui ele pega o estado do login e se alguma ação estiver sendo executada ele espera 
   para receber a resposta. Usamos o trycatch para tratar os erros, se logar tudo certo mensagem
   deu bom, se der errado explicitamos que os dados são inconsistentes. */

   function handleLogout() {
      setUsuario({
         id: 0,
         nome: "",
         usuario: "",
         senha: "",
         foto: "",
         token: ""
      })
   }
   /* Como estamos usando um state ele infoma que a variável login deve estar zerada pois o
   estado do login mudou, a pessoa não está mais logada e não pode mais fazer requisições 
   ao backend. */

   return (
      <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
         {children}
      </AuthContext.Provider>
   )
}