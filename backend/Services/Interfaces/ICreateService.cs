namespace Backend.Services.Interfaces
{
    public interface ICreateService<T> where T : class
    {
        dynamic Create(T entity);
    }
}
