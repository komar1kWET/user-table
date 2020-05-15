
using System.Collections.Generic;
using Parm.FrontDev2.Models;

namespace Parm.FrontDev2.Infrastructure
{
    public interface IUserRepository: IRepository<UserModel>
    {
        IEnumerable<UserModel> List();
        UserModel Get(int id);
        void Add(UserModel user);
        void Remove(UserModel user);
        IEnumerable<UserModel> GetActive();
        UserModel GetByName(string name);

        bool Exists(UserModel user);
        bool ExistsByUsername(string username);
        bool ExistsById(int userId);
    }
}
