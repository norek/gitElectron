using System;
using System.Linq;

namespace api.core.Features.Diff.ContentParsers.Utils
{
    public interface IHunkHeaderParser
    {
        HunkHeader ParseHeader(string headerString);
    }

    public class HunkHeaderParser : IHunkHeaderParser
    {
        private const char _afterPrefix = '+';
        private const char _beforePrefix = '-';
        private const char _infoSplitter = ',';
        private const string _hunkSeparator = "@@";

        public HunkHeader ParseHeader(string headerString)
        {
            var header = new HunkHeader();
            if (!IsValid(headerString))
                throw new FormatException();

            header.RawHeader = headerString;
            var headerParts = SplitParts(headerString);
            header.Before = GetHunkDiffInfo(headerParts[0]);    //Before
            header.After = GetHunkDiffInfo(headerParts[1]);     //After

            return header;
        }

        private HunkDiffInfo GetHunkDiffInfo(string header)
        {
            var info = new HunkDiffInfo();
            var headerData = header.Split(_infoSplitter);

            info.StartingLineNumber = Convert.ToInt32(headerData[0].Trim());
            info.NumberOfLines = Convert.ToInt32(headerData[1].Trim());

            return info;
        }

        private string[] SplitParts(string headerString)
        {
            return headerString
                .Split(_hunkSeparator.ToCharArray())[2]
                .Replace(_hunkSeparator, string.Empty)
                .Replace(_beforePrefix.ToString(), string.Empty)
                .Split(_afterPrefix);
        }

        private bool IsValid(string headerString)
        {
            return (headerString.Length - headerString.Replace(_hunkSeparator, string.Empty).Length) / 2 == 2 &&
                   headerString.Count(s => s == _afterPrefix) == 1 &&
                   headerString.Count(s => s == _beforePrefix) == 1 &&
                   headerString.Count(s => s == _infoSplitter) == 2;
        }
    }

    public class HunkHeader
    {
        public string RawHeader
        {
            get;
            set;
        }

        public HunkDiffInfo Before
        {
            get;
            set;
        }

        public HunkDiffInfo After
        {
            get;
            set;
        }
    }

    public class HunkDiffInfo
    {
        public int StartingLineNumber { get; set; }
        public int NumberOfLines { get; set; }
    }
}
