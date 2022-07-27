using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CrudWebAPI.Model;

namespace CrudWebAPI.Data
{
    public class CrudWebAPIContext : DbContext
    {
        public CrudWebAPIContext (DbContextOptions<CrudWebAPIContext> options)
            : base(options)
        {
        }

        public DbSet<CrudWebAPI.Model.Product> Product { get; set; } = default!;
    }
}
