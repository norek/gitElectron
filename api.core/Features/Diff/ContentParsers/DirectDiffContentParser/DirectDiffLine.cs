namespace api.core.Features.Diff.ContentParsers.DirectDiffContentParser
{
    public class DirectDiffLine
    {
        public string Content
        {
            get;
            set;
        }

        public LineDiffType Type
        {
            get;
            set;
        }

        public int LineNumber
        {
            get;
            set;
        }
    }
}
