using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace StudyPortal.Models
{
    public class Post
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Title { get; set; }

        public string Author { get; set; }

        public string Date { get; set; }

        public string Content { get; set; }

        public List<Reply> Replies { get; set; }
    }

    public class Reply
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Author { get; set; }

        public string Date { get; set; }

        public string Content { get; set; }
    }
}