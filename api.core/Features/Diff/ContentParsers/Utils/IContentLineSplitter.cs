namespace api.core.Features.Diff.ContentParsers.Utils
{
    public interface IContentLineSplitter
    {
        string[] GetContentLines(string content);
    }
}