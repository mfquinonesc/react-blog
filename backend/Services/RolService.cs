using Backend.Data;
using Backend.Models;
using Backend.Services.Interfaces;

namespace Backend.Services
{
    public class RolService : Service, ICrudService<Rol>
    {
        public RolService(BlogReactDbContext context) : base(context) { }

        public dynamic Create(Rol entity)
        {
            throw new NotImplementedException();
        }

        public dynamic Delete(int id)
        {
            throw new NotImplementedException();
        }

        public dynamic GetAll()
        {
            List<Rol> rols = _context.Rols.ToList();
            return new { rols };
        }

        public dynamic GetById(int id)
        {
            var rol = _context.Rols.Where(r => r.RolId == id).FirstOrDefault();
            return new { status = rol != null, rol };
        }

        public dynamic Update(int id, Rol entity)
        {
            throw new NotImplementedException();
        }
    }
}