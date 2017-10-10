using api.core.Features.Status;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/statuses")]
    public class StatusController : Controller
    {
        private readonly IRepositoryStatusService statusService;

        public StatusController(IRepositoryStatusService statusService)
        {
            this.statusService = statusService;
        }

        public IActionResult Get()
        {
            return Ok(statusService.GetAll());
        }

        [HttpPost("stage")]
        public IActionResult Stage([FromBody] StatusItem statusItem)
        {
            statusService.Stage(statusItem);
            return Ok();
        }

        [HttpPost("unstage")]
        public IActionResult UnStage([FromBody] StatusItem statusItem)
        {
            statusService.Unstage(statusItem);
            return Ok();
        }
    }
}
