using LibGit2Sharp;
using System;
using System.Collections.Generic;
using System.Linq;

namespace api.core.Features.Commit
{
    public class CommitProvider : ICommitProvider
    {
        private readonly IRepository _repository;

        public CommitProvider(RepositoryFactory repository)
        {
            _repository = repository.GetRepository();
        }

        public void Create(CommitParameters commitParameters)
        {
            //TODO: fix this hard coded signature
            var author = new Signature("norek", "norekzal@gmail.com", DateTime.Now);

            _repository.Commit(commitParameters.Message, author, author);
        }

        public IEnumerable<Commit> GetAllFromTip(string branchName)
        {
            var commits = _repository.Branches[branchName].Commits
                .Select(d =>
                    new Commit()
                    {
                        Date = d.Committer.When.DateTime,
                        Name = d.Message,
                        Sha = d.Sha,
                        Message = d.MessageShort
                    }).ToList();

            return commits;
        }
    }
}
