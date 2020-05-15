using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Parm.FrontDev2.Infrastructure;
using Parm.FrontDev2.Models;

namespace Parm.FrontDev2.Controllers
{
    [ApiController]
    [Route("api")]
    public class UsersController : ControllerBase
    {
        public UsersController(IUserService userService) {
            _userService = userService;
        }

        [Route("users")]
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_userService.GetAll());
        }

        [Route("users/{username}/uniqueness")]
        [HttpGet]
        public IActionResult IsUsernameUnique(string username)
        {
            return Ok(_userService.IsUsernameUnique(username));
        }

        [Route("users/{userId:int}")]
        [HttpGet]
        public IActionResult GetUser(int userId)
        {
            return Ok(_userService.GetById(userId));
        }

        [Route("users")]
        [HttpPost]
        public IActionResult Create([FromBody] UserModel user)
        {
            return Ok(_userService.Create(user));
        }

        [Route("users/{userId:int}")]
        [HttpPatch]
        public IActionResult Update(int userId, [FromBody] JsonPatchDocument<UserModel> updateUserPatch)
        {
            return Ok(_userService.Update(userId, updateUserPatch));
        }

        private readonly IUserService _userService;
    }
}
