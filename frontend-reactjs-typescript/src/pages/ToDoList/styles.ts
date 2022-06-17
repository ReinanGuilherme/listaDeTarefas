import styled from 'styled-components'

export const Container = styled.div`

    background-color: #000;
    max-width: 600px;    
    margin: 100px auto 0 auto;
    padding: 25px;
    border-radius: 15px;
`

//estilizando container responsavel por adicionar as novas tarefas.
export const ContainerInputCreateTask = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 25px;

    button {
        color: var(--colorTextWhite);
        background-color: var(--colorBackground2);

        margin-right: 10px;
        border-radius: 5px;
        cursor: pointer;

        svg {
            font-size: 20px;
        }
    }

    //estilizando inputs
    input {
        height: 25px;
        border-radius: 5px;
        border: none;
        padding: 7px;

        &.inputDate {
            width: 150px;
            margin-right: 10px;
        }

        &.inputTask {
            width: 300px;
        }
    }

    


`

export const ContainerTableTask = styled.div`

    table {
        margin: auto;
        text-align: center;

        caption {
            padding: 15px;
            margin-bottom: 20px;
            border-bottom: 1px solid #fff;
        }

        th,td {
            border-right: 10px solid transparent;
        }

        .buttonCheckBox {
            background-color: transparent;
        }
    }

    input[type=checkbox] {
        font-size: 200px;
    }

    button {

        //estilo do botão de excluir tarefa
        &.removeTask {

            color: var(--colorTextWhite);
            background-color: transparent;
            cursor: pointer;

            svg {                
                font-size: 20px;
            }
        }
    }

`