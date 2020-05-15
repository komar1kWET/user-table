using System.Collections.Generic;
using Parm.FrontDev2.Infrastructure;
using Parm.FrontDev2.Models;

namespace Parm.FrontDev2.Repositories
{
    public class AccountRepository : Repository<AccountModel>, IAccountRepository
    {
        public AccountRepository(IDataContext context) : base(context)
        {

        }
        public IEnumerable<AccountModel> List()
        {
            return Context.Accounts;
        }
    }
}
