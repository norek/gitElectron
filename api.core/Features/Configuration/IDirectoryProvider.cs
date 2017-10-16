using System.Collections.Generic;

namespace api.core.Features.Configuration
{
    public interface IDirectoryProvider
    {
        DirectoryInfo GetDirectoryList(string path);
    }
}