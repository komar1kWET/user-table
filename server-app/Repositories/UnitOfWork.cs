using System;
using System.Linq;
using Parm.FrontDev2.Infrastructure;

namespace Parm.FrontDev2.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        public UnitOfWork(IDataContext context)
        {
            _context = context;
            AccountRepository = new AccountRepository(_context);
            UserRepository = new UserRepository(_context);
        }

        public IDataContext Context { get { return _context; } }

        public IAccountRepository AccountRepository { get; private set; }
        public IUserRepository UserRepository { get; private set; }


        public int Complete()
        {
            return 0;
        }

        public void Cancel()
        {
        }

        private readonly IDataContext _context;
    }
}
