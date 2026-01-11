using Backend.Data;
using Backend.Models;
using Backend.Services.Interfaces;


namespace Backend.Services
{
    public class LikeService : Service, ICreateService<Like>, IReadService, IDeleteService
    {
        public LikeService(BlogReactDbContext context) : base(context) { }

        public dynamic Create(Like like)
        {
            bool status = !_context.Likes.Any(l => l.UserId == like.UserId && l.PostId == like.PostId)
            && _context.Users.Any(u => u.UserId == like.UserId)
            && _context.Posts.Any(p => p.PostId == like.PostId && p.UserId != like.UserId);

            if (status)
            {
                _context.Likes.Add(like);
                _context.SaveChanges();
            }

            return new { status };
        }

        public dynamic Delete(int id)
        {
            var like = _context.Likes.Where(l => l.LikeId == id).FirstOrDefault();
            bool status = like != null;

            if (status)
            {
                _context.Likes.Remove(like);
                _context.SaveChanges();
            }

            return new { status };
        }

        public dynamic GetAll()
        {
            List<Like> likes = _context.Likes.ToList();
            return new { likes };
        }

        public dynamic GetById(int id)
        {
            var like = _context.Likes.Where(l => l.LikeId == id).FirstOrDefault();
            return new { status = like != null, like };
        }
    }
}