using Backend.Data;
using Backend.Models;

namespace Backend.Services
{
    public class CommentService : Service, IService<Comment>
    {
        public CommentService(BlogReactDbContext context) : base(context) { }

        public dynamic Create(Comment comment)
        {
            if (!_context.Posts.Any(p => p.PostId == comment.PostId))
                return new { status = false, message = $"The post with id {comment.PostId} does not exist", comment };

            if (!_context.Users.Any(u => u.UserId == comment.UserId))
                return new { status = false, message = $"The user with id {comment.UserId} does not exist", comment };

            if (string.IsNullOrEmpty(comment.Content.Trim()))
                return new { status = false, message = $"The comment has to have any content", comment };

            _context.Comments.Add(comment);
            _context.SaveChanges();

            return new { status = true, message = "Ok", comment };
        }

        public dynamic Delete(int id)
        {
            var comment = _context.Comments.Where(c=> c.CommentId == id).FirstOrDefault();
            bool status = comment != null;

            if(status)
            {
                _context.Comments.Remove(comment);
                _context.SaveChanges();
            }

            return new { status };
        }

        public dynamic GetAll()
        {
            var comments = _context.Comments.ToList();
            return new { comments };
        }

        public dynamic GetById(int id)
        {
            var comment = _context.Comments.Where(c=> c.CommentId == id).FirstOrDefault();
            return new { status = comment != null, comment };
        }

        public dynamic Update(int id, Comment comment)
        {
            var _comment = _context.Comments.Where(c=> c.CommentId == id).FirstOrDefault();
            bool status = _comment != null;

            if (status && !string.IsNullOrEmpty(comment.Content.Trim()))
            {
                _comment.Content = comment.Content;
                _comment.UpdatedAt = DateTime.Now;
                _context.Comments.Update(_comment);
                _context.SaveChanges();
            }

            return new { status, comment };
        }
    }

}