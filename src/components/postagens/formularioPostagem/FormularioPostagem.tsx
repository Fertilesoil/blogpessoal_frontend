import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { toastAlerta } from '../../../utils/toastAlerta';
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { AuthContext } from '../../../contexts/AuthContext';
import Tema from '../../../models/Tema';
import Postagem from '../../../models/Postagem';

import { leapfrog } from 'ldrs'
leapfrog.register('l-leapfrog')

function FormularioPostagem() {

    const navigate = useNavigate();
    //     A pessoa vai escolher quando mudar de página, e isso pode ser feito de forma direta clicando
    // em botões, mas quando uma ação é concluída e precisa voltar para algum lugar podemos redirecionar
    // a pessoa de forma indiret usando o useNavigate passando para ele onde deve ir  

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [temas, setTemas] = useState<Tema[]>([])

    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '', })

    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPostagemPorId(id: string) {
        await buscar(`/postagens/${id}`, setPostagem, {
            headers: {
                Authorization: token,
            },
        })
    } /* Depois do nosso await sempre chamamos uma função, essas funções estão sempre na
    nossa service, no caso a service buscar, onde passamos os parâmetros pedidos na service */

    async function buscarTemaPorId(id: string) {
        await buscar(`/temas/${id}`, setTema, {
            headers: {
                Authorization: token,
            },
        })
    }

    async function buscarTemas() {
        await buscar('/temas', setTemas, {
            headers: {
                Authorization: token,
            },
        })
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', "erro");
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarTemas()

        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id]) /* Esse carinha aqui verifica se o valor do id que está presente na url tem uma informação
    válida, caso tiver significa que é uma edição, então esse hook vai disparar para buscar as infos
    dessa postagem e carregar para ser editado */

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        })
    }, [tema])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/postagens');
    }

    async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id != undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });

                toastAlerta('Postagem atualizada com sucesso', "sucesso")

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', "erro")
                    handleLogout()
                } else {
                    toastAlerta('Erro ao atualizar a Postagem', "info")
                }
            }

        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                })

                toastAlerta('Postagem cadastrada com sucesso', "sucesso");

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', "erro")
                    handleLogout()
                } else {
                    toastAlerta('Erro ao cadastrar a Postagem', "info");
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoTema = tema.descricao === '';

    return (



        <div className="flex items-center justify-center w-[100%] h-[21.5rem] rounded-[1.25rem] bg-[#f2b99e]">

            <div className="bg w-[21%] h-[100%] rounded-l-[1.25rem]"></div>

            <div className="flex flex-col items-center justify-between w-[79.5%] h-[95%] rounded-r-[1.25rem]">
                <h1 className='text-[#bb3e53] text-[2.5rem] font'>{id !== undefined ? 'Editar Sua Postagem' : 'Nova Postagem'}</h1>


                <label htmlFor="titulo"></label>
                <input type="text"
                    className="text font-[600] max-h-[8rem] w-[90%] inline-block resize-none text-slate-800 placeholder:text-slate-800 bg-[#f2b99e70] border-[0.2rem] border-[#8a5551d0] rounded-[1.25rem] outline-none font-[Comfortaa] p-2 indent-2 leading-5 text-[0.9rem] bg-opacity-30"
                    placeholder="Título da postagem"
                    value={postagem.titulo}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    name="titulo"
                    required />

                <label htmlFor="titulo"></label>
                <textarea className="text font-[600] min-h-[8rem] w-[90%] inline-block resize-none text-slate-800 placeholder:text-slate-800 bg-[#f2b99e70] border-[0.2rem] border-[#8a5551d0] rounded-[1.25rem] outline-none font-[Comfortaa] p-2 indent-2 leading-5 text-[0.9rem] bg-opacity-30"
                    placeholder="Derrame seus pensamentos aqui ..."
                    value={postagem.texto}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    type="text"
                    name="texto"
                    required></textarea>

                <button
                    type='submit'
                    disabled={carregandoTema}
                    className='flex justify-center rounded-[1rem] disabled:bg-slate-200 bg-indigo-40 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2'
                >
                    {isLoading ?
                        <l-leapfrog
                            color={'#f5f5f5'}
                            size={40}
                            speed={0.9}
                        /> :
                        <span>Confirmar</span>
                    }
                </button>

            </div>
        </div>

        // <div className="container flex flex-col mx-auto items-center">
        //     <h1 className="text-4xl text-center my-8">
        //         {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
        //     </h1>

        //     <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
        //         <div className="flex flex-col gap-2">
        //             <label htmlFor="titulo">Título da Postagem</label>
        //             <input
        //                 value={postagem.titulo}
        //                 onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
        //                 type="text"
        //                 placeholder="Insira aqui o Título"
        //                 name="titulo"
        //                 required
        //                 className="border-2 border-slate-700 rounded p-2"
        //             />
        //         </div>

        //         <div className="flex flex-col gap-2">
        //             <label htmlFor="titulo">Texto da Postagem</label>

        //             <input
        //                 value={postagem.texto}
        //                 onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
        //                 type="text"
        //                 placeholder="Adicione aqui o Texto da Postagem"
        //                 name="texto"
        //                 required
        //                 className="border-2 border-slate-700 rounded p-2"
        //             />
        //         </div>

        //         <div className="flex flex-col gap-2">
        //             <p>Tema da Postagem</p>
        //             <select name="tema" id="tema" className='border p-2 border-slate-800 rounded'
        //                 onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
        //             >
        //                 <option value="" selected disabled>Selecione um Tema</option>
        //                 {temas.map((tema) => (
        //                         <option key={tema.id} value={tema.id} >{tema.descricao}</option>
        //                 ))}
        //             </select>
        //                 {/* Aqui ele captura o tema que for escolhido dentro do option e já busca ele pelo id,
        //                 lembrando que apenas o tema é exibido mas o id também fica disponível.
        //                     É assim que ele captura e dispara a função que fizemos lá atrás para fazer o relacionamento
        //                 entre postagem e tema  */}
        //         </div>
        //         <button
        //             type='submit'
        //             disabled={carregandoTema}
        //             className='flex justify-center rounded disabled:bg-slate-200 bg-indigo-400 
        //                     hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2'
        //         >
        //             {isLoading ?
        //                 <RotatingLines
        //                     strokeColor="white"
        //                     strokeWidth="5"
        //                     animationDuration="0.75"
        //                     width="24"
        //                     visible={true}
        //                 /> :
        //                 <span>Confirmar</span>
        //             }
        //         </button>
        //     </form>
        // </div>
    )
}

export default FormularioPostagem