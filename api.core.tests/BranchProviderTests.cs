using Core.Features.Branch;
using LibGit2Sharp;
using System.Linq;
using Xunit;

namespace api.core.tests
{
    public class BranchProviderTests
    {
        [Theory, AutoMoqData]
        public void ListReturnExpected(IRepository repository)
        {
        }
    }
}
