using api.core.Features.Branch;
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

        [HttpGet("")]
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

        [HttpPost("assignRemote")]
        public IActionResult Create([FromBody] AssignRemote assignParams)
        {
            _branchProvider.AssignRemote(assignParams);
            return Ok();
        }

        [HttpPost("checkout")]
        public IActionResult Checkout([FromBody]BranchCheckout checkoutParams)
        {
            _branchProvider.Checkout(checkoutParams);
            return Ok();
        }

        [HttpPost("push")]
        public IActionResult Push([FromBody] BranchPush branchPush)
        {
            _branchProvider.Push(branchPush);
            return Ok();
        }

    }
}