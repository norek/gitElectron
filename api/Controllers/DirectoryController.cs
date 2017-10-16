using api.core.Features.Configuration;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    [Route("api/directories")]
    public class DirectoryController : Controller
    {
        private readonly IDirectoryProvider _directoryProvider;

        public DirectoryController(IDirectoryProvider directoryProvider)
        {
            _directoryProvider = directoryProvider;
        }

        [HttpGet("")]
        public IActionResult GetDirectory([FromQuery] string path)
        {
            return Ok(_directoryProvider.GetDirectoryList(path));
        }
    }
}
