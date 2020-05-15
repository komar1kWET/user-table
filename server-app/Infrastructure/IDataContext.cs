using System.Collections.Generic;
using Parm.FrontDev2.Models;

namespace Parm.FrontDev2.Infrastructure
{
    public interface IDataContext
    {
        IList<UserModel> Users { get; }
        IList<AccountModel> Accounts { get; }
    }
}
