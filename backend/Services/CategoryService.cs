using backend.Data;
using backend.Models;

namespace backend.Services
{
    public class CategoryService : Service, IService<Category>
    {
        public CategoryService(BlogReactDbContext context) : base(context) { }

        public dynamic Create(Category category)
        {
            if (string.IsNullOrEmpty(category.Name) || string.IsNullOrEmpty(category.Description))
                return new { status = false, message = $"The name and the description can not be empty", category };

            if (_context.Categories.Any(c => c.Name == category.Name.ToUpper().Trim()))
                return new { status = false, message = $"The name of the category {category.Name} already exists", category };

            category.Name = category.Name.ToUpper().Trim();
            _context.Categories.Add(category);
            _context.SaveChanges();

            return new { status = true, message = "Ok", category };
        }

        public dynamic Delete(int id)
        {
            var _category = _context.Categories.Where(c => c.CategoryId == id).FirstOrDefault();
            bool status = _category != null;

            if (status && _context.PostCategories.Any(pc => pc.CategoryId == id))
                return new { status = false, message = $"It can not be deleted because there are posts with this category ${_category.Name}" };

            _context.Categories.Remove(_category);
            _context.SaveChanges();

            return new { status, message = "Ok" };
        }

        public dynamic GetAll()
        {
            List<Category> categories = _context.Categories.ToList();
            return new { categories };
        }

        public dynamic GetById(int id)
        {
            var category = _context.Categories.Where(c => c.CategoryId == id).FirstOrDefault();
            return new { status = category != null, category };
        }

        public dynamic Update(int id, Category category)
        {
            var _category = _context.Categories.Where(c => c.CategoryId == id).FirstOrDefault();
            bool status = _category != null;

            if (status && !string.IsNullOrEmpty(category.Name) && _context.Categories.Any(c => c.Name == category.Name.ToUpper().Trim()))
                return new { status = false, message = $"There is already a category with this name {category.Name}", category };

            _category.Name = !string.IsNullOrEmpty(category.Name) ? category.Name.ToUpper().Trim() : _category.Name;
            _category.Description = !string.IsNullOrEmpty(category.Description) ? category.Description : _category.Description;

            _context.Categories.Update(_category);
            _context.SaveChanges();

            return new { status, message = "Ok", category = _category };
        }
    }
}