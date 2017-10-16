using System.Collections.Generic;

namespace api.core.Features.Diff.ContentParsers.DirectDiffContentParser
{
    public class DirectDiffHunk
    {
        public string Header
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
