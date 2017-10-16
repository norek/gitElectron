using api.core;
using api.core.Features.Configuration;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/options")]
    public class ConfigurationController : Controller
    {
        private readonly IRepositoryOptionsProvider _optionsProvider;
        private readonly SystemConfigurationStorage _systemConfiguration;

        public ConfigurationController(IRepositoryOptionsProvider optionsProvider, SystemConfigurationStorage systemConfiguration)
        {
            _optionsProvider = optionsProvider;
            _systemConfiguration = systemConfiguration;
        }

        [HttpGet("")]
        public IActionResult GetAll()
        {
            return Ok(_optionsProvider.GetRepositoryConfiguration());
        }

        [HttpPost("system/mappedRepositories")]
        public IActionResult MapRepository([FromBody] RepositoryMapParams repositoryToMap)
        {
            _systemConfiguration.MapRepository(repositoryToMap.RepositoryToMap);
            return Ok();
        }

        [HttpGet("system")]
        public IActionResult GetSystemConfiguration()
        {
            return Ok(_systemConfiguration.GetSystemConfiguration());
        }
    }

    public class RepositoryMapParams
    {
        public string RepositoryToMap { get; set; }
    }
}
