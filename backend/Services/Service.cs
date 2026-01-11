using Backend.Data;

namespace Backend.Services
{
    public abstract class Service
    {
        protected readonly BlogReactDbContext _context;
        public Service(BlogReactDbContext c)
        {
            this._context = c;
        }

    }
}

