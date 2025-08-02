using Backend.Data;
using Backend.Models;


namespace Backend.Services
{
    public class LikeService : Service
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
      
    }
}