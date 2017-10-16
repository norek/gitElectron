﻿using LibGit2Sharp;
using System;

namespace api.core.Features.Commit
{
    public class CommitProvider : ICommitProvider
    {
        private readonly IRepository repository;

        public CommitProvider(RepositoryFactory repository)
        {
            this.repository = repository.GetRepository();
        }

        public void Create(CommitParameters commitParameters)
        {
            var author = new Signature("norek", "norekzal@gmail.com", DateTime.Now);

            repository.Commit(commitParameters.Message, author, author);
        }
    }
}
