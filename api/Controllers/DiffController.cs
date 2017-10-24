using api.core.Features.Diff;
using Microsoft.AspNetCore.Mvc;

namespace api
{
    [Route("api/diff")]
    public class DiffController : Controller
    {
        private readonly IDirectDiffProvider _diffProvider;

        public DiffController(IDirectDiffProvider diffProvider)
        {
            _diffProvider = diffProvider;
        }

        [HttpGet("direct")]
        public DirectDiff GetDirect(string path)
        {
            return _diffProvider.GetDiff(path);
        }
    }
}