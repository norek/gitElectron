using System.Collections.Generic;

namespace api.core.Features.Branch
{
    public interface IBranchProvider
    {
        void Create(string branchName);

        IEnumerable<Branch> GetAllBranches();

        void Checkout(string name);
    }
}
