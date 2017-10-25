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
                var hunkLineNumber = 1;
                bool addEmptyLine = false;
                foreach (var rawLine in rawHunk.Value)
                {
                    if (rawLine.StartsWith(_addedLinePrefix))
                    {
                        lineNumberAfter = AddLine(hunk.LinesAfter, rawLine, lineNumberAfter, hunkLineNumber, LineDiffType.Added);
                        AddNonexistingLine(hunk.LinesBefore, hunkLineNumber);
                    }
                    else if (rawLine.StartsWith(_removedLinePrefix))
                    {
                        lineNumberBefore = AddLine(hunk.LinesBefore, rawLine, lineNumberBefore, hunkLineNumber, LineDiffType.Removed);
                        AddNonexistingLine(hunk.LinesAfter, hunkLineNumber);
                    }
                    else if (rawLine.StartsWith(_noNewLineAtEoFPrefix))
                    {
                        if (rawHunk.Value.IndexOf(_noNewLineAtEoFPrefix) == rawHunk.Key.Length - 1) //last line
                        {
                            lineNumberBefore = AddLine(hunk.LinesBefore, rawLine, lineNumberBefore, hunkLineNumber, LineDiffType.Removed);
                            AddNonexistingLine(hunk.LinesAfter, hunkLineNumber);
                        }
                        else
                            addEmptyLine = true;
                    }
                    else
                    {
                        lineNumberAfter = AddLine(hunk.LinesAfter, rawLine, lineNumberAfter, hunkLineNumber, LineDiffType.Unchanged);
                        lineNumberBefore = AddLine(hunk.LinesBefore, rawLine, lineNumberBefore, hunkLineNumber, LineDiffType.Unchanged);
                    }
                    hunkLineNumber++;
                }
                if (addEmptyLine)
                {
                    hunk.LinesAfter.Add(CreateEmptyLine(lineNumberAfter, hunkLineNumber, LineDiffType.Added));
                    AddNonexistingLine(hunk.LinesBefore, hunkLineNumber);
                }

                hunks.Add(hunk);
            }

            return hunks;
        }

        private void AddNonexistingLine(List<DirectDiffLine> list, int hunkLineNumber)
        {
            list.Add(CreateEmptyLine(0, hunkLineNumber, LineDiffType.Nonexistent));
        }

        private int AddLine(List<DirectDiffLine> list, string content, int lineNum, int hunkLineNum, LineDiffType type)
        {
            list.Add(CreateLine(content, lineNum, hunkLineNum, type));

            return ++lineNum;
        }

        private DirectDiffLine CreateLine(string rawContent, int lineNum, int hunkLineNum, LineDiffType type)
        {
            if (rawContent == string.Empty)
                return CreateEmptyLine(lineNum, hunkLineNum, type);

            return new DirectDiffLine
            {
                Content = rawContent.Substring(1),
                LineNumber = lineNum,
                HunkLineNumber = hunkLineNum,
                Type = type
            };
        }

        private DirectDiffLine CreateEmptyLine(int lineNum, int hunkLineNum, LineDiffType type)
        {
            return new DirectDiffLine
            {
                Content = string.Empty,
                LineNumber = lineNum,
                HunkLineNumber = hunkLineNum,
                Type = type
            };
        }
    }
}
