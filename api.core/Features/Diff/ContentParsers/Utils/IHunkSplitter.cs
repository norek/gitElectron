using System.Collections.Generic;

namespace api.core.Features.Diff.ContentParsers.Utils
{
    public interface IHunkSplitter
    {
        Dictionary<string, List<string>> GetHunks(string[] lines);
    }
}