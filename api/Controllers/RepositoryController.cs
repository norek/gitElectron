using api.core.Features.RepositoryOperations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/repository")]
    public class RepositoryController : Controller
    {
        private readonly IRepositoryOperationsManager _operationsManager;

        public RepositoryController(IRepositoryOperationsManager operationsManager)
        {
            _operationsManager = operationsManager;
        }

        [HttpPost("fetch")]
        [Authorize]
        public IActionResult Fetch()
        {
            _operationsManager.Fetch();
            return Ok();
        }

        [HttpPost("pull")]
        public IActionResult Pull()
        {
            _operationsManager.Pull();
            return Ok();
        }
    }
}
