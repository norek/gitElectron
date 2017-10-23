using System;
using System.Collections.Generic;

namespace api.core.Features.Diff.ContentParsers.Utils
{
    public interface IHunkSplitter
    {
        Dictionary<string, List<string>> GetHunks(string[] lines);
    }

    public class HunkSplitter : IHunkSplitter
    {
        /// <summary>
        /// Index of first hunk. First four lines contain header.
        /// </summary>
        private const int _firstHunkIndex = 4;
        private const string _hunkPrefix = "@@";

        public Dictionary<string, List<string>> GetHunks(string[] lines)
        {
            Dictionary<string, List<string>> hunkDictionary = new Dictionary<string, List<string>>();
            List<string> hunkLines = null;
            for (int i = _firstHunkIndex; i < lines.Length; i++)
            {
                var currentLine = lines[i];
                if (IsHunkHeader(currentLine))
                {
                    hunkLines = new List<string>();
                    hunkDictionary.Add(currentLine, hunkLines);
                }
                else
                {
                    if (hunkLines == null)
                        continue;

                    hunkLines.Add(currentLine);
                }
            }

            return hunkDictionary;
        }

        private bool IsHunkHeader(string line)
        {
            return line.IndexOf(_hunkPrefix, StringComparison.Ordinal) == 0;
        }
    }
}
