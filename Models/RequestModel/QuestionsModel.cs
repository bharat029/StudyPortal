using System.ComponentModel.DataAnnotations;

namespace StudyPortal.Models.RequestModel
{
    public class QuestionsModel
    {
        [Required]
        public string Question { get; set; }

        [Required]
        public string ExamName { get; set; }

        [Required]
        public string OptionA { get; set; }

        [Required]
        public string OptionB { get; set; }

        [Required]
        public string OptionC { get; set; }

        public string OptionD { get; set; }

        public string OptionE { get; set; }

        [Required]
        [Range(minimum: 0, maximum: 4)]
        public int CorrectOption { get; set; }
    }
}