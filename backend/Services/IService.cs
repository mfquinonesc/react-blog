namespace Backend.Services
{
    public interface IService<T> where T : class
    {
        dynamic Create(T entity);
        dynamic Update(int id, T entity);
        dynamic GetById(int id);
        dynamic Delete(int id);
        dynamic GetAll();
    }
}