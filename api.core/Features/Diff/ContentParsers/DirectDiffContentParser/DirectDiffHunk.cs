using System.Collections.Generic;
using api.core.Features.Diff.ContentParsers.Utils;

namespace api.core.Features.Diff.ContentParsers.DirectDiffContentParser
{
    public class DirectDiffHunk
    {
        public DirectDiffHunk()
        {
            LinesBefore = new List<DirectDiffLine>();
            LinesAfter = new List<DirectDiffLine>();
        }

        public HunkHeader Header
        {
            get;
            set;
        }

        public List<DirectDiffLine> LinesBefore
        {
            get;
            set;
        }
        public List<DirectDiffLine> LinesAfter
        {
            get;
            set;
        }
    }
}
