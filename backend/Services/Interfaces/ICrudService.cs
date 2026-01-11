namespace Backend.Services.Interfaces
{
    public interface ICrudService<T> :
        ICreateService<T>,
        IReadService,
        IUpdateService<T>,
        IDeleteService
        where T : class
    {
    }
} 
