using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EvaluationAPI.Models
{
    public class Intern
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
