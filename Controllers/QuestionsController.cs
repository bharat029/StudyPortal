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

        [HttpPost("[action]")]
        public Object Create([FromBody] QuestionsModel model) 
        {
            if(ModelState.IsValid)
            {
                var questions = _questionsServices.Create(new Questions() {
                    Question = model.Question,
                    OptionA = model.OptionA,
                    OptionB = model.OptionB,
                    OptionC = model.OptionC,
                    OptionD = model.OptionD,
                    CorrectOption = model.CorrectOption
                });
                return questions;
            }
            List<CustomError> ErrorList = new List<CustomError>();

            foreach (var key in ModelState.Keys)
            {   
                ErrorList.Add(new CustomError() {code = key, description = ModelState[key].Errors[0].ErrorMessage});
            }

            return ErrorList;
        }
    }
}