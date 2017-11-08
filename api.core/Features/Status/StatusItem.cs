using LibGit2Sharp;

namespace api.core.Features.Status
{
    public class StatusItem
    {
        public string Name { get; set; }
        public string Path { get; set; }
        public FileStatus Status { get; set; }
    }
}