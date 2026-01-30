using Eszi.Demo.Database.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Eszi.Demo.Database
{
    public class CoreDbContext(DbContextOptions<CoreDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
