using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using StudyPortal.Models.Identity;

namespace StudyPortal.Models.RequestModel
{
    public class RegisterModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [Compare("Password", ErrorMessage = "Password and Confirm Password do not match")]
        public string ConfirmPassword { get; set; }
    }
}