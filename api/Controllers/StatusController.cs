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

        [HttpGet("")]
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

        [HttpPost("stageAll")]
        public IActionResult StageAll()
        {
            statusService.StageAll();
            return Ok();
        }

        [HttpPost("unstageAll")]
        public IActionResult UnStageAll()
        {
            statusService.UnstageAll();
            return Ok();
        }

        [HttpPost("discard")]
        public IActionResult DiscardChanges([FromBody] StatusItem statusItem)
        {
            statusService.DiscardChanges(statusItem);
            return Ok();
        }
    }
}
