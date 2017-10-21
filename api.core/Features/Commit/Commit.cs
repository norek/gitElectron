using System;

namespace api.core.Features.Commit
{
    public class Commit
    {
        public DateTime Date { get; set; }
        public string Name { get; set; }
        public string Sha { get; set; }
        public string Message { get; set; }
    }
}