using api.core.Features.Commit;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
    }
}
