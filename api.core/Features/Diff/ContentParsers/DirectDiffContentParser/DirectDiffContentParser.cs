using System;
using System.Collections.Generic;
using api.core.Features.Diff.ContentParsers.Utils;

namespace api.core.Features.Diff.ContentParsers.DirectDiffContentParser
{
    public interface IDirectDiffContentParser
    {
        List<DirectDiffHunk> ParseContent(string content);
    }

    public class DirectDiffContentParser : IDirectDiffContentParser
    {
        private readonly IContentLineSplitter _contentLineSplitter;
        private readonly IHunkSplitter _hunkSplitter;
        private readonly IHunkHeaderParser _hunkHeaderParser;

        private const string _addedLinePrefix = "+";
        private const string _removedLinePrefix = "-";
        private const string _noNewLineAtEoFPrefix = @"\";

        public DirectDiffContentParser(
            IContentLineSplitter contentLineSplitter,
            IHunkSplitter hunkSplitter,
            IHunkHeaderParser hunkHeaderParser)
        {
            _contentLineSplitter = contentLineSplitter;
            _hunkSplitter = hunkSplitter;
            _hunkHeaderParser = hunkHeaderParser;
        }

        public List<DirectDiffHunk> ParseContent(string content)
        {
            if (string.IsNullOrEmpty(content))
                throw new ArgumentException("Content can't be empty");
            var hunks = new List<DirectDiffHunk>();

            var lines = _contentLineSplitter.GetContentLines(content);

            var rawHunkDictionary = _hunkSplitter.GetHunks(lines);

            foreach (var rawHunk in rawHunkDictionary)
            {
                var hunk = new DirectDiffHunk { Header = _hunkHeaderParser.ParseHeader(rawHunk.Key) };
                var lineNumberBefore = hunk.Header.Before.StartingLineNumber;
                var lineNumberAfter = hunk.Header.After.StartingLineNumber;
                var removedLinesCount = 0;
                var emptyLineRemoved = false;
                var emptyLineAdded = false;
                var noNewLineHandled = false;
                //foreach (var rawLine in rawHunk.Value)
                for (int i = 0; i < rawHunk.Value.Count; i++)
                {
                    var rawLine = rawHunk.Value[i];
                    if (rawLine.StartsWith(_removedLinePrefix))
                    {
                        lineNumberBefore = AddLine(hunk.LinesBefore, rawLine, lineNumberBefore, LineDiffType.Removed);
                        removedLinesCount++;
                    }
                    else if (rawLine.StartsWith(_addedLinePrefix))
                    {
                        lineNumberAfter = AddLine(hunk.LinesAfter, rawLine, lineNumberAfter, LineDiffType.Added);
                        if (removedLinesCount > 0)
                            removedLinesCount--;
                        else
                            AddNonexistingLine(hunk.LinesBefore);
                    }
                    else if (rawLine.StartsWith(_noNewLineAtEoFPrefix))
                    {
                        if(noNewLineHandled) continue;

                        noNewLineHandled = true;

                        if (i == rawHunk.Value.Count - 1)
                            emptyLineRemoved = true;
                        else
                            emptyLineAdded = true;
                    }
                    else
                    {
                        if (removedLinesCount > 0)
                        {
                            while (removedLinesCount > 0)
                            {
                                AddNonexistingLine(hunk.LinesAfter);
                                removedLinesCount--;
                            }
                        }
                        lineNumberAfter = AddLine(hunk.LinesAfter, rawLine, lineNumberAfter, LineDiffType.Unchanged);
                        lineNumberBefore = AddLine(hunk.LinesBefore, rawLine, lineNumberBefore, LineDiffType.Unchanged);
                    }
                }
                if (emptyLineAdded)
                {
                    AddNonexistingLine(hunk.LinesBefore);
                    AddLine(hunk.LinesAfter, string.Empty, lineNumberAfter, LineDiffType.Added);
                }
                if (emptyLineRemoved)
                {
                    AddLine(hunk.LinesBefore, string.Empty, lineNumberBefore, LineDiffType.Removed);
                    AddNonexistingLine(hunk.LinesAfter);
                }

                hunks.Add(hunk);
            }

            return hunks;
        }

        private void AddNonexistingLine(List<DirectDiffLine> list)
        {
            list.Add(CreateEmptyLine(0, LineDiffType.Nonexistent));
        }

        private int AddLine(List<DirectDiffLine> list, string content, int lineNum, LineDiffType type)
        {
            list.Add(CreateLine(content, lineNum, type));

            return ++lineNum;
        }

        private DirectDiffLine CreateLine(string rawContent, int lineNum, LineDiffType type)
        {
            if (rawContent == string.Empty)
                return CreateEmptyLine(lineNum, type);

            return new DirectDiffLine
            {
                Content = rawContent.Substring(1),
                LineNumber = lineNum,
                Type = type.ToString().ToLower()
            };
        }

        private DirectDiffLine CreateEmptyLine(int lineNum, LineDiffType type)
        {
            return new DirectDiffLine
            {
                Content = string.Empty,
                LineNumber = lineNum,
                Type = type.ToString().ToLower()
            };
        }
    }
}
