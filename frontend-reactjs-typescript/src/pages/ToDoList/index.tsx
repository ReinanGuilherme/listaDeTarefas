import { useEffect, useRef, useState } from "react"

//conexão com o banco de dados
import api from "../../services/api"

//estilos
import { Container, ContainerInputCreateTask, ContainerTableTask } from "./styles"

//icons
import {MdAdd, MdRemoveCircleOutline} from "react-icons/md"

//interface
import { propsTask } from "./interface"

export function ToDoList() {

    //armazenando a lista de tarefas
    const [toDoList, setToDoList] = useState([])
    //armazenando a data digitada no input
    const [taskDate, setTaskDate] = useState("")
    //armazenando a tarefa digitada no input
    const [task, setTask] = useState("")

    //variavel criada para armazenas as referencias dos inputs
    const refInputDate = useRef<HTMLInputElement | any>(null)
    const refInputTask = useRef<HTMLInputElement | any>(null)

    //renderizando a tela com as tarefas armazenadas no banco.
    //toda vez que o state do toDoList for alterado a função é chamada e gera uma nova renderização
    useEffect(() => {        
        getTaskToDo()
    }, [toDoList])

    //buscando no banco de dados todas as tarefas que foram criadas.
    function getTaskToDo() {
        api.get('/TasksToDo').then((res) => {
            setToDoList(res.data.data)
        })
    }

    //função com metodo post responsavel de incluir uma nova tarefa ao banco de dados.
    function postTaskToDo() {
        const taskData = {
            status: false,
            date: taskDate,
            task: task
        }        
        
        //chamando função que vai injetar os dados do banco no state (toDoList) e renderizar os componentes
        getTaskToDo()
        
        //criando uma nova tarefa e enviando para salvar no banco de dados
        api.post('/TasksToDo', taskData).then()
        
        //limpando os inputs
        refInputDate.current.value = ""
        refInputTask.current.value = ""
    }

    //função com metodo put responsavel de alterar o status da tarefa de true para false ou false para true
    function putTaskToDo(e: any, id: any){
        api.put(`/TasksToDo?id=${id}`)
    }

    //função com metodo delete responsavel de excluir uma tarefa.
    function deleteTaskToDo(id: any) {
        api.delete(`/TasksToDo?id=${id}`)
    }

    function formatSetTaskDate(event: any){
        let formatDate = event.currentTarget.value.split('-')
        let format = `${formatDate[2]}/${formatDate[1]}/${formatDate[0]}`

        setTaskDate(format)
    }

    return (
        <Container>

            {/*responsavel por criar as tarefas*/}
            <ContainerInputCreateTask>
                <button onClick={postTaskToDo}><MdAdd/></button>
                <input ref={refInputDate} onChange={(event) => formatSetTaskDate(event)} className="inputDate" type="date" placeholder="Data Prazo da Tarefa"/>
                <input ref={refInputTask} onChange={(event) => setTask(event.currentTarget.value)} className="inputTask" type="text" placeholder="Defina uma Tarefa"/>
            </ContainerInputCreateTask>

            <ContainerTableTask>
                <table>
                    <caption>LISTA DE TAREFAS</caption>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Id.</th>
                            <th>Prazo</th>
                            <th>Tarefa</th>
                            <th>Deletar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* retornando a lista de tarefas salvas no banco. */}
                        {toDoList.map((task: propsTask, index) => {
                            return (
                                <tr key={index}>
                                    {/* caso o task esteja com status true, então retorna um checkbox com checked, senão o checked em branco */}
                                    <td>
                                        <button className="buttonCheckBox" onClick={(e) => putTaskToDo(e, task.id)}>{task.status ? 
                                            <input  type="checkbox" name={task.id} id={task.id} defaultChecked/> : <input type="checkbox" name="" id={task.id}/>}
                                        </button>
                                    </td>
                                    <td>{task.id}</td>
                                    <td>{task.date}</td>
                                    <td>{task.task}</td>
                                    <td><button className="removeTask" onClick={() => deleteTaskToDo(task.id)}><MdRemoveCircleOutline/></button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </ContainerTableTask>

        </Container>
    )
}