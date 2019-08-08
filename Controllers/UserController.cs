﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;
using Microsoft.Extensions.Configuration;
using StudyPortal.Models.Identity;
using StudyPortal.Models.RequestModel;
using StudyPortal.Models.ResponseModel;
using StudyPortal.Helpers;

namespace StudyPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;

        public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration, ILogger<UserController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _logger = logger;

        }

        [HttpPost]
        public async Task<Object> Register([FromBody] RegisterModel model)
        {
            if(ModelState.IsValid)
            {
                ApplicationUser user = new ApplicationUser { UserName = model.UserName, Email = model.Email };
                var result = await _userManager.CreateAsync(user, model.Password);
                await _userManager.AddToRoleAsync(user, model.Role);
                
                if(result.Succeeded) 
                {
                    await _signInManager.SignInAsync(user, isPersistent: false);
                     var token = AuthenticationHelper.GenerateJwtToken(user, _configuration);

                    var responseData = new LoginModel()
                    {
                        Token = token,
                        UserName = user.UserName,
                        Email = user.Email    
                    };
                    return responseData;
                }
                
                _logger.LogWarning($"User {user.UserName} created!");
                return result.Errors;
            }

            List<CustomError> ErrorList = new List<CustomError>();

            foreach (var key in ModelState.Keys)
            {   
                ErrorList.Add(new CustomError() {code = key, description = ModelState[key].Errors[0].ErrorMessage});
            }

            return ErrorList;
        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<object> LogOut() 
        {
            await _signInManager.SignOutAsync();
            return new {SignOuted = true};
        }

        [HttpPost("[action]")]
        public async Task<Object> LogIn([FromBody] LogInModel model)
        {
            if(ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.UserName, model.Password, model.RememberMe, false);

                if(result.Succeeded) 
                {
                    var user = _userManager.Users.SingleOrDefault(r => r.UserName == model.UserName);
                    var token = AuthenticationHelper.GenerateJwtToken(user, _configuration);

                    var responseData = new LoginModel()
                    {
                        Token = token,
                        UserName = user.UserName,
                        Email = user.Email    
                    };
                    return responseData;
                }
                
                return new CustomError() {code = "LogInFailed", description = "Log In Failed"};
            }

            List<CustomError> ErrorList = new List<CustomError>();

            foreach (var key in ModelState.Keys)
            {   
                ErrorList.Add(new CustomError() {code = key, description = ModelState[key].Errors[0].ErrorMessage});
            }

            return ErrorList;
        }

        [HttpGet("[action]")]
        [Authorize]
        public IEnumerable<ApplicationUser> Users() => _userManager.Users;
    }
}
