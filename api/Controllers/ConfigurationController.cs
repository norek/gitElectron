using api.core.Features.Configuration;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/options")]
    public class ConfigurationController : Controller
    {
        private readonly IRepositoryOptionsProvider _optionsProvider;

        public ConfigurationController(IRepositoryOptionsProvider optionsProvider)
        {
            _optionsProvider = optionsProvider;
        }

        [HttpGet("")]
        public IActionResult GetAll()
        {
            return Ok(_optionsProvider.GetRepositoryConfiguration());
        }
    }
}
