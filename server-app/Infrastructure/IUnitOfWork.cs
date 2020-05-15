namespace Parm.FrontDev2.Infrastructure
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IAccountRepository AccountRepository { get; }

        int Complete();
        void Cancel();
    }
}
