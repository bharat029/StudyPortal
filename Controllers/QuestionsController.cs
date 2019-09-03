using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using StudyPortal.Services;
using StudyPortal.Models;
using StudyPortal.Models.RequestModel;
using StudyPortal.Models.ResponseModel;

namespace StudyPortal.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class QuestionsController : Controller
    {
        private readonly QuestionsServices _questionsServices;

        public QuestionsController(QuestionsServices questionsServices)
        {
            _questionsServices = questionsServices;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] string name)
        {
            List<Questions> questions;

            if(name == null)
                questions = _questionsServices.Get();
            else
                questions = _questionsServices.Get(name);
            
            return Ok(questions);
        }

        [HttpGet("[action]")]
        public IActionResult Exams() => Ok(_questionsServices.Exams());

        [HttpPost]
        public IActionResult Create([FromBody] List<QuestionsModel> model) 
        {
            if(ModelState.IsValid)
            {
                List<Questions> questions = new List<Questions>();

                foreach (var question in model)
                {
                    questions.Add(new Questions {
                        Question = question.Question,
                        ExamName = question.ExamName,
                        OptionA = question.OptionA,
                        OptionB = question.OptionB,
                        OptionC = question.OptionC,
                        OptionD = question.OptionD,
                        CorrectOption = question.CorrectOption
                    });
                }
                return Ok(questions);
            }
            
            List<CustomError> ErrorList = new List<CustomError>();

            foreach (var key in ModelState.Keys)
                ErrorList.Add(new CustomError() {code = key, description = ModelState[key].Errors[0].ErrorMessage});

            return BadRequest(ErrorList);
        }
    }
}