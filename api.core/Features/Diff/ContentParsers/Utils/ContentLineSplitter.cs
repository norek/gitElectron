using System;

namespace api.core.Features.Diff.ContentParsers.Utils
{
    public class ContentLineSplitter : IContentLineSplitter
    {
        public string[] GetContentLines(string content)
        {
            return content.Replace(' ', '\u00a0').Split(new[] { Environment.NewLine }, StringSplitOptions.None);
        }
    }
}
