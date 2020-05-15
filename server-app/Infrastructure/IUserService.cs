using System.Collections.Generic;
using Microsoft.AspNetCore.JsonPatch;
using Parm.FrontDev2.Models;

namespace Parm.FrontDev2.Infrastructure
{
    public interface IUserService
    {
        IEnumerable<UserModel> GetAll();
        UserModel GetById(int id);
        UserModel Create(UserModel user);
        UserModel Update(int userId, JsonPatchDocument<UserModel> updateUserPatch);
        void Delete(int id);
        bool IsUsernameUnique(string username);
    }

}
