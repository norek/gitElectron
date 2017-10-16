using LibGit2Sharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace api.core.Features.Status
{
    public class RepositoryStatusService : IRepositoryStatusService
    {
        private readonly IRepository repository;

        public RepositoryStatusService(RepositoryFactory repository)
        {
            this.repository = repository.GetRepository();
        }

        public IEnumerable<StatusItem> GetAll()
        {
            var retrivedStatus = repository.RetrieveStatus();
            return retrivedStatus.Where(x => x.State != FileStatus.Ignored)
                                 .Select(d => new StatusItem()
                                 { Path = d.FilePath, Status = d.State }).ToList();
        }

        public void Stage(StatusItem statusItem)
        {
            Commands.Stage(repository, statusItem.Path);
        }

        public void Unstage(StatusItem statusItem)
        {
            Commands.Unstage(repository, statusItem.Path);
        }
    }

    public class StatusItem
    {
        public string Path { get; set; }
        public FileStatus Status { get; set; }
    }
}
