using System;

namespace api.core.Features.Diff.ContentParsers.Utils
{
    public interface IContentLineSplitter
    {
        string[] GetContentLines(string content);
    }

    public class ContentLineSplitter : IContentLineSplitter
    {
        public string[] GetContentLines(string content)
        {
            return content
                .Replace(' ', '\u00a0')
                .Split(new[] { Environment.NewLine, "\n" }, StringSplitOptions.None);
        }
    }
}
