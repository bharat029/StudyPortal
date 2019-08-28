using AspNetCore.Identity.Mongo.Model;
using System.Collections.Generic;

namespace StudyPortal.Models.Identity
{
    public class ApplicationUser : MongoUser
    {
        
        public List<Exam> Exams { get; set; }
    }
}