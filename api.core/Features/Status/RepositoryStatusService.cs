using System.Collections.Generic;
using System.Linq;
using LibGit2Sharp;

namespace api.core.Features.Status
{
    public class RepositoryStatusService : IRepositoryStatusService
    {
        private readonly IRepository _repository;

        public RepositoryStatusService(RepositoryFactory repository)
        {
            _repository = repository.GetRepository();
        }

        public IEnumerable<StatusItem> GetAll()
        {
            var retrivedStatus = _repository.RetrieveStatus();
            return retrivedStatus.Where(x => x.State != FileStatus.Ignored)
                .Select(d => new StatusItem {Path = d.FilePath, Status = d.State}).ToList();
        }

        public void Stage(StatusItem statusItem)
        {
            Commands.Stage(_repository, statusItem.Path);
        }

        public void Unstage(StatusItem statusItem)
        {
            Commands.Unstage(_repository, statusItem.Path);
        }

        public void StageAll()
        {
            Commands.Stage(_repository, "*");
        }

        public void UnstageAll()
        {
            Commands.Unstage(_repository, "*");
        }
    }
}