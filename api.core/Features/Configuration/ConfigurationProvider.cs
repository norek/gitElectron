using System;
using System.Collections.Generic;
using System.Linq;
using api.core.Features.Branch;
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
            {
                repositoryConfiguration.CurrentBranch = new Branch.Branch
                {
                    CannonicalName = _repository.Head.CanonicalName,
                    IsRemote = _repository.Head.IsRemote,
                    Name = _repository.Head.FriendlyName,
                    IsHead = _repository.Head.IsCurrentRepositoryHead,
                    Tip = _repository.Head.Tip.Sha,
                    IsTracking = _repository.Head.IsTracking,
                    TrackingDetails = new TrackingDetails(_repository.Head.TrackedBranch?.CanonicalName, _repository.Head.TrackingDetails)
                };
            }

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

        public string[] GetBranchesFromRemote(string remoteName)
        {
            var remote = _repository.Network.Remotes[remoteName];

            if (remote == null) throw new ArgumentException("Remote doesnt exists");

            return new string[0];
        }
    }
}