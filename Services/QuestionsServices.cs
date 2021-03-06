using System.Collections.Generic;
using System.Linq;
using StudyPortal.Models;
using MongoDB.Driver;

namespace StudyPortal.Services
{
    public class QuestionsServices
    {
        private readonly IMongoCollection<Questions> _questions;
        
        public QuestionsServices(QuestionsDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _questions = database.GetCollection<Questions>(settings.QuestionsCollectionName);
        }

        public List<Questions> Get() => _questions.Find(question => true).ToList();

        public List<Questions> Get(string name) => _questions.Find(question => question.ExamName == name).ToList();

        public List<Questions> Create(List<Questions> questions)
        {
            _questions.InsertMany(questions);
            return questions;
        }

        public List<string> Exams() => 
            _questions.AsQueryable().Select(question => question.ExamName).Distinct().ToList();

        public void Update(string id, Questions questionsIn) =>
            _questions.ReplaceOne(questions => questions.Id == id, questionsIn);

        public void Remove(Questions questionsIn) =>
            _questions.DeleteOne(questions => questions.Id == questionsIn.Id);

        public void Remove(string id) => 
            _questions.DeleteOne(questions => questions.Id == id);
    }
}