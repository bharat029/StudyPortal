using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using StudyPortal.Models.Identity;
using StudyPortal.Models.RequestModel;

namespace StudyPortal.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger _logger;

        public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ILogger<UserController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
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
                    _logger.LogInformation($"User {user.UserName} created!");
                    return new {RegisteredAndSignIned = _signInManager.CanSignInAsync(user).Result};
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
            _logger.LogInformation("User Signed Out!");
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
                    _logger.LogInformation($"{model.UserName} Signed In!");
                    return new {SignIned = true};
                }
                
                _logger.LogInformation($"{model.UserName} Sign In Falied!");
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
        public IEnumerable<ApplicationUser> Users() 
        {
            return _userManager.Users;
        } 
    }

    public class CustomError 
    {
        public string code { get; set; }
        public string description { get; set; }
    } 
}
