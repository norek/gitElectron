namespace api.core.Features.Commit
{
    public interface ICommitProvider
    {
        void Create(CommitParameters commitParameters);
    }
}
