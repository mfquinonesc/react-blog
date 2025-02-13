using backend.Data;

namespace backend.Services
{
    public class Service
    {
        protected readonly BlogReactDbContext _context;
        public Service(BlogReactDbContext c)
        {
            this._context = c;
        }
        
    }
}

