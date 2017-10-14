using LibGit2Sharp;
using System;
using System.Collections.Generic;
using System.Text;

namespace api.core.Features.Configuration
{
    public class RepositoryOptionsProvider : IRepositoryOptionsProvider
    {
        private readonly IRepository _repository;

        public RepositoryOptionsProvider(IRepository repository)
        {
            _repository = repository;
        }

        public RepositoryConfiguration GetRepositoryConfiguration()
        {
            RepositoryConfiguration repositoryConfiguration = new RepositoryConfiguration();

            var signature = _repository.Config.BuildSignature(DateTime.Now);

            UserInfo userInfo = new UserInfo(signature.Name, signature.Email);
            repositoryConfiguration.User = userInfo;

            return repositoryConfiguration;
        }
    }
}
