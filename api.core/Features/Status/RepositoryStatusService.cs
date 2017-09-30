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

        public RepositoryStatusService(IRepository repository)
        {
            this.repository = repository;
        }

        public IEnumerable<StatusItem> GetAll()
        {
            var retrivedStatus = repository.RetrieveStatus();
            return retrivedStatus.Where(x => x.State != FileStatus.Ignored)
                                 .Select(d => new StatusItem()
                                 { Path = d.FilePath, Status = d.State }).ToList();
        }
    }

    public class StatusItem
    {
        public string Path { get; set; }
        public FileStatus Status { get; set; }
    }
}
