using System.Collections;
using System.Collections.Generic;

namespace api.core.Features.Commit
{
    public interface ICommitProvider
    {
        void Create(CommitParameters commitParameters);

        IEnumerable<Commit> GetAllFromTip(string branchName);
    }
}
