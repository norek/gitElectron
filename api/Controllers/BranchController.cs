using Core.Features.Branch;
using Microsoft.AspNetCore.Mvc;

namespace api
{
    [Route("api/branches")]
    public class BranchController : Controller
    {
        private readonly IBranchProvider _branchProvider;

        public BranchController(IBranchProvider branchProvider)
        {
            _branchProvider = branchProvider;
        }

        public IActionResult GetAll()
        {
            return Ok(_branchProvider.GetAllBranches());
        }
    }
}