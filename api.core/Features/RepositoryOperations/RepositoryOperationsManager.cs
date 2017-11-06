using System;
using System.Collections.Generic;
using System.Linq;
using LibGit2Sharp;

namespace api.core.Features.RepositoryOperations
{
    public class RepositoryOperationsManager : IRepositoryOperationsManager
    {
        private readonly IRepository _repository;

        public RepositoryOperationsManager(RepositoryFactory repositoryFactory)
        {
            _repository = repositoryFactory.GetRepository();
        }

        public void Fetch()
        {
            foreach (Remote remote in _repository.Network.Remotes)
            {
                IEnumerable<string> refSpecs = remote.FetchRefSpecs.Select(x => x.Specification);
                FetchOptions options = new FetchOptions();
                Commands.Fetch((Repository)_repository, remote.Name, refSpecs, options, "log message " + DateTime.UtcNow);
            }
        }
    }
}