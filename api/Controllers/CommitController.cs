using api.core.Features.Commit;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/commits")]
    public class CommitController : Controller
    {
        private readonly ICommitProvider commitProvider;

        public CommitController(ICommitProvider commitProvider)
        {
            this.commitProvider = commitProvider;
        }

        [HttpPost]
        public IActionResult Create([FromBody] CommitParameters commitParameters)
        {
            commitProvider.Create(commitParameters);
            return Ok();
        }

        [HttpGet("{branchName}")]
        public IActionResult GetAllFromTip(string branchName)
        {
            return Ok(commitProvider.GetAllFromTip(branchName));
        }

        [HttpGet("{sha}/details")]
        public IActionResult GetDetails(string sha)
        {
            return Ok(commitProvider.GetDetails(sha));
        }
    }
}
