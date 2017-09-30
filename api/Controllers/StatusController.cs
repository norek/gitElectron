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
    }
}
