using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace StudyPortal.Models
{
    public class Questions
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Question { get; set; }

        public string ExamName { get; set; }

        public string OptionA { get; set; }

        public string OptionB { get; set; }

        public string OptionC { get; set; }

        public string OptionD { get; set; }

        public string OptionE { get; set; }

        public int CorrectOption { get; set; }
    }
}