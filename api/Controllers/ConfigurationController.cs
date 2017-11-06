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

        [HttpGet("remotes")]
        public IActionResult GetAllRemotes()
        {
            return Ok(_optionsProvider.GetRemotes());
        }

        [HttpPost("remotes")]
        public IActionResult AddNewRemote([FromBody] Remote remote)
        {
            _optionsProvider.AddNewRemote(remote);
            return Ok();
        }

        [HttpDelete("remotes/{name}")]
        public IActionResult RemoteRemote(string name)
        {
            _optionsProvider.RemoveRemote(name);
            return Ok();
        }

        [HttpGet("remotes/{name}/branches")]
        public IActionResult GetBranchesFromRemote(string remoteName)
        {
            _optionsProvider.GetBranchesFromRemote(remoteName);
            return Ok();
        }

        [HttpPost("system/mappedRepositories")]
        public IActionResult MapRepository([FromBody] RepositoryMapParams repositoryToMap)
        {
            _systemConfiguration.MapRepository(repositoryToMap.RepositoryToMap);
            return Ok();
        }

        [HttpPost("system/switchRepository")]
        public IActionResult SwitchRepository([FromBody] SwitchRepositoryParams repositoryToSwitch)
        {
            _systemConfiguration.SwitchRepository(repositoryToSwitch.NewCurrentRepository);
            return Ok();
        }

        [HttpGet("system")]
        public IActionResult GetSystemConfiguration()
        {
            return Ok(_systemConfiguration.GetSystemConfiguration());
        }
    }

    public class SwitchRepositoryParams
    {
        public string NewCurrentRepository { get; set; }
    }

    public class RepositoryMapParams
    {
        public string RepositoryToMap { get; set; }
    }
}
