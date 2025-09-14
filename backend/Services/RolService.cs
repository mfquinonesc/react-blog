using Backend.Data;
using Backend.Models;

namespace Backend.Services
{
    public class RolService : Service
    {
        public RolService(BlogReactDbContext context) : base(context) { }

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
    }
}