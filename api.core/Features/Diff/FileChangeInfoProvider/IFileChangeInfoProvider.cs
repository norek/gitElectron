namespace api.core.Features.Diff.FileChangeInfoProvider
{
    public interface IFileChangeInfoProvider
    {
        FileChangeInfo GetFileChangeInfo(string filePath);
    }
}