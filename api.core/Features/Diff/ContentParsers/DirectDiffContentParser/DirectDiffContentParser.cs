using System;
using System.Collections.Generic;
using api.core.Features.Diff.ContentParsers.Utils;

namespace api.core.Features.Diff.ContentParsers.DirectDiffContentParser
{
    public class DirectDiffContentParser
    {
        private readonly IContentLineSplitter _contentLineSplitter;
        private readonly IHunkSplitter _hunkSplitter;

        private const string _addedLinePrefix = "+";
        private const string _removedLinePrefix = "-";
        private const string _noNewLineAtEoFPrefix = @"\";

        public DirectDiffContentParser(IContentLineSplitter contentLineSplitter, IHunkSplitter hunkSplitter)
        {
            _contentLineSplitter = contentLineSplitter;
            _hunkSplitter = hunkSplitter;
        }

        public List<DirectDiffHunk> ParseContent(string content)
        {
            if (string.IsNullOrEmpty(content))
                throw new ArgumentException("Content can't be empty");
            var hunks = new List<DirectDiffHunk>();

            var lines = _contentLineSplitter.GetContentLines(content);
            var hunkDictionary = _hunkSplitter.GetHunks(lines);

            foreach (var hunkKey in hunkDictionary)
            {

            }

            return hunks;
        }
    }
}
