using System.Collections.Generic;
using Parm.FrontDev2.Infrastructure;
using Parm.FrontDev2.Models;

namespace Parm.FrontDev2.Services
{
    public class AccountService : IAccountService
    {
        public AccountService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IEnumerable<AccountModel> ListUserAccounts()
        {
            return _unitOfWork.AccountRepository.List();
        }

        private readonly IUnitOfWork _unitOfWork;
    }
}
