using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibGit2Sharp;

namespace api.core.Features.Branch
{
    public class BranchProvider : IBranchProvider
    {
        private readonly IRepository _repository;

        public BranchProvider(RepositoryFactory repo)
        {
            _repository = repo.GetRepository();
        }

        public void Create(string branchName)
        {
            _repository.CreateBranch(branchName);
        }

        public IEnumerable<Branch> GetAllBranches()
        {
            return _repository.Branches
                               //Ignore HEAD branch
                              .Where(branch => !(branch.IsRemote && branch.CanonicalName.Contains("refs/remotes/origin/HEAD")))
                              .Select(b => new Branch()
                              {
                                  CannonicalName = b.CanonicalName,
                                  IsRemote = b.IsRemote,
                                  Name = b.FriendlyName,
                                  IsHead = b.IsCurrentRepositoryHead,
                                  Tip = b.Tip.Sha,
                                  IsTracking = b.IsTracking,
                                  TrackingDetails = new TrackingDetails(b.TrackedBranch?.CanonicalName, b.TrackingDetails)
                              })
                              .ToList();
        }

        public void Checkout(string name)
        {
            LibGit2Sharp.Branch branchToCheckout = _repository.Branches[name];

            Commands.Checkout(_repository, branchToCheckout);
        }
    }
}
