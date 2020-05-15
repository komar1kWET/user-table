using System.Collections.Generic;
using System.Linq;
using Parm.FrontDev2.Models;
using Parm.FrontDev2.Infrastructure;

namespace Parm.FrontDev2.Repositories
{
    public class UserRepository: Repository<UserModel>, IUserRepository
    {
        public UserRepository(IDataContext context): base(context)
        {
        }

        public IEnumerable<UserModel> List()
        {
            return Context.Users;
        }

        public UserModel Get(int id)
        {
            return Context.Users.SingleOrDefault(p => p.Id == id);
        }

        public void Add(UserModel user)
        {
            var id = Context.Users.Any() ? Context.Users.Max(p => p.Id) : 0;
            user.Id = ++id;
            Context.Users.Add(user);
        }
        public void Remove(UserModel user)
        {
            Context.Users.Remove(user);
        }

        public IEnumerable<UserModel> GetActive()
        {
            return Context.Users.Where(u => u.IsActive);
        }

        public UserModel GetByName(string name)
        {
            return Context.Users.SingleOrDefault(u => u.Username == name);
        }

        public bool Exists(UserModel user)
        {
            return Context.Users.Any(x => x == user);
        }

        public bool ExistsByUsername(string username)
        {
            return Context.Users.Any(x => x.Username == username);
        }

        public bool ExistsById(int userId)
        {
            return Context.Users.Any(x => x.Id == userId);
        }
    }
}
