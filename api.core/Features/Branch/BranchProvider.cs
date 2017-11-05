using System;
using System.Collections.Generic;
using System.Linq;
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

        public Branch Create(string branchName)
        {
            var newBranch = _repository.CreateBranch(branchName);
            return new Branch
            {
                CannonicalName = newBranch.CanonicalName,
                IsRemote = newBranch.IsRemote,
                Name = newBranch.FriendlyName,
                IsHead = newBranch.IsCurrentRepositoryHead,
                Tip = newBranch.Tip.Sha,
                IsTracking = newBranch.IsTracking,
                TrackingDetails = new TrackingDetails(newBranch.TrackedBranch?.CanonicalName, newBranch.TrackingDetails)
            };
        }

        public IEnumerable<Branch> GetAllBranches()
        {
            return _repository.Branches
                //Ignore HEAD branch
                .Where(branch => !(branch.IsRemote && branch.CanonicalName.Contains("refs/remotes/origin/HEAD")))
                .Select(b => new Branch
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

        public void Checkout(BranchCheckout checkoutParams)
        {
            var branchToCheckout = _repository.Branches[checkoutParams.Name];

            if (branchToCheckout == null)
                throw new ArgumentException("Branch not exists");

            if (branchToCheckout.IsRemote)
            {
                //Create branch based on passed branch. Attach to tip of passed branch.
                var newBranch = _repository.CreateBranch(
                    branchToCheckout.FriendlyName.Replace(branchToCheckout.RemoteName + "/", ""),
                    branchToCheckout.Tip.Sha);

                //Set tracking on passed branch
                _repository.Branches.Update(newBranch,
                    branch => branch.TrackedBranch = branchToCheckout.CanonicalName);

                //update referance of branch
                newBranch = _repository.Branches[newBranch.CanonicalName];

                //checkout new branch
                Commands.Checkout(_repository, newBranch.FriendlyName);
            }
            else
            {
                Commands.Checkout(_repository, branchToCheckout, new CheckoutOptions());
            }
        }

        public void Push(BranchPush pushParams)
        {
            _repository.Network.Push(_repository.Branches[pushParams.Name]);
        }

        public Branch Create(string branchName, string shaTip)
        {
            var newBranch = _repository.CreateBranch(branchName, shaTip);
            return new Branch
            {
                CannonicalName = newBranch.CanonicalName,
                IsRemote = newBranch.IsRemote,
                Name = newBranch.FriendlyName,
                IsHead = newBranch.IsCurrentRepositoryHead,
                Tip = newBranch.Tip.Sha,
                IsTracking = newBranch.IsTracking,
                TrackingDetails = new TrackingDetails(newBranch.TrackedBranch?.CanonicalName, newBranch.TrackingDetails)
            };
        }
    }
}