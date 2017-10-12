using Core.Features.Branch;
using Microsoft.AspNetCore.Cors;
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

        [HttpPost("{branchName}")]
        public IActionResult Create(string branchName)
        {
            _branchProvider.Create(branchName);
            return Ok();
        }

        [HttpPost("{branchName}/checkout")]
        public IActionResult Checkout(string branchName)
        {
            _branchProvider.Checkout(branchName);
            return Ok();
        }
    }
}