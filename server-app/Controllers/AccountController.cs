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
    public class AccountController : ControllerBase
    {
        public AccountController(IAccountService accountService) {
            _accountService = accountService;
        }

        [Route("accounts")]
        [HttpGet]
        public IActionResult GetAllUsersAccounts()
        {
            return Ok(_accountService.ListUserAccounts());
        }

        private readonly IAccountService _accountService;
    }
}
