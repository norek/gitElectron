using LibGit2Sharp;
using System;
using System.Collections.Generic;
using System.IO;
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

        public CommitDetails GetDetails(string sha)
        {
            if (string.IsNullOrEmpty(sha)) throw new ArgumentNullException();

            var commit = _repository.Lookup<LibGit2Sharp.Commit>(sha);

            var commitParent = commit.Parents.Last();

            TreeChanges treeChanges = _repository.Diff.Compare<TreeChanges>(commitParent.Tree, commit.Tree);

            CommitDetails commitDetails = new CommitDetails(sha, commit.Message, commit.Author.Name, commit.Author.When.Date);
            commitDetails.Changes.AddRange(treeChanges.Select(s => new CommitChange((int)s.Status, s.Path, Path.GetFileName(s.Path))));


            return commitDetails;
        }
    }

    public class CommitDetails
    {

        public CommitDetails(string sha, string message, string author, DateTime date)
        {
            Sha = sha;
            Message = message;
            Author = author;
            Date = date;

            Changes = new List<CommitChange>();
        }

        public string Sha { get; set; }
        public string Message { get; set; }
        public string Author { get; set; }
        public DateTime Date { get; set; }

        public List<CommitChange> Changes { get; }
    }

    public class CommitChange
    {

        public CommitChange(int status, string path, string name)
        {
            Type = status;
            Path = path;
            Name = name;
        }

        public string Path { get; }
        public int Type { get; }
        public string Name { get; }
    }
}
