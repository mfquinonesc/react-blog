using System.Text.RegularExpressions;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Backend.Utilities;

namespace Backend.Services
{
    public class UserService : Service, IService<UserDto>
    {
        private readonly JwtService _service;
        private readonly ImageService _imageService;

        public UserService(JwtService service, ImageService imageService, BlogReactDbContext context) : base(context)
        {
            _service = service;
            _imageService = imageService;
        }

        public dynamic Create(UserDto dto)
        {
            if (_context.Users.Any(u => u.Email == dto.Email))
                return new { status = false, message = $"The email {dto.Email} is already registered", dto };

            if (dto.Birthday.AddYears(18) >= DateTime.Today)
                return new { status = false, message = "The birthday date has to be at least 18 years ago", dto };

            if (string.IsNullOrEmpty(dto.Password) || string.IsNullOrEmpty(dto.Lastname) || string.IsNullOrEmpty(dto.Name))
                return new { status = false, message = "All these fields are required: password, name and lastname", dto };

            if (!_context.Rols.Any(r => r.RolId == dto.RolId))
                return new { status = false, message = $"The rol {dto.RolId} is not valid", dto };

            if (dto.Password.Length < 8 || !Regex.IsMatch(dto.Password, @"[A-Za-z]") || !Regex.IsMatch(dto.Password, @"\d"))
                return new { status = false, message = "The password must have at least one letter, one number and 8 characters", dto };

            if (dto.Password.Contains(' '))
                return new { status = false, message = "The password can not contain white spaces", dto };

            dto.Password = Hasher.HashPassword(dto.Password);
            User user = MapperHelper.Map<UserDto, User>(dto);

            _context.Users.Add(user);
            _context.SaveChanges();

            if (dto.ImageFile != null)
                _imageService.SaveImage(dto.ImageFile, 0, user.UserId);

            user.Password = "";

            return new { status = true, message = "Your account has been created", user };
        }

        public dynamic Login(LoginDto login)
        {
            int attemps = 3;

            var user = _context.Users.Where(u => u.Email == login.Email).FirstOrDefault();

            if (user == null)
                return new { status = false, message = $"The email {login.Email} is incorret" };

            if (user.Attempts >= attemps)
                return new { status = false, message = $"Your account has been banned due to multiple failed attempts" };

            if (Hasher.VerifyPassword(login.Password, user.Password))
            {
                user.Attempts = 0;
                user.LastAccess = DateTime.Now;

                _context.Users.Update(user);
                _context.SaveChanges();

                //user.UserId = 0;
                user.Password = "";
                string token = _service.GenerateToken(user.Email, user.UserId);

                return new { status = true, message = "Ok", user, token };
            }

            user.Attempts++;
            _context.Users.Update(user);
            _context.SaveChanges();

            return new { status = false, message = $"The password is incorret, you have {attemps - user.Attempts} attempts left before your account gets banned" };
        }

        public dynamic Update(int id, UserDto dto)
        {
            var user = _context.Users.Where(u => u.UserId == id || u.Email == dto.Email).FirstOrDefault();

            bool status = user != null;
            string message = status ? "The user data has been updated" : $"The user with id {id} does not exist";

            if (status)
            {
                user.Birthday = dto.Birthday != null && dto.Birthday.AddYears(18) < DateTime.Now ? dto.Birthday : user.Birthday;
                user.Lastname = !string.IsNullOrEmpty(dto.Lastname) ? dto.Lastname : user.Lastname;
                user.Name = !string.IsNullOrEmpty(dto.Name) ? dto.Name : user.Name;
                user.UpdatedAt = DateTime.Now;

                _context.Users.Update(user);
                _context.SaveChanges();

                if (dto.ImageFile != null)
                    _imageService.SaveImage(dto.ImageFile, 0, user.UserId);

                user.Password = "";
            }

            return new { status, message, user };
        }

        public dynamic Delete(int id)
        {
            var user = _context.Users.Where(u => u.UserId == id).FirstOrDefault();
            bool status = user != null;
            string message = $"The user with id {id} was " + (status ? "deleted" : "not found");

            if (status)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }

            return new { status, message };
        }

        public dynamic GetById(int id)
        {
            var user = _context.Users.Where(u => u.UserId == id).FirstOrDefault();
            bool status = user != null;
            string message = status ? "The user was found" : "The user does not exist";

            if (status)
                user.Password = "";

            return new { status, message, user };
        }

        public dynamic GetAll()
        {
            List<User> users = _context.Users.ToList();
            users.ForEach(u => { u.Password = ""; });

            return new { users };
        }

        public dynamic Demo()
        {
            var user = _context.Users.Where(u => u.UserId == 1).FirstOrDefault();
            bool status = user != null;

            if (status)
            {
                user.Attempts = 0;
                user.LastAccess = DateTime.Now;               

                string password = Guid.NewGuid().ToString("N");
                user.Password = Hasher.HashPassword(password);
                
                _context.Users.Update(user);
                _context.SaveChanges();

                //user.UserId = 0;
                user.Password = "";
                string token = _service.GenerateToken(user.Email, user.UserId);

                return new { status = true, message = "Ok", user, token };
            }

            return new { status, message = "There is no available user for demos" };
        }
    }   
}