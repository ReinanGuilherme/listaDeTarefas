using BackEnd_API_CSharp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace BackEnd_API_CSharp.Context
{
    //DbContext herda a classe do EntityFramworkCore
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {

        }

        //Mapeando a entidade no banco de dados
        //DbSet pegando referencia TaskToDo da Model
        public DbSet<TaskToDo> TasksToDo { get; set; }

        //configurando a conexão
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", false, true)
                .Build();

            optionsBuilder.UseSqlServer(configuration.GetConnectionString("ServerConnection"));
        }
    }
}
