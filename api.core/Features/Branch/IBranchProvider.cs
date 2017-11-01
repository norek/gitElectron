using System.Collections.Generic;

namespace api.core.Features.Branch
{
    public interface IBranchProvider
    {
        Branch Create(string branchName);

        IEnumerable<Branch> GetAllBranches();

        void Checkout(BranchCheckout checkoutParams);
    }
}
