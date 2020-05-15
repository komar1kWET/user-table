using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.JsonPatch;
using Parm.FrontDev2.Infrastructure;
using Parm.FrontDev2.Models;

namespace Parm.FrontDev2.Services
{
    public class UserService : IUserService
    {
        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public bool IsUsernameUnique(string username)
        {
            if (string.IsNullOrEmpty(username))
                return false;

            return _unitOfWork.UserRepository.GetByName(username) == null;
        }

        public IEnumerable<UserModel> GetAll()
        {
            return _unitOfWork.UserRepository.List();
        }

        public UserModel GetById(int id)
        {
            return _unitOfWork.UserRepository.Get(id);
        }

        public UserModel Create(UserModel user)
        {
            if (_unitOfWork.UserRepository.ExistsByUsername(user.Username))
                throw new InvalidOperationException("Username \"" + user.Username + "\" is already taken");

            _unitOfWork.UserRepository.Add(user);


            _unitOfWork.Complete();

            return user;
        }

        public UserModel Update(int userId, JsonPatchDocument<UserModel> updateUserPatch)
        {
            var user = _unitOfWork.UserRepository.Get(userId);

            if (user == null)
                throw new InvalidOperationException("User not found");

            var oldUsername = user.Username;

            updateUserPatch.ApplyTo(user);

            if (oldUsername != user.Username && _unitOfWork.UserRepository.ExistsByUsername(user.Username))
            {
                // throw error if the new username is already taken
                throw new InvalidOperationException("Username " + user.Username + " is already taken");
            }

            _unitOfWork.Complete();

            return user;
        }

        public void Delete(int id)
        {
            var user = _unitOfWork.UserRepository.Get(id);
            if (user != null)
            {
                _unitOfWork.UserRepository.Remove(user);
                _unitOfWork.Complete();
            }
        }

        private readonly IUnitOfWork _unitOfWork;
    }
}
