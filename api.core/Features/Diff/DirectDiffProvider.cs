using System;
using System.Collections.Generic;
using System.Text;
using api.core.Features.Diff.ContentParsers.DirectDiffContentParser;
using api.core.Features.Diff.FileChangeInfoProvider;

namespace api.core.Features.Diff
{
    public interface IDirectDiffProvider
    {
        DirectDiff GetDiff(string path);
    }

    public class DirectDiffProvider : IDirectDiffProvider
    {
        private readonly IDirectDiffContentParser _parser;
        private readonly IFileChangeInfoProvider _fileInfoProvider;

        public DirectDiffProvider(IDirectDiffContentParser parser,
            IFileChangeInfoProvider fileInfoProvider)
        {
            _parser = parser;
            _fileInfoProvider = fileInfoProvider;
        }

        public DirectDiff GetDiff(string path)
        {
            var info = _fileInfoProvider.GetFileChangeInfo(path);
            var hunks = _parser.ParseContent(info.Content);

            return new DirectDiff()
            {
                Hunks = hunks
            };
        }
    }

    public class DirectDiff
    {
        public List<DirectDiffHunk> Hunks
        {
            get;
            set;
        }
    }
}
