using System.ComponentModel.DataAnnotations;

namespace StudyPortal.Models.RequestModel
{
    public class ExamModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [Range(maximum: 100, minimum: 0)]
        public int Score { get; set; }
    }
}