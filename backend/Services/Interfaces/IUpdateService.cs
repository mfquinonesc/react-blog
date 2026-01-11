namespace Backend.Services.Interfaces
{
    public interface IUpdateService<T> where T : class
    {
        dynamic Update(int id, T entity);
    }
}
