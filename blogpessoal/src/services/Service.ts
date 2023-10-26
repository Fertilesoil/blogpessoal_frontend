import axios from "axios";

const api = axios.create({
   baseURL: 'https://blogpessoal-gjfe.onrender.com/'
})

export const login = async (url: string, dados: Object, setDados: Function) => {
   const resposta = await api.post(url, dados)
   setDados(resposta.data)
}

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
   const resposta = await api.post(url, dados)
   setDados(resposta.data)
} /* Essa service serve para mandar os dados para o back e trabalhar os dados recebidos.
   url e dados: estes são os que vão enviar os dados para o back na rota certa (url) e os dados 
   corretos de acordo com a model criada aqui (dados: Object).
      api.post se refere ao método que deverá ser executado e, logo após, seus respectivos dados
   para serem validados.
      O setDados pega dentro do objeto resposta os dados que serão retornados mas só os que
   interessam, no nosso caso o token que está dentro de data. Data faz parte dos elementos 
   retornados dentro do objeto resposta. A função setDados armazena esses dados.*/

