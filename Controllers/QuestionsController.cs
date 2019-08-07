using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using StudyPortal.Services;
using StudyPortal.Models;

namespace StudyPortal.Controllers
{
    [Route("api/[controller]")]
    public class QuestionsController : Controller
    {
        private readonly QuestionsServices _questionsServices;

        public QuestionsController(QuestionsServices questionsServices)
        {
            _questionsServices = questionsServices;
        }

        [HttpGet]
        public IEnumerable<Questions> Init()
        {
            List<Questions> questions = _questionsServices.Get();
            return questions;
        }
    }
}