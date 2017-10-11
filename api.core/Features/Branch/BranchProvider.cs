using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibGit2Sharp;

namespace Core.Features.Branch
{
    public class BranchProvider : IBranchProvider
    {
        private readonly IRepository _repository;

        public BranchProvider(IRepository repo)
        {
            _repository = repo;
        }

        public void Create(string branchName)
        {
            _repository.CreateBranch(branchName);
        }

        public IEnumerable<Branch> GetAllBranches()
        {
            return _repository.Branches
                              .Select(b => new Branch() { IsRemote = b.IsRemote, Name = b.FriendlyName, IsHead = b.IsCurrentRepositoryHead, Tip = b.Tip.Sha })
                              .ToList();
        }
    }
}
