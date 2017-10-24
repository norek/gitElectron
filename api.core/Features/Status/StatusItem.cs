using LibGit2Sharp;

namespace api.core.Features.Status
{
    public class StatusItem
    {
        public string Path { get; set; }
        public FileStatus Status { get; set; }
    }
}