using System;
using System.Collections.Generic;
using Parm.FrontDev2.Infrastructure;
using Parm.FrontDev2.Models;

namespace Parm.FrontDev2.Mocks
{
    public class DataContext : IDataContext
    {
        public DataContext()
        {
            Users = new List<UserModel>(_users);
            Accounts = new List<AccountModel>(_accounts);
        }
        public IList<UserModel> Users { get; private set;}
        public IList<AccountModel> Accounts { get; private set;}

        private static readonly UserModel[] _users = {
            new UserModel { Id = 1, Username = "JDoe", Title = "Mr.", FirstName = "John", LastName = "Doe", Email = "jd@wodo.net", IsActive = true, Birthday = new DateTime(1980, 3, 12) },
            new UserModel { Id = 2, Username = "LDoe", Title = "Mrs.", FirstName = "Lucy", LastName = "Doe", Email = "ld@wodo.net", IsActive = true, Birthday = new DateTime(1982, 12, 31) },
            new UserModel { Id = 3, Username = "MDoe", Title = "Mr.", FirstName = "Michael", LastName = "Doe", Email = "md@wodo.net", IsActive = false, Birthday = new DateTime(2005, 1, 1) },
            new UserModel { Id = 4, Username = "EDoe", Title = "Miss", FirstName = "Emilly", LastName = "Doe", Email = "ed@wodo.net", IsActive = true, Birthday = new DateTime(1990, 3, 22) },
            new UserModel { Id = 11, Username = "WDoe", Title = "Mr.", FirstName = "Wane", LastName = "Doe", Email = "wd@wodo.net", IsActive = true, Birthday = new DateTime(1980, 1, 10) },
            new UserModel { Id = 6, Username = "ODoe", Title = "Ms.", FirstName = "Olivia", LastName = "Doe", Email = "od@wodo.net", IsActive = true, Birthday = new DateTime(1980, 3, 1) },
            new UserModel { Id = 7, Username = "JDoe2", Title = null, FirstName = "Joanna", LastName = "Doe", Email = "jd2@wodo.net", IsActive = false, Birthday = new DateTime(1980, 7, 2) },
            new UserModel { Id = 8, Username = "JSm", Title = "Mr.", FirstName = "John", LastName = "Smith", Email = "js@wodo.net", IsActive = true, Birthday = new DateTime(1983, 3, 2) },
            new UserModel { Id = 9, Username = "JLe", Title = "Mr.", FirstName = "John", LastName = "Lennox", Email = "jl@wodo.net", IsActive = true, Birthday = new DateTime(1979, 3, 3) },
            new UserModel { Id = 10, Username = "MAn", Title = "Ms.", FirstName = "Michael", LastName = "Analine", Email = "ma@wodo.net", IsActive = true, Birthday = new DateTime(1975, 9, 17) }
        };

        private static readonly AccountModel[] _accounts = {
            new AccountModel { Id = 1, OwnerId = 1, Balance = 10, Currency = "EUR" },
            new AccountModel { Id = 2, OwnerId = 2, Balance = 250000, Currency = "EUR" },
            new AccountModel { Id = 3, OwnerId = 3, Balance = -500, Currency = "USD" },
            new AccountModel { Id = 4, OwnerId = 4, Balance = -1500000, Currency = "EUR" },
            new AccountModel { Id = 5, OwnerId = 5, Balance = 1500.50M, Currency = "EUR" },
            new AccountModel { Id = 6, OwnerId = 6, Balance = 1500.66M, Currency = "EUR" },
            new AccountModel { Id = 7, OwnerId = 7, Balance = 0.01M, Currency = "PLN" },
            new AccountModel { Id = 8, OwnerId = 8, Balance = 0.001M, Currency = "PLN" },
            new AccountModel { Id = 9, OwnerId = 9, Balance = -9000, Currency = "EUR" },
            new AccountModel { Id = 10, OwnerId = 10, Balance = 0, Currency = "EUR" }
        };
    }
}
