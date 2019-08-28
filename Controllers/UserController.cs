using System;
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

        [HttpPost("[action]")]
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
                        UserName = user.UserName
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
                        UserName = user.UserName
                    };
                    return responseData;
                }
                
                return new [] { new CustomError() {code = "LogInFailed", description = "Incorrect User Name or Password"}};
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

        [HttpGet]
        [Authorize]
        public async Task<ApplicationUser> GetUser() => await _userManager.GetUserAsync(User);

        [HttpPost("[action]")]
        [Authorize]
        public async Task<ExamModel> Exams([FromBody] ExamModel model)
        {
            ApplicationUser user = await _userManager.GetUserAsync(User);

            if(user.Exams != null)
            {
                if(user.Exams.Find(exam => exam.Name == model.Name) == null)
                {
                    user.Exams.Add(new Exam() { Name = model.Name, Score = model.Score });
                }
                else 
                {
                    user.Exams.Find(exam => exam.Name == model.Name).Score = model.Score;
                }
            }
            else
            {
                user.Exams = new List<Exam>();
                user.Exams.Add(new Exam() { Name = model.Name, Score = model.Score });
            }
            
            await _userManager.UpdateAsync(user);
            
            return model;
        } 

        [HttpGet("[action]")]
        [Authorize]
        public async Task<IEnumerable<Exam>> Exams()
        {
            ApplicationUser user = await _userManager.GetUserAsync(User);
            return user.Exams;
        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<int> Score([FromQuery] string name)
        {
            ApplicationUser user = await _userManager.GetUserAsync(User);
            
            int score = user.Exams.Find(exam => exam.Name == name).Score;

            return score;
        }
    }
}
