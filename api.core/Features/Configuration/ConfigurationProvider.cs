using System;
using System.Collections.Generic;
using System.Linq;
using LibGit2Sharp;

namespace api.core.Features.Configuration
{
    public class RepositoryOptionsProvider : IRepositoryOptionsProvider
    {
        private readonly IRepository _repository;

        public RepositoryOptionsProvider(RepositoryFactory repository)
        {
            _repository = repository.GetRepository();
        }

        public RepositoryConfiguration GetRepositoryConfiguration()
        {
            var repositoryConfiguration = new RepositoryConfiguration();

            var signature = _repository.Config.BuildSignature(DateTime.Now);

            if (signature == null)
                throw new SignatureNotFoundException();

            var userInfo = new UserInfo(signature.Name, signature.Email);
            repositoryConfiguration.User = userInfo;
            repositoryConfiguration.CurrentRepository = _repository.Info.WorkingDirectory;

            if (_repository.Branches.Any())
                repositoryConfiguration.CurrentBranch = _repository.Head.FriendlyName;

            return repositoryConfiguration;
        }

        public IEnumerable<Remote> GetRemotes()
        {
            return _repository.Network.Remotes.Select(remote => new Remote(remote.Name, remote.Url));
        }

        public void AddNewRemote(Remote remote)
        {
            _repository.Network.Remotes.Add(remote.Name, remote.Url);
        }

        public void RemoveRemote(string name)
        {
            _repository.Network.Remotes.Remove(name);
        }
    }
}