using BackEnd_API_CSharp.Context;
using BackEnd_API_CSharp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BackEnd_API_CSharp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksToDo: ControllerBase
    {
        //buscando contexto
        private readonly AppDbContext _appDbContext;

        //construtor
        public TasksToDo(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        ///<summary>
        ///Buscando todas as tarefas registradas.
        /// </summary>
        /// <returns></returns>

        [HttpGet]
        public async Task<IActionResult> GetTaks()
        {
            return Ok(new
            {
                    success = true,
                    data = await _appDbContext.TasksToDo.ToListAsync()
            });
        }

        /// <summary>
        /// Criando uma nova tarefa.
        /// </summary>
        /// <param name="taskToDo"></param>
        /// <returns></returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///     {
        ///        "status": false,
        ///        "date": "17/06/2022",
        ///        "task": "Aprender C# e ficar rico"
        ///     }
        ///
        /// </remarks>
        [HttpPost]
        public async Task<IActionResult> CreateTask(TaskToDo taskToDo)
        {
            _appDbContext.TasksToDo.Add(taskToDo);
            await _appDbContext.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                data = taskToDo
            });
        }

        /// <summary>
        /// Mudando o status da tarefa de true para false ou false para true.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> PutTaskToDo(int? id)
        {
            //caso não receba nenhum Id retorna um erro
            if (id == null)
            {
                return Ok(new
                {
                    success = false,
                    msg = "Nenhum Id passado por parametro, adicione um ID"
                });
            }

            var evento = await _appDbContext.TasksToDo.SingleOrDefaultAsync(t => t.Id == id);

            //caso não encontre um objeto pelo Id retorna um erro
            if (evento == null)
            {
                return Ok(new
                {
                    success = false,
                    msg = "ID para Tarefa não existe"
                });
            }

            //atualizar o status da tarefa
            if(evento.Status == false)
            {
                evento.Status = true;
            } else
            {
                evento.Status = false;
            }

            await _appDbContext.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                data = evento
            });


        }

        /// <summary>
        /// Excluindo uma tarefa.
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> DeleteTask(int? id)
        {
            //caso não receba nenhum Id retorna um erro
            if(id == null)
            {
                return Ok(new
                {   
                    success = false,
                    msg = "Nenhum Id passado por parametro, adicione um ID"
                });
            }

            var evento = await _appDbContext.TasksToDo.SingleOrDefaultAsync(t => t.Id == id);

            //caso não encontre um objeto pelo Id retorna um erro
            if (evento == null)
            {
                return Ok(new
                {
                    success = false,
                    msg = "ID para Tarefa não existe"
                });
            }

            //deletando a tarefa
            _appDbContext.TasksToDo.Remove(evento);
            await _appDbContext.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                data = evento
            });
        }
    }
}
