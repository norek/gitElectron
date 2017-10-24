using System;
using System.Collections.Generic;
using LibGit2Sharp;

namespace api.core.Features.Diff.FileChangeInfoProvider
{
    public interface IFileChangeInfoProvider
    {
        FileChangeInfo GetFileChangeInfo(string filePath);
    }

    public class FileChangeInfoProvider : IFileChangeInfoProvider
    {
        private readonly IRepository _repository;

        public FileChangeInfoProvider(RepositoryFactory repoFactory)
        {
            _repository = repoFactory.GetRepository();
        }

        public FileChangeInfo GetFileChangeInfo(string filePath)
        {
            if (string.IsNullOrEmpty(filePath))
                throw new ArgumentException("File path can't be empty");

            Patch patch = _repository.Diff.Compare<Patch>(new List<string> { filePath });

            return new FileChangeInfo(filePath, patch.Content, patch.LinesAdded, patch.LinesDeleted);
    }
}
}
